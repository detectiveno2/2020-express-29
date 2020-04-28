const Session = require("../../models/session.model.js");
const User = require("../../models/user.model.js");
const Transaction = require("../../models/transaction.model.js");

module.exports.index = async (req, res) => {
  let session = await Session.findById(req.signedCookies.sessionId);

  res.json(session.cart);
};

module.exports.remove = async (req, res) => {
  let session = await Session.findById(req.signedCookies.sessionId);

  session.cart.id(req.params.id).remove();

  await session.save();

  res.json(session);
};

module.exports.hire = async (req, res) => {
  let session = await Session.findById(req.signedCookies.sessionId);

  let user = await User.findById(req.signedCookies.userId);

  for (let book of session.cart) {
    let transaction = {
      content: `${user.name} got ${book.title}.`,
      userId: user.id,
      bookId: book.id,
      isComplete: false
    };
    
    await Transaction.create(transaction);
  }

  session.cart = [];
  session.save();

  res.json(session);
};
