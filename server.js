<<<<<<< Updated upstream
const app = require('./app');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
=======
const app = require('./main');
>>>>>>> Stashed changes
const http = require('http');
const server = http.createServer(app);
module.exports = server;