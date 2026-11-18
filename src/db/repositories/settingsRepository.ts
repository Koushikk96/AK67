import { db, AK67Database } from '../index';
import { AppSettingItem } from '@/types/database';

export const settingsRepository = {
  async get<T>(key: string, defaultValue?: T, database: AK67Database = db): Promise<T | undefined> {
    if (!key) return defaultValue;
    const item = await database.app_settings.get(key);
    if (!item || item.value === undefined) {
      return defaultValue;
    }
    return item.value as T;
  },

  async set<T>(key: string, value: T, database: AK67Database = db): Promise<void> {
    if (!key) throw new Error('[settingsRepository] Key is required');
    await database.app_settings.put({ key, value });
  },

  async getAll(database: AK67Database = db): Promise<AppSettingItem[]> {
    return database.app_settings.toArray();
  },

  async getLastBackupDate(database: AK67Database = db): Promise<string | null> {
    const val = await this.get<string>('last_backup_timestamp', undefined, database);
    return val || null;
  },

  async setLastBackupDate(dateIso: string, database: AK67Database = db): Promise<void> {
    await this.set('last_backup_timestamp', dateIso, database);
  },

  async getBackupReminderDismissedUntil(database: AK67Database = db): Promise<string | null> {
    const val = await this.get<string>('backup_reminder_dismissed_until', undefined, database);
    return val || null;
  },

  async setBackupReminderDismissedUntil(dateIso: string, database: AK67Database = db): Promise<void> {
    await this.set('backup_reminder_dismissed_until', dateIso, database);
  },

  async countTotal(database: AK67Database = db): Promise<number> {
    return database.app_settings.count();
  },

  async batchPut(records: AppSettingItem[], database: AK67Database = db): Promise<void> {
    await database.transaction('rw', database.app_settings, async () => {
      for (const rec of records) {
        if (!rec.key) throw new Error('[settingsRepository] Batch error: missing key in record');
        await database.app_settings.put(rec);
      }
    });
  },
};
