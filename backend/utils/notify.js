const twilioSid = process.env.TWILIO_ACCOUNT_SID;
const twilioToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFrom = process.env.TWILIO_FROM;
const sendgridKey = process.env.SENDGRID_API_KEY;
const emailFrom = process.env.EMAIL_FROM;

module.exports = {
  async notifyNurseOfRequest(nurse, reqDoc) {
    const text = `New visit request for ${reqDoc.patientName} at ${reqDoc.requestedWhen}. Contact patient: ${reqDoc.patientAddress || 'n/a'}`;
    if (twilioSid && twilioToken && twilioFrom && nurse.phone) {
      try {
        const client = require('twilio')(twilioSid, twilioToken);
        await client.messages.create({
          body: text,
          from: twilioFrom,
          to: nurse.phone
        });
        console.log('SMS sent to', nurse.phone);
      } catch (e) {
        console.warn('Twilio error', e.message || e);
      }
    } else {
      console.log('SMS not configured or nurse phone missing. Would send:', text);
    }
    if (sendgridKey && emailFrom) {
      try {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          host: 'smtp.sendgrid.net',
          port: 587,
          auth: { user: 'apikey', pass: sendgridKey }
        });
        await transporter.sendMail({
          from: emailFrom,
          to: nurse.email || '',
          subject: 'New visit request',
          text
        });
        console.log('Email sent to nurse');
      } catch (e) {
        console.warn('Email error', e.message || e);
      }
    } else {
      console.log('Email not configured. Would send:', text);
    }
  }
};
