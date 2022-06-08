const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

// Message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message);


    // scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});



// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
// Get message txt
    const msg = e.target.elements.msg.value;

    console.log(msg);
 // Emit message to server
    socket.emit('charMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message');
    div.innerHTML = `<div class="message">
    <p class="text">
${message}

</p>
</div>
`;
document.querySelector('.chat-messages').appendChild(div);
}