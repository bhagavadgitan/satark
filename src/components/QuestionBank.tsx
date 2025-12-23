import React, { useState, useEffect } from 'react';
import {
  Database,
  Search,
  Plus,
  Filter,
  Tag,
  Globe,
  AlertCircle,
  TrendingUp,
  Edit,
  Copy,
  Check,
  FileText,
  Star,
  Shield
} from 'lucide-react';

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  category: string;
  tags: string[];
  sdg_alignment: string;
  sensitivity_level: string;
  languages: Record<string, string>;
  options: any;
  ministry: string;
  usage_count: number;
  version: number;
}

const QuestionBank: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSensitivity, setSelectedSensitivity] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Demographics',
    'Economic',
    'Health',
    'Education',
    'Infrastructure',
    'Digital',
    'Agriculture'
  ];

  const sensitivityLevels = ['All', 'Low', 'Medium', 'High'];

  const questionTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'number', label: 'Number' },
    { value: 'single_choice', label: 'Single Choice' },
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'rating', label: 'Rating' },
    { value: 'date', label: 'Date' },
    { value: 'voice', label: 'Voice Input' }
  ];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setTimeout(() => {
      const sampleQuestions: Question[] = [
        {
          id: '1',
          question_text: 'What is your age?',
          question_type: 'number',
          category: 'Demographics',
          tags: ['demographics', 'basic'],
          sdg_alignment: 'SDG 1',
          sensitivity_level: 'low',
          languages: { hi: 'आपकी उम्र क्या है?', ta: 'உங்கள் வயது என்ன?' },
          options: {},
          ministry: 'MoSPI',
          usage_count: 156,
          version: 1
        },
        {
          id: '2',
          question_text: 'What is your monthly household income?',
          question_type: 'single_choice',
          category: 'Economic',
          tags: ['income', 'economic'],
          sdg_alignment: 'SDG 1',
          sensitivity_level: 'medium',
          languages: { hi: 'आपकी मासिक घरेलू आय क्या है?' },
          options: ['Below ₹10,000', '₹10,000 - ₹25,000', '₹25,000 - ₹50,000', 'Above ₹50,000'],
          ministry: 'MoSPI',
          usage_count: 142,
          version: 1
        }
      ];
      setQuestions(sampleQuestions);
      setLoading(false);
    }, 500);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || q.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSensitivity = selectedSensitivity === 'all' || q.sensitivity_level.toLowerCase() === selectedSensitivity.toLowerCase();
    return matchesSearch && matchesCategory && matchesSensitivity;
  });

  const getSensitivityColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'text': 'bg-blue-100 text-blue-700',
      'number': 'bg-purple-100 text-purple-700',
      'single_choice': 'bg-green-100 text-green-700',
      'mcq': 'bg-emerald-100 text-emerald-700',
      'rating': 'bg-amber-100 text-amber-700',
      'voice': 'bg-pink-100 text-pink-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Database className="h-8 w-8 mr-3 text-blue-600" />
            Question Bank
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Centralized repository of reusable survey questions across all ministries
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          <span>Add Question</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Questions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">2,847</p>
            </div>
            <Database className="h-10 w-10 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+89 this month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">12</p>
            </div>
            <Tag className="h-10 w-10 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Across all topics</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Languages</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">15+</p>
            </div>
            <Globe className="h-10 w-10 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Indian languages</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Usage</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">127</p>
            </div>
            <TrendingUp className="h-10 w-10 text-amber-600" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Per question</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 mb-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions, tags, or keywords..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat.toLowerCase()}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedSensitivity}
            onChange={(e) => setSelectedSensitivity(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            {sensitivityLevels.map(level => (
              <option key={level} value={level.toLowerCase()}>{level} Sensitivity</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading questions...</p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
            <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No questions found matching your criteria</p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(question.question_type)}`}>
                      {question.question_type.replace('_', ' ')}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {question.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSensitivityColor(question.sensitivity_level)}`}>
                      <Shield className="h-3 w-3 inline mr-1" />
                      {question.sensitivity_level}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {question.sdg_alignment}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {question.question_text}
                  </h3>

                  {Object.keys(question.languages).length > 0 && (
                    <div className="mb-3 space-y-1">
                      {Object.entries(question.languages).map(([lang, text]) => (
                        <p key={lang} className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">{lang.toUpperCase()}:</span> {text}
                        </p>
                      ))}
                    </div>
                  )}

                  {Array.isArray(question.options) && question.options.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Options:</p>
                      <div className="flex flex-wrap gap-2">
                        {question.options.map((option: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>Used {question.usage_count} times</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>Version {question.version}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="h-4 w-4" />
                      <span>{question.ministry}</span>
                    </div>
                  </div>

                  {question.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {question.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Copy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Edit className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                    <Star className="h-5 w-5 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Question</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This modal would contain a form to add new questions to the bank
            </p>
            <button
              onClick={() => setShowAddModal(false)}
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

export default QuestionBank;
