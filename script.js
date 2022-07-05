// File where clinet side sicket.io server is working 
const socket = io('http://localhost:3000')

socket.io('chat-message', data => {
    console.log(data)
    socket.emit('chat-message', 'Hello World' )
})