const express = require("express");
const nunjucks = require("nunjucks");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
const port = 3000;

const csvData = [];
const headers = [];

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "html");
app.use("/", express.static("static"));

async function loadDataIntoMemory() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("user.csv")
      .pipe(csv({ skipLines: 0 }))
      .on("headers", (header) => {
        headers.push(...header);
      })
      .on("data", (data) => {
        {
          csvData.push(data);
        }
      })
      .on("end", () => {
        console.log("파일 다 읽었다람쥐");
        resolve();
      })
      .on("error", (error) => {
        console.log("파일 읽기 오류", error);
        reject(error);
      });
  });
}

// 서버 시작
async function startserver() {
  await loadDataIntoMemory();

  app.get("/", (req, res) => {
    const itemsPerPage = 100;
    const page = req.query.page || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const Data = csvData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(csvData.length / itemsPerPage);

    res.render("index", {
      totalPages: totalPages,
      page: parseInt(page),
      headers: headers,
      Data: Data,
    });
  });

  app.get("/user", (req, res) => {
    const itemsPerPage = 100;
    const page = req.query.page || 1;

    const findData = csvData.filter((csvData) => csvData.Name.includes(req.query.name));
    const totalPages = Math.ceil(findData.length / itemsPerPage);

    res.render("index", {
      totalPages: totalPages,
      page: parseInt(page),
      headers: headers,
      Data: findData,
    });
  });

  app.get("/user/:id", (req, res) => {
    const Data = [csvData.find((csvData) => csvData.Id === req.params.id)];

    res.render("userDetail", { headers: headers, Data: Data });
  });

  app.listen(port, () => {
    console.log(`서버가 ${port} 에 생성되었습니다`);
  });
}

startserver();
