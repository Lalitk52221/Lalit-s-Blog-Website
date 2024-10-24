const express = require("express");
const BlogController = require("../Controllers/BlogController");
const AuthController = require("../Controllers/Authcontroller");
const router = express.Router();

router.post("/createblog", AuthController.createBlog);
router.route("/").get(BlogController.getAllBlog);

router.route("/:_id").patch(BlogController.editBlog);
router.route("/:_id").delete(BlogController.deleteBlog);

module.exports = router;
