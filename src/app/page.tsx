import StudyDashboard from '@/components/dashboard/StudyDashboard';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

export default function Home() {
  return (
    <ErrorBoundary>
      <StudyDashboard />
    </ErrorBoundary>
  );
}
