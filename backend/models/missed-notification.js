const mongoose = require('mongoose');

const MissedHistorySchema = mongoose.Schema({
    // shared
    username: { type: String},
    // 1-1 message
    message: { type: String},
    // comments, followed, messages
    time: { type: String},
    // comment
    body: { type: String},
    // follower
    Follower: { type: String},
// comment and shared
    postId: { type: String},
    // all three and used for clearing missed notifs
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}

});

module.exports = mongoose.model('missedHistory', MissedHistorySchema);