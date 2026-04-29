import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { getReports } from '../api';
import toast from 'react-hot-toast';

const mapContainerStyle = {
  width: '100%',
  height: '700px',
  borderRadius: '16px',
  boxShadow: '0 0 30px rgba(0, 217, 255, 0.3), 0 0 60px rgba(255, 20, 147, 0.2)'
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629
};

export default function MapView() {
  const [reports, setReports] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await getReports();
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

  const getMarkerColor = (wasteType) => {
    const colors = {
      plastic: '#00D9FF',
      organic: '#39FF14',
      metal: '#A020F0',
      paper: '#FF6B35',
      glass: '#FF1493',
      mixed: '#FFB400'
    };
    return colors[wasteType] || '#00D9FF';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: '#39FF14',
      medium: '#FF6B35',
      high: '#FF1493'
    };
    return colors[severity] || '#A020F0';
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-2xl p-8 border border-cyan-200/50">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-6">
            <div className="inline-block animate-rotate-slow text-5xl drop-shadow-lg">🗺️</div>
          </div>
          <p className="text-slate-600 font-semibold text-lg">Loading waste reports map...</p>
          <div className="mt-4 flex gap-1">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce shadow-lg shadow-cyan-500/50" style={{animationDelay: '0s'}}></div>
            <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-bounce shadow-lg shadow-fuchsia-500/50" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-bounce shadow-lg shadow-lime-500/50" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark-card animate-slideUp">
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <span className="text-3xl">🗺️</span>
            <span className="gradient-text-animated">Waste Reports Map</span>
          </h2>
          <p className="text-gray-400 text-sm">Interactive map showing real-time waste reports</p>
        </div>
        <button
          onClick={loadReports}
          className="group relative px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 overflow-hidden"
        >
          <span className="relative flex items-center gap-2">
            <span className="group-hover:animate-rotate-slow">🔄</span>
            <span>Refresh Map</span>
          </span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <div className="glass-effect-darker rounded-lg p-4 border border-purple-500/20">
          <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Total Reports</p>
          <p className="text-3xl font-extrabold text-purple-400 mt-1">{reports.length}</p>
        </div>
        <div className="glass-effect-darker rounded-lg p-4 border border-green-500/20">
          <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Active Markers</p>
          <p className="text-3xl font-extrabold text-green-400 mt-1">{reports.length}</p>
        </div>
        <div className="glass-effect-darker rounded-lg p-4 border border-orange-500/20">
          <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">High Severity</p>
          <p className="text-3xl font-extrabold text-orange-400 mt-1">{reports.filter(r => r.severity === 'high').length}</p>
        </div>
        <div className="glass-effect-darker rounded-lg p-4 border border-blue-500/20">
          <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Coverage</p>
          <p className="text-3xl font-extrabold text-blue-400 mt-1">{reports.length > 0 ? '✓' : '○'}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect-darker border border-purple-500/10">
          <span className="text-xs font-bold text-gray-300">Legend:</span>
        </div>
        {[
          { type: 'plastic', emoji: '🟨', name: 'Plastic' },
          { type: 'organic', emoji: '🟢', name: 'Organic' },
          { type: 'metal', emoji: '⚙️', name: 'Metal' },
          { type: 'paper', emoji: '📄', name: 'Paper' }
        ].map(item => (
          <div key={item.type} className="flex items-center gap-2 px-3 py-2 rounded-lg glass-effect-darker border border-purple-500/10">
            <span className="text-base">{item.emoji}</span>
            <span className="text-xs font-semibold text-gray-300">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Map Container with enhanced styling */}
      <div className="relative mb-6 rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl group">
        {/* Loading overlay */}
        {!mapReady && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="animate-spin text-4xl">🔄</div>
          </div>
        )}

        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            center={defaultCenter} 
            zoom={5}
            onLoad={() => setMapReady(true)}
            options={{
              styles: [
                { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
                { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
                { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
                { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9080' }] },
                { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
                { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
                { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
                { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
                { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
                { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3751a' }] },
                { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
                { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
                { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
                { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] }
              ]
            }}
          >
            {reports.map((report, idx) => (
              <MarkerF
                key={report.id}
                position={{
                  lat: parseFloat(report.location.latitude) || defaultCenter.lat,
                  lng: parseFloat(report.location.longitude) || defaultCenter.lng
                }}
                onClick={() => setSelectedMarker(report)}
                icon={{
                  path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
                  fillColor: getMarkerColor(report.wasteType),
                  fillOpacity: 0.9,
                  strokeColor: '#ffffff',
                  strokeWeight: 3,
                  scale: 2
                }}
              />
            ))}

            {selectedMarker && (
              <InfoWindowF
                position={{
                  lat: selectedMarker.location.latitude,
                  lng: selectedMarker.location.longitude
                }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="dark-card p-3 max-w-xs border-0">
                  {selectedMarker.imageUrl && (
                    <img
                      src={selectedMarker.imageUrl}
                      alt="Report"
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white capitalize">
                        {selectedMarker.wasteType}
                      </p>
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{
                        backgroundColor: `${getSeverityColor(selectedMarker.severity)}20`,
                        color: getSeverityColor(selectedMarker.severity)
                      }}>
                        {selectedMarker.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      📍 {selectedMarker.location.latitude.toFixed(4)}, {selectedMarker.location.longitude.toFixed(4)}
                    </p>
                    <p className="text-xs text-gray-400">
                      🕐 {new Date(selectedMarker.timestamp).toLocaleDateString()}
                    </p>
                    {selectedMarker.description && (
                      <p className="text-xs text-gray-300 mt-2 line-clamp-2">{selectedMarker.description}</p>
                    )}
                    <div className="flex gap-2 mt-3 pt-2 border-t border-gray-700">
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                        👍 {selectedMarker.upvotes || 0}
                      </span>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                        {selectedMarker.status?.toUpperCase() || 'OPEN'}
                      </span>
                    </div>
                  </div>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Info panel */}
      {reports.length === 0 ? (
        <div className="text-center py-8 px-6 glass-effect-darker rounded-lg border border-purple-500/20">
          <p className="text-2xl mb-2">🗺️</p>
          <p className="text-gray-300 font-semibold">No waste reports yet</p>
          <p className="text-gray-500 text-sm mt-1">Start reporting to see them on the map!</p>
        </div>
      ) : (
        <div className="glass-effect-darker rounded-lg p-4 border border-purple-500/20">
          <p className="text-gray-300 text-sm">
            <span className="font-bold text-purple-400">{reports.length}</span> waste reports found on the map • 
            <span className="font-bold text-orange-400 ml-2">{reports.filter(r => r.severity === 'high').length}</span> high severity
          </p>
        </div>
      )}
    </div>
  );
}
