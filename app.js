const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');
const authRoutes = require('./routes/authRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const userRoutes = require('./routes/userRoutes'); 
const forgetRoutes = require('./routes/forgetRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const quizRoutes = require('./routes/quizRoutes');
const slideRoutes = require('./routes/slideRoutes');
const questionRoutes = require('./routes/questionRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const leaderRoutes = require('./routes/leaderRoutes');
const qrRoutes = require('./routes/qrRoutes');
const qrCodeRoutes = require('./routes/QrCodeRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const surveyQuestionRoutes = require('./routes/surveyQuestionRoutes');


const path = require('path');

require('./config/env'); 

const app = express();
app.use(cors());
app.use(express.json());

logger(app); 

app.use('/api', authRoutes);
app.use('/api', tenantRoutes);
app.use('/api', userRoutes); 
app.use('/api', forgetRoutes);
app.use(categoryRoutes);
app.use(quizRoutes);
app.use(slideRoutes);
app.use(questionRoutes);
app.use(answerRoutes);
// app.use('/api', categoryRoutes);
// app.use(categoryRoutes);
// app.use('/api/quizzes', quizRoutes);
// app.use('/api/slides', slideRoutes);
// app.use('/api/questions', questionRoutes);
app.use(sessionRoutes);
app.use(leaderRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/qrcode', qrCodeRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api', surveyQuestionRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;
