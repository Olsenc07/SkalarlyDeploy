const UserInfo = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');
const Follow = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/follow')

const express = require('express');
const userInfo = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');
const { findOne } = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');
const router = express.Router();
// post
router.get("/infoFollow", async(req, res, next) => {
console.log('userId', req.query.userId)
console.log('username', req.query.username)
await userInfo.findOne({Creator: req.query.userId})
.then(user => {
    userInfo.findOne({username: req.query.username })
    .then( otherUser => {
    console.log('user', user)
    console.log('user2', otherUser)

const FOLLOW = new Follow({
    Follower: req.query.userId,
    Following: req.query.username,  
    name: user.username,
    username: otherUser.name,
    ProfilePicPath: otherUser.ProfilePicPath
})
FOLLOW.save().then(createdFollow => {
console.log('final', createdFollow)
})
})
})
})




// Get following
router.get("/followInfo", async(req, res, next) => {
console.log('yung gravy', req.query.userId)
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
})

module.exports = router;
