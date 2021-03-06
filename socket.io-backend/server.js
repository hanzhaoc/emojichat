const io = require('socket.io')();

let currentUserId = 2;
let currentMessgaeId = 1;
const userIds = {};

const createMessage = (userId, messageText) => {
  return {  
    _id: currentMessgaeId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: userId,
      name: 'Test User',
      avatar: 'https://placeimg.com/140/140/any',
    }
  };
}

io.on('connection', socket => {
  console.log(`${socket.id} connected`)
  userIds[socket.id] = currentUserId++;
  socket.on('message', messageText => {
    const userId = userIds[socket.id];
    const message = createMessage(userId, messageText);
    console.log(message);
    socket.broadcast.emit('message', message);
  })
})

io.listen(3001);

