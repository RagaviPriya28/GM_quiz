const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const {
  addQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion
} = require('../controllers/questionController');

// Add a new question to a quiz
router.post('/api/quizzes/:quizId/questions', protect, admin, addQuestion);

// Get all questions for a specific quiz
router.get('/api/quizzes/:quizId/questions', protect, getQuestions);

// Get details of a specific question
router.get('/api/questions/:id', protect, getQuestionById);

// Update a question (admin only)
router.put('/api/questions/:id', protect, admin, updateQuestion);

// Delete a question (admin only)
router.delete('/api/questions/:id', protect, admin, deleteQuestion);

module.exports = router;
