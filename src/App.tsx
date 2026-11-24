import React from 'react';
import { ThemeProvider } from '@/hooks/useTheme';
import { useRouter } from '@/hooks/useRouter';
import { AppShell } from '@/components/layout/AppShell';

// Page imports
import { DashboardPage } from '@/pages/Dashboard/DashboardPage';
import { DSAPage } from '@/pages/DSA/DSAPage';
import { CPPPage } from '@/pages/CPP/CPPPage';
import { SQLPage } from '@/pages/SQL/SQLPage';
import { CoreCSPage } from '@/pages/CoreCS/CoreCSPage';
import { AptitudePage } from '@/pages/Aptitude/AptitudePage';
import { RevisionPage } from '@/pages/Revision/RevisionPage';
import { PlannerPage } from '@/pages/Planner/PlannerPage';
import { MockTestsPage } from '@/pages/MockTests/MockTestsPage';
import { InterviewsPage } from '@/pages/Interviews/InterviewsPage';
import { CompaniesPage } from '@/pages/Companies/CompaniesPage';
import { AnalyticsPage } from '@/pages/Analytics/AnalyticsPage';
import { NotesPage } from '@/pages/Notes/NotesPage';
import { MistakesPage } from '@/pages/Mistakes/MistakesPage';
import { SettingsPage } from '@/pages/Settings/SettingsPage';

// Lazy-loaded comprehensive mastery curriculum tracks for optimal initial load & PWA caching
const PythonPage = React.lazy(() => import('@/pages/Python/PythonPage').then((m) => ({ default: m.PythonPage })));
const JavaPage = React.lazy(() => import('@/pages/Java/JavaPage').then((m) => ({ default: m.JavaPage })));

const AppContent: React.FC = () => {
  const { currentRoute, navigate } = useRouter();

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <DashboardPage navigate={navigate} />;
      case 'dsa':
        return <DSAPage />;
      case 'cpp':
        return <CPPPage />;
      case 'python':
        return <PythonPage />;
      case 'java':
        return <JavaPage />;
      case 'sql':
        return <SQLPage />;
      case 'core-cs':
        return <CoreCSPage />;
      case 'aptitude':
        return <AptitudePage />;
      case 'revision':
        return <RevisionPage />;
      case 'planner':
        return <PlannerPage />;
      case 'mock-tests':
        return <MockTestsPage />;
      case 'interview':
        return <InterviewsPage />;
      case 'companies':
        return <CompaniesPage />;
      case 'analytics':
        return <AnalyticsPage navigate={navigate} />;
      case 'notes':
        return <NotesPage />;
      case 'mistakes':
        return <MistakesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage navigate={navigate} />;
    }
  };

  return (
    <AppShell currentRoute={currentRoute} navigate={navigate}>
      <React.Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh] text-zinc-400">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading learning track...</span>
            </div>
          </div>
        }
      >
        {renderCurrentPage()}
      </React.Suspense>
    </AppShell>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
