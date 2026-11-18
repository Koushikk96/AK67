import { db, AK67Database } from '../index';
import { DailyPlannerEntry, CustomTask } from '@/types/database';

export const dailyPlannerRepository = {
  async getByDate(dateStr: string, database: AK67Database = db): Promise<DailyPlannerEntry | undefined> {
    if (!dateStr) return undefined;
    return database.daily_planner.get(dateStr);
  },

  async getToday(database: AK67Database = db): Promise<DailyPlannerEntry> {
    const today = new Date().toISOString().split('T')[0];
    const existing = await database.daily_planner.get(today);
    if (existing) return existing;

    const initial: DailyPlannerEntry = {
      id: today,
      targetProblemsCount: 3,
      actualProblemsCount: 0,
      customTasks: [],
      studyMinutes: 0,
      completed: false,
    };
    await database.daily_planner.put(initial);
    return initial;
  },

  async getAll(database: AK67Database = db): Promise<DailyPlannerEntry[]> {
    return database.daily_planner.toArray();
  },

  async upsert(entry: DailyPlannerEntry, database: AK67Database = db): Promise<string> {
    if (!entry.id) {
      throw new Error('[dailyPlannerRepository] Invalid entry: date id is required.');
    }
    await database.daily_planner.put(entry);
    return entry.id;
  },

  async addCustomTask(
    dateStr: string,
    text: string,
    priority: 'low' | 'medium' | 'high' = 'medium',
    database: AK67Database = db
  ): Promise<CustomTask> {
    const entry = (await database.daily_planner.get(dateStr)) || {
      id: dateStr,
      targetProblemsCount: 3,
      actualProblemsCount: 0,
      customTasks: [],
      studyMinutes: 0,
      completed: false,
    };

    const newTask: CustomTask = {
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };

    entry.customTasks = [...entry.customTasks, newTask];
    await database.daily_planner.put(entry);
    return newTask;
  },

  async toggleCustomTask(dateStr: string, taskId: string, database: AK67Database = db): Promise<boolean> {
    const entry = await database.daily_planner.get(dateStr);
    if (!entry) return false;

    let targetStatus = false;
    entry.customTasks = entry.customTasks.map((t) => {
      if (t.id === taskId) {
        targetStatus = !t.completed;
        return { ...t, completed: targetStatus };
      }
      return t;
    });

    await database.daily_planner.put(entry);
    return targetStatus;
  },

  async deleteCustomTask(dateStr: string, taskId: string, database: AK67Database = db): Promise<void> {
    const entry = await database.daily_planner.get(dateStr);
    if (!entry) return;

    entry.customTasks = entry.customTasks.filter((t) => t.id !== taskId);
    await database.daily_planner.put(entry);
  },

  async countTotal(database: AK67Database = db): Promise<number> {
    return database.daily_planner.count();
  },

  async batchPut(records: DailyPlannerEntry[], database: AK67Database = db): Promise<void> {
    await database.transaction('rw', database.daily_planner, async () => {
      for (const rec of records) {
        if (!rec.id) throw new Error('[dailyPlannerRepository] Batch error: missing id in record');
        await database.daily_planner.put(rec);
      }
    });
  },
};
