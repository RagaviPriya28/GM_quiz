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
// const sessionRoutes = require('./routes/sessionRoutes');
const answerRoutes = require('./routes/answerRoutes');

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
// app.use('/api/sessions', sessionRoutes);

module.exports = app;
