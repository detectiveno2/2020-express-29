const express = require('express');
const multer = require('multer');

const controller = require('../controllers/auth.controller');
const usersMiddleware = require('../middlewares/create-user.middleware');

const router = express.Router();
var upload = multer({ dest: './public/uploads/' });

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

router.get('/signup', controller.signUp);

router.post(
  '/signup',
  upload.single('avatar'),
  usersMiddleware.checkInf,
  controller.postSignUp
);

module.exports = router;
