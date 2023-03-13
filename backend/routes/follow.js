const User = require('/app/backend/models/user');
const Follow = require('/app/backend/models/follow')
const BlockSkalar = require('/app/backend/models/block-skalar')

const followHistory = require('/app/backend/models/follow-history')
const missedHistory = require('/app/backend/models/missed-notification');

const express = require('express');
const userInfo = require('/app/backend/models/userInfo');
const Subscription = require('/app/backend/models/subscription');
const router = express.Router();
const webpush = require('web-push');
publicVapidKey = process.env.vapidPublic;
privateVapidKey = process.env.vapidPrivate

const options = {
    vapidDetails: {
        subject: 'mailto:admin@skalarly.com',
        publicKey: publicVapidKey,
        privateKey: privateVapidKey,
    },
    TTL: 60,
  };

// block skalar
router.get("/blockSkalar", async(req, res) => {
console.log('username', req.query.username);
userIdYo = req.query.userId;
username = req.query.username
await userInfo.findOne({username: username})
.then( UserId => {
    console.log('userId blocked', UserId);
    var blockedskalar = new BlockSkalar({
        blockedName: UserId.name,
        blockedUsername: UserId.username,
        Creator: req.query.userId
    });
    blockedskalar.save().then(blocked => {
        console.log('blocked', blocked );

// delete if they were following you
        Follow.deleteOne({ $and: [
            {usernameFollower: username},
            {FollowingId: userIdYo}
        ]})
        .then(deleted => {
            if(deleted){
            console.log('deleted', deleted);
            // update increments
            userInfo.updateOne({username: UserId.username}, {$inc: {Following: -1}})
            .then(updateFollowing => {
                console.log('step one');
                // update ur followers increment -1
            userInfo.updateOne({Creator: userIdYo}, {$inc: {Followers: -1}})
            .then(final => {
                console.log('step two');
            })
        })    
        }
        res.status(200).json({
            message: 'Skalar following you has been removed!',
            messages: true
        });
        }).catch(error => {
            res.status(500).json({
                message: 'deleting skalar failed!'
            });
         })

       
    }).catch(error => {
        res.status(500).json({
            message: 'Blocking skalar failed!'
        });
     })
})


})

