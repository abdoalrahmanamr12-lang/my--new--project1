const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, unique: true, required: true },
  passwordHash: { type: String, required: true },
  name: String,
  phone: String,
  role: { type: String, enum: ['patient', 'nurse', 'admin'], default: 'patient' },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

UserSchema.methods.setPassword = async function(password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};
UserSchema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);
