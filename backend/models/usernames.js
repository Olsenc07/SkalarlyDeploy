const mongoose = require('mongoose');

const userNames = new mongoose.Schema({
    username:{
        type: String,
        required: true
    }
    })

module.exports = mongoose.model('UserNames', userNames)