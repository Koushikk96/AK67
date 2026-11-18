# AK67 — IndexedDB Database Schema Specification

This document defines the storage architecture, Dexie.js database schema, TypeScript data models, indexing strategy, and migration principles for **AK67 — Your Placement Preparation System**.

---

## 🏛️ Storage Philosophy

1. **Persistent Browser Storage**: All personal user data is stored strictly in the client's browser using the **IndexedDB API**, wrapped by [Dexie.js](https://dexie.org/) for ACID transactions, robust promise handling, and declarative schema migrations.
2. **Zero Backend Requirement**: No cloud database (Supabase, Firebase, MongoDB) is utilized. The device is the single source of truth for the user's progress.
3. **Decoupled Architecture**:
   - **Static Content (Immutable)**: Problems, starter codes, curated hints, solutions, Core CS notes, and SQL guides are bundled as static TypeScript code files (`src/content/*`).
   - **Dynamic Progress (Mutable)**: Personal statuses, completion timestamps, custom notes, mock scores, and revision dates are stored inside IndexedDB tables.
4. **Upgrade Immunity**: When application content is updated or new problems are added to the static bundle, existing user records in IndexedDB are preserved and merged seamlessly.

---

## 🗄️ Database Definition

- **Database Name**: `AK67_Database`
- **Current Version**: `1`
- **Library**: `dexie` (^4.x or ^3.x)

### Schema Definition (Dexie Syntax)

```typescript
import Dexie, { Table } from 'dexie';
import {
  ProblemProgress,
  TopicProgress,
  DailyPlannerEntry,
  MockTestRecord,
  CompanyProfile,
  PersonalNote,
  StudySession,
  AppSettingItem
} from '@/types/database';

export class AK67Database extends Dexie {
  problem_progress!: Table<ProblemProgress, string>;
  topic_progress!: Table<TopicProgress, string>;
  daily_planner!: Table<DailyPlannerEntry, string>;
  mock_tests!: Table<MockTestRecord, string>;
  company_profiles!: Table<CompanyProfile, string>;
  notes!: Table<PersonalNote, string>;
  study_sessions!: Table<StudySession, string>;
  app_settings!: Table<AppSettingItem, string>;

  constructor() {
    super('AK67_Database');

    this.version(1).stores({
      // Primary key: id (problemId string e.g. "dsa-01")
      // Indexes: status, bookmarked, nextRevisionDate, topic, difficulty
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
      app_settings: 'key'
    });
  }
}

export const db = new AK67Database();
```

---

## 📋 Table Specifications & TypeScript Interfaces

### 1. `problem_progress` Table

Tracks personal progress for each problem in the curated DSA problem list and practice question banks.

```typescript
export type ProblemStatus = 'not_started' | 'attempted' | 'solved' | 'revise';
export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface ProblemProgress {
  /** Unique problem identifier (e.g., "two-sum", "dsa-01") */
  id: string;
  /** Category/Topic matching the static content */
  topic: string;
  /** Problem difficulty */
  difficulty: ProblemDifficulty;
  /** Current completion status */
  status: ProblemStatus;
  /** User's personal markdown notes, observations, edge-case caveats */
  personalNotes: string;
  /** User's custom code solution/approach */
  userCode?: string;
  /** Bookmarked for quick access */
  bookmarked: boolean;
  /** ISO timestamp of most recent attempt */
  lastAttemptedAt?: string;
  /** ISO timestamp of when first marked Solved */
  solvedAt?: string;

  // Spaced Repetition Fields
  /** Number of successful revisions completed */
  revisionCount: number;
  /** Current revision interval in days (e.g., 1, 3, 7, 21, 60) */
  intervalDays: number;
  /** Ease factor multiplier for spaced repetition (default: 2.5) */
  easeFactor: number;
  /** Scheduled next revision date (YYYY-MM-DD format for fast indexing) */
  nextRevisionDate?: string;
}
```

