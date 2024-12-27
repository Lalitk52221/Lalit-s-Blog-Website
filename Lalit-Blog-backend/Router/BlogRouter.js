const express = require("express");
const BlogController = require("../Controllers/BlogController");
const AuthController = require("../Controllers/Authcontroller");
const router = express.Router();

router.post("/createblog", AuthController.createBlog);
router.route("/").get(BlogController.getAllBlog);

router.patch("/:_id",BlogController.editBlog);
router.route("/:_id").delete(BlogController.deleteBlog);

module.exports = router;
