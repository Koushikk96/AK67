import { useState, useEffect, useCallback } from 'react';
import { DailyPlannerEntry, CustomTask, PlannerCategory } from '@/types/database';
import { dailyPlannerRepository } from '@/db/repositories/dailyPlannerRepository';
import { getTodayStr } from '@/services/revisionService';

export const useDailyPlanner = (dateStr?: string) => {
  const currentDate = dateStr || getTodayStr();
  const [entry, setEntry] = useState<DailyPlannerEntry | null>(null);
  const [allEntries, setAllEntries] = useState<DailyPlannerEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const todayEntry = await dailyPlannerRepository.getToday();
      const targetEntry =
        currentDate === todayEntry.id
          ? todayEntry
          : (await dailyPlannerRepository.getByDate(currentDate)) || {
              id: currentDate,
              targetProblemsCount: 3,
              actualProblemsCount: 0,
              targetStudyMinutes: 60,
              studyMinutes: 0,
              targetAptitudeCount: 5,
              actualAptitudeCount: 0,
              customTasks: [],
              completed: false,
            };

      setEntry(targetEntry);

      const all = await dailyPlannerRepository.getAll();
      setAllEntries(all);
    } catch (err) {
      console.error('[useDailyPlanner] Error loading planner data:', err);
    } finally {
      setLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Action: Add custom task
  const addTask = useCallback(
    async (
      text: string,
      category: PlannerCategory = 'DSA',
      topic?: string,
      targetDurationMinutes: number = 30,
      priority: 'low' | 'medium' | 'high' = 'medium',
      plannedDate: string = currentDate
    ) => {
      const targetDate = plannedDate || currentDate;
      let targetEntry = (await dailyPlannerRepository.getByDate(targetDate)) || {
        id: targetDate,
        targetProblemsCount: 3,
        actualProblemsCount: 0,
        targetStudyMinutes: 60,
        studyMinutes: 0,
        targetAptitudeCount: 5,
        actualAptitudeCount: 0,
        customTasks: [],
        completed: false,
      };

      const newTask: CustomTask = {
        id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        text: text.trim(),
        completed: false,
        priority,
        category,
        topic: topic?.trim(),
        targetDurationMinutes,
        plannedDate: targetDate,
        createdAt: new Date().toISOString(),
      };

      targetEntry.customTasks = [...(targetEntry.customTasks || []), newTask];
      await dailyPlannerRepository.upsert(targetEntry);
      await loadData();
      return newTask;
    },
    [currentDate, loadData]
  );

  // Action: Toggle task completion
  const toggleTask = useCallback(
    async (taskId: string, date: string = currentDate) => {
      await dailyPlannerRepository.toggleCustomTask(date, taskId);
      await loadData();
    },
    [currentDate, loadData]
  );

  // Action: Delete task
  const deleteTask = useCallback(
    async (taskId: string, date: string = currentDate) => {
      await dailyPlannerRepository.deleteCustomTask(date, taskId);
      await loadData();
    },
    [currentDate, loadData]
  );

  // Action: Update targets and study minutes
  const updateTargets = useCallback(
    async (updates: {
      targetProblemsCount?: number;
      targetStudyMinutes?: number;
      targetAptitudeCount?: number;
      actualProblemsCount?: number;
      actualAptitudeCount?: number;
      studyMinutes?: number;
      completed?: boolean;
    }) => {
      if (!entry) return;
      const updated: DailyPlannerEntry = {
        ...entry,
        ...updates,
      };
      await dailyPlannerRepository.upsert(updated);
      setEntry(updated);
    },
    [entry]
  );

  // Action: Update daily reflection
  const updateReflection = useCallback(
    async (dailyReflection: string) => {
      if (!entry) return;
      const updated: DailyPlannerEntry = {
        ...entry,
        dailyReflection,
      };
      await dailyPlannerRepository.upsert(updated);
      setEntry(updated);
    },
    [entry]
  );

  return {
    entry,
    allEntries,
    loading,
    addTask,
    toggleTask,
    deleteTask,
    updateTargets,
    updateReflection,
    refreshPlanner: loadData,
  };
};
