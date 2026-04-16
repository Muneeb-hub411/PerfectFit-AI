const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Name must be unique"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
