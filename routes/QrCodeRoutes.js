// routes/QrCodeRoutes.js
const express = require('express');
const router = express.Router();
const QrCodeController = require('../controllers/QrCodeController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Generate a QR code
router.get('/generate', protect, admin, QrCodeController.generateQrCode);

// Register user via QR code (changed to accept qrCodeData in URL)
router.post('/register/:qrCodeData', QrCodeController.registerUser);

// List users registered via a specific QR code
router.get('/registered-users', QrCodeController.getRegisteredUsers);

// Route for starting the survey, qrCodeData is passed in the URL
router.post('/start-survey/:qrCodeData', protect, admin, QrCodeController.startSurvey);

// Route for ending the survey, qrCodeData is passed in the URL
router.post('/end-survey/:qrCodeData', protect, admin, QrCodeController.endSurvey);

module.exports = router;
