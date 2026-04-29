# CleanCity - AI-Powered Local Waste Reporting & Reward System

🌍 **CleanCity** is a full-stack MVP web application that enables citizens to report waste issues by uploading images, automatically detect waste type using AI, and get rewarded for keeping their communities clean!

## 🎯 Mission
Empower communities to take control of environmental cleanliness by making waste reporting easy, engaging, and rewarding.

## ⭐ Unique Features

### 1. **Gamified Reward System**
- Earn **10 points** for each waste report
- Track your total points and status
- Compete on the **leaderboard** with other contributors
- Level up from "Waste Warrior" to "Environmental Hero"

### 2. **AI-Powered Waste Detection**
- Automatic waste type classification (plastic, organic, metal, paper, glass, mixed)
- Severity assessment (low, medium, high)
- Confidence score for accuracy tracking

### 3. **Location-Based Reporting**
- Browser geolocation API integration
- All reports plotted on interactive Google Map
- Filter reports by location and waste type
- Neighborhood-level cleanup initiatives

### 4. **Real-Time Community Dashboard**
- Live statistics and waste distribution charts
- Weekly reporting trends
- Interactive map showing all reported waste locations
- Downvote/upvote system to validate reports

### 5. **Community Gamification**
- Leaderboard showing top contributors
- Achievement badges (coming soon)
- Monthly cleanup challenges
- Social sharing of reports

## 🏗️ Project Structure

```
Cleancity/
├── frontend/                 # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── MapView.jsx
│   │   │   ├── ReportsList.jsx
│   │   │   ├── Statistics.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── LeaderboardWidget.jsx
│   │   ├── services/
│   │   │   └── locationService.js
│   │   ├── api.js            # API client
│   │   ├── App.jsx           # Main app
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── backend/                  # Node.js + Express
│   ├── config/
│   │   ├── firebase.js       # Firebase config
│   │   ├── cloudinary.js     # Image upload
│   │   └── aiModel.js        # AI detection
│   ├── middleware/
│   │   └── upload.js         # Multer config
│   ├── routes/
│   │   ├── upload.js         # Image upload endpoint
│   │   ├── submitReport.js   # Report submission
│   │   └── reports.js        # Fetch reports
│   ├── server.js             # Main server
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | Firebase Firestore |
| **Storage** | Cloudinary (Image CDN) |
| **Maps** | Google Maps API |
| **AI/ML** | Rule-based detection (mock + easy integration) |
| **Real-time** | WebSocket ready (coming soon) |

## 📋 Core Features

### ✅ Implemented
- [x] Image upload with preview
- [x] AI waste type detection (mocked)
- [x] Browser geolocation capture
- [x] Report submission to Firestore
- [x] Interactive Google Map with markers
- [x] List view with filters by waste type
- [x] Reward points system (local storage)
- [x] Statistics dashboard
- [x] Leaderboard widget
- [x] Responsive design (mobile/tablet/desktop)
- [x] Real-time report upvoting
- [x] Report status tracking (open/investigating/resolved)

### 🔄 Easy-to-Integrate Features
- **Real AI Models**: Replace mock AI with Google Vision API, TensorFlow.js, or AWS Rekognition
- **Authentication**: Add Firebase Auth for user accounts and personalized stats
- **Notifications**: Push notifications when reports are near you
- **Social Sharing**: Share reports on social media
- **Achievements**: Badge system for different report types
- **Admin Dashboard**: Manage reports and verify waste cleanup

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 16+ and npm/yarn
- Cloudinary account (free tier available)
- Firebase project (free tier available)
- Google Maps API key
- Modern web browser with geolocation support

### Step 1: Firebase Setup

1. **Create a Firebase Project**
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Click "Create Project"
   - Enter project name: `cleancity`
   - Enable Google Analytics (optional)
   - Click "Create Project"

2. **Enable Firestore Database**
   - In Project Dashboard, click "Firestore Database"
   - Click "Create Database"
   - Start in test mode (for MVP)
   - Select your location
   - Click "Enable"

3. **Get Firebase Credentials**
   - Go to Project Settings (gear icon)
   - Click "Service Accounts"
   - Click "Generate Private Key"
   - A JSON file will download
   - Copy these values:
     - `project_id`
     - `private_key` (entire JSON as string)
     - `client_email`

4. **Optional: Enable Storage**
   - Go to Storage
   - Click "Get Started" (use test mode)

### Step 2: Cloudinary Setup

1. **Create Cloudinary Account**
   - Visit [Cloudinary](https://cloudinary.com/)
   - Sign up (free plan is sufficient)

2. **Get API Credentials**
   - Go to Dashboard
   - Copy your:
     - Cloud Name
     - API Key
     - API Secret

### Step 3: Google Maps API

1. **Create Google Cloud Project**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project
   - Enable "Maps JavaScript API"
   - Create API key in Credentials

### Step 4: Backend Setup

```bash
cd backend

# Create .env file
cp .env.example .env

# Edit .env with your credentials:
# FIREBASE_PROJECT_ID=your_project_id
# FIREBASE_PRIVATE_KEY=your_private_key_from_json
# FIREBASE_CLIENT_EMAIL=your_client_email
# FIREBASE_PRIVATE_KEY_ID=your_key_id
# FIREBASE_CLIENT_ID=your_client_id
# FIREBASE_CERT_URL=your_cert_url
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
# PORT=5000
# NODE_ENV=development

# Install dependencies
npm install

