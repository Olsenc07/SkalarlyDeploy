const mongoose = require('mongoose');

const showCaseSchema = mongoose.Schema({
    // ShowCasePath: { type: String},
    showCase: {type: File},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('showCase', showCaseSchema);