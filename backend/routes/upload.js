// Upload Routes
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const { detectWaste } = require('../config/aiModel');
const { db } = require('../config/firebase');

// POST /upload - Upload image and get AI detection
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Upload to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'cleancity-reports',
          resource_type: 'auto',
          quality: 'auto:good'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(req.file.buffer);
    });

    const cloudinaryResult = await uploadPromise;

    // Run AI detection on the image
    const detectionResult = await detectWaste(cloudinaryResult.secure_url);

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        wasteType: detectionResult.wasteType,
        severity: detectionResult.severity,
        confidence: detectionResult.confidence
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message
    });
  }
});

module.exports = router;
