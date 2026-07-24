const EventEmitter = require('events')
const eventEmitter = new EventEmitter()
eventEmitter.on('greet', (name, age) => {
    console.log(`Hello ${name} ${age}`)
})

eventEmitter.once('pushnotify', () => {
    console.log('event once')
})

// eventEmitter.emit('greet', 'Dang', 15)
// eventEmitter.emit('greet', 'Dang', 16)
// eventEmitter.emit('pushnotify')
// eventEmitter.emit('pushnotify')