const db = require("../db.json");
const Blog = require("../models/Blogs");

module.exports.index = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render("blogs/index", {
      blogs: blogs,
      posts: db.posts,
    });
  } catch (e) {
    res.status(500).json({ message: "Loi khi lay du lieu MongoDB" });
  }
};

module.exports.search = async (req, res) => {
  const search = req.query;
  const blogs = await Blog.find();
  const resultBlogs = await blogs.filter((blog) => {
    return blog.title.toLowerCase().indexOf(search.title.toLowerCase()) !== -1;
  });

  res.render("blogs/blogsearch/index", { blogs: resultBlogs, posts: db.posts });
};

module.exports.datailBlog = async (req, res) => {
  const blogs = await Blog.find();
  res.render("blogs/blogdetail/index", { blogs: blogs, posts: db.posts });
};

module.exports.seoTitleBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findOne({
      id: id,
    });
    const toSeoUrl = (title) => {
      return title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "") // Loại bỏ các ký tự đặc biệt
        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch nối
        .substring(0, 50); // Giới hạn độ dài URL (nếu cần)
    };
    res.render("blogs/blogdetail/index", {
      blogs: blog,
      seoUrl: toSeoUrl,
    });
  } catch (error) {
    res.status(404).json({
      status: "ERR",
      message: "Khong the Seo link.",
    });
  }
};
