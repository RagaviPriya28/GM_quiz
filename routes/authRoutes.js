const express = require('express');
const { register, login, getProfile, logout } = require('../controllers/authController'); // Include logout
const { auth, isSuperAdmin } = require('../middlewares/auth')
const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', auth, getProfile);
router.post('/auth/logout', logout); 

module.exports = router;
