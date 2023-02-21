const mongoose = require('mongoose');

const BlockedSchema = mongoose.Schema({
    username: { type: String},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Comment', BlockedSchema);