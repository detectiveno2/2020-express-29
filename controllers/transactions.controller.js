const User = require("../models/user.model.js");
const Transaction = require("../models/transaction.model.js");
const Book = require("../models/book.model.js");

module.exports.index = async (req, res) => {
  let perPage = 4;
  let page = req.query.page || 1;
  let start = (page - 1) * perPage;
  let end = page * perPage;

  let user = await User.findById(req.signedCookies.userId);
  let transactions = await Transaction.find();

  console.log(transactions);

  if (user.isAdmin) {
    res.render("transactions/index", {
      transactions: transactions,
      pageQuantity: Math.floor(transactions.length / perPage + 1)
    });
    return;
  }

  let userTrans = transactions.filter(tran => {
    return tran.userId == user.id;
  });
  console.log(userTrans);

  res.render("transactions/index", {
    transactions: userTrans,
    pageQuantity: Math.floor(userTrans.length / perPage + 1)
  });
};

module.exports.create = async (req, res) => {
  let users = await User.find();
  let books = await Book.find();
  res.render("transactions/create", {
    users: users,
    books: books
  });
};

module.exports.postCreate = async (req, res) => {
  let user = await User.findById(req.body.userId);
  let book = await Book.findById(req.body.bookId);
  let transaction = {
    content: `${user.name} got ${book.title}.`,
    userId: user.id,
    bookId: book.id,
    isComplete: false
  };

  let transactions = await Transaction.create(transaction);

  res.redirect("/transactions");
};

module.exports.complete = async (req, res) => {
  let transaction = await Transaction.findById(req.params.id);
  await transaction.update({ $set: { isComplete: true } });

  res.redirect("..");
};
