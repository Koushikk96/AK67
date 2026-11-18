import { db, AK67Database } from '../index';
import { CompanyProfile, ApplicationStatus } from '@/types/database';

export const companyRepository = {
  async getById(id: string, database: AK67Database = db): Promise<CompanyProfile | undefined> {
    if (!id) return undefined;
    return database.company_profiles.get(id);
  },

  async getAll(database: AK67Database = db): Promise<CompanyProfile[]> {
    return database.company_profiles.orderBy('updatedAt').reverse().toArray();
  },

  async getByStatus(status: ApplicationStatus, database: AK67Database = db): Promise<CompanyProfile[]> {
    return database.company_profiles.where('status').equals(status).toArray();
  },

  async upsert(profile: CompanyProfile, database: AK67Database = db): Promise<string> {
    if (!profile.id) {
      throw new Error('[companyRepository] Invalid profile: id is required.');
    }
    const normalized: CompanyProfile = {
      ...profile,
      rounds: Array.isArray(profile.rounds) ? profile.rounds : [],
      checklist: Array.isArray(profile.checklist) ? profile.checklist : [],
      notes: profile.notes || '',
      updatedAt: new Date().toISOString(),
    };
    await database.company_profiles.put(normalized);
    return normalized.id;
  },

  async updateStatus(id: string, status: ApplicationStatus, database: AK67Database = db): Promise<void> {
    const existing = await database.company_profiles.get(id);
    if (!existing) throw new Error(`[companyRepository] Company ${id} not found.`);
    await database.company_profiles.update(id, {
      status,
      updatedAt: new Date().toISOString(),
    });
  },

  async toggleChecklist(companyId: string, checklistId: string, database: AK67Database = db): Promise<boolean> {
    const company = await database.company_profiles.get(companyId);
    if (!company) return false;

    let targetState = false;
    const updated = company.checklist.map((item) => {
      if (item.id === checklistId) {
        targetState = !item.completed;
        return { ...item, completed: targetState };
      }
      return item;
    });

    await database.company_profiles.update(companyId, {
      checklist: updated,
      updatedAt: new Date().toISOString(),
    });
    return targetState;
  },

  async delete(id: string, database: AK67Database = db): Promise<void> {
    await database.company_profiles.delete(id);
  },

  async countTotal(database: AK67Database = db): Promise<number> {
    return database.company_profiles.count();
  },

  async batchPut(records: CompanyProfile[], database: AK67Database = db): Promise<void> {
    await database.transaction('rw', database.company_profiles, async () => {
      for (const rec of records) {
        if (!rec.id) throw new Error('[companyRepository] Batch error: missing id in record');
        await database.company_profiles.put(rec);
      }
    });
  },
};
