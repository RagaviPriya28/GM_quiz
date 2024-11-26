const Media = require('../models/Media');
const fs = require('fs');
const path = require('path');

// POST /api/media/upload (for multiple files)
exports.uploadMedia = async (req, res) => {
  try {
    const { files } = req; // For multiple files, `req.files` is used instead of `req.file`
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Save media details for each uploaded file
    const mediaDocuments = files.map((file) => ({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
    }));

    const media = await Media.insertMany(mediaDocuments);
    res.status(201).json({ message: 'Media uploaded successfully', media });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// GET /api/media/:id
exports.getMediaDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);
    if (!media) return res.status(404).json({ message: 'Media not found' });

    res.status(200).json({ media });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// DELETE /api/media/:id
exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);
    if (!media) return res.status(404).json({ message: 'Media not found' });

    // Delete file from file system
    fs.unlink(path.resolve(media.path), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting file', error: err });
      }
    });

    await Media.findByIdAndDelete(id);
    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// DELETE /api/media/all (delete all media files)
exports.deleteAllMedia = async (req, res) => {
    try {
      const mediaFiles = await Media.find();
  
      // Delete all files from the filesystem
      mediaFiles.forEach((media) => {
        fs.unlink(path.resolve(media.path), (err) => {
          if (err) {
            console.error(`Failed to delete file ${media.path}:`, err);
          }
        });
      });
  
      // Remove all records from the database
      await Media.deleteMany({});
      res.status(200).json({ message: 'All media files deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
// GET /api/media
exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find(); // Retrieve all media records
    if (!media || media.length === 0) {
      return res.status(404).json({ message: 'No media files found' });
    }

    // Construct full URL for each media file
    const host = req.protocol + '://' + req.get('host'); // e.g., http://localhost:5000
    const mediaWithPaths = media.map((item) => ({
      ...item.toObject(),
      url: `${host}/${item.path.replace(/\\/g, '/')}`, // Convert backslashes to forward slashes
    }));

    res.status(200).json({ media: mediaWithPaths });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

