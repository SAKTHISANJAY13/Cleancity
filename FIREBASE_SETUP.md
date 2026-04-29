# FIREBASE SETUP GUIDE - Complete Step-by-Step

## 1️⃣ Create Firebase Project

### Step A: Go to Firebase Console
1. Open https://console.firebase.google.com/
2. Click **"Add Project"** or **"Create Project"**
3. Project name: `cleancity` (or your preferred name)
4. Leave Google Analytics unchecked for MVP
5. Click **"Create Project"**
6. Wait for project creation (2-3 minutes)

### Step B: Note Your Project ID
- From dashboard, look for project name showing on top left
- This is your `FIREBASE_PROJECT_ID`

---

## 2️⃣ Create Firestore Database

1. From Firebase Dashboard, click **"Firestore Database"** (left menu)
2. Click **"Create Database"**
3. Select **"Start in test mode"** (for development/MVP)
   - ⚠️ _Important: Switch to production mode before deploying to production_
4. Select your region (choose closest to you)
5. Click **"Enable"**
6. Wait for database creation

### Important: Test Mode Rules (for MVP only)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

For production, change to:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reports/{document=**} {
      allow read: if true;
      allow write: if true;  // Add auth check here later
    }
  }
}
```

---

## 3️⃣ Get Firebase Admin SDK Credentials

### Step A: Generate Service Account Key
1. Click **⚙️ Settings** (gear icon, top right)
2. Go to **"Project settings"**
3. Click on **"Service Accounts"** tab
4. Make sure **"Firebase Admin SDK"** is selected
5. Click **"Generate new private key"**
6. A JSON file will download. **SAVE IT SAFELY!**

### Step B: Extract Credentials from JSON File

The downloaded JSON file looks like this:
```json
{
  "type": "service_account",
  "project_id": "cleancity-xxxxx",
  "private_key_id": "abc123def456...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@cleancity-xxxxx.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40cleancity-xxxxx.iam.gserviceaccount.com"
}
```

Copy these values:
- `project_id` → `FIREBASE_PROJECT_ID`
- `private_key_id` → `FIREBASE_PRIVATE_KEY_ID`
- `private_key` → `FIREBASE_PRIVATE_KEY` (**entire string with \n**)
- `client_email` → `FIREBASE_CLIENT_EMAIL`
- `client_id` → `FIREBASE_CLIENT_ID`
- `client_x509_cert_url` → `FIREBASE_CERT_URL`

---

## 4️⃣ Setup Backend .env File

In `backend/.env`, add:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=cleancity-xxxxx
FIREBASE_PRIVATE_KEY_ID=abc123def456...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAkEA...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@cleancity-xxxxx.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=123456789
FIREBASE_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40cleancity-xxxxx.iam.gserviceaccount.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abc_def_ghi_jkl

# Server
PORT=5000
NODE_ENV=development
```

### ⚠️ Important Note about FIREBASE_PRIVATE_KEY
The private key spans multiple lines. When adding to .env, you must:
1. Keep the entire key on one line OR
2. Use actual newlines with \ escaping

**Example (spaces shown as ~ for clarity):**
```
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...==\n-----END PRIVATE KEY-----\n"
```

The Node.js config will automatically convert `\n` to actual newlines.

---

## 5️⃣ Verify Firebase Connection

In `backend/server.js`, restart the server:

```bash
cd backend
npm run dev
```

Look for:
```
✅ Firebase initialized successfully
```

If you see ❌, check:
- All env variables are correct
- Private key has proper escaping
- JSON file wasn't truncated when copying

---

## 6️⃣ Create Firestore Collections (Optional for MVP)

Firebase auto-creates collections when you add documents. But you can pre-create:

1. Go to Firestore Database
2. Click **"Start Collection"**
3. Name it: `reports`
4. Click **"Auto-generate ID"** for document ID
5. Add a sample document:
   ```
   {
     "imageUrl": "https://example.com/image.jpg",
     "wasteType": "plastic",
     "severity": "medium",
     "location": {
       "latitude": 40.7128,
       "longitude": -74.0060
     },
     "timestamp": new Date().getTime(),
     "status": "open",
     "upvotes": 0
   }
   ```

---

## 🧪 Test Firebase Connection

### Using Backend API:

```bash
curl http://localhost:5000/api/reports
```

Expected response:
```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

If you added the sample document:
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "imageUrl": "...",
      "wasteType": "plastic",
      ...
    }
  ],
  "count": 1
}
```

---

## 🔒 Security Rules (Don't Forget!)

### For MVP (Test Mode - Current)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### For Production (with User Auth)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reports/{reportId} {
      // Anyone can read reports
      allow read: if request.auth != null || true;
      
      // Only authenticated users can create
      allow create: if request.auth != null;
      
      // Users can only edit/delete their own
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 📋 Troubleshooting Firebase Setup

### Error: "FIREBASE_PRIVATE_KEY not valid"
**Solution:**
- Ensure the key starts with `-----BEGIN PRIVATE KEY-----`
- Ensure it ends with `-----END PRIVATE KEY-----`
- Check that `\n` is properly escaped
- Don't wrap the entire key in quotes again

### Error: "Project ID mismatch"
**Solution:**
- Verify FIREBASE_PROJECT_ID matches your Firebase project
- Check for extra spaces or typos

### Error: "Permission denied" when writing
**Solution:**
- Check Firestore rules are in TEST mode
- Restart backend server after rule changes
- Clear browser cache and localStorage

### Firestore Database Not Showing
**Solution:**
- Check if you're in the right Firebase project
- Click "Create Database" if it doesn't exist
- Make sure you're in the correct region

---

## ✅ Firebase Setup Checklist

- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] Service account key downloaded
- [ ] FIREBASE_PROJECT_ID added to .env
- [ ] FIREBASE_PRIVATE_KEY added to .env
- [ ] FIREBASE_CLIENT_EMAIL added to .env
- [ ] Other Firebase credentials added
- [ ] Backend server starts without ❌ errors
- [ ] Can fetch reports via API
- [ ] Security rules set to test mode

**You're done with Firebase setup! 🎉**

Next: Set up Cloudinary and Google Maps API
