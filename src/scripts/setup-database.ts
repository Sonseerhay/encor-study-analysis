#!/usr/bin/env tsx

/**
 * Database setup script
 * Run this script to initialize the database schema
 */

async function setupDatabase() {
  try {
    console.log('Setting up database schema...');
    
    const response = await fetch('http://localhost:3000/api/database/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Database setup completed successfully!');
      console.log(result.message);
    } else {
      console.error('Database setup failed:', result.error);
      if (result.details) {
        console.error('Details:', result.details);
      }
    }
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

// Run the setup
setupDatabase();
