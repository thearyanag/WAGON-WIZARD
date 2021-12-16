const { WebSocket } = require("ws");
const wsClient = new WebSocket("ws://localhost:3000");
const { v4: uuidv4 } = require("uuid");

wsClient.addEventListener("open", function (event) {
  const data = uuidv4();
  wsClient.send(data);
});

wsClient.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});

wsClient.addEventListener("close", function (event) {
  console.log("The connection has been closed");
});
