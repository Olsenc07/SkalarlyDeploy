const mongoose = require('mongoose');

const FollowSchema = mongoose.Schema({
    Follower: { type: String},
    Following: { type: String},
});

module.exports = mongoose.model('follow', FollowSchema);