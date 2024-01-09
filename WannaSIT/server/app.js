import express from "express";
import cors from "cors";
import expressWs from "express-ws";
import session from "express-session";

import config from "./src/config/index.js";
import carsRouter from "./src/routes/carsRoutes.js";
import stationsRouter from "./src/routes/stationsRoutes.js";
import setupWebSocket from "./webSocket.js";
import randomNameGenerator from "korean-random-names-generator";

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

// 세션 아이디 별로 랜덤 닉네임 부여
const sessionInfo = new Map();
app.use((req, res, next) => {
  const sessionID = req.sessionID;

  if (!sessionInfo.get(sessionID)) {
    const username = randomNameGenerator();
    sessionInfo.set(sessionID, username);
  }
  next();
});

app.use("/stations", stationsRouter);
app.use("/cars", carsRouter);

const wsClients = new Map();
setupWebSocket(app, sessionInfo, wsClients);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
