import React, { useState, useMemo } from 'react';
import { sqlTopics, practicalSQLProblems } from '@/content/sql';
import { useTechnicalTopics } from '@/hooks/useTechnicalTopics';
import { TechnicalTopicWithProgress, PracticalSQLProblem } from '@/types/technical';
import { TopicStatus } from '@/types/database';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TopicDetailModal } from '@/components/technical/TopicDetailModal';
import {
  Database,
  Search,
  Bookmark,
  CheckCircle2,
  Code2,
  BookOpen,
  Copy,
  Check,
  X,
  FileCode2,
} from 'lucide-react';

export const SQLPage: React.FC = () => {
  const {
    topics,
    stats,
    loading,
    updateStatus,
    toggleBookmark,
    saveNotes,
  } = useTechnicalTopics(sqlTopics, 'sql');

  const [activeTab, setActiveTab] = useState<'concepts' | 'practice'>('concepts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TopicStatus | 'all' | 'bookmarked'>('all');
  const [activeTopic, setActiveTopic] = useState<TechnicalTopicWithProgress | null>(null);
  const [activePracticalProblem, setActivePracticalProblem] = useState<PracticalSQLProblem | null>(null);
  const [copiedSolution, setCopiedSolution] = useState(false);

  // Filter core concepts
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchExplanation = t.explanation.toLowerCase().includes(q);
        if (!matchTitle && !matchExplanation) return false;
      }

      const status: TopicStatus =
        t.progress?.status || (t.progress?.isMastered ? 'completed' : 'not_started');

      if (selectedStatus === 'bookmarked') {
        if (!t.progress?.bookmarked) return false;
      } else if (selectedStatus !== 'all') {
        if (status !== selectedStatus) return false;
      }

      return true;
    });
  }, [topics, searchQuery, selectedStatus]);

  // Filter practical problems
  const filteredProblems = useMemo(() => {
    if (!searchQuery.trim()) return practicalSQLProblems;
    const q = searchQuery.toLowerCase();
    return practicalSQLProblems.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.pattern.toLowerCase().includes(q) ||
        p.statement.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const currentActiveTopic = useMemo(() => {
    if (!activeTopic) return null;
    return topics.find((t) => t.id === activeTopic.id) || activeTopic;
  }, [activeTopic, topics]);

  const copyPracticalSolution = async (sql: string) => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopiedSolution(true);
      setTimeout(() => setCopiedSolution(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Module D • Core Technical
              </span>
              <Badge variant="solved">Essential SQL Query & Schema Mastery</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center gap-2.5">
              <Database className="h-7 w-7 text-cyan-400" />
              <span>SQL Essentials</span>
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              21 essential relational database concepts and 21 practical placement queries. JOINs, GROUP BY & HAVING, window functions (ROW_NUMBER, DENSE_RANK), subqueries, and normalization.
            </p>
          </div>

          {/* Live Progress Card */}
          <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="text-zinc-400">Concepts:</span>
                <span className="font-mono font-bold text-white">
                  {loading ? '...' : `${stats.completed} / ${stats.total}`} ({stats.completionPercentage}%)
                </span>
              </div>
              <div className="h-1.5 w-36 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full bg-cyan-500 transition-all duration-500"
                  style={{ width: `${stats.completionPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-500">
                <span>{stats.learning} in progress</span>
                <span>{stats.bookmarked} bookmarked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Toolbar */}
      <div className="flex flex-col gap-3 rounded-lg border border-zinc-800 bg-[#121215] p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5">
          <Button
            variant={activeTab === 'concepts' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('concepts')}
            className="text-xs"
          >
            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
            21 Core Concepts ({stats.total})
          </Button>
          <Button
            variant={activeTab === 'practice' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('practice')}
            className="text-xs"
          >
            <FileCode2 className="mr-1.5 h-3.5 w-3.5 text-cyan-400" />
            21 Practical Queries ({practicalSQLProblems.length})
          </Button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === 'concepts'
                  ? 'Search SQL concepts...'
                  : 'Search queries (e.g. salary, joins)...'
              }
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 pl-8 pr-2.5 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {activeTab === 'concepts' && (
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-300 focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed Only</option>
              <option value="learning">In Progress</option>
              <option value="revise">Needs Revision</option>
              <option value="not_started">Unstudied</option>
              <option value="bookmarked">Bookmarked Only</option>
            </select>
          )}
        </div>
      </div>

      {/* Tab 1: 21 Core Concepts */}
      {activeTab === 'concepts' && (
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic) => {
            const status: TopicStatus =
              topic.progress?.status || (topic.progress?.isMastered ? 'completed' : 'not_started');
            const isBookmarked = topic.progress?.bookmarked || false;

            const badgeConfig = {
              completed: { variant: 'solved' as const, label: 'Completed' },
              learning: { variant: 'attempted' as const, label: 'Learning' },
              revise: { variant: 'revise' as const, label: 'Revise' },
              not_started: { variant: 'outline' as const, label: 'Not Started' },
            }[status];

            return (
              <Card
                key={topic.id}
                className="group flex flex-col justify-between border-zinc-800/80 bg-zinc-900/30 transition hover:border-zinc-700 hover:bg-zinc-900/60"
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        #{topic.number}
                      </span>
                      <Badge variant={badgeConfig.variant} className="px-1.5 py-0 text-[10px]">
                        {badgeConfig.label}
                      </Badge>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(topic.id);
                      }}
                      className={`rounded p-1 transition ${
                        isBookmarked
                          ? 'text-amber-400'
                          : 'text-zinc-600 hover:text-zinc-400 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  <CardTitle
                    onClick={() => setActiveTopic(topic)}
                    className="mt-2 text-sm font-semibold text-zinc-100 cursor-pointer hover:text-cyan-300 transition-colors line-clamp-2"
                  >
                    {topic.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-4 pt-0 space-y-3">
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {topic.explanation}
                  </p>

                  <div className="flex items-center justify-between border-t border-zinc-800/70 pt-2.5 text-[11px]">
                    <span className="text-zinc-500">
                      {topic.interviewQuestions.length} Interview Qs
                    </span>

                    <div className="flex items-center gap-1.5">
                      <Button
                        variant={status === 'completed' ? 'outline' : 'ghost'}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(
                            topic.id,
                            status === 'completed' ? 'learning' : 'completed'
                          );
                        }}
                        className="h-6 px-2 text-[10px]"
                      >
                        {status === 'completed' ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Done
                          </span>
                        ) : (
                          'Mark Done'
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTopic(topic)}
                        className="h-6 px-2 text-[10px] text-zinc-400 hover:text-white"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Tab 2: Practical SQL Problems */}
      {activeTab === 'practice' && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProblems.map((prob) => (
              <Card
                key={prob.id}
                className="cursor-pointer border-zinc-800/80 bg-zinc-900/30 transition hover:border-zinc-700 hover:bg-zinc-900/60 p-4 space-y-2.5 flex flex-col justify-between"
                onClick={() => setActivePracticalProblem(prob)}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      Q{prob.number}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant={prob.difficulty === 'Basic' ? 'easy' : 'attempted'}
                        className="px-1.5 py-0 text-[10px]"
                      >
                        {prob.difficulty}
                      </Badge>
                      <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
                        {prob.pattern}
                      </Badge>
                    </div>
                  </div>

                  <h4 className="text-xs font-semibold text-zinc-100 hover:text-cyan-300 transition-colors">
                    {prob.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {prob.statement}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800/70 pt-2 text-[11px]">
                  <span className="text-zinc-500">Standard Placement Problem</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-cyan-400">
                    Inspect Solution
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Topic Detail Modal for Core SQL */}
      {currentActiveTopic && (
        <TopicDetailModal
          topic={currentActiveTopic}
          onClose={() => setActiveTopic(null)}
          onUpdateStatus={updateStatus}
          onToggleBookmark={toggleBookmark}
          onSaveNotes={saveNotes}
        />
      )}

      {/* Modal for Practical SQL Problem Inspection */}
      {activePracticalProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="relative flex flex-col max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-[#121215] shadow-2xl text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-zinc-800 px-5 py-4 bg-zinc-950/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    Q{activePracticalProblem.number}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {activePracticalProblem.pattern}
                  </Badge>
                  <Badge
                    variant={activePracticalProblem.difficulty === 'Basic' ? 'easy' : 'attempted'}
                    className="text-[10px]"
                  >
                    {activePracticalProblem.difficulty}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-white sm:text-lg">
                  {activePracticalProblem.title}
                </h3>
              </div>
              <button
                onClick={() => setActivePracticalProblem(null)}
                className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Problem Statement:
                </h4>
                <p className="text-xs text-zinc-200 bg-zinc-900/40 p-3 rounded-lg border border-zinc-800 leading-relaxed">
                  {activePracticalProblem.statement}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase">
                    Sample Schema / Table:
                  </span>
                  <pre className="overflow-x-auto rounded-lg border border-zinc-850 bg-zinc-950 p-3 font-mono text-[11px] text-zinc-300">
                    {activePracticalProblem.sampleTable}
                  </pre>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase">
                    Expected Output:
                  </span>
                  <pre className="overflow-x-auto rounded-lg border border-zinc-850 bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400">
                    {activePracticalProblem.expectedOutput}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Verified SQL Solution:</span>
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyPracticalSolution(activePracticalProblem.sqlSolution)}
                    className="h-6 gap-1 border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:text-white"
                  >
                    {copiedSolution ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy SQL</span>
                      </>
                    )}
                  </Button>
                </div>
                <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 font-mono text-xs text-cyan-300 leading-relaxed">
                  {activePracticalProblem.sqlSolution}
                </pre>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Query Explanation & Optimization:
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/80">
                  {activePracticalProblem.explanation}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-zinc-800 bg-zinc-950/80 px-5 py-3">
              <Button variant="outline" size="sm" onClick={() => setActivePracticalProblem(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
