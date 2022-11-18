const User = require('/app/backend/models/user');
const Follow = require('/app/backend/models/follow')
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
  const payload = {
    notification: {
      body: 'You will now recieve notifations',
      icon: '/angular-SCHOLARLY/src/faviconH.ico',
      image: '../../assets/Pics/Skalarly jpeg 2 (hat & logo).png',
      vibrate: [100, 50, 100],
      badge: '/angular-SCHOLARLY/src/faviconH.ico',
      tag: 'confirm-notification',
      actions: [
        {action: 'confirm', title: 'Okay', icon:'/angular-SCHOLARLY/src/faviconH.ico'},
        {action: 'cancel', title: 'Cancel', icon:'/angular-SCHOLARLY/src/faviconH.ico'},
    
      ]
    }
    };
// post
router.get("/infoFollow", async(req, res, next) => {
    const subscription = req.body;
    console.log('follow occured',subscription)
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
                ProfilePicPathFollowing: otherUser.ProfilePicPath
            })
            FOLLOW.save().then(createdFollow => {
                res.status(200).json({
                    message: 'Follow succesful!',
                    messages: createdFollow
                });
// If user is subscribed then send notififaction S.W
try{
    Subscription.findOne({Creator: req.query.userId})
    .then(subscriber =>{
console.log('road is full',subscriber);
const subscriber_ = subscriber
const pushSubscription = {
    endpoint: subscriber_.data.endpoint,
    keys: {
      auth: subscriber_.data.keys.auth,
      p256dh: subscriber_.data.keys.p256dh
    }
  };
webpush.sendNotification(pushSubscription, JSON.stringify({
    title: 'New Follower!',
    content: 'A fellow Skalar has connected with you.',
    openUrl: '/friends-activity'
}), options)
.catch(error => {
    console.error(error.stack);
})
    })
} catch{
    console.log('User does not have a subscription')
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



// Get following
router.get("/followInfo", async(req, res, next) => {
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
// Get following other
router.get("/followInfoOther", async(req, res, next) => {
     await Follow.findOne({usernameFollower: req.query.id})
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
// following deleting
router.delete("/unFollow/:id", (req, res, next ) => {
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
});

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
    await Follow.find({ and: [ {Following: req.query.id}, 
        {Follower: req.query.userId}]})
    .then(following => {
        console.log('test 2', following)
        res.status(200).json({
            message: 'Follows fetched succesfully!',
            messages: following
        });
    })
    .catch(err => {
        return res.status(401).json({
            message: "Invalid following error!",
    
        })
    })
    })
// follower deleting
router.delete("/unFollower/:id", (req, res, next ) => {
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
});

module.exports = router;
