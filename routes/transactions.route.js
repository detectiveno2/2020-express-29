const express = require("express");

const controller = require("../controllers/transactions.controller");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.get("/complete/:id", controller.complete);

module.exports = router;
