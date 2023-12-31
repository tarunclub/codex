import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { Redis } from 'ioredis';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());

const server = createServer(app);

import projectRoute from './routes/project-route';
import fileRoute from './routes/file-route';
import executionRoute from './routes/execution-route';

app.use('/api/v1', projectRoute);
app.use('/api/v1', fileRoute);
app.use('/api/v1', executionRoute);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

// redis
const publisher = new Redis({
  host: 'localhost',
  port: 6379,
});

const subscriber = new Redis({
  host: 'localhost',
  port: 6379,
});

subscriber.subscribe('chat');
subscriber.subscribe('code-update');

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('join-room', (data) => {
    socket.join(data);
  });

  socket.on('send-message', async (message) => {
    console.log(`published `, message);
    await publisher.publish('chat', JSON.stringify(message));
  });

  socket.on('send-code-update', (data) => {
    console.log(`published `, data);
    publisher.publish('code-update', JSON.stringify(data));
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    subscriber.unsubscribe('chat');
    subscriber.unsubscribe('code-update');
  });
});

subscriber.on('message', (channel, message) => {
  if (channel === 'chat') {
    const data = JSON.parse(message);
    io.to(data.room).emit('receive-message', data);
  } else if (channel === 'code-update') {
    const data = JSON.parse(message);
    io.to(data.room).emit('receive-code-update', data);
  }
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
