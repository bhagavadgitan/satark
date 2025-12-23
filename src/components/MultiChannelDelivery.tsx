import React, { useState } from 'react';
import {
  MessageSquare,
  Phone,
  Globe,
  Bot,
  Send,
  Calendar,
  MapPin,
  Settings,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Target
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  icon: any;
  color: string;
  status: 'active' | 'inactive' | 'testing';
  reach: number;
  responseRate: number;
  avgTime: string;
}

interface DeliverySchedule {
  id: string;
  surveyName: string;
  district: string;
  channel: string;
  fallback: string;
  scheduledStart: string;
  scheduledEnd: string;
  status: string;
  targetCount: number;
  sentCount: number;
  responseCount: number;
}

const MultiChannelDelivery: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>('whatsapp');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const channels: Channel[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-green-500',
      status: 'active',
      reach: 45000,
      responseRate: 68,
      avgTime: '3.2 min'
    },
    {
      id: 'ivr',
      name: 'IVR Phone',
      icon: Phone,
      color: 'bg-blue-500',
      status: 'active',
      reach: 32000,
      responseRate: 52,
      avgTime: '5.8 min'
    },
    {
      id: 'web',
      name: 'Web/Mobile',
      icon: Globe,
      color: 'bg-purple-500',
      status: 'active',
      reach: 28000,
      responseRate: 71,
      avgTime: '4.1 min'
    },
    {
      id: 'voice_avatar',
      name: 'AI Voice Avatar',
      icon: Bot,
      color: 'bg-indigo-500',
      status: 'testing',
      reach: 5000,
      responseRate: 64,
      avgTime: '4.5 min'
    }
  ];

  const schedules: DeliverySchedule[] = [
    {
      id: '1',
      surveyName: 'Annual Household Economic Survey',
      district: 'Ahmadabad',
      channel: 'WhatsApp',
      fallback: 'IVR',
      scheduledStart: '2024-06-01 09:00',
      scheduledEnd: '2024-06-30 18:00',
      status: 'running',
      targetCount: 5000,
      sentCount: 3200,
      responseCount: 2180
    },
    {
      id: '2',
      surveyName: 'Digital Literacy Assessment',
      district: 'Mumbai',
      channel: 'Web',
      fallback: 'WhatsApp',
      scheduledStart: '2024-06-05 10:00',
      scheduledEnd: '2024-07-05 17:00',
      status: 'scheduled',
      targetCount: 3000,
      sentCount: 0,
      responseCount: 0
    },
    {
      id: '3',
      surveyName: 'Rural Healthcare Access',
      district: 'Jaipur',
      channel: 'IVR',
      fallback: 'Voice Avatar',
      scheduledStart: '2024-05-20 08:00',
      scheduledEnd: '2024-06-20 20:00',
      status: 'running',
      targetCount: 4000,
      sentCount: 3800,
      responseCount: 1980
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'testing': return 'bg-yellow-100 text-yellow-700';
      case 'running': return 'bg-blue-100 text-blue-700';
      case 'scheduled': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Send className="h-8 w-8 mr-3 text-blue-600" />
            Multi-Channel Survey Delivery
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and optimize survey distribution across multiple channels
          </p>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Calendar className="h-5 w-5" />
          <span>Schedule Delivery</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <div
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id)}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border-2 cursor-pointer transition-all duration-200 ${
                selectedChannel === channel.id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-100 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${channel.color} p-3 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(channel.status)}`}>
                  {channel.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {channel.name}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Reach</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{channel.reach.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Response Rate</span>
                  <span className="font-semibold text-green-600">{channel.responseRate}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Avg Time</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{channel.avgTime}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Schedules</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Active and upcoming survey deliveries
              </p>
            </div>

            <div className="p-6 space-y-4">
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {schedule.surveyName}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{schedule.district}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{schedule.channel}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>Fallback: {schedule.fallback}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                      {schedule.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Target</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{schedule.targetCount}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sent</p>
                      <p className="text-xl font-bold text-blue-600">{schedule.sentCount}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Responses</p>
                      <p className="text-xl font-bold text-green-600">{schedule.responseCount}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {Math.round((schedule.responseCount / schedule.targetCount) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(schedule.responseCount / schedule.targetCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{schedule.scheduledStart}</span>
                    </div>
                    <span>→</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{schedule.scheduledEnd}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-600" />
              Channel Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Channel
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option>WhatsApp</option>
                  <option>IVR Phone</option>
                  <option>Web/Mobile</option>
                  <option>AI Voice Avatar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fallback Channel
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option>IVR Phone</option>
                  <option>WhatsApp</option>
                  <option>Web/Mobile</option>
                  <option>None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Retry Logic
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option>3 attempts, 24hr intervals</option>
                  <option>2 attempts, 12hr intervals</option>
                  <option>5 attempts, 48hr intervals</option>
                  <option>No retry</option>
                </select>
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Configuration
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Performance Insights
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Best Channel</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Web/Mobile</p>
                </div>
                <p className="text-2xl font-bold text-green-600">71%</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Fastest Response</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">WhatsApp</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">3.2m</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Total Reach</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">All channels</p>
                </div>
                <p className="text-2xl font-bold text-purple-600">110K</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Schedule Survey Delivery</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Configure delivery schedule, channels, and target audience
            </p>
            <button
              onClick={() => setShowScheduleModal(false)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiChannelDelivery;
