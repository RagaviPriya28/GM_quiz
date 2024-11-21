// const Session = require('../models/session');
// const Answer = require('../models/answer');
// const User = require('../models/User');

// // Start a new session for a quiz
// exports.startSession = async (req, res) => {
//   const { quizId } = req.params;
//   const hostId = req.user._id;

//   try {
//     const session = new Session({
//       quiz: quizId,
//       host: hostId,
//       status: 'in_progress',
//       startTime: Date.now(),
//     });

//     const savedSession = await session.save();

//     // Notify the lobby (socket emit) that the session has started
//     req.app.get('socketio').to(savedSession._id.toString()).emit('session_started', {
//       sessionId: savedSession._id,
//     });

//     res.status(201).json(savedSession);
//   } catch (error) {
//     res.status(500).json({ message: 'Error starting the session', error });
//   }
// };


// // End a session and calculate final scores
// exports.endSession = async (req, res) => {
//   const { sessionId } = req.params;

//   try {
//     const session = await Session.findById(sessionId);
//     if (session) {
//       session.status = 'completed';
//       session.endTime = Date.now();
//       await session.save();

//       // Notify users in the session room that the session has ended
//       req.app.get('socketio').to(sessionId).emit('session_ended', { sessionId });

//       res.status(200).json(session);
//     } else {
//       res.status(404).json({ message: 'Session not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error ending the session', error });
//   }
// };

// // Get session details, including real-time updates
// exports.getSessionDetails = async (req, res) => {
//   const { sessionId } = req.params;

//   try {
//     const session = await Session.findById(sessionId)
//       .populate('quiz host players currentQuestion')
//       .exec();

//     if (!session) {
//       return res.status(404).json({ message: 'Session not found' });
//     }

//     res.status(200).json(session);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching session details', error });
//   }
// };

// // Get leaderboard information for a session
// exports.getLeaderboard = async (req, res) => {
//   const { sessionId } = req.params;

//   try {
//     const session = await Session.findById(sessionId).populate('players').exec();

//     if (!session) {
//       return res.status(404).json({ message: 'Session not found' });
//     }

//     // Calculate leaderboard scores
//     const leaderboard = await calculateScores(sessionId);
//     res.status(200).json(leaderboard);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching leaderboard', error });
//   }
// };

// // Helper function to calculate final scores for leaderboard
// const calculateScores = async (sessionId) => {
//   const answers = await Answer.find({ session: sessionId }).populate('user question');
  
//   const scores = {};
  
//   answers.forEach(answer => {
//     if (!scores[answer.user._id]) {
//       scores[answer.user._id] = 0;
//     }
//     if (answer.isCorrect) {
//       scores[answer.user._id] += 10; // Adjust score increment as needed
//     }
//   });

//   // Create leaderboard in descending order of scores
//   const leaderboard = await Promise.all(
//     Object.keys(scores).map(async (userId) => {
//       const user = await User.findById(userId);
//       return { user: user.name, score: scores[userId] };
//     })
//   );

//   leaderboard.sort((a, b) => b.score - a.score); // Sort leaderboard by score descending
//   return leaderboard;
// };


// // User joins a quiz session
// // User joins a quiz session
// exports.joinSession = async (req, res) => {
//     const { sessionId } = req.params;
//     const userId = req.user._id;
  
//     try {
//       // Find the session by ID
//       const session = await Session.findById(sessionId);
//       if (!session) {
//         return res.status(404).json({ message: 'Session not found' });
//       }
  
//       // Check if the session is active and allows new participants
//       if (session.status !== 'in_progress') {
//         return res.status(400).json({ message: 'Session is not currently active' });
//       }
  
//       // Check if the user is already part of the session
//       if (session.players.includes(userId)) {
//         return res.status(400).json({ message: 'User is already part of the session' });
//       }
  
//       // Add user to the session's players array
//       session.players.push(userId);
//       await session.save();
  
//       // Calculate the number of players in the session
//       const playerCount = session.players.length;
  
//       // Notify the session room that a new user has joined (optional)
//       req.app.get('socketio').to(sessionId).emit('user_joined', {
//         sessionId: session._id,
//         userId,
//         playerCount,
//       });
  
//       res.status(200).json({
//         message: 'User successfully joined the session',
//         session,
//         playerCount,
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Error joining the session', error });
//     }
//   };
  
  

const Session = require('../models/session');
const Quiz = require('../models/quiz');
const Question = require('../models/question');
const QRCode = require('qrcode');
const crypto = require('crypto');

exports.createSession = async (req, res) => {
  const { quizId } = req.params;
  const hostId = req.user._id;

  try {
    const joinCode = crypto.randomInt(100000, 999999).toString();
    const qrData = `${req.protocol}://${req.get('host')}/join/${joinCode}`;

    // Generate QR code as base64
    const qrCodeImageUrl = await QRCode.toDataURL(qrData);

    const session = new Session({
      quiz: quizId,
      host: hostId,
      joinCode,
      qrData,
      status: 'waiting',
    });

    const savedSession = await session.save();

    res.status(201).json({
      _id: savedSession._id,
      quiz: savedSession.quiz,
      host: savedSession.host,
      joinCode: savedSession.joinCode,
      qrData: savedSession.qrData,
      qrCodeImageUrl,
      status: savedSession.status,
      players: savedSession.players,
      createdAt: savedSession.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating the session', error });
  }
};



exports.joinSession = async (req, res) => {
  const { joinCode } = req.params;
  const userId = req.user._id;

  try {
    const session = await Session.findOne({ joinCode });
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.status !== 'waiting') {
      return res.status(400).json({ message: 'Session is not open for joining' });
    }

    if (session.players.includes(userId)) {
      return res.status(400).json({ message: 'User has already joined the session' });
    }

    session.players.push(userId);
    await session.save();

    res.status(200).json({
      message: 'User successfully joined the session',
      session,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error joining the session', error });
  }
};


exports.startSession = async (req, res) => {
  const { joinCode } = req.params;

  try {
    const session = await Session.findOne({ joinCode }).populate('quiz');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.status !== 'waiting') {
      return res.status(400).json({ message: 'Session cannot be started' });
    }

    const questions = await Question.find({ quiz: session.quiz });

    session.status = 'in_progress';
    session.questions = questions.map((q) => q._id);
    session.startTime = Date.now();
    await session.save();

    res.status(200).json({
      message: 'Session started successfully',
      session,
      questions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error starting the session', error });
  }
};


exports.getSessionQuestions = async (req, res) => {
  const { joinCode } = req.params;

  try {
    const session = await Session.findOne({ joinCode }).populate('questions');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.status !== 'in_progress') {
      return res.status(400).json({ message: 'Session is not in progress' });
    }

    res.status(200).json({ questions: session.questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};


exports.endSession = async (req, res) => {
  const { joinCode } = req.params;

  try {
    const session = await Session.findOne({ joinCode });
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.status = 'completed';
    session.endTime = Date.now();
    await session.save();

    res.status(200).json({ message: 'Session ended successfully', session });
  } catch (error) {
    res.status(500).json({ message: 'Error ending the session', error });
  }
};

exports.getSessionPlayers = async (req, res) => {
  const { joinCode } = req.params;

  try {
    const session = await Session.findOne({ joinCode }).populate('players', 'username email'); // Populate player details
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({
      players: session.players,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching session players', error });
  }
};
