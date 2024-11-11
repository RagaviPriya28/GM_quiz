const Session = require('../models/session');
const Answer = require('../models/answer');
const User = require('../models/User');

// Start a new session for a quiz
exports.startSession = async (req, res) => {
  const { quizId } = req.params;
  const hostId = req.user._id;

  try {
    const session = new Session({
      quiz: quizId,
      host: hostId,
      status: 'in_progress',
      startTime: Date.now(),
    });

    // Save session and update the host and players
    const savedSession = await session.save();

    // Add the host to the players array
    savedSession.players.push(hostId);
    await savedSession.save();

    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({ message: 'Error starting the session', error });
  }
};

// End a session and calculate final scores
exports.endSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findById(sessionId).populate('players');

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.status === 'completed') {
      return res.status(400).json({ message: 'Session already ended' });
    }

    // Mark session as completed and record end time
    session.status = 'completed';
    session.endTime = Date.now();

    // Calculate final scores
    const leaderboard = await calculateScores(sessionId);
    session.leaderboard = leaderboard;

    const updatedSession = await session.save();

    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: 'Error ending the session', error });
  }
};

// Get session details, including real-time updates
exports.getSessionDetails = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findById(sessionId)
      .populate('quiz host players currentQuestion')
      .exec();

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching session details', error });
  }
};

// Get leaderboard information for a session
exports.getLeaderboard = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findById(sessionId).populate('players').exec();

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Calculate leaderboard scores
    const leaderboard = await calculateScores(sessionId);
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
};

// Helper function to calculate final scores for leaderboard
const calculateScores = async (sessionId) => {
  const answers = await Answer.find({ session: sessionId }).populate('user question');
  
  const scores = {};
  
  answers.forEach(answer => {
    if (!scores[answer.user._id]) {
      scores[answer.user._id] = 0;
    }
    if (answer.isCorrect) {
      scores[answer.user._id] += 10; // Adjust score increment as needed
    }
  });

  // Create leaderboard in descending order of scores
  const leaderboard = await Promise.all(
    Object.keys(scores).map(async (userId) => {
      const user = await User.findById(userId);
      return { user: user.name, score: scores[userId] };
    })
  );

  leaderboard.sort((a, b) => b.score - a.score); // Sort leaderboard by score descending
  return leaderboard;
};
