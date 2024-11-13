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
                .select('title description dimension year imageUrl'); 

            return res.status(200).json(questions);
        }

        const questions = await SurveyQuestion.find()
            .select('title imageUrl answerOptions');

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

        let question;
        if (userRole === 'admin') {
            question = await SurveyQuestion.findById(id)
                .select('title description dimension year imageUrl')
                .populate('imageUrl', 'path'); // Populate path field from Media model
        } else {
            question = await SurveyQuestion.findById(id)
                .select('title imageUrl answerOptions')
                .populate('imageUrl', 'path'); // Populate path field from Media model
        }

        if (!question) {
            return res.status(404).json({ message: 'Survey question not found' });
        }

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

