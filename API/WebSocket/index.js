const express = require("express");
const WebSocket = require("ws");
const SocketServer = require("ws").Server;

const server = express().listen(8000);

const wss = new SocketServer({ server });

let generateRandom;

wss.on("connection", (ws) => {
  console.log("[Server] A Client has Connected.");

  ws.on("close", () => {
    clearInterval(generateRandom);
    console.log("[Server]Client has Disconnected.");
  });

  ws.on("message", (message) => {
    console.log("[Server] Receive Message: %s", message);
    var obj = JSON.parse(message);
    console.log(obj.action);

    if (obj.action == "start") {
      generateRandom = setInterval(() => {
        var randomValue =
          Math.floor(Math.random() * parseInt(obj.max)) + parseInt(obj.min);
        ws.send(JSON.stringify({ randomNumbers: randomValue }));

        console.log("[Server] Sent Message: " + randomValue);
      }, obj.interval * 1000);
    } else if (obj.action == "stop") {
      clearInterval(generateRandom);
    } else {
      console.log("Wrong action!!!");
    }

    wss.clients.forEach(function each(Client) {
      if (Client !== ws && Client.readyState === WebSocket.OPEN) {
        Client.send(message);
      }
    });
  });
});
