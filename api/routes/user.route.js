var express = require("express");

var controller = require("../controllers/user.controller");
var middleware = require("../middleware/auth.middleware.js");

var router = express.Router();

router.get("/", middleware.requireAuth, controller.usersList);

router.post("/", controller.addUser);

router.get("/:_id", middleware.requireAuth, controller.getUserById);

router.patch("/:_id", middleware.requireAuth, controller.updateUser);

router.delete("/:_id", middleware.requireAuth, controller.deleteUser);

module.exports = router;