"use strict";var _server = require('./server');

const users = [];

const messages = [];

function createUser(socketId, username, group) {
  return {
    socket_id: socketId,
    username,
    group,
  };
}

function createMessage(group, username, message) {
  return {
    group,
    username,
    message,
    createdAt: new Date(),
  };
}

function getMessagesPerGroup(group) {
  const messagesGroup = messages.filter((message) => message.group === group);

  return messagesGroup;
}

// Socket é a representação do cliente no servidor
_server.io.on('connection', (socket) => {
  socket.on('select_room', (data, callback) => {
    const { id } = socket;
    const { username, group } = data;

    // Verifica se já existe um usuário com esse nome e esse grupo
    const userInGroup = users.find((user) => user.username === username && user.group === group);

    if (userInGroup) {
      userInGroup.socket_id = id; // Se existir altera o socket id
    } else {
      users.push(createUser(id, username, group)); // se não existir, cria
    }

    console.log({
      username,
      id,
    });
    socket.join(group); // Colocando usuário no grupo escolhido
    const oldMessages = getMessagesPerGroup(group);
    callback(oldMessages);
  });

  socket.on('message', (data) => {
    const { group, username, message } = data;

    const messageCreated = createMessage(group, username, message);

    messages.push(messageCreated);

    _server.io.to(group).emit('message', messageCreated);
  });
});
