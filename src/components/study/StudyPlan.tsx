'use client';

import { useState, useEffect } from 'react';
import { ENCORE_BLUEPRINT, STUDY_SCHEDULE, getCurrentWeek, getWeeklyGoal, BlueprintDomain, BlueprintTopic } from '@/data/encoreBlueprint';

export default function StudyPlan() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [expandedDomains, setExpandedDomains] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCurrentWeek(getCurrentWeek());
  }, []);

  const toggleDomain = (domainId: string) => {
    setExpandedDomains(prev => 
      prev.includes(domainId) 
        ? prev.filter(id => id !== domainId)
        : [...prev, domainId]
    );
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const calculateProgress = (domain: BlueprintDomain) => {
    const completed = domain.topics.filter(topic => completedTopics.has(topic.id)).length;
    return (completed / domain.topics.length) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const weeklyGoal = getWeeklyGoal(currentWeek);
  const totalProgress = ENCORE_BLUEPRINT.reduce((acc, domain) => {
    return acc + calculateProgress(domain) * (domain.percentage / 100);
  }, 0) / ENCORE_BLUEPRINT.length;

  return (
    <div className="space-y-6">
      {/* Study Overview */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          ENCORE 350-401 Study Plan
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{currentWeek}</div>
            <div className="text-sm text-gray-600">Current Week</div>
            <div className="text-xs text-gray-500 mt-1">of {STUDY_SCHEDULE.totalWeeks} weeks</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">{totalProgress.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Overall Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600">{weeklyGoal?.hours || 0}h</div>
            <div className="text-sm text-gray-600">This Week's Goal</div>
            <div className="text-xs text-gray-500 mt-1">Study hours target</div>
          </div>
        </div>

        {/* Current Week Focus */}
        {weeklyGoal && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">Week {currentWeek} Focus</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-800">
                  {weeklyGoal.domain === 'review' ? 'Comprehensive Review' : 
                   ENCORE_BLUEPRINT.find(d => d.id === weeklyGoal.domain)?.name}
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  {weeklyGoal.focus}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">{weeklyGoal.hours}h</p>
                <p className="text-xs text-purple-600">target</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Blueprint Domains */}
      <div className="space-y-4">
        {ENCORE_BLUEPRINT.map((domain) => {
          const isExpanded = expandedDomains.includes(domain.id);
          const progress = calculateProgress(domain);
          
          return (
            <div key={domain.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-purple-50/50 transition-colors"
                onClick={() => toggleDomain(domain.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{domain.name}</h3>
                      <p className="text-sm text-gray-600">{domain.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-purple-600">{domain.percentage}%</div>
                      <div className="text-xs text-gray-500">exam weight</div>
                    </div>
                    
                    <div className="text-right w-20">
                      <div className="text-sm font-medium text-gray-900">{progress.toFixed(0)}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-purple-100">
                  {domain.topics.map((topic) => {
                    const isTopicExpanded = expandedTopics.includes(topic.id);
                    const isCompleted = completedTopics.has(topic.id);
                    
                    return (
                      <div key={topic.id} className="border-b border-purple-50 last:border-b-0">
                        <div 
                          className="p-4 cursor-pointer hover:bg-purple-50/30 transition-colors"
                          onClick={() => toggleTopic(topic.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTopicCompletion(topic.id);
                                }}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                  isCompleted 
                                    ? 'bg-purple-500 border-purple-500' 
                                    : 'border-gray-300 hover:border-purple-400'
                                }`}
                              >
                                {isCompleted && (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                  </svg>
                                )}
                              </button>
                              
                              <div className="flex-1">
                                <h4 className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                  {topic.name}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                                
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(topic.difficulty)}`}>
                                    {topic.difficulty}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {topic.estimatedHours}h estimated
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {topic.resources.length} resources
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <svg 
                              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isTopicExpanded ? 'rotate-180' : ''}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>

                        {isTopicExpanded && (
                          <div className="px-4 pb-4 pl-12">
                            {/* Subtopics */}
                            <div className="mb-4">
                              <h5 className="text-sm font-medium text-gray-700 mb-2">Key Topics:</h5>
                              <div className="space-y-1">
                                {topic.subtopics.map((subtopic, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                    </svg>
                                    <span className="text-sm text-gray-600">{subtopic}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Resources */}
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-2">Study Resources:</h5>
                              <div className="space-y-2">
                                {topic.resources.map((resource, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                      <div className={`w-2 h-2 rounded-full ${
                                        resource.type === 'video' ? 'bg-blue-500' :
                                        resource.type === 'documentation' ? 'bg-green-500' :
                                        resource.type === 'lab' ? 'bg-orange-500' :
                                        resource.type === 'practice' ? 'bg-purple-500' :
                                        'bg-gray-500'
                                      }`}></div>
                                      <span className="text-sm text-gray-700">{resource.title}</span>
                                      {resource.duration && (
                                        <span className="text-xs text-gray-500">({resource.duration}m)</span>
                                      )}
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Toggle resource completion
                                      }}
                                      className={`text-xs px-2 py-1 rounded ${
                                        resource.completed 
                                          ? 'bg-green-100 text-green-700' 
                                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                      }`}
                                    >
                                      {resource.completed ? 'Completed' : 'Mark Complete'}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
