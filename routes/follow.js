const UserInfo = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');
const Follow = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/follow')

const express = require('express');
const router = express.Router();

router.get("/infoFollow", async(req, res, next) => {
console.log('userId', req.query.userId)
console.log('username', req.query.username)
const FOLLOW = new Follow({
    Follower: req.query.userId,
    Following: req.query.username,  
})
FOLLOW.save().then(createdFollow => {
console.log('final', createdFollow)
})

})

module.exports = router;
