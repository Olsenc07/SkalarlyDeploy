const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userInfoSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true},
    name: { type: String },
    gender: { type: String },
    birthday: { type: String},
    major: { type: String},
    minor: { type: String},
    sport: { type: String},
    club: { type: String},
    pronouns: { type: String},
    CodeCompleted: { type: String},
    CodePursuing: { type: String},
    ProfilePicPath: { type: String},
    ShowCasePath: { type: String},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},

 });
 
 userInfoSchema.plugin(uniqueValidator);
 
 
 module.exports = mongoose.model('UserInfo', userInfoSchema);