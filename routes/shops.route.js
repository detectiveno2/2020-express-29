const express = require('express');
const multer = require('multer');

const controller = require('../controllers/shop.controller');

var upload = multer({ dest: './public/uploads/' });

const router = express.Router();

router.get('/', controller.index);

router.get('/:id/books', controller.showBook);

router.get('/:id/books/create', controller.create);

router.post('/:id/books/create', upload.single('cover'), controller.postCreate);

router.get('/:userId/books/:bookId/add', controller.add);

module.exports = router;
