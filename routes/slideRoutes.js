const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const slideController = require('../controllers/slideController');

// Route to add a new slide (admin only)
router.post('/api/quizzes/:quizId/slides', protect, admin, slideController.addSlide);

// Route to get all slides for a quiz (no admin check, just protection)
router.get('/api/quizzes/:quizId/slides', protect, slideController.getSlides);

// Route to get a specific slide's details
router.get('/api/slides/:id', protect, slideController.getSlide);

// Route to update a slide (admin only)
router.put('/api/slides/:id', protect, admin, slideController.updateSlide);

// Route to delete a slide (admin only)
router.delete('/api/slides/:id', protect, admin, slideController.deleteSlide);

module.exports = router;
