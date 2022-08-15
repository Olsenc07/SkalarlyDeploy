// File where client side sicket.io server is working 
const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container').innerHTML

const messageForm = document.getElementById('send-container').innerHTML
const messageInput = document.getElementById('message-input').innerHTML



socket.on('chat-message', (message) => {
//    appendMessage(message)
   console.log('data brain', message)
})

messageForm.addEventListener('submit', e => {
    console.log('greg', messageInput)
    e.preventDefault();
    const message = messageInput
    // .value;
    console.log('message', message);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageContainer.append(messageElement)
}