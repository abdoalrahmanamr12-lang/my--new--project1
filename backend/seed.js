require('dotenv').config();
const mongoose = require('mongoose');
const Nurse = require('./models/Nurse');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nurseoncall';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const SAMPLE = [
  {
    name: "Fatima Hassan",
    phone: "+201001234567",
    specialties: ["Elderly care", "Wound dressing"],
    coordinates: { lat: 30.0444, lon: 31.2357 },
    availability: ["2025-12-07T08:00", "2025-12-07T10:00", "2025-12-07T14:00"]
  },
  {
    name: "Laila Omar",
    phone: "+201009876543",
    specialties: ["Pediatric care", "IV therapy"],
    coordinates: { lat: 30.0510, lon: 31.2430 },
    availability: ["2025-12-07T09:00", "2025-12-07T11:00", "2025-12-07T16:00"]
  },
  {
    name: "Mona Ali",
    phone: "+201002223334",
    specialties: ["Post-op care"],
    coordinates: { lat: 30.0355, lon: 31.2200 },
    availability: ["2025-12-07T13:00", "2025-12-07T15:00"]
  }
];

async function run() {
  try {
    await Nurse.deleteMany({});
    await Nurse.insertMany(SAMPLE);
    console.log('Seeded nurses');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}
run();
