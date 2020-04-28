const express = require("express");

const controller = require("../controllers/cart.controller");

const router = express.Router();

router.get('/', controller.index);

router.get('/remove/:id', controller.remove);

router.get('/hire', controller.hire);

module.exports = router;