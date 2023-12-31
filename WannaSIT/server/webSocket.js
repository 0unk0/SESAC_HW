import WebSocket from "ws";
import randomNameGenerator from "korean-random-names-generator";

function setupWebSocket(app, wsClients) {
  app.ws("/chat", (ws, req) => {
    if (!req.session.name) {
      req.session.name = randomNameGenerator();
    }

    const username = req.session.name;

    if (username && !wsClients.has(username)) {
      wsClients.set(username, ws);

      // 입장 알림 전송
      const type = "join";
      const sender = "관리자";
      const content = `${username} 님이 입장하셨습니다.`;

      const messageObj = { type, sender, content };

      wsClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
          client.send(JSON.stringify(messageObj));
        }
      });
    }

    console.log(`${username}님이 채팅방에 참여하였습니다.`);

    ws.on("message", (message) => {
      console.log(`메세지 받음 from ${username}`);
      console.log(message.toString());

      let parsedMessage = "";

      // 받은 문자열 파싱해서 객체화
      try {
        parsedMessage = JSON.parse(message);
      } catch (error) {
        console.error("Invalid JSON Format: ", error);
        return;
      }

      wsClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          const type = client === ws ? "sent" : "received";
          const sender = username;
          const content = parsedMessage?.content;

          const messageObj = { type, sender, content };

          client.send(JSON.stringify(messageObj));
        }
      });
    });

    ws.on("close", () => {
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
