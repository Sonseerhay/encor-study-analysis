import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { StudySession } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const sessions = await sql`
      SELECT * FROM study_sessions 
      WHERE user_id = ${userId}
      ORDER BY started_at DESC
      LIMIT 50
    `;

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error fetching study sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch study sessions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionData = await request.json();
    const {
      user_id,
      topic_id,
      title,
      notes,
      duration_minutes,
      difficulty_level,
      completion_status = 'completed'
    } = sessionData;

    // Validate required fields
    if (!user_id || !title || !duration_minutes) {
      return NextResponse.json(
        { error: 'Missing required fields: user_id, title, duration_minutes' },
        { status: 400 }
      );
    }

    const newSession = await sql`
      INSERT INTO study_sessions (
        user_id, topic_id, title, notes, duration_minutes, 
        difficulty_level, completion_status, completed_at
      ) VALUES (
        ${user_id}, ${topic_id || null}, ${title}, ${notes || null}, 
        ${duration_minutes}, ${difficulty_level || null}, ${completion_status},
        ${completion_status === 'completed' ? new Date().toISOString() : null}
      )
      RETURNING *
    `;

    // Update progress tracking
    await sql`
      INSERT INTO progress_tracking (user_id, topic_id, date, hours_studied, sessions_completed)
      VALUES (
        ${user_id}, ${topic_id || null}, CURRENT_DATE, 
        ${duration_minutes / 60}, 1
      )
      ON CONFLICT (user_id, topic_id, date)
      DO UPDATE SET
        hours_studied = progress_tracking.hours_studied + ${duration_minutes / 60},
        sessions_completed = progress_tracking.sessions_completed + 1
    `;

    return NextResponse.json({ session: newSession[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating study session:', error);
    return NextResponse.json(
      { error: 'Failed to create study session' },
      { status: 500 }
    );
  }
}
