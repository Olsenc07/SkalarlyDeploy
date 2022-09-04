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
    Following: req.query.username,  
    name: user.username,
    username: otherUser.name,
    ProfilePicPath: otherUser.ProfilePicPath
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
 Follow.find({name: user.username})
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

// showCase deleting
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

module.exports = router;
