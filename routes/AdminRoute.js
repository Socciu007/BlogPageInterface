const express = require("express");
const router = express.Router();
const controller = require("../controllers/AdminController");
const middleware = require("../middlewares/AuthMiddleware");
const multer = require("multer");
const upload = multer({
  dest: "./public/uploads/",
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB
  },
});

router.get("/", middleware.requireAuth, controller.index);

router.post("/", upload.single("image"), controller.createBlog);

router.get("/email", controller.email);

router.get("/login", controller.logIn);

router.post("/login", controller.postLogIn);

router.get("/signup", controller.signUp);

router.post("/signup", controller.createUser);

module.exports = router;
