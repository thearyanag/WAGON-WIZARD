const wss = require('./socket');
const server = require('./server');
server.listen(8000 , () => {
    console.log('Server started on port 8000');
});
