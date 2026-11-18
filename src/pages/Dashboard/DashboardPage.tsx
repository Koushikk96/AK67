import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RouteId } from '@/types/navigation';
import { useDSAProblems } from '@/hooks/useDSAProblems';
import { useDatabaseStats } from '@/hooks/useDatabaseStats';
import { studySessionRepository } from '@/db/repositories/studySessionRepository';
import { dailyPlannerRepository } from '@/db/repositories/dailyPlannerRepository';
import { DailyPlannerEntry } from '@/types/database';
import { DSAProblemWithProgress } from '@/types/dsa';
import { ProblemDetailModal } from '@/components/dsa/ProblemDetailModal';
import {
  Code2,
  RotateCcw,
  HardDrive,
  ArrowRight,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  BookOpen,
  Database,
  Terminal,
} from 'lucide-react';

interface DashboardPageProps {
  navigate: (route: RouteId) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
  const { stats: dsaStats, problems, loading: dsaLoading, updateStatus, toggleBookmark, saveNotes, completeRevision } = useDSAProblems();
  const { stats: dbStats, loading: dbLoading } = useDatabaseStats();

  const [streak, setStreak] = useState<number>(0);
  const [dailyPlanner, setDailyPlanner] = useState<DailyPlannerEntry | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<DSAProblemWithProgress | null>(null);

  // Fetch streak & today's planner entry
  useEffect(() => {
    let isMounted = true;
    const loadLiveData = async () => {
      try {
        const [currentStreak, todayPlanner] = await Promise.all([
          studySessionRepository.calculateStreak(),
          dailyPlannerRepository.getToday(),
        ]);
        if (isMounted) {
          setStreak(currentStreak);
          setDailyPlanner(todayPlanner);
        }
      } catch (err) {
        console.error('[DashboardPage] Error loading streak/planner:', err);
      }
    };

    loadLiveData();
    return () => {
      isMounted = false;
    };
  }, [dsaStats.solved]);

  // Total persistent records across all IndexedDB stores
  const totalUserRecords =
    dbStats.problemProgressCount +
    dbStats.topicProgressCount +
    dbStats.notesCount +
    dbStats.mockTestsCount +
    dbStats.dailyPlannerCount +
    dbStats.studySessionsCount;

