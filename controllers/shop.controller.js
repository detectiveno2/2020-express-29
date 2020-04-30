const cloudinary = require('cloudinary').v2;

const User = require('../models/user.model');
const Session = require('../models/session.model');
const Book = require('../models/book.model');

module.exports.index = async (req, res) => {
  let users = await User.find();
  res.render('shops/index', {
    users: users,
  });
};

module.exports.showBook = async (req, res) => {
  let user = await User.findById(req.params.id);

  res.render('books/index', {
    books: user.shop,
    user: user,
  });
};

module.exports.create = async (req, res) => {
  res.render('books/create');
};

module.exports.postCreate = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!req.file) {
    let result = await cloudinary.uploader.upload(
      'https://cdn.glitch.com/46ef95f0-e192-4c0d-b1de-dc836e53b5d3%2Ffavicon.png?v=1587549411189'
    );
    req.body.coverUrl = result.url;
  } else {
    let result = await cloudinary.uploader.upload(req.file.path);
    req.body.coverUrl = result.url;
  }

  await user.updateOne({ $push: { shop: req.body } });
  await user.save();
  res.redirect('../books');
};

module.exports.add = async (req, res) => {
  let session = await Session.findById(req.signedCookies.sessionId);
  let user = await User.findById(req.params.userId);
  let book = user.shop.find((book) => {
    return book.id == req.params.bookId;
  });

  await session.updateOne({ $push: { cart: book } });
  await session.save();

  res.redirect('/shops/' + req.params.userId + '/books');
};
