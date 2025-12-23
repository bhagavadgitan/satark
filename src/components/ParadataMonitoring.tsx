import React, { useState } from 'react';
import {
  Activity,
  MapPin,
  Smartphone,
  Clock,
  Wifi,
  AlertTriangle,
  TrendingUp,
  Eye,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';

interface ParadataEntry {
  id: string;
  responseId: string;
  respondentName: string;
  location: string;
  gpsCoordinates: string;
  deviceType: string;
  duration: string;
  timeOfDay: string;
  networkQuality: string;
  interactionMode: string;
  suspiciousFlags: string[];
  editCount: number;
  voiceConfidence?: number;
}

const ParadataMonitoring: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const paradataEntries: ParadataEntry[] = [
    {
      id: '1',
      responseId: 'RSP-2024-0001',
      respondentName: 'Rajesh Kumar',
      location: 'Ahmadabad, Gujarat',
      gpsCoordinates: '23.0225, 72.5714',
      deviceType: 'Android 12',
      duration: '8m 32s',
      timeOfDay: '10:45 AM',
      networkQuality: 'Good (4G)',
      interactionMode: 'Voice + Text',
      suspiciousFlags: [],
      editCount: 2,
      voiceConfidence: 94
    },
    {
      id: '2',
      responseId: 'RSP-2024-0002',
      respondentName: 'Priya Sharma',
      location: 'Mumbai, Maharashtra',
      gpsCoordinates: '19.0760, 72.8777',
      deviceType: 'iOS 16',
      duration: '12m 18s',
      timeOfDay: '02:30 PM',
      networkQuality: 'Excellent (5G)',
      interactionMode: 'Text',
      suspiciousFlags: [],
      editCount: 0,
      voiceConfidence: undefined
    },
    {
      id: '3',
      responseId: 'RSP-2024-0003',
      respondentName: 'Mohammed Ali',
      location: 'Bangalore, Karnataka',
      gpsCoordinates: '12.9716, 77.5946',
      deviceType: 'Android 11',
      duration: '3m 12s',
      timeOfDay: '11:20 PM',
      networkQuality: 'Poor (2G)',
      interactionMode: 'Voice',
      suspiciousFlags: ['Too Fast', 'Late Night'],
      editCount: 15,
      voiceConfidence: 67
    },
    {
      id: '4',
      responseId: 'RSP-2024-0004',
      respondentName: 'Sunita Devi',
      location: 'Jaipur, Rajasthan',
      gpsCoordinates: '26.9124, 75.7873',
      deviceType: 'Feature Phone',
      duration: '15m 45s',
      timeOfDay: '09:15 AM',
      networkQuality: 'Average (3G)',
      interactionMode: 'IVR',
      suspiciousFlags: [],
      editCount: 1,
      voiceConfidence: 89
    }
  ];

  const stats = [
    { label: 'Total Responses', value: '15,429', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Flagged for Review', value: '234', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Avg Duration', value: '6m 42s', icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'GPS Verified', value: '14,892', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  const getNetworkColor = (quality: string) => {
    if (quality.includes('Excellent') || quality.includes('Good')) return 'text-green-600 bg-green-50';
    if (quality.includes('Average')) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const filteredEntries = paradataEntries.filter(entry => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'flagged') return entry.suspiciousFlags.length > 0;
    if (selectedFilter === 'clean') return entry.suspiciousFlags.length === 0;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Activity className="h-8 w-8 mr-3 text-blue-600" />
            Paradata & Quality Monitoring
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Real-time tracking and quality assurance for survey responses
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 mb-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Responses
            </button>
            <button
              onClick={() => setSelectedFilter('flagged')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'flagged'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <AlertTriangle className="h-4 w-4 inline mr-2" />
              Flagged
            </button>
            <button
              onClick={() => setSelectedFilter('clean')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'clean'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <CheckCircle className="h-4 w-4 inline mr-2" />
              Clean
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredEntries.length} of {paradataEntries.length} entries
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border-2 transition-all duration-200 ${
              entry.suspiciousFlags.length > 0
                ? 'border-amber-300 dark:border-amber-700'
                : 'border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {entry.respondentName}
                  </h3>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                    {entry.responseId}
                  </span>
                  {entry.suspiciousFlags.length > 0 && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Review Required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">{entry.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Device</p>
                      <p className="font-medium text-gray-900 dark:text-white">{entry.deviceType}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Duration</p>
                      <p className="font-medium text-gray-900 dark:text-white">{entry.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-amber-600" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Network</p>
                      <p className="font-medium text-gray-900 dark:text-white">{entry.networkQuality.split('(')[0]}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(showDetails === entry.id ? null : entry.id)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ml-4"
              >
                <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {showDetails === entry.id && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GPS Coordinates</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{entry.gpsCoordinates}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time of Day</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{entry.timeOfDay}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interaction Mode</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{entry.interactionMode}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Edit Count</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{entry.editCount} edits</p>
                  </div>
                  {entry.voiceConfidence !== undefined && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Voice Confidence</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{entry.voiceConfidence}%</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Network Quality</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getNetworkColor(entry.networkQuality)}`}>
                      {entry.networkQuality}
                    </span>
                  </div>
                </div>

                {entry.suspiciousFlags.length > 0 && (
                  <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Suspicious Activity Detected
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {entry.suspiciousFlags.map((flag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-100 rounded-full text-xs font-medium"
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {entry.suspiciousFlags.length === 0 ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Quality Verified</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-amber-600" />
                    <span className="text-sm text-amber-600 font-medium">Requires Review</span>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                  View Full Response
                </button>
                {entry.suspiciousFlags.length > 0 && (
                  <button className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm font-medium">
                    Flag for Manual Review
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParadataMonitoring;
