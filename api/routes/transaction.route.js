var express = require("express");

var controller = require("../controllers/transaction.controller");
var middleware = require("../middleware/auth.middleware.js")

var router = express.Router();

router.get("/", middleware.requireAuth, controller.transactionsList);

// router.get("/create", controller.create);

// router.post("/create", controller.createPOST);

// router.get("/:_id/complete", controller.complete);

module.exports = router;