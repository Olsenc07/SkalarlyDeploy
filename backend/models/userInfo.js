const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');


const userInfoSchema = mongoose.Schema({
    username: { type: String, required: true},
    name: { type: String },
    bio: { type: String },
    // gender: { type: String },
    campus: { type: String},
    birthday: { type: String},
    major: { type: String},
    minor: { type: String},
    sport: { type: String},
    club: { type: String},
    // pronouns: { type: String},
    Followers: { type: Number},
    Following: { type: Number},
    ProfilePicPath: { type: String},
    cloudinary_id: { type: String},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
 });
 
//  userInfoSchema.plugin(uniqueValidator);
 
 
 module.exports = mongoose.model('UserInfo', userInfoSchema);