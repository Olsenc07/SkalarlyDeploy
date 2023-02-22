const mongoose = require('mongoose');

const BlockedSchema = mongoose.Schema({
    blocked: { type: String},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('BlockedSkalar', BlockedSchema);