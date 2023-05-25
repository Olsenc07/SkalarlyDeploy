const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    username: { type: String},
    message: { type: String},
    // time may need to be of type Date not string
    time: { type: Date},
    otherUser: {type: String},
    you: {type: String},
    viewed: {type: Boolean}
    // ProfilePicPath: { type: String},
    // Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('message', MessageSchema);