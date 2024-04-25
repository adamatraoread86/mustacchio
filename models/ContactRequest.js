const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

//Schema for contact request
const contactRequestSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"]
  },
  address: {
    type: String
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    validate:{
      validator: (value) => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);},
      message: (props) => `${props.value} is not a valid email address!`
  }
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
    required: true
  },
  datePosted: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateResponded: {
    type: Date
  },
  response: {
    type: String
  },

}, {timestamps: true})

//Virtual field for short message 
contactRequestSchema.virtual("shortMessage").get(function() {
  return `${this.message.split(/\s+/).slice(0, 10).join(" ")}...`; 
})

//virtual field to return first 50 characters of the name
contactRequestSchema.virtual("first50").get(function () {
  return this.name.split(/\s+/).slice(0, 50).join(" ");
});

module.exports = mongoose.model("ContactRequest", contactRequestSchema, "contactrequests");




