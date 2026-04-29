import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Functionalities = () => {
  const [expandedFeature, setExpandedFeature] = useState(0);

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Waste Detection',
      description: 'Intelligent waste classification system',
      benefits: [
        'Automatically detects waste types: plastic, organic, metal, paper, glass, mixed',
        'Provides severity assessment: low, medium, high',
        'Calculates confidence scores for accuracy tracking',
        'Real-time analysis of uploaded images'
      ],
      usage: 'Upload an image of waste and our AI instantly analyzes it to categorize the waste type and severity.'
    },
    {
      icon: '🎮',
      title: 'Gamified Reward System',
      description: 'Earn points and climb the leaderboard',
      benefits: [
        'Earn 10 points for each waste report submitted',
        'Track your total points in real-time',
        'Compete with other community members on the leaderboard',
        'Unlock achievement levels: Waste Warrior → Environmental Hero',
        'Monthly challenges with bonus rewards'
      ],
      usage: 'Every report you submit earns you points. More reports = higher ranking on the leaderboard!'
    },
    {
      icon: '📍',
      title: 'Location-Based Reporting',
      description: 'Geolocation-powered reporting system',
      benefits: [
        'Automatic browser geolocation capture',
        'All reports plotted on interactive Google Map',
        'Filter reports by specific locations and waste types',
        'Neighborhood-level cleanup initiatives tracking',
        'Identify waste hotspots in your area'
      ],
      usage: 'Your location is automatically captured when you submit a report. View all reports on the map.'
    },
    {
      icon: '📊',
      title: 'Real-Time Dashboard & Statistics',
      description: 'Community insights at a glance',
      benefits: [
        'Live statistics showing waste distribution by type',
        'Weekly reporting trends and patterns',
        'Interactive charts and graphs',
        'Total waste reports and community impact metrics',
        'Most reported areas visualization'
      ],
      usage: 'Visit the Statistics tab to see community insights, trends, and waste distribution patterns.'
    },
    {
      icon: '🗺️',
      title: 'Interactive Map View',
      description: 'Visual waste location tracking',
      benefits: [
        'Google Maps integration showing all reported locations',
        'Clustered markers for easier viewing',
        'Filter by waste type and date range',
        'Click markers to see detailed report information',
        'Identify cleanup priorities by visual density'
      ],
      usage: 'Open the Map View tab to see all waste reports plotted on an interactive map with detailed info.'
    },
    {
      icon: '👥',
      title: 'Community Leaderboard',
      description: 'Recognize top contributors',
      benefits: [
        'Display top contributors based on reports submitted',
        'Show user rankings and point totals',
        'Monthly leaderboard reset for fairness',
        'Encourage healthy competition and engagement',
        'Celebrate environmental heroes in the community'
      ],
      usage: 'View the leaderboard to see top reporters and track your progress against other members.'
    },
    {
      icon: '✅',
      title: 'Report Validation System',
      description: 'Community verification mechanism',
      benefits: [
        'Upvote reports you confirm are accurate',
        'Downvote reports that seem incorrect',
        'Build community trust through validation',
        'Accurate reports ranked higher in visibility',
        'Ensure data quality through crowdsourcing'
      ],
      usage: 'Vote on reports to validate accuracy and help prioritize legitimate waste issues.'
    },
    {
      icon: '📱',
      title: 'Responsive Mobile Design',
      description: 'Works seamlessly on all devices',
      benefits: [
        'Fully responsive UI optimized for mobile, tablet, and desktop',
        'Touch-friendly interface for on-the-go reporting',
        'Fast load times even on slower connections',
        'Offline-ready with service worker support',
        'Progressive Web App capabilities'
      ],
      usage: 'Report waste anytime, anywhere using your smartphone or any device with a browser.'
    },
    {
      icon: '💾',
      title: 'Data Persistence',
      description: 'Your progress is saved automatically',
      benefits: [
        'LocalStorage keeps your points and data safe',
        'Session management for user tracking',
        'No data loss between sessions',
        'Automatic sync with backend',
        'Secure authentication and data handling'
      ],
      usage: 'Your points and preferences are automatically saved, so you can pick up where you left off.'
    },
    {
      icon: '🎨',
      title: 'Beautiful UI/UX',
      description: 'Modern and engaging design',
      benefits: [
        'Gradient backgrounds and smooth animations',
        'Intuitive tab-based navigation',
        'Real-time celebration effects on points earned',
        'Smooth transitions and interactions',
        'Accessibility-first design principles'
      ],
      usage: 'Enjoy a modern, visually appealing interface that makes reporting waste fun and engaging.'
    }
  ];

  const stats = [
    { label: 'Features', value: '10+' },
    { label: 'Max Points Per Report', value: '10' },
    { label: 'Supported Waste Types', value: '6' },
    { label: 'Map Integration', value: 'Google Maps' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const colors = ['bg-cyan-400', 'bg-fuchsia-400', 'bg-lime-400', 'bg-rose-400', 'bg-violet-400'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className={`absolute w-1 h-1 ${randomColor} rounded-full animate-float opacity-30`}
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

      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
      <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      <div className="fixed bottom-0 left-1/2 w-96 h-96 bg-lime-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-lime-400 bg-clip-text text-transparent mb-4">
            CleanCity Functionalities
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover all the powerful features that make CleanCity your go-to platform for environmental reporting and community engagement.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border border-cyan-400/20 rounded-xl p-6 text-center hover:border-fuchsia-400/40 transition-all"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="text-cyan-400">✨</span> All Features
          </h2>

          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-cyan-500/5 via-fuchsia-500/5 to-lime-500/5 border border-cyan-400/20 rounded-xl overflow-hidden hover:border-fuchsia-400/40 transition-all"
            >
              <button
                onClick={() => setExpandedFeature(expandedFeature === idx ? -1 : idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-cyan-500/5 transition-colors"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="text-4xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                  </div>
                </div>
                <ChevronDown
                  size={24}
                  className={`text-cyan-400 transition-transform ${
                    expandedFeature === idx ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {/* Expanded Content */}
              {expandedFeature === idx && (
                <div className="px-6 pb-6 border-t border-cyan-400/10">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-cyan-300 mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3 text-gray-300">
                            <span className="text-lime-400 mt-1">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-fuchsia-300 mb-2">How to Use:</h4>
                      <p className="text-gray-300 bg-black/30 p-4 rounded-lg border border-fuchsia-400/20">
                        {feature.usage}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-lime-500/20 border border-cyan-400/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Make a Difference?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our community of environmental heroes. Start reporting waste, earn points, climb the leaderboard, and help keep your neighborhood clean!
          </p>
          <button className="bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105">
            Start Reporting Now
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>CleanCity - Powered by AI, Driven by Community 🌍</p>
        </div>
      </div>
    </div>
  );
};

export default Functionalities;
