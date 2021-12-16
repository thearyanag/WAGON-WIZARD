const app = require('./main');
const http = require('http');
const server = http.createServer(app);
module.exports = server;