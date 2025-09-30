const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    require: true,
    lowercase: true,
    unique: true,
    minlength: [3, "userName should have min 3 char"],
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    require: true,
    minlength: [5, "email should have atleast 5 char"],
  },

  password: {
    type: String,
    trim: true,
    require: true,
    minlength: [5, "password should have atleast 5 char"],
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
