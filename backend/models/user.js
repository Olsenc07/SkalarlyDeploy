const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
   email: { type: String, required: true},
   emailToken: { type: String },
   isVerified: { type: Boolean },
   username: { type: String, required: true},
   password: { type: String, required: true},
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
