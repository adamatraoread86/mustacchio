const BlogPost = require("../models/BlogPost");

exports.getBlogs = async (req, res, next) => {

  try {
  //Find all blogs from mongoDB database, populate the values, and sort blogs by the postDate in descending order
    const blogs = await BlogPost.find().populate("title").sort({ postDate: -1 });
    console.log("blogs are: ", blogs)
    res.render("blog", { pageTitle: "Blog", blogs, path: req.baseUrl });
  } catch (e) {
    console.log("error: ", e);
  }
};

//Find a single blog from mongoDB atlas database
exports.getSingleBlog = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const blog = await BlogPost.findOne({ slug: slug });
    console.log("blog is: ", blog )
    if(!blog){
      res.send("Sorry, there is no blog")
    }
    res.render("blog-single-post", {
      pageTitle: blog.title,
      blog,
      path: req.baseUrl,
    });
  } catch (e) {
    console.log("error: ", e);
  }
};
