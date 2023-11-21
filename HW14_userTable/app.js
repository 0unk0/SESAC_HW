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

// 시간 측정
app.use((req, res, next) => {
  const start = Date.now();

  // 나중에 동작할 리스너 등록
  res.on("finish", () => {
    const end = Date.now();
    const duration = end - start;

    console.log(`요청 ${req.path} 에서 응답까지는 ${duration}ms 이 소요되었습니다.`)
  })
  next();
})

async function loadDataIntoMemory() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("user.csv")
    .pipe(csv({ skipLines: 0} ))
    .on("headers", (header) => {
        headers.push(...header);
    })
    .on("data", (data) => {
      {csvData.push(data)}    
      // 공백 제거
      // const cleanRow = {};
      // for (const [key, value] of Object.entries(data)) {
      //   cleanRow[key.trim()] = value.trim();
      // }
      // csvData.push(cleanRow);
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
    const itemsPerPage = 10;

    const page = req.query.page || 1; 
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(csvData.length / itemsPerPage);

    const Data = csvData.slice(startIndex, endIndex);
    res.render("index", { totalPages: totalPages, page: parseInt(page), headers: headers, Data: Data });
  });
  
  app.listen(port, () => {
    console.log(`서버가 ${port} 에 생성되었습니다`);
  });
}

startserver();