// Load environment variables from the .env file
require('dotenv').config();

const QRCode = require('qrcode');

exports.generateQRCode = async (req, res) => {
  try {
    // Get the URL for the registration page from the .env file
    const registerUrl = process.env.redirectingUrl;

    // Check if the URL is defined in the .env file
    if (!registerUrl) {
      return res.status(500).json({
        success: false,
        message: 'Registration URL is not defined in the .env file.'
      });
    }

    // Generate the QR code data URL
    const qrCodeData = await QRCode.toDataURL(registerUrl);

    // Send the QR code as a response
    res.status(200).json({
      success: true,
      message: 'QR Code generated successfully',
      qrCodeData: qrCodeData, // Data URL for image rendering
      redirectUrl: registerUrl // For frontend reference
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating QR Code',
      error: error.message
    });
  }
};
