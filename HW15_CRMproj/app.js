const express = require("express");
const nunjucks = require("nunjucks");
// const sqlite = require("sqlite3");
// const db = new sqlite.Database("CRMproj.db");

const app = express();
const PORT = 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

const mainRoutes = require("./src/routes/mainRoutes.js");
app.use("/", mainRoutes);

app.use("/", express.static("public"));
app.set("view engine", "html");

// app.get("/", (req, res) => {
//   res.render("user");
// });

// app.get("/user", (req, res) => {
//   // const query = db.prepare("SELECT * FROM users");
//   const headers = ["Id", "Name", "Gender", "Age", "Birthdate"];
//   db.all("SELECT * FROM users", (err, rows) => {
//     res.render("user", { headers: headers, userTable: rows });
//   });
// });

// app.get("/order", (req, res) => {
//   res.render("order");
// });

// app.get("/orderitem", (req, res) => {
//   res.render("orderitem");
// });

// app.get("/item", (req, res) => {
//   res.render("item");
// });

// app.get("/store", (req, res) => {
//   res.render("store");
// });

app.listen(PORT, (req, res) => {
  console.log(`서버가 ${PORT}번 포트 대기중...`);
});
