const {Buffer} = require('buffer')

// const buf = Buffer.alloc(4)
// console.log(buf)

// const buf = Buffer.from('Hello Dang')
// console.log(buf)
// console.log(buf.toString())

// const buf2 = Buffer.allocUnsafe(10)
// console.log(buf2)

// const buf = Buffer.alloc(10)
// buf.write('Hello')
// console.log(buf)

const buf = Buffer.from('Dang ne')
console.log(buf.toString())
console.log(buf.toString('base64url', 0, 4))

const buf1 = Buffer.from('Dang ')
const buf2 = Buffer.from('Nguyen')
const merged = Buffer.concat([buf1, buf2])
console.log(merged.toString())
console.log(merged.length)