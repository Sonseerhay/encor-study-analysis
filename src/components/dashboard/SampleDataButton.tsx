'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function SampleDataButton({ onDataAdded }: { onDataAdded: () => void }) {
  const [isAdding, setIsAdding] = useState(false);

  const addSampleData = async () => {
    setIsAdding(true);
    
    try {
      // Add sample topics
      const sampleTopics = [
        { name: 'Mathematics', description: 'Advanced calculus and algebra', color: '#3B82F6' },
        { name: 'Physics', description: 'Quantum mechanics and thermodynamics', color: '#10B981' },
        { name: 'Chemistry', description: 'Organic and inorganic chemistry', color: '#F59E0B' },
        { name: 'Computer Science', description: 'Data structures and algorithms', color: '#8B5CF6' },
        { name: 'Biology', description: 'Molecular biology and genetics', color: '#EF4444' }
      ];

      for (const topic of sampleTopics) {
        await fetch('/api/study-topics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...topic,
            user_id: 'mock-user-id'
          })
        });
      }

      // Add sample sessions
      const sampleSessions = [
        { title: 'Calculus Chapter 5 Review', duration_minutes: 45, difficulty_level: 4, notes: 'Reviewed integration techniques', completion_status: 'completed' },
        { title: 'Physics Lab Report', duration_minutes: 30, difficulty_level: 3, notes: 'Completed experiment analysis', completion_status: 'completed' },
        { title: 'Chemistry Equations Practice', duration_minutes: 60, difficulty_level: 5, notes: 'Challenging balancing problems', completion_status: 'partial' },
        { title: 'Algorithm Design', duration_minutes: 90, difficulty_level: 4, notes: 'Dynamic programming problems', completion_status: 'completed' },
        { title: 'Biology Reading Assignment', duration_minutes: 25, difficulty_level: 2, notes: 'Chapter 12 on cell division', completion_status: 'completed' },
        { title: 'Math Problem Set', duration_minutes: 120, difficulty_level: 5, notes: 'Final exam preparation', completion_status: 'completed' },
        { title: 'Physics Simulation', duration_minutes: 40, difficulty_level: 3, notes: 'Wave mechanics simulation', completion_status: 'completed' },
        { title: 'Chemistry Lab', duration_minutes: 180, difficulty_level: 4, notes: 'Organic synthesis experiment', completion_status: 'completed' }
      ];

      for (const session of sampleSessions) {
        await fetch('/api/study-sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...session,
            user_id: 'mock-user-id'
          })
        });
      }

      onDataAdded();
    } catch (error) {
      console.error('Error adding sample data:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={addSampleData}
      disabled={isAdding}
      className="text-sm"
    >
      {isAdding ? 'Adding Sample Data...' : 'Add Sample Data'}
    </Button>
  );
}
