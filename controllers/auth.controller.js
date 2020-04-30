const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const cloudinary = require('cloudinary').v2;

const User = require('../models/user.model.js');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.login = (req, res) => {
  res.render('auth/login');
};

module.exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({ email: email });

  if (user.wrongLoginCount > 3) {
    const msg = {
      to: 'nhatthien185@gmail.com',
      from: 'nhatthien185@gmail.com',
      subject: 'We believe your account is attacked.',
      text: 'Your account is parse over three times.',
      html: "<strong>It's really nghiem trong, please dont chu quan</strong>",
    };

    sgMail.send(msg);

    res.render('auth/login', {
      error: 'Your account is locked.',
    });
    return;
  }

  if (!user) {
    res.render('auth/login', {
      error: 'User does not exist.',
    });
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result === false) {
      let newValue = (user.wrongLoginCount += 1);
      user.updateOne({ $set: { wrongLoginCount: newValue } });
      res.render('auth/login', {
        error: 'Wrong password.',
        values: req.body,
      });

      return;
    }

    res.cookie('userId', user.id, { signed: true });

    res.redirect('/users');
  });

  return;
};

module.exports.signUp = async (req, res) => {
  res.render('auth/signup');
};

module.exports.postSignUp = async (req, res) => {
  if (!req.file) {
    var result = await cloudinary.uploader.upload(
      'https://cdn.glitch.com/e2965d3f-b268-4401-b2bc-49d59d42e86c%2Fdefault-avatar.png?v=1587825999712'
    );
  } else {
    var result = await cloudinary.uploader.upload(req.file.path);
  }

  req.body.avatarUrl = result.url;

  const saltRounds = 10;
  let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  req.body.password = hashedPassword;
  req.body.wrongLoginCount = 0;
  req.body.isAdmin = false;

  await User.create(req.body);

  res.redirect('/users');
};
