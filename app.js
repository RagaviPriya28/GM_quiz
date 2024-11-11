const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');
const authRoutes = require('./routes/authRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const userRoutes = require('./routes/userRoutes'); 
const forgetRoutes = require('./routes/forgetRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

require('./config/env'); 

const app = express();
app.use(cors());
app.use(express.json());

logger(app); 

app.use('/api', authRoutes);
app.use('/api', tenantRoutes);
app.use('/api', userRoutes); 
app.use('/api', forgetRoutes);
app.use('/api', categoryRoutes);

module.exports = app;
