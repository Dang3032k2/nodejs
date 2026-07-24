const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('error', err => {
    console.error(`Error occurred: ${err}`)
})

