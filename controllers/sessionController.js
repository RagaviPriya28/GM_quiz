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
      status: 'waiting',
      startTime: Date.now(),
    });

    const savedSession = await session.save();

    // Notify the lobby (socket emit) that the session has started
    req.app.get('socketio').to(savedSession._id.toString()).emit('session_started', {
      sessionId: savedSession._id,
    });

    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({ message: 'Error starting the session', error });
  }
};


// End a session and calculate final scores
exports.endSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findById(sessionId);
    if (session) {
      session.status = 'completed';
      session.endTime = Date.now();
      await session.save();

      // Notify users in the session room that the session has ended
      req.app.get('socketio').to(sessionId).emit('session_ended', { sessionId });

      res.status(200).json(session);
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
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
