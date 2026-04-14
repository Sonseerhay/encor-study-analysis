import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function POST() {
  try {
    // Read and execute the schema
    const schemaPath = join(process.cwd(), 'src', 'lib', 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');
    
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    // Execute each statement
    for (const statement of statements) {
      await sql`${statement}`;
    }

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
