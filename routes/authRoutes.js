const express = require('express');
const { register, login, getProfile, logout } = require('../controllers/authController'); // Include logout
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getProfile);
router.post('/logout', logout); // Add the logout route

module.exports = router;
