const express = require('express');
const Request = require('../models/Request');
const Nurse = require('../models/Nurse');
const router = express.Router();

router.post('/', async (req,res) => {
  try {
    const payload = req.body;
    let nurse = null;
    if (payload.nurseId) {
      nurse = await Nurse.findById(payload.nurseId);
    } else if (payload.nurseName) {
    }
    const reqDoc = new Request({
      patientName: payload.patientName,
      patientAge: payload.patientAge,
      patientAddress: payload.patientAddress,
      patientCoordinates: payload.patientCoordinates,
      requestedWhen: payload.requestedWhen,
      nurse: nurse?._id,
      nurseName: nurse?.name || payload.nurseName || '',
      status: 'pending'
    });
    await reqDoc.save();

    try {
      const notify = require('../utils/notify');
      if (nurse) {
        await notify.notifyNurseOfRequest(nurse, reqDoc);
      }
    } catch (e) {
      console.warn('Notification failed', e?.message || e);
    }

    res.json({ ok: true, request: reqDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to create request' });
  }
});

router.get('/', async (req,res) => {
  try {
    const docs = await Request.find().sort({ createdAt: -1 }).limit(200).populate('nurse');
    res.json({ total: docs.length, data: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to list requests' });
  }
});

module.exports = router;
