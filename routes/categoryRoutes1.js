// routes/categoryRoutes.js
const express = require('express');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/categories/', protect, admin, createCategory);
router.get('/categories/', getCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', protect, admin, updateCategory);
router.delete('/categories/:id', protect, admin, deleteCategory);

module.exports = router;
