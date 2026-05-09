import React, { useState } from 'react';
import { ChevronDown, Zap, Award, Users, Smartphone, Lock, Palette, Cloud } from 'lucide-react';

const Functionalities = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-5xl animate-bounce">✨</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-lime-400 bg-clip-text text-transparent mb-6">
            CleanCity Features
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore powerful AI-driven tools and community features that make environmental reporting accessible, engaging, and impactful.
          </p>
        </div>

        {/* Quick Stats - Enhanced */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border border-cyan-400/30 rounded-2xl p-8 text-center hover:border-fuchsia-400/60 transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-lime-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent mb-3 animate-pulse">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-base font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-12 bg-gradient-to-b from-cyan-400 to-fuchsia-400 rounded-full"></div>
            <h2 className="text-4xl font-bold text-white">Core Features</h2>
            <div className="flex-1 h-1 bg-gradient-to-r from-fuchsia-400 to-transparent rounded-full"></div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {features.slice(0, 6).map((feature, idx) => (
              <div
                key={idx}
                className="group relative h-full"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-fuchsia-500/30 to-lime-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative h-full bg-gradient-to-br from-slate-900/80 via-indigo-900/80 to-slate-900/80 border border-cyan-400/20 rounded-2xl p-8 backdrop-blur-sm hover:border-fuchsia-400/50 transition-all duration-300">
                  {/* Icon Section */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-6xl transform group-hover:scale-125 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div className="hidden group-hover:block">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full opacity-20"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm mb-6">{feature.description}</p>

                  {/* Quick benefits preview */}
                  <div className="flex flex-wrap gap-2">
                    {feature.benefits.slice(0, 2).map((benefit, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-xs bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 px-3 py-1 rounded-full"
                      >
                        {benefit.split(':')[0]}
                      </span>
                    ))}
                    {feature.benefits.length > 2 && (
                      <span className="text-xs bg-fuchsia-500/20 border border-fuchsia-400/40 text-fuchsia-300 px-3 py-1 rounded-full">
                        +{feature.benefits.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Learn more indicator */}
                  <div className="mt-6 flex items-center gap-2 text-cyan-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Expand to learn more</span>
                    <ChevronDown size={16} className="transform group-hover:translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Features Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-12 bg-gradient-to-b from-lime-400 to-cyan-400 rounded-full"></div>
            <h2 className="text-4xl font-bold text-white">All Features In Detail</h2>
            <div className="flex-1 h-1 bg-gradient-to-r from-lime-400 to-transparent rounded-full"></div>
          </div>

          <div className="space-y-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-r from-cyan-500/5 via-fuchsia-500/5 to-lime-500/5 border border-cyan-400/20 rounded-2xl overflow-hidden hover:border-fuchsia-400/40 transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFeature(expandedFeature === idx ? -1 : idx)}
                  className="w-full p-6 md:p-8 flex items-center justify-between hover:bg-cyan-500/5 transition-all duration-200"
                >
                  <div className="flex items-center gap-4 md:gap-6 text-left flex-1">
                    <div className="text-5xl flex-shrink-0 filter group-hover:drop-shadow-lg transition-all">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base mt-1">{feature.description}</p>
                    </div>
                  </div>
                  <ChevronDown
                    size={28}
                    className={`text-cyan-400 transition-all flex-shrink-0 ml-4 group-hover:text-fuchsia-400 ${
                      expandedFeature === idx ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded Content with smooth animation */}
                {expandedFeature === idx && (
                  <div className="px-6 md:px-8 pb-8 border-t border-cyan-400/10 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                          <Zap size={20} />
                          Key Benefits
                        </h4>
                        <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {feature.benefits.map((benefit, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-3 text-gray-300 p-3 rounded-lg bg-black/20 border border-cyan-400/10 hover:border-cyan-400/30 transition-all"
                            >
                              <span className="text-lime-400 mt-1 flex-shrink-0 text-lg">✓</span>
                              <span className="text-sm md:text-base">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-fuchsia-300 mb-3 flex items-center gap-2">
                          <Users size={20} />
                          How to Use
                        </h4>
                        <div className="bg-gradient-to-r from-fuchsia-500/10 to-rose-500/10 border border-fuchsia-400/20 p-6 rounded-xl text-gray-300 leading-relaxed">
                          {feature.usage}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Highlight Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-12 bg-gradient-to-b from-rose-400 to-fuchsia-400 rounded-full"></div>
            <h2 className="text-4xl font-bold text-white">Why Choose CleanCity?</h2>
            <div className="flex-1 h-1 bg-gradient-to-r from-rose-400 to-transparent rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl p-8 hover:border-cyan-400/60 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-cyan-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-white mb-3">Lightning Fast</h3>
                <p className="text-gray-300">Real-time AI analysis powered by cutting-edge machine learning models for instant waste classification.</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 border border-fuchsia-400/20 rounded-2xl p-8 hover:border-fuchsia-400/60 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-fuchsia-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold text-white mb-3">Community Driven</h3>
                <p className="text-gray-300">Join thousands of environmental heroes making a real difference in their neighborhoods.</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-lime-500/10 to-green-500/10 border border-lime-400/20 rounded-2xl p-8 hover:border-lime-400/60 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-lime-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-3">Easy to Use</h3>
                <p className="text-gray-300">Simple, intuitive interface that works on any device. Start reporting waste in seconds.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action - Enhanced */}
        <div className="mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-lime-500/20 rounded-3xl blur-2xl opacity-50"></div>
          <div className="relative bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-lime-500/20 border border-cyan-400/40 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Make a Difference? 🌱</h3>
              <p className="text-gray-200 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Join our community of environmental heroes. Start reporting waste, earn rewards, climb the leaderboard, and help keep your neighborhood clean!
              </p>
              <button className="group relative bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 text-white font-bold py-4 px-10 md:px-12 rounded-xl overflow-hidden text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50">
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  <span>🚀 Start Reporting Now</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-lime-500 via-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-400 text-sm md:text-base space-y-2">
          <p>🌍 CleanCity - Powered by AI, Driven by Community</p>
          <p className="text-xs text-gray-500">Making the world cleaner, one report at a time</p>
        </div>
      </div>
    </div>
  );
};

export default Functionalities;
