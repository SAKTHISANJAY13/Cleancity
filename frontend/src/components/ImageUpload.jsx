import React, { useState, useRef } from 'react';
import { uploadImage, submitReport } from '../api';
import { getCurrentLocation } from '../services/locationService';
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';

export default function ImageUpload({ onReportSubmit, onPointsEarned }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detection, setDetection] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      toast.error('❌ File size must be less than 5MB');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);

    // Upload and detect
    setLoading(true);
    setProgress(0);
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return 90;
          return prev + Math.random() * 30;
        });
      }, 200);

      const uploadResult = await uploadImage(file);
      clearInterval(progressInterval);
      setProgress(100);
      
      if (uploadResult.success) {
        setDetection(uploadResult.data);
        toast.success('🖼️ Image analyzed - Waste type detected!');
        setTimeout(() => setProgress(0), 500);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('❌ Failed to upload image');
      setPreview(null);
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = async () => {
    try {
      setLoading(true);
      const loc = await getCurrentLocation();
      setLocation(loc);
      toast.success('📍 Location captured!');
    } catch (error) {
      console.error('Location error:', error);
      toast.error('❌ Could not get location. Please enable location services.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReport = async () => {
    if (!detection || !location) {
      toast.error('⚠️ Please upload image and capture location');
      return;
    }

    setLoading(true);
    try {
      const reportData = {
        imageUrl: detection.imageUrl,
        wasteType: detection.wasteType,
        severity: detection.severity,
        latitude: location.latitude,
        longitude: location.longitude,
        description: description
      };

      const result = await submitReport(reportData);
      
      if (result.success) {
        toast.success('✅ Report submitted successfully!');
        onPointsEarned(10); // Award points
        onReportSubmit(result.data);
        
        // Reset form
        setPreview(null);
        setDetection(null);
        setLocation(null);
        setDescription('');
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('❌ Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-2xl p-8 animate-slideUp elevated-card border border-cyan-200/50 hover:border-fuchsia-200/50 transition-all">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500">
          📸 Report Waste & Earn Rewards
        </h2>
        <p className="text-slate-600 text-sm">Help keep our cities clean by reporting waste issues</p>
      </div>

      {/* Image Preview */}
      {preview && (
        <div className="mb-8 relative group">
          <div className="relative overflow-hidden rounded-xl border-4 border-cyan-300 bg-gray-100 shadow-lg shadow-cyan-500/30">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Remove Button */}
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all"
            >
              ✕
            </button>

            {/* Image Info */}
            <div className="absolute bottom-3 left-3 text-white text-sm font-semibold bg-gradient-to-r from-cyan-600/80 to-fuchsia-600/80 px-3 py-2 rounded-full backdrop-blur-sm">
              ✓ Image Ready
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="mb-8">
        <label className="block">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            disabled={loading}
            className="hidden"
          />
          <div className="relative overflow-hidden rounded-xl cursor-pointer group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-lime-600 group-hover:from-cyan-700 group-hover:via-fuchsia-700 group-hover:to-lime-700 transition-all duration-300 shadow-lg shadow-cyan-500/50"></div>
            <div className="relative bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 text-white p-6 text-center font-bold text-lg transform group-hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <Oval height={24} width={24} color="white" secondaryColor="white" />
                  <span>⏳ Processing Image...</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">📤</span>
                  <span>Choose Image or Drag & Drop</span>
                </>
              )}
            </div>
          </div>
        </label>

        {/* Progress Bar - Enhanced */}
        {progress > 0 && progress < 100 && (
          <div className="mt-3 bg-gray-200 rounded-full h-3 overflow-hidden shadow-md">
            <div 
              className="bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 h-full transition-all duration-300 shadow-lg shadow-fuchsia-500/50"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* AI Detection Result */}
      {detection && (
        <div className="mb-8 relative overflow-hidden rounded-xl animate-scaleIn">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-fuchsia-50"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-lime-400 opacity-30 blur group-hover:opacity-50 transition duration-1000 shadow-lg"></div>
          
          <div className="relative p-6 border-2 border-cyan-300 bg-white/90 backdrop-blur-sm">
            <h3 className="font-bold text-xl mb-4 text-slate-800 flex items-center gap-2">
              <span className="text-2xl">🤖</span> AI Analysis Result
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border-2 border-cyan-300 text-center hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-2">WASTE TYPE</p>
                <p className="font-bold text-xl text-cyan-600 capitalize">{detection.wasteType}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-fuchsia-300 text-center hover:shadow-lg hover:shadow-fuchsia-500/50 transition-all">
                <p className="text-xs font-bold text-fuchsia-600 uppercase tracking-wider mb-2">SEVERITY</p>
                <p className={`font-bold text-xl capitalize ${
                  detection.severity === 'high' ? 'text-rose-600' : 
                  detection.severity === 'medium' ? 'text-amber-600' : 
                  'text-lime-600'
                }`}>
                  {detection.severity}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-lime-300 text-center hover:shadow-lg hover:shadow-lime-500/50 transition-all">
                <p className="text-xs font-bold text-lime-600 uppercase tracking-wider mb-2">CONFIDENCE</p>
                <p className="font-bold text-xl text-lime-600">{(detection.confidence * 100).toFixed(0)}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location */}
      {location && (
        <div className="mb-8 p-6 bg-gradient-to-r from-lime-100 to-cyan-100 rounded-xl border-2 border-lime-400 animate-slideIn shadow-md shadow-lime-500/30">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-bold text-lime-900">Location Captured</p>
              <p className="text-sm text-lime-700 font-mono">
                {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
              </p>
            </div>
            <div className="ml-auto">
              <span className="inline-block bg-gradient-to-r from-lime-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">✓ Verified</span>
            </div>
          </div>
        </div>
      )}

      {/* Location Button */}
      <div className="mb-8">
        <button
          onClick={handleGetLocation}
          disabled={loading}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg ${
            location 
              ? 'bg-gradient-to-r from-lime-500 to-cyan-500 text-white shadow-lg shadow-lime-500/50' 
              : 'bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white hover:shadow-lg hover:shadow-fuchsia-500/50'
          }`}
        >
          {location ? (
            <>
              <span className="text-xl">✓</span>
              <span>Location Captured</span>
            </>
          ) : (
            <>
              <span className="text-xl">📍</span>
              <span>Capture Location</span>
            </>
          )}
        </button>
      </div>

      {/* Description */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <span>📝</span>
          <span>Additional Details <span className="text-slate-400 font-normal">(Optional)</span></span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the waste condition, hazards, accessibility for cleanup, or any other important details..."
          className="w-full p-4 border-2 border-cyan-300 rounded-xl focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 transition-all resize-none bg-white/50 backdrop-blur-sm"
          rows="4"
        />
        <p className="text-xs text-slate-500 mt-2">
          ✓ Tip: Detailed descriptions help authorities respond faster!
        </p>
      </div>

      {/* Submit Button */}
      {detection && location && (
        <div className="space-y-4">
          <button
            onClick={handleSubmitReport}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 hover:from-cyan-600 hover:via-fuchsia-600 hover:to-lime-600 text-white font-bold py-4 px-6 rounded-xl transform hover:scale-105 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-lg shadow-lg shadow-cyan-500/50"
          >
            {loading ? (
              <>
                <Oval height={24} width={24} color="white" secondaryColor="white" />
                <span>Submitting Report...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Submit Report & Earn 10 Points</span>
              </>
            )}
          </button>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-700">
              <span className="font-bold">⭐ +10 Points</span> will be added to your rewards!
            </p>
          </div>
        </div>
      )}

      {/* Disabled state message */}
      {(!detection || !location) && (detection || location) && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-center">
          <p className="text-sm text-amber-700">
            {!detection && !location && '📤 Upload image & 📍 capture location to submit'}
            {detection && !location && '📍 Capture your location to enable submission'}
            {!detection && location && '📤 Upload an image to enable submission'}
          </p>
        </div>
      )}
    </div>
  );
}
