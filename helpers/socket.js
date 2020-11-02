const SocketIO = require('socket.io');
const io = new SocketIO();

// Create a common emit function, to call the method from any controllers
let Socket = {
  emit: (event, data) => {
    io.sockets.emit(event, data);
  }
};

io.on('connection', (socket) => {
  console.log('Server-Client sockets Connected!');

  socket.on('join', (room) => {
    socket.join(room);
    io.to(room).emit('message', 'Joined room:' + room);
  });
});

exports.socketConnection = { io: io, socket: Socket };