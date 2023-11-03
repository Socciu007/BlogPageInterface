const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
