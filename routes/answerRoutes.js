const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const {
  submitAnswer,
  getAnswersForSession,
  getAnswersForQuestionInSession,
} = require('../controllers/answerController');

// Submit an answer to a question in a session (User)
router.post(
  '/api/sessions/:sessionId/questions/:questionId/answer',
  protect,
  submitAnswer
);

// Get all answers for a session (Admin only)
router.get(
  '/api/sessions/:sessionId/answers',
  protect,
  admin,
  getAnswersForSession
);

// Get all answers for a specific question in a session (Admin only)
router.get(
  '/api/sessions/:sessionId/questions/:questionId/answers',
  protect,
  admin,
  getAnswersForQuestionInSession
);

module.exports = router;
