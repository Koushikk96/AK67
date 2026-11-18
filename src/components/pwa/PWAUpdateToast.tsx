import React, { useState } from 'react';
import { usePWAUpdate } from '@/hooks/usePWAUpdate';
import { RefreshCw, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const PWAUpdateToast: React.FC = () => {
  const { needRefresh, isDeferred, updateApp, dismissUpdate } = usePWAUpdate();
  const [isUpdating, setIsUpdating] = useState(false);

  // If no update or deferred during active assessment, do not show
  if (!needRefresh || isDeferred) {
    return null;
  }

  const handleUpdate = async () => {
    setIsUpdating(true);
    await updateApp();
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-20 right-4 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-96 rounded-xl border border-blue-500/40 bg-zinc-900/95 p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-500/20 p-2 text-blue-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Application Update Ready</h4>
            <span className="text-[10px] text-zinc-400">New enhancements available</span>
          </div>
        </div>
        <button
          onClick={dismissUpdate}
          aria-label="Dismiss update notification"
          className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
        A new version of AK67 is available. Updating refreshes cached application bundles while keeping 100% of your IndexedDB study progress intact.
      </p>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-zinc-800/80 pt-2.5">
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Safe update</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissUpdate}
            disabled={isUpdating}
            className="h-7 text-xs text-zinc-400 hover:text-white"
          >
            Later
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleUpdate}
            disabled={isUpdating}
            className="h-7 text-xs gap-1.5 bg-blue-600 hover:bg-blue-500"
          >
            {isUpdating ? (
              <>
                <RefreshCw className="h-3 w-3 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <RefreshCw className="h-3 w-3" />
                Update Now
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
