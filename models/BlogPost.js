const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

//BlogPost Schema
const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    set: function (value) {
      this.slug = slugify(value, { lower: true, trim: true });
      return value;
    },
  },
  imageURL:{
    type: String,
    required: true,
    validate:{
      validator: function (value) { return /([^ ]+\.(?:jpg|png))$/.test(value);},
      message: (props) => `${props.value} is not a valid image URL!`
  }
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    required: true,
    default: Date.now
  },
slug: {
  type: String,
  required: true
},
}) 

//Virtual field that returns the first 50 characters of the title
blogPostSchema.virtual("first50").get(function () {
  return this.title.split(/\s+/).slice(0, 50).join(" ");
});

//Virtual field that returns the first 350 characters of the summary
blogPostSchema.virtual("first350").get(function () {
  return this.summary.split(/\s+/).slice(0, 350).join(" ");
});


module.exports = mongoose.model("BlogPost", blogPostSchema, "blogposts");




