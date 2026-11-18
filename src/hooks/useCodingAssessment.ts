import { useState, useCallback, useEffect, useRef } from 'react';
import { DSAProblem } from '@/types/dsa';
import { CodingAssistanceLevel } from '@/types/database';
import { dsaProblems } from '@/content/dsa';
import { problemRepository } from '@/db/repositories/problemRepository';
import { studySessionRepository } from '@/db/repositories/studySessionRepository';
import {
  ACTIVE_CODING_STORAGE_KEY,
  setAssessmentActiveInMemory,
} from '@/utils/pwaUtils';

export interface ActiveCodingSprint {
  problem: DSAProblem;
  durationMinutes: number;
  startTimestamp: number;
  endTime: number;
  status: 'solving' | 'submitted';
  revealedHints: number;
  showSolution: boolean;
  assistanceLevel?: CodingAssistanceLevel;
  selfReportedMinutes?: number;
  userNotes?: string;
}

// Memory fallback for Node.js test environments
let memorySprint: string | null = null;

const getSavedSprint = (): ActiveCodingSprint | null => {
  try {
    const raw =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem(ACTIVE_CODING_STORAGE_KEY)
        : memorySprint;
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore storage parsing errors
  }
  return null;
};

const saveSprint = (sprint: ActiveCodingSprint | null) => {
  try {
    if (sprint) {
      const json = JSON.stringify(sprint);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(ACTIVE_CODING_STORAGE_KEY, json);
      }
      memorySprint = json;
    } else {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(ACTIVE_CODING_STORAGE_KEY);
      }
      memorySprint = null;
    }
  } catch {
    // Ignore storage errors
  }
};

export const useCodingAssessment = () => {
  const [activeSprint, setActiveSprint] = useState<ActiveCodingSprint | null>(() => {
    const saved = getSavedSprint();
    if (saved && saved.status === 'solving') {
      return saved;
    }
    return null;
  });

  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    const saved = getSavedSprint();
    if (saved && saved.status === 'solving' && saved.endTime) {
      return Math.max(0, Math.floor((saved.endTime - Date.now()) / 1000));
    }
    return 0;
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync in-memory assessment flag with active sprint status
  useEffect(() => {
    if (activeSprint && activeSprint.status === 'solving') {
      setAssessmentActiveInMemory(true);
    } else {
      setAssessmentActiveInMemory(false);
    }
  }, [activeSprint]);

  // Wall-clock resilient countdown timer
  useEffect(() => {
    if (!activeSprint || activeSprint.status !== 'solving') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.floor((activeSprint.endTime - Date.now()) / 1000)
      );
      setRemainingSeconds(remaining);
    };

    updateTimer();
    timerRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSprint]);

  // Start a timed coding sprint on a selected or random DSA problem
  const startSprint = useCallback((problemId?: string, durationMinutes: number = 30) => {
    let target = dsaProblems[0];
    if (problemId) {
      const found = dsaProblems.find((p) => p.id === problemId);
      if (found) target = found;
    } else {
      const randomIndex = Math.floor(Math.random() * dsaProblems.length);
      target = dsaProblems[randomIndex];
    }

    const now = Date.now();
    const sprint: ActiveCodingSprint = {
      problem: target,
      durationMinutes,
      startTimestamp: now,
      endTime: now + durationMinutes * 60 * 1000,
      status: 'solving',
      revealedHints: 0,
      showSolution: false,
    };

    saveSprint(sprint);
    setActiveSprint(sprint);
    setRemainingSeconds(durationMinutes * 60);
    setAssessmentActiveInMemory(true);
  }, []);

  const revealNextHint = useCallback(() => {
    setActiveSprint((prev) => {
      if (!prev) return null;
      const updated: ActiveCodingSprint = {
        ...prev,
        revealedHints: Math.min(3, prev.revealedHints + 1),
      };
      saveSprint(updated);
      return updated;
    });
  }, []);

  const toggleSolution = useCallback(() => {
    setActiveSprint((prev) => {
      if (!prev) return null;
      const updated: ActiveCodingSprint = {
        ...prev,
        showSolution: !prev.showSolution,
      };
      saveSprint(updated);
      return updated;
    });
  }, []);

  // Submit coding attempt with self-reflection
  const submitAttempt = useCallback(
    async (
      assistanceLevel: CodingAssistanceLevel,
      selfReportedMinutes: number,
      notes?: string
    ) => {
      if (!activeSprint) return;

      const p = activeSprint.problem;
      const now = new Date().toISOString();
      const today = now.split('T')[0];

      // Update problem status in problem_progress
      const existing = await problemRepository.getById(p.id);
      const isSolved = assistanceLevel === 'independent' || assistanceLevel === 'hints';

      await problemRepository.updateStatus(
        p.id,
        isSolved ? 'solved' : 'attempted',
        notes || existing?.personalNotes
      );

      // Log study session in study_sessions
      await studySessionRepository.logSession(
        selfReportedMinutes,
        `Coding Sprint: #${p.number} ${p.title} (${assistanceLevel})`,
        'coding_assessment',
        today
      );

      const submittedSprint: ActiveCodingSprint = {
        ...activeSprint,
        status: 'submitted',
        showSolution: true,
        assistanceLevel,
        selfReportedMinutes,
        userNotes: notes,
      };

      saveSprint(submittedSprint);
      setActiveSprint(submittedSprint);
      setAssessmentActiveInMemory(false);
    },
    [activeSprint]
  );

  const exitSprint = useCallback(() => {
    saveSprint(null);
    setActiveSprint(null);
    setRemainingSeconds(0);
    setAssessmentActiveInMemory(false);
  }, []);

  return {
    activeSprint,
    remainingSeconds,
    revealedHints: activeSprint?.revealedHints || 0,
    showSolution: activeSprint?.showSolution || false,
    allProblems: dsaProblems,
    startSprint,
    revealNextHint,
    toggleSolution,
    submitAttempt,
    exitSprint,
  };
};
