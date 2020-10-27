const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile('/home/ryoung7986/react/discord-clone-app/discord-clone-app/src/App.js');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});
