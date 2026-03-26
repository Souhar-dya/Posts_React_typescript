
import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let clients = [];

wss.on("connection", (ws) => {
    console.log("Client connected");
    clients.push(ws);
    ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients

    clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
  }
    );
    ws.on("close", () => {
        clients = clients.filter((client) => client !== ws);
        console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");