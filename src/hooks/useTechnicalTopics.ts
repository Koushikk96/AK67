import { useState, useEffect, useCallback, useMemo } from 'react';
import { TechnicalTopic, TechnicalTopicWithProgress, TechnicalCategory, TechnicalStats } from '@/types/technical';
import { TopicProgress, TopicStatus } from '@/types/database';
import { topicRepository } from '@/db/repositories/topicRepository';
import { studySessionRepository } from '@/db/repositories/studySessionRepository';

export const useTechnicalTopics = (
  staticTopics: TechnicalTopic[],
  categoryFilter?: TechnicalCategory | 'all'
) => {
  const [progressMap, setProgressMap] = useState<Map<string, TopicProgress>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);

  // Load all topic progress records from IndexedDB
  const refreshProgress = useCallback(async () => {
    try {
      setLoading(true);
      const records = await topicRepository.getAll();
      const map = new Map<string, TopicProgress>();
      for (const rec of records) {
        map.set(rec.id, rec);
      }
      setProgressMap(map);
    } catch (err) {
      console.error('[useTechnicalTopics] Error loading topic progress from IndexedDB:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  // Filter static topics by category if specified
  const filteredStaticTopics = useMemo(() => {
    if (!categoryFilter || categoryFilter === 'all') return staticTopics;
    return staticTopics.filter((t) => t.category === categoryFilter);
  }, [staticTopics, categoryFilter]);

  // Merge static topics with IndexedDB progress
  const topicsWithProgress: TechnicalTopicWithProgress[] = useMemo(() => {
    return filteredStaticTopics.map((topic) => ({
      ...topic,
      progress: progressMap.get(topic.id),
    }));
  }, [filteredStaticTopics, progressMap]);

  // Compute live statistics
  const stats: TechnicalStats = useMemo(() => {
    let completed = 0;
    let learning = 0;
    let revise = 0;
    let notStarted = 0;
    let bookmarked = 0;

    for (const item of topicsWithProgress) {
      const prog = item.progress;
      const status: TopicStatus = prog?.status || (prog?.isMastered ? 'completed' : 'not_started');

      if (prog?.bookmarked) {
        bookmarked += 1;
      }

      if (status === 'completed') {
        completed += 1;
      } else if (status === 'learning') {
        learning += 1;
      } else if (status === 'revise') {
        revise += 1;
      } else {
        notStarted += 1;
      }
    }

    const total = topicsWithProgress.length;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      learning,
      revise,
      notStarted,
      bookmarked,
      completionPercentage,
    };
  }, [topicsWithProgress]);

  // Update Status
  const updateStatus = useCallback(
    async (topicId: string, status: TopicStatus) => {
      const topic = staticTopics.find((t) => t.id === topicId);
      if (!topic) return;

      const existing = progressMap.get(topicId);
      const now = new Date().toISOString();
      const isMastered = status === 'completed';

      const updatedRecord: TopicProgress = {
        id: topicId,
        category: topic.category,
        status,
        bookmarked: existing?.bookmarked || false,
        totalCheckpoints: existing?.totalCheckpoints || 1,
        completedCheckpoints: isMastered ? ['main'] : existing?.completedCheckpoints || [],
        isMastered,
        notes: existing?.notes || '',
        lastStudiedAt: now,
      };

      await topicRepository.upsert(updatedRecord);

      // Log study session when marking completed
      if (status === 'completed' && (!existing || existing.status !== 'completed')) {
        await studySessionRepository.logSession(15, `${topic.subject}: ${topic.title}`, topic.category as any);
      }

      setProgressMap((prev) => {
        const next = new Map(prev);
        next.set(topicId, updatedRecord);
        return next;
      });
    },
    [staticTopics, progressMap]
  );

  // Toggle Bookmark
  const toggleBookmark = useCallback(
    async (topicId: string) => {
      const topic = staticTopics.find((t) => t.id === topicId);
      if (!topic) return;

      const existing = progressMap.get(topicId);
      const now = new Date().toISOString();
      const nextBookmarked = !existing?.bookmarked;

      const updatedRecord: TopicProgress = {
        id: topicId,
        category: topic.category,
        status: existing?.status || 'not_started',
        bookmarked: nextBookmarked,
        totalCheckpoints: existing?.totalCheckpoints || 1,
        completedCheckpoints: existing?.completedCheckpoints || [],
        isMastered: existing?.isMastered || false,
        notes: existing?.notes || '',
        lastStudiedAt: now,
      };

      await topicRepository.upsert(updatedRecord);

      setProgressMap((prev) => {
        const next = new Map(prev);
        next.set(topicId, updatedRecord);
        return next;
      });
    },
    [staticTopics, progressMap]
  );

  // Save Personal Notes
  const saveNotes = useCallback(
    async (topicId: string, notes: string) => {
      const topic = staticTopics.find((t) => t.id === topicId);
      if (!topic) return;

      const existing = progressMap.get(topicId);
      const now = new Date().toISOString();

      const updatedRecord: TopicProgress = {
        id: topicId,
        category: topic.category,
        status: existing?.status || 'not_started',
        bookmarked: existing?.bookmarked || false,
        totalCheckpoints: existing?.totalCheckpoints || 1,
        completedCheckpoints: existing?.completedCheckpoints || [],
        isMastered: existing?.isMastered || false,
        notes,
        lastStudiedAt: now,
      };

      await topicRepository.upsert(updatedRecord);

      setProgressMap((prev) => {
        const next = new Map(prev);
        next.set(topicId, updatedRecord);
        return next;
      });
    },
    [staticTopics, progressMap]
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
