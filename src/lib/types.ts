export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

export interface StudyTopic {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface StudySession {
  id: string;
  user_id: string;
  topic_id?: string;
  title: string;
  notes?: string;
  duration_minutes: number;
  difficulty_level?: number;
  completion_status: 'completed' | 'partial' | 'skipped';
  started_at: string;
  completed_at?: string;
  created_at: string;
}

export interface StudyGoal {
  id: string;
  user_id: string;
  topic_id?: string;
  title: string;
  description?: string;
  target_hours: number;
  current_hours: number;
  target_date?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProgressTracking {
  id: string;
  user_id: string;
  topic_id?: string;
  date: string;
  hours_studied: number;
  sessions_completed: number;
  created_at: string;
}

export interface StudyStats {
  totalHours: number;
  totalSessions: number;
  averageSessionDuration: number;
  currentStreak: number;
  topicsStudied: number;
  goalsCompleted: number;
}
