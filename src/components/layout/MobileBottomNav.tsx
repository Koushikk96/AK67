import React, { useState } from 'react';
import { RouteId } from '@/types/navigation';
import { NAVIGATION_ITEMS, MOBILE_PRIMARY_NAV } from '@/utils/navigationItems';
import { NavIcon } from '@/components/common/NavIcon';
import { cn } from '@/utils/cn';
import { MoreHorizontal, X, ShieldCheck } from 'lucide-react';

interface MobileBottomNavProps {
  currentRoute: RouteId;
  navigate: (route: RouteId) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentRoute, navigate }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const primaryItems = NAVIGATION_ITEMS.filter((item) =>
    MOBILE_PRIMARY_NAV.includes(item.id)
  );

  const isMoreActive = !MOBILE_PRIMARY_NAV.includes(currentRoute);

  const handleSelectRoute = (route: RouteId) => {
    navigate(route);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Slide-up Drawer for "More" Navigation */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Sheet */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="All AK67 Modules"
            className="fixed inset-x-0 bottom-16 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-zinc-800 bg-[#121215] p-5 shadow-2xl animate-in slide-in-from-bottom duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="font-semibold text-zinc-100 text-sm">All AK67 Modules</h3>
                <p className="text-xs text-zinc-400">Preparation & Career Navigation</p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-4">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = currentRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectRoute(item.id)}
                    className={cn(
                      'flex items-center gap-2.5 rounded-lg border p-3 text-left transition-colors',
                      isActive
                        ? 'border-blue-500/40 bg-blue-600/10 text-blue-400 font-semibold'
                        : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800/50'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-md border',
                        isActive
                          ? 'border-blue-500/30 bg-blue-500/20 text-blue-400'
                          : 'border-zinc-800 bg-zinc-800 text-zinc-400'
                      )}
                    >
                      <NavIcon name={item.iconName} className="h-4 w-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="truncate text-xs font-medium text-zinc-200">{item.label}</p>
                      <p className="truncate text-[10px] text-zinc-400">{item.shortLabel}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3 text-xs text-zinc-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Zero Account • Local Storage Only</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">v1.0.0</span>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 w-full items-center justify-around border-t border-zinc-850 bg-[#0d0d10]/95 px-2 backdrop-blur-md lg:hidden select-none">
        {primaryItems.map((item) => {
          const isActive = currentRoute === item.id && !drawerOpen;
          return (
            <button
              key={item.id}
              onClick={() => {
                setDrawerOpen(false);
                navigate(item.id);
              }}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-1 px-3 text-xs font-medium transition-colors min-w-[56px] min-h-[44px]',
                isActive ? 'text-blue-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              <NavIcon
                name={item.iconName}
                className={cn('h-5 w-5 transition-transform', isActive && 'scale-110 text-blue-400')}
              />
              <span className="text-[11px] leading-none">{item.shortLabel || item.label}</span>
            </button>
          );
        })}

        {/* More / Menu Button */}
        <button
          onClick={() => setDrawerOpen((prev) => !prev)}
          className={cn(
            'flex flex-col items-center justify-center gap-1 py-1 px-3 text-xs font-medium transition-colors min-w-[56px] min-h-[44px]',
            isMoreActive || drawerOpen ? 'text-blue-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
          )}
        >
          <MoreHorizontal
            className={cn(
              'h-5 w-5 transition-transform',
              (isMoreActive || drawerOpen) && 'scale-110 text-blue-400'
            )}
          />
          <span className="text-[11px] leading-none">More</span>
        </button>
      </nav>
    </>
  );
};
