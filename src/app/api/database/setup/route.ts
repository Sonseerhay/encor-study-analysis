import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST() {
  try {
    // Create tables directly
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS study_topics (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        color VARCHAR(7) DEFAULT '#3B82F6',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS study_sessions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        topic_id UUID REFERENCES study_topics(id) ON DELETE SET NULL,
        title VARCHAR(255) NOT NULL,
        notes TEXT,
        duration_minutes INTEGER NOT NULL,
        difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
        completion_status VARCHAR(20) DEFAULT 'completed' CHECK (completion_status IN ('completed', 'partial', 'skipped')),
        started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS study_goals (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        topic_id UUID REFERENCES study_topics(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        target_hours INTEGER NOT NULL,
        current_hours INTEGER DEFAULT 0,
        target_date DATE,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS progress_tracking (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        topic_id UUID REFERENCES study_topics(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        hours_studied NUMERIC(4,2) DEFAULT 0,
        sessions_completed INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, topic_id, date)
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON study_sessions(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_study_sessions_topic_id ON study_sessions(topic_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_study_sessions_started_at ON study_sessions(started_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_study_topics_user_id ON study_topics(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_progress_tracking_user_date ON progress_tracking(user_id, date)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_study_goals_user_id ON study_goals(user_id)`;

    return NextResponse.json({ 
      success: true, 
      message: 'Database schema created successfully' 
    });
  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to set up database schema',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
