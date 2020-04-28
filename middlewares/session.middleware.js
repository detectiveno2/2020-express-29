const Session = require("../models/session.model.js");

module.exports = async (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    let session = await Session.create({ cart: [] });

    res.cookie("sessionId", session.id, {
      signed: true
    });
  }
  next();
};
