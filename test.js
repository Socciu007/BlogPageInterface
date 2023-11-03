const express = require("express");
const app = express();
const db = require("./db");

const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", { user: "Tien" });
});

app.get("/users", (req, res) => {
  res.render("users/index", { users: db.users });
});

app.get("/users/create", (req, res) => {
  res.render("users/create");
});

app.get("/users/search", (req, res) => {
  const keySearch = req.query;
  const resultUsers = db.users.filter((user) => {
    return user.name.toLowerCase().indexOf(keySearch.q.toLowerCase()) !== -1;
  });
  res.render("users/index", {
    users: resultUsers,
  });
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const user = db.users.find((user) => {
    return user.id == id;
  });
  console.log(user);
  res.render("users/view", { user: user });
});

app.post("/users/create", (req, res) => {
  db.users.push(req.body);
  console.log(db.users);
  res.redirect("/users");
});

app.listen(port, () => {
  console.log("Server on port " + port);
});
