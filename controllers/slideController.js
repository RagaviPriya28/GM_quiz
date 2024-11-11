const Slide = require('../models/slide');  // Slide model
const Quiz = require('../models/quiz');    // Quiz model
const { checkAdmin } = require('../middlewares/auth');  // Middleware to check if user is admin

// Create a new slide for a quiz (admin only)
exports.addSlide = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { title, content, media, position } = req.body;

    // Check if quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Create new slide
    const newSlide = new Slide({
      quiz: quizId,
      title,
      content,
      media,
      position
    });

    await newSlide.save();

    return res.status(201).json({
      message: 'Slide added successfully',
      slide: newSlide
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all slides for a specific quiz
exports.getSlides = async (req, res) => {
  try {
    const { quizId } = req.params;

    // Check if quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const slides = await Slide.find({ quiz: quizId }).sort({ position: 1 });

    return res.status(200).json({
      slides
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get details of a specific slide
exports.getSlide = async (req, res) => {
  try {
    const { id } = req.params;

    const slide = await Slide.findById(id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    return res.status(200).json({
      slide
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a slide (admin only)
exports.updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, media, position } = req.body;

    const slide = await Slide.findById(id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    // Update slide fields
    slide.title = title || slide.title;
    slide.content = content || slide.content;
    slide.media = media || slide.media;
    slide.position = position || slide.position;

    await slide.save();

    return res.status(200).json({
      message: 'Slide updated successfully',
      slide
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a slide (admin only)
exports.deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;

    const slide = await Slide.findById(id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    await slide.remove();

    return res.status(200).json({
      message: 'Slide deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