  // Recently attempted problems
  const recentProblems = useMemo(() => {
    return problems
      .filter((p) => p.progress && p.progress.lastAttemptedAt)
      .sort((a, b) => {
        const dateA = new Date(a.progress!.lastAttemptedAt!).getTime();
        const dateB = new Date(b.progress!.lastAttemptedAt!).getTime();
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [problems]);

  // Format relative or calendar date
  const formatRecentDate = (isoStr?: string) => {
    if (!isoStr) return '';
    const date = new Date(isoStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const todayDateFormatted = new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Welcome & Command Banner */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Phase 3 Active • DSA Sheet & Persistent Dashboard
              </span>
              <Badge variant="solved">IndexedDB Device Storage</Badge>
              {streak > 0 && (
                <Badge variant="attempted" className="font-semibold text-amber-400">
                  <Flame className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {streak} Day Streak
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Placement Command Center
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Targeted placement preparation system. Zero logins, zero subscription paywalls, and complete data privacy—everything is stored persistently on your device.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button variant="primary" onClick={() => navigate('dsa')}>
              <Code2 className="mr-2 h-4 w-4" />
              Open 67 DSA Sheet
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('revision')}
              className={dsaStats.dueRevisions > 0 ? 'border-purple-500/50 text-purple-300' : ''}
            >
              <RotateCcw className="mr-2 h-4 w-4 text-purple-400" />
              <span>Revision</span>
              {dsaStats.dueRevisions > 0 && (
                <span className="ml-1.5 rounded-full bg-purple-500/20 px-1.5 py-0.2 text-[10px] font-bold text-purple-300">
                  {dsaStats.dueRevisions}
                </span>
              )}
            </Button>
            <Button variant="outline" onClick={() => navigate('settings')}>
              <HardDrive className="mr-2 h-4 w-4 text-emerald-400" />
              Backup
            </Button>
          </div>
        </div>
      </div>

      {/* Primary Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Metric 1: DSA Solved */}
        <Card
          className="cursor-pointer transition hover:border-zinc-700"
          onClick={() => navigate('dsa')}
        >
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span className="font-medium text-zinc-300">DSA Solved</span>
              <Code2 className="h-4 w-4 text-blue-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              {dsaLoading ? '...' : `${dsaStats.solved} / 67`}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${dsaStats.completionPercentage}%` }}
              />
            </div>
            <p className="flex justify-between text-[11px] text-zinc-400">
              <span>{dsaStats.completionPercentage}% completed</span>
              <span>{dsaStats.attempted} attempted</span>
            </p>
          </CardContent>
        </Card>

        {/* Metric 2: Consistency Streak */}
        <Card
          className="cursor-pointer transition hover:border-zinc-700"
          onClick={() => navigate('planner')}
        >
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span className="font-medium text-zinc-300">Consistency Streak</span>
              <Flame className="h-4 w-4 text-amber-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              {streak} {streak === 1 ? 'Day' : 'Days'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">
              {streak > 0
                ? 'Active streak! Daily momentum maintained.'
                : 'Solve 1 problem today to start your streak.'}
            </p>
          </CardContent>
        </Card>

        {/* Metric 3: Revisions Due */}
        <Card
          className="cursor-pointer transition hover:border-zinc-700"
          onClick={() => navigate('revision')}
        >
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span className="font-medium text-zinc-300">Revisions Due</span>
              <RotateCcw className="h-4 w-4 text-purple-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              {dsaLoading ? '...' : dsaStats.dueRevisions}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">
              {dsaStats.dueRevisions > 0
                ? `${dsaStats.dueRevisions} algorithms due for spaced review`
                : 'All intervals clear! None due today.'}
            </p>
          </CardContent>
        </Card>

        {/* Metric 4: Device Persistent Storage */}
        <Card
          className="cursor-pointer transition hover:border-zinc-700"
          onClick={() => navigate('settings')}
        >
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span className="font-medium text-zinc-300">Device Storage</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              {dbLoading ? '...' : `${totalUserRecords} Records`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400 truncate">
              {dbStats.lastBackupDate
                ? `Last backup: ${new Date(dbStats.lastBackupDate).toLocaleDateString()}`
                : 'IndexedDB active • Backup recommended'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Due Revision Alert (if items due) */}
      {dsaStats.dueRevisions > 0 && (
        <div className="flex items-center justify-between rounded-lg border border-purple-500/30 bg-purple-950/20 p-4 text-zinc-200">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-purple-500/20 p-2 text-purple-400">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-purple-200">
                Spaced Revision Due Today ({dsaStats.dueRevisions} problem{dsaStats.dueRevisions > 1 ? 's' : ''})
              </h4>
              <p className="text-xs text-zinc-400">
                Re-solving algorithms at planned intervals (1, 3, 7, 21, 60 days) commits problem patterns to long-term memory.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('dsa')}
            className="border-purple-500/40 text-purple-300 hover:bg-purple-900/30 whitespace-nowrap"
          >
            Review in DSA Sheet
          </Button>
        </div>
      )}

      {/* Main 2-Column Section: Category Breakdown + Difficulty & Daily Targets */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (7 cols): DSA Category Breakdown */}
        <div className="space-y-4 lg:col-span-7">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-white">
                    DSA Curriculum Mastery
                  </CardTitle>
                  <CardDescription>
                    Progress across all 11 curated problem patterns (67 problems total)
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('dsa')}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  View All <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {dsaStats.categories.map((cat) => (
                <div
                  key={cat.category}
                  onClick={() => navigate('dsa')}
                  className="group cursor-pointer rounded-md p-2 transition hover:bg-zinc-900/60"
                >
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-300 group-hover:text-blue-400 transition-colors">
                      {cat.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-zinc-400">
                        {cat.solved} / {cat.total} solved
                      </span>
                      <span className="w-8 text-right font-mono text-[11px] font-semibold text-zinc-400">
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className={`h-full transition-all duration-500 ${
                        cat.percentage === 100
                          ? 'bg-emerald-500'
                          : cat.percentage > 50
                          ? 'bg-blue-500'
                          : cat.percentage > 0
                          ? 'bg-amber-500'
                          : 'bg-zinc-700'
                      }`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (5 cols): Difficulty Distribution & Daily Planner Target */}
        <div className="space-y-6 lg:col-span-5">
          {/* Difficulty Distribution Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-white">
                Difficulty Breakdown
              </CardTitle>
              <CardDescription>Solved count by problem complexity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {dsaStats.difficulties.map((diff) => {
                const colorMap = {
                  Easy: {
                    bar: 'bg-emerald-500',
                    badge: 'easy' as const,
                    text: 'text-emerald-400',
                  },
                  Medium: {
                    bar: 'bg-amber-500',
                    badge: 'attempted' as const,
                    text: 'text-amber-400',
                  },
                  Hard: {
                    bar: 'bg-rose-500',
                    badge: 'urgent' as const,
                    text: 'text-rose-400',
                  },
                };
                const config = colorMap[diff.difficulty];

                return (
                  <div key={diff.difficulty} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Badge variant={config.badge} className="px-2 py-0 text-[10px]">
                          {diff.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-zinc-200">
                          {diff.solved} / {diff.total}
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          ({diff.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className={`h-full ${config.bar} transition-all duration-500`}
                        style={{ width: `${diff.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Today's Target Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-white">
                    Today's Target
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5 mt-0.5">
                    <Calendar className="h-3 w-3 text-zinc-400" />
                    <span>{todayDateFormatted}</span>
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('planner')}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Planner <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">DSA Problem Goal:</span>
                  <span className="font-semibold text-white">
                    {dailyPlanner?.actualProblemsCount || 0} / {dailyPlanner?.targetProblemsCount || 3} problems
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round(
                          ((dailyPlanner?.actualProblemsCount || 0) /
                            (dailyPlanner?.targetProblemsCount || 3)) *
                            100
                        )
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                  <span>Focus Study Time:</span>
                  <span className="font-medium text-zinc-300">
                    {dailyPlanner?.studyMinutes || 0} mins logged
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => navigate('dsa')}
                >
                  <Code2 className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
                  Solve Problems Today
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Problem Activity Stream */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-white">
                Recent Problem Activity
              </CardTitle>
              <CardDescription>
                Recently attempted and solved questions from your local preparation history
              </CardDescription>
            </div>
            {recentProblems.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('dsa')}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Go to DSA Sheet <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {recentProblems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 py-8 text-center">
              <div className="rounded-full bg-zinc-900 p-3 text-zinc-500 mb-3">
                <Sparkles className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-300">No DSA activity recorded yet</h4>
              <p className="text-xs text-zinc-400 max-w-md mt-1 mb-4">
                Open the 67-Problem DSA Sheet to solve questions, take notes, and build your personalized revision queue.
              </p>
              <Button variant="primary" size="sm" onClick={() => navigate('dsa')}>
                <Code2 className="mr-2 h-4 w-4" />
                Start Solving Problems
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/80">
              {recentProblems.map((p) => {
                const status = p.progress?.status || 'not_started';
                const statusBadge =
                  status === 'solved'
                    ? { variant: 'solved' as const, label: 'Solved' }
                    : status === 'revise'
                    ? { variant: 'revise' as const, label: 'Revise' }
                    : { variant: 'attempted' as const, label: 'Attempted' };

                const diffBadge =
                  p.difficulty === 'Easy'
                    ? 'easy'
                    : p.difficulty === 'Medium'
                    ? 'attempted'
                    : 'urgent';

                return (
                  <div
                    key={p.id}
                    className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between transition hover:bg-zinc-900/40 px-2 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 font-mono text-xs text-zinc-400 font-semibold">
                        #{p.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedProblem(p)}
                            className="text-xs font-semibold text-zinc-200 hover:text-blue-400 text-left transition-colors"
                          >
                            {p.title}
                          </button>
                          <Badge variant={diffBadge as any} className="px-1.5 py-0 text-[10px]">
                            {p.difficulty}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-zinc-400">
                          {p.category} • Pattern: {p.pattern}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <Badge variant={statusBadge.variant} className="text-[11px]">
                        {statusBadge.label}
                      </Badge>
                      <span className="text-[11px] text-zinc-400">
                        {formatRecentDate(p.progress?.lastAttemptedAt)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedProblem(p)}
                        className="h-7 text-xs text-zinc-400 hover:text-white"
                      >
                        Inspect
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preparation Roadmap Pillars Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-zinc-200">Preparation Roadmap Pillars</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Module B: DSA */}
          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('dsa')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="solved">Module B • Active</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base flex items-center gap-2">
                <Code2 className="h-4 w-4 text-blue-400" />
                <span>67 DSA Placement Sheet</span>
              </CardTitle>
              <CardDescription>
                Arrays, Strings, Two Pointers, Trees, Graphs, DP and verified C++ solutions.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Module C: C++ */}
          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('cpp')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Module C</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base flex items-center gap-2">
                <Terminal className="h-4 w-4 text-amber-400" />
                <span>C++ Placement Mastery</span>
              </CardTitle>
              <CardDescription>
                Pointers, memory layout, STL containers, virtual tables, OOP, and modern C++.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Module D: SQL */}
          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('sql')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Module D</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base flex items-center gap-2">
                <Database className="h-4 w-4 text-cyan-400" />
                <span>SQL Query & Schema</span>
              </CardTitle>
              <CardDescription>
                Complex joins, window functions, indexing, normalization, and query optimizations.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Module E: Core CS */}
          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('core-cs')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Module E</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-400" />
                <span>Core CS Essentials</span>
              </CardTitle>
              <CardDescription>
                Operating Systems, DBMS, Computer Networks, and Software Engineering.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Module G: Spaced Revision */}
          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('revision')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="revise">Module G</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-purple-400" />
                <span>Spaced Revision Engine</span>
              </CardTitle>
              <CardDescription>
                Automatic intervals (1, 3, 7, 21, 60 days) to prevent forgetting algorithms.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Module H: Planner & Timer */}
          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('planner')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Module H</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-rose-400" />
                <span>Daily Study Planner</span>
              </CardTitle>
              <CardDescription>
                Daily targets, custom tasks, study streak, and Pomodoro focus timer.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Problem Detail Modal (if a recent item is clicked) */}
      {selectedProblem && (
        <ProblemDetailModal
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
          onUpdateStatus={async (id, status) => {
            await updateStatus(id, status);
            setSelectedProblem((prev) =>
              prev ? { ...prev, progress: { ...prev.progress, id, status } as any } : null
            );
          }}
          onToggleBookmark={async (id) => {
            await toggleBookmark(id);
            setSelectedProblem((prev) =>
              prev
                ? {
                    ...prev,
                    progress: {
                      ...prev.progress,
                      id,
                      bookmarked: !prev.progress?.bookmarked,
                    } as any,
                  }
                : null
            );
          }}
          onSaveNotes={async (id, notes) => {
            await saveNotes(id, notes);
          }}
          onCompleteRevision={async (id, rating) => {
            await completeRevision(id, rating);
          }}
        />
      )}
    </div>
  );
};