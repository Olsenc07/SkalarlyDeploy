const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    body: { type: String},
    username: { type: String},
    time: { type: String},
    postId: { type: String},
    ProfilePicPath: { type: String},
    viewed: {type: Boolean},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Comment', CommentSchema);