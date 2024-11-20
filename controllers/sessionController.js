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
