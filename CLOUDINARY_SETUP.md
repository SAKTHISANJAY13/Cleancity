# CLOUDINARY SETUP GUIDE

## 1️⃣ Create Cloudinary Account

1. Go to [Cloudinary.com](https://cloudinary.com/)
2. Click **"Sign Up"** (free tier is sufficient)
3. Enter email and create account
4. Verify email
5. Complete signup

---

## 2️⃣ Get Your Credentials

### Step A: Dashboard
1. Login to Cloudinary
2. You'll see your **Account Details** on dashboard
3. Copy these values:
   - **Cloud Name** (large text at top)
   - **API Key** (under Environment variable)
   - **API Secret** (next to API Key)

### Step B: Example
```
Cloud Name: mycloudinary
API Key: 123456789012345
API Secret: abc-def-ghi-jkl-xyz
```

---

## 3️⃣ Add to Backend .env

In `backend/.env`:

```env
CLOUDINARY_CLOUD_NAME=mycloudinary
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abc-def-ghi-jkl-xyz
```

---

## 4️⃣ Test Cloudinary Upload

1. Start backend server:
```bash
cd backend
npm run dev
```

2. Use curl to test upload:
```bash
curl -X POST http://localhost:5000/api/upload \
  -F "image=@/path/to/image.jpg"
```

Expected response:
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "imageUrl": "https://res.cloudinary.com/...",
    "publicId": "cleancity-reports/...",
    "wasteType": "plastic",
    "severity": "medium",
    "confidence": "0.85"
  }
}
```

---

## 5️⃣ Storage Folder Organization (Optional)

All images will be uploaded to `cleancity-reports/` folder automatically.

To see uploaded images in Cloudinary:
1. Login to Cloudinary dashboard
2. Click **"Media Library"**
3. Navigate to **"cleancity-reports"** folder
4. See all uploaded images

---

## 🔒 Security Best Practices

### For MVP (OK)
- Keep API Secret safe
- Don't expose in frontend code

### For Production
1. **Create Upload Preset** (unsigned)
   - Cloudinary Dashboard → Settings → Upload
   - Create preset without authentication
   - Use preset name in frontend instead of API key

2. **Frontend Upload** (recommended)
   ```javascript
   // Instead of uploading via backend
   // Upload directly from frontend using unsigned preset
   const widget = cloudinary.createUploadWidget(
     { uploadPreset: 'your_unsigned_preset' },
     (error, result) => { ... }
   );
   ```

---

## 📊 Monitoring Uploads

### Check Upload Limits
- Free tier: 10 GB storage, 20GB bandwidth/month
- Monitor in Cloudinary dashboard

### See All Uploads
- Cloudinary → Media Library
- Filter by folder: `cleancity-reports`
- Sort by date uploaded

---

## ✅ Cloudinary Setup Checklist

- [ ] Cloudinary account created
- [ ] Cloud Name copied
- [ ] API Key copied
- [ ] API Secret copied
- [ ] .env file updated
- [ ] Backend server restarted
- [ ] Test upload successful
- [ ] Image appears in Media Library

**Cloudinary setup complete! 🎉**

Next: Set up Google Maps API
