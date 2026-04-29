// Cloudinary Configuration
const dotenv = require('dotenv');

dotenv.config();

let cloudinary = null;

// Only initialize if credentials are available
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  try {
    cloudinary = require('cloudinary').v2;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('✅ Cloudinary initialized successfully');
  } catch (error) {
    console.log('⚠️ Cloudinary not available - using placeholder images');
  }
} else {
  console.log('⚠️ Cloudinary credentials not configured - using demo images');
  
  // Mock Cloudinary for demo mode
  cloudinary = {
    uploader: {
      upload_stream: (options, callback) => {
        return {
          end: (buffer) => {
            // Return a mock response with placeholder image
            setTimeout(() => {
              callback(null, {
                secure_url: 'https://via.placeholder.com/400x300?text=Waste+Report+' + Date.now(),
                public_id: 'demo/report_' + Date.now(),
                width: 400,
                height: 300
              });
            }, 500); // Simulate upload delay
          }
        };
      }
    }
  };
}

module.exports = cloudinary;
