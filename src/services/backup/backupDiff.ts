import { AK67Database, db } from '@/db';
import { AK67BackupFile, BackupDiffAnalysis, TableDiffResult, BackupData } from '@/types/backup';

interface TableMeta {
  key: keyof BackupData;
  label: string;
  idField: string;
}

const TABLE_META: TableMeta[] = [
  { key: 'problem_progress', label: 'DSA Problem Progress', idField: 'id' },
  { key: 'topic_progress', label: 'Core Topics Progress', idField: 'id' },
  { key: 'daily_planner', label: 'Daily Planner Entries', idField: 'id' },
  { key: 'mock_tests', label: 'Mock Test Records', idField: 'id' },
  { key: 'company_profiles', label: 'Company Profiles', idField: 'id' },
  { key: 'notes', label: 'Notes & Mistakes', idField: 'id' },
  { key: 'study_sessions', label: 'Study Sessions', idField: 'id' },
  { key: 'app_settings', label: 'Preferences & Settings', idField: 'key' },
];

export const backupDiff = {
  async analyze(backupFile: AK67BackupFile, database: AK67Database = db): Promise<BackupDiffAnalysis> {
    const tableResults: TableDiffResult[] = [];
    let totalNew = 0;
    let totalConflict = 0;
    let totalIdentical = 0;
    let totalBackup = 0;
    let totalExistingAll = 0;

    for (const meta of TABLE_META) {
      const incomingRecords = (backupFile.data[meta.key] || []) as any[];
      const localTable = database.table(meta.key);
      const localRecords = await localTable.toArray();
      totalExistingAll += localRecords.length;

      const localMap = new Map<string, any>();
      for (const rec of localRecords) {
        const pk = rec[meta.idField];
        if (pk !== undefined) {
          localMap.set(String(pk), rec);
        }
      }

      let newCount = 0;
      let conflictCount = 0;
      let identicalCount = 0;

      for (const incoming of incomingRecords) {
        const pk = String(incoming[meta.idField]);
        const existing = localMap.get(pk);

        if (!existing) {
          newCount += 1;
        } else {
          // Compare JSON serialization for deep identity
          if (JSON.stringify(incoming) === JSON.stringify(existing)) {
            identicalCount += 1;
          } else {
            conflictCount += 1;
          }
        }
      }

      totalNew += newCount;
      totalConflict += conflictCount;
      totalIdentical += identicalCount;
      totalBackup += incomingRecords.length;

      tableResults.push({
        tableName: meta.key,
        label: meta.label,
        backupCount: incomingRecords.length,
        existingCount: localRecords.length,
        newCount,
        conflictCount,
        identicalCount,
      });
    }

    return {
      isValid: true,
      backupFile,
      tables: tableResults,
      totalNewRecords: totalNew,
      totalConflictingRecords: totalConflict,
      totalIdenticalRecords: totalIdentical,
      totalBackupRecords: totalBackup,
      hasLocalData: totalExistingAll > 0,
    };
  },
};
