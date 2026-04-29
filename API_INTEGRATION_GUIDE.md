# 🔌 CleanCity API Integration Guide

This guide walks you through connecting all required APIs for the CleanCity project.

---

## 1. 🔥 Firebase Setup (Database & Cloud Storage)

Firebase is used for storing waste reports, user data, and authentication.

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"+ Create project"**
3. Enter project name (e.g., "cleancity")
4. Enable/disable Google Analytics (optional)
5. Click **"Create project"** and wait for setup

### Step 2: Create Firestore Database
1. In Firebase Console, go to **Build → Firestore Database**
2. Click **"+ Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select your region (closest to your users)
5. Click **"Create"**

### Step 3: Get Service Account Credentials
1. Go to **Project Settings** (gear icon) → **Service Accounts**
2. Click **"Generate new private key"**
3. A JSON file will download - **KEEP IT SAFE!**
4. Open the downloaded JSON file and copy the values:

```json
{
  "type": "service_account",
  "project_id": "your_project_id",
  "private_key_id": "your_key_id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx@..."
}
```

### Step 4: Update Backend .env File
Edit `backend/.env`:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=123456789
FIREBASE_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx@...
```

**⚠️ Important**: 
- Replace `\n` in private key with actual newlines or keep escape sequences
- Keep the quotes around FIREBASE_PRIVATE_KEY
- Keep this file secret - never commit to git!

### Step 5: Restart Backend
```powershell
# Kill existing backend
taskkill /PID <pid> /F

# Restart
cd backend
npm run dev
```

Look for: ✅ Firebase initialized successfully

---

## 2. 🗺️ Google Maps API Setup

Google Maps is used to display waste reports on an interactive map.

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click **"NEW PROJECT"**
4. Enter project name and click **"Create"**
5. Wait for project creation (2-3 minutes)

### Step 2: Enable Maps API
1. In Google Cloud Console, go to **APIs & Services → Library**
2. Search for **"Maps JavaScript API"**
3. Click on it and select **"ENABLE"**
4. Also enable these APIs:
   - **Places API** (for location autocomplete)
   - **Geocoding API** (for coordinate conversion)

### Step 3: Create API Key
1. Go to **APIs & Services → Credentials**
2. Click **"+ Create Credentials"** → **"API Key"**
3. Copy the API key

### Step 4: Restrict API Key (Security)
1. Click on your API key in Credentials
2. Under **Application restrictions**:
   - Select **"HTTP referrers (web sites)"**
   - Add: `localhost:3000`
   - Add: `localhost:5000`
3. Under **API restrictions**:
   - Select **"Maps JavaScript API"**
   - Add other APIs you enabled
4. Click **"Save"**

### Step 5: Update Frontend .env.local
Edit `frontend/.env.local`:

```env
VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
VITE_BACKEND_URL=http://localhost:5000
```

### Step 6: Restart Frontend
```powershell
cd frontend
npm run dev
```

The map should now display on the MapView tab.

---

## 3. 📸 Cloudinary Setup (Image Hosting)

Cloudinary is used for storing and optimizing waste report images.

### Step 1: Create Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com/)
2. Click **"Sign Up"** (Free tier available)
3. Choose **"Node.js"** as your platform
4. Complete registration

### Step 2: Get Credentials
1. Log in to [Cloudinary Dashboard](https://cloudinary.com/console)
2. You'll see your **API Credentials** at the top:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### Step 3: Update Backend .env File
Edit `backend/.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 4: Restart Backend
```powershell
cd backend
npm run dev
```

Look for: ✅ Cloudinary initialized successfully

---

## 📋 Complete .env Configuration

### `backend/.env`
```env
# Firebase Configuration
FIREBASE_PROJECT_ID=cleancity-xxxxx
FIREBASE_PRIVATE_KEY_ID=key123456
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@cleancity-xxxxx.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=123456789012345678901
FIREBASE_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40cleancity-xxxxx.iam.gserviceaccount.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abc_def_ghi_jkl_mno

# Server Configuration
PORT=5000
NODE_ENV=development
```

### `frontend/.env.local`
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=AIzaSyD123456789ABCDEFGHIJKLMNOP
```

---

## 🧪 Testing APIs

### Test Firebase Connection
```bash
# Backend should show:
# ✅ Firebase initialized successfully
```

### Test Google Maps
1. Open frontend: `http://localhost:3000`
2. Click on the 🗺️ **Map** tab
3. You should see an interactive map

### Test Cloudinary
1. Go to **Upload Report** tab
2. Upload an image
3. Check Cloudinary Dashboard to see uploaded images

### Test Backend APIs
```powershell
# Health check
curl http://localhost:5000/api/health

# Get all reports
curl http://localhost:5000/api/reports

# Upload a report
curl -X POST http://localhost:5000/api/reports/submit `
  -H "Content-Type: application/json" `
  -d '{
    "wasteType": "plastic",
    "severity": "high",
    "location": {"latitude": 28.6139, "longitude": 77.2090},
    "description": "Plastic waste near park"
  }'
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` files to Git**
   - Add to `.gitignore`
   ```
   .env
   .env.local
   ```

2. **Use environment-specific keys**
   - Different keys for development/production

3. **Rotate API keys regularly**
   - Firebase: Generate new ones in Service Accounts
   - Google Maps: Regenerate in Credentials
   - Cloudinary: In Account Settings

4. **Restrict API keys by domain/referrer**
   - Only allow your app's URLs

5. **Monitor usage**
   - Firebase: Check quotas in usage dashboard
   - Google Maps: Monitor API calls in console
   - Cloudinary: Check upload limits

---

## 🆘 Troubleshooting

### Firebase not connecting?
```
Error: Failed to parse private key
Solution: Ensure newlines in FIREBASE_PRIVATE_KEY are actual \n characters
```

### Google Maps blank?
```
Error: No API key
Solution: Restart frontend after updating .env.local
```

### Cloudinary uploads failing?
```
Error: Unauthorized
Solution: Check API key and secret in backend/.env
```

### Port already in use?
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <pid> /F
```

---

## 📞 Support Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Maps API Docs](https://developers.google.com/maps)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [CleanCity GitHub](https://github.com/your-repo)

---

## ✅ Verification Checklist

- [ ] Firebase project created and Firestore enabled
- [ ] Service account credentials downloaded
- [ ] Backend `.env` updated with Firebase credentials
- [ ] Google Maps API enabled and API key created
- [ ] Frontend `.env.local` updated with Maps API key
- [ ] Cloudinary account created and API credentials obtained
- [ ] Backend `.env` updated with Cloudinary credentials
- [ ] Backend restarted and shows "Firebase initialized successfully"
- [ ] Frontend restarted and map displays
- [ ] Test upload: Image appears in Cloudinary Dashboard
- [ ] Test report: Data appears in Firebase Firestore

All set! Your CleanCity app is now fully connected to all APIs! 🎉
