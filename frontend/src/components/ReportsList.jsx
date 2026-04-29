import React, { useEffect, useState } from 'react';
import { getReports, getFilteredReports, upvoteReport } from '../api';
import toast from 'react-hot-toast';

const WASTE_COLORS = {
  plastic: 'bg-cyan-100 text-cyan-800 border-cyan-400 shadow-lg shadow-cyan-500/20',
  organic: 'bg-lime-100 text-lime-800 border-lime-400 shadow-lg shadow-lime-500/20',
  metal: 'bg-slate-100 text-slate-800 border-slate-400 shadow-lg shadow-slate-500/20',
  paper: 'bg-orange-100 text-orange-800 border-orange-400 shadow-lg shadow-orange-500/20',
  glass: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-400 shadow-lg shadow-fuchsia-500/20',
  mixed: 'bg-violet-100 text-violet-800 border-violet-400 shadow-lg shadow-violet-500/20'
};

const SEVERITY_COLORS = {
  low: 'bg-lime-100 text-lime-700 border-lime-300 shadow-lg shadow-lime-500/20',
  medium: 'bg-amber-100 text-amber-700 border-amber-300 shadow-lg shadow-amber-500/20',
  high: 'bg-rose-100 text-rose-700 border-rose-300 shadow-lg shadow-rose-500/20'
};

const STATUS_COLORS = {
  open: 'bg-cyan-100 text-cyan-800 border-cyan-300 shadow-lg shadow-cyan-500/20',
  investigating: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300 shadow-lg shadow-fuchsia-500/20',
  resolved: 'bg-lime-100 text-lime-800 border-lime-300 shadow-lg shadow-lime-500/20'
};

export default function ReportsList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [upvotedReports, setUpvotedReports] = useState(new Set());

  useEffect(() => {
    loadReports();
  }, [filter]);

  const loadReports = async () => {
    try {
      setLoading(true);
      let data;
      if (filter === 'all') {
        data = await getReports();
      } else {
        data = await getFilteredReports(filter);
      }

      if (data.success) {
        setReports(data.data);
      }
    } catch (error) {
      console.error('Error loading reports:', error);
      toast.error('❌ Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (reportId) => {
    if (upvotedReports.has(reportId)) {
      toast.info('👍 Already upvoted this report');
      return;
    }

    try {
      await upvoteReport(reportId);
      setUpvotedReports(new Set([...upvotedReports, reportId]));
      
      // Update the report's upvotes locally
      setReports(reports.map(r => 
        r.id === reportId 
          ? { ...r, upvotes: (r.upvotes || 0) + 1 }
          : r
      ));
      toast.success('👍 Report upvoted!');
    } catch (error) {
      console.error('Upvote error:', error);
      toast.error('❌ Failed to upvote');
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-2xl p-8 elevated-card border border-cyan-200/50">
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin mb-4 text-4xl drop-shadow-lg">⚙️</div>
            <p className="text-slate-600 font-semibold">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-2xl p-8 animate-slideUp elevated-card border border-cyan-200/50 hover:border-fuchsia-200/50 transition-all">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-lime-600">
            📋 Recent Reports
          </h2>
          <p className="text-slate-600 text-sm">Community waste reports in your area</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-100 to-fuchsia-100 border-2 border-cyan-400 rounded-lg px-4 py-3 shadow-lg shadow-cyan-500/30">
          <p className="text-xs text-cyan-700 font-semibold">TOTAL REPORTS</p>
          <p className="text-3xl font-bold text-cyan-600">{reports.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 flex gap-2 flex-wrap">
        {['all', 'plastic', 'organic', 'metal', 'paper', 'glass', 'mixed'].map((type, idx) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
              filter === type
                ? 'bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
            style={{
              animation: `slideUp 0.3s ease-out ${idx * 0.05}s both`
            }}
          >
            {type === 'all' ? '🌍 All' : `${type.slice(0, 1).toUpperCase()}${type.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      {reports.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4 drop-shadow-lg">🌟</div>
          <p className="text-slate-600 text-lg font-semibold mb-2">No reports found</p>
          <p className="text-slate-500 text-sm">Be the first to report waste and earn rewards!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, idx) => (
            <div
              key={report.id}
              className="group rounded-xl overflow-hidden bg-white border-2 border-cyan-200/50 hover:border-fuchsia-400 transition-all duration-300 hover:shadow-xl hover:shadow-fuchsia-500/20 card-shadow"
              style={{
                animation: `slideUp 0.4s ease-out ${idx * 0.08}s both`
              }}
            >
              {/* Image Container */}
              {report.imageUrl && (
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={report.imageUrl}
                    alt="Waste"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                {/* Type & Severity Row */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border-2 ${WASTE_COLORS[report.wasteType] || WASTE_COLORS.mixed}`}>
                    {report.wasteType.toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border-2 ${SEVERITY_COLORS[report.severity]}`}>
                    🔴 {report.severity.toUpperCase()}
                  </span>
                </div>

                {/* Description */}
                {report.description && (
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                    {report.description}
                  </p>
                )}

                {/* Location */}
                <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                  <p className="text-xs font-semibold text-blue-700">
                    📍 Location
                  </p>
                  <p className="text-xs text-blue-600 font-mono">
                    {report.location?.latitude?.toFixed(4) || 'N/A'}, {report.location?.longitude?.toFixed(4) || 'N/A'}
                  </p>
                </div>

                {/* Timestamp */}
                <p className="text-xs text-gray-500 mb-4">
                  🕐 {new Date(report.timestamp).toLocaleDateString()} at {new Date(report.timestamp).toLocaleTimeString()}
                </p>

                {/* Footer - Upvote & Status */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleUpvote(report.id)}
                    disabled={upvotedReports.has(report.id)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg font-semibold transition-all transform hover:scale-110 ${
                      upvotedReports.has(report.id) 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed opacity-60' 
                        : 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 hover:shadow-lg'
                    }`}
                  >
                    👍 <span>{report.upvotes || 0}</span>
                  </button>
                  <span className={`text-xs font-bold capitalize px-3 py-2 rounded-lg border-2 ${
                    STATUS_COLORS[report.status] || STATUS_COLORS.open
                  }`}>
                    {report.status ? report.status.toUpperCase() : 'OPEN'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
