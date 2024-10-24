const express = require("express");
const userController = require("../Controllers/UserController")
const authController = require("../Controllers/Authcontroller");

const router = express.Router();

router.post("/signup",authController.signup)
router.post("/login",authController.login)


router.route("/").get(userController.getUser);

module.exports = router;