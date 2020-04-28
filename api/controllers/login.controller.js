const bcrypt = require("bcrypt");

const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  res.json(req.body);
};

module.exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);

  let user = await User.findOne({ email: email });

  if (!user) {
    res.send("User does not exist.");
    return;
  }

  let result = await bcrypt.compare(password, user.password);

  if (result == false) {
    res.send("wrong password");
    return;
  } else {
    res.json(user);
    return;
  }
};
