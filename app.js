const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');
const authRoutes = require('./routes/authRoutes');

require('./config/env'); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

logger(app); // Apply logger

app.use('/api/auth', authRoutes);

module.exports = app;
