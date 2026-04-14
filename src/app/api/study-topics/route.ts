import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

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

    const topics = await sql`
      SELECT * FROM study_topics 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ topics });
  } catch (error) {
    console.error('Error fetching study topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch study topics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const topicData = await request.json();
    const { user_id, name, description, color = '#3B82F6' } = topicData;

    if (!user_id || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: user_id, name' },
        { status: 400 }
      );
    }

    const newTopic = await sql`
      INSERT INTO study_topics (user_id, name, description, color)
      VALUES (${user_id}, ${name}, ${description || null}, ${color})
      RETURNING *
    `;

    return NextResponse.json({ topic: newTopic[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating study topic:', error);
    return NextResponse.json(
      { error: 'Failed to create study topic' },
      { status: 500 }
    );
  }
}
