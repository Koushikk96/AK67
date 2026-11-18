import Dexie, { Table, DexieOptions } from 'dexie';
import {
  ProblemProgress,
  TopicProgress,
  DailyPlannerEntry,
  MockTestRecord,
  CompanyProfile,
  PersonalNote,
  StudySession,
  AppSettingItem,
} from '@/types/database';

export const CURRENT_DATABASE_VERSION = 1;
export const CURRENT_DATABASE_NAME = 'AK67_Database';

export class AK67Database extends Dexie {
  problem_progress!: Table<ProblemProgress, string>;
  topic_progress!: Table<TopicProgress, string>;
  daily_planner!: Table<DailyPlannerEntry, string>;
  mock_tests!: Table<MockTestRecord, string>;
  company_profiles!: Table<CompanyProfile, string>;
  notes!: Table<PersonalNote, string>;
  study_sessions!: Table<StudySession, string>;
  app_settings!: Table<AppSettingItem, string>;

  constructor(dbName: string = CURRENT_DATABASE_NAME, options?: DexieOptions) {
    super(dbName, options);

    // Version 1 Schema
    this.version(1).stores({
      // Primary key: id (problemId string e.g. "dsa-01")
      // Indexes: status, bookmarked, nextRevisionDate, topic, difficulty, lastAttemptedAt
      problem_progress: 'id, status, bookmarked, nextRevisionDate, topic, difficulty, lastAttemptedAt',

      // Primary key: id (topicId string e.g. "cpp-stl")
      // Indexes: category, lastStudiedAt
      topic_progress: 'id, category, lastStudiedAt',

      // Primary key: id (ISO date string YYYY-MM-DD e.g. "2026-11-18")
      // Indexes: completed
      daily_planner: 'id, completed',

      // Primary key: id (UUID string)
      // Indexes: category, completedAt, score
      mock_tests: 'id, category, completedAt, score',

      // Primary key: id (UUID or slug e.g. "company-tcs")
      // Indexes: status, updatedAt
      company_profiles: 'id, status, updatedAt',

      // Primary key: id (UUID string)
      // Indexes: category, isMistakeLog, linkedProblemId, createdAt, updatedAt
      notes: 'id, category, isMistakeLog, linkedProblemId, createdAt, updatedAt',

      // Primary key: id (UUID string)
      // Indexes: date, sessionType, completedAt
      study_sessions: 'id, date, sessionType, completedAt',

      // Primary key: key (string e.g. "theme", "placement_deadline")
      app_settings: 'key',
    });
  }
}
