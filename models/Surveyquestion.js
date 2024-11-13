const mongoose = require('mongoose');

const SurveyQuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dimension: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true 
    },
    timer: {
        type: Number,
        default: 30 
    },
    liveScoreboard: {
        correctCount: {
            type: Number,
            default: 0 
        },
        incorrectCount: {
            type: Number,
            default: 0 
        }
    },
    answerOptions: [
        {
            optionText: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true
            }
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model('SurveyQuestion', SurveyQuestionSchema);