// list of all blocked skalars
router.get("/getblockedList", async(req, res) => {
    await  BlockSkalar.find({Creator: req.query.userId})
    .then(blocked => {
        console.log('blocked list', blocked);
        if (blocked){
        res.status(200).json({
            message: 'Skalars have been blocked',
            messages: blocked
        });
    }else{
        res.status(200).json({
            message: 'No Skalars have been blocked',
            messages: []
        });
    }
    }) .catch(error => {
        res.status(500).json({
            message: 'all skalars blocklist failed!'
        });
    });
});
// Get blocked skalars on their profile
router.get("/getblockedListOne", async(req, res) => {
    await User.findOne({username: {$eq: req.query.id}})
        .then(user => {
            console.log('user run run', user);
            BlockSkalar.findOne({
                $and: [
                 {blockedUsername: user.username},
                {Creator: req.query.userId}
            ]
        })
            .then(blocked => {
                if(blocked){
                console.log('blocked gum', blocked);
                res.status(200).json({
                    message: 'Skalar has been blocked',
                    messages: true
                });
                }else{
                    res.status(200).json({
                        message: 'Skalar has not been blocked',
                        messages: false
                    });
                }
            })
            .catch(error => {
               return res.status(500).json({
                    message: 'blocklist failed!'
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'skalar blocklist failed!'
            });
        });
     
})

// accept follower
router.get("/acceptFollow", async(req,res) => {
    console.log('boolean logic', req.query.followId)
    await Follow.updateOne({_id:req.query.followId}, {viewed: true})
    .then(update => {
        res.status(200).json({message: 'accepted follower!', 
        update: true});
    }).catch(error => {
        res.status(500).json({
            message: 'Accepting follower failed!'
        });
    });
})


// unblock skalar
router.delete("/unblockSkalar", async(req, res) => {
    console.log('username', req.query.username);
    console.log('userId', req.query.userId);
     await BlockSkalar.deleteOne({
        $and: [
            {blockedUsername: req.query.username},
            {Creator: req.query.userId}
        ]
     })
     .then((result) => {
        if (result){
            res.status(200).json({message: 'unblocked!', messages: false});
            } else {
                res.status(401).json({message: 'Not unblocked'});
            }
     })
      .catch(error => {
        res.status(500).json({
            message: 'unblocking skalar failed!'
        });
    });
    

    })
// // unblock skalar from activity pg
router.delete("/unblockSkalarActivity", async(req, res) => {
    console.log('username', req.query.username);
    console.log('userId', req.query.userId);
     await BlockSkalar.deleteOne({
        $and: [
            {blockedUsername: req.query.username},
            {Creator: req.query.userId}
        ]
     })
     .then((result) => {
        // get this users blocks list
        if (result){
            console.log('results', result);
            BlockSkalar.find({Creator:req.query.userId})
            .then(newList => {
            console.log('newList', newList);
                if(newList){
                res.status(200).json({message: 'unblocked!', messages: newList});
                }else{
                res.status(200).json({message: 'unblocked all!', messages: []});

                }
            })

            } else {
                res.status(401).json({message: 'Not unblocked'});
            }
     })
      .catch(error => {
        res.status(500).json({
            message: 'unblocking skalar failed!'
        });
    });
    

    })
// post
router.get("/infoFollow", async(req, res, next) => {
    const subscription = req.body;
    console.log('follow occured', subscription)
await userInfo.findOne({Creator: req.query.userId})
.then(user => {
    userInfo.findOne({username: req.query.username })
    .then( otherUser => {
    User.findOne({username: req.query.FollowingId })
        .then( otherUserId => {
            const FOLLOW = new Follow({
                Follower: req.query.userId,
                nameFollower: user.name,
                usernameFollower: user.username,
                ProfilePicPathFollower: user.ProfilePicPath,
                FollowingId: otherUserId.id,
                Following: req.query.username,  
                nameFollowing: otherUser.name,
                ProfilePicPathFollowing: otherUser.ProfilePicPath,
                viewed: false
            })
            FOLLOW.save().then(createdFollow => {
                 //update follower count
     userInfo.updateOne({username: req.query.username },{$inc: {Followers: 1}})
     .then(updatedFollower => {
        console.log('updatedFollower',updatedFollower)
        userInfo.updateOne({Creator: req.query.userId}, {$inc: {Following: 1}} )
        .then(final => {
        console.log('updatedFollowing',final)

            res.status(200).json({
                message: 'Follow succesful!',
                messages: createdFollow
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid increment following error!"})
                    })
      
     }).catch(err => {
        return res.status(401).json({
            message: "Invalid increment follower error!"})
                })
              
// If user is subscribed then send notififaction S.W
try{
    console.log('better off with her', otherUserId.id)
     Subscription.findOne({Creator: otherUserId.id})
     .then((checking) => {
if(checking !== null){
    // console.log('road is fuller', subscriber.keys);
    // console.log('road is full', subscriber.keys.p256dh);
    const p256dh = checking.keys.p256dh
    const auth = checking.keys.auth
    const endpoint = checking.endpoint
    const pushSubscription = {
        keys: {
          p256dh: p256dh,
          auth: auth
        },
        endpoint: endpoint,
      };
      publicVapidKey = process.env.vapidPublic;
      privateVapidKey = process.env.vapidPrivate
      webpush.setVapidDetails('mailto:admin@skalarly.com', publicVapidKey, privateVapidKey);
      webpush.sendNotification(pushSubscription, JSON.stringify({
        title: 'New Follower!',
        content: `${user.name} has connected with you.`,
        openUrl: '/friends-activity'
    }), options)
    .then((_) => {
        console.log( 'SENT Follow');
    })
    .catch(error => {
        console.log(error);
        var missedNotif = new missedHistory({
            username: '',
            message: '',
            time: '',
            body: '',
            Follower: user.username,
            postId: req.query.userId,
            Creator: req.query.userId

          })
          missedNotif.save();
          console.log('missed followed saved and notified')

    })
} })
   } catch{
    console.log('User does not have a subscription for followers')
}
})
.catch(err => {
    return res.status(401).json({
        message: "Invalid following error!"})
            })
    
})
.catch(err => {
    return res.status(401).json({
        message: "Invalid follow error!"})
            })
         })
    })
})
// Followed history
router.get("/infoFollowHistory", async(req, res, next) => {

await userInfo.findOne({Creator: req.query.userId})
.then(user => {
    userInfo.findOne({username: req.query.username })
    .then( otherUser => {
    User.findOne({username: req.query.FollowingId })
        .then( otherUserId => {
            const FOLLOW = new followHistory({
                Follower: req.query.userId,
                nameFollower: user.name,
                usernameFollower: user.username,
                ProfilePicPathFollower: user.ProfilePicPath,
                FollowingId: otherUserId.id,
                Following: req.query.username,  
                nameFollowing: otherUser.name,
                ProfilePicPathFollowing: otherUser.ProfilePicPath,
                Time: req.query.time
            })
            FOLLOW.save().then(createdFollow => {
                res.status(200).json({
                    message: 'Follow succesful!',
                    messages: createdFollow
                });
})
.catch(err => {
    return res.status(401).json({
        message: "Invalid following error!"})
            })
})
.catch(err => {
    return res.status(401).json({
        message: "Invalid follow error!"})
            })
         })
    })
})


// Get following
router.get("/followInfo", async(req, res, next) => {
    console.log('ittl work out, ',req.query.userId)
await userInfo.findOne({Creator: req.query.userId})
.then(user => { 
 Follow.find({usernameFollower: user.username})
.then(follows => {
    res.status(200).json({
        message: 'Follows fetched succesfully!',
        messages: follows
    });
})
})
.catch(err => {
    return res.status(401).json({
        message: "Invalid following error!",

    })
})
})

// filter following
router.get("/filterFollowing", async(req, res) => {
    payload = req.query.queryFollowing;
    console.log('payload 777', payload)
    await userInfo.findOne({Creator: req.query.userId})
.then(user => {
 Follow.find({ $and: [
    {usernameFollower: user.username},
    {
        Following: {$regex: new RegExp('^' + payload,
        'i')
    }
    }
 ]})
.then(follows => {
console.log('follows777',follows);

    res.status(200).json({
        message: 'Follows fetched succesfully!',
        messages: follows
    });
}).catch(err => {
    return res.status(401).json({
        message: "Invalid filter error!",

    })
})
})
.catch(err => {
    return res.status(401).json({
        message: "Invalid filter error 2",

    })
})
})
// filter followers
router.get("/filterFollowers", async(req, res) => {
    payload = req.query.queryFollowing;
    userId = req.query.userId;

    console.log('payload 777', payload)
    await userInfo.findOne({Creator: userId})
    .then(user => {

     Follow.find({ $and: [
       { Following: user.username},

       {
        usernameFollower: {$regex: new RegExp('^' + payload,
        'i')
    }
    }
     ]})
    .then(follows => {
        console.log('pumpkin', follows)
        res.status(200).json({
            message: 'Follows fetched succesfully!',
            messages: follows
        });
    })
    })
    .catch(err => {
        return res.status(401).json({
            message: "Invalid following error!",
    
        })
    })
})
// Get following other
router.get("/followInfoOther", async(req, res, next) => {
     await Follow.find({usernameFollower: req.query.id})
    .then(follows => {    
        res.status(200).json({
            message: 'Follows fetched succesfully!',
            messages: follows
        });
    })

    .catch(err => {
        return res.status(401).json({
            message: "Invalid following error!",
    
        })
    })
    });
    // Get following other
router.get("/mutualFollow", async(req, res, next) => {
    await Follow.find(
         {usernameFollower: req.query.username}
         )
   .then(follows => {   
       res.status(200).json({
           message: 'Follows fetched succesfully!',
           messages: follows
       });
   })
   .catch(err => {
       return res.status(401).json({
           message: "Invalid following error!",
   
       })
   })
   })
       // Get followers other
router.get("/mutualsFollow", async(req, res, next) => {
    await Follow.find(
         {Following: req.query.username}
         )
   .then(follows => {
       console.log('test 4s', follows)
       res.status(200).json({
           message: 'Follows fetched succesfully!',
           messages: follows
       });
   })
   .catch(err => {
       return res.status(401).json({
           message: "Invalid following error!",
   
       })
   })
   })

// Get follower
router.get("/followerInfo", async(req, res, next) => {
    await userInfo.findOne({Creator: req.query.userId})
    .then(user => {

     Follow.find({Following: user.username})
    .then(follows => {
        res.status(200).json({
            message: 'Follows fetched succesfully!',
            messages: follows
        });
    })
    })
    .catch(err => {
        return res.status(401).json({
            message: "Invalid following error!",
    
        })
    })
    })
    // Get follower history
router.get("/followerInfoHistory", async(req, res, next) => {
    const counter = req.query.counter
    await userInfo.findOne({Creator: req.query.userId})
    .then(user => {
        followHistory.find({Following: user.username}).sort({_id:-1}).skip(counter).limit(6)
    .then(follows => {
        res.status(200).json({
            message: 'Follows fetched succesfully!',
            messages: follows
        });
    })
    })
    .catch(err => {
        return res.status(401).json({
            message: "Invalid following error!",
    
        })
    })
    })
    // Get follower Other
router.get("/followerInfoOther", async(req, res, next) => {
    await userInfo.findOne({username: req.query.id})
    .then(user => {
     Follow.find({Following: user.username})
    .then(follows => {
        console.log('test 2', follows)

        res.status(200).json({
            message: 'Follows fetched succesfully!',
            messages: follows
        });
    })
    })
    .catch(err => {
        return res.status(401).json({
            message: "Invalid following error!",
    
        })
    })
    })
    // Get following notif
router.get("/followingInfo", async(req, res, next) => {
    console.log('following', req.query.id )
    console.log('da tities', req.query.userId);
    await Follow.findOne({ $and: [  {Follower: req.query.userId},
        {Following: req.query.id}
      ]})
    .then(following => {
        console.log('following', following)
        if(following){
        console.log('test 69', following)
        res.status(200).json({
            message: 'Follows fetched succesfully!',
            messages: 'true'
        });
    }else{
        console.log('test 7')

        res.status(200).json({
            message: 'Not Following fetched succesfully!'
        });
    }
    })
    .catch(err => {
        return res.status(401).json({
            message: "Invalid following error!",
    
        })
    })
    })
// follower deleting 
router.delete("/unFollower/:id", async(req, res, next ) => {
await Follow.findOne({_id: req.params.id})
.then(found => {
    console.log('next shit', found)
    userInfo.updateOne({username: found.usernameFollower}, {$inc: {Following: -1}})
    .then(updateFollowing => {
        console.log('step one');
    userInfo.updateOne({username: found.Following}, {$inc: {Followers: -1}})
    .then(final => {
        console.log('step two');
        
            Follow.deleteOne({_id: req.params.id}).then(result => {
                if (result){
                    Follow.find({Following: found.Following})
        .then(follows => {
            console.log('who u following', follows)

                res.status(200).json({
                    message: 'Follows fetched succesfully! and unfollowed',
                    messages: follows
                });
               
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Deleting follower failed!'
                });
            });
        } else {
            res.status(401).json({message: 'Not unfollowed'});
        }
        }).catch(error => {
            res.status(500).json({
                message: 'Finding new followers failed!'
            });
        });
     
    }) .catch(error => {
        res.status(500).json({
            message: 'Updating Followers failed!'
        });
    });

    }).catch(error => {
        res.status(500).json({
            message: 'Updating Following failed!'
        });
    });
})

    
});
// following deleting add decreasing increments
router.delete("/unFollow/:id", async(req, res, next ) => {
    await Follow.findOne({_id: req.params.id})
.then(found => {
    userInfo.updateOne({username: found.usernameFollower}, {$inc: {Following: -1}})
    .then(updateFollowing => {
        console.log('step oneyo');
    userInfo.updateOne({username: found.Following}, {$inc: {Followers: -1}})
    .then(final => {
        console.log('step twoyo');
        Follow.deleteOne({_id: req.params.id}).then(result => {
            if (result){
            res.status(200).json({message: 'unfollowed!'});
            } else {
                res.status(401).json({message: 'Not unfollowed'});
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching showCases failed!'
            });
        });
    }) .catch(error => {
        res.status(500).json({
            message: 'Updating Followers failed!'
        });
    });

    }).catch(error => {
        res.status(500).json({
            message: 'Updating Following failed!'
        });
    });
});

});

// following deleting form user profile pg
router.get("/unFollowUserPg", async(req, res, next ) => {
    userName = req.query.userName;
    person = req.query.userId;
console.log('userName', userName);
console.log('userId', person);

   await Follow.deleteOne({ $and: [
       {Follower: person},
       { Following: userName}
    ]}).then(result => {

        if (result){
            console.log('it worked', result);
            userInfo.updateOne({userName: userName}, {$inc: {Followers: -1}} )
            .then(updateUrFollowing =>{
                userInfo.updateOne({Creator: person}, {$inc: {Following: -1}} )
                .then(final => {
                    console.log('made it to New York')
                    res.status(200).json({message: 'unfollowed!'});
                })
            })
        } else {
            res.status(401).json({message: 'Not unfollowed'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Unfollowing failed!'
        });
    });
});



module.exports = router;
