const MustacheStyle = require("../models/MustacheStyle");

exports.getStyles = async (req, res, next) => {
  try {
    const styles = await MustacheStyle.find().populate("title");
    console.log("styles are: ", styles);
    res.render("gallery", { pageTitle: "Gallery", styles, path: req.baseUrl });
  } catch (e) {
    console.log("error: ", e);
  }
}

exports.getSingleStyle = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const style = await MustacheStyle.findOne({ slug: slug });
    console.log("style is: ", style);
    if (!style) {
      res.send("Sorry, there is no style");
    }
    res.render("gallery-single-post", {
      pageTitle: style.title,
      style,
      path: req.baseUrl,
    });
  } catch (e) {
    console.log("error: ", e);
  }
}

exports.getNewStyle = (req, res, next) => {
  res.render("new-style", {
    pageTitle: "New style",
    path: "/styles/new",
  });
}

exports.createNewStyle = async (req, res, next) => {
  // Retrieve values from the form
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file;

  try {
    if (!image) {
      return res.render("new-style", {
        pageTitle: "New style",
        path: "/styles/new",
        message: "Please, upload a valid image!",
        entries: req.body,
      });
    }
  //Set imageURL to an image path to be stored in mongoDB database
    const imageURL = image.path;
  //Create a new style
    const style = new MustacheStyle({
      title: title,
      description: description,
      imageURL: imageURL,
    });
    await style.save();
    res.redirect("/styles");
  } catch (err) {
    console.log(err);
    res.render("new-style", {
      pageTitle: "New style",
      path: "/styles/new",
      message: "Oops! something went wrong",
      entries: req.body,
    })
  } 
}


