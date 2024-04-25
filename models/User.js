const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Please provide your first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide your last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: {
      validator: (value) => {return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);},
      message: (props) => `${props.value} is not a valid email address!`
    },
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    validate: {
      validator: (value) => passwordRegex.test(value),
      message: "Password must be at least 12 characters and include at least one letter, one number, and one special character",
    },
  },
  admin: {
    type: Boolean,
    default: false,
  },
  favoriteStyles: [
    {
      type: Schema.Types.ObjectId,
      ref: "MustacheStyle",
    },
  ],
});

//pre-save to set up user hashed password
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

// Instance method to validate the user's password
userSchema.methods.validatePassword = function (enteredPassword) {
    // bcrypt.compare returns true if the password matches, false otherwise
    return bcrypt.compare(enteredPassword, this.password);
  };

  // this static method will check if the entered email is new (has not been used before)
  userSchema.statics.checkEmailNew = async function (email) {
    //Try to find a user with the entered email
    const user = await this.findOne({email: email});
    // Return true if we don't find an existing user with the email address, false otherwise
    return !Boolean(user);
  }

  //virtual field to get the user's fullname 
  userSchema.virtual("name").get(function()  {
    return this.firstname + ' ' + this.lastname;
  })


module.exports = mongoose.model("User", userSchema, "users");
