import React, { useEffect, useState } from 'react';
import { getReportStats } from '../api';
import toast from 'react-hot-toast';

export default function Statistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getReportStats();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      toast.error('❌ Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-2xl p-8 elevated-card border border-cyan-200/50">
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin mb-4 text-4xl drop-shadow-lg">📊</div>
            <p className="text-slate-600 font-semibold">Loading statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-2xl p-8 animate-slideUp elevated-card border border-cyan-200/50 hover:border-fuchsia-200/50 transition-all">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-lime-600">
            📊 Statistics & Insights
          </h2>
          <p className="text-slate-600 text-sm">Community waste reporting metrics</p>
        </div>
        <button
          onClick={loadStats}
          className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Reports Card */}
        <div className="relative overflow-hidden rounded-xl p-6 text-white group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-lg shadow-cyan-500/50"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative z-10">
            <p className="text-cyan-100 text-sm font-semibold uppercase tracking-wider mb-2">Total Reports</p>
            <div className="flex items-end gap-2">
              <div className="text-5xl font-extrabold drop-shadow-lg">{stats.totalReports}</div>
              <span className="text-2xl mb-2">📈</span>
            </div>
            <p className="text-cyan-200 text-xs mt-2">Community contributions</p>
          </div>
        </div>

        {/* This Week Card */}
        <div className="relative overflow-hidden rounded-xl p-6 text-white group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-500 to-lime-700 shadow-lg shadow-lime-500/50"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-lime-400 to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative z-10">
            <p className="text-lime-100 text-sm font-semibold uppercase tracking-wider mb-2">This Week</p>
            <div className="flex items-end gap-2">
              <div className="text-5xl font-extrabold drop-shadow-lg">{stats.reportsThisWeek}</div>
              <span className="text-2xl mb-2">⚡</span>
            </div>
            <p className="text-lime-200 text-xs mt-2">New reports added</p>
          </div>
        </div>

        {/* Impact Score Card */}
        <div className="relative overflow-hidden rounded-xl p-6 text-white group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 shadow-lg shadow-fuchsia-500/50"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-400 to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative z-10">
            <p className="text-fuchsia-100 text-sm font-semibold uppercase tracking-wider mb-2">Impact Score</p>
            <div className="flex items-end gap-2">
              <div className="text-5xl font-extrabold drop-shadow-lg">⭐⭐⭐⭐☆</div>
            </div>
            <p className="text-purple-200 text-xs mt-2">Community rating</p>
          </div>
        </div>
      </div>

      {/* Waste Type Breakdown */}
      <div className="mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">♻️</span>
          Waste Type Distribution
        </h3>
        
        <div className="space-y-4">
          {Object.entries(stats.wasteTypeCount || {}).length > 0 ? (
            Object.entries(stats.wasteTypeCount).map(([type, count], idx) => {
              const total = stats.totalReports || 1;
              const percentage = ((count / total) * 100).toFixed(1);
              
              const colors = {
                plastic: { bg: 'from-yellow-400 to-yellow-500', text: 'text-yellow-700', icon: '🟨' },
                organic: { bg: 'from-green-400 to-green-500', text: 'text-green-700', icon: '🌱' },
                metal: { bg: 'from-gray-400 to-gray-500', text: 'text-gray-700', icon: '⚙️' },
                paper: { bg: 'from-orange-400 to-orange-500', text: 'text-orange-700', icon: '📄' },
                glass: { bg: 'from-blue-400 to-blue-500', text: 'text-blue-700', icon: '🔵' },
                mixed: { bg: 'from-purple-400 to-purple-500', text: 'text-purple-700', icon: '🔀' }
              };
              
              const colorSet = colors[type] || colors.mixed;
              
              return (
                <div key={type} className="group" style={{
                  animation: `slideUp 0.4s ease-out ${idx * 0.08}s both`
                }}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{colorSet.icon}</span>
                      <span className="font-bold text-gray-700 capitalize">{type}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-800">{count}</span>
                      <span className={`text-sm font-semibold ${colorSet.text} ml-2`}>({percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                      className={`h-4 rounded-full bg-gradient-to-r ${colorSet.bg} transition-all duration-700 transform group-hover:scale-y-125 origin-left`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600 text-center py-6">📊 No waste data available yet</p>
          )}
        </div>
      </div>

      {/* Severity Distribution */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          Severity Breakdown
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(stats.severityCount || {}).map(([severity, count], idx) => {
            const colors = {
              low: {
                bg: 'from-green-500 to-emerald-600',
                light: 'bg-green-100 border-green-300',
                text: 'text-green-800',
                icon: '✅'
              },
              medium: {
                bg: 'from-orange-500 to-yellow-600',
                light: 'bg-orange-100 border-orange-300',
                text: 'text-orange-800',
                icon: '⚠️'
              },
              high: {
                bg: 'from-red-500 to-pink-600',
                light: 'bg-red-100 border-red-300',
                text: 'text-red-800',
                icon: '🚨'
              }
            };
            
            const colorSet = colors[severity] || colors.low;
            
            return (
              <div
                key={severity}
                className="relative overflow-hidden rounded-xl p-6 text-white group cursor-pointer"
                style={{
                  animation: `slideUp 0.4s ease-out ${idx * 0.1}s both`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colorSet.bg}`}></div>
                <div className="relative z-10 text-center">
                  <div className="text-3xl font-extrabold drop-shadow-lg mb-2">{count}</div>
                  <p className="font-bold capitalize">{severity} Severity</p>
                  <p className="text-xs opacity-90 mt-1">{colorSet.icon}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
