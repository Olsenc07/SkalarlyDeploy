const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    deviceType: { type: MediaDevices},
    online: { type: Boolean},
    activeOnline: { type: Boolean},
    time: { type: Date},
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('ActiveSkalar', ActivitySchema); 