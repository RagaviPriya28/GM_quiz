const Question = require('../models/question');
const Quiz = require('../models/quiz');

// Add a new question to a quiz
exports.addQuestion = async (req, res) => {
  const { quizId } = req.params;
  const { title, type, imageUrl, options, correctAnswer, points, timer } = req.body;

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
      imageUrl,
      options,
      correctAnswer,
      points,
      timer
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
    // Base URL for constructing the full image path
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    // Find questions related to the quiz and populate the imageUrl field
    const questions = await Question.find({ quiz: quizId })
      .populate('imageUrl', 'path'); // Populating imageUrl to fetch the path field

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this quiz' });
    }

    // Map through questions and append the full image URL
    const questionsWithFullImageUrl = questions.map(question => {
      const questionObj = question.toObject();
      if (questionObj.imageUrl && questionObj.imageUrl.path) {
        questionObj.imageUrl = `${baseUrl}${questionObj.imageUrl.path.split('\\').pop()}`;
      }
      return questionObj;
    });

    res.status(200).json(questionsWithFullImageUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get details of a specific question
exports.getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    // Base URL for constructing the full image path
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    // Find the question by ID and populate the imageUrl field
    const question = await Question.findById(id).populate('imageUrl', 'path'); // Populate imageUrl with the path field

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Convert the question object to plain JSON and append the full image URL
    const questionObj = question.toObject();
    if (questionObj.imageUrl && questionObj.imageUrl.path) {
      questionObj.imageUrl = `${baseUrl}${questionObj.imageUrl.path.split('\\').pop()}`;
    }

    res.status(200).json(questionObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a question (admin only)
exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { title, type, imageUrl, options, correctAnswer, points } = req.body;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Update the question with new values
    question.title = title || question.title;
    question.type = type || question.type;
    question.imageUrl = imageUrl || question.imageUrl;
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
