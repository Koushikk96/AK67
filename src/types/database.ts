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

export type TopicStatus = 'not_started' | 'learning' | 'completed' | 'revise';

export interface TopicProgress {
  /** Unique topic identifier (e.g., "cpp-virtual-functions", "dbms-indexing") */
  id: string;
  /** Subject category (e.g., "cpp", "sql", "os", "dbms", "cn", "se", "aptitude") */
  category: string;
  /** Current learning status */
  status?: TopicStatus;
  /** Whether the topic is bookmarked */
  bookmarked?: boolean;
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

  // Spaced Repetition Fields
  /** Number of revisions completed */
  revisionCount?: number;
  /** Current revision interval in days (e.g., 1, 3, 7, 14, 30) */
  intervalDays?: number;
  /** Scheduled next revision date (YYYY-MM-DD) */
  nextRevisionDate?: string;
  /** ISO timestamp of most recent revision completion */
  lastRevisedAt?: string;
  /** Explicitly enrolled in revision queue */
  inRevisionQueue?: boolean;
}

export type PlannerCategory =
  | 'DSA'
  | 'C++'
  | 'SQL'
  | 'DBMS'
  | 'OS'
  | 'Computer Networks'
  | 'Software Engineering'
  | 'Aptitude'
  | 'Revision'
  | 'Mock Test';

export interface CustomTask {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  category?: PlannerCategory;
  topic?: string;
  targetDurationMinutes?: number;
  plannedDate?: string;
  completedAt?: string;
}

export interface DailyPlannerEntry {
  /** Date formatted as YYYY-MM-DD */
  id: string;
  /** Daily target problem count (e.g., 3) */
  targetProblemsCount: number;
  /** Completed problems count for this date */
  actualProblemsCount: number;
  /** Target daily study time in minutes */
  targetStudyMinutes?: number;
  /** Target aptitude topics / questions count */
  targetAptitudeCount?: number;
  /** Completed aptitude count for this date */
  actualAptitudeCount?: number;
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
  /** Eligibility rules (general guideline, not guaranteed) */
  eligibility: string;
  /** Assessment pattern breakdown */
  assessmentPattern: string;
  /** Specific aptitude areas to focus on */
  aptitudePrep?: string;
  /** Specific coding topics to focus on */
  codingPrep?: string;
  /** Technical interview focus areas */
  techInterviewTopics?: string;
  /** HR and behavioral focus areas */
  hrInterviewTopics?: string;
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

export type MistakeCategory =
  | 'Conceptual misunderstanding'
  | 'Incorrect formula'
  | 'Logical error'
  | 'Syntax error'
  | 'Edge case missed'
  | 'Time management'
  | 'Careless mistake'
  | 'Misread question';

export type MistakeReviewStatus = 'pending' | 'reviewed' | 'resolved';

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
  /** Whether the note is pinned to the top */
  isPinned?: boolean;

  // Extended fields when note represents a structured mistake log
  subject?: string;
  relatedId?: string;
  mistakeCategory?: MistakeCategory;
  whatWentWrong?: string;
  correctApproach?: string;
  personalLesson?: string;
  dateRecorded?: string;
  reviewStatus?: MistakeReviewStatus;
  difficulty?: 'Easy' | 'Medium' | 'Hard';

  /** ISO timestamp of creation */
  createdAt: string;
  /** ISO timestamp of last modification */
  updatedAt: string;
}

export type SessionType = 'dsa' | 'theory' | 'revision' | 'mock' | 'pomodoro' | 'coding_assessment';

export type CodingAssistanceLevel = 'independent' | 'hints' | 'solution';

export interface CodingAssessmentRecord {
  id: string;
  problemId: string;
  problemTitle: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  assistanceLevel: CodingAssistanceLevel;
  notes?: string;
  attemptedAt: string;
}

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
