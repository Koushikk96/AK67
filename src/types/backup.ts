import {
  ProblemProgress,
  TopicProgress,
  DailyPlannerEntry,
  MockTestRecord,
  CompanyProfile,
  PersonalNote,
  StudySession,
  AppSettingItem,
} from './database';

export interface BackupSummary {
  totalProblemsTracked: number;
  solvedCount: number;
  attemptedCount: number;
  totalTopicsTracked: number;
  dailyPlannerCount: number;
  totalNotes: number;
  mistakesCount: number;
  mockTestsCount: number;
  studySessionsCount: number;
  companyProfilesCount: number;
}

export interface BackupData {
  problem_progress: ProblemProgress[];
  topic_progress: TopicProgress[];
  daily_planner: DailyPlannerEntry[];
  mock_tests: MockTestRecord[];
  company_profiles: CompanyProfile[];
  notes: PersonalNote[];
  study_sessions: StudySession[];
  app_settings: AppSettingItem[];
}

export interface AK67BackupFile {
  appName: 'AK67';
  appVersion: string;
  schemaVersion: number;
  backupFormatVersion: number;
  exportedAt: string;
  summary: BackupSummary;
  data: BackupData;
}

export interface TableDiffResult {
  tableName: keyof BackupData;
  label: string;
  backupCount: number;
  existingCount: number;
  newCount: number;
  conflictCount: number;
  identicalCount: number;
}

export interface BackupDiffAnalysis {
  isValid: boolean;
  error?: string;
  backupFile: AK67BackupFile;
  tables: TableDiffResult[];
  totalNewRecords: number;
  totalConflictingRecords: number;
  totalIdenticalRecords: number;
  totalBackupRecords: number;
  hasLocalData: boolean;
}

export type RestorationMode = 'merge' | 'replace';

export interface RestorationResult {
  success: boolean;
  mode: RestorationMode;
  message: string;
  recordsRestored: number;
  conflictsResolved: number;
  timestamp: string;
}
