const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  isComplete: Boolean
})

var Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');
module.exports = Transaction;