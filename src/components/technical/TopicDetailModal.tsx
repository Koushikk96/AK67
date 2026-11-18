import React, { useState, useEffect } from 'react';
import { TechnicalTopicWithProgress } from '@/types/technical';
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
} from 'lucide-react';

interface TopicDetailModalProps {
  topic: TechnicalTopicWithProgress;
  onClose: () => void;
  onUpdateStatus: (id: string, status: TopicStatus) => Promise<void>;
  onToggleBookmark: (id: string) => Promise<void>;
  onSaveNotes: (id: string, notes: string) => Promise<void>;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  onUpdateStatus,
  onToggleBookmark,
  onSaveNotes,
}) => {
  const currentStatus: TopicStatus =
    topic.progress?.status || (topic.progress?.isMastered ? 'completed' : 'not_started');
  const isBookmarked = topic.progress?.bookmarked || false;

  const [personalNotes, setPersonalNotes] = useState(topic.progress?.notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSavedNotice, setNotesSavedNotice] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  // Close on Escape key
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

  const copyCode = async () => {
    const textToCopy = topic.codeOrSyntax || topic.diagram || '';
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const getStatusBadge = (status: TopicStatus) => {
    switch (status) {
      case 'completed':
        return <Badge variant="solved">Completed</Badge>;
      case 'learning':
        return <Badge variant="attempted">Learning</Badge>;
      case 'revise':
        return <Badge variant="revise">Revise</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative flex flex-col max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-xl border border-zinc-800 bg-[#121215] shadow-2xl text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 px-5 py-4 bg-zinc-950/60">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold text-blue-400">
                #{topic.number}
              </span>
              <Badge variant="outline" className="uppercase text-[10px]">
                {topic.subject}
              </Badge>
              {getStatusBadge(currentStatus)}
            </div>
            <h2 className="text-lg font-bold text-white sm:text-xl">{topic.title}</h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleBookmark(topic.id)}
              className={`rounded-md p-1.5 transition ${
                isBookmarked
                  ? 'text-amber-400 hover:bg-amber-500/10'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark topic'}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 text-xs sm:text-sm">
          {/* Status Quick Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-850 bg-zinc-900/50 p-3">
            <span className="text-xs font-medium text-zinc-400">Update Learning Status:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              <Button
                variant={currentStatus === 'completed' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onUpdateStatus(topic.id, 'completed')}
                className="h-7 text-xs gap-1"
              >
                <CheckCircle2 className="h-3.5 w-3.5" /> Completed
              </Button>
              <Button
                variant={currentStatus === 'learning' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onUpdateStatus(topic.id, 'learning')}
                className="h-7 text-xs"
              >
                Learning
              </Button>
              <Button
                variant={currentStatus === 'revise' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onUpdateStatus(topic.id, 'revise')}
                className="h-7 text-xs"
              >
                Revise
              </Button>
              <Button
                variant={currentStatus === 'not_started' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onUpdateStatus(topic.id, 'not_started')}
                className="h-7 text-xs text-zinc-400"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Simple Explanation */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-blue-400" />
              <span>Core Concept & Explanation</span>
            </h3>
            <p className="text-xs leading-relaxed text-zinc-300 sm:text-sm bg-zinc-900/30 p-3.5 rounded-lg border border-zinc-800/80">
              {topic.explanation}
            </p>
          </div>

          {/* Practical Code or Syntax or Diagram */}
          {(topic.codeOrSyntax || topic.diagram) && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>
                    {topic.codeLanguage === 'cpp'
                      ? 'Practical C++ Example'
                      : topic.codeLanguage === 'sql'
                      ? 'SQL Syntax & Example'
                      : 'Architecture Diagram / Workflow'}
                  </span>
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCode}
                  className="h-7 gap-1 border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:text-white"
                >
                  {codeCopied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
              <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-200 leading-relaxed max-h-72">
                {topic.codeOrSyntax || topic.diagram}
              </pre>
            </div>
          )}

          {/* Sample Table & Expected Output (for SQL) */}
          {topic.sampleTable && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase">
                  Sample Data:
                </span>
                <pre className="overflow-x-auto rounded-lg border border-zinc-850 bg-zinc-950 p-3 font-mono text-[11px] text-zinc-300">
                  {topic.sampleTable}
                </pre>
              </div>
              {topic.expectedOutput && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase">
                    Expected Output:
                  </span>
                  <pre className="overflow-x-auto rounded-lg border border-zinc-850 bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400">
                    {topic.expectedOutput}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Important Interview Questions */}
          {topic.interviewQuestions.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
                <span>Frequently Asked Interview Questions</span>
              </h3>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 space-y-2">
                {topic.interviewQuestions.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                    <span className="font-mono text-purple-400 shrink-0 font-semibold">
                      Q{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {topic.commonMistakes && topic.commonMistakes.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                <span>Candidate Traps & Common Mistakes</span>
              </h3>
              <div className="rounded-lg border border-rose-500/20 bg-rose-950/10 p-3 space-y-1.5">
                {topic.commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-rose-200/90">
                    <span className="text-rose-400">•</span>
                    <span>{mistake}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Short Revision Notes */}
          {topic.revisionNotes.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Quick Revision Notes</span>
              </h3>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-3 space-y-1.5">
                {topic.revisionNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-emerald-200/90">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Notes (Auto-saved) */}
          <div className="space-y-2 border-t border-zinc-800 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileEdit className="h-3.5 w-3.5 text-blue-400" />
                <span>Personal Observations & Summary Notes (Auto-Saved)</span>
              </h3>
              <div className="flex items-center gap-2">
                {isSavingNotes && (
                  <span className="text-[11px] text-zinc-400 animate-pulse">Saving...</span>
                )}
                {notesSavedNotice && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Auto-saved to device
                  </span>
                )}
              </div>
            </div>
            <textarea
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Record personal interview takeaways, mnemonics, or tricky concepts here..."
              rows={3}
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-200 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-950/80 px-5 py-3">
          <span className="text-xs text-zinc-400">
            Status: <span className="text-zinc-200 capitalize">{currentStatus.replace('_', ' ')}</span>
          </span>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
