const User = require("../models/User");
const MustacheStyle = require("../models/MustacheStyle");

exports.getLogin = (req, res, next) => {
  res.render("login", { pageTitle: "Login", path: "/login" });
};

exports.getRegister = (req, res, next) => {
  res.render("register", { pageTitle: "Register", path: "/register" });
};

exports.postLogin = async (req, res, next) => {
  // Retrieve values from the login form
  const email = req.body.email;
  const password = req.body.password;
  try {
    //Find user by email address
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.render("login", {
        pageTitle: "Login",
        path: "/login",
        message: "Invalid email address",
        entries: req.body,
      });
    }
    // Verify password match
    const passwordsMatch = await user.validatePassword(password);
    if (!passwordsMatch) {
      return res.render("login", {
        pageTitle: "Login",
        path: "/login",
        message: "Invalid password",
        entries: req.body,
      });
    }
    if (user && passwordsMatch) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    }
  } catch (err) {
    console.log(err);
    return res.render("login", {
      pageTitle: "Login",
      path: "/login",
      message: "Something went wrong, please try again!",
      entries: req.body,
      errors: Object.values(err.errors),
    });
  }
};

exports.postRegister = async (req, res, next) => {
  //Retrieve values from the register form
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  try {
    // model static method to check if email has not been used to create a previous account
    const emailNew = await User.checkEmailNew(email);
    if (!emailNew) {
      return res.render("register", {
        pageTitle: "Register",
        path: "/register",
        message: "Sorry, this email already exists, please choose another one!",
        entries: req.body,
      });
    }
    //Create a new user
    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });

    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.render("register", {
      pageTitle: "Register",
      path: "/register",
      message: "Oops! please, correct the following errors and try again!",
      entries: req.body,
      errors: Object.values(err.errors),
    });
  }
}

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err)   
    res.redirect("/");
  });
}

exports.saveAsFavorite = async (req, res, next) => {
  const userId = req.session.user._id;
  const { styleId } = req.params;
  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { favoriteStyles: styleId },
    });
    res.redirect("/styles");
  } catch (err) {
    console.log(err);
  }
}

exports.favoriteStyles = async (req, res, next) => {
  const userId = req.session.user._id;
  try {
    const user = await User.findById(userId).populate("favoriteStyles");
    console.log("user is: ", user)
    if(!user) {
      res.send("No user found!")
    }
    res.render("favorite-styles", {
      pageTitle: "favorite-styles",
      favorites: user.favoriteStyles,
      path: "/favoritestyles"
    })
  } catch (err) {
   console.log(err)
  }
}

exports.getAdminPrivileges = async (req, res, next) => {

  try {
    const users = await User.find()
    console.log("users are: ", users)
    if(!users) {
      res.send("No users found!")
    }
    res.render("admin-privileges", {
      pageTitle: "Admin Privileges",
      users: users,
      path: "/updateAdminPrivileges"
    })
  }  
  catch(err){
    console.log(err)
  }
}

exports.updateAdminPrivileges = async (req, res, next) => {

  try {
  const usersData = req.body.users;
  for (const userData of usersData){
      const userId = userData._id;
//Convert admin property of userData to a boolean value
      const admin = !!userData.admin;

      await User.findByIdAndUpdate(userId, {admin});
  }
  res.redirect("/blog")
  } catch(err) {
    console.log(err)
  }
}