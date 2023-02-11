const express = require('express');
const router = express.Router();
// Mongod
const User = require('/app/backend/models/user');
const Msg = require('/app/backend/models/messages')
const checkAuth = require('/app/backend/middleware/check-auth');
// consts
// const botName = 'Skalar';




// Wrap everything in here need to connect socket.io first
router.get('/OnetoOne', async(req,res) => {   
// welcome current user
    // Load in old messages
await User.findById({_id: req.query.userId})
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
.catch(err => {
    return res.status(401).json({
        message: "Message error!!!",

    })
})
})
.catch(err => {
    return res.status(401).json({
        message: "Message error!!",

    })
})
})
.catch(err => {
    return res.status(401).json({
        message: "Message error!",

    })
})
})

// userInfo Messages
router.get("/infoMessage", async(req, res, next) => {
// if(req.query.username === req.query.userId ){
//     console.log('C.R.E.A.M')
//     await User.findById({_id: req.query.userId})
//     .then(user => {
//         Msg.find( {otherUser: user.username}).sort({time:-1})
//         .then(messagesNotif => {
//             res.status(200).json({
//               message: 'Info messages fetched succesfully!',
//             messages: messagesNotif
//               });
//         }).catch(err => {
//             return res.status(401).json({
//                 message: "Fetching message error!",
        
//             })
//         })
//     })
//     .catch(err => {
//         return res.status(401).json({
//             message: "Message error!",
    
//         })
//     })
// }else{

    await User.findById({_id: req.query.userId})
.then(user => {
    Msg.find( 
        {otherUser: user.username}
    ).sort({time:-1})
    .then(documents => {
        console.log('timing', documents)
        nonya = [];
        documents.forEach((e) => {
            nonya.push(e.username)
        });
let nonyaOnce = [...new Set(nonya)];
console.log('order', nonyaOnce);
allMsgs = []
for(let i in nonyaOnce){
    Msg.findOne({ $and: [
{otherUser: user.username},
{username: nonyaOnce[i]}
    ]
    }).sort({time:-1})    
      .then(finalDocs => {
       allMsgs.push(finalDocs);
    if(allMsgs.length == nonyaOnce.length){ 
        let allMsgsReverse = allMsgs.reverse();
    res.status(200).json({
        message: 'Info messages fetched succesfully!',
           messages: allMsgsReverse
        });
    }
      })

      .catch(err => {
        return res.status(401).json({
            message: "Message error 3!",
    
        })
    })

}
       
    })
})
.catch(err => {
    return res.status(401).json({
        message: "Message error 2!",

    })
})
// }
})





// listen for chat msg sending

// router.get('/OnetoOneSend', async(req,res) => {
//     console.log('made it')
//     var io = req.app.get('socketio');
    
//                                     })



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
