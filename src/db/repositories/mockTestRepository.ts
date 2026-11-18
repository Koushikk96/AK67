import { db, AK67Database } from '../index';
import { MockTestRecord } from '@/types/database';

export const mockTestRepository = {
  async getById(id: string, database: AK67Database = db): Promise<MockTestRecord | undefined> {
    if (!id) return undefined;
    return database.mock_tests.get(id);
  },

  async getAll(database: AK67Database = db): Promise<MockTestRecord[]> {
    return database.mock_tests.orderBy('completedAt').reverse().toArray();
  },

  async getByCategory(category: string, database: AK67Database = db): Promise<MockTestRecord[]> {
    return database.mock_tests.where('category').equals(category).toArray();
  },

  async create(record: Omit<MockTestRecord, 'id'> & { id?: string }, database: AK67Database = db): Promise<string> {
    const id = record.id || 'mock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    const completedAt = record.completedAt || new Date().toISOString();
    const finalRecord: MockTestRecord = {
      ...record,
      id,
      completedAt,
    };
    await database.mock_tests.put(finalRecord);
    return id;
  },

  async delete(id: string, database: AK67Database = db): Promise<void> {
    await database.mock_tests.delete(id);
  },

  async countTotal(database: AK67Database = db): Promise<number> {
    return database.mock_tests.count();
  },

  async batchPut(records: MockTestRecord[], database: AK67Database = db): Promise<void> {
    await database.transaction('rw', database.mock_tests, async () => {
      for (const rec of records) {
        if (!rec.id) throw new Error('[mockTestRepository] Batch error: missing id in record');
        await database.mock_tests.put(rec);
      }
    });
  },
};
