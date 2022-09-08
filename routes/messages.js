const express = require('express');
const router = express.Router();
// Mongod
const User = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/user');
const Msg = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/messages')
const UserInfo = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');
const checkAuth = require('/Users/chaseolsen/angular_scholarly_fs/backend/middleware/check-auth');

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
// userInfo Messages
router.get("/infoMessage", async(req, res, next) => {
    console.log(req.query.username, 'and', req.query.userId)
if(req.query.username === req.query.userId ){
    console.log('C.R.E.A.M')
    await User.findById({_id: req.query.userId})
    .then(user => {
        console.log(user)
        Msg.find( {otherUser: user.username})
        .then(messagesNotif => {
            console.log('docs', messagesNotif)
            res.status(200).json({
              message: 'Info messages fetched succesfully!',
            messages: messagesNotif
              });
        })
    })
}
else{
    console.log('wanting notifications')
    await User.findById({_id: req.query.userId})
.then(user => {
    Msg.find( 
        {otherUser: user.username}
    )
    .then(documents => {
        console.log('docs', documents)
        console.log('wanting notifications 2')
        res.status(200).json({
          message: 'Info messages fetched succesfully!',
             messages: documents
          });
    })
})}
})





// listen for chat msg sending
router.get('/OnetoOneSend', (req,res) => {
    var io = req.app.get('socketio');


io.on('connection', (socket) => {

socket.on('chat-messageSnd', (data) => {
   
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



// Delete message 
router.delete("/deleteMsg/:id", checkAuth, (req, res, next ) => {
    console.log('hey chase msgId 2', req.params.id);

    Msg.deleteOne({_id: req.params.id}).then(result => {
        if (result){
        res.status(200).json({message: 'Msg deleted!!'});
        } else {
            res.status(401).json({message: 'Not authorized'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed!'
        });
    });
});
                                      
module.exports = router;
