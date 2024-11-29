const Slide = require('../models/slide');  // Slide model
const Quiz = require('../models/quiz');    // Quiz model
const { checkAdmin } = require('../middlewares/auth');  // Middleware to check if user is admin


exports.addSlide = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { title, content, type, imageUrl, position } = req.body; // Include type in the request body

    // Check if quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Validate the type
    const validTypes = ['Classic', 'Big Title', 'Bullet Points'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: `Invalid type. Valid types are: ${validTypes.join(', ')}` });
    }

    // Fetch the image document by ID (using Media model)
    const image = await Media.findById(imageUrl); // Make sure imageUrl is the media _id
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Base URL for constructing the full image path
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    // Construct the full image URL (from the Media path)
    const fullImageUrl = `${baseUrl}${encodeURIComponent(image.path.split('\\').pop())}`;

    // Create new slide
    const newSlide = new Slide({
      quiz: quizId,
      title,
      content,
      type,
      imageUrl: image._id, // Save the image ID in the database
      position,
    });

    await newSlide.save();

    // Add the slide ID to the quiz's slides array
    quiz.slides.push(newSlide._id);
    await quiz.save();

    // Include the full image URL in the response
    const responseSlide = {
      ...newSlide.toObject(),
      imageUrl: fullImageUrl, // Replace image ID with the full URL in the response
    };

    return res.status(201).json({
      message: 'Slide added successfully',
      slide: responseSlide,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getSlides = async (req, res) => {
  try {
    const { quizId } = req.params;

    // Check if quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Base URL for constructing the full image path
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    // Find slides related to the quiz and populate the imageUrl field
    const slides = await Slide.find({ quiz: quizId }).sort({ position: 1 })
      .populate('imageUrl', 'path'); // Populate the imageUrl field to fetch the path field from the Media collection

    if (slides.length === 0) {
      return res.status(404).json({ message: 'No slides found for this quiz' });
    }

    // Map through slides and append the full image URL with encoding
    const slidesWithFullImageUrl = slides.map(slide => {
      const slideObj = slide.toObject();
      if (slideObj.imageUrl && slideObj.imageUrl.path) {
        slideObj.imageUrl = `${baseUrl}${encodeURIComponent(slideObj.imageUrl.path.split('\\').pop())}`;
      }
      return slideObj;
    });

    // Return the slides with the full image URL
    res.status(200).json(slidesWithFullImageUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get details of a specific slide
exports.getSlide = async (req, res) => {
  try {
    const { id } = req.params;

    // Base URL for constructing the full image path
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    const slide = await Slide.findById(id).populate('imageUrl', 'path'); // Populate the imageUrl field to fetch the path

    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    // Construct the full image URL if imageUrl exists, with encoding
    const slideObj = slide.toObject();
    if (slideObj.imageUrl && slideObj.imageUrl.path) {
      slideObj.imageUrl = `${baseUrl}${encodeURIComponent(slideObj.imageUrl.path.split('\\').pop())}`;
    }

    return res.status(200).json({
      message: 'Slide retrieved successfully',
      slide: slideObj,
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
    const { title, content, imageUrl, position } = req.body;

    const slide = await Slide.findById(id).populate('imageUrl', 'path'); // Populate imageUrl for fetching path if it's updated
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    // Base URL for constructing the full image path
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    // Update slide fields
    if (title) slide.title = title;
    if (content) slide.content = content;
    if (imageUrl) slide.imageUrl = imageUrl; // Assuming imageUrl is the ID of a Media document
    if (position) slide.position = position;

    await slide.save();

    // Construct the full image URL for the response
    const updatedSlide = slide.toObject();
    if (updatedSlide.imageUrl && updatedSlide.imageUrl.path) {
      updatedSlide.imageUrl = `${baseUrl}${encodeURIComponent(updatedSlide.imageUrl.path.split('\\').pop())}`;
    }

    return res.status(200).json({
      message: 'Slide updated successfully',
      updatedFields: {
        title: updatedSlide.title,
        content: updatedSlide.content,
        imageUrl: updatedSlide.imageUrl,
        position: updatedSlide.position,
      },
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

    await slide.deleteOne({ _id: id });

    return res.status(200).json({
      message: 'Slide deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// const Slide = require('../models/slide');  // Slide model
// const Quiz = require('../models/quiz');    // Quiz model
// const { checkAdmin } = require('../middlewares/auth');


// exports.addSlide = async (req, res) => {
//   try {
//     const { quizId } = req.params;
//     const { title, content, type, imageUrl, position } = req.body; // Include type in the request body

//     // Check if quiz exists
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }

//     // Validate the type
//     const validTypes = ['Classic', 'Big Title', 'Bullet Points'];
//     if (!validTypes.includes(type)) {
//       return res.status(400).json({ message: `Invalid type. Valid types are: ${validTypes.join(', ')}` });
//     }

//     // Create new slide
//     const newSlide = new Slide({
//       quiz: quizId,
//       title,
//       content,
//       type,
//       imageUrl,
//       position,
//     });

//     await newSlide.save();

//     // Add the slide ID to the quiz's slides array
//     quiz.slides.push(newSlide._id);
//     await quiz.save();

//     return res.status(201).json({
//       message: 'Slide added successfully',
//       slide: newSlide,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


// exports.getSlides = async (req, res) => {
//   try {
//     const { quizId } = req.params;

//     // Check if quiz exists
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }

//     // Base URL for constructing the full image path
//     const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

//     // Find slides related to the quiz and populate the imageUrl field
//     const slides = await Slide.find({ quiz: quizId }).sort({ position: 1 })
//       .populate('imageUrl', 'path'); // Populate the imageUrl field to fetch the path field from the Media collection

//     if (slides.length === 0) {
//       return res.status(404).json({ message: 'No slides found for this quiz' });
//     }

//     // Map through slides and append the full image URL
//     const slidesWithFullImageUrl = slides.map(slide => {
//       const slideObj = slide.toObject();
//       if (slideObj.imageUrl && slideObj.imageUrl.path) {
//         slideObj.imageUrl = `${baseUrl}${slideObj.imageUrl.path.split('\\').pop()}`;
//       }
//       return slideObj;
//     });

//     // Return the slides with the full image URL
//     res.status(200).json(slidesWithFullImageUrl);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };





// // Get details of a specific slide
// exports.getSlide = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Base URL for constructing the full image path
//     const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

//     const slide = await Slide.findById(id).populate('imageUrl', 'path'); // Populate the imageUrl field to fetch the path

//     if (!slide) {
//       return res.status(404).json({ message: 'Slide not found' });
//     }

//     // Construct the full image URL if imageUrl exists
//     const slideObj = slide.toObject();
//     if (slideObj.imageUrl && slideObj.imageUrl.path) {
//       slideObj.imageUrl = `${baseUrl}${slideObj.imageUrl.path.split('\\').pop()}`;
//     }

//     return res.status(200).json({
//       message: 'Slide retrieved successfully',
//       slide: slideObj,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };




// // Update a slide (admin only)
// exports.updateSlide = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content, imageUrl, position } = req.body;

//     const slide = await Slide.findById(id);
//     if (!slide) {
//       return res.status(404).json({ message: 'Slide not found' });
//     }

//     // Update slide fields
//     slide.title = title || slide.title;
//     slide.content = content || slide.content;
//     slide.imageUrl = imageUrl || slide.imageUrl;
//     slide.position = position || slide.position;

//     await slide.save();

//     return res.status(200).json({
//       message: 'Slide updated successfully',
//       slide
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Delete a slide (admin only)
// exports.deleteSlide = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const slide = await Slide.findById(id);
//     if (!slide) {
//       return res.status(404).json({ message: 'Slide not found' });
//     }

//     await slide.deleteOne({ _id: id });

//     return res.status(200).json({
//       message: 'Slide deleted successfully'
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };




