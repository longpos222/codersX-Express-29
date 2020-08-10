var express = require("express");

var controller = require("../controllers/book.controller");

var router = express.Router();

router.get("/", controller.booksList);

router.post("/", controller.addBook);

router.get("/:_id", controller.getBookById);

router.delete("/:_id", controller.deleteBook);

router.patch("/:_id", controller.updateBook);

module.exports = router;
