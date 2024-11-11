const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const {
  startSession,
  endSession,
  getSessionDetails,
  getLeaderboard,
} = require('../controllers/sessionController');

// Start a new session for a quiz (Admin only)
router.post('/api/sessions/:quizId/start', protect, admin, startSession);

// End a session and calculate final scores (Admin only)
router.post('/api/sessions/:sessionId/end', protect, admin, endSession);

// Get session details, including real-time updates
router.get('/api/sessions/:sessionId', protect, getSessionDetails);

// Get leaderboard information for a session
router.get('/api/sessions/:sessionId/leaderboard', protect, getLeaderboard);

module.exports = router;
