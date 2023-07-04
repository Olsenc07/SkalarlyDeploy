const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    location: { type: Geolocation},
    deviceType: { type: MediaDevices},
    online: { type: Boolean},
    activeOnline: { type: Boolean},
    time: { type: Date},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('ActiveSkalar', ActivitySchema); 