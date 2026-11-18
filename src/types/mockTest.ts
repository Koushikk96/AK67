export type MockTestCategory =
  | 'quantitative'
  | 'logical'
  | 'verbal'
  | 'technical'
  | 'mixed';

export type MockDifficulty = 'All' | 'Easy' | 'Medium' | 'Hard';

export type QuestionPaletteStatus =
  | 'not_visited'
  | 'not_answered'
  | 'answered'
  | 'marked_for_review'
  | 'answered_and_marked';

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  category: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface MockTestConfig {
  id?: string;
  title: string;
  description?: string;
  category: MockTestCategory;
  durationMinutes: number;
  questionCount: number;
  difficulty: MockDifficulty;
  negativeMarking: boolean;
}

export interface ActiveTestSession {
  testId: string;
  title: string;
  category: MockTestCategory;
  questions: TestQuestion[];
  durationSeconds: number;
  startTimestamp: number; // Date.now() timestamp
  answers: Record<string, number>; // questionId -> selected option index
  markedForReview: Record<string, boolean>; // questionId -> boolean
  visited: Record<string, boolean>; // questionId -> boolean
  currentIndex: number;
  negativeMarking: boolean;
  submitted: boolean;
}

export interface QuestionResultItem {
  questionId: string;
  questionText: string;
  options: string[];
  selectedOptionIndex?: number;
  correctOptionIndex: number;
  isCorrect: boolean;
  explanation: string;
  subject: string;
  difficulty: string;
}

export interface MockTestResult {
  testId: string;
  title: string;
  category: string;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  score: number;
  maxScore: number;
  scorePercentage: number;
  accuracyPercentage: number;
  timeSpentSeconds: number;
  negativeMarking: boolean;
  completedAt: string;
  subjectBreakdown: Record<string, { total: number; correct: number; incorrect: number }>;
  responses: QuestionResultItem[];
}

export interface MockTestAnalytics {
  totalTests: number;
  averageScorePercentage: number;
  highestScorePercentage: number;
  averageAccuracyPercentage: number;
  totalQuestionsAttempted: number;
  totalCorrect: number;
  totalTimeSpentSeconds: number;
  categoryPerformance: Record<string, { testsCount: number; avgScore: number; avgAccuracy: number }>;
  recentTests: MockTestResult[];
}
