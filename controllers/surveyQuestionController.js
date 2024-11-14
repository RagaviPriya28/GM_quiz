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
        const baseUrl = `${req.protocol}://${req.get('host')}/upload/`;

        let questions;
        if (userRole === 'admin') {
            questions = await SurveyQuestion.find()
                .select('title description dimension year imageUrl')
                .populate('imageUrl', 'path');
        } else {
            questions = await SurveyQuestion.find()
                .select('title imageUrl answerOptions.optionText')
                .populate('imageUrl', 'path');
        }

        // Construct full URLs for imageUrl in each question
        questions = questions.map(question => {
            if (question.imageUrl && question.imageUrl.path) {
                const filename = question.imageUrl.path.split('\\').pop();
                question.imageUrl = `${baseUrl}${filename}`;
            }
            return question;
        });

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
                .select('title description dimension year imageUrl')
                .populate('imageUrl', 'path');
        } else {
            question = await SurveyQuestion.findById(id)
                .select('title imageUrl answerOptions.optionText')
                .populate('imageUrl', 'path');
        }

        if (!question) {
            return res.status(404).json({ message: 'Survey question not found' });
        }

        // Construct the full URL for imageUrl if it's populated
        if (question.imageUrl && question.imageUrl.path) {
            const filename = question.imageUrl.path.split('\\').pop();
            question.imageUrl = `${baseUrl}${filename}`;
        }

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



