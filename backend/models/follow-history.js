const mongoose = require('mongoose');

const FollowHistorySchema = mongoose.Schema({
    Follower: { type: String},
    nameFollower: { type: String},
    usernameFollower: { type: String},
    ProfilePicPathFollower: { type: String},
    FollowingId: {type: String},
    Following: { type: String},
    nameFollowing: { type: String},
    ProfilePicPathFollowing: { type: String},
    Time: { type: String},
});

module.exports = mongoose.model('followHistory', FollowHistorySchema);