const express = require('express');
const socket = require('socket.io');


// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

const activeUsers = new Set();

io.on('connection', (socket) => {
    console.log('Made socket connection', socket.id);
    socket.on("new user", function (data) {
        socket.userId = data;
        activeUsers.add(data);
        io.emit("new user", [...activeUsers]);
    });

    socket.on("disconnect", () => {
        activeUsers.delete(socket.userId);
        io.emit("user disconnected", socket.userId);
    });

    socket.on("chat message", function (data) {
        io.emit("chat message", data);
    });

    socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data);
    });
});
