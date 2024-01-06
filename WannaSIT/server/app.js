import express from "express";
import cors from "cors";
import WebSocket from "ws";
import expressWs from "express-ws";
import session from "express-session";
import randomNameGenerator from "korean-random-names-generator";

import config from "./src/config/index.js";
import carsRouter from "./src/routes/carsRoutes.js";
import stationsRouter from "./src/routes/stationsRoutes.js";

const app = express();
expressWs(app);

const port = config.port;

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

const corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use("/stations", stationsRouter);
app.use("/cars", carsRouter);

const wsClients = new Map();

app.ws("/chat", (ws, req) => {
  const session = req.session;

  if (!session.name) {
    session.name = randomNameGenerator();
  }

  wsClients.set(ws, session);

  ws.on("message", (message) => {
    const username = session.name;
    console.log(`메세지 받음 from ${username}`);

    // 연결된 이후 내부 메세지 처리하는 부분
    console.log(message.toString());
    let parsedMessage = "";
    let messageType;

    // 받은 문자열 파싱해서 객체화
    try {
      parsedMessage = JSON.parse(message);
      messageType = parsedMessage.type;
    } catch (error) {
      console.error("Invalid JSON Format: ", error);
      return;
    }

    wsClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const messageType = client === ws ? "sent" : "received";
        const messageObj = { type: messageType, sender: username, content: parsedMessage?.content };

        client.send(JSON.stringify(messageObj));
      }
    });
  });

  ws.on("close", () => {});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
