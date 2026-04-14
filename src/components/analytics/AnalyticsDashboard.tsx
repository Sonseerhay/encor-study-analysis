'use client';

import { useState, useEffect } from 'react';
import { CCNP_LABS, PRACTICE_TESTS, LESSONS } from '@/data/ccnpLabs';

export default function AnalyticsDashboard() {
  const [labs, setLabs] = useState(CCNP_LABS);
  const [practiceTests, setPracticeTests] = useState(PRACTICE_TESTS);
  const [lessons, setLessons] = useState(LESSONS);
  const [activeTab, setActiveTab] = useState<'overview' | 'labs' | 'tests' | 'lessons'>('overview');

  // Load saved progress from localStorage
  useEffect(() => {
    const savedLabs = localStorage.getItem('completedLabs');
    const savedTests = localStorage.getItem('practiceTests');
    const savedLessons = localStorage.getItem('completedLessons');
    
    if (savedLabs) {
      const completedLabIds = JSON.parse(savedLabs);
      setLabs(prev => prev.map(lab => ({
        ...lab,
        completed: completedLabIds.includes(lab.id),
        completedDate: completedLabIds.includes(lab.id) ? (lab.completedDate || new Date().toISOString()) : undefined
      })));
    }
    
    if (savedTests) {
      setPracticeTests(JSON.parse(savedTests));
    }
    
    if (savedLessons) {
      const completedLessonIds = JSON.parse(savedLessons);
      setLessons(prev => prev.map(lesson => ({
        ...lesson,
        completed: completedLessonIds.includes(lesson.id),
        completedDate: completedLessonIds.includes(lesson.id) ? (lesson.completedDate || new Date().toISOString()) : undefined
      })));
    }
  }, []);

  const toggleLabCompletion = (labId: string) => {
    setLabs(prev => {
      const updatedLabs = prev.map(lab => 
        lab.id === labId 
          ? { 
              ...lab, 
              completed: !lab.completed,
              completedDate: !lab.completed ? new Date().toISOString() : undefined
            }
          : lab
      );
      
      const completedLabIds = updatedLabs.filter(lab => lab.completed).map(lab => lab.id);
      localStorage.setItem('completedLabs', JSON.stringify(completedLabIds));
      
      return updatedLabs;
    });
  };

  const toggleTestCompletion = (testId: string, score?: number) => {
    setPracticeTests(prev => {
      const updatedTests = prev.map(test => 
        test.id === testId 
          ? { 
              ...test, 
              completed: true,
              bestScore: score ? Math.max(score, test.bestScore || 0) : test.bestScore,
              completedDate: new Date().toISOString(),
              attempts: test.attempts + 1
            }
          : test
      );
      
      localStorage.setItem('practiceTests', JSON.stringify(updatedTests));
      return updatedTests;
    });
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setLessons(prev => {
      const updatedLessons = prev.map(lesson => 
        lesson.id === lessonId 
          ? { 
              ...lesson, 
              completed: !lesson.completed,
              completedDate: !lesson.completed ? new Date().toISOString() : undefined
            }
          : lesson
      );
      
      const completedLessonIds = updatedLessons.filter(lesson => lesson.completed).map(lesson => lesson.id);
      localStorage.setItem('completedLessons', JSON.stringify(completedLessonIds));
      
      return updatedLessons;
    });
  };

  const completedLabs = labs.filter(lab => lab.completed).length;
  const completedTests = practiceTests.filter(test => test.completed).length;
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const averageTestScore = practiceTests.filter(test => test.bestScore).reduce((acc, test) => acc + (test.bestScore || 0), 0) / practiceTests.filter(test => test.bestScore).length || 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'routing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'bgp': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'high-availability': return 'bg-green-100 text-green-800 border-green-200';
      case 'vpn': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'monitoring': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'security': return 'bg-red-100 text-red-800 border-red-200';
      case 'automation': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Practice Tests</h3>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 10.5h-15V5h15v22.5zm-1.5-21h-12v19.5h12V6.5z"/>
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{completedTests}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{practiceTests.length}</div>
                <div className="text-sm text-gray-600">Total Tests</div>
              </div>
              {averageTestScore > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{averageTestScore.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Lessons</h3>
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{completedLessons}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{lessons.length}</div>
                <div className="text-sm text-gray-600">Total Lessons</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedLessons / lessons.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Labs</h3>
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">{completedLabs}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{labs.length}</div>
                <div className="text-sm text-gray-600">Total Labs</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedLabs / labs.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100">
        <div className="flex space-x-1 p-1">
          {[
            { id: 'overview', label: 'Overview', icon: 'chart' },
            { id: 'labs', label: 'Labs', icon: 'lab' },
            { id: 'tests', label: 'Practice Tests', icon: 'test' },
            { id: 'lessons', label: 'Lessons', icon: 'lesson' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Labs Section */}
      {activeTab === 'labs' && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">CCNP Labs</h3>
          <div className="space-y-3">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                  lab.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleLabCompletion(lab.id)}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                      lab.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    {lab.completed && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <h4 className={`font-medium ${lab.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {lab.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{lab.description}</p>
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(lab.category)}`}>
                        {lab.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(lab.difficulty)}`}>
                        {lab.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">
                        {lab.estimatedDuration}m
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-500">Equipment:</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {lab.equipment.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practice Tests Section */}
      {activeTab === 'tests' && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Practice Tests</h3>
          <div className="space-y-3">
            {practiceTests.map((test) => (
              <div
                key={test.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                  test.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-purple-200'
                }`}
              >
                <div className="flex-1">
                  <h4 className={`font-medium ${test.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {test.name}
                  </h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500">
                      {test.questions} questions
                    </span>
                    <span className="text-xs text-gray-500">
                      {test.duration}m
                    </span>
                    <span className="text-xs text-gray-500">
                      {test.passingScore}% to pass
                    </span>
                    {test.attempts > 0 && (
                      <span className="text-xs text-gray-500">
                        {test.attempts} attempts
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {test.bestScore && (
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {test.bestScore}%
                      </div>
                      <div className="text-xs text-gray-500">Best Score</div>
                    </div>
                  )}
                  
                  {!test.completed ? (
                    <button
                      onClick={() => {
                        // Simulate taking a test
                        const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
                        toggleTestCompletion(test.id, score);
                      }}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Take Test
                    </button>
                  ) : (
                    <div className="text-green-600 font-medium">
                      Completed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lessons Section */}
      {activeTab === 'lessons' && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Lessons</h3>
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                  lesson.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleLessonCompletion(lesson.id)}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                      lesson.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    {lesson.completed && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <h4 className={`font-medium ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {lesson.title}
                    </h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${
                        lesson.domain === 'architecture' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                        lesson.domain === 'virtualization' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        lesson.domain === 'infrastructure' ? 'bg-green-100 text-green-800 border-green-200' :
                        lesson.domain === 'network-assurance' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                        lesson.domain === 'security' ? 'bg-red-100 text-red-800 border-red-200' :
                        lesson.domain === 'automation-ai' ? 'bg-indigo-100 text-indigo-800 border-indigo-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {lesson.domain}
                      </span>
                      <span className="text-xs text-gray-500">
                        {lesson.duration}m
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
