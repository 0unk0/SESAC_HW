const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
const PORT = 3000;

const userRoutes = require("./src/routes/userRoutes");
const storeRoutes = require("./src/routes/storeRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const orderitemRoutes = require("./src/routes/orderitemRoutes");
const itemRoutes = require("./src/routes/itemRoutes");

nunjucks.configure("./src/views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "html");

app.use("/", express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  console.log(req.url);
  next();
});
app.get("/", (req, res, next) => {
  res.redirect("/user");
});
app.use("/user", userRoutes);
app.use("/store", storeRoutes);
app.use("/order", orderRoutes);
app.use("/orderitem", orderitemRoutes);
app.use("/item", itemRoutes);

app.listen(PORT, (req, res) => {
  console.log(`서버가 ${PORT}번 포트 대기중...`);
});
