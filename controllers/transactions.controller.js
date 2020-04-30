const User = require('../models/user.model.js');
const Transaction = require('../models/transaction.model.js');
const Book = require('../models/book.model.js');

module.exports.index = async (req, res) => {
  let transactions = await Transaction.find();

  res.render('transactions/index', {
    transactions: transactions,
  });
};

module.exports.create = async (req, res) => {
  let users = await User.find();
  let books = await Book.find();
  res.render('transactions/create', {
    users: users,
    books: books,
  });
};

module.exports.postCreate = async (req, res) => {
  let user = await User.findById(req.body.userId);
  let book = await Book.findById(req.body.bookId);
  let transaction = {
    content: `${user.name} got ${book.title}.`,
    userId: user.id,
    bookId: book.id,
    isComplete: false,
  };

  let transactions = await Transaction.create(transaction);

  res.redirect('/transactions');
};

module.exports.complete = async (req, res) => {
  let transaction = await Transaction.findById(req.params.id);
  await transaction.update({ $set: { isComplete: true } });

  res.redirect('..');
};
