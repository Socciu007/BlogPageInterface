const express = require("express");
const router = express.Router();
const controller = require("../controllers/AdminController");
const middleware = require("../middlewares/AuthMiddleware");
const multer = require("multer");

// const storage = multer.memoryStorage();

const upload = multer({
  dest: "./public/",
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB
  },
  // storage: storage,
});

router.get("/", controller.index);

router.post("/", upload.single("image"), controller.createBlog);

router.get("/email", controller.email);

router.get("/login", controller.logIn);

router.post("/login", controller.postLogIn);

router.get("/signup", controller.signUp);

router.post("/signup", controller.createUser);

module.exports = router;
