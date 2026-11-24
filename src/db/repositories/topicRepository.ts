import { db, AK67Database } from '../index';
import { TopicProgress } from '@/types/database';

export const topicRepository = {
  async getById(id: string, database: AK67Database = db): Promise<TopicProgress | undefined> {
    if (!id) return undefined;
    return database.topic_progress.get(id);
  },

  async getAll(database: AK67Database = db): Promise<TopicProgress[]> {
    return database.topic_progress.toArray();
  },

  async getByCategory(category: string, database: AK67Database = db): Promise<TopicProgress[]> {
    return database.topic_progress.where('category').equals(category).toArray();
  },

  async upsert(record: TopicProgress, database: AK67Database = db): Promise<string> {
    if (!record.id) {
      throw new Error('[topicRepository] Invalid record: id is required.');
    }
    await database.topic_progress.put({
      ...record,
      completedCheckpoints: Array.isArray(record.completedCheckpoints) ? record.completedCheckpoints : [],
      notes: record.notes || '',
      lastStudiedAt: record.lastStudiedAt || new Date().toISOString(),
    });
    return record.id;
  },

  async toggleCheckpoint(
    topicId: string,
    checkpointId: string,
    category: string,
    totalCheckpoints: number,
    database: AK67Database = db
  ): Promise<boolean> {
    const existing = await database.topic_progress.get(topicId);
    const now = new Date().toISOString();

    if (existing) {
      const exists = existing.completedCheckpoints.includes(checkpointId);
      const updated = exists
        ? existing.completedCheckpoints.filter((c) => c !== checkpointId)
        : [...existing.completedCheckpoints, checkpointId];

      const isMastered = updated.length >= totalCheckpoints;

      await database.topic_progress.update(topicId, {
        completedCheckpoints: updated,
        isMastered,
        status: isMastered ? 'completed' : updated.length > 0 ? 'learning' : 'not_started',
        lastStudiedAt: now,
      });

      return !exists;
    } else {
      const isMastered = 1 >= totalCheckpoints;
      await database.topic_progress.put({
        id: topicId,
        category,
        totalCheckpoints,
        completedCheckpoints: [checkpointId],
        isMastered,
        status: isMastered ? 'completed' : 'learning',
        notes: '',
        lastStudiedAt: now,
      });
      return true;
    }
  },

  async toggleBookmark(
    topicId: string,
    category: string = 'general',
    database: AK67Database = db
  ): Promise<boolean> {
    const existing = await database.topic_progress.get(topicId);
    const now = new Date().toISOString();

    if (existing) {
      const nextBookmarked = !existing.bookmarked;
      await database.topic_progress.update(topicId, {
        bookmarked: nextBookmarked,
        lastStudiedAt: now,
      });
      return nextBookmarked;
    } else {
      await database.topic_progress.put({
        id: topicId,
        category,
        totalCheckpoints: 0,
        completedCheckpoints: [],
        isMastered: false,
        status: 'not_started',
        bookmarked: true,
        notes: '',
        lastStudiedAt: now,
      });
      return true;
    }
  },

  async updateNotes(
    topicId: string,
    notes: string,
    category: string = 'general',
    database: AK67Database = db
  ): Promise<void> {
    const existing = await database.topic_progress.get(topicId);
    const now = new Date().toISOString();

    if (existing) {
      await database.topic_progress.update(topicId, {
        notes,
        lastStudiedAt: now,
      });
    } else {
      await database.topic_progress.put({
        id: topicId,
        category,
        totalCheckpoints: 0,
        completedCheckpoints: [],
        isMastered: false,
        status: 'not_started',
        bookmarked: false,
        notes,
        lastStudiedAt: now,
      });
    }
  },

  async getBookmarked(database: AK67Database = db): Promise<TopicProgress[]> {
    return database.topic_progress.filter((t) => Boolean(t.bookmarked)).toArray();
  },

  async getRevisionQueue(database: AK67Database = db): Promise<TopicProgress[]> {
    return database.topic_progress
      .filter((t) => Boolean(t.inRevisionQueue) || t.status === 'revise')
      .toArray();
  },

  async getDueRevisions(dateStr?: string, database: AK67Database = db): Promise<TopicProgress[]> {
    const targetDate = dateStr || new Date().toISOString().split('T')[0];
    return database.topic_progress
      .where('nextRevisionDate')
      .belowOrEqual(targetDate)
      .and((t) => t.status === 'completed' || t.status === 'revise')
      .toArray();
  },

  async countTotal(database: AK67Database = db): Promise<number> {
    return database.topic_progress.count();
  },

  async batchPut(records: TopicProgress[], database: AK67Database = db): Promise<void> {
    await database.transaction('rw', database.topic_progress, async () => {
      for (const rec of records) {
        if (!rec.id) throw new Error('[topicRepository] Batch error: missing id in record');
        await database.topic_progress.put(rec);
      }
    });
  },
};
