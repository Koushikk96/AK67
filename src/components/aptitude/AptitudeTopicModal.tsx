import React, { useState, useEffect } from 'react';
import { AptitudeTopicWithProgress } from '@/types/aptitude';
import { TopicStatus } from '@/types/database';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  X,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  HelpCircle,
  FileEdit,
  Zap,
  Check,
  RotateCcw,
} from 'lucide-react';

interface AptitudeTopicModalProps {
  topic: AptitudeTopicWithProgress;
  onClose: () => void;
  onUpdateStatus: (id: string, status: TopicStatus) => Promise<void>;
  onToggleBookmark: (id: string) => Promise<boolean>;
  onSaveNotes: (id: string, notes: string) => Promise<void>;
}

export const AptitudeTopicModal: React.FC<AptitudeTopicModalProps> = ({
  topic,
  onClose,
  onUpdateStatus,
  onToggleBookmark,
  onSaveNotes,
}) => {
  const currentStatus: TopicStatus =
    topic.progress?.status || (topic.progress?.isMastered ? 'completed' : 'not_started');
  const isBookmarked = topic.progress?.completedCheckpoints?.includes('bookmark') || false;

  const [activeTab, setActiveTab] = useState<'study' | 'examples' | 'practice' | 'notes'>('study');
  const [personalNotes, setPersonalNotes] = useState(topic.progress?.notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSavedNotice, setNotesSavedNotice] = useState(false);

  // Practice state: map questionId -> selectedOptionIndex
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleNotesBlur = async () => {
    if (personalNotes !== (topic.progress?.notes || '')) {
      setIsSavingNotes(true);
      await onSaveNotes(topic.id, personalNotes);
      setIsSavingNotes(false);
      setNotesSavedNotice(true);
      setTimeout(() => setNotesSavedNotice(false), 2000);
    }
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const resetPractice = () => {
    setSelectedAnswers({});
  };

  // Practice score calculation
  const totalQuestions = topic.practiceQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = topic.practiceQuestions.filter(
    (q) => selectedAnswers[q.id] === q.correctOptionIndex
  ).length;

  const categoryLabel =
    topic.category === 'quantitative'
      ? 'Quantitative Aptitude'
      : topic.category === 'logical'
      ? 'Logical Reasoning'
      : 'Verbal Ability';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="aptitude-topic-title"
        className="relative flex flex-col w-full max-w-4xl max-h-[92vh] bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col gap-2 p-5 border-b border-zinc-800 bg-zinc-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
                {categoryLabel}
              </Badge>
              <span className="text-xs font-mono text-zinc-500">#{topic.number}</span>
              <Badge
                variant={
                  currentStatus === 'completed'
                    ? 'solved'
                    : currentStatus === 'learning'
                    ? 'attempted'
                    : currentStatus === 'revise'
                    ? 'revise'
                    : 'default'
                }
              >
                {currentStatus === 'completed'
                  ? 'Completed'
                  : currentStatus === 'learning'
                  ? 'Learning'
                  : currentStatus === 'revise'
                  ? 'Revise'
                  : 'Not Started'}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleBookmark(topic.id)}
                className={`h-8 px-2.5 ${
                  isBookmarked
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 mr-1.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">{topic.title}</h2>

          {/* Quick status selector */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs text-zinc-400 mr-1">Status:</span>
            {(['not_started', 'learning', 'completed', 'revise'] as TopicStatus[]).map((st) => (
              <button
                key={st}
                onClick={() => onUpdateStatus(topic.id, st)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  currentStatus === st
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
              >
                {st === 'not_started'
                  ? 'Not Started'
                  : st === 'learning'
                  ? 'Learning'
                  : st === 'completed'
                  ? 'Completed'
                  : 'Needs Revision'}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center border-b border-zinc-800 bg-zinc-900/20 px-5 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('study')}
            className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'study'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Theory & Formulas
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'examples'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Solved Examples ({topic.solvedExamples.length})
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'practice'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Practice Questions ({topic.practiceQuestions.length})
            {answeredCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-zinc-800 text-zinc-300">
                {correctCount}/{answeredCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'notes'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" />
            My Notes {personalNotes ? '•' : ''}
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* TAB 1: THEORY & FORMULAS */}
          {activeTab === 'study' && (
            <div className="space-y-6">
              {/* Concept Explanation */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Concept & Methodology
                </h3>
                <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                  {topic.explanation}
                </div>
              </div>

              {/* Core Formulas & Rules */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Core Formulas & Standard Rules
                  </h3>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {topic.formulas.map((formula, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 font-mono text-xs text-blue-300 flex items-start gap-2"
                    >
                      <span className="text-zinc-600 select-none">•</span>
                      <span>{formula}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speed Shortcuts */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Placement Speed Shortcuts
                  </h3>
                </div>
                <div className="space-y-2">
                  {topic.shortcuts.map((sc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-emerald-200 text-xs flex items-start gap-2.5"
                    >
                      <span className="text-emerald-400 font-bold select-none">⚡</span>
                      <span className="leading-relaxed">{sc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Pitfalls & Traps */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Common Traps to Avoid in OA
                  </h3>
                </div>
                <div className="space-y-2">
                  {topic.commonMistakes.map((mistake, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-rose-200 text-xs flex items-start gap-2.5"
                    >
                      <span className="text-rose-400 font-bold select-none">⚠</span>
                      <span className="leading-relaxed">{mistake}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SOLVED EXAMPLES */}
          {activeTab === 'examples' && (
            <div className="space-y-5">
              <p className="text-xs text-zinc-400">
                Worked step-by-step solutions demonstrating optimal calculation techniques for campus drives.
              </p>
              {topic.solvedExamples.map((ex, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs">
                      {idx + 1}
                    </span>
                    <p className="text-sm font-semibold text-zinc-200">{ex.question}</p>
                  </div>
                  <div className="ml-7 p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-line">
                    {ex.solution}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PRACTICE QUESTIONS */}
          {activeTab === 'practice' && (
            <div className="space-y-6">
              {/* Score header */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="text-xs text-zinc-400">
                    Questions Attempted:{' '}
                    <span className="font-semibold text-white">
                      {answeredCount} / {totalQuestions}
                    </span>
                  </div>
                  {answeredCount > 0 && (
                    <div className="text-xs text-zinc-400">
                      Accuracy:{' '}
                      <span className="font-semibold text-emerald-400">
                        {Math.round((correctCount / answeredCount) * 100)}% ({correctCount} correct)
                      </span>
                    </div>
                  )}
                </div>
                {answeredCount > 0 && (
                  <Button variant="outline" size="sm" onClick={resetPractice} className="h-7 text-xs">
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Reset
                  </Button>
                )}
              </div>

              {/* Questions List */}
              {topic.practiceQuestions.map((q, qIdx) => {
                const userSelected = selectedAnswers[q.id];
                const isAnswered = userSelected !== undefined;
                const isCorrect = userSelected === q.correctOptionIndex;

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span className="text-xs font-mono text-zinc-500 mt-0.5">Q{qIdx + 1}.</span>
                        <p className="text-sm font-medium text-zinc-100">{q.question}</p>
                      </div>
                      <Badge
                        variant={
                          q.difficulty === 'Easy'
                            ? 'easy'
                            : q.difficulty === 'Medium'
                            ? 'attempted'
                            : 'urgent'
                        }
                        className="text-[10px]"
                      >
                        {q.difficulty}
                      </Badge>
                    </div>

                    {/* Options */}
                    <div className="grid gap-2 sm:grid-cols-2 ml-5">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userSelected === optIdx;
                        const isThisCorrect = optIdx === q.correctOptionIndex;

                        let btnStyle =
                          'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white';

                        if (isAnswered) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-semibold';
                          } else if (isChosen && !isCorrect) {
                            btnStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-300';
                          } else {
                            btnStyle = 'bg-zinc-950 border-zinc-800/60 text-zinc-500 opacity-60';
                          }
                        }

                        const optionLetters = ['A', 'B', 'C', 'D'];

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                          >
                            <span className="font-mono font-bold text-zinc-500">
                              {optionLetters[optIdx]}.
                            </span>
                            <span className="flex-1">{opt}</span>
                            {isAnswered && isThisCorrect && (
                              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            )}
                            {isAnswered && isChosen && !isCorrect && (
                              <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation Reveal */}
                    {isAnswered && (
                      <div className="ml-5 p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs space-y-1.5 animate-in fade-in duration-150">
                        <div className="flex items-center gap-1.5 font-semibold text-zinc-300">
                          {isCorrect ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct!
                            </span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> Incorrect
                            </span>
                          )}
                          <span className="text-zinc-500">•</span>
                          <span className="text-zinc-400">Step-by-step Solution:</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed font-mono whitespace-pre-line text-[11px]">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: PERSONAL NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Topic Revision Notes & Caveats
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Notes are stored permanently in local IndexedDB.
                  </p>
                </div>
                {notesSavedNotice && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Saved
                  </span>
                )}
              </div>

              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                onBlur={handleNotesBlur}
                rows={10}
                placeholder="Write custom mnemonic shortcuts, question traps you fell into, or placement company questions..."
                className="w-full p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-200 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-y"
              />

              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={handleNotesBlur}
                  disabled={isSavingNotes}
                  className="bg-blue-600 hover:bg-blue-500"
                >
                  {isSavingNotes ? 'Saving...' : 'Save Notes'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-zinc-800 bg-zinc-900/40">
          <div className="text-xs text-zinc-500">
            {topic.practiceQuestions.length} practice questions available
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onUpdateStatus(topic.id, 'completed');
                onClose();
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Mark Completed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
