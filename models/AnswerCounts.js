const mongoose = require('mongoose');

const AnswerCountsSchema = new mongoose.Schema({
    qrCodeId: { type: String, required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'SurveyQuestion', required: true },
    counts: [{
        optionText: { type: String, required: true },
        count: { type: Number, required: true }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AnswerCounts', AnswerCountsSchema);
