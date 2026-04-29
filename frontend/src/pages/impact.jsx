import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Leaf, Zap } from 'lucide-react';

const ImpactPage = () => {
  const [stats, setStats] = useState({
    totalReports: 1247,
    totalPoints: 12470,
    activeUsers: 384,
    wasteCollected: 5680,
    co2Saved: 12.5,
    treesPlanted: 45
  });

  const [animatedStats, setAnimatedStats] = useState({
    totalReports: 0,
    totalPoints: 0,
    activeUsers: 0,
    wasteCollected: 0
  });

  // Animate stats on load
  useEffect(() => {
    const animationDuration = 2000;
    const startTime = Date.now();

    const animateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setAnimatedStats({
        totalReports: Math.floor(stats.totalReports * progress),
        totalPoints: Math.floor(stats.totalPoints * progress),
        activeUsers: Math.floor(stats.activeUsers * progress),
        wasteCollected: Math.floor(stats.wasteCollected * progress)
      });

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };

    animateValue();
  }, [stats]);

  const impactMetrics = [
    {
      icon: '♻️',
      title: 'Waste Tracked',
      value: `${animatedStats.wasteCollected}+ kg`,
      description: 'Total waste reported and tracked',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🌍',
      title: 'CO₂ Prevented',
      value: `${stats.co2Saved.toFixed(1)} tons`,
      description: 'Carbon emissions prevented from landfills',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🌳',
      title: 'Trees Saved',
      value: `${stats.treesPlanted}+`,
      description: 'Equivalent trees preserved',
      color: 'from-lime-500 to-green-500'
    },
    {
      icon: '⚡',
      title: 'Energy Saved',
      value: '284 kWh',
      description: 'Energy equivalent saved through recycling',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const communityStats = [
    {
      label: 'Community Reports',
      value: `${animatedStats.totalReports}+`,
      icon: '📋',
      trend: '+23%'
    },
    {
      label: 'Points Earned',
      value: `${animatedStats.totalPoints.toLocaleString()}+`,
      icon: '⭐',
      trend: '+45%'
    },
    {
      label: 'Active Contributors',
      value: `${animatedStats.activeUsers}+`,
      icon: '👥',
      trend: '+18%'
    },
    {
      label: 'Areas Cleaned',
      value: '127+',
      icon: '🗺️',
      trend: '+34%'
    }
  ];

  const achievements = [
    {
      icon: '🥇',
      title: 'Gold Contributor',
      description: 'Submitted 500+ reports',
      unlocked: 5,
      total: 50
    },
    {
      icon: '🌟',
      title: 'Environmental Champion',
      description: 'Earned 5000+ points',
      unlocked: 234,
      total: 384
    },
    {
      icon: '🔥',
      title: 'On Fire Streak',
      description: 'Submitted reports 7 days in a row',
      unlocked: 89,
      total: 384
    },
    {
      icon: '🚀',
      title: 'Waste Warrior',
      description: 'Reported first waste incident',
      unlocked: 384,
      total: 384
    },
    {
      icon: '💚',
      title: 'Green Guardian',
      description: '100+ reports in organic waste',
      unlocked: 45,
      total: 384
    },
    {
      icon: '🏆',
      title: 'Leaderboard Legend',
      description: 'Ranked in top 10 contributors',
      unlocked: 12,
      total: 384
    }
  ];

  const weeklyActivity = [
    { day: 'Mon', reports: 156, points: 1560 },
    { day: 'Tue', reports: 198, points: 1980 },
    { day: 'Wed', reports: 234, points: 2340 },
    { day: 'Thu', reports: 189, points: 1890 },
    { day: 'Fri', reports: 267, points: 2670 },
    { day: 'Sat', points: 1830 },
    { day: 'Sun', reports: 203, points: 2030 }
  ];

  const maxReports = Math.max(...weeklyActivity.map(d => d.reports || 0));

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
            Community Impact
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See the real-world difference CleanCity is making in our communities. Together, we're building a cleaner, greener planet! 🌍
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {communityStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border border-cyan-400/20 rounded-xl p-6 hover:border-fuchsia-400/40 transition-all transform hover:scale-105"
              style={{
                animation: `slideUp 0.5s ease-out ${idx * 0.1}s both`
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{stat.icon}</span>
                <span className="text-green-400 text-sm font-bold">{stat.trend}</span>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Impact Metrics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="text-green-400">🌱</span> Environmental Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${metric.color} opacity-10 border border-gray-500/30 rounded-xl p-8 hover:border-gray-400/60 transition-all transform hover:scale-105 hover:shadow-2xl`}
              >
                <div className="text-5xl mb-4">{metric.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{metric.title}</h3>
                <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-3`}>
                  {metric.value}
                </div>
                <p className="text-gray-300 text-sm">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <TrendingUp className="text-cyan-400" /> Weekly Activity
          </h2>
          <div className="bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border border-cyan-400/20 rounded-xl p-8 hover:border-fuchsia-400/40 transition-all">
            <div className="flex items-end justify-between h-64 gap-3">
              {weeklyActivity.map((day, idx) => {
                const height = day.reports ? (day.reports / maxReports) * 100 : 20;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gradient-to-t from-cyan-500 to-fuchsia-500 rounded-t-lg hover:from-fuchsia-500 hover:to-lime-500 transition-all cursor-pointer group relative" style={{ height: `${height}%` }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all text-white text-sm font-bold bg-black/60 px-2 py-1 rounded">
                        {day.reports || 'N/A'}
                      </div>
                    </div>
                    <div className="mt-4 text-gray-300 font-bold">{day.day}</div>
                    <div className="text-xs text-gray-400 mt-1">{day.points} pts</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="text-yellow-400">🏅</span> Community Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-lime-500/10 border border-cyan-400/20 rounded-xl p-6 hover:border-fuchsia-400/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="bg-lime-500/20 text-lime-300 px-3 py-1 rounded-full text-sm font-bold">
                    {achievement.unlocked}/{achievement.total}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{achievement.description}</p>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-lime-400 to-cyan-400 h-2 rounded-full transition-all"
                    style={{ width: `${(achievement.unlocked / achievement.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="text-rose-400">💬</span> Community Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Environmental Hero',
                message: 'CleanCity motivated me to take action! I\'ve reported 150+ waste issues in my neighborhood.',
                points: '1500 points'
              },
              {
                name: 'Marcus Chen',
                role: 'Waste Warrior',
                message: 'This app makes a real difference. Seeing the community impact keeps me motivated.',
                points: '850 points'
              },
              {
                name: 'Emma Rodriguez',
                role: 'Green Guardian',
                message: 'Love how gamified this is. It\'s fun AND helping the environment at the same time!',
                points: '1200 points'
              }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border border-cyan-400/20 rounded-xl p-6 hover:border-fuchsia-400/40 transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.message}"</p>
                <div className="border-t border-gray-600/30 pt-4">
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-xs text-cyan-400 mt-2">💫 {testimonial.points}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-lime-500/20 border border-cyan-400/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Join the Movement!</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Every report counts. Every point matters. Together, we're creating real environmental change in our communities.
          </p>
          <button className="bg-gradient-to-r from-lime-500 via-cyan-500 to-fuchsia-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105">
            Start Making an Impact Today
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Last updated: Today | Data updates every hour</p>
          <p className="mt-2">🌍 CleanCity - Powered by Community, Driven by Purpose</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;
