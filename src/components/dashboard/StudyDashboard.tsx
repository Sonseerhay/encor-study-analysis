'use client';

import { useState, useEffect } from 'react';
import { StudySession, StudyStats, StudyTopic } from '@/lib/types';
import StudySessionForm from './StudySessionForm';
import TopicForm from './TopicForm';
import SampleDataButton from './SampleDataButton';
import CountdownTimer from './CountdownTimer';

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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your study data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ENCORE Study Tracker</h1>
              <p className="text-gray-600 mt-1">Track your learning progress and achieve your goals</p>
            </div>
            <div className="flex gap-3">
              <StudySessionForm onSessionAdded={fetchDashboardData} />
              <TopicForm onTopicAdded={fetchDashboardData} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: 'dashboard' },
              { id: 'sessions', label: 'Study Sessions', icon: 'book' },
              { id: 'topics', label: 'Topics', icon: 'folder' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">Total Hours</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stats?.totalHours.toFixed(1) || 0}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">of study time</p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">h</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">Study Sessions</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stats?.totalSessions || 0}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">completed</p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">S</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">Topics</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stats?.topicsStudied || 0}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">studied</p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">T</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">Avg Session</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stats?.averageSessionDuration.toFixed(1) || 0}h
                    </p>
                    <p className="text-sm text-gray-500 mt-1">duration</p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">A</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CountdownTimer />
              </div>
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full mr-2 bg-indigo-500"></div>
                  <h3 className="font-medium text-gray-900">Study Goal</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Stay focused and consistent with your study schedule. Every session counts toward your ENCORE success!
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Daily Target:</span>
                    <span className="font-medium">2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Weekly Target:</span>
                    <span className="font-medium">14 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current Progress:</span>
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
  );
}
