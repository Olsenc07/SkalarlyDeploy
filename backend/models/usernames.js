const mongoose = require('mongoose');

const userNames = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    major: { type: String}

    })

module.exports = mongoose.model('UserNames', userNames)