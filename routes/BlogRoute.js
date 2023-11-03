const express = require("express");
const router = express.Router();
const controller = require("../controllers/BlogController");

router.get("/", controller.index);

router.get("/:id/:seoTitleBlog", controller.seoTitleBlog);

router.get("/search", controller.search);

router.get("/blog-detail", controller.datailBlog);

module.exports = router;
