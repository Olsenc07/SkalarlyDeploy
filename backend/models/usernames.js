const mongoose = require('mongoose');

const userNames = new mongoose.Schema({
    username:{ type: String, required: true},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},


    })

module.exports = mongoose.model('UserNames', userNames)