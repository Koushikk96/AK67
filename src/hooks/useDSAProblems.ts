import { useState, useEffect, useCallback, useMemo } from 'react';
import { dsaProblems } from '@/content/dsa';
import { DSAProblemWithProgress, DSACategory } from '@/types/dsa';
import { ProblemProgress, ProblemStatus, ProblemDifficulty } from '@/types/database';
import { problemRepository } from '@/db/repositories/problemRepository';
import { studySessionRepository } from '@/db/repositories/studySessionRepository';

export interface CategoryStat {
  category: DSACategory;
  total: number;
  solved: number;
  attempted: number;
  percentage: number;
}

export interface DifficultyStat {
  difficulty: ProblemDifficulty;
  total: number;
  solved: number;
  percentage: number;
}

export interface DSAStats {
  total: number;
  solved: number;
  attempted: number;
  revise: number;
  notStarted: number;
  bookmarked: number;
  dueRevisions: number;
  completionPercentage: number;
  categories: CategoryStat[];
  difficulties: DifficultyStat[];
}

export const useDSAProblems = () => {
  const [progressMap, setProgressMap] = useState<Map<string, ProblemProgress>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);

  // Load all progress from IndexedDB
  const refreshProgress = useCallback(async () => {
    try {
      setLoading(true);
      const records = await problemRepository.getAll();
      const map = new Map<string, ProblemProgress>();
      for (const rec of records) {
        map.set(rec.id, rec);
      }
      setProgressMap(map);
    } catch (err) {
      console.error('[useDSAProblems] Failed to load problem progress from IndexedDB:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  // Merge static problems with IndexedDB progress
  const problemsWithProgress: DSAProblemWithProgress[] = useMemo(() => {
    return dsaProblems.map((problem) => ({
      ...problem,
      progress: progressMap.get(problem.id),
    }));
  }, [progressMap]);

  // Compute live real statistics
  const stats: DSAStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    let solved = 0;
    let attempted = 0;
    let revise = 0;
    let notStarted = 0;
    let bookmarked = 0;
    let dueRevisions = 0;

    const catMap = new Map<DSACategory, { total: number; solved: number; attempted: number }>();
    const diffMap = new Map<ProblemDifficulty, { total: number; solved: number }>();

    // Initialize counts
    for (const p of problemsWithProgress) {
      const cat = p.category;
      if (!catMap.has(cat)) catMap.set(cat, { total: 0, solved: 0, attempted: 0 });
      catMap.get(cat)!.total += 1;

      const diff = p.difficulty;
      if (!diffMap.has(diff)) diffMap.set(diff, { total: 0, solved: 0 });
      diffMap.get(diff)!.total += 1;

      const prog = p.progress;
      if (!prog || prog.status === 'not_started') {
        notStarted += 1;
      } else if (prog.status === 'solved') {
        solved += 1;
        catMap.get(cat)!.solved += 1;
        diffMap.get(diff)!.solved += 1;
      } else if (prog.status === 'attempted') {
        attempted += 1;
        catMap.get(cat)!.attempted += 1;
      } else if (prog.status === 'revise') {
        revise += 1;
      }

      if (prog?.bookmarked) {
        bookmarked += 1;
      }

      if (prog?.nextRevisionDate && prog.nextRevisionDate <= today && (prog.status === 'solved' || prog.status === 'revise')) {
        dueRevisions += 1;
      }
    }

    const categories: CategoryStat[] = Array.from(catMap.entries()).map(([category, val]) => ({
      category,
      total: val.total,
      solved: val.solved,
      attempted: val.attempted,
      percentage: val.total > 0 ? Math.round((val.solved / val.total) * 100) : 0,
    }));

    const difficulties: DifficultyStat[] = (['Easy', 'Medium', 'Hard'] as ProblemDifficulty[]).map((d) => {
      const val = diffMap.get(d) || { total: 0, solved: 0 };
      return {
        difficulty: d,
        total: val.total,
        solved: val.solved,
        percentage: val.total > 0 ? Math.round((val.solved / val.total) * 100) : 0,
      };
    });

    return {
      total: dsaProblems.length,
      solved,
      attempted,
      revise,
      notStarted,
      bookmarked,
      dueRevisions,
      completionPercentage: dsaProblems.length > 0 ? Math.round((solved / dsaProblems.length) * 100) : 0,
      categories,
      difficulties,
    };
  }, [problemsWithProgress]);

  // Update Status
  const updateStatus = useCallback(
    async (problemId: string, status: ProblemStatus, personalNotes?: string) => {
      const problem = dsaProblems.find((p) => p.id === problemId);
      if (!problem) return;

      const existing = progressMap.get(problemId);
      const now = new Date();
      const nowIso = now.toISOString();

      let nextRevisionDate: string | undefined = existing?.nextRevisionDate;
      let intervalDays = existing?.intervalDays || 1;
      let revisionCount = existing?.revisionCount || 0;

      // Spaced revision auto-scheduling when marking Solved
      if (status === 'solved' && (!existing || existing.status !== 'solved')) {
        intervalDays = 1; // 1st revision due in 1 day
        const nextDate = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
        nextRevisionDate = nextDate.toISOString().split('T')[0];

        // Automatically log a study session
        await studySessionRepository.logSession(15, `DSA: ${problem.title}`, 'dsa');
      } else if (status === 'revise') {
        nextRevisionDate = now.toISOString().split('T')[0]; // Due immediately
      }

      const updatedRecord: ProblemProgress = {
        id: problemId,
        topic: problem.category,
        difficulty: problem.difficulty,
        status,
        personalNotes: personalNotes !== undefined ? personalNotes : existing?.personalNotes || '',
        userCode: existing?.userCode,
        bookmarked: existing?.bookmarked || false,
        lastAttemptedAt: nowIso,
        solvedAt: status === 'solved' ? existing?.solvedAt || nowIso : existing?.solvedAt,
        revisionCount,
        intervalDays,
        easeFactor: existing?.easeFactor || 2.5,
        nextRevisionDate,
      };

      await problemRepository.upsert(updatedRecord);
      setProgressMap((prev) => {
        const next = new Map(prev);
        next.set(problemId, updatedRecord);
        return next;
      });
    },
    [progressMap]
  );

  // Toggle Bookmark
  const toggleBookmark = useCallback(
    async (problemId: string) => {
      const problem = dsaProblems.find((p) => p.id === problemId);
      if (!problem) return;

      const existing = progressMap.get(problemId);
      const newBookmarked = !existing?.bookmarked;

      const record: ProblemProgress = existing
        ? { ...existing, bookmarked: newBookmarked }
        : {
            id: problemId,
            topic: problem.category,
            difficulty: problem.difficulty,
            status: 'not_started',
            personalNotes: '',
            bookmarked: newBookmarked,
            revisionCount: 0,
            intervalDays: 1,
            easeFactor: 2.5,
          };

      await problemRepository.upsert(record);
      setProgressMap((prev) => {
        const next = new Map(prev);
        next.set(problemId, record);
        return next;
      });
    },
    [progressMap]
  );

  // Save Notes
  const saveNotes = useCallback(
    async (problemId: string, notes: string) => {
      const problem = dsaProblems.find((p) => p.id === problemId);
      if (!problem) return;

      const existing = progressMap.get(problemId);
      const record: ProblemProgress = existing
        ? { ...existing, personalNotes: notes }
        : {
            id: problemId,
            topic: problem.category,
            difficulty: problem.difficulty,
            status: 'not_started',
            personalNotes: notes,
            bookmarked: false,
            revisionCount: 0,
            intervalDays: 1,
            easeFactor: 2.5,
          };

      await problemRepository.upsert(record);
      setProgressMap((prev) => {
        const next = new Map(prev);
        next.set(problemId, record);
        return next;
      });
    },
    [progressMap]
  );

  // Advance Spaced Repetition Interval
  const completeRevision = useCallback(
    async (problemId: string, rating: 'easy' | 'good' | 'hard') => {
      const existing = progressMap.get(problemId);
      if (!existing) return;

      const now = new Date();
      let interval = existing.intervalDays || 1;
      let ease = existing.easeFactor || 2.5;

      if (rating === 'easy') {
        interval = Math.round(interval * 2.2);
        ease += 0.15;
      } else if (rating === 'good') {
        // Standard progression: 1 -> 3 -> 7 -> 21 -> 60 days
        const schedule = [1, 3, 7, 21, 60];
        const nextIdx = schedule.findIndex((s) => s > interval);
        interval = nextIdx !== -1 ? schedule[nextIdx] : Math.round(interval * 1.8);
      } else {
        // Hard / failed: reset back to 1 day
        interval = 1;
        ease = Math.max(1.3, ease - 0.2);
      }

      const nextDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);
      const updatedRecord: ProblemProgress = {
        ...existing,
        revisionCount: (existing.revisionCount || 0) + 1,
        intervalDays: interval,
        easeFactor: ease,
        nextRevisionDate: nextDate.toISOString().split('T')[0],
        status: rating === 'hard' ? 'revise' : 'solved',
      };

      await problemRepository.upsert(updatedRecord);
      await studySessionRepository.logSession(10, `Revision: ${existing.topic}`, 'revision');

      setProgressMap((prev) => {
        const next = new Map(prev);
        next.set(problemId, updatedRecord);
        return next;
      });
    },
    [progressMap]
  );

  return {
    problems: problemsWithProgress,
    stats,
    loading,
    refreshProgress,
    updateStatus,
    toggleBookmark,
    saveNotes,
    completeRevision,
  };
};
