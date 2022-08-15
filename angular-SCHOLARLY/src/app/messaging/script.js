// File where client side sicket.io server is working 
const socket = io()
const messageContainer = document.getElementById('message-container')

const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')



socket.on('chat-message', (message) => {
//    appendMessage(message)
   console.log('data brain', message)
})

messageForm.addEventListener('click', e => {
    console.log('greg', messageInput)
    e.preventDefault();
    const message = messageInput
    // .value;
    console.log('message', message);
    socket.emit('chat-message', message);
    messageInput.value = '';
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageContainer.append(messageElement)
}