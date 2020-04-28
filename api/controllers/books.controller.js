const cloudinary = require("cloudinary").v2;

const Book = require("../../models/book.model");
const Session = require("../../models/session.model");

module.exports.index = async (req, res) => {
  let books = await Book.find();
  res.json(books);
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

  let book = await Book.insertMany([req.body]);
  Book.save;
  res.json(book);
};

module.exports.edit = async (req, res) => {
  let book = await Book.findById(req.params.id);
  res.json(book);
};

module.exports.postEdit = async (req, res) => {
  if (!req.file) {
    var result = await cloudinary.uploader.upload(
      "https://cdn.glitch.com/46ef95f0-e192-4c0d-b1de-dc836e53b5d3%2Ffavicon.png?v=1587549411189"
    );
  } else {
    var result = await cloudinary.uploader.upload(req.file.path);
  }

  let book = await Book.findByIdAndUpdate(req.body._id, {
    title: req.body.title,
    coverUrl: result.url
  });

  res.json(book);
};

module.exports.delete = async (req, res) => {
  let book = await Book.findByIdAndDelete(req.params.id);
  res.json(book);
};

module.exports.add = async (req, res) => {
  let book = await Book.findById(req.params.id);
  let session = await Session.findById(req.signedCookies.sessionId);

  session.cart.push(book);

  await session.save();
  res.json(book);
};
