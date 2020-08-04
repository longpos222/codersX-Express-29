var express = require("express");

var controller = require("../controllers/book.controller");

var router = express.Router();

router.get("/", controller.booksList);

router.get("/add", controller.add);

router.post("/add", controller.addPOST);

router.get("/update-title/:_id", controller.update);

router.get("/delete/:_id", controller.delete);

router.post("/update-title/:_id", controller.updatePOST);

module.exports = router;
