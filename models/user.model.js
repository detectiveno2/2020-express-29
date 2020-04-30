const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverUrl: String,
});
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  avatarUrl: String,
  password: String,
  wrongLoginCount: Number,
  isAdmin: Boolean,
  shop: [bookSchema],
});

var User = mongoose.model('User', userSchema, 'users');
module.exports = User;
