const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  publishQuiz,
  closeQuiz
} = require('../controllers/quizController');

// Create a new quiz (admin only)
router.post('/api/quizzes', protect, admin, createQuiz);

// Get all quizzes
router.get('/api/quizzes', getQuizzes);

// Get details of a specific quiz
router.get('/api/quizzes/:id', getQuizById);

// Update a quiz (admin only)
router.put('/api/quizzes/:id', protect, admin, updateQuiz);

// Delete a quiz (admin only)
router.delete('/api/quizzes/:id', protect, admin, deleteQuiz);

// Publish a quiz (admin only)
router.post('/api/quizzes/:id/publish', protect, admin, publishQuiz);

// Close a quiz (admin only)
router.post('/api/quizzes/:id/close', protect, admin, closeQuiz);

module.exports = router;
