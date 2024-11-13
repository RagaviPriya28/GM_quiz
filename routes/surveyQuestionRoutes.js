const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const surveyQuestionController = require('../controllers/surveyQuestionController');

// Create a new question
router.post('/questions/create', protect, admin, surveyQuestionController.createSurveyQuestion);

// Get all questions
router.get('/questions', protect, surveyQuestionController.getAllSurveyQuestions);


module.exports = router;
