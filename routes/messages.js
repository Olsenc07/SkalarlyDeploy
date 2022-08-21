const express = require('express');
const router = express.Router();
// Mongod
const User = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/user');
const Msg = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/messages')
// consts
const formatMessage = require('/Users/chaseolsen/angular_scholarly_fs/angular-SCHOLARLY/src/app/utils/messages.js')
// const botName = 'Skalar';




// Wrap everything in here need to connect socket.io first
router.get('/OnetoOne', (req,res) => {   
// welcome current user
    // Load in old messages
    User.findById({_id: req.query.userId})
.then(user => {
User.findOne({username: user.username})
.then(username => {

console.log('user Id you', username.username )

const myURL = new URL(`http://localhost/3000/messages/:?username=${req.query.username}`)
var myParams = new URLSearchParams(myURL.searchParams).get('username');
console.log('hey searchParams ', myParams)
console.log('req query username, other', req.query.username)


    Msg.find( { $or: [
           { $and: [{username: username.username}, 
                {otherUser: myParams}]},

               { $and: [{username: myParams}, 
                {otherUser: username.username}]}
               ]}
         
    )        
    .then((result) => {
       

})
})
})

User.findById({_id: req.query.userId})
.then(user => {
User.findOne({username: user.username})
.then(username => {

console.log('user Id you', username.username )

const myURL = new URL(`http://localhost/3000/messages/:?username=${req.query.username}`)
var myParams = new URLSearchParams(myURL.searchParams).get('username');
console.log('hey searchParams 2', myParams)
console.log('req query username, other 2', req.query.username)


    Msg.find( { $or: [
           { $and: [{username: username.username}, 
                {otherUser: myParams}]},

               { $and: [{username: myParams}, 
                {otherUser: username.username}]}
               ]}
         
    )        
    .then((result) => {

res.status(200).json({
    message: 'Messages fetched succesfully!',
    messages: result
    })
   
})

})
})
})



// listen for chat msg sending
router.get('/OnetoOneSend', (req,res) => {
    var io = req.app.get('socketio');
    console.log('connected to send')

io.on('connection', (socket) => {
    console.log('connected to send2')

socket.on('chat-messageSnd', (data) => {
    console.log('connected to send3', data)
    console.log('connected to send info', data.userId)

    console.log('req.query.username, saving  yor man chase', req.query.username)
    const Message = data.message
    console.log('message my love', Message)
     User.findById({_id: data.userId})
    .then(user => {
    User.findOne({username: user.username})
    .then(username => {
     
        const myURL = new URL(`http://localhost/3000/messages/:?username=${req.query.username}`)
        var myParams = new URLSearchParams(myURL.searchParams).get('username');
        console.log('hey searchParams 2', myParams)
        console.log('hey Message', Message)

    // saving msg
    const MESSAGE = new Msg({username: username.username,
                            message: Message,
                            time: data.time,
                            otherUser: myParams
                        })
    MESSAGE.save().then(createdMsg => {
        socket.emit('messageSnd', formatMessage(username.username, Message, data.time, myParams ));
        // socket.emit('output-messages', formatMessage(username.username, Message, data.time, myParams ))


                                })
                                    })
                                        }) 
                                            })
                                        })
                                        })
    // server msg
// socket.emit('server-message', formatMessage(botName, 'Welcome to chat'))


// Broadcast when user connects
// socket.broadcast.emit('message', formatMessage(botName,'user has joined chat'));

// runs when client disconnects
// socket.on('disconnect', () => {
//     io.emit('message', formatMessage(botName,'a user has left the chat'))
// })






module.exports = router;
