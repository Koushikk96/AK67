import { useState, useEffect, useCallback } from 'react';
import { settingsRepository } from '@/db/repositories/settingsRepository';
import { problemRepository } from '@/db/repositories/problemRepository';

export interface BackupReminderState {
  shouldRemind: boolean;
  reason: string;
  lastBackupDate: string | null;
  dismissReminder: (days?: number) => Promise<void>;
  checkReminder: () => Promise<void>;
}

export const useBackupReminder = (): BackupReminderState => {
  const [shouldRemind, setShouldRemind] = useState(false);
  const [reason, setReason] = useState('');
  const [lastBackupDate, setLastBackupDate] = useState<string | null>(null);

  const checkReminder = useCallback(async () => {
    try {
      const dismissedUntil = await settingsRepository.getBackupReminderDismissedUntil();
      const now = Date.now();

      if (dismissedUntil && new Date(dismissedUntil).getTime() > now) {
        setShouldRemind(false);
        return;
      }

      const lastBackup = await settingsRepository.getLastBackupDate();
      setLastBackupDate(lastBackup);

      const solvedCount = await problemRepository.countSolved();

      if (!lastBackup) {
        // Never backed up
        if (solvedCount >= 3) {
          setShouldRemind(true);
          setReason(`You have solved ${solvedCount} problems without creating a local backup.`);
          return;
        }
      } else {
        const lastBackupTime = new Date(lastBackup).getTime();
        const diffDays = (now - lastBackupTime) / (1000 * 60 * 60 * 24);

        if (diffDays >= 3) {
          setShouldRemind(true);
          setReason(`It has been ${Math.floor(diffDays)} days since your last progress backup.`);
          return;
        }
      }

      setShouldRemind(false);
    } catch (err) {
      console.error('[useBackupReminder] Error checking reminder status:', err);
    }
  }, []);

  const dismissReminder = useCallback(
    async (days: number = 2) => {
      const untilDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      await settingsRepository.setBackupReminderDismissedUntil(untilDate);
      setShouldRemind(false);
    },
    []
  );

  useEffect(() => {
    checkReminder();
  }, [checkReminder]);

  return { shouldRemind, reason, lastBackupDate, dismissReminder, checkReminder };
};
