const user = require('./Modules/user')
// EMITTING & HANDLING CUSTOM EVENTS

let myEmitter = new user();

myEmitter.on('userCreated', (id, name) => {
    console.log(`A new user ${name} with ID ${id} is created!`)
})

myEmitter.on('userCreated', (id, name) => {
    console.log(`A new user ${name} with ID ${id} is added to database!`)
})

myEmitter.emit('userCreated', 101, 'John');