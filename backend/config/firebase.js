// Firebase Configuration
const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Check if Firebase credentials are available
const hasFirebaseCredentials = 
  process.env.FIREBASE_PROJECT_ID && 
  process.env.FIREBASE_PRIVATE_KEY && 
  process.env.FIREBASE_CLIENT_EMAIL;

let db = null;

// Initialize Firebase Admin SDK
if (hasFirebaseCredentials) {
  try {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
      credential: admin.credential.cert({
        type: 'service_account',
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || 'demo-key-id',
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID || 'demo-client-id',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: process.env.FIREBASE_CERT_URL || 'https://www.googleapis.com/robot/v1/metadata/x509/demo'
      })
    });
    db = admin.firestore();
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('⚠️ Firebase initialization error:', error.message);
    console.log('📌 Running in DEMO MODE - using in-memory storage');
  }
} else {
  console.log('⚠️ Firebase credentials not configured. Running in DEMO MODE');
  console.log('📌 Data will be stored in memory (resets on restart)');
  console.log('💡 To use real Firebase, add your credentials to backend/.env');
  
  // Mock Firestore for demo mode
  const mockDb = {
    collection: function(name) {
      if (!this._collections) this._collections = {};
      if (!this._collections[name]) {
        this._collections[name] = {
          _docs: {},
          _getNextId() {
            return 'doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
          },
          add: async function(data) {
            const id = this._getNextId();
            this._docs[id] = { ...data, id };
            return { id };
          },
          get: async function() {
            const docs = [];
            for (let id in this._docs) {
              docs.push({ id, data: () => this._docs[id], exists: true });
            }
            return { forEach: (cb) => docs.forEach(cb), size: docs.length };
          },
          doc: (id) => ({
            get: async function() {
              return { exists: !!this._docs?.[id], data: () => this._docs?.[id] || {} };
            },
            update: async function(data) {
              if (this._docs?.[id]) Object.assign(this._docs[id], data);
              return {};
            }
          }),
          where: () => ({ orderBy: () => ({ get: async () => ({ forEach: () => {}, size: 0 }) }) }),
          orderBy: () => ({ limit: () => ({ get: async () => ({ forEach: () => {}, size: 0 }) }) }),
          _docs: this._collections[name]._docs
        };
        return this._collections[name];
      }
      return this._collections[name];
    },
    GeoPoint: function(lat, lon) {
      return { latitude: lat, longitude: lon };
    }
  };
  
  db = mockDb;
}

module.exports = { admin, db };
