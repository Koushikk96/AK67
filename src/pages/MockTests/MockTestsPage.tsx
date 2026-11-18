import React, { useState } from 'react';
import { useMockTests } from '@/hooks/useMockTests';
import { useCodingAssessment } from '@/hooks/useCodingAssessment';
import { MockTestCategory, MockDifficulty, MockTestConfig, QuestionResultItem } from '@/types/mockTest';
import { CodingAssistanceLevel } from '@/types/database';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { dsaProblems } from '@/content/dsa';
import {
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  Bookmark,
  Sparkles,
  Code2,
  BarChart3,
  AlertTriangle,
  Play,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Check,
  Info,
} from 'lucide-react';

export const MockTestsPage: React.FC = () => {
  const {
    predefinedMockTests,
    activeSession,
    remainingSeconds,
    testResult,
    analytics,
    isSubmitting,
    startTest,
    selectAnswer,
    clearAnswer,
    toggleMarkForReview,
    navigateToQuestion,
    submitTest,
    abandonTest,
    getQuestionStatus,
    setTestResult,
  } = useMockTests();

  const coding = useCodingAssessment();

  // Active top-level tab: 'tests' | 'coding' | 'analytics'
  const [activeTab, setActiveTab] = useState<'tests' | 'coding' | 'analytics'>('tests');

  // Custom Test Configuration Modal state
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState('Custom Placement Drill');
  const [customCategory, setCustomCategory] = useState<MockTestCategory>('mixed');
  const [customCount, setCustomCount] = useState<number>(20);
  const [customDuration, setCustomDuration] = useState<number>(25);
  const [customDifficulty, setCustomDifficulty] = useState<MockDifficulty>('All');
  const [customNegativeMarking, setCustomNegativeMarking] = useState<boolean>(true);

  // Submit confirmation dialog
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showAbandonModal, setShowAbandonModal] = useState<boolean>(false);

  // Review filter (all, correct, incorrect, skipped)
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'skipped'>('all');

  // Coding sprint form state
  const [selectedCodingProblemId, setSelectedCodingProblemId] = useState<string>(dsaProblems[0]?.id || '');
  const [sprintMinutes, setSprintMinutes] = useState<number>(30);
  const [codingAssistance, setCodingAssistance] = useState<CodingAssistanceLevel>('independent');
  const [codingActualMinutes, setCodingActualMinutes] = useState<number>(25);
  const [codingNotes, setCodingNotes] = useState<string>('');

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // -------------------------------------------------------------
  // ACTIVE TEST MODE
  // -------------------------------------------------------------
  if (activeSession) {
    const currentQ = activeSession.questions[activeSession.currentIndex];
    const currentQId = currentQ?.id;
    const selectedOption = currentQId ? activeSession.answers[currentQId] : undefined;
    const isMarked = currentQId ? Boolean(activeSession.markedForReview[currentQId]) : false;

    // Palette count summaries
    let answeredCount = 0;
    let markedCount = 0;
    let notVisitedCount = 0;
    let notAnsweredCount = 0;

    activeSession.questions.forEach((q) => {
      const status = getQuestionStatus(q.id);
      if (status === 'answered' || status === 'answered_and_marked') answeredCount++;
      if (status === 'marked_for_review' || status === 'answered_and_marked') markedCount++;
      if (status === 'not_visited') notVisitedCount++;
      if (status === 'not_answered') notAnsweredCount++;
    });

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Top Header / Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-4 bg-zinc-950 sticky top-0 z-20 py-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Assessment In Progress</span>
              {activeSession.negativeMarking && (
                <Badge variant="urgent">-0.25 Negative Marking</Badge>
              )}
            </div>
            <h1 className="text-xl font-bold text-white mt-1">{activeSession.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown Timer */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                remainingSeconds <= 300
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
                  : 'bg-zinc-900 border-zinc-750 text-zinc-200'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>{formatTime(remainingSeconds)}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAbandonModal(true)}
              className="text-zinc-400 hover:text-rose-400"
            >
              Exit
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowSubmitModal(true)}
              disabled={isSubmitting}
            >
              Submit Assessment
            </Button>
          </div>
        </div>

        {/* Main Assessment Body: Question + Sidebar Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Question Interface (3 columns) */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="bg-zinc-900/60 border-zinc-800">
              <CardHeader className="pb-3 border-b border-zinc-800/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-400">
                      Question {activeSession.currentIndex + 1} of {activeSession.questions.length}
                    </span>
                    <Badge variant="outline" className="capitalize text-[11px]">
                      {currentQ.subject || currentQ.category}
                    </Badge>
                    <Badge
                      variant={
                        currentQ.difficulty === 'Easy'
                          ? 'easy'
                          : currentQ.difficulty === 'Hard'
                          ? 'urgent'
                          : 'attempted'
                      }
                      className="capitalize text-[11px]"
                    >
                      {currentQ.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={isMarked ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => toggleMarkForReview(currentQId)}
                      className={isMarked ? 'text-purple-400 border-purple-500/30 bg-purple-500/10' : ''}
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      {isMarked ? 'Marked for Review' : 'Mark for Review'}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                {/* Question Statement */}
                <div className="text-base text-zinc-100 font-medium leading-relaxed whitespace-pre-wrap">
                  {currentQ.question}
                </div>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const optionLetter = String.fromCharCode(65 + optIdx);

                    return (
                      <button
                        key={optIdx}
                        onClick={() => selectAnswer(currentQId, optIdx)}
                        className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-blue-600/15 border-blue-500 text-white font-medium shadow-sm'
                            : 'bg-zinc-950/50 border-zinc-800/80 text-zinc-300 hover:bg-zinc-850 hover:border-zinc-700'
                        }`}
                      >
                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold border ${
                            isSelected
                              ? 'bg-blue-500 text-white border-blue-400'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                          }`}
                        >
                          {optionLetter}
                        </div>
                        <span className="text-sm pt-0.5 leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Question Bottom Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800/80">
                  <div>
                    {selectedOption !== undefined && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearAnswer(currentQId)}
                        className="text-xs text-zinc-400 hover:text-rose-400"
                      >
                        Clear Response
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateToQuestion(activeSession.currentIndex - 1)}
                      disabled={activeSession.currentIndex === 0}
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Previous
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        if (activeSession.currentIndex < activeSession.questions.length - 1) {
                          navigateToQuestion(activeSession.currentIndex + 1);
                        } else {
                          setShowSubmitModal(true);
                        }
                      }}
                    >
                      {activeSession.currentIndex < activeSession.questions.length - 1 ? (
                        <>
                          Next
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      ) : (
                        'Finish & Submit'
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Palette (1 column) */}
          <div className="space-y-4">
            <Card className="bg-zinc-900/60 border-zinc-800">
              <CardHeader className="pb-3 border-b border-zinc-800">
                <CardTitle className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Question Palette</span>
                  <span className="font-mono text-zinc-500">{activeSession.questions.length} Total</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Palette Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {activeSession.questions.map((q, idx) => {
                    const status = getQuestionStatus(q.id);
                    const isCurrent = idx === activeSession.currentIndex;

                    let bgClass = 'bg-zinc-800/80 border-zinc-700 text-zinc-400';
                    if (status === 'answered') {
                      bgClass = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
                    } else if (status === 'marked_for_review') {
                      bgClass = 'bg-purple-500/20 border-purple-500/40 text-purple-300';
                    } else if (status === 'answered_and_marked') {
                      bgClass = 'bg-indigo-500/30 border-indigo-400 text-indigo-200 ring-1 ring-purple-400';
                    } else if (status === 'not_answered') {
                      bgClass = 'bg-rose-500/15 border-rose-500/30 text-rose-300';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => navigateToQuestion(idx)}
                        className={`h-8 rounded text-xs font-bold border transition flex items-center justify-center relative ${bgClass} ${
                          isCurrent ? 'ring-2 ring-blue-500 font-extrabold scale-105' : 'hover:opacity-90'
                        }`}
                        title={`Question ${idx + 1} (${status.replace(/_/g, ' ')})`}
                      >
                        {idx + 1}
                        {status === 'answered_and_marked' && (
                          <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="space-y-2 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded bg-emerald-500/30 border border-emerald-500/50" />
                      <span>Answered</span>
                    </div>
                    <span className="font-mono text-zinc-300 font-semibold">{answeredCount}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded bg-purple-500/30 border border-purple-500/50" />
                      <span>Marked for Review</span>
                    </div>
                    <span className="font-mono text-zinc-300 font-semibold">{markedCount}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded bg-rose-500/20 border border-rose-500/40" />
                      <span>Not Answered</span>
                    </div>
                    <span className="font-mono text-zinc-300 font-semibold">{notAnsweredCount}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded bg-zinc-800 border border-zinc-700" />
                      <span>Not Visited</span>
                    </div>
                    <span className="font-mono text-zinc-300 font-semibold">{notVisitedCount}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full mt-2"
                  size="sm"
                  onClick={() => setShowSubmitModal(true)}
                  disabled={isSubmitting}
                >
                  Submit Test ({answeredCount}/{activeSession.questions.length})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <Card className="max-w-md w-full bg-zinc-900 border-zinc-800 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-white">Confirm Test Submission</CardTitle>
                <CardDescription>
                  Are you ready to submit your assessment? You will receive instant scores and detailed explanations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                  <div className="text-zinc-400">Total Questions:</div>
                  <div className="font-mono font-bold text-white text-right">{activeSession.questions.length}</div>

                  <div className="text-emerald-400">Answered:</div>
                  <div className="font-mono font-bold text-emerald-400 text-right">{answeredCount}</div>

                  <div className="text-rose-400">Unanswered:</div>
                  <div className="font-mono font-bold text-rose-400 text-right">
                    {activeSession.questions.length - answeredCount}
                  </div>

                  <div className="text-purple-400">Marked for Review:</div>
                  <div className="font-mono font-bold text-purple-400 text-right">{markedCount}</div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button variant="outline" size="sm" onClick={() => setShowSubmitModal(false)}>
                    Continue Test
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={isSubmitting}
                    onClick={async () => {
                      setShowSubmitModal(false);
                      await submitTest();
                    }}
                  >
                    {isSubmitting ? 'Evaluating...' : 'Yes, Submit Test'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Abandon Confirmation Modal */}
        {showAbandonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <Card className="max-w-md w-full bg-zinc-900 border-zinc-800 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <span>Exit Test Early?</span>
                </CardTitle>
                <CardDescription>
                  Exiting without submitting will discard this attempt and will not record your score.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-end gap-3">
                <Button variant="outline" size="sm" onClick={() => setShowAbandonModal(false)}>
                  Stay in Test
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setShowAbandonModal(false);
                    abandonTest();
                  }}
                >
                  Exit Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEST RESULT & REVIEW VIEW
  // -------------------------------------------------------------
  if (testResult) {
    const filteredReviewItems = testResult.responses.filter((item) => {
      if (reviewFilter === 'correct') return item.isCorrect;
      if (reviewFilter === 'incorrect') return item.selectedOptionIndex !== undefined && !item.isCorrect;
      if (reviewFilter === 'skipped') return item.selectedOptionIndex === undefined;
      return true;
    });

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Results Banner */}
        <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Assessment Evaluated</span>
              <Badge variant="solved">Saved to IndexedDB</Badge>
            </div>
            <Button variant="outline" size="sm" onClick={() => setTestResult(null)}>
              Return to Test Centre
            </Button>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{testResult.title}</h1>
          <p className="text-xs text-zinc-400">
            Completed on {new Date(testResult.completedAt).toLocaleTimeString()} ({Math.floor(testResult.timeSpentSeconds / 60)}m {testResult.timeSpentSeconds % 60}s elapsed)
          </p>
        </div>

        {/* Score Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs">Final Score</CardDescription>
              <CardTitle className="text-2xl font-bold text-white mt-1">
                {testResult.score.toFixed(2)}
                <span className="text-xs text-zinc-500 font-normal"> / {testResult.totalQuestions}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <span className="text-xs font-semibold text-blue-400">{testResult.scorePercentage}%</span>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs">Accuracy</CardDescription>
              <CardTitle className="text-2xl font-bold text-emerald-400 mt-1">
                {testResult.accuracyPercentage}%
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-zinc-400">
              {testResult.correctCount} of {testResult.correctCount + testResult.incorrectCount} answered
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs">Correct / Incorrect</CardDescription>
              <CardTitle className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                <span className="text-emerald-400">{testResult.correctCount}</span>
                <span className="text-zinc-600">/</span>
                <span className="text-rose-400">{testResult.incorrectCount}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-zinc-400">
              {testResult.unansweredCount} skipped
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs">Negative Penalty</CardDescription>
              <CardTitle className="text-2xl font-bold text-amber-400 mt-1">
                {testResult.negativeMarking ? `-${(testResult.incorrectCount * 0.25).toFixed(2)}` : 'None'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-zinc-400">
              {testResult.negativeMarking ? '-0.25 per wrong answer' : 'Normal grading'}
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        {testResult.subjectBreakdown && Object.keys(testResult.subjectBreakdown).length > 1 && (
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-zinc-200">Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-0">
              {Object.entries(testResult.subjectBreakdown).map(([sec, data]) => {
                const totalAnswered = data.correct + data.incorrect;
                const acc = totalAnswered > 0 ? Math.round((data.correct / totalAnswered) * 100) : 0;
                return (
                  <div key={sec} className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                    <span className="text-xs font-semibold capitalize text-zinc-300">{sec}</span>
                    <div className="flex items-center justify-between text-xs mt-1 text-zinc-400">
                      <span>Correct: {data.correct}/{data.total}</span>
                      <span className="font-mono font-bold text-emerald-400">{acc}%</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Review Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Review Questions:</span>
            <div className="flex items-center gap-1.5">
              {(['all', 'correct', 'incorrect', 'skipped'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setReviewFilter(mode)}
                  className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition ${
                    reviewFilter === mode
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            Showing {filteredReviewItems.length} of {testResult.totalQuestions} questions
          </span>
        </div>

        {/* Question Review Cards */}
        <div className="space-y-4">
          {filteredReviewItems.map((item: QuestionResultItem, idx: number) => {
            const isUserAnswered = item.selectedOptionIndex !== undefined;
            const isCorrect = item.isCorrect;

            return (
              <Card
                key={item.questionId}
                className={`bg-zinc-900/40 border ${
                  !isUserAnswered
                    ? 'border-zinc-800'
                    : isCorrect
                    ? 'border-emerald-500/20'
                    : 'border-rose-500/20'
                }`}
              >
                <CardHeader className="pb-3 border-b border-zinc-800/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-300">Q{idx + 1}.</span>
                      <Badge variant="outline" className="text-[11px] capitalize">
                        {item.subject}
                      </Badge>
                      <Badge variant="secondary" className="text-[11px] capitalize">
                        {item.difficulty}
                      </Badge>
                    </div>

                    <div>
                      {!isUserAnswered ? (
                        <Badge variant="secondary" className="text-zinc-400">
                          Skipped
                        </Badge>
                      ) : isCorrect ? (
                        <Badge variant="solved" className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Correct (+1.0)
                        </Badge>
                      ) : (
                        <Badge variant="urgent" className="flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          Incorrect {testResult.negativeMarking ? '(-0.25)' : '(0.0)'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-4 space-y-4">
                  <div className="text-sm text-zinc-200 font-medium whitespace-pre-wrap leading-relaxed">
                    {item.questionText}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {item.options.map((opt: string, oIdx: number) => {
                      const isCorrectChoice = oIdx === item.correctOptionIndex;
                      const isUserChoice = oIdx === item.selectedOptionIndex;
                      const letter = String.fromCharCode(65 + oIdx);

                      let borderClass = 'border-zinc-800/70 bg-zinc-950/40 text-zinc-400';
                      if (isCorrectChoice) {
                        borderClass = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-semibold';
                      } else if (isUserChoice && !isCorrect) {
                        borderClass = 'border-rose-500/50 bg-rose-500/10 text-rose-300 font-semibold';
                      }

                      return (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-md border text-xs flex items-start gap-2.5 ${borderClass}`}
                        >
                          <span className="font-bold shrink-0">{letter}.</span>
                          <span className="leading-relaxed flex-1">{opt}</span>
                          {isCorrectChoice && <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />}
                          {isUserChoice && !isCorrect && <XCircle className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-blue-400">
                      <Lightbulb className="h-3.5 w-3.5" />
                      <span>Explanation:</span>
                    </div>
                    <p className="leading-relaxed text-zinc-400 pl-5">{item.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEST CENTRE MAIN VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module I</span>
          <Badge variant="outline">Assessment & Simulator</Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Mock Test Assessment Centre</h1>
            <p className="text-xs text-zinc-400 max-w-2xl mt-1">
              Timed placement assessments, coding sprints on the 67 DSA problems, question navigation palette, instant scoring, and local test analytics.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xl font-bold text-white">{analytics?.totalTests || 0}</span>
              <span className="text-xs text-zinc-500"> Tests Attempted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('tests')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'tests'
              ? 'bg-blue-600 text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Award className="h-3.5 w-3.5" />
          <span>Placement Tests</span>
        </button>

        <button
          onClick={() => setActiveTab('coding')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'coding'
              ? 'bg-blue-600 text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Code2 className="h-3.5 w-3.5" />
          <span>Coding Sprint Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span>Test History & Analytics</span>
        </button>
      </div>

      {/* TAB 1: PLACEMENT TESTS */}
      {activeTab === 'tests' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-zinc-200">Standard Placement Assessments</h2>
              <p className="text-xs text-zinc-400">Curated mock drills matching on-campus screening patterns.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomModal(true)}
              className="flex items-center gap-2 border-blue-500/40 text-blue-400 hover:bg-blue-500/10"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Configure Custom Test
            </Button>
          </div>

          {/* Predefined Test Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {predefinedMockTests.map((t) => (
              <Card key={t.id} className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">
                      {t.category === 'mixed' ? 'Full Placement Mock' : t.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{t.durationMinutes} Mins</span>
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold text-zinc-100 mt-2">
                    {t.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-400 line-clamp-2">
                    {t.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2 flex items-center justify-between border-t border-zinc-800/80">
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="font-semibold text-zinc-300">{t.questionCount} Questions</span>
                    {t.negativeMarking ? (
                      <span className="text-amber-400">-0.25 Marking</span>
                    ) : (
                      <span className="text-zinc-500">No Penalty</span>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => startTest(t)}
                    className="flex items-center gap-1.5"
                  >
                    <Play className="h-3.5 w-3.5" />
                    Start Drill
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Assessment Engine Features Card */}
          <Card className="bg-zinc-900/30 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-400" />
                <span>Assessment Engine Integrity Rules</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-400 space-y-1.5 leading-relaxed">
              <p>• <strong>Wall-clock Timestamp Persistence:</strong> If you accidentally reload the page or close your browser tab, the countdown timer calculates elapsed wall-clock time and resumes accurately.</p>
              <p>• <strong>Local Data Protection:</strong> All test responses, scores, and accuracy metrics are stored 100% locally on your machine via IndexedDB.</p>
              <p>• <strong>Strict Non-Duplication:</strong> Questions within any generated mock test are guaranteed unique and randomized across 282 validated technical and aptitude items.</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: CODING ASSESSMENT SIMULATOR */}
      {activeTab === 'coding' && (
        <div className="space-y-6">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-semibold text-zinc-200">Coding Assessment Sprint Simulator</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Simulate actual placement coding tests on the curated 67 DSA problems. Solve independently under strict time constraints, reveal progressive hints if stuck, and record self-reported reflection metrics.
            </p>
          </div>

          {!coding.activeSprint ? (
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Sprint Launcher Form */}
              <Card className="sm:col-span-2 bg-zinc-900/40 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-base text-zinc-100 flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-blue-400" />
                    <span>Launch Timed DSA Sprint</span>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Select a target problem from the 67-problem curriculum or practice with a random problem.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Target Problem:</label>
                    <select
                      value={selectedCodingProblemId}
                      onChange={(e) => setSelectedCodingProblemId(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                    >
                      {dsaProblems.map((p) => (
                        <option key={p.id} value={p.id}>
                          #{p.number} — {p.title} ({p.difficulty.toUpperCase()} • {p.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Sprint Duration:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[15, 30, 45].map((m) => (
                        <button
                          key={m}
                          onClick={() => setSprintMinutes(m)}
                          className={`py-2 text-xs font-semibold rounded-md border transition ${
                            sprintMinutes === m
                              ? 'bg-blue-600 text-white border-blue-500'
                              : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                          }`}
                        >
                          {m} Minutes
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={() => coding.startSprint(selectedCodingProblemId, sprintMinutes)}
                    >
                      <Play className="h-3.5 w-3.5" />
                      Start Selected Sprint
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => coding.startSprint(undefined, sprintMinutes)}
                      className="text-zinc-300"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      Random Problem
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Guidelines / Transparency notice */}
              <Card className="bg-zinc-900/30 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Placement Advice
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-zinc-400 space-y-2 leading-relaxed">
                  <p>In actual placement Online Assessments (OA), fresher candidates get ~30 minutes per coding question.</p>
                  <p>• Avoid jumping immediately to the optimal approach. First formulate the brute-force logic and verify constraints.</p>
                  <p>• Pay close attention to edge cases: empty input, negative numbers, single element, duplicates, and integer overflow.</p>
                  <p className="text-zinc-500 italic pt-2 border-t border-zinc-800/80">
                    *AK67 simulates timed assessment pressure. Code execution is verified via self-reflection and comprehensive C++ reference implementations.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Active Coding Sprint Screen */
            <div className="space-y-4">
              <Card className="bg-zinc-900/60 border-zinc-800">
                <CardHeader className="pb-3 border-b border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-400">
                        Problem #{coding.activeSprint.problem.number}
                      </span>
                      <Badge variant="outline" className="capitalize text-[11px]">
                        {coding.activeSprint.problem.category}
                      </Badge>
                      <Badge
                        variant={
                          coding.activeSprint.problem.difficulty === 'Easy'
                            ? 'easy'
                            : coding.activeSprint.problem.difficulty === 'Hard'
                            ? 'urgent'
                            : 'attempted'
                        }
                        className="capitalize text-[11px]"
                      >
                        {coding.activeSprint.problem.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => coding.exitSprint()}>
                        Exit Sprint
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-white mt-2">
                    {coding.activeSprint.problem.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-4 space-y-4">
                  {/* Problem Statement */}
                  <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                    {coding.activeSprint.problem.description}
                  </div>

                  {/* Constraints & Complexity */}
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                      <span className="font-semibold text-zinc-300">Constraints:</span>
                      <ul className="list-disc list-inside text-zinc-400 mt-1 space-y-1">
                        {coding.activeSprint.problem.constraints.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                      <span className="font-semibold text-zinc-300">Target Complexity:</span>
                      <div className="mt-1 space-y-1 text-zinc-400 font-mono">
                        <div>Time: {coding.activeSprint.problem.timeComplexity}</div>
                        <div>Space: {coding.activeSprint.problem.spaceComplexity}</div>
                      </div>
                    </div>
                  </div>

                  {/* Progressive Hints */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
                        <span>Hints ({coding.revealedHints}/{coding.activeSprint.problem.hints.length})</span>
                      </span>
                      {coding.revealedHints < coding.activeSprint.problem.hints.length && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => coding.revealNextHint()}
                          className="text-xs text-amber-400"
                        >
                          Reveal Next Hint
                        </Button>
                      )}
                    </div>

                    {coding.revealedHints > 0 && (
                      <div className="space-y-2">
                        {coding.activeSprint.problem.hints.slice(0, coding.revealedHints).map((hint, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300"
                          >
                            <strong>Hint {i + 1}:</strong> {hint}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Self-Reflection & Submission Form */}
                  <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                        Self-Evaluation & Completion
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => coding.toggleSolution()}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        {coding.showSolution ? 'Hide Solution' : 'View Reference Solution'}
                      </Button>
                    </div>

                    {/* Assistance Level selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400">Assistance Level:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['independent', 'hints', 'solution'] as const).map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setCodingAssistance(lvl)}
                            className={`py-1.5 px-3 rounded text-xs font-semibold border capitalize transition ${
                              codingAssistance === lvl
                                ? 'bg-blue-600 text-white border-blue-500'
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                            }`}
                          >
                            {lvl === 'independent' ? 'Solved Independently' : lvl === 'hints' ? 'Used Hints' : 'Saw Solution'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time taken */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400">Actual Minutes Taken:</label>
                      <input
                        type="number"
                        min="1"
                        max="180"
                        value={codingActualMinutes}
                        onChange={(e) => setCodingActualMinutes(Number(e.target.value))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200"
                      />
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400">Personal Notes / Reflections:</label>
                      <textarea
                        rows={2}
                        value={codingNotes}
                        onChange={(e) => setCodingNotes(e.target.value)}
                        placeholder="Key learnings, edge cases identified, or mistakes..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          coding.submitAttempt(codingAssistance, codingActualMinutes, codingNotes)
                        }
                      >
                        <Check className="h-3.5 w-3.5" />
                        Save Attempt to IndexedDB
                      </Button>
                    </div>
                  </div>

                  {/* Reference C++ Solution */}
                  {coding.showSolution && (
                    <div className="space-y-2 pt-2 border-t border-zinc-800">
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                        <Code2 className="h-3.5 w-3.5" />
                        <span>Optimal C++ Reference Solution:</span>
                      </span>
                      <pre className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono overflow-x-auto leading-relaxed">
                        {coding.activeSprint.problem.cppSolution}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TEST HISTORY & ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-semibold text-zinc-200">Assessment Performance Analytics</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Real-time metrics computed directly from your saved mock tests in IndexedDB.
            </p>
          </div>

          {/* Stats Overview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader className="p-4 pb-2">
                <CardDescription className="text-xs">Total Assessments</CardDescription>
                <CardTitle className="text-2xl font-bold text-white mt-1">
                  {analytics?.totalTests || 0}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-xs text-zinc-400">
                Completed drills
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader className="p-4 pb-2">
                <CardDescription className="text-xs">Average Score</CardDescription>
                <CardTitle className="text-2xl font-bold text-blue-400 mt-1">
                  {analytics?.averageScorePercentage || 0}%
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-xs text-zinc-400">
                Across all test attempts
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader className="p-4 pb-2">
                <CardDescription className="text-xs">Highest Score</CardDescription>
                <CardTitle className="text-2xl font-bold text-emerald-400 mt-1">
                  {analytics?.highestScorePercentage || 0}%
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-xs text-zinc-400">
                Peak performance
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader className="p-4 pb-2">
                <CardDescription className="text-xs">Overall Accuracy</CardDescription>
                <CardTitle className="text-2xl font-bold text-purple-400 mt-1">
                  {analytics?.averageAccuracyPercentage || 0}%
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-xs text-zinc-400">
                Correct answer ratio
              </CardContent>
            </Card>
          </div>

          {/* Recent Test Attempts History */}
          <Card className="bg-zinc-900/40 border-zinc-800">
            <CardHeader className="pb-3 border-b border-zinc-800">
              <CardTitle className="text-sm font-semibold text-zinc-200">Recent Test History</CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              {!analytics || analytics.recentTests.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No mock assessments taken yet. Launch your first test above to begin tracking your placement readiness.
                </div>
              ) : (
                <div className="divide-y divide-zinc-800/80">
                  {analytics.recentTests.map((t) => (
                    <div key={t.testId} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-zinc-200">{t.title}</span>
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {t.category}
                          </Badge>
                          {t.negativeMarking && <Badge variant="urgent" className="text-[10px]">-0.25</Badge>}
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          {new Date(t.completedAt).toLocaleDateString()} at {new Date(t.completedAt).toLocaleTimeString()} • {Math.floor(t.timeSpentSeconds / 60)}m spent
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <div className="text-right">
                          <span className="font-bold text-white font-mono">{t.score.toFixed(1)}</span>
                          <span className="text-zinc-500"> / {t.totalQuestions}</span>
                          <span className="text-blue-400 font-semibold ml-2">({t.scorePercentage}%)</span>
                        </div>
                        <Badge
                          variant={t.accuracyPercentage >= 70 ? 'solved' : t.accuracyPercentage >= 50 ? 'attempted' : 'urgent'}
                        >
                          {t.accuracyPercentage}% Acc
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* CUSTOM TEST CONFIGURATION MODAL */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="max-w-md w-full bg-zinc-900 border-zinc-800 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-base text-white">Create Custom Mock Assessment</CardTitle>
              <CardDescription className="text-xs">
                Configure duration, topic focus, question count, and marking rules.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-300 font-medium">Test Title:</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-300 font-medium">Assessment Category:</label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as MockTestCategory)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="mixed">Mixed Full Placement (Quant + Logical + Verbal + Tech)</option>
                  <option value="technical">Technical MCQs Only (C++, OOP, DBMS, SQL, OS, Networks, SE)</option>
                  <option value="quantitative">Quantitative Aptitude Only</option>
                  <option value="logical">Logical Reasoning Only</option>
                  <option value="verbal">Verbal Ability Only</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium">Question Count:</label>
                  <select
                    value={customCount}
                    onChange={(e) => setCustomCount(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200"
                  >
                    {[10, 15, 20, 30, 40, 50].map((c) => (
                      <option key={c} value={c}>{c} Questions</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium">Duration (Minutes):</label>
                  <select
                    value={customDuration}
                    onChange={(e) => setCustomDuration(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200"
                  >
                    {[10, 15, 20, 25, 30, 45, 60].map((d) => (
                      <option key={d} value={d}>{d} Minutes</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-300 font-medium">Difficulty Level:</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setCustomDifficulty(diff)}
                      className={`py-1.5 text-xs font-semibold rounded border capitalize transition ${
                        customDifficulty === diff
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">Negative Marking (-0.25)</span>
                  <span className="text-[11px] text-zinc-500">Deduct 0.25 marks for every incorrect answer</span>
                </div>
                <input
                  type="checkbox"
                  checked={customNegativeMarking}
                  onChange={(e) => setCustomNegativeMarking(e.target.checked)}
                  className="h-4 w-4 rounded accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowCustomModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const config: MockTestConfig = {
                      id: 'custom-' + Date.now(),
                      title: customTitle.trim() || 'Custom Placement Test',
                      description: `${customCount} Questions • ${customDuration} Mins • ${customCategory}`,
                      category: customCategory,
                      questionCount: customCount,
                      durationMinutes: customDuration,
                      difficulty: customDifficulty,
                      negativeMarking: customNegativeMarking,
                    };
                    setShowCustomModal(false);
                    startTest(config);
                  }}
                >
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
