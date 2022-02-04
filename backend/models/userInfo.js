const mongoose = require('mongoose');


const userInfoSchema = mongoose.Schema({
    name: { type: String },
    gender: { type: String },
    birthday: { type: String},
    major: { type: String},
    minor: { type: String},
    sport: { type: String},
    club: { type: String},
    pronouns: { type: String}
 })
 
 
 
 module.exports = mongoose.model('UserInfo', userInfoSchema);