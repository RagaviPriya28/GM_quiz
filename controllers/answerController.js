const Answer = require('../models/answer');
const Question = require('../models/question');

// Submit an answer to a question in a session
exports.submitAnswer = async (req, res) => {
  const { sessionId, questionId } = req.params;
  const { answerType, answer, isCorrect, timeTaken } = req.body;

  try {
    const newAnswer = new Answer({
      question: questionId,
      user: req.user._id,
      session: sessionId,
      answerType,
      answer,
      isCorrect,
      timeTaken,
    });

    const savedAnswer = await newAnswer.save();
    res.status(201).json(savedAnswer);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting answer', error });
  }
};

// Get all answers for a session (admin only)
exports.getAnswersForSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const answers = await Answer.find({ session: sessionId }).populate('question user');
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching answers', error });
  }
};

// Get all answers for a specific question in a session (admin only)
exports.getAnswersForQuestionInSession = async (req, res) => {
  const { sessionId, questionId } = req.params;

  try {
    const answers = await Answer.find({ session: sessionId, question: questionId }).populate('user');
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching answers for the question', error });
  }
};
