const { WebSocketServer } = require("ws");
const server = require('./server'); 
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
