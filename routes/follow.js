const UserInfo = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');
const Follow = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/follow')

const express = require('express');
const userInfo = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');
const { findOne } = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');
const router = express.Router();
// post
router.get("/infoFollow", async(req, res, next) => {
await userInfo.findOne({Creator: req.query.userId})
.then(user => {
    userInfo.findOne({username: req.query.username })
    .then( otherUser => {
const FOLLOW = new Follow({
    Follower: req.query.userId,
    nameFollower: user.name,
    usernameFollower: user.username,
    ProfilePicPathFollower: user.ProfilePicPath,

    Following: req.query.username,  
    nameFollowing: otherUser.name,
    ProfilePicPathFollowing: otherUser.ProfilePicPath
})
FOLLOW.save().then(createdFollow => {
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
    console.log('test 2_', follows)

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
        console.log('test 2_', follows)
    
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
    // Get following other
router.get("/mutualFollow", async(req, res, next) => {
    console.log('One', req.query.username);
    console.log('Two', req.query.userId);

    await Follow.find(
         {usernameFollower: req.query.username}
         )
   .then(follows => {
       console.log('test 4_', follows)
   
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
    console.log(req.query.userId)
    console.log(req.query.id)

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
