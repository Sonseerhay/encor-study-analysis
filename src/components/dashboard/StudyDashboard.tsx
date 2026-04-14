'use client';

import { useState, useEffect } from 'react';
import { StudySession, StudyStats, StudyTopic } from '@/lib/types';

export default function StudyDashboard() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [stats, setStats] = useState<StudyStats | null>(null);
  const [topics, setTopics] = useState<StudyTopic[]>([]);
  const [loading, setLoading] = useState(true);

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
      const calculatedStats = calculateStats(sessionsData.sessions || []);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (sessionData: StudySession[]): StudyStats => {
    const totalHours = sessionData.reduce((acc, session) => acc + session.duration_minutes / 60, 0);
    const totalSessions = sessionData.length;
    const averageSessionDuration = totalSessions > 0 ? totalHours / totalSessions : 0;
    
    return {
      totalHours,
      totalSessions,
      averageSessionDuration,
      currentStreak: 0, // TODO: Calculate from consecutive days
      topicsStudied: topics.length,
      goalsCompleted: 0 // TODO: Calculate from goals
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">ENCORE Study Tracker</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Hours</h3>
          <p className="text-2xl font-bold text-gray-900">{stats?.totalHours.toFixed(1) || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Study Sessions</h3>
          <p className="text-2xl font-bold text-gray-900">{stats?.totalSessions || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Topics Studied</h3>
          <p className="text-2xl font-bold text-gray-900">{stats?.topicsStudied || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Avg Session</h3>
          <p className="text-2xl font-bold text-gray-900">{stats?.averageSessionDuration.toFixed(1) || 0}h</p>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Study Sessions</h2>
        </div>
        <div className="px-6 py-4">
          {sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.slice(0, 5).map((session) => (
                <div key={session.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <h4 className="font-medium text-gray-900">{session.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(session.started_at).toLocaleDateString()} - {session.duration_minutes} minutes
                    </p>
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
            <p className="text-gray-500 text-center py-8">No study sessions yet. Start tracking your progress!</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Log Study Session
        </button>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
          Set Study Goal
        </button>
      </div>
    </div>
  );
}
