const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
// userId: {type:String, required: true},
endpoint: { type: String, unique: true},
keys: {
 p256dh: {type: String},
 auth: {type: String}
},

})


module.exports = mongoose.model('subscription', subscriptionSchema);
