const Question = require('../models/question');
const Quiz = require('../models/quiz');

// Add a new question to a quiz
exports.addQuestion = async (req, res) => {
  const { quizId } = req.params;
  const { title, type, options, correctAnswer, points } = req.body;

  try {
    // Validate if the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Create a new question
    const newQuestion = new Question({
      quiz: quizId,
      title,
      type,
      options,
      correctAnswer,
      points
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all questions for a specific quiz
exports.getQuestions = async (req, res) => {
  const { quizId } = req.params;

  try {
    // Find questions related to the quiz
    const questions = await Question.find({ quiz: quizId });
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this quiz' });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get details of a specific question
exports.getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a question (admin only)
exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { title, type, options, correctAnswer, points } = req.body;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Update the question with new values
    question.title = title || question.title;
    question.type = type || question.type;
    question.options = options || question.options;
    question.correctAnswer = correctAnswer || question.correctAnswer;
    question.points = points || question.points;

    await question.save();
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a question (admin only)
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Delete the question
    await question.remove();
    res.status(200).json({ message: 'Question deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
