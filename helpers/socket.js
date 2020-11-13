const SocketIO = require('socket.io');
const io = new SocketIO();

// Create a common emit function, to call the method from any controllers
const Socket = {
  emit: (event, data) => {
    io.sockets.emit(event, data);
  }
};

io.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room);
    io.to(room).emit('message', 'Joined room:' + room);
  });

  socket.on('newData', (data) => {
    socket.emit(data);
  });
});

exports.socketConnection = { io: io, socket: Socket };