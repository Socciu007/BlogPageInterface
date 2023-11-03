const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const blogRouter = require("./routes/BlogRoute");
const adminRouter = require("./routes/AdminRoute");
const connectDB = require("./configDB");

const port = 3000;

//Connect MongoDB
connectDB();

//Config ejs
app.set("view engine", "ejs");
app.set("views", "./views");
//parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//
app.use(cookieParser());
//Config file static
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index", { user: "Tien" });
});

app.use("/admin", adminRouter);
app.use("/blog", blogRouter);

app.listen(port, () => {
  console.log("Server on port " + port);
});
