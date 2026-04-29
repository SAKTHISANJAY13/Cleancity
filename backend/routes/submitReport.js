// Submit Report Routes
const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// POST /submit - Save report to Firestore
router.post('/', async (req, res) => {
  try {
    const { imageUrl, wasteType, severity, latitude, longitude, description } = req.body;

    // Validation
    if (!imageUrl || !wasteType || !severity || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: imageUrl, wasteType, severity, latitude, longitude'
      });
    }

    // Create report document
    const reportData = {
      imageUrl,
      wasteType,
      severity,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        geopoint: new (require('firebase-admin')).firestore.GeoPoint(
          parseFloat(latitude),
          parseFloat(longitude)
        )
      },
      description: description || '',
      timestamp: new Date(),
      status: 'open', // open, investigating, resolved
      upvotes: 0,
      verified: false
    };

    // Save to Firestore
    const docRef = await db.collection('reports').add(reportData);

    res.json({
      success: true,
      message: 'Report submitted successfully',
      data: {
        id: docRef.id,
        ...reportData
      }
    });
  } catch (error) {
    console.error('Submit report error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting report',
      error: error.message
    });
  }
});

// PUT /report/:id - Update report status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, verified } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (verified !== undefined) updateData.verified = verified;

    await db.collection('reports').doc(id).update(updateData);

    res.json({
      success: true,
      message: 'Report updated successfully',
      data: { id, ...updateData }
    });
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating report',
      error: error.message
    });
  }
});

// POST /report/:id/upvote - Upvote a report
router.post('/:id/upvote', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await db.collection('reports').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    const currentUpvotes = doc.data().upvotes || 0;
    await db.collection('reports').doc(id).update({
      upvotes: currentUpvotes + 1
    });

    res.json({
      success: true,
      message: 'Report upvoted',
      data: { id, upvotes: currentUpvotes + 1 }
    });
  } catch (error) {
    console.error('Upvote error:', error);
    res.status(500).json({
      success: false,
      message: 'Error upvoting report',
      error: error.message
    });
  }
});

module.exports = router;
