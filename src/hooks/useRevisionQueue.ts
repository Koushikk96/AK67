import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  revisionService,
  RevisionItem,
  RevisionQueueData,
  RevisionDomain,
} from '@/services/revisionService';

export const useRevisionQueue = (domainFilter?: RevisionDomain | 'all') => {
  const [data, setData] = useState<RevisionQueueData>({
    dueToday: [],
    overdue: [],
    upcoming: [],
    completed: [],
    totalActive: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const refreshQueue = useCallback(async () => {
    try {
      setLoading(true);
      const res = await revisionService.getRevisionQueue();
      setData(res);
    } catch (err) {
      console.error('[useRevisionQueue] Error loading revision queue:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshQueue();
  }, [refreshQueue]);

  // Filter items by domain if requested
  const filterList = useCallback(
    (items: RevisionItem[]) => {
      if (!domainFilter || domainFilter === 'all') return items;
      return items.filter((i) => i.domain === domainFilter);
    },
    [domainFilter]
  );

  const dueToday = useMemo(() => filterList(data.dueToday), [data.dueToday, filterList]);
  const overdue = useMemo(() => filterList(data.overdue), [data.overdue, filterList]);
  const upcoming = useMemo(() => filterList(data.upcoming), [data.upcoming, filterList]);
  const completed = useMemo(() => filterList(data.completed), [data.completed, filterList]);

  const markRevised = useCallback(
    async (id: string, itemType: 'dsa' | 'topic') => {
      await revisionService.markRevised(id, itemType);
      await refreshQueue();
    },
    [refreshQueue]
  );

  const postpone = useCallback(
    async (id: string, itemType: 'dsa' | 'topic', days: number = 1) => {
      await revisionService.postponeItem(id, itemType, days);
      await refreshQueue();
    },
    [refreshQueue]
  );

  const removeFromQueue = useCallback(
    async (id: string, itemType: 'dsa' | 'topic') => {
      await revisionService.removeFromQueue(id, itemType);
      await refreshQueue();
    },
    [refreshQueue]
  );

  const enrollItem = useCallback(
    async (id: string, itemType: 'dsa' | 'topic', daysUntilDue: number = 1) => {
      await revisionService.enrollItem(id, itemType, daysUntilDue);
      await refreshQueue();
    },
    [refreshQueue]
  );

  return {
    dueToday,
    overdue,
    upcoming,
    completed,
    totalActive: dueToday.length + overdue.length + upcoming.length,
    counts: {
      dueToday: data.dueToday.length,
      overdue: data.overdue.length,
      upcoming: data.upcoming.length,
      completed: data.completed.length,
      totalActive: data.totalActive,
    },
    loading,
    markRevised,
    postpone,
    removeFromQueue,
    enrollItem,
    refreshQueue,
  };
};
