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
    var allMsgsReverseSent = []
    var allMsgsReverse = []
    await User.findById({_id: req.query.userId})
.then(user => {
    console.log('user ni ni', user)
    BlockSkalar.find({blockedUsername:user.username})
    .then(blocked => {
        if(blocked.length >= 1){
console.log('blocked', blocked)

                console.log('user ni ni 77', user)
                blockedList = []
                blocked.forEach((e) => {
                    blockedList.push(e.Creator.valueOf())
                })
                console.log('blockedList',blockedList);
                Msg.find( {$and: [
                    {otherUser: user.username},
                    {you:{$nin: blockedList }}
            ]}).sort({time:-1}) 
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
                }).sort({ time:-1}) 
                  .then(finalDocs => {
                    console.log('did we make it?', finalDocs)
                    // 
                   allMsgs.push(finalDocs);
                if(allMsgs.length == nonyaOnce.length){ 
                     allMsgsReverse = allMsgs;
                    console.log('sooner', allMsgsReverse );
                    // sort by new time ontop
                    allMsgsReverse.sort((a,b) => {
                        // .getTime()
                        let newest = new Date(a.time),
                            older = new Date(b.time);
                            return newest - older 
                    })
                    
                // res.status(200).json({
                //     message: 'Info messages fetched succesfully!',
                //     messages: allMsgsReverse,
                //     });
                }
                console.log('final block 765', allMsgsReverse)

                  })
            
                  .catch(err => {
                    return res.status(401).json({
                        message: "Message error 3!",
                
                    })
                })
            
            }
            }
            // else{
            //     return res.status(200).json({
            //         message: "No messages to retrieve",
            //         messages: documents
            
            //     })
            // }
                })
                .catch(err => {
                    return res.status(401).json({
                        message: "Message error 2!",
                
                    })
                })
            
// now get sent messages blocked 
// cant send if your blocked so cant retrieve this msg
console.log('cant see msgs you sent to people you blocked')
blockedListnames = []
blocked.forEach((e) => {
    blockedListnames.push(e.blockedUsername)
})
Msg.find( {$and: [
    {username: user.username},
    {otherUser: {$nin: blockedListnames }}
        ]}).sort({time:-1})
