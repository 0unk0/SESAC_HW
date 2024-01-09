import WebSocket from "ws";

function setupWebSocket(app, sessionInfo, wsClients) {
  app.ws("/chat", (ws, req) => {
    const clientIP = req.socket.remoteAddress;

    const username = sessionInfo.get(req.sessionID);

    if (!wsClients.has(username)) {
      console.log(`${username}(${clientIP}) 입장`);

      wsClients.set(username, ws);

      // 입장 알림 전송
      const type = "join";
      const sender = "관리자";
      const content = `${username} 님이 입장하셨습니다.`;

      const messageObj = { type, sender, content };

      wsClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageObj));
        }
      });
    }

    ws.on("message", (message) => {
      console.log(sessionInfo);
      console.log(`${username}(${clientIP}) : ${message.toString()}`);

      let parsedMessage = "";

      // 받은 문자열 파싱해서 객체화
      try {
        parsedMessage = JSON.parse(message);
      } catch (error) {
        console.error("Invalid JSON Format: ", error);
        return;
      }

      wsClients.forEach((client, clientName) => {
        if (client.readyState === WebSocket.OPEN) {
          const type = clientName === username ? "sent" : "received";
          const sender = username;
          const content = parsedMessage?.content;

          const messageObj = { type, sender, content };

          client.send(JSON.stringify(messageObj));
        }
      });
    });

    ws.on("close", () => {
      console.log(`${username}(${clientIP}) 퇴장`);

      wsClients.delete(username);

      // 퇴장 알림 전송
      const type = "leave";
      const sender = "관리자";
      const content = `${username} 님이 퇴장하셨습니다.`;

      const messageObj = { type, sender, content };

      wsClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
          client.send(JSON.stringify(messageObj));
        }
      });
    });
  });
}

export default setupWebSocket;
