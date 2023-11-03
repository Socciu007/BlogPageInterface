const User = require("../models/Users");
const Blog = require("../models/Blogs");
const db = require("../db.json");
const shortid = require("shortid");
const md5 = require("md5");

const toSeoUrl = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "") // Loại bỏ các ký tự đặc biệt
    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch nối
    .substring(0, 50); // Giới hạn độ dài URL (nếu cần)
};

module.exports.index = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const perPage = 8;
    const start = (page - 1) * perPage;
    const end = page * perPage;

    const blogs = await Blog.find();
    res.render("admins/index", {
      blogs: blogs.slice(start, end),
      seoUrl: toSeoUrl,
    });
  } catch (error) {
    res.status(404).json({ message: "Error load blogs page." });
  }
};

module.exports.email = async (req, res) => {
  res.render("admins/email/index");
};

module.exports.logIn = async (req, res) => {
  const blogs = await Blog.find();
  res.render("users/login", {
    errors: null,
    values: "",
    blogs: blogs,
    posts: db.posts,
  });
};

module.exports.postLogIn = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const users = await User.find({ username: username });

  if (!username) {
    res.render("users/login", {
      errors: ["Username is required."],
      values: req.body,
    });
    return;
  }

  if (users.length == 0) {
    res.render("users/login", {
      errors: ["User does not exist."],
      values: req.body,
    });
    return;
  }

  //hashed password
  const hashedPassword = md5(password);
  for (user of users) {
    if (user.password !== hashedPassword) {
      res.render("users/login", {
        errors: ["Wrong password."],
        values: req.body,
      });
      return;
    } else {
      res.cookie("UserId", user.id);
      res.redirect("/admin");
    }
  }
};

module.exports.signUp = async (req, res) => {
  const blogs = await Blog.find();
  res.render("users/signup", {
    errors: null,
    values: "",
    blogs: blogs,
    posts: db.posts,
  });
};

module.exports.createUser = async (req, res) => {
  try {
    const errors = [];
    const values = req.body;
    if (!req.body.username) {
      errors.push("Username is required.");
    }

    if (!req.body.password) {
      errors.push("Password is required");
    }

    if (req.body.confirmpassword !== req.body.password) {
      errors.push("Confirm password diferent with password.");
    }

    if (errors.length) {
      res.render("users/signup", { errors: errors, values: values });
      return;
    }

    //hashed password
    const password = md5(req.body.password);
    const newUser = new User({
      id: shortid.generate(),
      username: req.body.username,
      password: password,
    });

    await User.create(newUser);

    res.redirect("/admin/login");
  } catch (error) {
    res.status(404).json({ message: "Add user fail!" });
  }
};

module.exports.createBlog = async (req, res) => {
  try {
    req.body.image = "../../" + req.file.path.split("\\").slice(1).join("/");

    const newBlog = new Blog({
      id: shortid.generate(),
      urlImg: req.body.image,
      category: req.body.category,
      title: req.body.title,
      meta: "by Melisa Sawyer on October 06, 2023",
      detail: req.body.details,
    });
    await Blog.create(newBlog);

    res.redirect("/admin");
  } catch (error) {
    res.status(404).json({ message: "Add blog is not success!" });
  }
};

// try {
//   const resizedImageBuffer = await sharp(req.file.buffer)
//   .resize(Number(req.body.width), Number(req.body.height))
//   .toBuffer()
//   res.writeHead(200, {
//     "Content-Type": "image/png",
//     "Content-Disposition": 'attachment; filename ="resized_image.png'
//   })
//   res.end(resizedImageBuffer)
//  } catch(error) {
//   if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
//     return res.status(400).send("Kích thước ảnh không được vượt quá 25MB");
//   }
//   next(error);
//  }
