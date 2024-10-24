const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    required: [true, "Enter Title"],
  },
  blogtext: {
    type: String,
    required: [true, "Enter Text"],
  },
  photourl:{
    type:"String",
    required:[true,"Enter any Photo URL"]
  }
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
