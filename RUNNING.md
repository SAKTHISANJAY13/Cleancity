# RUNNING THE APPLICATION - Complete Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites Checklist
```
✅ Node.js 16+ installed (npm --version)
✅ Firebase credentials (.env setup)
✅ Cloudinary credentials (.env setup)
✅ Google Maps API key (.env.local setup)
```

---

## 📋 Full Setup Instructions

### Phase 1: Configuration Setup (⏱️ 5 minutes)

#### 1. Backend Configuration
```bash
cd backend

# Copy template
cp .env.example .env

# Edit .env and add:
# - FIREBASE_PROJECT_ID
# - FIREBASE_PRIVATE_KEY
# - FIREBASE_CLIENT_EMAIL
# - CLOUDINARY_CLOUD_NAME
# - CLOUDINARY_API_KEY
# - CLOUDINARY_API_SECRET
```

#### 2. Frontend Configuration
```bash
cd frontend

# Copy template
cp .env.example .env.local

# Edit .env.local and add:
# - VITE_BACKEND_URL=http://localhost:5000
# - VITE_GOOGLE_MAPS_API_KEY
```

---

### Phase 2: Install Dependencies (⏱️ 3 minutes)

#### Backend
```bash
cd backend
npm install
```

**Expected output:**
```
added 87 packages in 15s
```

#### Frontend
```bash
cd frontend
npm install
```

**Expected output:**
```
added 156 packages in 45s
```

---

### Phase 3: Start Services (⏱️ 2 minutes)

#### Terminal 1: Start Backend Server
```bash
cd backend
npm run dev
```

**Expected output:**
```
╔════════════════════════════════════════╗
║  🌍 CleanCity Backend Started          ║
║  🚀 Server running on port 5000        ║
║  📍 http://localhost:5000/             ║
║  🏥 Health: http://localhost:5000/api/health ║
╚════════════════════════════════════════╝
```

If you see errors:
- ❌ `FIREBASE_PRIVATE_KEY not valid` → Check .env file
- ❌ `Cannot find Cloudinary credentials` → Verify .env
- ❌ `Port 5000 already in use` → Change PORT in .env

#### Terminal 2: Start Frontend Dev Server
```bash
cd frontend
npm run dev
```

**Expected output:**
```
  VITE v4.1.4  ready in 234 ms
  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

---

### Phase 4: Test the Application

1. **Open Browser**
   - Visit http://localhost:3000

2. **You should see:**
   - 🎨 Beautiful CleanCity homepage
   - 📸 "Upload Report" tab active
   - ⭐ Points counter showing 0
   - 🏆 Leaderboard on the right

3. **Test Flow:**

   **Step A: Upload an Image**
   - Click "📤 Choose Image"
   - Select any image from your computer
   - Wait for AI analysis (should show waste type)

   **Step B: Capture Location**
   - Click "📍 Capture Location"
   - Grant browser permission if asked
   - Should show latitude/longitude

   **Step C: Submit Report**
   - Add optional description
   - Click "🚀 Submit Report & Earn 10 Points"
   - Should see ✅ success message
   - Points should increase to 10

   **Step D: View Report**
   - Click "📋 Reports" tab
   - Should see your report in the list
   - Can upvote it (👍)

   **Step E: View on Map**
   - Click "🗺️ Map View" tab
   - Should see marker at reported location
   - Click marker to see report details

   **Step F: View Statistics**
   - Click "📊 Statistics" tab
   - Should see 1 total report
   - See waste type distribution

---

## 🛠️ Development Workflow

### File Watching & Auto-Reload

Both servers have hot reload enabled:

**Backend (Nodemon):**
- Edit any file in `backend/`
- Server automatically restarts
- No manual restart needed

**Frontend (Vite):**
- Edit any file in `frontend/src/`
- Browser automatically refreshes
- State is preserved (usually)

### Making Changes

**Example: Add new component**
```bash
# 1. Create component
nano frontend/src/components/MyComponent.jsx

# 2. Edit App.jsx to import and use it
nano frontend/src/App.jsx

# 3. Browser automatically reloads
# 4. See your changes live
```

---

## 🧪 Testing API Endpoints

### Test Backend is Running
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-04-05T...",
  "message": "CleanCity Backend is running"
}
```

### Test Image Upload
```bash
curl -X POST http://localhost:5000/api/upload \
  -F "image=@/path/to/image.jpg"
```

### Test Get Reports
```bash
curl http://localhost:5000/api/reports
```

### Test Get Statistics
```bash
curl http://localhost:5000/api/reports/stats/overview
```

---

## 🐛 Troubleshooting Common Issues

### Issue: "Firebase not initialized"

**Solution:**
```bash
# Check .env file exists and has all keys
cd backend
cat .env

# Verify each value:
# ✅ FIREBASE_PROJECT_ID=xxx (no extra spaces)
# ✅ FIREBASE_PRIVATE_KEY="...BEGIN..." (complete key)
# ✅ FIREBASE_CLIENT_EMAIL=...@...iam.gserviceaccount.com
```

### Issue: "Cannot upload images"

