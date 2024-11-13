// // controllers/QrCodeController.js
// const QRCode = require('qrcode');
// const NewUser = require('../models/newUser');

// let currentQrCodeData = null; // To keep track of the current active QR code

// const QrCodeController = {
//   // Generate QR Code (same as before)
//   async generateQrCode(req, res) {
//     try {
//       const qrCodeData = `qr_${Date.now()}`; // Unique identifier for each QR code
//       currentQrCodeData = qrCodeData;

//       // Generate a QR code image URL (optional)
//       const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

//       res.status(200).json({
//         message: 'QR code generated successfully',
//         qrCodeData,
//         qrCodeUrl
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Error generating QR code', error });
//     }
//   },

//   // Register User via QR Code (changed to use URL parameter for qrCodeData)
//   async registerUser(req, res) {
//     try {
//       const { qrCodeData } = req.params; // Get qrCodeData from the URL
//       const { email, phoneNumber, userName } = req.body;

//       // Validate the QR code data
//       if (!qrCodeData) {
//         return res.status(400).json({ message: 'QR code data is required' });
//       }

//       // Validate user data
//       if (!email || !phoneNumber || !userName) {
//         return res.status(400).json({ message: 'All fields are required' });
//       }

//       const newUser = new NewUser({
//         email,
//         phoneNumber,
//         userName,
//         registeredViaQRCode: true,
//         qrCodeData // Associate the user with the QR code data from the URL
//       });

//       await newUser.save();

//       res.status(201).json({
//         message: 'User registered successfully via QR code',
//         user: newUser
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error', error });
//     }
//   },

//   // List Registered Users (same as before)
//   async getRegisteredUsers(req, res) {
//     try {
//       const { qrCodeData } = req.query; // Get the qrCodeData from the query parameters
//       if (!qrCodeData) {
//         return res.status(400).json({ message: 'QR code data is required' });
//       }

//       const users = await NewUser.find({ registeredViaQRCode: true, qrCodeData });
//       const count = users.length;

//       res.status(200).json({ count, users });
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error', error });
//     }
//   }
// };

// module.exports = QrCodeController;



const QRCode = require('qrcode');
const NewUser = require('../models/newUser');

let currentQrCodeData = null; // To keep track of the current active QR code

const QrCodeController = {
  // Generate QR Code
  async generateQrCode(req, res) {
    try {
      const qrCodeData = `qr_${Date.now()}`; // Unique identifier for each QR code
      currentQrCodeData = qrCodeData;

      // Generate a QR code image URL
      const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

      // Emit event via socket (assuming the socket instance is passed in req.app)
      const io = req.app.get('socketio');
      io.emit('qrCodeGenerated', { qrCodeData, qrCodeUrl });

      res.status(200).json({
        message: 'QR code generated successfully',
        qrCodeData,
        qrCodeUrl
      });
    } catch (error) {
      res.status(500).json({ message: 'Error generating QR code', error });
    }
  },

  // Register User via QR Code
  async registerUser(req, res) {
    try {
      const { qrCodeData } = req.params; // Get qrCodeData from the URL
      const { email, phoneNumber, userName } = req.body;

      // Validate the QR code data
      if (!qrCodeData) {
        return res.status(400).json({ message: 'QR code data is required' });
      }

      // Validate user data
      if (!email || !phoneNumber || !userName) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newUser = new NewUser({
        email,
        phoneNumber,
        userName,
        registeredViaQRCode: true,
        qrCodeData // Associate the user with the QR code data
      });

      await newUser.save();

      // Emit event via socket when a user registers via QR code
      const io = req.app.get('socketio');
      io.emit('userRegisteredViaQrCode', { user: newUser });

      res.status(201).json({
        message: 'User registered successfully via QR code',
        user: newUser
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  // List Registered Users (same as before)
  async getRegisteredUsers(req, res) {
    try {
      const { qrCodeData } = req.query; // Get the qrCodeData from the query parameters
      if (!qrCodeData) {
        return res.status(400).json({ message: 'QR code data is required' });
      }

      const users = await NewUser.find({ registeredViaQRCode: true, qrCodeData });
      const count = users.length;

      res.status(200).json({ count, users });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
};

module.exports = QrCodeController;
