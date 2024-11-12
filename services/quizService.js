const Quiz = require('../models/quiz');

exports.createQuiz = async (quizData, userId) => {
  const quiz = new Quiz({ ...quizData, createdBy: userId });
  return await quiz.save();
};

exports.getAllQuizzes = async () => {
  return await Quiz.find().populate('categories').populate('slides').populate('questions');
};

exports.getQuizById = async (quizId) => {
  return await Quiz.findById(quizId).populate('categories').populate('slides').populate('questions');
};

exports.updateQuiz = async (quizId, updateData) => {
  return await Quiz.findByIdAndUpdate(quizId, updateData, { new: true });
};

exports.deleteQuiz = async (quizId) => {
  await Quiz.findByIdAndDelete(quizId);
};

exports.publishQuiz = async (quizId) => {
  return await Quiz.findByIdAndUpdate(quizId, { status: 'active' }, { new: true });
};

exports.closeQuiz = async (quizId) => {
  return await Quiz.findByIdAndUpdate(quizId, { status: 'closed' }, { new: true });
};
