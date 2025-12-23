import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  Globe,
  Headphones,
  Activity,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  SkipForward,
  Languages
} from 'lucide-react';

const VoiceInterface: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [voiceMode, setVoiceMode] = useState('listening');

  const languages = [
    { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳', confidence: 98 },
    { code: 'en', name: 'English', flag: '🇬🇧', confidence: 95 },
    { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳', confidence: 96 },
    { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳', confidence: 94 },
    { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇧🇩', confidence: 97 },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳', confidence: 93 },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳', confidence: 95 },
    { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳', confidence: 96 },
    { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳', confidence: 94 },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳', confidence: 92 },
    { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳', confidence: 91 },
    { code: 'as', name: 'অসমীয়া (Assamese)', flag: '🇮🇳', confidence: 90 }
  ];

  const voiceInteractions = [
    {
      id: '1',
      question: 'What is your age?',
      questionHi: 'आपकी उम्र क्या है?',
      response: 'मैं पैंतालीस साल का हूं',
      transcript: 'I am forty-five years old',
      confidence: 94,
      language: 'Hindi',
      duration: '3.2s',
      accent: 'North Indian'
    },
    {
      id: '2',
      question: 'What is your monthly household income?',
      questionHi: 'आपकी मासिक घरेलू आय क्या है?',
      response: 'करीब पच्चीस हजार रुपये महीना',
      transcript: 'Around twenty-five thousand rupees per month',
      confidence: 91,
      language: 'Hindi',
      duration: '4.1s',
      accent: 'North Indian'
    },
    {
      id: '3',
      question: 'How satisfied are you with government services?',
      questionHi: 'आप सरकारी सेवाओं से कितने संतुष्ट हैं?',
      response: 'मैं काफी संतुष्ट हूं',
      transcript: 'I am quite satisfied',
      confidence: 96,
      language: 'Hindi',
      duration: '2.8s',
      accent: 'North Indian'
    }
  ];

  const stats = [
    { label: 'Voice Surveys', value: '12,450', icon: Mic, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Avg Confidence', value: '94.2%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Languages Active', value: '15+', icon: Globe, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Accent Support', value: '25+', icon: Headphones, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Mic className="h-8 w-8 mr-3 text-blue-600" />
            Voice & Multilingual Interface
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            AI-powered voice recognition and multilingual survey system
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
            <Play className="h-5 w-5" />
            <span>Test Voice</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Voice Input Simulator</h3>
                <p className="text-blue-100">Test AI voice recognition in multiple languages</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                <Languages className="h-8 w-8" />
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center mb-6">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isRecording
                      ? 'bg-red-500 animate-pulse shadow-2xl scale-110'
                      : 'bg-white text-blue-600 hover:scale-105'
                  }`}
                >
                  <Mic className="h-12 w-12" />
                </button>
              </div>
              <p className="text-center text-lg font-medium">
                {isRecording ? 'Listening...' : 'Click to start voice input'}
              </p>
              {isRecording && (
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <Activity className="h-5 w-5 animate-pulse" />
                  <span className="text-sm">Processing voice input in Hindi</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-blue-100 mb-2">Selected Language</p>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="text-gray-900">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-blue-100 mb-2">Detection Mode</p>
                <select className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white">
                  <option className="text-gray-900">Auto-detect</option>
                  <option className="text-gray-900">Manual select</option>
                  <option className="text-gray-900">Multi-language</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Voice Interactions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Live transcriptions and confidence scores
              </p>
            </div>
            <div className="p-6 space-y-4">
              {voiceInteractions.map((interaction) => (
                <div
                  key={interaction.id}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {interaction.question}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{interaction.questionHi}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <Volume2 className="h-5 w-5 text-blue-600" />
                    </button>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Voice Response:</p>
                    <p className="text-gray-900 dark:text-white mb-2">{interaction.response}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      Transcript: {interaction.transcript}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {interaction.confidence}% confidence
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Globe className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-600 dark:text-gray-400">{interaction.language}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Headphones className="h-4 w-4 text-purple-600" />
                        <span className="text-gray-600 dark:text-gray-400">{interaction.accent}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-500">{interaction.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-600" />
              Language Support
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{lang.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{lang.code.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">{lang.confidence}%</p>
                    <p className="text-xs text-gray-500">accuracy</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Voice Features</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Accent Tolerance</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Supports 25+ regional accents</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Auto Language Detection</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Real-time language switching</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Noise Cancellation</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">AI-powered background filtering</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Offline Mode</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Works without internet connection</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Low Confidence Alert</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Auto-retry on unclear responses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
