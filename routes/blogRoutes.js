const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");

router.get("/", blogController.getBlogs);

router.get("/:slug", blogController.getSingleBlog);

module.exports = router;
