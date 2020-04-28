const cloudinary = require("cloudinary").v2;

const Book = require("../models/book.model");
const Session = require("../models/session.model");
const User = require("../models/user.model");

module.exports.index = async (req, res, next) => {
  let perPage = 4;
  let page = req.query.page || 1;
  let start = (page - 1) * perPage;
  let end = page * perPage;

  let books = await Book.find();

  res.render("books/index", {
    books: books,
    pageQuantity: Math.floor(Book.find().length / perPage + 1)
  });
};

module.exports.create = (req, res) => {
  res.render("books/create");
};

module.exports.postCreate = async (req, res) => {
  if (!req.file) {
    let result = await cloudinary.uploader.upload(
      "https://cdn.glitch.com/46ef95f0-e192-4c0d-b1de-dc836e53b5d3%2Ffavicon.png?v=1587549411189"
    );
    req.body.coverUrl = result.url;
  } else {
    let result = await cloudinary.uploader.upload(req.file.path);
    req.body.coverUrl = result.url;
  }

  await Book.insertMany([req.body]);
  Book.save;
  res.redirect("/books");
};

module.exports.edit = (req, res) => {
  res.render("books/edit", {
    id: req.params.id
  });
};

module.exports.postEdit = async (req, res) => {
  if (!req.file) {
    var result = await cloudinary.uploader.upload(
      "https://cdn.glitch.com/46ef95f0-e192-4c0d-b1de-dc836e53b5d3%2Ffavicon.png?v=1587549411189"
    );
  } else {
    var result = await cloudinary.uploader.upload(req.file.path);
  }

  await Book.findByIdAndUpdate(req.body.id, {
    title: req.body.title,
    coverUrl: result.url
  });
  Book.save;

  res.redirect("/books");
};

module.exports.delete = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  Book.save;

  res.redirect("/books");
};

module.exports.add = async (req, res) => {
  let book = await Book.findById(req.params.id);
  let session = await Session.findById(req.signedCookies.sessionId);

  console.log(session.cart);
  session.cart.push(book);
  console.log(session.cart);

  await session.save();
  res.redirect("/books");
};
