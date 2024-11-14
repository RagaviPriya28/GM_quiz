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
        if (userRole === 'admin') {
            const questions = await SurveyQuestion.find()
                .select('title description dimension year imageUrl timer liveScoreboard'); 

            return res.status(200).json(questions);
        }

        const questions = await SurveyQuestion.find()
            .select('title imageUrl answerOptions.optionText timer');

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
                .select('title description dimension year imageUrl timer liveScoreboard')
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

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getNextQuestionSocket = async (questionId, io, sessionId) => {
    try {
        const question = await SurveyQuestion.findById(questionId);
        if (question) {
            io.to(sessionId).emit('new_question', question);
        } else {
            console.error('Survey question not found');
        }
    } catch (error) {
        console.error('Error sending survey question:', error);
    }
};