const mongoose = require('mongoose');

const FollowSchema = mongoose.Schema({
    Follower: { type: String},
    Following: { type: String},
    name: { type: String},
    username: { type: String},
    ProfilePicPath: { type: String},

});

module.exports = mongoose.model('follow', FollowSchema);