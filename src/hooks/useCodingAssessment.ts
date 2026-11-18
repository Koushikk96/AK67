import { useState, useCallback } from 'react';
import { DSAProblem } from '@/types/dsa';
import { CodingAssistanceLevel } from '@/types/database';
import { dsaProblems } from '@/content/dsa';
import { problemRepository } from '@/db/repositories/problemRepository';
import { studySessionRepository } from '@/db/repositories/studySessionRepository';

export interface ActiveCodingSprint {
  problem: DSAProblem;
  durationMinutes: number;
  startTimestamp: number;
  status: 'solving' | 'submitted';
  assistanceLevel?: CodingAssistanceLevel;
  selfReportedMinutes?: number;
  userNotes?: string;
}

export const useCodingAssessment = () => {
  const [activeSprint, setActiveSprint] = useState<ActiveCodingSprint | null>(null);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);

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

    setActiveSprint({
      problem: target,
      durationMinutes,
      startTimestamp: Date.now(),
      status: 'solving',
    });
    setRevealedHints(0);
    setShowSolution(false);
  }, []);

  const revealNextHint = useCallback(() => {
    setRevealedHints((prev) => Math.min(3, prev + 1));
  }, []);

  const toggleSolution = useCallback(() => {
    setShowSolution((prev) => !prev);
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

      setActiveSprint((prev) =>
        prev
          ? {
              ...prev,
              status: 'submitted',
              assistanceLevel,
              selfReportedMinutes,
              userNotes: notes,
            }
          : null
      );
      setShowSolution(true);
    },
    [activeSprint]
  );

  const exitSprint = useCallback(() => {
    setActiveSprint(null);
    setRevealedHints(0);
    setShowSolution(false);
  }, []);

  return {
    activeSprint,
    revealedHints,
    showSolution,
    allProblems: dsaProblems,
    startSprint,
    revealNextHint,
    toggleSolution,
    submitAttempt,
    exitSprint,
  };
};
