const { subtle } = require("crypto");
const http = require("http");
const fs = require("fs").promises;

const SUCCESS = 200;
const SERVER_ERROR = 500;
const NOT_FOUND = 404;

const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url);

    try {
        if (req.method === "GET") {
            if (req.url === "/"){
                const data = await fs.readFile("./index.html");
                res.writeHead(SUCCESS, {"Content-Type": "text/html; charset=utf-8"});
                res.end(data);
            } else if (req.url == "/Quokka") {
                const data = await fs.readFile("./Quokka.html");
                res.writeHead(SUCCESS, {"Content-Type": "text/html; charset=utf-8"});
                res.end(data);  
            } else if (req.url.startsWith("/images/")){ // <--------------- 숙제 1
                const filePath = "." + req.url;
                const data = await fs.readFile(filePath);
                res.writeHead(SUCCESS, {"Content-Type": "image/jpeg"});
                res.end(data);  
            } else if (req.url.startsWith("/static/")){ // <--------------- 숙제 2
                const fileName = req.url.split(/\/static\//g)[1]; 
                const ext = fileName.split(/\./g)[1]; 
                const filePath = "./static/" + fileName;
                let type = "";
                let subType = "";
                if (ext === "jpeg" || ext === "jpg" || ext === "png") {
                    type = "image";
                    if (ext === "jpg") {
                        subType = "jpeg";
                    } else {
                        subType = ext;
                    }                    
                } else if (ext === "css" || ext === "js") {
                    type = "text";
                    if (ext === "js"){
                        subType = "javascript";
                    } else {
                        subType = ext;
                    }
                }
                const data = await fs.readFile(filePath);
                res.writeHead(SUCCESS, {"Content-Type": `${type}/${subType}`});
                res.end(data); 
            } else{
                res.writeHead(NOT_FOUND, {"Content-Type": "text/plain; charset=utf-8"});
                res.end("Not Found");
            }
        } else if (req.method === "POST") {
            // 요청을 생성할 때
            res.writeHead(201);
            res.end("등록 성공");
        } else if (req.method === "PUT") {
            // 요청을 수정할 때
            res.end("수정 성공");
        } else if (req.method === "DELETE") {
            // 요청을 삭제할 때
            res.end("삭제 성공");
        }
    } catch(err) {
        console.error(err);
        res.write(SERVER_ERROR, {"Content-Type": "text/plain; charset-utf-8"});
        res.end("서버 오류");
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`${port}번 포트 열려있음`);
})