const mongoose = require("mongoose");

// import Models
const MustacheStyle = require("../models/MustacheStyle");
const BlogPost = require("../models/BlogPost");


// import data
const mustacheData = require("./mustacheData.json");
const blogData = require("./blogData.json");
//Connect to mongoDB database
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qb2hoxm.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`
  )
    .then(() => {
      //Bulk create blog posts
      return BlogPost.create(blogData);
    })
    .then((result) => {
      console.log("blogPosts are: ", result);
      // Bulk create mustache styles
      return MustacheStyle.create(mustacheData);
    })
    .then((result) => {
      console.log("Mustache styles are: ", result)
    })
    .catch((err) => {
      console.log(err)
    })



