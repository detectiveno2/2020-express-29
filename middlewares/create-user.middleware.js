module.exports.checkInf = (req, res, next) => {
  console.log(req.body);
  let errors = [];
  if (!req.body.email) errors.push('Email is required.');
  if (!req.body.name) errors.push('Name is required.');
  if (!req.body.password) errors.push('Password is required.');
  if (errors.length > 0) {
    res.render('auth/signup', {
      errors: errors,
    });
    return;
  }
  next();
};
