const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['multiple_choice', 'multiple_select', 'true_false', 'open_ended', 'poll'], required: true },
  imageUrl: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Media',
    required: false },
  options: [{ text: String, isCorrect: Boolean }],
  correctAnswer: [{ type: String }],
  points: { type: Number, default: 100 },
});

module.exports = mongoose.model('Question', questionSchema);
