import { AK67BackupFile, BackupData } from '@/types/backup';

export interface ValidationSuccess {
  isValid: true;
  backup: AK67BackupFile;
}

export interface ValidationFailure {
  isValid: false;
  error: string;
}

export type BackupValidationResult = ValidationSuccess | ValidationFailure;

export const backupValidator = {
  validate(rawJson: unknown): BackupValidationResult {
    if (!rawJson || typeof rawJson !== 'object') {
      return { isValid: false, error: 'File is not a valid JSON object.' };
    }

    const candidate = rawJson as Record<string, unknown>;

    // 1. Verify app identifier
    if (candidate.appName !== 'AK67') {
      return {
        isValid: false,
        error: `Incompatible backup file. Expected appName 'AK67', found '${String(candidate.appName)}'.`,
      };
    }

    // 2. Verify schema and format versions
    if (typeof candidate.schemaVersion !== 'number' || candidate.schemaVersion < 1) {
      return {
        isValid: false,
        error: 'Invalid or missing schemaVersion in backup file.',
      };
    }

    if (candidate.schemaVersion > 1) {
      return {
        isValid: false,
        error: `Backup was created with a newer schema version (${candidate.schemaVersion}). This version of AK67 supports up to schema version 1.`,
      };
    }

    // 3. Verify data container
    if (!candidate.data || typeof candidate.data !== 'object') {
      return { isValid: false, error: 'Backup file is missing the data payload.' };
    }

    const data = candidate.data as Record<string, unknown>;
    const expectedTables: (keyof BackupData)[] = [
      'problem_progress',
      'topic_progress',
      'daily_planner',
      'mock_tests',
      'company_profiles',
      'notes',
      'study_sessions',
      'app_settings',
    ];

    // Verify all expected tables exist as arrays
    for (const table of expectedTables) {
      if (data[table] !== undefined && !Array.isArray(data[table])) {
        return {
          isValid: false,
          error: `Malformed data: table '${table}' must be an array.`,
        };
      }
    }

    // 4. Validate record identifiers across all database tables
    const idKeyedTables: (keyof BackupData)[] = [
      'problem_progress',
      'topic_progress',
      'daily_planner',
      'mock_tests',
      'company_profiles',
      'notes',
      'study_sessions',
    ];

    for (const table of idKeyedTables) {
      if (Array.isArray(data[table])) {
        for (const item of data[table] as unknown[]) {
          if (!item || typeof item !== 'object' || typeof (item as any).id !== 'string' || !(item as any).id.trim()) {
            return { isValid: false, error: `Found invalid ${table} record missing a valid string 'id'.` };
          }
        }
      }
    }

    if (Array.isArray(data.app_settings)) {
      for (const item of data.app_settings as unknown[]) {
        if (!item || typeof item !== 'object' || typeof (item as any).key !== 'string' || !(item as any).key.trim()) {
          return { isValid: false, error: "Found invalid app_settings record missing a valid string 'key'." };
        }
      }
    }

    // Normalize empty arrays for any omitted optional tables
    const normalizedData: BackupData = {
      problem_progress: Array.isArray(data.problem_progress) ? (data.problem_progress as any) : [],
      topic_progress: Array.isArray(data.topic_progress) ? (data.topic_progress as any) : [],
      daily_planner: Array.isArray(data.daily_planner) ? (data.daily_planner as any) : [],
      mock_tests: Array.isArray(data.mock_tests) ? (data.mock_tests as any) : [],
      company_profiles: Array.isArray(data.company_profiles) ? (data.company_profiles as any) : [],
      notes: Array.isArray(data.notes) ? (data.notes as any) : [],
      study_sessions: Array.isArray(data.study_sessions) ? (data.study_sessions as any) : [],
      app_settings: Array.isArray(data.app_settings) ? (data.app_settings as any) : [],
    };

    const validBackup: AK67BackupFile = {
      appName: 'AK67',
      appVersion: String(candidate.appVersion || '1.0.0'),
      schemaVersion: candidate.schemaVersion,
      backupFormatVersion: Number(candidate.backupFormatVersion) || 1,
      exportedAt: String(candidate.exportedAt || new Date().toISOString()),
      summary: (candidate.summary as any) || {
        totalProblemsTracked: normalizedData.problem_progress.length,
        solvedCount: normalizedData.problem_progress.filter((p) => p.status === 'solved').length,
        attemptedCount: normalizedData.problem_progress.filter((p) => p.status === 'attempted').length,
        totalTopicsTracked: normalizedData.topic_progress.length,
        dailyPlannerCount: normalizedData.daily_planner.length,
        totalNotes: normalizedData.notes.length,
        mistakesCount: normalizedData.notes.filter((n) => n.isMistakeLog).length,
        mockTestsCount: normalizedData.mock_tests.length,
        studySessionsCount: normalizedData.study_sessions.length,
        companyProfilesCount: normalizedData.company_profiles.length,
      },
      data: normalizedData,
    };

    return { isValid: true, backup: validBackup };
  },
};
