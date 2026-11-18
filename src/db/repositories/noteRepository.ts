import { db, AK67Database } from '../index';
import { PersonalNote } from '@/types/database';

export const noteRepository = {
  async getById(id: string, database: AK67Database = db): Promise<PersonalNote | undefined> {
    if (!id) return undefined;
    return database.notes.get(id);
  },

  async getAll(database: AK67Database = db): Promise<PersonalNote[]> {
    return database.notes.orderBy('updatedAt').reverse().toArray();
  },

  async getMistakes(database: AK67Database = db): Promise<PersonalNote[]> {
    return database.notes.filter((n) => n.isMistakeLog === true).reverse().toArray();
  },

  async getByCategory(category: string, database: AK67Database = db): Promise<PersonalNote[]> {
    return database.notes.where('category').equals(category).toArray();
  },

  async search(query: string, database: AK67Database = db): Promise<PersonalNote[]> {
    const q = query.trim().toLowerCase();
    if (!q) return database.notes.toArray();

    return database.notes
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          (Array.isArray(n.tags) && n.tags.some((t) => t.toLowerCase().includes(q)))
      )
      .toArray();
  },

  async upsert(note: Omit<PersonalNote, 'id'> & { id?: string }, database: AK67Database = db): Promise<string> {
    const now = new Date().toISOString();
    const id = note.id || 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);

    const record: PersonalNote = {
      ...note,
      id,
      title: note.title.trim(),
      category: note.category || 'General',
      tags: Array.isArray(note.tags) ? note.tags : [],
      content: note.content || '',
      isMistakeLog: Boolean(note.isMistakeLog),
      createdAt: note.createdAt || now,
      updatedAt: now,
    };

    await database.notes.put(record);
    return id;
  },

  async delete(id: string, database: AK67Database = db): Promise<void> {
    await database.notes.delete(id);
  },

  async countTotal(database: AK67Database = db): Promise<number> {
    return database.notes.count();
  },

  async countMistakes(database: AK67Database = db): Promise<number> {
    return database.notes.filter((n) => n.isMistakeLog === true).count();
  },

  async batchPut(records: PersonalNote[], database: AK67Database = db): Promise<void> {
    await database.transaction('rw', database.notes, async () => {
      for (const rec of records) {
        if (!rec.id) throw new Error('[noteRepository] Batch error: missing id in record');
        await database.notes.put(rec);
      }
    });
  },
};
