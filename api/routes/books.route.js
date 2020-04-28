const express = require("express");

const controller = require("../controllers/books.controller");

const router = express.Router();

router.get("/", controller.index);

router.post('/create', controller.postCreate);

router.get('/edit/:id', controller.edit);

router.post('/edit', controller.postEdit);

router.delete('/delete/:id', controller.delete);

router.post('/add/:id', controller.add);

module.exports = router;
