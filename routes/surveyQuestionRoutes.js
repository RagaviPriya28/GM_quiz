// const express = require('express');
// const router = express.Router();
// const { protect, admin } = require('../middlewares/authMiddleware');
// const surveyQuestionController = require('../controllers/surveyQuestionController');

// // Create a new question
// router.post('/questions/create', protect, admin, surveyQuestionController.createSurveyQuestion);

// // Get all questions
// router.get('/questions',protect, surveyQuestionController.getAllQuestions);

// // Route to get a survey question by its ID
// router.get('/survey-questions/:id',protect, surveyQuestionController.getQuestionById);


// module.exports = router;

const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const { 
    getPublicQuestions,
    getPublicQuestionById,
    createSurveyQuestion,
    getAdminQuestions,
    getAdminQuestionById,
    getCurrentQuestionByQr,
    changeQuestionByQr,
    initializeQrSession,
    endQrSession
} = require('../controllers/surveyQuestionController');

// Public routes (no authentication needed)
router.get('/public/questions', getPublicQuestions);
router.get('/public/questions/:id', getPublicQuestionById);

// QR Code based routes
router.get('/qr/:qrCodeId/current', getCurrentQuestionByQr);

// Protected admin routes
router.post('/qr/:qrCodeId/init', protect, admin, initializeQrSession);
router.post('/qr/:qrCodeId/change/:questionId', protect, admin, changeQuestionByQr);
router.post('/qr/:qrCodeId/end', protect, admin, endQrSession);

// Other admin routes
router.post('/questions/create', protect, admin, createSurveyQuestion);
router.get('/admin/questions', protect, admin, getAdminQuestions);
router.get('/admin/questions/:id', protect, admin, getAdminQuestionById);

module.exports = router;
    