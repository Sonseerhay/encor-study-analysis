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
      case 'routing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'bgp': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'high-availability': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'vpn': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'monitoring': return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case 'security': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'automation': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-emerald-500/10 text-emerald-400';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-400';
      case 'advanced': return 'bg-red-500/10 text-red-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-500/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Practice Tests</h3>
            </div>
            <div className="text-4xl font-extrabold text-emerald-400 mb-1">{completedTests}<span className="text-lg text-gray-500 font-normal">/{practiceTests.length}</span></div>
            <p className="text-xs text-gray-500">Tests Completed</p>
            {averageTestScore > 0 && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <span className="text-sm font-semibold text-white">{averageTestScore.toFixed(1)}%</span>
                <span className="text-xs text-gray-500 ml-1">avg score</span>
              </div>
            )}
          </div>

          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-500/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Lessons</h3>
            </div>
            <div className="text-4xl font-extrabold text-emerald-400 mb-1">{completedLessons}<span className="text-lg text-gray-500 font-normal">/{lessons.length}</span></div>
            <p className="text-xs text-gray-500 mb-3">Lessons Completed</p>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${(completedLessons / lessons.length) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-500/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Labs</h3>
            </div>
            <div className="text-4xl font-extrabold text-emerald-400 mb-1">{completedLabs}<span className="text-lg text-gray-500 font-normal">/{labs.length}</span></div>
            <p className="text-xs text-gray-500 mb-3">Labs Completed</p>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${(completedLabs / labs.length) * 100}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-emerald-500/10">
        <div className="flex space-x-1 p-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'labs', label: 'Labs' },
            { id: 'tests', label: 'Practice Tests' },
            { id: 'lessons', label: 'Lessons' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Labs Section */}
      {activeTab === 'labs' && (
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-500/10">
          <h3 className="text-lg font-semibold text-white mb-6">CCNP Labs</h3>
          <div className="space-y-2">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  lab.completed 
                    ? 'bg-emerald-500/5 border-emerald-500/20' 
                    : 'bg-white/[0.02] border-white/5 hover:border-emerald-500/20'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleLabCompletion(lab.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                      lab.completed 
                        ? 'bg-emerald-500 border-emerald-500' 
                        : 'border-gray-600 hover:border-emerald-400'
                    }`}
                  >
                    {lab.completed && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-sm ${lab.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                      {lab.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 truncate">{lab.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getCategoryColor(lab.category)}`}>
                        {lab.category}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${getDifficultyColor(lab.difficulty)}`}>
                        {lab.difficulty}
                      </span>
                      <span className="text-[10px] text-gray-600">{lab.estimatedDuration}m</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right hidden md:block flex-shrink-0 ml-4">
                  <div className="text-[10px] text-gray-600 uppercase tracking-wider">Equipment</div>
                  <div className="text-xs text-gray-400 mt-0.5">
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
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-500/10">
          <h3 className="text-lg font-semibold text-white mb-6">Practice Tests</h3>
          <div className="space-y-2">
            {practiceTests.map((test) => (
              <div
                key={test.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  test.completed 
                    ? 'bg-emerald-500/5 border-emerald-500/20' 
                    : 'bg-white/[0.02] border-white/5 hover:border-emerald-500/20'
                }`}
              >
                <div className="flex-1">
                  <h4 className={`font-medium text-sm ${test.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                    {test.name}
                  </h4>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="text-[10px] text-gray-500">{test.questions} questions</span>
                    <span className="text-[10px] text-gray-500">{test.duration}m</span>
                    <span className="text-[10px] text-gray-500">{test.passingScore}% to pass</span>
                    {test.attempts > 0 && (
                      <span className="text-[10px] text-gray-500">{test.attempts} attempts</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {test.bestScore && (
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">{test.bestScore}%</div>
                      <div className="text-[10px] text-gray-500">Best</div>
                    </div>
                  )}
                  
                  {!test.completed ? (
                    <button
                      onClick={() => {
                        const score = Math.floor(Math.random() * 30) + 70;
                        toggleTestCompletion(test.id, score);
                      }}
                      className="px-3 py-1.5 bg-emerald-500/15 text-emerald-400 rounded-lg hover:bg-emerald-500/25 transition-colors text-xs font-medium border border-emerald-500/20"
                    >
                      Take Test
                    </button>
                  ) : (
                    <span className="text-emerald-400 text-xs font-medium">Completed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lessons Section */}
      {activeTab === 'lessons' && (
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-500/10">
          <h3 className="text-lg font-semibold text-white mb-6">Lessons</h3>
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  lesson.completed 
                    ? 'bg-emerald-500/5 border-emerald-500/20' 
                    : 'bg-white/[0.02] border-white/5 hover:border-emerald-500/20'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleLessonCompletion(lesson.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                      lesson.completed 
                        ? 'bg-emerald-500 border-emerald-500' 
                        : 'border-gray-600 hover:border-emerald-400'
                    }`}
                  >
                    {lesson.completed && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                      {lesson.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        lesson.domain === 'architecture' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        lesson.domain === 'virtualization' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        lesson.domain === 'infrastructure' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        lesson.domain === 'network-assurance' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                        lesson.domain === 'security' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        lesson.domain === 'automation-ai' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                      }`}>
                        {lesson.domain}
                      </span>
                      <span className="text-[10px] text-gray-600">{lesson.duration}m</span>
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
