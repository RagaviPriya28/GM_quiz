const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Get all users (admin only)
router.get('/users', protect, admin, userController.getAllUsers);

// Get a specific user's details (admin only)
router.get('/users/:id', protect, admin, userController.getUserById);

// Update a user's profile (admin or user themselves)
router.put('/users/:id', protect, userController.updateUser);

// Delete a user account (admin only)
router.delete('/users/:id', protect, admin, userController.deleteUser);

module.exports = router;
