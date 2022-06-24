const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    Title:  { type: String, require: false},
    postDescription:  { type: String, require: false},
    postLocation: { type: String, require: true},
    LocationEvent:  { type: String, require: false},
    time:  { type: String, require: false},
    date: { type: String, require: false},
    Gender:  { type: String, require: false},
    Driver: { type: String, require: false},
    PaymentService: { type: String, require: false},
    Virtual: { type: String, require: false},
    Event: { type: String, require: false},
    ImagePath: { type:String, require: false},
    // Comments and nested comments with replies
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Post', postSchema);
