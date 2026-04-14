'use client';

import { StudyStats } from '@/lib/types';

interface ElegantStatsProps {
  stats: StudyStats | null;
}

export default function ElegantStats({ stats }: ElegantStatsProps) {
  const statCards = [
    {
      title: 'Total Hours',
      value: stats?.totalHours.toFixed(1) || '0',
      subtitle: 'study time',
      color: 'purple',
      icon: 'clock',
      trend: '+12% from last week'
    },
    {
      title: 'Study Sessions',
      value: stats?.totalSessions || '0',
      subtitle: 'completed',
      color: 'pink',
      icon: 'book',
      trend: '+8% from last week'
    },
    {
      title: 'Topics',
      value: stats?.topicsStudied || '0',
      subtitle: 'mastered',
      color: 'teal',
      icon: 'folder',
      trend: '+2 new this week'
    },
    {
      title: 'Avg Session',
      value: `${stats?.averageSessionDuration.toFixed(1) || '0'}h`,
      subtitle: 'duration',
      color: 'orange',
      icon: 'trending',
      trend: 'On track'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'clock':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'book':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'folder':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        );
      case 'trending':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return 'from-purple-500 to-purple-600 bg-purple-100 text-purple-700 border-purple-200';
      case 'pink':
        return 'from-pink-500 to-pink-600 bg-pink-100 text-pink-700 border-pink-200';
      case 'teal':
        return 'from-teal-500 to-teal-600 bg-teal-100 text-teal-700 border-teal-200';
      case 'orange':
        return 'from-orange-500 to-orange-600 bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'from-gray-500 to-gray-600 bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          {/* Decorative top border */}
          <div className={`h-1 bg-gradient-to-r ${getColorClasses(card.color).split(' ')[0]}`}></div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${getColorClasses(card.color).split(' ')[1]}`}>
                {getIcon(card.icon)}
              </div>
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>{card.trend}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
              <div>
                <p className="text-sm font-medium text-gray-700">{card.title}</p>
                <p className="text-xs text-gray-500">{card.subtitle}</p>
              </div>
            </div>
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  );
}
