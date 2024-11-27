const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Media',
    required: true },
  position: { type: Number, required: true },
});

module.exports = mongoose.model('Slide', slideSchema);
