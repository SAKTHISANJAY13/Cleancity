// CleanCity Backend Server
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', process.env.FRONTEND_URL],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Firebase initialization
const { db, admin } = require('./config/firebase');

// Routes
const uploadRoutes = require('./routes/upload');
const submitReportRoutes = require('./routes/submitReport');
const reportsRoutes = require('./routes/reports');

// API Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/report', submitReportRoutes);
app.use('/api/reports', reportsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    message: 'CleanCity Backend is running'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'CleanCity - AI-Powered Local Waste Reporting & Reward System',
    version: '1.0.0',
    endpoints: {
      upload: 'POST /api/upload',
      submitReport: 'POST /api/report',
      getReports: 'GET /api/reports',
      getReportStats: 'GET /api/reports/stats/overview',
      health: 'GET /api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🌍 CleanCity Backend Started          ║
║  🚀 Server running on port ${PORT}       ║
║  📍 http://localhost:${PORT}             ║
║  🏥 Health: http://localhost:${PORT}/api/health ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
