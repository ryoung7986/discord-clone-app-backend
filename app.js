const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const indexRouter = require('./routes/index-router');
const helmet = require('helmet');
const createError = require('http-errors');
const path = require('path');

const { environment } = require('./config');
const { Channel } = require('./db/models');

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      return callback(null, true)
    }
    callback(new Error('Not allowed by CORS'));
  }
}

const app = express();
app.use(cors(corsOptions));

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet({ hsts: false }));
// app.use(express.static(path.join(__dirname, 'public')));     (if needed)

app.use(indexRouter);

// Set up socket.io server to listen for connections:
io.on('connection', async (socket) => {
  console.log(`${socket.id} -- connected`);

  // When a message is received on the 'join' room,
  // get the channel by channel id, and join the socket to the channel
  socket.on('join', async (channelId) => {
    const channel = await Channel.findByPk(channelId);
    if (channel) {
      socket.join(channel.id, async () => {
        console.log(`${socket.id} has joined ${channel.channelName}`);
      });
    }
  });

  // When a message is received on the 'leave' room,
  // get the channel and tell the socket we have left that channel
  socket.on('leave', async (channelId) => {
    console.log(channelId);
    const channel = await Channel.findByPk(channelId);
    if (channel) {
      socket.leave(channel.id, async () => {
        console.log(`${socket.id} has joined ${channel.channelName}`);
      });
    }
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });

  const channels = await Channel.findAll();

  // Loop through all channels and set up listeners
  for (let channel of channels) {
    console.log(`Listening for messages from ${channel.channelName}`);

    // When we get a message for a channel:
    // 1. Log the message
    // 2. add the new message to the db with `addMessageToChannel` helper function (in utils)
    // 3. emit the message to two places--back to the channel, and back to the original socket that sent the message
    // NOTE: socket.to only sends messages to OTHER sockets joined to the room. This is why we use `emit` to send the
    // message back to the original socket
    socket.on(channel.id, async (messsage, userName) => {
      console.log(`${channel.channelName} -- ${userName} ${message}`);
      const newMessage = await addMessageToChannel(nickname, channel.id, message)
      socket.to(channel.id).emit(channel.id, newMessage);
      socket.emit(channel.id, newMessage);
    })
  }
})

app.use(function (_req, _res, next) {
  next(createError(404));
});

app.use(function (err, _req, res, _next) {
  console.log(err);
  res.status(err.status || 500);
  if (err.status === 401) {
    res.set('WWW-Authenticate', 'Bearer');
  }

  const isProduction = environment === "production";

  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    error: JSON.parse(JSON.stringify(err)),
    stack: isProduction ? null : err.stack,
  });
});

module.exports = http;
