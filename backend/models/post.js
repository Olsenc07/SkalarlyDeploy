const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    Title:  { type: String },
    postDescription:  { type: String},
    postLocation: { type: String},
    LocationEvent:  { type: String},
    time:  { type: String},
    date: { type: String},
    Gender:  { type: String},
    Driver: { type: String},
    PaymentService: { type: String},
    Virtual: { type: String},
    Event: { type: String},
    ImagePath: { type:String},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Post', postSchema);
