const express = require('express');
const router = express.Router();
const User = require('/app/backend/models/user');
const Msg = require('/app/backend/models/messages')
const checkAuth = require('/app/backend/middleware/check-auth');
const missedHistory = require('/app/backend/models/missed-notification');
const BlockSkalar = require('/app/backend/models/block-skalar')






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


    await User.findById({_id: req.query.userId})
.then(user => {
    console.log('user ni ni', user)
    BlockSkalar.find({blockedUsername:user.username})
    .then(blocked => {
        if(blocked){
console.log('blocked', blocked)

            User.findById({_id: req.query.userId})
            .then(user => {
                console.log('user ni ni 77', user)
                blockedList = []
                blocked.forEach((e) => {
                    blockedList.push(e.Creator.valueOf())
                })
                console.log('blockedList',blockedList);
                Msg.find( {$and: [
                    {otherUser: user.username},
                    {you:{$nin: blockedList }}
            ]}).sort({ _id:-1})  
                .then(documents => {
                    if(documents.length > 0){
                    console.log('timing', documents)
                    nonya = [];
                    documents.forEach((e) => {
                        nonya.push(e.username)
                    });
            let nonyaOnce = [...new Set(nonya)];
            console.log('order german', nonyaOnce);
            allMsgs = []
            for(let i in nonyaOnce){
                Msg.findOne({ $and: [
            {otherUser: user.username},
            {username: nonyaOnce[i]}
                ]
                })  
                  .then(finalDocs => {
                    console.log('did we make it?', finalDocs)
                    // 
                   allMsgs.push(finalDocs);
                if(allMsgs.length == nonyaOnce.length){ 
                    let allMsgsReverse = allMsgs.reverse();
                    console.log('caterpillars',allMsgsReverse )
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
            }else{
                return res.status(200).json({
                    message: "No messages to retrieve",
                    messages: documents
            
                })
            }
                })
                .catch(err => {
                    return res.status(401).json({
                        message: "Message error 2!",
                
                    })
                })
            })
            .catch(err => {
                return res.status(401).json({
                    message: "Message error 1!",
            
                })
            })


            
        }else{

            User.findById({_id: req.query.userId})
            .then(user => {
                console.log('user ni ni', user)
                Msg.find( 
                    {otherUser: user.username}
                ).sort({time:-1})
                .then(documents => {
                    if(documents.length > 0){
                    console.log('timing', documents)
                    nonya = [];
                    documents.forEach((e) => {
                        nonya.push(e.username)
                    });
            let nonyaOnce = [...new Set(nonya)];
            console.log('order german', nonyaOnce);
            allMsgs = []
            for(let i in nonyaOnce){
                Msg.findOne({ $and: [
            {otherUser: user.username},
            {username: nonyaOnce[i]}
                ]
                }).sort({time:-1})    
                  .then(finalDocs => {
                    console.log('did we make it?', finalDocs)
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
            }else{
                return res.status(200).json({
                    message: "No messages to retrieve",
                    messages: documents
            
                })
            }
                })
                .catch(err => {
                    return res.status(401).json({
                        message: "Message error 2!",
                
                    })
                })
            })
            .catch(err => {
                return res.status(401).json({
                    message: "Message error 1!",
            
                })
            })

            
        }
    })
})









})

// viewed msgs
// userInfo Messages
router.get("/viewedMessage", async(req, res, next) => {
console.log('viewing message', req.query.userId);
console.log('viewing message username', req.query.username);

    await User.findById({_id: req.query.userId})
    .then(user => {
        console.log('user 7', user);
        console.log('username7', user.username);

    Msg.updateMany({ $and: [
         {otherUser: user.username},
         {username: req.query.username}
        ]},
        {viewed: true}
    
    )
.then(updates => {
    console.log('updates7', updates)
    console.log('updates7 matched count', updates.matchedCount)
if(updates.matchedCount > 0){
   Msg.find({ $and: [
    {otherUser: user.username},
    {username: req.query.username}
   ]})
   .then(refreshed => {
    console.log('unread on top', refreshed)
    res.status(200).json({
        message: 'Clean update',
        messages: refreshed
    });
   })
}else{
    // no updates
    res.status(200).json({
        message: 'Clean update 2',
        messages: updates
    });
}
}).catch(err => {
    return res.status(401).json({
        message: "Viewing message error 1!",

    })
})
}).catch(err => {
    return res.status(401).json({
        message: "Viewing message error 2!",

    })
})
})

// notif Messages
router.get("/getNotifMsgs", async(req, res, next) => {  
    let payload = req.query.queryHash;
console.log('payload', payload);
        await User.findById({_id: req.query.userId})
    .then(user => {
        //        Msg.find({ $and: [ 
    //         {otherUser: user.username},
    //         {username: {$regex: new RegExp('^' + payload,
    //     'i')
    // }}
        //  ]}).sort({time:-1})
        Msg.find( 
            {otherUser: user.username}
        ).sort({time:-1})
        .then(documents => {
            console.log('timing 777', documents)
        if(documents.length > 0){

            nonya = [];
            documents.forEach((e) => {
                nonya.push(e.username)
            });
    let nonyaOnce = [...new Set(nonya)];
// Regex here
const regex = new RegExp('^' + payload,
'i');
let matches = nonyaOnce.filter((e) => 

    e.match(regex)
)
console.log('order', nonyaOnce);
console.log('matches', matches)
if(matches.length == 0){
    console.log('big boobs');
   
    return res.status(200).json({
        message: "No messages to retrieve 7",
        messages: []

    })

}else{
    console.log('runners body');
    allMsgs = []
    // if(matches.length == 0){
    //     res.status(200).json({
    //         message: 'Info messages fetched succesfully!',
    //            messages: matches
    //         });
    // }else{

    for(let i in matches){
        Msg.findOne({ $and: [
    {otherUser: user.username},
    {username: matches[i]}
        ]
        }).sort({time:-1})    
          .then(finalDocs => {
           allMsgs.push(finalDocs);
if(allMsgs.length == matches.length){
    res.status(200).json({
        message: 'Info messages fetched succesfully!',
           messages: allMsgs
        });
}
          })
    
          .catch(err => {
            return res.status(401).json({
                message: "Message error 3!",
        
            })
        })
    
    }
// }
}    
        }else{
            return res.status(200).json({
                message: "No messages to retrieve",
                messages: documents
        
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
     

// missed notifs
router.get("/missedNotifs", checkAuth, async(req, res) => {
    const counter = req.query.counter;
    const userId = req.query.userId;

    await missedHistory.find({Creator: userId})
    .sort({_id:-1})
    // .skip(counter)
    // .limit(6)
    .then(missedNotifs => {
        console.log('missed notifs found', missedNotifs)
        res.status(200).json({
            message: 'missed notifications fetched succesfully!',
            messages: missedNotifs
            });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching missed notifications failed'
        });
    });
})
module.exports = router;
