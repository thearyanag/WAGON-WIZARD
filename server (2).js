const { WebSocketServer } = require("ws");
const server = require("../../server");
const wss = new WebSocketServer({ server });
const locationmodel = require("../../models/driverLocation");

/**
 *
 * @param {WebSocket} ws
 * @param {*} req
 */
// const handleConnection = (ws, req) => {
//   console.log("handling connection", req);

// };

// wss.on("connection", handleConnection);
let driver_id = null;
const updateDriverLocation = async (driver_id, hash, location) => {
  console.log("updated driver location:", driver_id, location);
  //first find the driver
  //if driver exits,then update location otherwise insert new location

  locationmodel.findOneAndUpdate(
    { driver_id, device_hash: hash },
    { location }
  );

  return true;
};

wss.on("connection", function (ws) {
  ws.on("message", function (message) {
    const msg = JSON.parse(message.toString());

    console.log(msg);

    if (msg.dataType == "new") {
      ws.id = msg.transanction_hash;
      driver_id = msg.driver_id;
      console.log("new request received");
      ws.send("location");
    }

    if (msg.dataType == "update") {
      update = msg.update;
      console.log(update);
      if (update == "exit") {
        ws.close();
      } else if (update === "location") {
        const location = msg.location;
        updateDriverLocation(driver_id, ws.id, location);
      }
    }

    if (msg.dataType == "server") {
      const ip = ws._socket.remoteAddress;
      ws.send(ip);
    }
  });
});
