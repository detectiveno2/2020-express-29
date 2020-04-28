const cloudinary = require("cloudinary").v2;

const User = require("../models/user.model");

module.exports.index = async (req, res) => {
  let user = await User.findById(req.signedCookies.userId);

  res.render("profile/index", {
    user: user
  });
};

module.exports.update = async (req, res) => {
  let user = await User.findById(req.signedCookies.userId);

  res.render("profile/update", {
    user: user
  });
};

module.exports.postUpdate = async (req, res) => {
  if (!req.file) {
    var result = await cloudinary.uploader.upload(
      "https://cdn.glitch.com/e2965d3f-b268-4401-b2bc-49d59d42e86c%2Fdefault-avatar.png?v=1587825999712"
    );
  } else {
    var result = await cloudinary.uploader.upload(req.file.path);
  }
  let user = await User.findById(req.body.id);
  user.updateOne({ $set: { avatarUrl: result.url } });

  res.redirect("/profile/index" + req.body.id);
};
