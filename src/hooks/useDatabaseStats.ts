import { useState, useEffect, useCallback } from 'react';
import { DatabaseStats } from '@/types/database';
import { statsService } from '@/services/statsService';

export const useDatabaseStats = () => {
  const [stats, setStats] = useState<DatabaseStats>({
    problemProgressCount: 0,
    solvedProblemsCount: 0,
    topicProgressCount: 0,
    dailyPlannerCount: 0,
    mockTestsCount: 0,
    companyProfilesCount: 0,
    notesCount: 0,
    mistakesCount: 0,
    studySessionsCount: 0,
    lastBackupDate: null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const refreshStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await statsService.getDatabaseStats();
      setStats(data);
    } catch (err) {
      console.error('[useDatabaseStats] Failed to load database stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return { stats, loading, refreshStats };
};
