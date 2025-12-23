import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  Download,
  Clock,
  UserCheck,
  Database,
  Key
} from 'lucide-react';

const ComplianceGovernance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('consent');
  const [anonymizationEnabled, setAnonymizationEnabled] = useState(true);

  const consentRecords = [
    {
      id: '1',
      responseId: 'RSP-2024-0001',
      respondent: 'Rajesh Kumar',
      consentText: 'I hereby consent to participate in this government survey...',
      language: 'Hindi',
      method: 'Digital Signature',
      status: 'Granted',
      timestamp: '2024-06-15 10:30 AM'
    },
    {
      id: '2',
      responseId: 'RSP-2024-0002',
      respondent: 'Priya Sharma',
      consentText: 'मैं इस सरकारी सर्वेक्षण में भाग लेने के लिए सहमति देती हूं...',
      language: 'Hindi',
      method: 'Voice Recording',
      status: 'Granted',
      timestamp: '2024-06-15 11:45 AM'
    },
    {
      id: '3',
      responseId: 'RSP-2024-0003',
      respondent: 'Mohammed Ali',
      consentText: 'I agree to participate in this survey and understand my rights...',
      language: 'English',
      method: 'SMS Confirmation',
      status: 'Pending',
      timestamp: '2024-06-15 02:20 PM'
    }
  ];

  const auditLogs = [
    {
      id: '1',
      user: 'Dr. Priya Sharma',
      action: 'Exported Survey Data',
      resource: 'Economic Survey 2024',
      timestamp: '2024-06-15 10:30 AM',
      ipAddress: '103.45.67.89',
      status: 'Success'
    },
    {
      id: '2',
      user: 'Rajesh Kumar',
      action: 'Modified Survey Question',
      resource: 'Healthcare Survey',
      timestamp: '2024-06-15 11:15 AM',
      ipAddress: '103.45.67.90',
      status: 'Success'
    },
    {
      id: '3',
      user: 'Amit Patel',
      action: 'Attempted Unauthorized Access',
      resource: 'Sensitive Data Repository',
      timestamp: '2024-06-15 02:45 PM',
      ipAddress: '103.45.67.91',
      status: 'Blocked'
    },
    {
      id: '4',
      user: 'Sunita Devi',
      action: 'Created New Survey',
      resource: 'Digital Literacy Survey',
      timestamp: '2024-06-15 03:30 PM',
      ipAddress: '103.45.67.92',
      status: 'Success'
    }
  ];

  const userPermissions = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      role: 'Senior Statistical Officer',
      permissions: ['Create Survey', 'Export Data', 'Manage Agents', 'View Reports'],
      lastActive: '5 mins ago',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      role: 'Field Coordinator',
      permissions: ['Create Survey', 'View Reports', 'Manage Agents'],
      lastActive: '1 hour ago',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Amit Patel',
      role: 'Data Analyst',
      permissions: ['View Reports', 'Export Data'],
      lastActive: '2 hours ago',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Sunita Devi',
      role: 'Survey Designer',
      permissions: ['Create Survey', 'Edit Questions'],
      lastActive: '30 mins ago',
      status: 'Active'
    }
  ];

  const complianceStats = [
    { label: 'Consent Rate', value: '98.7%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Data Encrypted', value: '100%', icon: Lock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Audit Logs', value: '45,234', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Active Users', value: '247', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Shield className="h-8 w-8 mr-3 text-blue-600" />
            Compliance & Governance
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Ensure data privacy, security, and regulatory compliance
          </p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
          <Download className="h-5 w-5" />
          <span>Export Compliance Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {complianceStats.map((stat, index) => {
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

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 mb-8">
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('consent')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'consent'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="h-5 w-5 inline mr-2" />
            Consent Management
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'audit'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <FileText className="h-5 w-5 inline mr-2" />
            Audit Trail
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'permissions'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Key className="h-5 w-5 inline mr-2" />
            Permissions
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'privacy'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Lock className="h-5 w-5 inline mr-2" />
            Data Privacy
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'consent' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Consent Records</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Track and verify citizen consent for survey participation
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Filter by status:</span>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                    <option>All</option>
                    <option>Granted</option>
                    <option>Pending</option>
                    <option>Revoked</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {consentRecords.map((record) => (
                  <div key={record.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{record.respondent}</h4>
                          <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                            {record.responseId}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            record.status === 'Granted' ? 'bg-green-100 text-green-700' :
                            record.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{record.consentText}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>Language: {record.language}</span>
                          <span>•</span>
                          <span>Method: {record.method}</span>
                          <span>•</span>
                          <span>{record.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <Download className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Audit Trail</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Complete log of all system activities and data access
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                    <option>Last 24 hours</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Custom range</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className={`w-2 h-2 rounded-full ${
                          log.status === 'Success' ? 'bg-green-500' :
                          log.status === 'Blocked' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></span>
                        <span className="font-semibold text-gray-900 dark:text-white">{log.user}</span>
                        <span className="text-gray-600 dark:text-gray-400">{log.action}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 ml-5">
                        <span>Resource: {log.resource}</span>
                        <span>•</span>
                        <span>IP: {log.ipAddress}</span>
                        <span>•</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      log.status === 'Success' ? 'bg-green-100 text-green-700' :
                      log.status === 'Blocked' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User Permissions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Manage role-based access control for all users
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add User
                </button>
              </div>

              <div className="space-y-4">
                {userPermissions.map((user) => (
                  <div key={user.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {user.role}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {user.permissions.map((perm, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs">
                              {perm}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Last active: {user.lastActive}</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm">
                        Edit Permissions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Data Privacy Controls</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure data anonymization and privacy settings
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {anonymizationEnabled ? <EyeOff className="h-6 w-6 text-blue-600" /> : <Eye className="h-6 w-6 text-gray-400" />}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Data Anonymization</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Automatically anonymize personally identifiable information
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAnonymizationEnabled(!anonymizationEnabled)}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        anonymizationEnabled ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        anonymizationEnabled ? 'transform translate-x-7' : ''
                      }`}></div>
                    </button>
                  </div>
                  {anonymizationEnabled && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-900 dark:text-blue-100 mb-2 font-medium">Active Anonymization Rules:</p>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• Name masking (First 2 letters only)</li>
                        <li>• Phone number encryption</li>
                        <li>• Address aggregation (District level only)</li>
                        <li>• GPS coordinate rounding (500m radius)</li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lock className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Data Encryption</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        All data encrypted at rest and in transit
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Encryption Standard</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">AES-256</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Rotation</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">Every 90 days</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <Database className="h-6 w-6 text-purple-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Data Retention Policy</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Automatic data deletion after retention period
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Survey Responses</span>
                      <span className="font-semibold text-gray-900 dark:text-white">7 years</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Personal Data</span>
                      <span className="font-semibold text-gray-900 dark:text-white">5 years</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Audit Logs</span>
                      <span className="font-semibold text-gray-900 dark:text-white">10 years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceGovernance;
