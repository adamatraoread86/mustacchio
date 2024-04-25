const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

//Schema for Mustache style
const mustacheStyleSchema = new Schema({
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
      validator: function (value) { return /([^ ]+\.(?:jpg|png))$/.test(value)},
      message: (props) => `${props.value} is not a valid image URL!`
  }
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
})

  //Virtual field that returns first 50 characters of the title
  mustacheStyleSchema.virtual("first50").get(function () {
    return this.title.split(/\s+/).slice(0, 50).join(" ");
  });

module.exports = mongoose.model("MustacheStyle", mustacheStyleSchema, "mustachestyles");



