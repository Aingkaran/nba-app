const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  
});

module.exports = mongoose.model("User", user);