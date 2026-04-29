import React from 'react';

export default function LeaderboardWidget() {
  const leaderboardData = [
    { rank: 1, name: 'Environmental Hero', points: 580, trend: 'up' },
    { rank: 2, name: 'Clean Crusader', points: 420, trend: 'up' },
    { rank: 3, name: 'Waste Warrior', points: 350, trend: 'stable' },
    { rank: 4, name: 'EcoVangelist', points: 290, trend: 'up' },
    { rank: 5, name: 'City Guardian', points: 210, trend: 'down' }
  ];

  const getMedalEmoji = (rank) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-2xl p-8 animate-slideUp elevated-card h-full border border-cyan-200/50 hover:border-fuchsia-200/50 transition-all">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-lime-600">
            🏆 Top Contributors
          </h2>
          <span className="text-2xl animate-float drop-shadow-lg">⭐</span>
        </div>
        <p className="text-sm text-slate-500">This Month's Leaders</p>
      </div>
      
      {/* Leaderboard List */}
      <div className="space-y-3 mb-8">
        {leaderboardData.map((user, idx) => (
          <div
            key={user.rank}
            className="group relative overflow-hidden rounded-xl transition-all duration-300"
            style={{
              animation: `slideUp 0.5s ease-out ${idx * 0.1}s both`
            }}
          >
            {/* Background gradient based on rank */}
            <div className={`absolute inset-0 ${
              user.rank === 1 ? 'bg-gradient-to-r from-cyan-100 to-fuchsia-100 shadow-lg shadow-cyan-500/30' :
              user.rank === 2 ? 'bg-gradient-to-r from-fuchsia-100 to-lime-100 shadow-lg shadow-fuchsia-500/30' :
              user.rank === 3 ? 'bg-gradient-to-r from-lime-100 to-cyan-100 shadow-lg shadow-lime-500/30' :
              'bg-gradient-to-r from-violet-50 to-fuchsia-50 shadow-lg shadow-violet-500/20'
            } group-hover:opacity-100 opacity-80 transition-opacity`}></div>

            {/* Hover effect line */}
            <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 w-0 group-hover:w-full transition-all duration-300 shadow-lg shadow-fuchsia-500/50"></div>

            <div className="relative flex items-center gap-4 p-4 border-2 border-transparent group-hover:border-fuchsia-400 transition-all rounded-xl">
              {/* Rank Medal */}
              <div className="text-4xl font-bold w-12 text-center transform group-hover:scale-125 transition-transform drop-shadow-lg">
                {getMedalEmoji(user.rank)}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <p className="font-bold text-slate-800 group-hover:text-fuchsia-600 transition-colors">{user.name}</p>
                <p className="text-xs text-slate-500">Verified Contributor</p>
              </div>

              {/* Points and Trend */}
              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500">
                    {user.points}
                  </span>
                  <span className="text-lg drop-shadow-lg">{getTrendIcon(user.trend)}</span>
                </div>
                <p className="text-xs text-slate-500 font-semibold uppercase">points</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-r from-cyan-50 to-fuchsia-50 border-2 border-cyan-300 group cursor-pointer hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-fuchsia-400 opacity-0 group-hover:opacity-15 transition-opacity rounded-xl"></div>
        
        <div className="relative">
          <p className="text-sm text-cyan-700 font-semibold mb-2">
            💡 <strong>How to Climb</strong>
          </p>
          <ul className="text-xs text-cyan-600 space-y-1">
            <li>✓ Each report = 10 points</li>
            <li>✓ Upvotes add bonus points</li>
            <li>✓ Get featured on leaderboard</li>
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-center text-xs text-gray-600">
          <span className="font-bold text-purple-600">Ready to join?</span> Start reporting waste now! 🚀
        </p>
      </div>
    </div>
  );
}
