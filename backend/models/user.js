const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
   email: { type: String, required: true, unique: true},
   username: { type: String, required: true, unique: true},
   password: { type: String, required: true},
});

userSchema.plugin(uniqueValidator);


const userInfoSchema = mongoose.Schema({
   genderChoice: { type: String, required: false},
   name: { type: String, required: false }
})


module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('UserInfo', userInfoSchema);

