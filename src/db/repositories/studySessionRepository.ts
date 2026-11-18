import { db, AK67Database } from '../index';
import { StudySession, SessionType } from '@/types/database';

export const studySessionRepository = {
  async getById(id: string, database: AK67Database = db): Promise<StudySession | undefined> {
    if (!id) return undefined;
    return database.study_sessions.get(id);
  },

  async getAll(database: AK67Database = db): Promise<StudySession[]> {
    return database.study_sessions.orderBy('date').reverse().toArray();
  },

  async getByDate(dateStr: string, database: AK67Database = db): Promise<StudySession[]> {
    return database.study_sessions.where('date').equals(dateStr).toArray();
  },

  async logSession(
    durationMinutes: number,
    module: string,
    sessionType: SessionType,
    dateStr?: string,
    database: AK67Database = db
  ): Promise<string> {
    const now = new Date().toISOString();
    const date = dateStr || now.split('T')[0];
    const id = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);

    const record: StudySession = {
      id,
      date,
      durationMinutes: Math.max(1, Math.round(durationMinutes)),
      module,
      sessionType,
      completedAt: now,
    };

    await database.study_sessions.put(record);
    return id;
  },

  /**
   * Calculates the current continuous daily streak.
   * A streak is maintained if study occurred today or yesterday.
   */
  async calculateStreak(database: AK67Database = db): Promise<number> {
    const dates = await database.study_sessions.orderBy('date').uniqueKeys();
    if (!dates || dates.length === 0) return 0;

    const dateSet = new Set((dates as string[]).map((d) => d.toString()));
    const today = new Date();
    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    let checkDate = new Date(today);
    let streak = 0;

    // If today is studied, count it. If not yet studied today, start check from yesterday.
    const todayStr = formatDate(today);
    if (!dateSet.has(todayStr)) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (dateSet.has(formatDate(checkDate))) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return streak;
  },

  async countTotal(database: AK67Database = db): Promise<number> {
    return database.study_sessions.count();
  },

  async batchPut(records: StudySession[], database: AK67Database = db): Promise<void> {
    await database.transaction('rw', database.study_sessions, async () => {
      for (const rec of records) {
        if (!rec.id) throw new Error('[studySessionRepository] Batch error: missing id in record');
        await database.study_sessions.put(rec);
      }
    });
  },
};
