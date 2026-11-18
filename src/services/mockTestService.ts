import { db, AK67Database } from '@/db';
import { mockTestRepository } from '@/db/repositories/mockTestRepository';
import { studySessionRepository } from '@/db/repositories/studySessionRepository';
import {
  MockTestConfig,
  TestQuestion,
  ActiveTestSession,
  MockTestResult,
  MockTestAnalytics,
  QuestionResultItem,
} from '@/types/mockTest';
import { allAptitudeTopics } from '@/content/aptitude';
import { allTechnicalMCQs } from '@/content/mcq';

const ACTIVE_TEST_STORAGE_KEY = 'ak67_active_test_session';

// Safe storage helpers for browser + Node.js test environments
const memoryFallback: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
  } catch {
    // fallback to memory
  }
  return memoryFallback[key] || null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch {
    // fallback to memory
  }
  memoryFallback[key] = value;
}

function safeRemoveItem(key: string): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch {
    // fallback to memory
  }
  delete memoryFallback[key];
}

// Predefined test configurations as specified in requirements
export const predefinedMockTests: MockTestConfig[] = [
  {
    id: 'config-15m-quick',
    title: '15-Minute Quick Placement Drill',
    description: 'Rapid sprint covering fundamental Aptitude and Technical MCQs.',
    category: 'mixed',
    durationMinutes: 15,
    questionCount: 15,
    difficulty: 'All',
    negativeMarking: false,
  },
  {
    id: 'config-30m-aptitude',
    title: '30-Minute Placement Aptitude Test',
    description: 'Focused assessment covering Quantitative, Logical, and Verbal rounds.',
    category: 'quantitative',
    durationMinutes: 30,
    questionCount: 30,
    difficulty: 'Medium',
    negativeMarking: false,
  },
  {
    id: 'config-30m-technical',
    title: '30-Minute Core Technical Assessment',
    description: 'High-yield MCQs across C++, OOP, DBMS, SQL, OS, and Networks.',
    category: 'technical',
    durationMinutes: 30,
    questionCount: 30,
    difficulty: 'Medium',
    negativeMarking: false,
  },
  {
    id: 'config-60m-full-mock',
    title: '60-Minute Full Placement Simulation',
    description: 'Complete recruitment test: 10 Quant + 10 Logical + 10 Verbal + 10 Tech with negative marking (-0.25).',
    category: 'mixed',
    durationMinutes: 60,
    questionCount: 40,
    difficulty: 'All',
    negativeMarking: true,
  },
];

// Helper to convert an AptitudeQuestion into unified TestQuestion
function convertAptitudeQuestion(q: any, category: string, _topicTitle: string): TestQuestion {
  return {
    id: q.id,
    question: q.question,
    options: q.options,
    correctOptionIndex: q.correctOptionIndex,
    explanation: q.explanation,
    category: 'aptitude',
    subject:
      category === 'quantitative'
        ? 'Quantitative'
        : category === 'logical'
        ? 'Logical Reasoning'
        : 'Verbal Ability',
    difficulty: q.difficulty,
  };
}

// Convert all 180 aptitude questions into TestQuestion[]
export const allAptitudeMCQs: TestQuestion[] = allAptitudeTopics.flatMap((topic) =>
  topic.practiceQuestions.map((q) => convertAptitudeQuestion(q, topic.category, topic.title))
);

export const allAvailableQuestions: TestQuestion[] = [
  ...allAptitudeMCQs,
  ...allTechnicalMCQs,
];

