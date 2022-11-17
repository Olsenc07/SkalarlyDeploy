const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
endpoint: { type: String, unique: true},
keys: {
 p256dh: {type: String},
 auth: {type: String}
},

})


module.exports = mongoose.model('subscription', subscriptionSchema);
