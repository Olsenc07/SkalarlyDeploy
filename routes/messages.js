const express = require('express');

const router = express.Router();

// Wrap everything in here need to connect socket.io first
router.get('OnetoOne',(req,res) => {
var io = req.app.get('socketio');
console.log('socket.io connection', io)
})



const formatMessage = require('/Users/chaseolsen/angular_scholarly_fs/angular-SCHOLARLY/src/app/utils/messages.js')
// welcome current user
// io.on('connection', (socket) => {
//     router.get("/OnetoOne__", (req, res, next) => {
//         Msg.find({username: req.query.username})
//         .then(message => {
// console.log('message salad', message)
//         })

//     })





//     Msg.find().then((result) => {
// socket.emit('output-messages', result)
//     })
// socket.emit('server-message', formatMessage(botName, 'Welcome to chat'))

// // listen for chat msg
// socket.on('chat-messageSnd', (data) => {
   
// const Message = data.message
// User.findById({_id: data.userId})
// .then(user => {
// User.findOne({username: user.username})
// .then(username => {

//     socket.emit('chat-messageSnd', formatMessage(username.username, Message, data.time));
// const MESSAGE = new Msg({username: username.username,
//                         message: Message,
//                         time: data.time
//                     })
// MESSAGE.save().then(createdMsg => {

//                             })
//                                 })
//                                     }) 
//                                         })
// // Broadcast when user connects
// socket.broadcast.emit('message', formatMessage(botName,'user has joined chat'));

// // runs when client disconnects
// socket.on('disconnect', () => {
//     io.emit('message', formatMessage(botName,'a user has left the chat'))
// })




// })







module.exports = router;
