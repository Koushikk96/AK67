import { db, AK67Database } from '../index';
import { ProblemProgress, ProblemStatus } from '@/types/database';

export const problemRepository = {
  async getById(id: string, database: AK67Database = db): Promise<ProblemProgress | undefined> {
    if (!id || typeof id !== 'string') return undefined;
    return database.problem_progress.get(id);
  },

  async getAll(database: AK67Database = db): Promise<ProblemProgress[]> {
    return database.problem_progress.toArray();
  },

  async getByStatus(status: ProblemStatus, database: AK67Database = db): Promise<ProblemProgress[]> {
    return database.problem_progress.where('status').equals(status).toArray();
  },

  async getBookmarked(database: AK67Database = db): Promise<ProblemProgress[]> {
    return database.problem_progress.filter((p) => p.bookmarked === true).toArray();
  },

  async getDueRevisions(dateStr?: string, database: AK67Database = db): Promise<ProblemProgress[]> {
    const targetDate = dateStr || new Date().toISOString().split('T')[0];
    return database.problem_progress
      .where('nextRevisionDate')
      .belowOrEqual(targetDate)
      .and((p) => p.status === 'solved' || p.status === 'revise')
      .toArray();
  },

  async upsert(record: ProblemProgress, database: AK67Database = db): Promise<string> {
    if (!record.id || typeof record.id !== 'string') {
      throw new Error('[problemRepository] Invalid record: id is required.');
    }
    // Defensive normalization
    const normalized: ProblemProgress = {
      ...record,
      personalNotes: record.personalNotes || '',
      bookmarked: Boolean(record.bookmarked),
      revisionCount: Number(record.revisionCount) || 0,
      intervalDays: Number(record.intervalDays) || 1,
      easeFactor: Number(record.easeFactor) || 2.5,
    };
    await database.problem_progress.put(normalized);
    return normalized.id;
  },

  async updateStatus(
    id: string,
    status: ProblemStatus,
    personalNotes?: string,
    database: AK67Database = db
  ): Promise<void> {
    const existing = await database.problem_progress.get(id);
    const now = new Date().toISOString();

    if (existing) {
      const updates: Partial<ProblemProgress> = {
        status,
        lastAttemptedAt: now,
      };
      if (status === 'solved' && !existing.solvedAt) {
        updates.solvedAt = now;
      }
      if (personalNotes !== undefined) {
        updates.personalNotes = personalNotes;
      }
      await database.problem_progress.update(id, updates);
    } else {
      // Create new progress record if not exists
      const newRecord: ProblemProgress = {
        id,
        topic: 'General',
        difficulty: 'Medium',
        status,
        personalNotes: personalNotes || '',
        bookmarked: false,
        lastAttemptedAt: now,
        solvedAt: status === 'solved' ? now : undefined,
        revisionCount: 0,
        intervalDays: 1,
        easeFactor: 2.5,
      };
      await database.problem_progress.put(newRecord);
    }
  },

  async toggleBookmark(id: string, database: AK67Database = db): Promise<boolean> {
    const existing = await database.problem_progress.get(id);
    if (!existing) {
      throw new Error(`[problemRepository] Cannot toggle bookmark: problem ${id} not found.`);
    }
    const newStatus = !existing.bookmarked;
    await database.problem_progress.update(id, { bookmarked: newStatus });
    return newStatus;
  },

  async delete(id: string, database: AK67Database = db): Promise<void> {
    await database.problem_progress.delete(id);
  },

  async countSolved(database: AK67Database = db): Promise<number> {
    return database.problem_progress.where('status').equals('solved').count();
  },

  async countTotal(database: AK67Database = db): Promise<number> {
    return database.problem_progress.count();
  },

  async batchPut(records: ProblemProgress[], database: AK67Database = db): Promise<void> {
    await database.transaction('rw', database.problem_progress, async () => {
      for (const rec of records) {
        if (!rec.id) throw new Error('[problemRepository] Batch error: missing id in record');
        await database.problem_progress.put(rec);
      }
    });
  },
};
