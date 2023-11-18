const http = require("http");
const fs = require("fs").promises;
const path = require("path");

// const { parse } = require("querystring");

const SUCCESS = 200;
const SERVER_ERROR = 500;
const NOT_FOUND = 404;

const users = {};

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url);
  try {
    if (req.method === "GET") {
      if (req.url === "/") {
        await sendReadFileResponse("./static/index.html", res);
      } else if (req.url == "/about/") {
        await sendReadFileResponse("./static/about.html", res);
      } else if (req.url == "/user") {
        res.writeHead(SUCCESS, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(JSON.stringify(users));
      } else if (req.url.startsWith("/static/")) {
        await sendReadFileResponse(`.${req.url}`, res);
      } else if ((imageMatch = req.url.match(/^\/images\/(.+)$/))) {
        // <----- 이 코드가 되는게,,,
        const imageName = imageMatch[1];
        try {
          await sendReadFileResponse(`./images/${imageName}`, res);
        } catch (err) {
          sendStatusResponse(NOT_FOUND, res);
        }
      } else {
        sendStatusResponse(NOT_FOUND, res);
      }
    } else if (req.method === "POST") {
      // <--- 숙제 4, 5 해결하면 POST, PUT, DELETE 코드 리팩토링 필요!!!
      if (req.url === "/user") {
        const ID = Date.now();
        setName(ID, req, res);
      } else {
        sendStatusResponse(NOT_FOUND, res);
      }
    } else if (req.method === "PUT") {
      if (req.url.startsWith("/user/")) {
        const ID = req.url.split("/")[2];
        setName(ID, req, res);
      } else {
        sendStatusResponse(NOT_FOUND, res);
      }
    } else if (req.method === "DELETE") {
      if (req.url.startsWith("/user")) {
        const key = req.url.split("/")[2];
        delete users[key];
        try {
          res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(JSON.stringify(users));
        } catch (error) {
          console.error("삭제 중 오류 발생", error);
          sendStatusResponse(SERVER_ERROR, res);
        }
      } else {
        sendStatusResponse(NOT_FOUND, res);
      }
    }
  } catch (err) {
    sendStatusResponse(SERVER_ERROR, res);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`${port}번 포트 열려있음`);
});

// -----------------------------------------------------

function getContentType(filePath) {
  const extname = path.extname(filePath);
  console.log(extname);
  switch (extname) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "application/javascript; charset=utf-8";
    case ".jpg":
      return "images/jpeg; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function sendStatusResponse(statusCode, res) {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  switch (statusCode) {
    case NOT_FOUND:
      return res.end("Not Found");
    case SERVER_ERROR:
      return res.end("서버에서 알수없는 오류가 발생하여 삭제에 실패했습니다.");
  }
}

async function sendReadFileResponse(filePath, res) {
  const data = await fs.readFile(filePath);
  const contentType = getContentType(filePath);
  res.writeHead(SUCCESS, { ContentType: contentType });
  res.end(data);
}

function setName(id, req, res) {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", () => {
    const formData = JSON.parse(body);
    users[id] = formData.name;
    console.log(users);
  });
  res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("수정 성공");
}
