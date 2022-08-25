const express = require('express');
const router = express.Router();
// Mongod
const User = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/user');
const Msg = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/messages')
const UserInfo = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');

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
    Msg.find( { $or: [
           { $and: [{username: username.username}, 
                {otherUser: req.query.username},
            {you: req.query.userId}]},

               { $and: [{username: req.query.username}, 
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
        console.log('hey searchParams 2', data.otherUser)
        console.log('hey Message', Message)

    // saving msg
    
    if (data.otherUser !== undefined ) {
    const MESSAGE = new Msg({username: username.username,
                            message: Message,
                            time: data.time,
                            otherUser: data.otherUser,
                            you: data.userId
                        })
    MESSAGE.save().then(createdMsg => {
        socket.emit('messageSnd', formatMessage(username.username, Message, data.time ))
    
        })
                   }
                                    })
   
                                        }) 
                                        
                                            })
            
                                             })      
                                        })
                                      
module.exports = router;
