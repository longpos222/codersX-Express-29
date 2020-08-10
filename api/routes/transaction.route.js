var express = require("express");

var controller = require("../controllers/transaction.controller");
var middleware = require("../middleware/auth.middleware.js")

var router = express.Router();

router.get("/", middleware.requireAuth, controller.transactionsList);

router.post("/", controller.addTranx);

router.get("/:_id", middleware.requireAuth, controller.getTranxById);

router.delete("/:_id", controller.deleteTranx);

router.patch("/:_id", controller.updateTranx);

module.exports = router;