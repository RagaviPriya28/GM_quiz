const QRCode = require('qrcode');

exports.generateQRCode = async (req, res) => {
  try {
    // URL for registration page (modify as per your app)
    const registerUrl = 'http://localhost:3000/register';

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
