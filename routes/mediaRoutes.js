const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const mediaController = require('../controllers/mediaController');
const { protect, admin } = require('../middlewares/authMiddleware');

// POST /api/media/upload
router.post('/upload', upload.array('media'), protect, admin, mediaController.uploadMedia);

// DELETE /api/media/all - Delete all media files
router.delete('/all',  protect, admin, mediaController.deleteAllMedia);

// GET /api/media/:id
router.get('/:id', protect, admin, mediaController.getMediaDetails);

// DELETE /api/media/:id
router.delete('/:id', protect, admin, mediaController.deleteMedia);

// GET /api/media
router.get('/',  protect, admin, mediaController.getAllMedia);


module.exports = router;
