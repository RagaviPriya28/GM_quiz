const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes (check if user is authenticated)
exports.protect = async (req, res, next) => {
  let token;

  // Get token from headers (Authorization header format: 'Bearer <token>')
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract the token

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be set in your environment variables

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password'); // Select everything except password
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No token provided, authorization denied' });
  }
};

// Check if the user is an admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Allow the request to proceed
  } else {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
};
