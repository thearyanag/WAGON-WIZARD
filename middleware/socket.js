<<<<<<< Updated upstream
const { WebSocketServer } = require("ws");
const server = require('../server'); 
const wss = new WebSocketServer({ server  , path: "/updates"});

const driverLocation = require('../models/driverLocation');

const updateDriverLocation = async (driver_id, device_hash, location , ws) => {
  console.log("updated driver location:", driver_id, location);
  //first find the driver
  //if driver exits,then update location otherwise insert new location
  const update = {
    'cordinates' : location
  };
  const query = {
    'driver_id' : driver_id
  };
  await driverLocation.findOneAndUpdate( query , update , function(err, doc) {
    if (err) return ws.send(500, {error: err});
    console.log(doc);
    return ws.send(JSON.stringify({'response_code' : 200 , 'response_status' : 'updated'}));  
}).clone().catch(function(err){ ws.send(JSON.stringify({'response_code' : 501 , 'response_status' : 'Server Error'}))});
  return true;
};


wss.on("connection", function (ws) {
    
  ws.on("message", function (message) {

      msg = JSON.parse(message.toString());

      console.log(msg);
      
      if(msg.dataType == "new") {
        hash = msg.transanction_hash;
        ws.id = hash;
        ws.send("200");  
      }

      if(msg.dataType == "update") {
        update = msg.update;
        console.log(update);
        if(update == "exit") {
            ws.close();
        } else if(update == "location") {
          driver_id = ws.id;        
          const location = msg.location;
          const [lat,lang] = location;
          console.log(hash,lat,lang);
          updateDriverLocation(driver_id, ws.id, location , ws);
        }
      }

      if(msg.dataType == "server") {
        const ip = ws._socket.remoteAddress
        
        const trip = msg.trip;
        const cordinates = trip.start.cordinates;
        const drivers =0 ;// function to compute drivers';
        const data = {
          "dataType" : "update",
          "update" : "trip",
          "trip" : trip
        };
        
        wss.clients.forEach(function each(client) {
          if(client.id in drivers) {
            client.send(data);
          }
      });
      }


  });


});
=======
const { WebSocketServer } = require("ws");
const server = require('../server'); 
const wss = new WebSocketServer({ server });

wss.on("connection", function (ws) {
    
  ws.on("message", function (message) {

      msg = JSON.parse(message.toString());

      console.log(msg);
      
      if(msg.dataType == "new") {
        hash = msg.transanction_hash;
        ws.id = hash;
        ws.send("200");  
      }

      if(msg.dataType == "update") {
        update = msg.update;
        console.log(update);
        if(update == "exit") {
            ws.close();
        } else if(update == "location") {
          hash = ws.id;        
          const location = msg.location;
          const [lat,lang] = location;
          console.log(hash,lat,lang);

        }
      }

      if(msg.dataType == "server") {
        const ip = ws._socket.remoteAddress
        ws.send(ip);
      }


  });


});
>>>>>>> Stashed changes
