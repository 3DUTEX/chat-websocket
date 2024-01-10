// Elements
const messagesContainer = document.querySelector('.messages-container');
const inputMessage = document.querySelector('#inputMessage');

// io recebe a URL do servidor
const URL = 'webscoket-teste-production.up.railway.app';
const socket = io(URL);

const urlParams = new URLSearchParams(location.search);

const username = urlParams.get('username');
const group = urlParams.get('group');

const nameGroup = document.querySelector('#nameGroup');
nameGroup.textContent = group;

// emit -> emitir informação
// on -> escutar informação

socket.emit('select_room', {
  username,
  group,
}, (messages) => {
  if (messages) {
    // eslint-disable-next-line no-restricted-syntax
    for (const message of messages) {
      const p = document.createElement('p');
      p.innerText = `${message.message} - ${message.username}`;

      messagesContainer.appendChild(p);
    }
  }
});

inputMessage.addEventListener('keypress', (e) => {
  const input = e.target;

  if (e.key === 'Enter') {
    const message = input.value;
    input.value = '';

    const data = {
      group,
      message,
      username,
    };

    socket.emit('message', data);
  }
});

socket.on('message', (messageData) => {
  const p = document.createElement('p');
  p.innerText = `${messageData.message} - ${messageData.username}`;

  messagesContainer.appendChild(p);
});
