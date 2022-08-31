const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    Username:  { type: String },
    Name:  { type: String },
    ProfilePicPath:  { type: String },
    Title:  { type: String },
    postDescription:  { type: String},
    postLocation: { type: String},
    LocationEvent:  { type: String},
    time:  { type: String},
    timeE:  { type: String},
    date: { type: String},
    dateE: { type: String},
    gender:  { type: String},
    driver: { type: String},
    paymentService: { type: String},
    virtual: { type: String},
    event: { type: String},
    ImagePath: { type:String},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Post', postSchema);
