const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    OriginalCreatorId:  { type: String },
    OriginalPostId:  { type: String },
    SharerUsername:  { type: String },
    SharerName:  { type: String },
    SharerProfilePicPath:  { type: String },
    Username:  { type: String },
    Name:  { type: String },
    ProfilePicPath:  { type: String },
    Title:  { type: String },
    postDescription:  { type: String},
    postLocation: { type: String},
    LocationEvent:  { type: String},
    time:  { type: String},
    timeE:  { type: String},
    gender:  { type: String},
    live: { type: String},
    paymentService: { type: String},
    nopaymentService: { type: String},
    virtual: { type: String},
    event: { type: String},
    ImagePath: { type: String},
    VideoPath: { type: String},
    cloudinary_id: { type:String},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Post', postSchema);
