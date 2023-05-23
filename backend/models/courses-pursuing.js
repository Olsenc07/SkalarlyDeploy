const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');


const userInfoCoursePursuingSchema = mongoose.Schema({
CodePursuing: { type: String},
CodePursuing2: { type: String},
CodePursuing3: { type: String},
CodePursuing4: { type: String},
CodePursuing5: { type: String},
CodePursuing6: { type: String},
CodePursuing7: { type: String},
CodePursuing8: { type: String},
CodePursuing9: { type: String},
CodePursuing10: { type: String},
CodePursuing11: { type: String},
CodePursuing12: { type: String},
CodePursuing13: { type: String},
CodePursuing14: { type: String},
Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

module.exports = mongoose.model('coursepursuings', userInfoCoursePursuingSchema, 'coursepursuings');