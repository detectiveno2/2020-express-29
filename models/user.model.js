const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  avatarUrl: String,
  password: String,
  wrongLoginCount: Number,
  isAdmin: Boolean
})

var User = mongoose.model('User', userSchema, 'users');
module.exports = User;