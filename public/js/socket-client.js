const socket = io();
const room = window.location.pathname.split('/')[1];

console.log('room name:', room);

socket.emit('join', room);
socket.on('messages', (data) => {
  console.log(data);
});