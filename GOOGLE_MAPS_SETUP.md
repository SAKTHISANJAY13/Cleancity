# GOOGLE MAPS API SETUP GUIDE

## 1️⃣ Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. At the top, click the project dropdown
3. Click **"New Project"**
4. Name: `CleanCity` or `Waste-Reporting`
5. Click **"Create"**
6. Wait for project to be created

---

## 2️⃣ Enable Maps JavaScript API

### Step A: Search for Maps API
1. In Google Cloud Console, search for **"Maps JavaScript API"**
2. Click the first result
3. Click **"Enable"**
4. Wait for API to be enabled

### Step B: Enable Additional APIs (Optional but recommended)
Also enable:
- **Maps Embed API** - for embedding maps
- **Latitude/Longitude API** - for geocoding

1. Search for each API
2. Click "Enable"

---

## 3️⃣ Create API Key

### Step A: Go to Credentials
1. In Google Cloud Console, click **"APIs and Services"** (left menu)
2. Click **"Credentials"**
3. Click **"Create Credentials"** (top button)
4. Select **"API Key"**
5. Your API key will appear (save it)

### Step B: Example
```
API Key: AIzaSyXXXXXXXXX-XXXXXXXXXXXXX-XXXXX
```

---

## 4️⃣ Add API Key Restrictions (Important!)

### Step A: Restrict Key to Web
1. Click on the API key you just created
2. Under **"Application restrictions"**, select **"Website"**
3. Click **"Add an HTTP referrer"**
4. Add these URLs:
   - `localhost:3000/*`
   - `localhost:5173/*`
   - `http://localhost:3000`
   - `http://localhost:5173`

### Step B: Restrict to Maps APIs Only
1. Under **"API restrictions"**, select **"Restrict key"**
2. Select only **"Maps JavaScript API"**
3. Click **"Save"**

---

## 5️⃣ Add to Frontend .env

In `frontend/.env.local`:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXX-XXXXXXXXXXXXX-XXXXX
```

---

## 6️⃣ Test in Frontend

1. Start frontend:
```bash
cd frontend
npm run dev
```

2. Go to **"Map View"** tab in app
3. Map should load with markers

If map doesn't load:
- Check API key in console errors
- Verify API key is correct in .env.local
- Check Maps JavaScript API is enabled in Google Cloud
- Clear browser cache

---

## 🌍 Map Features Explained

### Markers
- Red markers show waste report locations
- Click marker to see details
- Image, waste type, severity, date

### Info Window
- Pops up when you click a marker
- Shows report photo and details
- Click X to close

### Default Center
- Centered on India (20.5937, 78.9629)
- User can pan and zoom freely

---

## 🔒 Security: API Key Best Practices

### For MVP (OK)
- Restrict to localhost during development
- Keep API key in .env file

### For Production (Important!)
1. **Add domain restrictions:**
   - `yourdomain.com`
   - `www.yourdomain.com`
   - `app.yourdomain.com`

2. **Enable Maps APIs only:**
   - Maps JavaScript API
   - Disable all others

3. **Monitor usage:**
   - Google Cloud → Billing
   - Set budget alerts
   - Track API usage

---

## 💰 Costs and Quotas

### Free Tier Benefits (2024)
- **Free usage:** $200 credit/month
- **95% of usage is free** for typical apps
- Pay-as-you-go after free tier

### Typical Costs
- Per 1000 map loads: ~$2
- Per request: ~$0.005
- Very affordable for MVP

### Set up Billing (Recommended)
1. Google Cloud Console → Billing
2. Link a credit card
3. Enable Maps APIs
4. Set budget alerts

---

## 🧪 Test Map Integration

### Via Browser Console
```javascript
// Test if Maps API loaded
console.log(typeof google.maps);
// Should output: "object"

// Test if Maps library is available
const map = new google.maps.Map(element, options);
// Should create map without errors
```

### In App
1. Go to "Map View" tab
2. Should show interactive map
3. Markers should appear for any reports
4. Click markers to see details

---

## 📍 Using Real Geolocation in Maps

The app uses browser geolocation API:
```javascript
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  // Used to attach location to waste reports
});
```

This works on:
- ✅ Desktop (if location enabled)
- ✅ Mobile (requires HTTPS in production)
- ✅ Emulators

---

## ✅ Google Maps API Setup Checklist

- [ ] Google Cloud project created
- [ ] Maps JavaScript API enabled
- [ ] API key created
- [ ] API key restricted to website
- [ ] API key restricted to Maps APIs only
- [ ] API key added to .env.local
- [ ] Frontend restarted
- [ ] Map loads in app
- [ ] Markers appear for reports
- [ ] Info windows show on click

**Google Maps API setup complete! 🎉**

All three services (Firebase, Cloudinary, Google Maps) are now configured!
