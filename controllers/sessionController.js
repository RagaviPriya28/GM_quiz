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
const Media = require('../models/Media');

exports.createSession = async (req, res) => {
  const { quizId } = req.params;
  const hostId = req.user._id;

  try {
    // Generate a random join code
    const joinCode = crypto.randomInt(100000, 999999).toString();

    // Create a session document without `qrData` for now
    const session = new Session({
      quiz: quizId,
      host: hostId,
      joinCode,
      status: 'waiting',
    });

    const savedSession = await session.save();

    // Now construct qrData using the session ID
    const qrData = `${req.protocol}://${req.get('host')}/api/sessions/${joinCode}/${savedSession._id}/join`;

    // Generate QR code as base64
    const qrCodeImageUrl = await QRCode.toDataURL(qrData);

    // Update the session with qrData
    savedSession.qrData = qrData;
    await savedSession.save();

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
  const { joinCode, sessionId } = req.params; // Extract joinCode and sessionId
  const userId = req.user._id;

  try {
    // Find the session using both joinCode and sessionId
    const session = await Session.findOne({ joinCode, _id: sessionId });
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if the session is open for joining
    if (session.status !== 'waiting') {
      return res.status(400).json({ message: 'Session is not open for joining' });
    }

    // Check if the user has already joined the session
    if (session.players.includes(userId)) {
      return res.status(400).json({ message: 'User has already joined the session' });
    }

    // Add the user to the session's players
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

exports.getSessionPlayers = async (req, res) => {
  const { joinCode, sessionId } = req.params; // Extract joinCode and sessionId

  try {
    // Find the session using both joinCode and sessionId
    const session = await Session.findOne({ joinCode, _id: sessionId }).populate('players', 'username email'); // Populate player details

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Determine the status for each player based on the session's status
    const status = session.status === 'waiting' ? 'waiting' : 'in_progress';

    // Attach the status to each player in the response
    const players = session.players.map(player => ({
      username: player.username,
      email: player.email,
      status,
    }));

    // Get the player count
    const playerCount = players.length;

    res.status(200).json({
      players,
      playerCount, // Include the player count
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching session players', error });
  }
};

exports.startSession = async (req, res) => {
  const { joinCode, sessionId } = req.params; // Extract joinCode and sessionId from the URL

  try {
    // Find the session using both joinCode and sessionId
    const session = await Session.findOne({ joinCode, _id: sessionId }).populate('quiz');
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

    // Construct Base URL
    const baseUrl = `${req.protocol}://${req.get('host')}/`;

    // Process questions to include full image URLs with encoding
    const questionsWithImageUrls = await Promise.all(
      questions.map(async (question) => {
        let fullImageUrl = null;

        if (question.imageUrl) {
          const media = await Media.findById(question.imageUrl);
          if (media && media.path) {
            // Encode spaces and normalize slashes in the media path
            const encodedPath = media.path.replace(/ /g, '%20').replace(/\\/g, '/');
            fullImageUrl = `${baseUrl}${encodedPath}`;
          }
        }

        return {
          ...question.toObject(), // Convert the Mongoose document to a plain object
          imageUrl: fullImageUrl, // Replace ObjectId with the encoded full image URL
        };
      })
    );

    res.status(200).json({
      message: 'Session started successfully',
      session,
      questions: questionsWithImageUrls, // Return the questions with full encoded image URLs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error starting the session', error });
  }
};




exports.getSessionQuestions = async (req, res) => {
  const { joinCode, sessionId } = req.params; // Extract joinCode and sessionId from the URL

  try {
    // Find the session using both joinCode and sessionId
    const session = await Session.findOne({ joinCode, _id: sessionId }).populate('questions');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.status !== 'in_progress') {
      return res.status(400).json({ message: 'Session is not in progress' });
    }

    // Process the questions to add full, encoded image URLs
    const baseUrl = `${req.protocol}://${req.get('host')}/`;
    const questionsWithImageUrls = await Promise.all(
      session.questions.map(async (question) => {
        let fullImageUrl = null;

        if (question.imageUrl) {
          const media = await Media.findById(question.imageUrl);
          if (media && media.path) {
            // Encode spaces and normalize slashes in the media path
            const encodedPath = media.path.replace(/ /g, '%20').replace(/\\/g, '/');
            fullImageUrl = `${baseUrl}${encodedPath}`;
          }
        }

        return {
          ...question.toObject(), // Convert the Mongoose document to a plain object
          imageUrl: fullImageUrl, // Replace ObjectId with the encoded full image URL
        };
      })
    );

    res.status(200).json({ questions: questionsWithImageUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};



// Change question by code and session controller
exports.changeQuestionByCodeAndSession = async (req, res) => {
  const { joinCode, sessionId, questionId } = req.params;
  const { title, type, imageUrl } = req.body;

  try {
    // Find the session by joinCode and sessionId
    const session = await Session.findOne({ joinCode, _id: sessionId }).populate('questions');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Find the question by its ID
    const question = session.questions.find(q => q._id.toString() === questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // If an image URL is provided, convert it to the media ObjectId
    if (imageUrl) {
      const media = await Media.findOne({ path: imageUrl }); // Find the Media document by its path
      if (media) {
        question.imageUrl = media._id; // Store the ObjectId of the media in the question's imageUrl field
      } else {
        return res.status(404).json({ message: 'Media not found' });
      }
    }

    // Update any other fields of the question here (e.g., title, type, etc.)
    question.title = title || question.title;
    question.type = type || question.type;

    // Save the updated question
    await question.save();

    // Construct the full image URL for the updated question if the image exists
    let fullImageUrl = null;
    if (question.imageUrl) {
      const media = await Media.findById(question.imageUrl); // Find the media by its ObjectId
      if (media && media.path) {
        // Encode spaces and normalize slashes
        const baseUrl = `${req.protocol}://${req.get('host')}/`;
        const encodedPath = media.path.replace(/ /g, '%20').replace(/\\/g, '/');
        fullImageUrl = `${baseUrl}${encodedPath.split('/').pop()}`;
      }
    }

    // Return the updated question with the full image URL
    res.status(200).json({
      message: 'Question changed successfully',
      question: {
        ...question.toObject(),
        imageUrl: fullImageUrl, // Return the full URL instead of the ObjectId
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error changing the question', error });
  }
};





exports.getCurrentQuestionInSession = async (req, res) => {
  const { joinCode, sessionId } = req.params;

  try {
    // Find the session by joinCode and sessionId
    const session = await Session.findOne({ joinCode, _id: sessionId }).populate('questions');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Ensure the session is in progress and has questions
    if (session.status !== 'in_progress') {
      return res.status(400).json({ message: 'Session is not in progress' });
    }

    // Find the current question in the session (assumed to be the first question in the array for this example)
    const currentQuestion = session.questions[0]; // Adjust this logic based on your session flow (e.g., based on time or a current question flag)

    if (!currentQuestion) {
      return res.status(404).json({ message: 'No questions found in session' });
    }

    // Construct the full image URL if the current question has an imageUrl
    let fullImageUrl = null;
    if (currentQuestion.imageUrl) {
      const media = await Media.findById(currentQuestion.imageUrl); // Find the media by its ObjectId
      if (media && media.path) {
        // Construct the full URL, encoding spaces and normalizing slashes
        const baseUrl = `${req.protocol}://${req.get('host')}/`;
        const encodedPath = media.path.replace(/ /g, '%20').replace(/\\/g, '/');
        fullImageUrl = `${baseUrl}${encodedPath.split('/').pop()}`;
      }
    }

    // Return the current question with the full image URL
    res.status(200).json({
      currentQuestion: {
        ...currentQuestion.toObject(),
        imageUrl: fullImageUrl, // Return the full URL instead of the ObjectId
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching current question', error });
  }
};




exports.endSession = async (req, res) => {
  const { joinCode, sessionId } = req.params; // Extract joinCode and sessionId from the URL

  try {
    // Find the session using both joinCode and sessionId
    const session = await Session.findOne({ joinCode, _id: sessionId });
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






