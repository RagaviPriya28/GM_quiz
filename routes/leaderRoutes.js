const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardControllers');

// Route to get leaderboard for a specific session
router.get('/api/leaderboards/:sessionId', leaderboardController.getLeaderboardBySession);

// Route to get specific user's score and rank in a session
router.get('/api/leaderboards/:sessionId/:userId', leaderboardController.getUserScoreAndRank);

module.exports = router;
