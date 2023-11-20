const express = require("express");
const nunjucks = require("nunjucks");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
const port = 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "html");
app.use("/", express.static("static"));

app.get("/", (req, res) => {
  const csvData = [];
  const headers = ["Id", "Name", "Gender", "Age", "Birthdate", "Address"];

  fs.createReadStream("user.csv")
    .pipe(csv({ skipLines: 0}, headers ))
    .on("data", (data) => {
        if (csvData.length < 20) {csvData.push(data)}
    })
    .on("end", () => {
      res.render("index", { headers: headers, csvData: csvData });
    });
});

app.listen(port, () => {
  console.log(`서버가 ${port} 에 생성되었습니다`);
});