**Solution:**
```bash
# Check Cloudinary credentials
# 1. Login to Cloudinary dashboard
# 2. Get fresh credentials
# 3. Update backend/.env
# 4. Restart backend: npm run dev
```

### Issue: "Map not showing"

**Solution:**
```bash
# Check Google Maps API key
# 1. Open browser DevTools (F12)
# 2. Check Console tab for errors
# 3. Verify .env.local has correct key
# 4. Frontend must be restarted after env change
# 5. Clear browser cache: Ctrl+Shift+Del
```

### Issue: "Geolocation not working"

**Solution:**
```
1. Check browser location permissions
2. Go to http://localhost:3000 settings
3. Allow location access
4. Must use HTTPS in production
5. Mobile: Ensure location services enabled
```

### Issue: "Port already in use"

**Solution (Backend):**
```bash
# Check what's using port 5000
# On Windows:
netstat -ano | findstr :5000

# Change port in .env:
# PORT=5001

# Restart backend
```

**Solution (Frontend):**
```bash
# Vite will auto-use different port
# But to force specific port:
npm run dev -- --port 3001
```

### Issue: "Module not found"

**Solution:**
```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Monitor Services

### Backend Logs
```bash
# Watch backend logs in real-time
cd backend
npm run dev

# Look for:
# ✅ Firebase initialized successfully
# ✅ Server running on port 5000
# 🚀 Each API request logged
```

### Frontend Logs
```bash
# Watch frontend in browser
# Press F12 to open DevTools
# Go to Console tab
# Look for errors and warnings
```

### Database Status
```bash
# Check Firebase Firestore
# 1. Go to Firebase Console
# 2. Click Firestore Database
# 3. Should see "reports" collection
# 4. Expand to see documents
```

### Storage Status
```bash
# Check Cloudinary uploads
# 1. Login to Cloudinary
# 2. Go to Media Library
# 3. Filter by "cleancity-reports" folder
# 4. See all uploaded images
```

---

## 🚀 Production Readiness Checklist

Before deploying to production:

### Code
- [ ] Remove console.log statements
- [ ] Add error boundaries
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Optimize images with Cloudinary

### Security
- [ ] Change Firebase rules from test to production
- [ ] Add authentication (Firebase Auth)
- [ ] Hide API keys in environment variables
- [ ] Enable HTTPS only
- [ ] Add CORS restrictions

### Performance
- [ ] Enable database indexes
- [ ] Optimize bundle size
- [ ] Set up CDN for static assets
- [ ] Enable caching headers
- [ ] Monitor API response times

### Infrastructure
- [ ] Set up CI/CD pipeline
- [ ] Database backups configured
- [ ] Error tracking enabled (Sentry)
- [ ] Monitoring/Alerting setup
- [ ] Rate limiting enabled

---

## 📈 Monitoring & Logs

### View Backend Logs
```bash
# Logs appear in terminal where backend is running
# Each request shows:
# POST /api/upload
# GET /api/reports
# POST /api/report
```

### View Frontend Logs
```bash
# In browser DevTools (F12)
# Console tab shows React warnings/errors
# Network tab shows API calls
```

### Firebase Logs
```bash
# Firebase Console → Firestore Database
# Click → Rules tab to see execution logs
```

---

## 🔄 Restart Services

If something is broken:

**Method 1: Simple restart**
```bash
# Terminal 1 (Backend)
Ctrl+C  # Stop server
npm run dev  # Start again

# Terminal 2 (Frontend)
Ctrl+C  # Stop dev server
npm run dev  # Start again
```

**Method 2: Hard reset**
```bash
# Backend
cd backend
npm run dev
# Delete all cache/temp files (database does clean)

# Frontend
cd frontend
rm -rf node_modules
npm install
npm run dev
```

---

## 💾 Database Backups

### Automatic Backups (Firebase)
- Firebase includes daily backups
- No action needed
- Available in Firebase console

### Manual Backup
```bash
# Export Firestore data
# Firebase Console → Firestore Database
# Click ⋮ (three dots) → Export collections
# Choose "reports" collection
# Download JSON file
```

---

## ➡️ Next Steps

1. **Make first waste report** - Test the full flow
2. **Upload multiple images** - Test image upload
3. **View on map** - Test Google Maps integration
4. **Check statistics** - Test data aggregation
5. **Test upvoting** - Test interaction features

---

## 📚 Useful Commands Reference

```bash
# Backend
npm run dev          # Development with auto-reload
npm start            # Production start

# Frontend
npm run dev          # Development server
npm run build        # Build for production
npm run preview      # Preview production build

# Git
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub
```

---

## 🎯 Success Indicators

You'll know everything is working when:

✅ Backend shows: `Server running on port 5000`
✅ Frontend shows: `http://localhost:3000/`
✅ Uploading image shows waste type detected
✅ Location is captured successfully
✅ Report saves and appears in list
✅ Report marker appears on map
✅ Points increase after submission
✅ Statistics show 1 report

---

**Happy coding! 🎉**

If you encounter issues, check:
1. FIREBASE_SETUP.md
2. CLOUDINARY_SETUP.md
3. GOOGLE_MAPS_SETUP.md
4. Troubleshooting section above
