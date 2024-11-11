const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');
const authRoutes = require('./routes/authRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const forgetRoutes = require('./routes/forgetRoutes');

require('./config/env'); 

const app = express();
app.use(cors());
app.use(express.json());

logger(app); 

app.use('/api/auth', authRoutes);
app.use('/api', tenantRoutes);
app.use('/api', userRoutes); // Use user routes
app.use('/api', forgetRoutes);

module.exports = app;
