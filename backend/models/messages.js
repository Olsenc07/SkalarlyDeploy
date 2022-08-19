const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    username: { type: String},
    message: { type: String},
    time: { type: String},
    otherUser: {type: String}
    // ProfilePicPath: { type: String},
    // Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('message', MessageSchema);