const mongoose = require('mongoose');

const FollowHistoryAcceptedSchema = mongoose.Schema({
    you: {type: String},
    FollowingId: {type: String},
    Following: { type: String},
    ProfilePicPathFollowing: { type: String},
    Time: { type: Date},
    viewed: { type: Boolean}
});

module.exports = mongoose.model('followaccepted', FollowHistoryAcceptedSchema, 'followaccepted');