const express = require('express');
const { register, login, getProfile, logout } = require('../controllers/authController'); // Include logout
const { auth, isSuperAdmin } = require('../middlewares/auth')
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getProfile);
router.post('/logout', logout); 

module.exports = router;
