const mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverUrl: String
});

var sessionSchema = new mongoose.Schema({
  cart: [bookSchema]
});

const Session = mongoose.model("Session", sessionSchema, "sessions");
module.exports = Session;
