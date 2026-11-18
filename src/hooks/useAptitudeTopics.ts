import { useState, useEffect, useCallback, useMemo } from 'react';
import { AptitudeTopicWithProgress, AptitudeCategory, AptitudeStats } from '@/types/aptitude';
import { TopicProgress, TopicStatus } from '@/types/database';
import { allAptitudeTopics, quantTopics, logicalTopics, verbalTopics } from '@/content/aptitude';
import { topicRepository } from '@/db/repositories/topicRepository';
import { addDays, getTodayStr } from '@/services/revisionService';

export const useAptitudeTopics = (categoryFilter?: AptitudeCategory | 'all') => {
  const [progressMap, setProgressMap] = useState<Map<string, TopicProgress>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);

  // Load topic progress records for aptitude from IndexedDB
  const refreshProgress = useCallback(async () => {
    try {
      setLoading(true);
      const records = await topicRepository.getAll();
      const map = new Map<string, TopicProgress>();
      for (const rec of records) {
        if (
          rec.category === 'aptitude' ||
          rec.category === 'quantitative' ||
          rec.category === 'logical' ||
          rec.category === 'verbal' ||
          rec.id.startsWith('quant-') ||
          rec.id.startsWith('log-') ||
          rec.id.startsWith('verb-')
        ) {
          map.set(rec.id, rec);
        }
      }
      setProgressMap(map);
    } catch (err) {
      console.error('[useAptitudeTopics] Error loading aptitude progress:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  // Filter static topics by category
  const filteredTopics = useMemo(() => {
    if (!categoryFilter || categoryFilter === 'all') return allAptitudeTopics;
    return allAptitudeTopics.filter((t) => t.category === categoryFilter);
  }, [categoryFilter]);

  // Merge static topics with progress
  const topicsWithProgress: AptitudeTopicWithProgress[] = useMemo(() => {
    return filteredTopics.map((topic) => ({
      ...topic,
      progress: progressMap.get(topic.id),
    }));
  }, [filteredTopics, progressMap]);

  // Compute stats across all 36 topics
  const stats: AptitudeStats = useMemo(() => {
    let completedTopics = 0;
    let learningTopics = 0;
    let reviseTopics = 0;
    let notStartedTopics = 0;
    let bookmarkedTopics = 0;

    let quantCompleted = 0;
    let logicalCompleted = 0;
    let verbalCompleted = 0;

    for (const t of allAptitudeTopics) {
      const p = progressMap.get(t.id);
      const status: TopicStatus = p?.status || (p?.isMastered ? 'completed' : 'not_started');

      if (status === 'completed') {
        completedTopics++;
        if (t.category === 'quantitative') quantCompleted++;
        else if (t.category === 'logical') logicalCompleted++;
        else if (t.category === 'verbal') verbalCompleted++;
      } else if (status === 'learning') {
        learningTopics++;
      } else if (status === 'revise') {
        reviseTopics++;
      } else {
        notStartedTopics++;
      }

      if (p?.completedCheckpoints && p.completedCheckpoints.includes('bookmark')) {
        bookmarkedTopics++;
      }
    }

    const totalTopics = allAptitudeTopics.length; // 36
    const completionPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    const totalQuestions = allAptitudeTopics.reduce((acc, t) => acc + t.practiceQuestions.length, 0);

    return {
      totalTopics,
      completedTopics,
      learningTopics,
      reviseTopics,
      notStartedTopics,
      bookmarkedTopics,
      totalQuestions,
      completionPercentage,
      quantProgress: { total: quantTopics.length, completed: quantCompleted },
      logicalProgress: { total: logicalTopics.length, completed: logicalCompleted },
      verbalProgress: { total: verbalTopics.length, completed: verbalCompleted },
    };
  }, [progressMap]);

  // Action: Update status
  const updateStatus = useCallback(
    async (topicId: string, newStatus: TopicStatus) => {
      const existing = progressMap.get(topicId);
      const category = allAptitudeTopics.find((t) => t.id === topicId)?.category || 'aptitude';
      const now = new Date().toISOString();

      const record: TopicProgress = {
        id: topicId,
        category,
        status: newStatus,
        totalCheckpoints: 5,
        completedCheckpoints: existing?.completedCheckpoints || [],
        notes: existing?.notes || '',
        isMastered: newStatus === 'completed',
        lastStudiedAt: now,
        revisionCount: existing?.revisionCount || 0,
        intervalDays: existing?.intervalDays || 1,
        nextRevisionDate: existing?.nextRevisionDate,
        inRevisionQueue: existing?.inRevisionQueue || false,
      };

      // If user marks completed or revise, automatically enroll in revision queue if not already scheduled
      if ((newStatus === 'completed' || newStatus === 'revise') && !record.nextRevisionDate) {
        record.nextRevisionDate = addDays(getTodayStr(), 1);
        record.inRevisionQueue = true;
      }

      await topicRepository.upsert(record);
      setProgressMap((prev) => new Map(prev).set(topicId, record));
    },
    [progressMap]
  );

  // Action: Toggle bookmark (stored inside completedCheckpoints array as 'bookmark')
  const toggleBookmark = useCallback(
    async (topicId: string) => {
      const existing = progressMap.get(topicId);
      const category = allAptitudeTopics.find((t) => t.id === topicId)?.category || 'aptitude';
      const now = new Date().toISOString();

      const currentCheckpoints = existing?.completedCheckpoints || [];
      const hasBookmark = currentCheckpoints.includes('bookmark');
      const updatedCheckpoints = hasBookmark
        ? currentCheckpoints.filter((c) => c !== 'bookmark')
        : [...currentCheckpoints, 'bookmark'];

      const record: TopicProgress = {
        id: topicId,
        category,
        status: existing?.status || 'not_started',
        totalCheckpoints: 5,
        completedCheckpoints: updatedCheckpoints,
        notes: existing?.notes || '',
        isMastered: existing?.isMastered || false,
        lastStudiedAt: now,
        revisionCount: existing?.revisionCount || 0,
        intervalDays: existing?.intervalDays || 1,
        nextRevisionDate: existing?.nextRevisionDate,
        inRevisionQueue: existing?.inRevisionQueue,
      };

      await topicRepository.upsert(record);
      setProgressMap((prev) => new Map(prev).set(topicId, record));
      return !hasBookmark;
    },
    [progressMap]
  );

  // Action: Save notes
  const saveNotes = useCallback(
    async (topicId: string, notes: string) => {
      const existing = progressMap.get(topicId);
      const category = allAptitudeTopics.find((t) => t.id === topicId)?.category || 'aptitude';
      const now = new Date().toISOString();

      const record: TopicProgress = {
        id: topicId,
        category,
        status: existing?.status || 'not_started',
        totalCheckpoints: 5,
        completedCheckpoints: existing?.completedCheckpoints || [],
        notes,
        isMastered: existing?.isMastered || false,
        lastStudiedAt: now,
        revisionCount: existing?.revisionCount || 0,
        intervalDays: existing?.intervalDays || 1,
        nextRevisionDate: existing?.nextRevisionDate,
        inRevisionQueue: existing?.inRevisionQueue,
      };

      await topicRepository.upsert(record);
      setProgressMap((prev) => new Map(prev).set(topicId, record));
    },
    [progressMap]
  );

  return {
    topics: topicsWithProgress,
    stats,
    loading,
    updateStatus,
    toggleBookmark,
    saveNotes,
    refreshProgress,
  };
};
