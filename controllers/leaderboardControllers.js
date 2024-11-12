const Leaderboard = require('../models/leaderboard');
const User = require('../models/User');

// Get leaderboard for a specific session
exports.getLeaderboardBySession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const leaderboard = await Leaderboard.find({ session: sessionId })
      .populate('player', 'username') // Populate player details (e.g., username)
      .sort({ score: -1 }) // Sort by score in descending order
      .select('player score rank'); // Select only necessary fields

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get specific user's score and rank in a session
exports.getUserScoreAndRank = async (req, res) => {
  const { sessionId, userId } = req.params;

  try {
    // Find the leaderboard entry for the specific user in the session
    const userScore = await Leaderboard.findOne({ session: sessionId, player: userId })
      .populate('player', 'username') // Populate player details (e.g., username)
      .select('player score rank'); // Select only necessary fields

    if (!userScore) {
      return res.status(404).json({ message: 'User not found in this session' });
    }

    res.status(200).json(userScore);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
