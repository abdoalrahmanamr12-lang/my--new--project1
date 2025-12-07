const express = require('express');
const Nurse = require('../models/Nurse');
const { haversineKm } = require('../utils/geoutils');
const router = express.Router();

// GET /api/nurses?lat=..&lon=..&when=YYYY-MM-DDTHH:MM&radius=km
router.get('/', async (req,res) => {
  try {
    const { lat, lon, when, radius = 25 } = req.query;
    const q = {};
    const nurses = await Nurse.find(q).lean();
    if (!lat || !lon || !when) return res.json({ total: nurses.length, data: nurses.slice(0,50) });
    const whenKey = when.slice(0,16);
    const filtered = nurses.map(n => {
      const distanceKm = haversineKm(parseFloat(lat), parseFloat(lon), n.coordinates.lat, n.coordinates.lon);
      const hasSlot = (n.availability || []).some(a => a.slice(0,16) === whenKey);
      return { nurse: n, distanceKm, hasSlot };
    }).filter(r => r.hasSlot && r.distanceKm <= Number(radius))
      .sort((a,b) => a.distanceKm - b.distanceKm);
    res.json({ total: filtered.length, data: filtered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to query nurses' });
  }
});

module.exports = router;
