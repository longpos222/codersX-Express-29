var express = require("express");
var router = express.Router();
var controller = require("../controllers/cart.controller");

router.get('/add/:bookId', controller.addToCart);

router.get('/borrow/',controller.borrowAll)

module.exports = router;