// const express = require('express');
// const router = express.Router();
// const { protect, admin } = require('../middlewares/authMiddleware');
// const {
//   startSession,
//   endSession,
//   getSessionDetails,
//   getLeaderboard,
//   joinSession
// } = require('../controllers/sessionController');

// // Start a new session for a quiz (Admin only)
// router.post('/api/sessions/:quizId/start', protect, admin, startSession);

// // End a session and calculate final scores (Admin only)
// router.post('/api/sessions/:sessionId/end', protect, admin, endSession);

// // Get session details, including real-time updates
// router.get('/api/sessions/:sessionId', protect, getSessionDetails);

// // Get leaderboard information for a session
// router.get('/api/sessions/:sessionId/leaderboard', protect, getLeaderboard);

// // User joins an active quiz session
// router.post('/api/sessions/:sessionId/join', protect, joinSession);


// module.exports = router;

const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createSession,
  joinSession,
  getSessionPlayers,
  startSession,
  getSessionQuestions,
  changeQuestionByCodeAndSession,
  getCurrentQuestionInSession,
  endSession,
} = require('../controllers/sessionController');

// Create a new session
router.post('/api/sessions/:quizId/create', protect, createSession);

// Join a session
router.post('/api/sessions/:joinCode/:sessionId/join', protect, joinSession);

// Get players who joined a session
router.get('/api/sessions/:joinCode/:sessionId/players', protect, getSessionPlayers);

// Start the session
router.post('/api/sessions/:joinCode/:sessionId/start', protect, startSession);

// Fetch questions for a session
router.get('/api/sessions/:joinCode/:sessionId/questions', protect, getSessionQuestions);

// Route: Change a question in the session by joinCode, sessionId, and questionId
router.post('/api/sessions/:joinCode/:sessionId/:questionId/change', protect, changeQuestionByCodeAndSession);

// Route: Get the current question in the session by joinCode and sessionId
router.get('/api/sessions/:joinCode/:sessionId/current-question', protect, getCurrentQuestionInSession);


// End the session 
router.post('/api/sessions/:joinCode/:sessionId/end', protect, endSession);




module.exports = router;

