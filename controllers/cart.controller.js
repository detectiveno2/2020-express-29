const Session = require("../models/session.model.js");
const User = require("../models/user.model.js");
const Transaction = require('../models/transaction.model.js');

module.exports.index = async (req, res) => {
  let session = await Session.findById(req.signedCookies.sessionId);

  res.render("cart/index", {
    cart: session.cart
  });
};

module.exports.remove = async (req, res) => {
  let session = await Session.findById(req.signedCookies.sessionId);

  for (let i = 0; i < session.cart.length; i++) {
    if (session.cart[i].id == req.params.id) {
      session.cart.splice(i, 1);
      break;
    }
  }

  await session.save();
  res.redirect("/cart");
};

module.exports.hire = async (req, res) => {
  let session = await Session.findById(req.signedCookies.sessionId);

  if (session.cart.length == 0) {
    res.redirect("/books");
    return;
  }

  let user = await User.findById(req.signedCookies.userId);
  
  for (let book of session.cart) {
    let transaction = {
      content: `${user.name} got ${book.title}.`,
      userId: user.id,
      bookId: book.id,
      isComplete: false
    };
    console.log(transaction);
    await Transaction.create(transaction);
  }
  
  session.cart = [];
  session.save();
  
  res.redirect("/transactions");
};
