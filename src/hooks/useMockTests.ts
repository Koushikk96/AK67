import { useState, useEffect, useCallback, useRef } from 'react';
import {
  MockTestConfig,
  ActiveTestSession,
  MockTestResult,
  MockTestAnalytics,
  QuestionPaletteStatus,
} from '@/types/mockTest';
import { mockTestService, predefinedMockTests } from '@/services/mockTestService';

export const useMockTests = () => {
  const [activeSession, setActiveSession] = useState<ActiveTestSession | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [testResult, setTestResult] = useState<MockTestResult | null>(null);
  const [analytics, setAnalytics] = useState<MockTestAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load analytics and check if an active test is already in progress
  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const stats = await mockTestService.getAnalytics();
      setAnalytics(stats);

      const active = mockTestService.getActiveSession();
      if (active) {
        if (active.isExpired) {
          // Time expired while user was away: auto-submit immediately
          const res = await mockTestService.submitTest(active.session);
          setTestResult(res);
          setActiveSession(null);
        } else {
          setActiveSession(active.session);
          setRemainingSeconds(active.remainingSeconds);
        }
      }
    } catch (e) {
      console.error('[useMockTests] Error loading initial mock test data:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Wall-clock resilient countdown timer
  useEffect(() => {
    if (!activeSession || activeSession.submitted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      const active = mockTestService.getActiveSession();
      if (!active) {
        if (timerRef.current) clearInterval(timerRef.current);
        return;
      }

      if (active.isExpired) {
        if (timerRef.current) clearInterval(timerRef.current);
        // Time expired: auto-submit
        handleSubmit(active.session);
      } else {
        setRemainingSeconds(active.remainingSeconds);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSession]);

  // Start new test
  const startTest = useCallback((config: MockTestConfig) => {
    const session = mockTestService.startTest(config);
    setActiveSession(session);
    setRemainingSeconds(session.durationSeconds);
    setTestResult(null);
  }, []);

  // Answer selection
  const selectAnswer = useCallback((questionId: string, optionIndex: number) => {
    setActiveSession((prev) => {
      if (!prev) return null;
      const updated: ActiveTestSession = {
        ...prev,
        answers: { ...prev.answers, [questionId]: optionIndex },
        visited: { ...prev.visited, [questionId]: true },
      };
      mockTestService.saveActiveSession(updated);
      return updated;
    });
  }, []);

  // Clear response
  const clearAnswer = useCallback((questionId: string) => {
    setActiveSession((prev) => {
      if (!prev) return null;
      const newAnswers = { ...prev.answers };
      delete newAnswers[questionId];
      const updated: ActiveTestSession = {
        ...prev,
        answers: newAnswers,
      };
      mockTestService.saveActiveSession(updated);
      return updated;
    });
  }, []);

  // Toggle Mark for Review
  const toggleMarkForReview = useCallback((questionId: string) => {
    setActiveSession((prev) => {
      if (!prev) return null;
      const current = prev.markedForReview[questionId];
      const updated: ActiveTestSession = {
        ...prev,
        markedForReview: { ...prev.markedForReview, [questionId]: !current },
        visited: { ...prev.visited, [questionId]: true },
      };
      mockTestService.saveActiveSession(updated);
      return updated;
    });
  }, []);

  // Question navigation
  const navigateToQuestion = useCallback((index: number) => {
    setActiveSession((prev) => {
      if (!prev || index < 0 || index >= prev.questions.length) return prev;
      const qId = prev.questions[index].id;
      const updated: ActiveTestSession = {
        ...prev,
        currentIndex: index,
        visited: { ...prev.visited, [qId]: true },
      };
      mockTestService.saveActiveSession(updated);
      return updated;
    });
  }, []);

  // Submit test
  const handleSubmit = useCallback(async (sessionToSubmit?: ActiveTestSession) => {
    const session = sessionToSubmit || activeSession;
    if (!session || isSubmitting) return;

    try {
      setIsSubmitting(true);
      if (timerRef.current) clearInterval(timerRef.current);
      const res = await mockTestService.submitTest(session);
      setTestResult(res);
      setActiveSession(null);
      const updatedStats = await mockTestService.getAnalytics();
      setAnalytics(updatedStats);
    } catch (e) {
      console.error('[useMockTests] Error submitting mock test:', e);
    } finally {
      setIsSubmitting(false);
    }
  }, [activeSession, isSubmitting]);

  // Cancel / abandon test
  const abandonTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    mockTestService.clearActiveSession();
    setActiveSession(null);
  }, []);

  // Compute question palette status
  const getQuestionStatus = useCallback((qId: string): QuestionPaletteStatus => {
    if (!activeSession) return 'not_visited';
    const isAnswered = activeSession.answers[qId] !== undefined;
    const isMarked = Boolean(activeSession.markedForReview[qId]);
    const isVisited = Boolean(activeSession.visited[qId]);

    if (isAnswered && isMarked) return 'answered_and_marked';
    if (isMarked) return 'marked_for_review';
    if (isAnswered) return 'answered';
    if (isVisited) return 'not_answered';
    return 'not_visited';
  }, [activeSession]);

  return {
    predefinedMockTests,
    activeSession,
    remainingSeconds,
    testResult,
    analytics,
    loading,
    isSubmitting,
    startTest,
    selectAnswer,
    clearAnswer,
    toggleMarkForReview,
    navigateToQuestion,
    submitTest: handleSubmit,
    abandonTest,
    getQuestionStatus,
    setTestResult,
    refreshAnalytics: loadInitialData,
  };
};
