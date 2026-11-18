import React, { useState } from 'react';
import { useBackupReminder } from '@/hooks/useBackupReminder';
import { backupEngine } from '@/services/backup/backupEngine';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, Download, X, Check } from 'lucide-react';

export const BackupReminderBanner: React.FC = () => {
  const { shouldRemind, reason, dismissReminder } = useBackupReminder();
  const [downloading, setDownloading] = useState(false);
  const [justDownloaded, setJustDownloaded] = useState(false);

  if (!shouldRemind) {
    return null;
  }

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await backupEngine.downloadBackup();
      setJustDownloaded(true);
      setTimeout(() => {
        dismissReminder(7);
      }, 2000);
    } catch (err) {
      console.error('[BackupReminder] Failed to download backup:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200 shadow-sm animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-amber-300">Keep Your Preparation Progress Safe</p>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              {reason} Clearing browser cache or switching devices will erase local progress without a backup.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          {justDownloaded ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs py-1 px-2.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              <Check className="h-3.5 w-3.5" />
              Backup Saved!
            </span>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownload}
              disabled={downloading}
              className="h-7 text-xs gap-1.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold border-none"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{downloading ? 'Downloading...' : 'Export Backup Now'}</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => dismissReminder(2)}
            className="h-7 text-xs text-zinc-400 hover:text-zinc-200 px-2"
            title="Dismiss reminder for 2 days"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            <span>Dismiss</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
