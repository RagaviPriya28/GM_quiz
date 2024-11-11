const Quiz = require('../models/quiz');
const Category = require('../models/category');
const Slide = require('../models/slide');
const Question = require('../models/question');
const User = require('../models/User');

// Create a new quiz (admin only)
exports.createQuiz = async (req, res) => {
  try {
    const { title, description, categories, slides, questions, tenantId, duration } = req.body;

    // Validate categories, slides, and questions are valid ObjectIds
    const categoryIds = await Category.find({ '_id': { $in: categories } });
    const slideIds = await Slide.find({ '_id': { $in: slides } });
    const questionIds = await Question.find({ '_id': { $in: questions } });

    const quiz = new Quiz({
      title,
      description,
      categories,
      slides,
      questions,
      tenantId,
      createdBy: req.user._id,
      status: 'draft', // Default status as draft
      duration,
    });

    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('categories').populate('slides').populate('questions');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get details of a specific quiz
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('categories')
      .populate('slides')
      .populate('questions');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a quiz (admin only)
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz updated successfully', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a quiz (admin only)
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Publish a quiz (admin only)
exports.publishQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz published successfully', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Close a quiz (admin only)
exports.closeQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { status: 'closed' },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz closed successfully', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