.then(documents => {
    if(documents.length > 0){
    console.log('timing', documents)
    nonyaSent = [];
    documents.forEach((e) => {
        nonyaSent.push(e.otherUser)
    });
let nonyaOnceSent = [...new Set(nonyaSent)];
console.log('order german blocked', nonyaOnceSent);
allMsgsSent = []
for(let i in nonyaOnceSent){
Msg.findOne({ $and: [
{otherUser: nonyaOnceSent[i]},
{username: user.username}
]
}).sort({time:-1})    
  .then(finalDocs => {
    console.log('did we make it sent blocked?', finalDocs)
    allMsgsSent.push(finalDocs);
if(allMsgsSent.length == nonyaOnceSent.length){ 
     allMsgsReverseSent = allMsgsSent;
    console.log('sooner syd 2', allMsgsReverseSent );
    allMsgsReverseSent.sort((a,b) => {
        let newest = new Date(a.time),
            older = new Date(b.time);
            return newest - older
    })
    // add sent: 'true' to each
    allMsgsReverseSent.filter((e) => {
        console.log('eeee7e', e);
        e.sent = 'true'
    })
// res.status(200).json({
//     message: 'Info messages fetched succesfully!',
//        messages: allMsgsReverseSent
//     });
}
console.log('final jess 2 sent', allMsgsReverseSent)

  })

  .catch(err => {
    return res.status(401).json({
        message: "Message error 3!",

    })
})

}
}
// else{
//     return res.status(200).json({
//         message: "No messages to retrieve",
//         messages: documents

//     })
// }
})
.catch(err => {
    return res.status(401).json({
        message: "Message error 2!",

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
                     allMsgsReverse = allMsgs;
                    console.log('sooner syd 2', allMsgsReverse );
                    allMsgsReverse.sort((a,b) => {
                        let newest = new Date(a.time),
                            older = new Date(b.time);
                            return newest - older
                    })
           
                // res.status(200).json({
                //     message: 'Info messages fetched succesfully!',
                //        messages: allMsgsReverse
                //     });
                }
                console.log('final jess 2', allMsgsReverse)
                // not to get sent msgs with recieved msgs
                Msg.find( 
                    {username: user.username}
                ).sort({time:-1})
                .then(documents => {
                    if(documents.length > 0){
                    console.log('timing 77', documents)
                    nonyaSent = [];
                    documents.forEach((e) => {
                        console.log('desert and i saw the lights')
                        nonyaSent.push(e.otherUser)
                    });
            let nonyaOnceSent = [...new Set(nonyaSent)];
            console.log('order german', nonyaOnceSent);
            allMsgsSent = []
            for(let i in nonyaOnceSent){
                Msg.findOne({ $and: [
            {username: user.username},
            {otherUser: nonyaOnceSent[i]}
                ]
                }).sort({time:-1})    
                  .then(finalDocs7 => {

                    console.log('did we make it sent?', finalDocs7)
                    allMsgsSent.push(finalDocs7);
                if(allMsgsSent.length == nonyaOnceSent.length){ 
                     allMsgsReverseSent = allMsgsSent;
                    console.log('soooner syd 2', allMsgsReverseSent );
                    allMsgsReverseSent.sort((a,b) => {
                        let newest = new Date(a.time),
                            older = new Date(b.time);
                            return newest - older
                    })
                    // add sent: 'true' to each
                    allMsgsReverseSent.filter((e) => {
                        console.log('eeeee777', e);
                        e.sent = 'true'
                    })
                // res.status(200).json({
                //     message: 'Info messages fetched succesfully!',
                //        messages: allMsgsReverseSent
                //     });
                }
                console.log('final jess 2 sent with sent and recieved', allMsgsReverseSent)
                console.log('starting up famous in the hills, should be here hottie')
                console.log('final jess 277', allMsgsReverse)
                console.log('final jess 2316 sent', allMsgsReverseSent)
                msgsWanted = allMsgsReverse.concat(allMsgsReverseSent)
                console.log('just might', msgsWanted);
                // compare most recent of sent nd recived 
                msgsWanted.sort((c,e) => {
                    console.log('last steps dont cry 7', c);
    
                    console.log('last steps dont cry', e);
    
                    if((c.username == e.otherUser) || (e.username == c.otherUser)){
                        let newest = new Date(c.time),
                            older = new Date(e.time);
                            if (newest > older){
                                console.log('hey im new');
                                return newest
                            }else {
                                console.log('hey im old');
                                return older
                            } 
                             
                    }
                    console.log('hippy pippy', msgsWanted)
                    msgsWanted.sort((a,b) => {
                        let newest = new Date(a.time),
                            older = new Date(b.time);
                            return newest - older
                    })
                })
                    res.status(200).json({
                    message: 'Info messages fetched succesfully!',
                       messages: msgsWanted
                    });
                  })
            
                  .catch(err => {
                    return res.status(401).json({
                        message: "Message error 33!",
                
                    })
                })
            
            }


            }
            // else{
            //     return res.status(200).json({
            //         message: "No messages to retrieve",
            //         messages: documents
            
            //     })
            // }
                })
                .catch(err => {
                    return res.status(401).json({
                        message: "Message error 2!",
                
                    })
                })
               
                  })
            
                  .catch(err => {
                    return res.status(401).json({
                        message: "Message error 37!",
                
                    })
                })
            
            }
            // no msgs recieved
            }else{
                // now get sent messages
                console.log('user ni sent on purpose', user.username)
                Msg.find( 
                    {username: user.username}
                ).sort({time:-1})
                .then(documents => {
                    if(documents.length > 0){
                    console.log('timing 77', documents)
                    nonyaSent = [];
                    documents.forEach((e) => {
                        console.log('desert and i saw the lights')
                        nonyaSent.push(e.otherUser)
                    });
            let nonyaOnceSent = [...new Set(nonyaSent)];
            console.log('order german', nonyaOnceSent);
            allMsgsSent = []
            for(let i in nonyaOnceSent){
                Msg.findOne({ $and: [
            {username: user.username},
            {otherUser: nonyaOnceSent[i]}
                ]
                }).sort({time:-1})    
                  .then(finalDocs7 => {

                    console.log('did we make it sent?', finalDocs7)
                    allMsgsSent.push(finalDocs7);
                if(allMsgsSent.length == nonyaOnceSent.length){ 
                     allMsgsReverseSent = allMsgsSent;
                    console.log('soooner syd 2', allMsgsReverseSent );
                    allMsgsReverseSent.sort((a,b) => {
                        let newest = new Date(a.time),
                            older = new Date(b.time);
                            return newest - older
                    })
                    // add sent: 'true' to each
                    allMsgsReverseSent.filter((e) => {
                        console.log('eeeee777', e);
                        e.sent = 'true'
                    })
                //  no recieved msgs but has sent msgs
                console.log('starting up famous in the hills, should be here')
                console.log('final jess 277', allMsgsReverse)
                console.log('final jess 2316 sent', allMsgsReverseSent)
                msgsWanted = allMsgsReverse.concat(allMsgsReverseSent)
                console.log('just might', msgsWanted);
                // compare most recent of sent nd recived 
                msgsWanted.sort((c,e) => {
                    console.log('last steps dont cry 7', c);
    
                    console.log('last steps dont cry', e);
    
                    if((c.username == e.otherUser) || (e.username == c.otherUser)){
                        let newest = new Date(c.time),
                            older = new Date(e.time);
                            if (newest > older){
                                console.log('hey im new');
                                return newest
                            }else {
                                console.log('hey im old');
                                return older
                            } 
                             
                    }
                    console.log('hippy pippy', msgsWanted)
                    msgsWanted.sort((a,b) => {
                        let newest = new Date(a.time),
                            older = new Date(b.time);
                            return newest - older
                    })
                })
                    res.status(200).json({
                    message: 'Info messages fetched succesfully!',
                       messages: msgsWanted
                    });
                }
                console.log('final jess 2 sent', allMsgsReverseSent)

                  })
            
                  .catch(err => {
                    return res.status(401).json({
                        message: "Message error 33!",
                
                    })
                })
            
            }


            }
            else{
                return res.status(200).json({
                    message: "No messages to retrieve",
                    messages: []
            
                })
            }
                })
                .catch(err => {
                    return res.status(401).json({
                        message: "Message error 2!",
                
                    })
                })
            }
                })
                .catch(err => {
                    return res.status(401).json({
                        message: "Message error 2!",
                
                    })
                })
                // now get sent messages
            //     console.log('user ni sent on purpose', user.username)
            //     Msg.find( 
            //         {username: user.username}
            //     ).sort({time:-1})
            //     .then(documents => {
            //         if(documents.length > 0){
            //         console.log('timing 77', documents)
            //         nonyaSent = [];
            //         documents.forEach((e) => {
            //             console.log('desert and i saw the lights')
            //             nonyaSent.push(e.otherUser)
            //         });
            // let nonyaOnceSent = [...new Set(nonyaSent)];
            // console.log('order german', nonyaOnceSent);
            // allMsgsSent = []
            // for(let i in nonyaOnceSent){
            //     Msg.findOne({ $and: [
            // {username: user.username},
            // {otherUser: nonyaOnceSent[i]}
            //     ]
            //     }).sort({time:-1})    
            //       .then(finalDocs7 => {

            //         console.log('did we make it sent?', finalDocs7)
            //         allMsgsSent.push(finalDocs7);
            //     if(allMsgsSent.length == nonyaOnceSent.length){ 
            //          allMsgsReverseSent = allMsgsSent;
            //         console.log('soooner syd 2', allMsgsReverseSent );
            //         allMsgsReverseSent.sort((a,b) => {
            //             let newest = new Date(a.time),
            //                 older = new Date(b.time);
            //                 return newest - older
            //         })
                 
            //         allMsgsReverseSent.filter((e) => {
            //             console.log('eeeee777', e);
            //             e.sent = 'true'
            //         })
              
            //     console.log('final jess 2 sent', allMsgsReverseSent)

            //       })
            
            //       .catch(err => {
            //         return res.status(401).json({
            //             message: "Message error 33!",
                
            //         })
            //     })
            
            // }


            // }
           
                // })
                // .catch(err => {
                //     return res.status(401).json({
                //         message: "Message error 2!",
                
                //     })
                // })
                
                // final set up but do i make a lot of ifs and such
                // console.log('starting up famous, should be here')
                // console.log('final jess 277', allMsgsReverse)
                // console.log('final jess 2316 sent', allMsgsReverseSent)
                // msgsWanted = allMsgsReverse.concat(allMsgsReverseSent)
                // console.log('just might', msgsWanted);
                // // compare most recent of sent nd recived 
                // msgsWanted.sort((c,e) => {
                //     console.log('last steps dont cry 7', c);
    
                //     console.log('last steps dont cry', e);
    
                //     if((c.username == e.otherUser) || (e.username == c.otherUser)){
                //         let newest = new Date(c.time),
                //             older = new Date(e.time);
                //             if (newest > older){
                //                 console.log('hey im new');
                //                 return newest
                //             }else {
                //                 console.log('hey im old');
                //                 return older
                //             } 
                             
                //     }
                //     console.log('hippy pippy', msgsWanted)
                //     msgsWanted.sort((a,b) => {
                //         let newest = new Date(a.time),
                //             older = new Date(b.time);
                //             return newest - older
                //     })
                // })
                //     res.status(200).json({
                //     message: 'Info messages fetched succesfully!',
                //        messages: msgsWanted
                //     });
                


            })
            .catch(err => {
                return res.status(401).json({
                    message: "Message error 1!",
            
                })
            })
            console.log('starting up')
            
            
        }
       
    }).catch(err => {
        return res.status(401).json({
            message: "Message error blocked!",
    
        })
    })
}).catch(err => {
    return res.status(401).json({
        message: "Message error own!",

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
                message: "Message error 333!",
        
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
