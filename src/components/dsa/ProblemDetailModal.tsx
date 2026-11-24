import React, { useState, useEffect } from 'react';
import { DSAProblemWithProgress, DSALanguage } from '@/types/dsa';
import { ProblemStatus } from '@/types/database';
import { settingsRepository } from '@/db/repositories/settingsRepository';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  X,
  Bookmark,
  CheckCircle2,
  Clock,
  Code2,
  Lightbulb,
  Copy,
  Check,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  FileEdit,
  Cpu,
  Layers,
} from 'lucide-react';

interface ProblemDetailModalProps {
  problem: DSAProblemWithProgress;
  onClose: () => void;
  onUpdateStatus: (id: string, status: ProblemStatus) => Promise<void>;
  onToggleBookmark: (id: string) => Promise<void>;
  onSaveNotes: (id: string, notes: string) => Promise<void>;
  onCompleteRevision?: (id: string, rating: 'easy' | 'good' | 'hard') => Promise<void>;
}

export const ProblemDetailModal: React.FC<ProblemDetailModalProps> = ({
  problem,
  onClose,
  onUpdateStatus,
  onToggleBookmark,
  onSaveNotes,
  onCompleteRevision,
}) => {
  const currentStatus: ProblemStatus = problem.progress?.status || 'not_started';
  const isBookmarked = problem.progress?.bookmarked || false;

  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [personalNotes, setPersonalNotes] = useState(problem.progress?.personalNotes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSavedNotice, setNotesSavedNotice] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState<DSALanguage>(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('ak67_preferred_dsa_language') as DSALanguage;
        if (saved === 'cpp' || saved === 'python' || saved === 'java') {
          return saved;
        }
      }
    } catch {
      // Ignore storage errors
    }
    return 'cpp';
  });

  useEffect(() => {
    let isMounted = true;
    settingsRepository
      .get<DSALanguage>('preferred_dsa_language')
      .then((saved) => {
        if (isMounted && saved && (saved === 'cpp' || saved === 'python' || saved === 'java')) {
          setSelectedLanguage(saved);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLanguageChange = (lang: DSALanguage) => {
    setSelectedLanguage(lang);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('ak67_preferred_dsa_language', lang);
      }
    } catch {
      // Ignore storage errors
    }
    settingsRepository.set('preferred_dsa_language', lang).catch(() => {});
  };

  const activeSolution =
    selectedLanguage === 'python'
      ? problem.pythonSolution
      : selectedLanguage === 'java'
      ? problem.javaSolution
      : problem.cppSolution;

  const languageLabel =
    selectedLanguage === 'python'
      ? 'Python'
      : selectedLanguage === 'java'
      ? 'Java'
      : 'C++';

  const toggleHint = (idx: number) => {
    setRevealedHints((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleNotesBlur = async () => {
    if (personalNotes !== (problem.progress?.personalNotes || '')) {
      setIsSavingNotes(true);
      await onSaveNotes(problem.id, personalNotes);
      setIsSavingNotes(false);
      setNotesSavedNotice(true);
      setTimeout(() => setNotesSavedNotice(false), 2000);
    }
  };

  const copySolutionCode = async () => {
    try {
      await navigator.clipboard.writeText(activeSolution);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const difficultyVariant =
    problem.difficulty === 'Easy'
      ? 'easy'
      : problem.difficulty === 'Medium'
      ? 'attempted'
      : 'urgent';

  const isRevisionDue =
    problem.progress?.nextRevisionDate &&
    problem.progress.nextRevisionDate <= new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl border border-zinc-750 bg-[#121215] text-zinc-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Sticky Header */}
        <div className="flex items-center justify-between border-b border-zinc-850 bg-[#0d0d10] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-600/20 font-mono text-xs font-bold text-blue-400 border border-blue-500/30">
              #{problem.number}
            </span>
            <div className="overflow-hidden">
              <h2 className="truncate text-base font-bold text-white sm:text-lg">
                {problem.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>{problem.category}</span>
                <span>•</span>
                <Badge variant={difficultyVariant} className="text-[10px] px-1.5 py-0">
                  {problem.difficulty}
                </Badge>
                <span>•</span>
                <span className="text-zinc-500 font-mono">{problem.pattern}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleBookmark(problem.id)}
              className="h-8 w-8 text-zinc-400 hover:text-amber-400"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark problem'}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Status Bar & Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/60 p-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">Your Status:</span>
              <div className="flex rounded-md border border-zinc-800 p-0.5 bg-zinc-900/80">
                {(['not_started', 'attempted', 'solved', 'revise'] as ProblemStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => onUpdateStatus(problem.id, st)}
                    className={`rounded px-2.5 py-1 text-xs font-medium transition ${
                      currentStatus === st
                        ? st === 'solved'
                          ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                          : st === 'attempted'
                          ? 'bg-amber-500/20 text-amber-400 font-semibold'
                          : st === 'revise'
                          ? 'bg-purple-500/20 text-purple-400 font-semibold'
                          : 'bg-zinc-800 text-zinc-200'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {st === 'not_started'
                      ? 'Unsolved'
                      : st === 'attempted'
                      ? 'Attempted'
                      : st === 'solved'
                      ? 'Solved'
                      : 'Revise'}
                  </button>
                ))}
              </div>
            </div>

            {/* Revision scheduling status */}
            {problem.progress?.nextRevisionDate && (
              <div className="flex items-center gap-2 text-xs">
                <Clock className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-zinc-400">Next Revision:</span>
                <span className={`font-medium ${isRevisionDue ? 'text-rose-400 font-semibold' : 'text-purple-300'}`}>
                  {problem.progress.nextRevisionDate} {isRevisionDue ? '(Due Today!)' : ''}
                </span>
                {onCompleteRevision && isRevisionDue && (
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => onCompleteRevision(problem.id, 'easy')}
                      className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] hover:bg-emerald-500/20"
                    >
                      Easy
                    </button>
                    <button
                      onClick={() => onCompleteRevision(problem.id, 'good')}
                      className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] hover:bg-blue-500/20"
                    >
                      Good
                    </button>
                    <button
                      onClick={() => onCompleteRevision(problem.id, 'hard')}
                      className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[10px] hover:bg-rose-500/20"
                    >
                      Hard
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Problem Description
            </h3>
            <p className="text-sm text-zinc-200 leading-relaxed font-sans">
              {problem.description}
            </p>
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Examples
            </h3>
            <div className="space-y-2">
              {problem.examples.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 font-mono text-xs space-y-1"
                >
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">Input: </span>
                    {ex.input}
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">Output: </span>
                    {ex.output}
                  </p>
                  {ex.explanation && (
                    <p className="text-zinc-400 font-sans text-xs pt-1">
                      <span className="text-zinc-500">Explanation: </span>
                      {ex.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Constraints & Complexity Chips */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-3.5 space-y-2">
              <h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-blue-400" />
                <span>Constraints</span>
              </h4>
              <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1 font-mono">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-3.5 space-y-2">
              <h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-emerald-400" />
                <span>Complexity Target</span>
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Time Complexity:</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {problem.timeComplexity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Space Complexity:</span>
                  <span className="font-mono font-semibold text-cyan-400">
                    {problem.spaceComplexity}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-zinc-850">
                  <span className="text-zinc-400">Core Pattern:</span>
                  <span className="font-medium text-zinc-200">{problem.pattern}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progressive 3-Tier Hints Drawer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
                <span>Progressive Hints (Reveal as Needed)</span>
              </h3>
            </div>
            <div className="space-y-2">
              {problem.hints.map((hint, idx) => {
                const isRevealed = revealedHints.includes(idx);
                return (
                  <div
                    key={idx}
                    className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleHint(idx)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left text-zinc-300 hover:bg-zinc-900/60"
                    >
                      <span className="font-medium text-zinc-200">
                        Hint {idx + 1}: {idx === 0 ? 'Conceptual Direction' : idx === 1 ? 'Data Structure Choice' : 'Edge Cases & Algorithm'}
                      </span>
                      <span className="text-[11px] text-blue-400 hover:underline">
                        {isRevealed ? 'Hide' : 'Reveal'}
                      </span>
                    </button>
                    {isRevealed && (
                      <div className="border-t border-zinc-800/60 px-3.5 py-2.5 text-xs text-zinc-300 bg-zinc-900/30 leading-relaxed animate-in fade-in">
                        {hint}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verified Reference Solution with Multi-Language Selector */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-blue-400" />
                  <span>Verified Reference Solution</span>
                </h3>

                {/* Language Switcher Tabs */}
                <div
                  className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950 p-0.5"
                  role="tablist"
                  aria-label="Solution Language Selector"
                >
                  {(['cpp', 'python', 'java'] as const).map((lang) => {
                    const label = lang === 'cpp' ? 'C++' : lang === 'python' ? 'Python' : 'Java';
                    const isSelected = selectedLanguage === lang;
                    return (
                      <button
                        key={lang}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => handleLanguageChange(lang)}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={copySolutionCode}
                className="h-7 text-xs gap-1.5 border-zinc-700 bg-zinc-900"
              >
                {codeCopied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy {languageLabel} Code</span>
                  </>
                )}
              </Button>
            </div>

            <div className="relative rounded-lg border border-zinc-800 bg-[#09090b] p-4 overflow-x-auto">
              <pre className="font-mono text-xs text-zinc-300 leading-relaxed selection:bg-blue-600/30">
                <code>{activeSolution}</code>
              </pre>
            </div>
          </div>

          {/* Edge Cases & Common Mistakes Callouts */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5 space-y-1.5">
              <h4 className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                <span>Critical Edge Cases to Test</span>
              </h4>
              <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1">
                {problem.edgeCases.map((ec, i) => (
                  <li key={i}>{ec}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3.5 space-y-1.5">
              <h4 className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-rose-400" />
                <span>Common Candidate Pitfalls</span>
              </h4>
              <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1">
                {problem.commonMistakes.map((cm, i) => (
                  <li key={i}>{cm}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interviewer Explanation Guide */}
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 space-y-1.5">
            <h4 className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>How to Walk Through This in an Interview</span>
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {problem.interviewExplanation}
            </p>
          </div>

          {/* Personal Notes Editor */}
          <div className="space-y-2 border-t border-zinc-800 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileEdit className="h-3.5 w-3.5 text-emerald-400" />
                <span>Personal Observations & Code Notes (IndexedDB Saved)</span>
              </h3>
              <div className="flex items-center gap-2">
                {isSavingNotes && (
                  <span className="text-[11px] text-zinc-400 animate-pulse">Saving...</span>
                )}
                {notesSavedNotice && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Auto-saved to device
                  </span>
                )}
              </div>
            </div>
            <textarea
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Record edge case epiphanies, custom variations, or personal reminders here. Auto-saved locally on blur..."
              rows={3}
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-200 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="flex items-center justify-between border-t border-zinc-850 bg-[#0d0d10] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">
              {currentStatus === 'solved' ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Solved
                </span>
              ) : (
                'Unsolved'
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant={currentStatus === 'solved' ? 'outline' : 'primary'}
              size="sm"
              onClick={() =>
                onUpdateStatus(problem.id, currentStatus === 'solved' ? 'attempted' : 'solved')
              }
            >
              {currentStatus === 'solved' ? 'Mark as Attempted' : 'Mark as Solved'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
