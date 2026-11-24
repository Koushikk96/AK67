import React from 'react';
import { RouteId } from '@/types/navigation';
import { Header } from '@/components/layout/Header';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { BackupReminderBanner } from '@/components/backup/BackupReminderBanner';
import { NetworkStatusBanner } from '@/components/pwa/NetworkStatusBanner';
import { PWAInstallBanner } from '@/components/pwa/PWAInstallBanner';
import { PWAUpdateToast } from '@/components/pwa/PWAUpdateToast';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

interface AppShellProps {
  currentRoute: RouteId;
  navigate: (route: RouteId) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ currentRoute, navigate, children }) => {
  return (
    <div className="flex min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-blue-600/30 selection:text-blue-200">
      {/* Desktop Sidebar (Permanent) */}
      <DesktopSidebar currentRoute={currentRoute} navigate={navigate} />

      {/* Main Content Column */}
      <div className="flex flex-1 flex-col overflow-x-hidden pb-20 lg:pb-8">
        <Header currentRoute={currentRoute} navigate={navigate} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <NetworkStatusBanner />
          <PWAInstallBanner />
          <BackupReminderBanner />
          <ErrorBoundary onReset={() => navigate('dashboard')}>
            {children}
          </ErrorBoundary>
        </main>

        {/* Floating PWA Update Notification */}
        <PWAUpdateToast />

        {/* Mobile Fixed Bottom Navigation */}
        <MobileBottomNav currentRoute={currentRoute} navigate={navigate} />
      </div>
    </div>
  );
};
