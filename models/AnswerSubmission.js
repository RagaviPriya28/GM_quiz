const mongoose = require('mongoose');

const AnswerSubmissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'newUser', required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'SurveyQuestion', required: true },
    qrCodeId: { type: String, required: true },
    submittedAnswer: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    timeTaken: { type: Number, required: true } // Add this field to store the time taken in seconds
});

const AnswerSubmission = mongoose.model('AnswerSubmission', AnswerSubmissionSchema);

module.exports = AnswerSubmission;
