import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { RouteId } from '@/types/navigation';
import { Sun, Moon, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  currentRoute: RouteId;
  navigate: (route: RouteId) => void;
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ navigate }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-zinc-850 bg-[#09090b]/80 px-4 backdrop-blur-md lg:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile Brand Label */}
        <div 
          onClick={() => navigate('dashboard')}
          className="flex cursor-pointer items-center gap-2 lg:hidden select-none"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 font-bold text-white text-xs">
            AK
          </div>
          <span className="font-bold tracking-tight text-zinc-100 text-sm">AK67</span>
        </div>

        {/* Tagline / Subtitle (Desktop only) */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium text-zinc-300">Your Placement Preparation System</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-500">Zero Accounts • Client Persistent</span>
        </div>
      </div>

      {/* Right Action Area */}
      <div className="flex items-center gap-2">
        {/* Study Streak Pill */}
        <div 
          onClick={() => navigate('planner')}
          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-amber-400 transition hover:border-zinc-700"
          title="Active Study Streak"
        >
          <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-zinc-200">0 Day Streak</span>
        </div>

        {/* Target Countdown Pill */}
        <div 
          onClick={() => navigate('settings')}
          className="hidden sm:flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-zinc-300 transition hover:border-zinc-700"
          title="Target Placement Season"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Placement 2026</span>
        </div>

        {/* Backup Status Reminder Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('settings')}
          className="h-8 gap-1.5 border-zinc-800 bg-zinc-900/60 px-2.5 text-xs text-zinc-300 hover:text-white"
          title="Data Storage and Backup Health"
        >
          <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden md:inline">Backup Health</span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="h-8 w-8 text-zinc-400 hover:text-zinc-100"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 transition-transform hover:rotate-45" />
          ) : (
            <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
          )}
        </Button>
      </div>
    </header>
  );
};
