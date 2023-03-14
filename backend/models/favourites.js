const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const favsSchema = mongoose.Schema({
   userId: { type: String, required: true},
   category: { type: String },
   hashtag: { type: String },
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Favs', favsSchema);