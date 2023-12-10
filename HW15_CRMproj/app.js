const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
const PORT = 3000;

const routes = require("./src/routes/routes");

nunjucks.configure("./src/views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "html");

app.use("/", express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(PORT, (req, res) => {
  console.log(`서버가 ${PORT}번 포트 대기중...`);
});
