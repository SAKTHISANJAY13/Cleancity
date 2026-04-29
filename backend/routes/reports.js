// Reports Routes
const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reportsSnapshot = await db.collection('reports')
      .orderBy('timestamp', 'desc')
      .limit(100)
      .get();

    const reports = [];
    reportsSnapshot.forEach(doc => {
      reports.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
      });
    });

    res.json({
      success: true,
      data: reports,
      count: reports.length
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reports',
      error: error.message
    });
  }
});

// Get reports by waste type
router.get('/filter/:wasteType', async (req, res) => {
  try {
    const { wasteType } = req.params;
    const reportsSnapshot = await db.collection('reports')
      .where('wasteType', '==', wasteType)
      .orderBy('timestamp', 'desc')
      .get();

    const reports = [];
    reportsSnapshot.forEach(doc => {
      reports.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
      });
    });

    res.json({
      success: true,
      data: reports,
      count: reports.length
    });
  } catch (error) {
    console.error('Error fetching filtered reports:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filtered reports',
      error: error.message
    });
  }
});

// Get report by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('reports').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
      }
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching report',
      error: error.message
    });
  }
});

// Get statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const reportsSnapshot = await db.collection('reports').get();
    
    let stats = {
      totalReports: reportsSnapshot.size,
      wasteTypeCount: {},
      severityCount: {},
      reportsThisWeek: 0
    };

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    reportsSnapshot.forEach(doc => {
      const data = doc.data();
      
      // Count waste types
      if (data.wasteType) {
        stats.wasteTypeCount[data.wasteType] = (stats.wasteTypeCount[data.wasteType] || 0) + 1;
      }

      // Count severity levels
      if (data.severity) {
        stats.severityCount[data.severity] = (stats.severityCount[data.severity] || 0) + 1;
      }

      // Count reports from this week
      const reportDate = data.timestamp?.toDate?.() || new Date(data.timestamp);
      if (reportDate > oneWeekAgo) {
        stats.reportsThisWeek++;
      }
    });

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

module.exports = router;
