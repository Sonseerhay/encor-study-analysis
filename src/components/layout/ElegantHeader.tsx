'use client';

import StudySessionForm from '@/components/dashboard/StudySessionForm';
import TopicForm from '@/components/dashboard/TopicForm';

export default function ElegantHeader({ onSessionAdded, onTopicAdded }: { 
  onSessionAdded: () => void;
  onTopicAdded: () => void;
}) {
  return (
    <header className="bg-gray-900/70 backdrop-blur-md border-b border-emerald-900/20">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              CCNP ENCOR <span className="text-emerald-400">350-401</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Certification Study Dashboard</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 text-xs text-gray-500 bg-white/5 rounded-lg px-3 py-1.5 border border-white/5">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Last updated: Just now</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <StudySessionForm onSessionAdded={onSessionAdded} />
              <TopicForm onTopicAdded={onTopicAdded} />
            </div>

            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
