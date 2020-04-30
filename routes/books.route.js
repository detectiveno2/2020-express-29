const express = require('express');
const multer = require('multer');

const controller = require('../controllers/books.controller');

const router = express.Router();
var upload = multer({ dest: './public/uploads/' });

router.get(
  '/' /*
  (req, res, next) => {
    try {
      var a;
      a.b();
    } catch (error) {
      res.render('500');
    }
  },*/,
  controller.index
);

router.get('/:id/shop', controller.shopIndex);

router.get('/create', controller.create);

router.post('/create', upload.single('cover'), controller.postCreate);

router.get('/edit/:id', controller.edit);

router.post('/edit', upload.single('cover'), controller.postEdit);

router.get('/delete/:id', controller.delete);

router.get('/add/:id', controller.add);

module.exports = router;