### 2. `topic_progress` Table

Tracks completion and mastery of theoretical topics (C++, SQL, Operating Systems, DBMS, Networks, Software Engineering).

```typescript
export interface TopicProgress {
  /** Unique topic identifier (e.g., "cpp-virtual-functions", "dbms-indexing") */
  id: string;
  /** Subject category (e.g., "cpp", "sql", "os", "dbms", "cn", "se") */
  category: string;
  /** Total sub-items/checkpoints inside this topic */
  totalCheckpoints: number;
  /** Checkpoint IDs marked as understood */
  completedCheckpoints: string[];
  /** Topic mastery status */
  isMastered: boolean;
  /** Personal summary note */
  notes: string;
  /** ISO timestamp of last study session */
  lastStudiedAt: string;
}
```

### 3. `daily_planner` Table

Tracks daily goals, custom task checklists, and target completion for a specific calendar date.

```typescript
export interface CustomTask {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface DailyPlannerEntry {
  /** Date formatted as YYYY-MM-DD */
  id: string;
  /** Daily target problem count (e.g., 3) */
  targetProblemsCount: number;
  /** Completed problems count for this date */
  actualProblemsCount: number;
  /** Custom checklist tasks */
  customTasks: CustomTask[];
  /** Total focus study minutes logged on this day */
  studyMinutes: number;
  /** Whether the daily target was marked complete */
  completed: boolean;
  /** End-of-day reflection or notes */
  dailyReflection?: string;
}
```

### 4. `mock_tests` Table

Stores completed online assessment simulation scores and question-level responses.

```typescript
export interface QuestionResponse {
  questionId: string;
  selectedOptionIndex?: number;
  correctOptionIndex: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface MockTestRecord {
  /** UUID of the test attempt */
  id: string;
  /** Title or test type (e.g., "Full Placement Simulation #1", "OS Quick Quiz") */
  title: string;
  /** Category ("full_mock", "aptitude", "core_cs", "dsa_mcq", "sql") */
  category: string;
  /** Total questions presented */
  totalQuestions: number;
  /** Correctly answered questions */
  correctCount: number;
  /** Score in percentage (0 - 100) */
  score: number;
  /** Total duration spent in seconds */
  durationSeconds: number;
  /** Detailed array of user answers and outcomes */
  responses: QuestionResponse[];
  /** ISO timestamp of test completion */
  completedAt: string;
}
```

### 5. `company_profiles` Table

Tracks company placement drives, application status, interview rounds, and preparation checklists.

```typescript
export type ApplicationStatus = 'wishlist' | 'applied' | 'oa_cleared' | 'interviewing' | 'offered' | 'rejected';

export interface CompanyRound {
  id: string;
  name: string; // e.g. "Online Assessment", "Technical Round 1", "HR Round"
  status: 'pending' | 'cleared' | 'failed';
  date?: string;
  experienceNotes?: string;
}

export interface CompanyChecklistItem {
  id: string;
  task: string;
  completed: boolean;
}

export interface CompanyProfile {
  /** Unique ID or company slug */
  id: string;
  /** Company name (e.g., "Amazon", "TCS", "Cisco") */
  name: string;
  /** Target role (e.g., "SDE-1", "Digital Specialist Engineer") */
  role: string;
  /** Eligibility rules (e.g., "60% throughout, no active backlogs") */
  eligibility: string;
  /** Assessment pattern breakdown */
  assessmentPattern: string;
  /** Current application pipeline status */
  status: ApplicationStatus;
  /** Pipeline rounds */
  rounds: CompanyRound[];
  /** Specific preparation checklist */
  checklist: CompanyChecklistItem[];
  /** Personal notes on company culture, prep links, Glassdoor tips */
  notes: string;
  /** ISO timestamp of last update */
  updatedAt: string;
}
```

### 6. `notes` Table

