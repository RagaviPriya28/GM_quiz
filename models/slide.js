const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  media: { type: String }, // URL to an image or video
  position: { type: Number, required: true },
});

module.exports = mongoose.model('Slide', slideSchema);
