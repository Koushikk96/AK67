# AK67 — IndexedDB Database Schema Specification

This document defines the storage architecture, Dexie.js database schema, TypeScript data models, indexing strategy, and migration principles for **AK67 — Your Placement Preparation System**.

---

## 🏛️ Storage Philosophy

1. **Persistent Browser Storage**: All personal user data is stored strictly in the client's browser using the **IndexedDB API**, wrapped by [Dexie.js](https://dexie.org/) (`^4.4.7`) for ACID transactions, robust promise handling, and declarative schema migrations.
2. **Zero Backend Requirement**: No cloud database (Supabase, Firebase, MongoDB) is utilized. The device is the single source of truth for the user's progress.
3. **Decoupled Architecture**:
   - **Static Content (Immutable)**: Problems, starter codes, curated hints, solutions, Core CS notes, and SQL guides are bundled as static TypeScript code files (`src/content/*`).
   - **Dynamic Progress (Mutable)**: Personal statuses, completion timestamps, custom notes, mock scores, and revision dates are stored inside IndexedDB tables.
4. **Upgrade Immunity**: When application content is updated or new problems are added to the static bundle, existing user records in IndexedDB are preserved and merged seamlessly.

---

## 🗄️ Database Definition & Implemented Tables

- **Database Name**: `AK67_Database`
- **Current Version**: `1`
- **Library**: `dexie` (`^4.4.7`) & `dexie-react-hooks` (`^4.4.0`)
- **Verification**: Fully verified via automated test suite (`tests/databasePersistence.test.ts`) passing 47/47 assertions.

### Schema Definition (Dexie Syntax)

```typescript
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

export const db = new AK67Database();
```

---

## 📋 Implemented Repository Layer

React components never access Dexie tables directly. All interactions are routed through type-safe, isolated repository singletons located in `src/db/repositories/`:

1. **`problemRepository`** ([src/db/repositories/problemRepository.ts](file:///d:/Projects/AK67/src/db/repositories/problemRepository.ts)):
   - `getById(id)`
   - `getAll()`
   - `getByStatus(status)`
   - `getBookmarked()`
   - `getDueRevisions(dateStr?)`
   - `upsert(record)` (with defensive normalization)
   - `updateStatus(id, status, personalNotes?)`
   - `toggleBookmark(id)`
   - `countSolved()`, `countTotal()`
   - `batchPut(records)` (transactional)
2. **`topicRepository`** ([src/db/repositories/topicRepository.ts](file:///d:/Projects/AK67/src/db/repositories/topicRepository.ts)):
   - `getById(id)`, `getAll()`, `getByCategory(category)`
   - `upsert(record)`
   - `toggleCheckpoint(topicId, checkpointId, category, totalCheckpoints)`
   - `countTotal()`, `batchPut(records)`
3. **`dailyPlannerRepository`** ([src/db/repositories/dailyPlannerRepository.ts](file:///d:/Projects/AK67/src/db/repositories/dailyPlannerRepository.ts)):
   - `getByDate(dateStr)`, `getToday()`
   - `addCustomTask(dateStr, text, priority)`
   - `toggleCustomTask(dateStr, taskId)`, `deleteCustomTask(dateStr, taskId)`
   - `countTotal()`, `batchPut(records)`
4. **`mockTestRepository`** ([src/db/repositories/mockTestRepository.ts](file:///d:/Projects/AK67/src/db/repositories/mockTestRepository.ts)):
   - `getById(id)`, `getAll()`, `getByCategory(category)`
   - `create(record)` (generates deterministic or UUID timestamped key)
   - `delete(id)`, `countTotal()`, `batchPut(records)`
5. **`companyRepository`** ([src/db/repositories/companyRepository.ts](file:///d:/Projects/AK67/src/db/repositories/companyRepository.ts)):
   - `getById(id)`, `getAll()`, `getByStatus(status)`
   - `upsert(profile)`, `updateStatus(id, status)`
   - `toggleChecklist(companyId, checklistId)`
   - `delete(id)`, `countTotal()`, `batchPut(records)`
6. **`noteRepository`** ([src/db/repositories/noteRepository.ts](file:///d:/Projects/AK67/src/db/repositories/noteRepository.ts)):
   - `getById(id)`, `getAll()`, `getMistakes()`, `getByCategory(category)`
   - `search(query)` (multi-field search across title, content, and tags)
   - `upsert(note)`, `delete(id)`
   - `countTotal()`, `countMistakes()`, `batchPut(records)`
7. **`studySessionRepository`** ([src/db/repositories/studySessionRepository.ts](file:///d:/Projects/AK67/src/db/repositories/studySessionRepository.ts)):
   - `getById(id)`, `getAll()`, `getByDate(dateStr)`
   - `logSession(durationMinutes, module, sessionType, dateStr?)`
   - `calculateStreak()` (computes unbroken consecutive days)
   - `countTotal()`, `batchPut(records)`
8. **`settingsRepository`** ([src/db/repositories/settingsRepository.ts](file:///d:/Projects/AK67/src/db/repositories/settingsRepository.ts)):
   - `get<T>(key, defaultValue?)`, `set<T>(key, value)`
   - `getLastBackupDate()`, `setLastBackupDate(dateIso)`
   - `getBackupReminderDismissedUntil()`, `setBackupReminderDismissedUntil(dateIso)`

---

## 🧪 Verified Persistence & Test Results

The persistence architecture was tested against in-memory IndexedDB transactions in `tests/databasePersistence.test.ts`:

- **Empty Database Initialization**: Confirmed 8 tables initialize with 0 records.
- **Record Isolation**: Modifying record `p1` does not alter fields or timestamps in `p2`.
- **Duplicate & Idempotent Upserts**: Safely updates record without creating duplicate entries.
- **Persistence Across Database Close/Re-Open**: Records survive simulate browser restart / page reloads with status intact.
- **Transaction Rollback on Failure**: Atomic transactions catch exceptions and cleanly roll back uncommitted changes.
- **Input Validation**: Rejects empty primary keys and malformed records.
- **Test Command**: `npm test` runs all 47 assertions with 100% pass rate.
