import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { WifiOff, Wifi, HardDrive } from 'lucide-react';

export const NetworkStatusBanner: React.FC = () => {
  const { networkState } = useNetworkStatus();

  if (networkState === 'online') {
    return null;
  }

  if (networkState === 'reconnected') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mb-4 flex items-center justify-between rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-3.5 py-2.5 text-xs text-emerald-200 shadow-sm backdrop-blur-md animate-in fade-in slide-in-from-top-2"
      >
        <div className="flex items-center gap-2">
          <Wifi className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="font-medium">Internet connection restored.</span>
          <span className="text-emerald-400/80 hidden sm:inline">
            You are back online.
          </span>
        </div>
      </div>
    );
  }

  // isOffline
  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-4 flex items-center justify-between rounded-lg border border-amber-500/40 bg-amber-950/30 px-3.5 py-2.5 text-xs text-amber-200 shadow-sm backdrop-blur-md animate-in fade-in slide-in-from-top-2"
    >
      <div className="flex items-center gap-2.5">
        <WifiOff className="h-4 w-4 text-amber-400 shrink-0" />
        <div>
          <span className="font-semibold text-amber-300">Working Offline: </span>
          <span className="text-zinc-300">
            All 188 curriculum items, test engines & personal notes remain fully available.
          </span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-1.5 text-[11px] text-zinc-400 shrink-0 pl-3">
        <HardDrive className="h-3 w-3 text-emerald-400" />
        <span>IndexedDB active</span>
      </div>
    </div>
  );
};
