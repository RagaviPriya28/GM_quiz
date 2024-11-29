const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getQuizCountForCategory
} = require('../controllers/categoryController');

// Create a new category (admin only)
router.post('/api/categories', protect, admin, createCategory);

// Get all categories
router.get('/api/categories', getCategories);

// Get a specific category's details
router.get('/api/categories/:id', getCategoryById);

// Update a category (admin only)
router.put('/api/categories/:id', protect, admin, updateCategory);

// Delete a category (admin only)
router.delete('/api/categories/:id', protect, admin, deleteCategory);

// Get a specific category's count according to the quizzes
router.get('/api/category/:categoryId/quiz-count', protect, admin, getQuizCountForCategory);


module.exports = router;
