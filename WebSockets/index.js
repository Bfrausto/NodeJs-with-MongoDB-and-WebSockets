const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));



io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('message', 'Welcome to the chat app');
});

setInterval(() => {
    io.emit('message', 'Hello, from the server');
} , 3000);

server.listen(8080, () => {
    console.log('listening on port 8080');
});