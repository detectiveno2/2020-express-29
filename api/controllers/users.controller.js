const cloudinary = require("cloudinary").v2;

const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
  let users = await User.find();
  res.json(users);
};

module.exports.postCreate = async (req, res) => {
  if (!req.file) {
    var result = await cloudinary.uploader.upload(
      "https://cdn.glitch.com/e2965d3f-b268-4401-b2bc-49d59d42e86c%2Fdefault-avatar.png?v=1587825999712"
    );
  } else {
    var result = await cloudinary.uploader.upload(req.file.path);
  }

  req.body.avatarUrl = result.url;

  let user = await User.create(req.body);

  res.json(user);
};

module.exports.edit = async (req, res) => {
  let user = await User.findById(req.params.id);
  res.json(user);
};

module.exports.postEdit = async (req, res) => {
  let user = await User.findById(req.body.id);

  await user.updateOne({
    $set: { name: req.body.name, phone: req.body.phone }
  });

  await user.save();
  res.json(user);
};

module.exports.delete = async (req, res) => {
  let user = await User.findByIdAndDelete(req.params.id);

  res.json(user);
};
