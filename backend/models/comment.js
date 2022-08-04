const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    body: { type: String},
    username: { type: String},
    userId: { type: String},
    ProfilePicPath: { type: String},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Comment', CommentSchema);