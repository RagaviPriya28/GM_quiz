// models/newUser.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userName: { type: String, required: true },
  registeredViaQRCode: { type: Boolean, default: false },
  qrCodeData: { type: String, required: true }, 
  status: { type: String, default: 'waiting in lobby' } 
}, { timestamps: true });

module.exports = mongoose.model('newUser', userSchema);
