const express = require("express");
const nunjucks = require("nunjucks");

const mainController = require("./src/controllers/mainController");
const detailController = require("./src/controllers/detailController");

const app = express();
const PORT = 3000;

nunjucks.configure("./src/views", {
  autoescape: true,
  express: app,
});

app.use("/", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "html");

// ========= 라우팅 =========
app.get("/", (req, res, next) => {
  res.redirect("/user");
});

app.get("/user", mainController.main("user"));
app.get("/user_detail/:id", detailController.user_detail);

app.get("/store", mainController.main("store"));
app.get("/store_detail/:id", detailController.store_detail);

app.get("/order", mainController.main("order"));
app.get("/order_detail/:id", detailController.order_detail);

app.get("/orderitem", mainController.main("orderitem"));
app.get("/orderitem_detail/:id", detailController.orderitem_detail);

app.get("/item", mainController.main("item"));
app.get("/item_detail/:id", detailController.item_detail);

// ========= 서버 시작 =========
app.listen(PORT, (req, res) => {
  console.log(`서버가 ${PORT}번 포트 대기중...`);
});
