import React from 'react';
import { RouteId, NavSection } from '@/types/navigation';
import { NAVIGATION_ITEMS } from '@/utils/navigationItems';
import { NavIcon } from '@/components/common/NavIcon';
import { cn } from '@/utils/cn';
import { HardDrive, CheckCircle2 } from 'lucide-react';

interface DesktopSidebarProps {
  currentRoute: RouteId;
  navigate: (route: RouteId) => void;
}

const SECTION_LABELS: Record<NavSection, string> = {
  core: 'CORE PREPARATION',
  practice: 'PRACTICE MODULES',
  assessment: 'ASSESSMENT & CAREER',
  personal: 'PERSONAL STORAGE',
};

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentRoute, navigate }) => {
  const sections: NavSection[] = ['core', 'practice', 'assessment', 'personal'];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-zinc-850 bg-[#0d0d10] select-none h-screen sticky top-0 overflow-y-auto">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-zinc-850 px-5">
        <div 
          onClick={() => navigate('dashboard')}
          className="flex cursor-pointer items-center gap-2.5 transition hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-black tracking-wider text-white shadow-inner">
            AK
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-zinc-100 text-base">AK67</span>
              <span className="rounded bg-blue-500/10 px-1.5 py-0.2 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">Placement Preparation</p>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 space-y-5 px-3 py-4">
        {sections.map((section) => {
          const items = NAVIGATION_ITEMS.filter((item) => item.section === section);
          if (items.length === 0) return null;

          return (
            <div key={section} className="space-y-1">
              <h4 className="px-2.5 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                {SECTION_LABELS[section]}
              </h4>
              <div className="space-y-0.5">
                {items.map((item) => {
                  const isActive = currentRoute === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.id)}
                      className={cn(
                        'group flex w-full items-center justify-between rounded-md px-2.5 py-2 text-xs font-medium transition-all text-left',
                        isActive
                          ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold'
                          : 'text-zinc-400 hover:bg-zinc-850/60 hover:text-zinc-200 border border-transparent'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <NavIcon
                          name={item.iconName}
                          className={cn(
                            'h-4 w-4 transition-colors',
                            isActive ? 'text-blue-400' : 'text-zinc-400 group-hover:text-zinc-300'
                          )}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            'rounded-full px-1.5 py-0.2 text-[10px] font-semibold',
                            isActive
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-zinc-800 text-zinc-400 border border-zinc-750'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Persistence & Device Health Indicator Footer */}
      <div className="border-t border-zinc-850 p-3.5 bg-[#09090b]/40">
        <div 
          onClick={() => navigate('settings')}
          className="flex cursor-pointer items-center justify-between rounded-lg border border-zinc-800 bg-[#121215] p-2.5 transition hover:border-zinc-700 hover:bg-zinc-900"
        >
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-emerald-400" />
            <div>
              <p className="text-xs font-medium text-zinc-200">Device Storage</p>
              <p className="text-[10px] text-zinc-400">IndexedDB Active</p>
            </div>
          </div>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
        </div>
      </div>
    </aside>
  );
};
