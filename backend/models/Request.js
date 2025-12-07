const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  patientName: String,
  patientAge: Number,
  patientAddress: String,
  patientCoordinates: {
    lat: Number,
    lon: Number
  },
  requestedWhen: String,
  nurse: { type: mongoose.Schema.Types.ObjectId, ref: 'Nurse' },
  nurseName: String,
  status: { type: String, enum: ['pending', 'accepted', 'declined', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', RequestSchema);
