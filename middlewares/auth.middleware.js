const User = require('../models/user.model.js');

module.exports.requireAuth = (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }

  let user = User.findById(req.signedCookies.userId);

  if (!user) {
    res.redirect("auth/login");
    return;
  }
  
  res.locals.user = user;
  
  next();
};
