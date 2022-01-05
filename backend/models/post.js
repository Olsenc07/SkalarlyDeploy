const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    Title:  { type: String, require: false},
    PostDescription:  { type: String, require: false},
    PostLocation: { type: String, require: true},
    LocationEvent:  { type: String, require: false},
    Time:  { type: String, require: false},
    Date: { type: String, require: false},
    Gender:  { type: String, require: false},
    Driver: { type: Boolean, require: false},
    Virtual: { type: Boolean, require: false},
    Event: { type: String, require: false},
});

module.exports = mongoose.model('Post', postSchema);
