// Import path to construct path file names
const path = require("path");
//Require dotenv to store env variables
require("dotenv").config();
// Import npm libraries
const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");


// import routes
const homeRoutes = require("./routes/homeRoutes");
const stylesRoutes = require("./routes/stylesRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const middleware = require("./middleware");
const usersRoutes = require("./routes/usersRoutes");
const unauthorizedRoutes = require("./routes/unauthorizedRoutes");
const apiRoutes = require("./routes/apiRoutes");
const bltRoutes = require("./routes/bltRoutes");

// Database connection string
const MONGODB_URI =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qb2hoxm.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

//Initialize express framework
  const app = express();


// initialize session store
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});



const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

//Filter images per type and only authorize the types listed below to be submitted
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, "public")));
app.use("/public/images", express.static(path.join(__dirname, "public/images")));

// Load middleware to parse body
app.use(express.urlencoded({ extended: true }));


app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")

);
// Set the templating engine using app.set
app.set("view engine", "ejs");

// Tell the application where to find the views
app.set("views", "views");

app.use(expressLayouts);

//Initialize session middleware
app.use(
  session({
    secret: process.env._secret,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);



app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  if(req.session.user) {
    res.locals.user.admin = req.session.user.admin;
  }
  next();
});


//Middleware to create a fileStream
app.use(middleware);

//Set up routes
app.use("/styles", stylesRoutes);
app.use("/blog", blogRoutes);
app.use("/contacts", contactRoutes);
app.use("/unauthorized", unauthorizedRoutes);
app.use("/api", apiRoutes);
app.use("/blt", bltRoutes);
app.use(usersRoutes);
app.use(homeRoutes);




// Connect to mongoDB database server, then listen to the app in port 3000.
mongoose
.connect(MONGODB_URI)
.then((result) => {
 app.listen(process.env.PORT || 3000)
})
.catch((err) => {
  console.log(err);
});