// Fisher-Yates array shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const mockTestService = {
  /**
   * Generates a randomized list of unique questions matching the configuration.
   */
  generateQuestions(config: MockTestConfig): TestQuestion[] {
    let pool: TestQuestion[] = [];

    if (config.category === 'quantitative') {
      pool = allAptitudeMCQs.filter((q) => q.subject === 'Quantitative');
    } else if (config.category === 'logical') {
      pool = allAptitudeMCQs.filter((q) => q.subject === 'Logical Reasoning');
    } else if (config.category === 'verbal') {
      pool = allAptitudeMCQs.filter((q) => q.subject === 'Verbal Ability');
    } else if (config.category === 'technical') {
      pool = [...allTechnicalMCQs];
    } else if (config.category === 'mixed') {
      // Balanced mixed distribution
      const quant = allAptitudeMCQs.filter((q) => q.subject === 'Quantitative');
      const logical = allAptitudeMCQs.filter((q) => q.subject === 'Logical Reasoning');
      const verbal = allAptitudeMCQs.filter((q) => q.subject === 'Verbal Ability');
      const tech = [...allTechnicalMCQs];

      const perCat = Math.ceil(config.questionCount / 4);
      const selected = [
        ...shuffleArray(quant).slice(0, perCat),
        ...shuffleArray(logical).slice(0, perCat),
        ...shuffleArray(verbal).slice(0, perCat),
        ...shuffleArray(tech).slice(0, perCat),
      ];
      return shuffleArray(selected).slice(0, config.questionCount);
    } else {
      pool = [...allAvailableQuestions];
    }

    // Filter by difficulty if specified
    if (config.difficulty !== 'All') {
      const filtered = pool.filter((q) => q.difficulty === config.difficulty);
      if (filtered.length >= config.questionCount) {
        pool = filtered;
      }
    }

    const shuffled = shuffleArray(pool);
    // Return exact count without duplicates
    const unique = new Map<string, TestQuestion>();
    for (const q of shuffled) {
      if (!unique.has(q.id)) {
        unique.set(q.id, q);
      }
      if (unique.size >= config.questionCount) break;
    }

    return Array.from(unique.values());
  },

  /**
   * Initializes and persists a new active test session.
   */
  startTest(config: MockTestConfig): ActiveTestSession {
    const questions = this.generateQuestions(config);
    const durationSeconds = config.durationMinutes * 60;
    const testId = 'test_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);

    const session: ActiveTestSession = {
      testId,
      title: config.title,
      category: config.category,
      questions,
      durationSeconds,
      startTimestamp: Date.now(),
      answers: {},
      markedForReview: {},
      visited: { [questions[0]?.id || '']: true },
      currentIndex: 0,
      negativeMarking: config.negativeMarking,
      submitted: false,
    };

    this.saveActiveSession(session);
    return session;
  },

  /**
   * Saves active session to local storage.
   */
  saveActiveSession(session: ActiveTestSession): void {
    try {
      safeSetItem(ACTIVE_TEST_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('[mockTestService] Failed to save active test session:', e);
    }
  },

  /**
   * Retrieves active session from local storage, adjusting for elapsed wall-clock time.
   */
  getActiveSession(): { session: ActiveTestSession; isExpired: boolean; remainingSeconds: number } | null {
    try {
      const raw = safeGetItem(ACTIVE_TEST_STORAGE_KEY);
      if (!raw) return null;
      const session: ActiveTestSession = JSON.parse(raw);

      if (session.submitted) {
        safeRemoveItem(ACTIVE_TEST_STORAGE_KEY);
        return null;
      }

      const elapsedSeconds = Math.floor((Date.now() - session.startTimestamp) / 1000);
      const remainingSeconds = Math.max(0, session.durationSeconds - elapsedSeconds);
      const isExpired = remainingSeconds <= 0;

      return { session, isExpired, remainingSeconds };
    } catch (e) {
      console.error('[mockTestService] Failed to load active session:', e);
      return null;
    }
  },

  /**
   * Clears active test session from local storage.
   */
  clearActiveSession(): void {
    safeRemoveItem(ACTIVE_TEST_STORAGE_KEY);
  },

  /**
   * Evaluates active test answers, calculates score and penalties, and persists to IndexedDB.
   */
  async submitTest(session: ActiveTestSession, database: AK67Database = db): Promise<MockTestResult> {
    session.submitted = true;
    this.clearActiveSession();

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    const subjectMap: Record<string, { total: number; correct: number; incorrect: number }> = {};

    const responses: QuestionResultItem[] = session.questions.map((q) => {
      const selected = session.answers[q.id];
      const hasAnswered = selected !== undefined;
      const isCorrect = hasAnswered && selected === q.correctOptionIndex;

      // Track subjects
      if (!subjectMap[q.subject]) {
        subjectMap[q.subject] = { total: 0, correct: 0, incorrect: 0 };
      }
      subjectMap[q.subject].total++;

      if (!hasAnswered) {
        unansweredCount++;
      } else if (isCorrect) {
        correctCount++;
        subjectMap[q.subject].correct++;
      } else {
        incorrectCount++;
        subjectMap[q.subject].incorrect++;
      }

      return {
        questionId: q.id,
        questionText: q.question,
        options: q.options,
        selectedOptionIndex: selected,
        correctOptionIndex: q.correctOptionIndex,
        isCorrect,
        explanation: q.explanation,
        subject: q.subject,
        difficulty: q.difficulty,
      };
    });

    const totalQuestions = session.questions.length;
    const attemptedCount = correctCount + incorrectCount;

    // Score calculation
    let rawScore = correctCount * 1.0;
    if (session.negativeMarking) {
      rawScore -= incorrectCount * 0.25;
    }
    const finalScore = Math.max(0, Math.round(rawScore * 100) / 100);
    const scorePercentage = totalQuestions > 0 ? Math.round((finalScore / totalQuestions) * 100) : 0;
    const accuracyPercentage = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

    const elapsedSeconds = Math.min(
      session.durationSeconds,
      Math.floor((Date.now() - session.startTimestamp) / 1000)
    );

    const nowIso = new Date().toISOString();

    const result: MockTestResult = {
      testId: session.testId,
      title: session.title,
      category: session.category,
      totalQuestions,
      attemptedCount,
      correctCount,
      incorrectCount,
      unansweredCount,
      score: finalScore,
      maxScore: totalQuestions,
      scorePercentage,
      accuracyPercentage,
      timeSpentSeconds: elapsedSeconds,
      negativeMarking: session.negativeMarking,
      completedAt: nowIso,
      subjectBreakdown: subjectMap,
      responses,
    };

    // Save to IndexedDB mock_tests table
    await mockTestRepository.create(
      {
        id: session.testId,
        title: session.title,
        category: session.category,
        totalQuestions,
        correctCount,
        score: scorePercentage,
        durationSeconds: elapsedSeconds,
        responses: responses.map((r) => ({
          questionId: r.questionId,
          selectedOptionIndex: r.selectedOptionIndex,
          correctOptionIndex: r.correctOptionIndex,
          isCorrect: r.isCorrect,
          timeSpentSeconds: 0,
        })),
        completedAt: nowIso,
      },
      database
    );

    // Also log study session in study_sessions table
    const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    await studySessionRepository.logSession(
      durationMinutes,
      `Mock Test: ${session.title}`,
      'mock',
      nowIso.split('T')[0],
      database
    );

    return result;
  },

  /**
   * Fetches test analytics computed strictly from stored IndexedDB records.
   */
  async getAnalytics(database: AK67Database = db): Promise<MockTestAnalytics> {
    const records = await mockTestRepository.getAll(database);

    if (records.length === 0) {
      return {
        totalTests: 0,
        averageScorePercentage: 0,
        highestScorePercentage: 0,
        averageAccuracyPercentage: 0,
        totalQuestionsAttempted: 0,
        totalCorrect: 0,
        totalTimeSpentSeconds: 0,
        categoryPerformance: {},
        recentTests: [],
      };
    }

    let totalScore = 0;
    let highestScore = 0;
    let totalQuestionsAttempted = 0;
    let totalCorrect = 0;
    let totalTimeSpent = 0;
    const catMap: Record<string, { count: number; totalScore: number; totalCorrect: number; totalAttempted: number }> = {};

    const recentResults: MockTestResult[] = [];

    for (const r of records) {
      totalScore += r.score;
      if (r.score > highestScore) highestScore = r.score;
      totalCorrect += r.correctCount;
      totalTimeSpent += r.durationSeconds;

      const attempted = r.responses.filter((resp) => resp.selectedOptionIndex !== undefined).length;
      totalQuestionsAttempted += attempted;

      if (!catMap[r.category]) {
        catMap[r.category] = { count: 0, totalScore: 0, totalCorrect: 0, totalAttempted: 0 };
      }
      catMap[r.category].count++;
      catMap[r.category].totalScore += r.score;
      catMap[r.category].totalCorrect += r.correctCount;
      catMap[r.category].totalAttempted += attempted;

      recentResults.push({
        testId: r.id,
        title: r.title,
        category: r.category,
        totalQuestions: r.totalQuestions,
        attemptedCount: attempted,
        correctCount: r.correctCount,
        incorrectCount: attempted - r.correctCount,
        unansweredCount: r.totalQuestions - attempted,
        score: r.score,
        maxScore: 100,
        scorePercentage: r.score,
        accuracyPercentage: attempted > 0 ? Math.round((r.correctCount / attempted) * 100) : 0,
        timeSpentSeconds: r.durationSeconds,
        negativeMarking: false,
        completedAt: r.completedAt,
        subjectBreakdown: {},
        responses: r.responses.map((resp) => ({
          questionId: resp.questionId,
          questionText: 'Stored response',
          options: [],
          selectedOptionIndex: resp.selectedOptionIndex,
          correctOptionIndex: resp.correctOptionIndex,
          isCorrect: resp.isCorrect,
          explanation: '',
          subject: r.category,
          difficulty: 'Medium',
        })),
      });
    }

    const totalTests = records.length;
    const averageScorePercentage = Math.round(totalScore / totalTests);
    const averageAccuracyPercentage =
      totalQuestionsAttempted > 0 ? Math.round((totalCorrect / totalQuestionsAttempted) * 100) : 0;

    const categoryPerformance: Record<string, { testsCount: number; avgScore: number; avgAccuracy: number }> = {};
    for (const [cat, data] of Object.entries(catMap)) {
      categoryPerformance[cat] = {
        testsCount: data.count,
        avgScore: Math.round(data.totalScore / data.count),
        avgAccuracy: data.totalAttempted > 0 ? Math.round((data.totalCorrect / data.totalAttempted) * 100) : 0,
      };
    }

    return {
      totalTests,
      averageScorePercentage,
      highestScorePercentage: highestScore,
      averageAccuracyPercentage,
      totalQuestionsAttempted,
      totalCorrect,
      totalTimeSpentSeconds: totalTimeSpent,
      categoryPerformance,
      recentTests: recentResults,
    };
  },
};
