import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUpload from './components/ImageUpload';
import ReportsList from './components/ReportsList';
import MapView from './components/MapView';
import Statistics from './components/Statistics';
import LeaderboardWidget from './components/LeaderboardWidget';
import Functionalities from './pages/functionalities';
import ImpactPage from './pages/impact';
import './index.css';

export default function App() {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('userPoints');
    return saved ? parseInt(saved) : 0;
  });

  const [newReport, setNewReport] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [particleCount] = useState(30);

  // Save points to localStorage
  useEffect(() => {
    localStorage.setItem('userPoints', points.toString());
  }, [points]);

  const handlePointsEarned = (pointsAmount) => {
    setPoints(prev => prev + pointsAmount);
    setCelebrationActive(true);
    setTimeout(() => setCelebrationActive(false), 1500);
  };

  const handleReportSubmitted = (report) => {
    setNewReport(report);
    setActiveTab('reports');
  };

  const tabs = [
    { id: 'upload', icon: '📸', label: 'Upload Report' },
    { id: 'reports', icon: '📋', label: 'Reports' },
    { id: 'map', icon: '🗺️', label: 'Map View' },
    { id: 'stats', icon: '📊', label: 'Statistics' },
    { id: 'features', icon: '✨', label: 'Features' },
    { id: 'impact', icon: '🌍', label: 'Impact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex flex-col overflow-hidden">
      {/* Animated background particles - Enhanced vibrant colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(particleCount)].map((_, i) => {
          const colors = ['bg-cyan-400', 'bg-fuchsia-400', 'bg-lime-400', 'bg-rose-400', 'bg-violet-400'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className={`absolute w-1 h-1 ${randomColor} rounded-full animate-float opacity-50`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          );
        })}
      </div>

      {/* Gradient orbs - Enhanced vibrant */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      <div className="fixed bottom-0 left-1/2 w-96 h-96 bg-lime-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>

      <Header points={points} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 relative z-10">
        {/* Enhanced Tab Navigation */}
        <div className="mb-12 relative">
          {/* Tab background with vibrant gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-lime-500/10 rounded-2xl border border-cyan-400/20 backdrop-blur-sm hover:border-fuchsia-400/40 transition-all"></div>
          
          <div className="relative p-2 flex gap-2 flex-wrap">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 transform group overflow-hidden ${
                  activeTab === tab.id
                    ? 'text-white shadow-2xl'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{
                  animation: `slideUp 0.5s ease-out ${idx * 0.1}s both`
                }}
              >
                {/* Active tab background - Enhanced vibrant */}
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 -z-10 rounded-xl shadow-lg shadow-cyan-500/50"></div>
                )}

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-fuchsia-400 -z-10 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>

                {/* Content */}
                <span className="relative flex items-center gap-2">
                  <span className="text-xl group-hover:scale-110 transition-transform drop-shadow-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>

                {/* Active indicator line */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lime-300 via-cyan-300 to-fuchsia-300 animate-pulse shadow-lg shadow-lime-500/50"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections with smooth transitions */}
        <div className="relative">
          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slideUp">
              <div className="lg:col-span-2">
                <ImageUpload 
                  onReportSubmit={handleReportSubmitted}
                  onPointsEarned={handlePointsEarned}
                />
              </div>
              <div className="hidden lg:block">
                <LeaderboardWidget />
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="animate-slideUp">
              <ReportsList key={newReport?.id} />
            </div>
          )}

          {/* Map Tab */}
          {activeTab === 'map' && (
            <div className="animate-slideUp">
              <MapView key={newReport?.id} />
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'stats' && (
            <div className="animate-slideUp">
              <Statistics />
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="animate-slideUp">
              <Functionalities />
            </div>
          )}

          {/* Impact Tab */}
          {activeTab === 'impact' && (
            <div className="animate-slideUp">
              <ImpactPage />
            </div>
          )}
        </div>

        {/* Floating Action Button - Quick Report */}
        <button
          onClick={() => setActiveTab('upload')}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all transform flex items-center justify-center text-2xl group z-50"
        >
          <span className="animate-bounce">🚀</span>
          <div className="absolute inset-0 rounded-full border-2 border-purple-400 opacity-0 group-hover:opacity-100 animate-pulse"></div>
        </button>
      </main>

      {/* Celebration particles */}
      {celebrationActive && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-confetti"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 0.3}s`
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}

      <Footer />

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
