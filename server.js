const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',  // 必要に応じて制限可能
  }
});

io.on('connection', (socket) => {
  console.log('ユーザー接続:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('メッセージ:', msg);
    io.emit('chat message', msg); // 全ユーザーに送信
  });

  socket.on('disconnect', () => {
    console.log('ユーザー切断:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('サーバー起動： http://localhost:3000');
});