Stores general notes, problem-specific insights, and dedicated mistake entries.

```typescript
export interface PersonalNote {
  /** UUID */
  id: string;
  /** Title of the note */
  title: string;
  /** Category or subject (e.g., "Dynamic Programming", "Interview HR", "System Design") */
  category: string;
  /** Tags for categorization and search (e.g., ["prefix-sum", "edge-case"]) */
  tags: string[];
  /** Markdown content */
  content: string;
  /** Optional link to a specific DSA problem or Core CS topic */
  linkedProblemId?: string;
  /** Flag to designate if this note is an entry in the Mistake Repository */
  isMistakeLog: boolean;
  /** Mistake classification if isMistakeLog is true (e.g., "Integer Overflow", "Boundary Condition", "Time Limit") */
  mistakeType?: string;
  /** ISO timestamp of creation */
  createdAt: string;
  /** ISO timestamp of last modification */
  updatedAt: string;
}
```

### 7. `study_sessions` Table

Logs individual study sessions (manual logs or Pomodoro completions) for calculating streaks, weekly study hours, and consistency heatmaps.

```typescript
export type SessionType = 'dsa' | 'theory' | 'revision' | 'mock' | 'pomodoro';

export interface StudySession {
  /** UUID */
  id: string;
  /** Calendar date YYYY-MM-DD */
  date: string;
  /** Duration in minutes */
  durationMinutes: number;
  /** Subject or module studied */
  module: string;
  /** Session classification */
  sessionType: SessionType;
  /** ISO timestamp of session completion */
  completedAt: string;
}
```

### 8. `app_settings` Table

Stores user preferences and application meta-configuration.

```typescript
export interface AppSettingItem {
  /** Unique setting key */
  key: string;
  /** Value (serialized primitive or object) */
  value: any;
}
```

**Standard Settings Keys**:
- `theme`: `'dark' | 'light'` (Default: `'dark'`)
- `placement_target_date`: ISO date string (e.g., `"2026-09-01"`)
- `daily_dsa_target`: number (Default: `3`)
- `daily_study_goal_minutes`: number (Default: `120`)
- `pomodoro_focus_duration`: number (Default: `25`)
- `pomodoro_break_duration`: number (Default: `5`)
- `backup_reminder_interval_days`: number (Default: `3`)
- `last_backup_timestamp`: ISO date string or `null`
- `backup_reminder_dismissed_until`: ISO date string or `null`

---

## 🔄 Schema Migration & Versioning Strategy

IndexedDB database version upgrades must **never** clear or discard user progress. Dexie's built-in upgrade pipeline guarantees that whenever new schema versions are deployed, transformations execute transactionally.

```typescript
// Example for future versions:
// this.version(2).stores({
//   problem_progress: 'id, status, bookmarked, nextRevisionDate, topic, difficulty, lastAttemptedAt, priority',
// }).upgrade(tx => {
//   // Non-destructive data transformation
//   return tx.table('problem_progress').toCollection().modify(item => {
//     if (!item.priority) item.priority = 'normal';
//   });
// });
```

---

## ⚡ Indexing & Query Patterns

1. **Revisions Due Today**:
   ```typescript
   const today = new Date().toISOString().split('T')[0];
   const dueProblems = await db.problem_progress
     .where('nextRevisionDate')
     .belowOrEqual(today)
     .toArray();
   ```

2. **Active Bookmarks**:
   ```typescript
   const bookmarkedProblems = await db.problem_progress
     .where('bookmarked')
     .equals(1) // boolean indexed as 1/0
     .toArray();
   ```

3. **Current Streak Calculation**:
   ```typescript
   const sessions = await db.study_sessions
     .orderBy('date')
     .reverse()
     .uniqueKeys();
   // Compute consecutive days leading back from today
   ```

4. **Weak Topics**:
   ```typescript
   // Group mock_tests and problem_progress by topic/difficulty to find lowest success ratios
   ```
