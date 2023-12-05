const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

const PORT = 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("public"));
app.set("view engine", "html");

const mainRoutes = require("./src/routes/mainRoutes.js");
app.use("/", mainRoutes);

app.listen(PORT, (req, res) => {
  console.log(`서버가 ${PORT}번 포트 대기중...`);
});
