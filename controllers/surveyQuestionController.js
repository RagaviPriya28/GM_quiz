const SurveyQuestion = require('../models/Surveyquestion'); // Import the model


exports.createSurveyQuestion = async (req, res) => {
    try {
        const { title, description, dimension, year, imageUrl, answerOptions } = req.body;


        const newQuestion = new SurveyQuestion({
            title,
            description,
            dimension,
            year,
            imageUrl,
            answerOptions,
        });

        const savedQuestion = await newQuestion.save();
        res.status(200).json(savedQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all survey questions
exports.getAllQuestions = async (req, res) => {
    try {
        const userRole = req.user ? req.user.role : 'user';
        let questions;

        if (userRole === 'admin') {
            questions = await SurveyQuestion.find().select('title description dimension year imageUrl timer');
        } else {
            questions = await SurveyQuestion.find().select('title imageUrl answerOptions.optionText timer');
        }

        // Access the socket.io instance from the Express app
        const io = req.app.get('socketio');
        
        // Emit the event with the questions data
        io.emit('allQuestionsFetched', { questions });

        // Send the response back to the client
        res.status(200).json(questions);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific survey question by ID
exports.getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const userRole = req.user ? req.user.role : 'user';
        const baseUrl = `${req.protocol}://${req.get('host')}/upload/`;

        let question;
        if (userRole === 'admin') {
            question = await SurveyQuestion.findById(id)
                .select('title description dimension year imageUrl timer')
                .populate('imageUrl', 'path'); // Populate path field from Media model
        } else {
            question = await SurveyQuestion.findById(id)
                .select('title imageUrl answerOptions.optionText timer')
                .populate('imageUrl', 'path'); // Populate path field from Media model
        }

        if (!question) {
            return res.status(404).json({ message: 'Survey question not found' });
        }

        // Construct the full URL for imageUrl if it's populated
        if (question.imageUrl && question.imageUrl.path) {
            question.imageUrl = `${baseUrl}${question.imageUrl.path.split('\\').pop()}`;
        }

        // Access the socket.io instance from the Express app
        const io = req.app.get('socketio');
        
        // Emit the event with the fetched question data
        io.emit('questionFetchedById', { question });

        // Send the response back to the client
        res.status(200).json(question);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNextQuestionSocket = async (questionId, io, qrCodeData) => {
    try {
      const question = await SurveyQuestion.findById(questionId);
      if (question) {
        // Emit the question to both admin and users in the room identified by qrCodeData
        io.to(qrCodeData).emit('new_question', {
          question,
          timer: 30 // Initial timer value (can adjust as needed)
        });
  
        // Start a countdown timer for the question
        let countdown = 30; // 30 seconds timer
        const timerInterval = setInterval(() => {
          countdown--;
          io.to(qrCodeData).emit('timer_update', { countdown });
  
          if (countdown <= 0) {
            clearInterval(timerInterval);
          }
        }, 1000); // Update timer every second
      } else {
        console.error('Survey question not found');
      }
    } catch (error) {
      console.error('Error sending survey question:', error);
    }
};