const User = require("../models/Users");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.UserId) {
    res.redirect("/admin/login");
    return;
  }

  const user = await User.find({ id: req.cookies.UserId });

  if (user.length == 0) {
    res.redirect("/admin/login");
    return;
  }

  next();
};
