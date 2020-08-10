var express = require("express");

var controller = require("../controllers/auth.controller");

var router = express.Router();

router.post("/login", controller.postLogin);

router.post("/logout", controller.postLogout);

module.exports = router;