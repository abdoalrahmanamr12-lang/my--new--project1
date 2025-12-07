const mongoose = require('mongoose');

const NurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  specialties: [String],
  coordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  availability: [String],
  verified: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Nurse', NurseSchema);
