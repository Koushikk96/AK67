import React, { useState, useEffect } from 'react';
import { MasteryTopicWithProgress } from '@/types/mastery';
import { TopicStatus } from '@/types/database';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  X,
  Bookmark,
  CheckCircle2,
  Copy,
  Check,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  FileEdit,
  Code2,
  BookOpen,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  Calendar,
  Layers,
} from 'lucide-react';

interface TopicDetailModalProps {
  topic: MasteryTopicWithProgress;
  onClose: () => void;
  onUpdateStatus: (id: string, status: TopicStatus) => Promise<void>;
  onToggleBookmark: (id: string) => Promise<void>;
  onToggleCheckpoint: (id: string, checkpointId: string, total: number) => Promise<void>;
  onSaveNotes: (id: string, notes: string) => Promise<void>;
  onScheduleRevision?: (id: string, days: number) => Promise<void>;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  onUpdateStatus,
  onToggleBookmark,
  onToggleCheckpoint,
  onSaveNotes,
  onScheduleRevision,
}) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'quiz' | 'notes'>('learn');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [personalNotes, setPersonalNotes] = useState(topic.progress?.notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSavedNotice, setNotesSavedNotice] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const currentStatus: TopicStatus = topic.progress?.status || 'not_started';
  const isBookmarked = topic.progress?.bookmarked || false;
  const completedCheckpoints = topic.progress?.completedCheckpoints || [];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const toggleSolution = (exerciseId: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    await onSaveNotes(topic.id, personalNotes);
    setIsSavingNotes(false);
    setNotesSavedNotice(true);
    setTimeout(() => setNotesSavedNotice(false), 2000);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
    }
  };

  const getDifficultyBadge = (level: string) => {
    switch (level) {
      case 'Beginner':
        return <Badge variant="easy">Beginner</Badge>;
      case 'Intermediate':
        return <Badge variant="attempted">Intermediate</Badge>;
      case 'Advanced':
        return <Badge variant="urgent">Advanced</Badge>;
      default:
        return <Badge>{level}</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mastery-topic-title"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
              #{topic.topicNumber}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Module {topic.moduleNumber}: {topic.moduleTitle}
                </span>
                {getDifficultyBadge(topic.level)}
              </div>
              <h2 id="mastery-topic-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                {topic.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(topic.id)}
              className={`p-2 rounded-lg transition-colors border ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Topic'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Status Selector */}
            <select
              value={currentStatus}
              onChange={(e) => onUpdateStatus(topic.id, e.target.value as TopicStatus)}
              className="text-xs sm:text-sm font-medium py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="not_started">⚪ Not Started</option>
              <option value="learning">🟡 In Progress</option>
              <option value="completed">🟢 Completed</option>
              <option value="revise">🟣 Mark for Revision</option>
            </select>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/40 dark:bg-slate-800/20">
          <button
            onClick={() => setActiveTab('learn')}
            className={`py-3 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'learn'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Learn & Code
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`py-3 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'practice'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Practice Exercises ({topic.practiceExercises.length})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-3 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'quiz'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Quiz ({topic.quizQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'notes'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            Notes & Revision
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'learn' && (
            <div className="space-y-6">
              {/* Why It Matters */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Why It Matters
                  </h4>
                  <p className="text-sm text-emerald-950 dark:text-emerald-100 mt-1 leading-relaxed">
                    {topic.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Core Explanation */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Conceptual Overview
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {topic.explanation}
                </p>
              </div>

              {/* Syntax & Structure */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Syntax & Structure
                  </h3>
                  <button
                    onClick={() => copyToClipboard(topic.syntaxAndStructure, 999)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    {copiedIndex === 999 ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedIndex === 999 ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="relative rounded-lg bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto border border-slate-800">
                  <pre>{topic.syntaxAndStructure}</pre>
                </div>
              </div>

              {/* Code Examples */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Practical Code Examples
                </h3>
                {topic.codeExamples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-900/50"
                  >
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {ex.title}
                      </span>
                      <button
                        onClick={() => copyToClipboard(ex.code, idx)}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        {copiedIndex === idx ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    <div className="p-4 bg-slate-950 font-mono text-xs text-slate-100 overflow-x-auto">
                      <pre>{ex.code}</pre>
                    </div>

                    <div className="p-3 bg-slate-100/80 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Expected Output:
                      </span>
                      <pre className="mt-1 font-mono text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-950/60 p-2 rounded border border-slate-200 dark:border-slate-800">
                        {ex.expectedOutput}
                      </pre>
                      <p className="mt-2 text-slate-600 dark:text-slate-400 italic">
                        💡 {ex.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real World, Common Mistakes, Interview Relevance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-500" /> Real-World Applications
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
                    {topic.realWorldApplications.map((app, i) => (
                      <li key={i}>{app}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-950/50 bg-rose-50/40 dark:bg-rose-950/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-500" /> Common Mistakes
                  </h4>
                  <ul className="text-xs text-rose-900 dark:text-rose-200 space-y-1.5 list-disc list-inside">
                    {topic.commonMistakes.map((mistake, i) => (
                      <li key={i}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interview Relevance */}
              <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-950/60 bg-indigo-50/40 dark:bg-indigo-950/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 mb-1">
                  🎯 Interview Relevance & Recruiter Angle
                </h4>
                <p className="text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed">
                  {topic.interviewRelevance}
                </p>
              </div>

              {/* Interactive Checkpoints */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Topic Mastery Checkpoints
                </h4>
                <div className="space-y-2">
                  {topic.checkpoints.map((cp) => {
                    const isDone = completedCheckpoints.includes(cp.id);
                    return (
                      <button
                        key={cp.id}
                        onClick={() =>
                          onToggleCheckpoint(topic.id, cp.id, topic.checkpoints.length)
                        }
                        className={`w-full flex items-center gap-3 p-2.5 rounded-lg border text-left transition-all ${
                          isDone
                            ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                            : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {isDone ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span className="text-xs leading-normal">{cp.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-6">
              <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>
                  <strong>Active Recall Mode:</strong> Practice solving the challenge mentally or in your editor before revealing the solution!
                </span>
              </div>

              {topic.practiceExercises.map((ex, idx) => {
                const isRevealed = revealedSolutions[ex.id] || false;
                return (
                  <div
                    key={ex.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
                  >
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-300">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {ex.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDifficultyBadge(ex.difficulty)}
                        <Badge variant="outline">{ex.type}</Badge>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Problem Prompt:
                        </span>
                        <p className="text-xs text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">
                          {ex.prompt}
                        </p>
                      </div>

                      {ex.starterCode && (
                        <div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Starter Code:
                          </span>
                          <div className="mt-1 p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-100 overflow-x-auto">
                            <pre>{ex.starterCode}</pre>
                          </div>
                        </div>
                      )}

                      {/* Attempt-first concealed solution button */}
                      <div className="pt-2">
                        <Button
                          variant={isRevealed ? 'outline' : 'primary'}
                          size="sm"
                          onClick={() => toggleSolution(ex.id)}
                          className="flex items-center gap-1.5"
                        >
                          {isRevealed ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" /> Conceal Solution
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" /> Attempted? Reveal Solution
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Solution Block */}
                      {isRevealed && (
                        <div className="mt-3 p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2 animate-fadeIn">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                              Verified {topic.language === 'java' ? 'Java' : 'Python'} Solution
                            </span>
                            <button
                              onClick={() => copyToClipboard(ex.solution, 1000 + idx)}
                              className="flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 hover:underline"
                            >
                              {copiedIndex === 1000 + idx ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                              {copiedIndex === 1000 + idx ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-100 overflow-x-auto">
                            <pre>{ex.solution}</pre>
                          </div>
                          <p className="text-xs text-emerald-950 dark:text-emerald-200 italic pt-1">
                            💡 {ex.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-200">
                Test your conceptual clarity with these multiple-choice placement check questions.
              </div>

              {topic.quizQuestions.map((q, qIdx) => {
                const selected = quizAnswers[q.id];
                const hasAnswered = selected !== undefined;
                const isCorrect = selected === q.correctOptionIndex;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-sm"
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                        Q{qIdx + 1}.
                      </span>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-normal">
                        {q.question}
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      {q.options.map((option, optIdx) => {
                        let btnStyle =
                          'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';

                        if (hasAnswered) {
                          if (optIdx === q.correctOptionIndex) {
                            btnStyle =
                              'border-emerald-500 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-100 font-semibold';
                          } else if (selected === optIdx) {
                            btnStyle =
                              'border-rose-500 bg-rose-100 dark:bg-rose-950/70 text-rose-900 dark:text-rose-100 font-semibold';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(q.id, optIdx)}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{option}</span>
                            {hasAnswered && optIdx === q.correctOptionIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {hasAnswered && (
                      <div
                        className={`p-3 rounded-lg text-xs leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-900'
                            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-900'
                        }`}
                      >
                        <strong>{isCorrect ? '✓ Correct!' : '✗ Not quite.'}</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* Revision Notes List */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                  📌 Key Revision Takeaways
                </h4>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                  {topic.revisionNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>

              {/* Spaced Repetition Scheduling */}
              {onScheduleRevision && (
                <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Schedule Spaced Repetition Revision
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                    Add this topic to your revision queue after a set interval:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[1, 3, 7, 14, 30].map((days) => (
                      <Button
                        key={days}
                        size="sm"
                        variant="outline"
                        onClick={() => onScheduleRevision(topic.id, days)}
                        className="text-xs"
                      >
                        +{days} {days === 1 ? 'day' : 'days'}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Personal Notes Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Personal Notes & Code Observations
                  </label>
                  {notesSavedNotice && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Notes saved!
                    </span>
                  )}
                </div>
                <textarea
                  value={personalNotes}
                  onChange={(e) => setPersonalNotes(e.target.value)}
                  placeholder="Record your personal notes, edge case observations, or interview thoughts..."
                  rows={6}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed font-sans"
                />
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  {isSavingNotes ? 'Saving...' : 'Save Notes'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