# Start backend server
npm run dev
# Server will run on http://localhost:5000
```

### Step 5: Frontend Setup

```bash
cd frontend

# Create .env.local file
cp .env.example .env.local

# Edit .env.local:
# VITE_BACKEND_URL=http://localhost:5000
# VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Install dependencies
npm install

# Start frontend dev server
npm run dev
# App will run on http://localhost:3000
```

### Step 6: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# ✅ Backend running at http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# ✅ Frontend running at http://localhost:3000
```

**Visit:** http://localhost:3000

## 📖 Environment Variables Reference

### Backend (.env)
```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY_ID=key_id_from_json
FIREBASE_CLIENT_ID=client_id_from_json
FIREBASE_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 🔌 API Endpoints

### Upload & Detect
**POST** `/api/upload`
- Upload image and get AI waste detection
- Returns: `imageUrl`, `wasteType`, `severity`, `confidence`

### Submit Report
**POST** `/api/report`
- Save waste report to database
- Body: `imageUrl`, `wasteType`, `severity`, `latitude`, `longitude`, `description`

### Get All Reports
**GET** `/api/reports`
- Fetch all reports with location data

### Filter Reports
**GET** `/api/reports/filter/:wasteType`
- Get reports by waste type (plastic, organic, metal, etc.)

### Get Statistics
**GET** `/api/reports/stats/overview`
- Waste type distribution, severity counts, weekly trends

### Upvote Report
**POST** `/api/report/:id/upvote`
- Increase upvote count for a report

## 🤖 AI Detection Strategy

### Current Implementation (Mock)
- Random waste type and severity selection
- Fallback when AI fails
- Easy to replace with real model

### How to Integrate Real AI:

**Option 1: Google Vision API**
```javascript
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const result = await client.labelDetection(imageUrl);
```

**Option 2: TensorFlow.js**
```javascript
const model = await cocoSsd.load();
const predictions = await model.detect(imageElement);
```

**Option 3: Custom ML Model**
```javascript
// Train custom waste classification model
// Deploy on Hugging Face or cloud function
const response = await fetch('your-ml-endpoint', { 
  method: 'POST',
  body: formData 
});
```

## 🎨 UI Customization

### Colors
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Accent: `#FF6B6B` (Red)

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold (700)
- Body: Regular (400)

### Spacing
- Using TailwindCSS utility classes
- Grid system: 12-column responsive

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly buttons (min 44px)
- Optimized image sizes for mobile
- Geolocation works on all modern browsers

## 🐛 Troubleshooting

### Backend Won't Start
```
Error: FIREBASE_PRIVATE_KEY not valid
→ Check that private key has escaped newlines (\n)
```

### Images Not Uploading
```
Error: Cloudinary authentication failed
→ Verify CLOUDINARY_API_KEY and API_SECRET
→ Check Cloudinary dashboard for uploads
```

### Map Not Loading
```
Error: Google Maps API key invalid
→ Verify API key in .env.local
→ Enable Maps JavaScript API in Google Cloud
→ Check API key restrictions (if any)
```

### Geolocation Not Working
```
→ Must use HTTPS in production
→ Check browser permissions
→ Ensure location services enabled on device
```

## 🚀 Deployment Guide

### Deploy Backend (Vercel/Heroku/Railway)

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Railway:**
```bash
npm install -g @railway/cli
railway link
railway up
```

### Deploy Frontend (Vercel/Netlify)

**Vercel:**
```bash
npm install -g vercel
cd frontend
vercel --prod
```

**Netlify:**
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

### Environment Variables on Production
- Set all `.env` variables in deployment dashboard
- Never commit `.env` files
- Use secret management tools

## 📊 Database Schema

### Reports Collection
```javascript
{
  id: "auto-generated",
  imageUrl: "https://...",
  wasteType: "plastic" | "organic" | "metal" | "paper" | "glass" | "mixed",
  severity: "low" | "medium" | "high",
  location: {
    latitude: 40.7128,
    longitude: -74.0060,
    geopoint: GeoPoint
  },
  description: "string",
  timestamp: Timestamp,
  status: "open" | "investigating" | "resolved",
  upvotes: number,
  verified: boolean
}
```

## 🔐 Security Considerations

- Firebase Firestore security rules (test mode only for MVP)
- Validate file types on backend
- Sanitize user input
- Rate limiting on API endpoints
- Environment variables never in code

## 📈 Future Enhancements

1. **User Authentication** - Firebase Auth
2. **Push Notifications** - FCM for nearby reports
3. **AR View** - View waste using AR camera
4. **Real ML Models** - Google Vision or custom trained
5. **City Integration** - API for municipal cleanup teams
6. **Mobile Apps** - React Native
7. **Blockchain** - Reward token system
8. **Social Media** - Share achievements
9. **Admin Dashboard** - Manage reports and users
10. **Analytics** - Heat maps and trend analysis

## 👥 Contributing

This is an open-source project. To contribute:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

MIT License - feel free to use for personal or commercial projects

## 📞 Support

- 📧 Email: hello@cleancity.io
- 💬 Discord: [Join Server](https://discord.gg/cleancity)
- 🐛 Bug Reports: GitHub Issues

## 🙏 Acknowledgments

- React and Vite communities
- Firebase for backend infrastructure
- Cloudinary for image management
- Google Maps API
- Tailwind CSS for styling

---

**Made with ❤️ for a cleaner planet 🌍**

*Every report counts. Together, we make our cities cleaner.*
