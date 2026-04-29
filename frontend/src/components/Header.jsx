import React from 'react';

export default function Header({ points }) {
  return (
    <header className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white shadow-2xl sticky top-0 z-50 border-b border-cyan-500/30 backdrop-blur-sm">
      {/* Animated background elements - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-lime-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      {/* Gradient line at the top - Multi-color */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-fuchsia-400 via-lime-400 to-cyan-400 animate-shimmer"></div>

      <nav className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          {/* Logo Section - Ultra Enhanced */}
          <div className="flex items-center gap-4 group cursor-pointer">
            {/* Animated logo container with neon glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              <div className="relative text-5xl animate-float group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">♻️</div>
            </div>

            {/* Logo text with gradient */}
            <div className="hover:transform hover:scale-105 transition-transform">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-lime-300 bg-clip-text text-transparent animate-glow">
                CleanCity
              </h1>
              <p className="text-sm text-cyan-300 font-medium">🌍 AI-Powered Waste Reporting</p>
            </div>
          </div>

          {/* Center - Quick stats with vibrant colors */}
          <div className="hidden md:flex gap-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 border border-cyan-400/30 backdrop-blur-sm hover:border-fuchsia-400/50 transition-all">
            <div className="text-center">
              <div className="text-xs text-cyan-300 font-bold uppercase tracking-wider">Active Today</div>
              <div className="text-2xl font-bold text-lime-400 animate-bounce">◆</div>
            </div>
            <div className="w-px bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent opacity-50"></div>
            <div className="text-center">
              <div className="text-xs text-fuchsia-300 font-bold uppercase tracking-wider">Status</div>
              <div className="text-sm font-bold text-lime-400 animate-pulse">🟢 Live</div>
            </div>
          </div>

          {/* Reward Points Section - Super Enhanced with Neon */}
          <div className="flex items-center gap-6">
            {/* Impact Score with vibrant colors */}
            <div className="hidden sm:flex gap-3 items-center px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-rose-500/10 border border-rose-400/30 hover:border-rose-400/70 transition-all">
              <div className="text-center">
                <div className="text-xs text-gray-300 font-semibold uppercase">Impact Score</div>
                <div className="text-sm font-bold text-lime-300 flex gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg animate-bounce" style={{animationDelay: `${i * 0.1}s`}}>★</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Reward Points Card - Neon Glow Effect */}
            <div className="relative group">
              {/* Animated neon border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 group-hover:blur-xl transition-all duration-500 animate-pulse"></div>

              {/* Card content with vibrant gradient */}
              <div className="relative bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-2xl px-6 py-4 backdrop-blur-sm border-2 border-yellow-200 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 duration-300">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">Your Rewards</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-4xl font-extrabold text-white drop-shadow-lg animate-bounce">{points}</span>
                      <span className="text-2xl font-bold text-amber-900 animate-pulse">⭐</span>
                    </div>
                  </div>

                  {/* Visual reward indicator */}
                  <div className="hidden sm:block relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse"></div>
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/60 to-transparent flex items-center justify-center text-2xl animate-float">
                      ⭐
                    </div>
                  </div>
                </div>

                {/* Animated sparkles */}
                <div className="absolute top-2 right-2 text-lg animate-bounce" style={{animationDelay: '0s'}}>✨</div>
                <div className="absolute bottom-2 left-4 text-lg animate-bounce" style={{animationDelay: '0.3s'}}>✨</div>
              </div>
            </div>

            {/* Notification badge with neon effect */}
            <div className="relative group cursor-pointer">
              <div className="text-3xl hover:scale-125 transition-transform hover:drop-shadow-lg">🔔</div>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-fuchsia-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg shadow-red-500/50">
                2
              </span>
            </div>
          </div>
        </div>

        {/* Bottom decorative line with vibrant moving gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-400 via-lime-400 via-rose-400 to-cyan-400 opacity-70 animate-shimmer"></div>
      </nav>

      {/* Announcement banner with enhanced colors */}
      <div className="bg-gradient-to-r from-indigo-900/70 via-fuchsia-900/70 to-rose-900/70 border-t border-cyan-500/30 py-3 px-4 text-center backdrop-blur-sm">
        <p className="text-xs sm:text-sm text-cyan-200 font-semibold flex items-center justify-center gap-2">
          <span className="animate-pulse">🎉</span>
          <span>Help keep cities clean & earn exclusive rewards! 🌱</span>
          <span className="animate-pulse">🎉</span>
        </p>
      </div>
    </header>
  );
}
