const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createSession,
  joinSession,
  startSession,
  getSessionQuestions,
  getSessionPlayers,
  endSession,
} = require('../controllers/sessionController');

// Create a new session
router.post('/api/sessions/:quizId/create', protect, createSession);

// Join a session
router.post('/api/sessions/:joinCode/join', protect, joinSession);

// Start the session
router.post('/api/sessions/:joinCode/start', protect, startSession);

// Fetch questions for a session
router.get('/api/sessions/:joinCode/questions', protect, getSessionQuestions);

// End the session
router.post('/api/sessions/:joinCode/end', protect, endSession);

// Get players who joined a session
router.get('/api/sessions/:joinCode/players', protect, getSessionPlayers);


module.exports = router;
