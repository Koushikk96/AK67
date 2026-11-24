import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MasteryTopicWithProgress,
  MasteryDifficulty,
  MasteryStats,
} from '@/types/mastery';
import { TopicProgress, TopicStatus } from '@/types/database';
import { topicRepository } from '@/db/repositories/topicRepository';
import { allPythonTopics, pythonModules } from '@/content/python';

export function usePythonMastery() {
  const [progressMap, setProgressMap] = useState<Map<string, TopicProgress>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedModule, setSelectedModule] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<MasteryDifficulty | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<TopicStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const refreshProgress = useCallback(async () => {
    try {
      setLoading(true);
      const records = await topicRepository.getByCategory('python');
      const map = new Map<string, TopicProgress>();
      for (const rec of records) {
        map.set(rec.id, rec);
      }
      setProgressMap(map);
    } catch (err) {
      console.error('[usePythonMastery] Error loading progress:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  // Combine static topics with live IndexedDB progress
  const topicsWithProgress: MasteryTopicWithProgress[] = useMemo(() => {
    return allPythonTopics.map((topic) => ({
      ...topic,
      progress: progressMap.get(topic.id),
    }));
  }, [progressMap]);

  // Filtered topics based on module, difficulty, status, and search query
  const filteredTopics = useMemo(() => {
    return topicsWithProgress.filter((item) => {
      if (selectedModule !== 'all' && item.moduleNumber !== selectedModule) {
        return false;
      }
      if (selectedDifficulty !== 'all' && item.level !== selectedDifficulty) {
        return false;
      }
      const status: TopicStatus = item.progress?.status || 'not_started';
      if (selectedStatus !== 'all' && status !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesExplanation = item.explanation.toLowerCase().includes(query);
        const matchesModule = item.moduleTitle.toLowerCase().includes(query);
        if (!matchesTitle && !matchesExplanation && !matchesModule) {
          return false;
        }
      }
      return true;
    });
  }, [topicsWithProgress, selectedModule, selectedDifficulty, selectedStatus, searchQuery]);

  // Calculate comprehensive statistics
  const stats: MasteryStats = useMemo(() => {
    let completed = 0;
    let learning = 0;
    let revise = 0;
    let notStarted = 0;
    let mastered = 0;
    let bookmarked = 0;

    for (const item of topicsWithProgress) {
      const prog = item.progress;
      const status: TopicStatus = prog?.status || 'not_started';

      if (prog?.bookmarked) bookmarked += 1;
      if (prog?.isMastered) mastered += 1;

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

    // Per-module statistics
    const moduleStats = pythonModules.map((mod) => {
      const modTopics = topicsWithProgress.filter((t) => t.moduleNumber === mod.number);
      const modCompleted = modTopics.filter((t) => t.progress?.status === 'completed').length;
      const pct = modTopics.length > 0 ? Math.round((modCompleted / modTopics.length) * 100) : 0;
      return {
        moduleId: mod.id,
        moduleTitle: mod.title,
        total: modTopics.length,
        completed: modCompleted,
        percentage: pct,
      };
    });

    return {
      totalTopics: total,
      completedTopics: completed,
      learningTopics: learning,
      masteredTopics: mastered,
      reviseTopics: revise,
      notStartedTopics: notStarted,
      bookmarkedTopics: bookmarked,
      completionPercentage,
      moduleStats,
    };
  }, [topicsWithProgress]);

  // Update learning status
  const updateTopicStatus = useCallback(
    async (topicId: string, status: TopicStatus) => {
      const existing = progressMap.get(topicId);
      const topic = allPythonTopics.find((t) => t.id === topicId);
      const now = new Date().toISOString();

      const record: TopicProgress = {
        ...(existing || {}),
        id: topicId,
        category: 'python',
        status,
        bookmarked: existing?.bookmarked || false,
        totalCheckpoints: existing?.totalCheckpoints || topic?.checkpoints.length || 0,
        completedCheckpoints: existing?.completedCheckpoints || [],
        isMastered: status === 'completed' || existing?.isMastered || false,
        notes: existing?.notes || '',
        lastStudiedAt: now,
        revisionCount: existing?.revisionCount || 0,
        intervalDays: existing?.intervalDays || 1,
      };

      await topicRepository.upsert(record);
      setProgressMap((prev) => new Map(prev).set(topicId, record));
    },
    [progressMap]
  );

  // Toggle bookmark
  const toggleBookmark = useCallback(
    async (topicId: string) => {
      const existing = progressMap.get(topicId);
      const topic = allPythonTopics.find((t) => t.id === topicId);
      const now = new Date().toISOString();
      const nextBookmarked = !(existing?.bookmarked || false);

      const record: TopicProgress = {
        ...(existing || {}),
        id: topicId,
        category: 'python',
        status: existing?.status || 'not_started',
        bookmarked: nextBookmarked,
        totalCheckpoints: existing?.totalCheckpoints || topic?.checkpoints.length || 0,
        completedCheckpoints: existing?.completedCheckpoints || [],
        isMastered: existing?.isMastered || false,
        notes: existing?.notes || '',
        lastStudiedAt: now,
      };

      await topicRepository.upsert(record);
      setProgressMap((prev) => new Map(prev).set(topicId, record));
    },
    [progressMap]
  );

  // Toggle individual checkpoint
  const toggleCheckpoint = useCallback(
    async (topicId: string, checkpointId: string, totalCheckpoints: number) => {
      await topicRepository.toggleCheckpoint(topicId, checkpointId, 'python', totalCheckpoints);
      const updatedRecord = await topicRepository.getById(topicId);
      if (updatedRecord) {
        setProgressMap((prev) => new Map(prev).set(topicId, updatedRecord));
      }
    },
    []
  );

  // Save personal notes
  const saveNotes = useCallback(
    async (topicId: string, notes: string) => {
      const existing = progressMap.get(topicId);
      const topic = allPythonTopics.find((t) => t.id === topicId);
      const now = new Date().toISOString();

      const record: TopicProgress = {
        ...(existing || {}),
        id: topicId,
        category: 'python',
        status: existing?.status || 'not_started',
        bookmarked: existing?.bookmarked || false,
        totalCheckpoints: existing?.totalCheckpoints || topic?.checkpoints.length || 0,
        completedCheckpoints: existing?.completedCheckpoints || [],
        isMastered: existing?.isMastered || false,
        notes,
        lastStudiedAt: now,
      };

      await topicRepository.upsert(record);
      setProgressMap((prev) => new Map(prev).set(topicId, record));
    },
    [progressMap]
  );

  // Schedule spaced repetition revision
  const scheduleRevision = useCallback(
    async (topicId: string, intervalDays: number = 3) => {
      const existing = progressMap.get(topicId);
      const topic = allPythonTopics.find((t) => t.id === topicId);
      const now = new Date();
      const nextDate = new Date();
      nextDate.setDate(now.getDate() + intervalDays);
      const nextRevisionDate = nextDate.toISOString().split('T')[0];

      const record: TopicProgress = {
        ...(existing || {}),
        id: topicId,
        category: 'python',
        status: 'revise',
        bookmarked: existing?.bookmarked || false,
        totalCheckpoints: existing?.totalCheckpoints || topic?.checkpoints.length || 0,
        completedCheckpoints: existing?.completedCheckpoints || [],
        isMastered: existing?.isMastered || false,
        notes: existing?.notes || '',
        lastStudiedAt: now.toISOString(),
        revisionCount: (existing?.revisionCount || 0) + 1,
        intervalDays,
        nextRevisionDate,
        inRevisionQueue: true,
      };

      await topicRepository.upsert(record);
      setProgressMap((prev) => new Map(prev).set(topicId, record));
    },
    [progressMap]
  );

  return {
    topics: filteredTopics,
    allTopicsWithProgress: topicsWithProgress,
    modules: pythonModules,
    stats,
    loading,
    selectedModule,
    setSelectedModule,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    updateTopicStatus,
    toggleBookmark,
    toggleCheckpoint,
    saveNotes,
    scheduleRevision,
    refreshProgress,
  };
}
