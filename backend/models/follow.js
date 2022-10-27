const mongoose = require('mongoose');

const FollowSchema = mongoose.Schema({
    Follower: { type: String},
    nameFollower: { type: String},
    usernameFollower: { type: String},
    ProfilePicPathFollower: { type: String},
    FollowingId: {type: String},
    Following: { type: String},
    nameFollowing: { type: String},
    ProfilePicPathFollowing: { type: String},

});

module.exports = mongoose.model('follow', FollowSchema);