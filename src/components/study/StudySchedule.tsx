'use client';

import { useState, useEffect } from 'react';
import { STUDY_SCHEDULE, getCurrentWeek, getWeeklyGoal } from '@/data/encoreBlueprint';

interface WeekProgress {
  week: number;
  targetHours: number;
  actualHours: number;
  completed: boolean;
  notes: string;
}

export default function StudySchedule() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weekProgress, setWeekProgress] = useState<WeekProgress[]>([]);
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    setCurrentWeek(getCurrentWeek());
    // Initialize week progress from localStorage or default values
    const savedProgress = localStorage.getItem('weekProgress');
    if (savedProgress) {
      setWeekProgress(JSON.parse(savedProgress));
    } else {
      const initialProgress = STUDY_SCHEDULE.weeklyGoals.map(goal => ({
        week: goal.week,
        targetHours: goal.hours,
        actualHours: 0,
        completed: false,
        notes: ''
      }));
      setWeekProgress(initialProgress);
    }
  }, []);

  const updateWeekProgress = (week: number, field: keyof WeekProgress, value: any) => {
    const updatedProgress = weekProgress.map(wp => 
      wp.week === week ? { ...wp, [field]: value } : wp
    );
    setWeekProgress(updatedProgress);
    localStorage.setItem('weekProgress', JSON.stringify(updatedProgress));
  };

  const getWeekStatus = (week: number) => {
    const progress = weekProgress.find(wp => wp.week === week);
    if (!progress) return 'not-started';
    if (progress.completed) return 'completed';
    if (progress.actualHours >= progress.targetHours) return 'completed';
    if (progress.actualHours > 0) return 'in-progress';
    return 'not-started';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'not-started': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalTargetHours = STUDY_SCHEDULE.weeklyGoals.reduce((acc, goal) => acc + goal.hours, 0);
  const totalActualHours = weekProgress.reduce((acc, wp) => acc + wp.actualHours, 0);
  const overallProgress = (totalActualHours / totalTargetHours) * 100;

  return (
    <div className="space-y-6">
      {/* Schedule Overview */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Study Schedule & Progress
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">{currentWeek}</div>
            <div className="text-sm text-purple-700">Current Week</div>
          </div>
          
          <div className="text-center p-4 bg-pink-50 rounded-xl">
            <div className="text-2xl font-bold text-pink-600">{overallProgress.toFixed(1)}%</div>
            <div className="text-sm text-pink-700">Schedule Progress</div>
          </div>
          
          <div className="text-center p-4 bg-teal-50 rounded-xl">
            <div className="text-2xl font-bold text-teal-600">{totalActualHours}h</div>
            <div className="text-sm text-teal-700">Hours Completed</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-600">{totalTargetHours}h</div>
            <div className="text-sm text-orange-700">Total Target</div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Schedule Progress</span>
            <span>{totalActualHours}h / {totalTargetHours}h</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Week-by-Week Schedule */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Week-by-Week Schedule</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Week List */}
          <div className="space-y-2">
            {STUDY_SCHEDULE.weeklyGoals.map((goal) => {
              const progress = weekProgress.find(wp => wp.week === goal.week);
              const status = getWeekStatus(goal.week);
              const isCurrentWeek = goal.week === currentWeek;
              
              return (
                <div
                  key={goal.week}
                  onClick={() => setSelectedWeek(goal.week)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isCurrentWeek 
                      ? 'border-purple-500 bg-purple-50' 
                      : selectedWeek === goal.week
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCurrentWeek 
                          ? 'bg-purple-500 text-white' 
                          : status === 'completed'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {goal.week}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Week {goal.week}
                          {isCurrentWeek && <span className="ml-2 text-xs bg-purple-500 text-white px-2 py-1 rounded-full">Current</span>}
                        </div>
                        <div className="text-sm text-gray-600">{goal.focus}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(status)}`}>
                        {status.replace('-', ' ')}
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {progress?.actualHours || 0}h
                        </div>
                        <div className="text-xs text-gray-500">/ {goal.hours}h</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Week Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((progress?.actualHours || 0) / goal.hours * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Week Details */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
            {(() => {
              const weekGoal = getWeeklyGoal(selectedWeek);
              const progress = weekProgress.find(wp => wp.week === selectedWeek);
              
              if (!weekGoal || !progress) return null;
              
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-purple-900">Week {selectedWeek} Details</h4>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(getWeekStatus(selectedWeek))}`}>
                      {getWeekStatus(selectedWeek).replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-purple-800 mb-1">Focus Area</p>
                    <p className="text-purple-700">{weekGoal.focus}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-purple-800 mb-1">Target Hours</p>
                    <p className="text-2xl font-bold text-purple-600">{weekGoal.hours}h</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-purple-800 mb-1">Actual Hours</p>
                    <input
                      type="number"
                      value={progress.actualHours}
                      onChange={(e) => updateWeekProgress(selectedWeek, 'actualHours', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      min="0"
                      max={weekGoal.hours * 2}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0h</span>
                      <span>{weekGoal.hours * 2}h max</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-purple-800 mb-1">Notes</p>
                    <textarea
                      value={progress.notes}
                      onChange={(e) => updateWeekProgress(selectedWeek, 'notes', e.target.value)}
                      placeholder="Add notes about this week's study..."
                      className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateWeekProgress(selectedWeek, 'completed', !progress.completed)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        progress.completed
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                      }`}
                    >
                      {progress.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Study Statistics */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-xl font-bold text-purple-600">
              {weekProgress.filter(wp => wp.completed).length}
            </div>
            <div className="text-sm text-purple-700">Weeks Completed</div>
          </div>
          
          <div className="text-center p-4 bg-pink-50 rounded-xl">
            <div className="text-xl font-bold text-pink-600">
              {weekProgress.filter(wp => wp.actualHours > 0).length}
            </div>
            <div className="text-sm text-pink-700">Weeks Started</div>
          </div>
          
          <div className="text-center p-4 bg-teal-50 rounded-xl">
            <div className="text-xl font-bold text-teal-600">
              {weekProgress.length - weekProgress.filter(wp => wp.completed).length}
            </div>
            <div className="text-sm text-teal-700">Weeks Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
}
