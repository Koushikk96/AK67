/**
 * AK67 Database TypeScript Models and Storage Contracts
 * Strictly adhering to DATABASE_SCHEMA.md
 */

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

export type ApplicationStatus = 'wishlist' | 'applied' | 'oa_cleared' | 'interviewing' | 'offered' | 'rejected';

export interface CompanyRound {
  id: string;
  name: string;
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

export interface PersonalNote {
  /** UUID */
  id: string;
  /** Title of the note */
  title: string;
  /** Category or subject (e.g., "Dynamic Programming", "Interview HR", "System Design") */
  category: string;
  /** Tags for categorization and search */
  tags: string[];
  /** Markdown content */
  content: string;
  /** Optional link to a specific DSA problem or Core CS topic */
  linkedProblemId?: string;
  /** Flag to designate if this note is an entry in the Mistake Repository */
  isMistakeLog: boolean;
  /** Mistake classification if isMistakeLog is true */
  mistakeType?: string;
  /** ISO timestamp of creation */
  createdAt: string;
  /** ISO timestamp of last modification */
  updatedAt: string;
}

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

export interface AppSettingItem {
  /** Unique setting key */
  key: string;
  /** Value (serialized primitive or object) */
  value: any;
}

export interface DatabaseStats {
  problemProgressCount: number;
  solvedProblemsCount: number;
  topicProgressCount: number;
  dailyPlannerCount: number;
  mockTestsCount: number;
  companyProfilesCount: number;
  notesCount: number;
  mistakesCount: number;
  studySessionsCount: number;
  lastBackupDate?: string | null;
}
