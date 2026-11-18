import React, { useState } from 'react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Download, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isDismissed, platform, promptInstall, dismissBanner } =
    usePWAInstall();
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isInstallable || isInstalled || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    setIsInstalling(true);
    await promptInstall();
    setIsInstalling(false);
  };

  return (
    <div
      role="region"
      aria-label="Install AK67 Application"
      className="mb-4 overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-950/30 via-zinc-900/50 to-zinc-900/30 p-3.5 shadow-sm backdrop-blur-sm animate-in fade-in"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-500/20 p-2 text-blue-400 shrink-0 mt-0.5">
            {platform === 'android' ? (
              <Smartphone className="h-4 w-4" />
            ) : (
              <Monitor className="h-4 w-4" />
            )}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold text-white">Install AK67 on your device</h4>
              <span className="rounded-full bg-blue-500/20 px-1.5 py-0.2 text-[10px] font-medium text-blue-300">
                Offline PWA
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 max-w-xl leading-relaxed">
              Install AK67 as a standalone app for instant offline access to all 188 curriculum items, distraction-free study mode, and zero load times.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissBanner}
            className="h-7 text-xs text-zinc-400 hover:text-white"
          >
            Dismiss
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleInstall}
            disabled={isInstalling}
            className="h-7 gap-1.5 text-xs bg-blue-600 hover:bg-blue-500"
          >
            <Download className="h-3 w-3" />
            {isInstalling ? 'Installing...' : 'Install App'}
          </Button>
        </div>
      </div>
    </div>
  );
};
