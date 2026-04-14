'use client';

import StudySessionForm from '@/components/dashboard/StudySessionForm';
import TopicForm from '@/components/dashboard/TopicForm';

export default function ElegantHeader({ onSessionAdded, onTopicAdded }: { 
  onSessionAdded: () => void;
  onTopicAdded: () => void;
}) {
  return (
    <header className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  ENCORE Study Tracker
                </h1>
                <p className="text-sm text-slate-400">Professional learning progress & achievement tracking</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Last updated: Just now</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <StudySessionForm onSessionAdded={onSessionAdded} />
              <TopicForm onTopicAdded={onTopicAdded} />
            </div>

            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full border-2 border-slate-800"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
