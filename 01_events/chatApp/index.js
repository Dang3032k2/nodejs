const ChatRoom = require('./chatRoom.js')

const chat = new ChatRoom()

chat.on('join', (user) => {
    console.log(`${user} has joined the chat`)
})

chat.on('message', (user, message) => {
    console.log(`${user}: ${message}`)
})

chat.on('leave', (user) => {
    console.log(`${user} has left the chat`)
})

chat.join('Alice')
chat.join('Bob')

chat.sendMessage('Alice','hey Bob, Hello to everyone')
chat.sendMessage('Bob','hey Alice, Hello to everyone')

chat.leave('Alice')
chat.sendMessage('Alice', 'this message wont be sent')
chat.leave('Bob')