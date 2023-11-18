const express = require("express");
const path = require("path");

const app = express();
const port = 3000;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const users = {};

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});
app.get("/about/images/:fileName", (req, res) => {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "images", req.params.fileName));
});
app.get("/about/static/:fileName", (req, res) => {
  res.sendFile(path.join(__dirname, "static", req.params.fileName));
});
app.get("/static/:fileName", (req, res) => {
  res.sendFile(path.join(__dirname, "static", req.params.fileName));
});

app.get("/user", (req, res) => {
  res.json(users);
});
app.post("/user", (req, res) => {
  const ID = Date.now();
  setName(ID, req);
  res.status(201).send("등록 성공");
});
app.put("/user/:ID", (req, res) => {
  const ID = req.params.ID;
  setName(ID, req);
  res.status(200).send("수정 성공");
});
app.delete("/user/:ID", (req, res) => {
  const ID = req.params.ID;
  delete users[ID];
  res.status(204).send("삭제 성공");
});

app.use((req, res) => {
  res.status(NOT_FOUND).send("Not Found");
});

app.listen(port, (req, res) => {
  console.log(`서버가 ${port}에서 실행 중입니다.`);
});

// ----------------------------------------
function setName(ID, req) {
  const jsonData = req.body;
  users[ID] = jsonData.name;
}
