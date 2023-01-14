const mongoose = require('mongoose');

const showCaseSchema = mongoose.Schema({
    ShowCasePath: { type: String},
    VideoPath: { type: String},
    cloudinary_id: { type: String},
    Creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('showCase', showCaseSchema);