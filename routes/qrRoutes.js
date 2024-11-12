const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

// Route to generate QR Code
router.get('/generate', qrController.generateQRCode);

module.exports = router;
