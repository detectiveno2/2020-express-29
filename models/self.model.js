const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverUrl: String,
});
const selfSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  books: [bookSchema],
});
const Self = mongoose.model('Self', selfSchema, 'selfs');
module.exports = Self;
