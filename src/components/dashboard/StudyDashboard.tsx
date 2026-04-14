'use client';

import { useState, useEffect } from 'react';
import { StudySession, StudyStats, StudyTopic } from '@/lib/types';
import StudySessionForm from './StudySessionForm';
import TopicForm from './TopicForm';
import SampleDataButton from './SampleDataButton';
import CountdownTimer from './CountdownTimer';
import ElegantBackground from '@/components/ui/ElegantBackground';
import Sidebar from '@/components/layout/Sidebar';
import ElegantHeader from '@/components/layout/ElegantHeader';
import ElegantStats from '@/components/dashboard/ElegantStats';

export default function StudyDashboard() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [stats, setStats] = useState<StudyStats | null>(null);
  const [topics, setTopics] = useState<StudyTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'topics'>('overview');

  // Mock user ID for now - in real app this would come from authentication
  const userId = 'mock-user-id';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [sessionsRes, topicsRes] = await Promise.all([
        fetch(`/api/study-sessions?userId=${userId}`),
        fetch(`/api/study-topics?userId=${userId}`)
      ]);

      const sessionsData = await sessionsRes.json();
      const topicsData = await topicsRes.json();

      setSessions(sessionsData.sessions || []);
      setTopics(topicsData.topics || []);
      
      // Calculate stats
      const calculatedStats = calculateStats(sessionsData.sessions || [], topicsData.topics || []);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (sessionData: StudySession[], topicData: StudyTopic[]): StudyStats => {
    const totalHours = sessionData.reduce((acc, session) => acc + session.duration_minutes / 60, 0);
    const totalSessions = sessionData.length;
    const averageSessionDuration = totalSessions > 0 ? totalHours / totalSessions : 0;
    
    return {
      totalHours,
      totalSessions,
      averageSessionDuration,
      currentStreak: 0, // TODO: Calculate from consecutive days
      topicsStudied: topicData.length,
      goalsCompleted: 0 // TODO: Calculate from goals
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen relative">
        <ElegantBackground />
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your study data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <ElegantBackground />
      <div className="relative z-10">
        <ElegantHeader onSessionAdded={fetchDashboardData} onTopicAdded={fetchDashboardData} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Elegant Stats Cards */}
            <ElegantStats stats={stats} />

            {/* Countdown Timer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CountdownTimer />
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full mr-2 bg-indigo-500"></div>
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Study Mission
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Maintain cybersecurity focus and consistent study habits. Every session strengthens your defense against knowledge gaps!
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      Daily Target:
                    </span>
                    <span className="font-medium">2 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                      Weekly Target:
                    </span>
                    <span className="font-medium">14 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                      </svg>
                      Current Progress:
                    </span>
                    <span className="font-medium text-green-600">{stats?.totalHours.toFixed(1) || 0}h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Recent Study Sessions</h2>
                <button 
                  onClick={() => setActiveTab('sessions')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View All
                </button>
              </div>
              <div className="px-6 py-4">
                {sessions.length > 0 ? (
                  <div className="space-y-4">
                    {sessions.slice(0, 5).map((session) => (
                      <div key={session.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{session.title}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-sm text-gray-500">
                              {new Date(session.started_at).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {session.duration_minutes} minutes
                            </p>
                            {session.difficulty_level && (
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-500">Difficulty:</span>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                      key={level}
                                      className={`w-2 h-2 rounded-full ${
                                        session.difficulty_level && level <= session.difficulty_level ? 'bg-orange-400' : 'bg-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            session.completion_status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : session.completion_status === 'partial'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {session.completion_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="text-gray-500">No study sessions yet. Start tracking your progress!</p>
                    <div className="flex gap-3 justify-center mt-4">
                      <StudySessionForm onSessionAdded={fetchDashboardData} />
                      <SampleDataButton onDataAdded={fetchDashboardData} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Study Sessions</h2>
              <StudySessionForm onSessionAdded={fetchDashboardData} />
            </div>
            
            {sessions.length > 0 ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{session.title}</h3>
                            {session.notes && (
                              <p className="text-gray-600 mt-1">{session.notes}</p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>{new Date(session.started_at).toLocaleDateString()}</span>
                              <span>{session.duration_minutes} minutes</span>
                              {session.difficulty_level && (
                                <span>Level: {session.difficulty_level}/5</span>
                              )}
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            session.completion_status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : session.completion_status === 'partial'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {session.completion_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No study sessions found.</p>
                <StudySessionForm onSessionAdded={fetchDashboardData} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'topics' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Study Topics</h2>
              <TopicForm onTopicAdded={fetchDashboardData} />
            </div>
            
            {topics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic) => (
                  <div key={topic.id} className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderLeftColor: topic.color }}>
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: topic.color }}></div>
                      <h3 className="font-medium text-gray-900">{topic.name}</h3>
                    </div>
                    {topic.description && (
                      <p className="text-gray-600 text-sm">{topic.description}</p>
                    )}
                    <div className="mt-4 text-sm text-gray-500">
                      Created {new Date(topic.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No topics created yet.</p>
                <TopicForm onTopicAdded={fetchDashboardData} />
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
