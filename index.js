const wss = require('./middleware/socket');
const server = require('./server');
<<<<<<< Updated upstream

server.listen(process.env.PORT || 8080 , () => {
=======
server.listen(process.env.PORT || 8000 , () => {
>>>>>>> Stashed changes
    console.log('Server started on port 8000');
});

