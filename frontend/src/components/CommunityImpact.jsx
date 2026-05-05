import React from 'react';

const impactHighlights = [
  {
    icon: '🌿',
    title: 'Cleaner Streets',
    description: 'Community cleanup reports helped remove more than 2,400 kg of waste in April.',
  },
  {
    icon: '💧',
    title: 'Waterway Protection',
    description: 'Reporting illegal dumping protects local rivers and public waterways.',
  },
  {
    icon: '🚴',
    title: 'Active Volunteers',
    description: 'Over 850 neighborhoods have shared reports and awareness alerts.',
  },
];

const communityActions = [
  {
    icon: '🤝',
    title: 'Join a Cleanup',
    description: 'Coordinate with nearby members and log activity for bonus points.',
  },
  {
    icon: '📢',
    title: 'Spread Awareness',
    description: 'Share reports and community milestones to grow local impact.',
  },
  {
    icon: '🏅',
    title: 'Earn Rewards',
    description: 'Collect badges for consistent reporting and civic participation.',
  },
];

export default function CommunityImpact() {
  return (
    <div className="space-y-8 animate-slideUp">
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-bold mb-4">Community Pulse</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Real-world impact from citizen reporting.
            </h2>
            <p className="mt-5 text-slate-300 text-base sm:text-lg leading-8">
              Every photo and report adds a layer of insight to local cleanup efforts. This page shows the value of your contributions, how neighborhoods are changing, and fresh ways to help keep the city clean.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Reports Filed', value: '9.2K', accent: 'from-cyan-500 to-blue-500' },
              { label: 'Cleanup Events', value: '124', accent: 'from-fuchsia-500 to-pink-500' },
              { label: 'Volunteer Hours', value: '18K', accent: 'from-lime-500 to-emerald-500' }
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-gradient-to-br p-5 shadow-xl shadow-slate-950/30">
                <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-gradient-to-r ${item.accent} text-white shadow-lg shadow-slate-950/20`}>{item.label}</div>
                <p className="mt-5 text-4xl font-extrabold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-white mb-4">Impact Highlights</h3>
          <div className="space-y-4">
            {impactHighlights.map((item) => (
              <div key={item.title} className="group rounded-3xl border border-cyan-500/20 bg-slate-950/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
                <div className="flex items-center gap-4">
                  <div className="text-3xl bg-cyan-500/10 border border-cyan-500/20 rounded-2xl w-14 h-14 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/10">{item.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                    <p className="text-slate-300 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/15 bg-slate-950/85 p-8 shadow-2xl shadow-fuchsia-500/10 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300 font-bold">Action Plan</p>
              <h3 className="text-2xl font-bold text-white">How to amplify your impact</h3>
            </div>
            <div className="text-white/80 text-sm">Updated just now</div>
          </div>

          <div className="space-y-4">
            {communityActions.map((action) => (
              <div key={action.title} className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20">
                <div className="flex items-start gap-4">
                  <div className="text-2xl pt-1">{action.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{action.title}</h4>
                    <p className="mt-2 text-slate-300 leading-7">{action.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-900/40 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
        <h3 className="text-2xl font-bold text-white mb-4">Neighborhood impact tracker</h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {['Downtown', 'Riverside', 'Greenfield', 'Harbor'].map((region) => (
            <div key={region} className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-4">{region}</p>
              <p className="text-3xl font-extrabold text-white">{Math.floor(60 + Math.random() * 90)}</p>
              <p className="mt-3 text-slate-300 text-sm">Active reports this week</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
