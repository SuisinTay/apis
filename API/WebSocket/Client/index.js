const Html5WebSocket = require("html5-websocket");
const ReconnectionWebSocket = require("reconnecting-websocket");

let ws_host = "localhost";
let ws_port = "8000";
const options = { WebSocket: Html5WebSocket };
const rws = new ReconnectionWebSocket(
  "ws://" + ws_host + ":" + ws_port + "/ws",
  undefined,
  options
);
rws.timeout = 1000;

rws.addEventListener("open", () => {
  console.log("[Client] Connected to WebSocket");
  rws.send(JSON.stringify({ action: "start", min: 0, max: 100, interval: 1 }));
  //   rws.send(JSON.stringify({ action: "stop" }));
});

rws.addEventListener("message", (e) => {
  console.log("[Client] Message received: " + e.data);
});

rws.addEventListener("close", () => {
  console.log("[Client] Disconnected");
});

rws.onerror = (err) => {
  if (err.code == "EHOSTDOWN") {
    console.log("[Client] Error: Server Down");
  }
};
