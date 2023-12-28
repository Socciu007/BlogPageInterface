const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  id: String,
  urlImg: String,
  category: String,
  title: String,
  meta: { type: String, default: "by Melisa Sawyer on October 06, 2023" },
  detail: String,
});

const Blog = mongoose.model("Blog", blogSchema, "blogs");
module.exports = Blog;
