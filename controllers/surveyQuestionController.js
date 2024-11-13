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