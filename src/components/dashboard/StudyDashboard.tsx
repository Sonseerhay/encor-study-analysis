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
import StudyPlan from '@/components/study/StudyPlan';
import StudySchedule from '@/components/study/StudySchedule';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

export default function StudyDashboard() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [stats, setStats] = useState<StudyStats | null>(null);
  const [topics, setTopics] = useState<StudyTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'topics' | 'analytics'>('overview');

  const handleSetActiveSection = (section: string) => {
    setActiveTab(section as 'overview' | 'sessions' | 'topics' | 'analytics');
  };

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your study data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <ElegantBackground />
      <div className="relative z-10 flex">
        <Sidebar activeSection={activeTab} setActiveSection={handleSetActiveSection} />
        
        <div className="flex-1">
          <ElegantHeader onSessionAdded={fetchDashboardData} onTopicAdded={fetchDashboardData} />

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Countdown Timer as Headline */}
            <CountdownTimer />
            
            {/* Study Mission */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-white">Study Mission</h3>
              </div>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Maintain cybersecurity focus and consistent study habits. Every session strengthens your defense against knowledge gaps!
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Daily Target</span>
                  <span className="font-semibold text-gray-200">2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Weekly Target</span>
                  <span className="font-semibold text-gray-200">14 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Current Progress</span>
                  <span className="font-semibold text-emerald-400">{stats?.totalHours.toFixed(1) || 0}h</span>
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-emerald-500/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-base font-semibold text-white">Recent Study Sessions</h2>
                <button 
                  onClick={() => setActiveTab('sessions')}
                  className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  View All &rarr;
                </button>
              </div>
              <div className="px-6 py-4">
                {sessions.length > 0 ? (
                  <div className="space-y-3">
                    {sessions.slice(0, 5).map((session) => (
                      <div key={session.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-200 text-sm">{session.title}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-xs text-gray-500">
                              {new Date(session.started_at).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {session.duration_minutes} min
                            </p>
                            {session.difficulty_level && (
                              <div className="flex items-center gap-1">
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                      key={level}
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        session.difficulty_level && level <= session.difficulty_level ? 'bg-emerald-400' : 'bg-gray-700'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${
                          session.completion_status === 'completed' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : session.completion_status === 'partial'
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                        }`}>
                          {session.completion_status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-emerald-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">No study sessions yet. Start tracking your progress!</p>
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
              <h2 className="text-2xl font-bold text-white">Study Sessions</h2>
              <StudySessionForm onSessionAdded={fetchDashboardData} />
            </div>
            
            {sessions.length > 0 ? (
              <div className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-emerald-500/10">
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="border-b border-white/5 pb-4 last:border-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-200">{session.title}</h3>
                            {session.notes && (
                              <p className="text-gray-400 mt-1 text-sm">{session.notes}</p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{new Date(session.started_at).toLocaleDateString()}</span>
                              <span>{session.duration_minutes} min</span>
                              {session.difficulty_level && (
                                <span>Level: {session.difficulty_level}/5</span>
                              )}
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${
                            session.completion_status === 'completed' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : session.completion_status === 'partial'
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
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
              <h2 className="text-2xl font-bold text-white">Study Topics</h2>
              <TopicForm onTopicAdded={fetchDashboardData} />
            </div>
            
            {topics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic) => (
                  <div key={topic.id} className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-500/10 hover:border-emerald-500/25 transition-colors" style={{ borderLeftWidth: '3px', borderLeftColor: topic.color }}>
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: topic.color }}></div>
                      <h3 className="font-medium text-gray-200">{topic.name}</h3>
                    </div>
                    {topic.description && (
                      <p className="text-gray-400 text-sm">{topic.description}</p>
                    )}
                    <div className="mt-4 text-xs text-gray-500">
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

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <StudyPlan />
          </div>
        )}

        {activeTab === 'topics' && (
          <div className="space-y-6">
            <StudySchedule />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <AnalyticsDashboard />
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
