import React, { useState, useEffect, useMemo } from 'react';
import { analyticsService, UnifiedAnalyticsData } from '@/services/analyticsService';
import { useDSALanguagePreference, getLanguageDisplayLabel } from '@/utils/dsaLanguage';
import { RouteId } from '@/types/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  TrendingUp,
  Target,
  Award,
  AlertTriangle,
  Clock,
  Flame,
  Layers,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface AnalyticsPageProps {
  navigate?: (route: RouteId) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ navigate }) => {
  const [data, setData] = useState<UnifiedAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { language: preferredLanguage } = useDSALanguagePreference();

  // Active view tab
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'mocks' | 'weak-areas'>('overview');

  // Mock test filter states
  const [mockCategoryFilter, setMockCategoryFilter] = useState<string>('all');
  const [mockDateRangeFilter, setMockDateRangeFilter] = useState<'all' | '7d' | '30d'>('all');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await analyticsService.getUnifiedAnalytics();
        setData(res);
      } catch (e) {
        console.error('[AnalyticsPage] Failed to load unified analytics:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filtered mock tests
  const filteredMocks = useMemo(() => {
    if (!data) return [];
    return data.mockHistory.filter((mt) => {
      if (mockCategoryFilter !== 'all' && mt.category !== mockCategoryFilter) {
        return false;
      }
      if (mockDateRangeFilter !== 'all') {
        const testDate = new Date(mt.completedAt).getTime();
        const daysAgo = mockDateRangeFilter === '7d' ? 7 : 30;
        const cutoff = Date.now() - daysAgo * 24 * 60 * 60 * 1000;
        if (testDate < cutoff) return false;
      }
      return true;
    });
  }, [data, mockCategoryFilter, mockDateRangeFilter]);

  if (loading || !data) {
    return (
      <div className="py-20 text-center text-xs text-zinc-500 animate-pulse">
        Aggregating local placement metrics across all 188 curriculum items and test history...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module L</span>
          <Badge variant="outline">Unified Placement Metrics</Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Placement Readiness Analytics</h1>
            <p className="text-xs text-zinc-400 max-w-2xl mt-1">
              Honest, non-sugarcoated preparation metrics aggregated across 188 curriculum items (67 DSA, 17 C++, 21 SQL, 47 Core CS, 36 Aptitude), spaced revisions, and actual mock tests.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-zinc-300">
              {data.totalCompletedCount} / {data.totalCurriculumCount} Completed ({data.overallCompletionPercentage}%)
            </Badge>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Readiness Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'subjects'
              ? 'bg-blue-600 text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Subject Breakdown (10)</span>
        </button>

        <button
          onClick={() => setActiveTab('mocks')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'mocks'
              ? 'bg-blue-600 text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Award className="h-3.5 w-3.5" />
          <span>Mock Test Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('weak-areas')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'weak-areas'
              ? 'bg-blue-600 text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
          <span>Weak Area Diagnosis ({data.weakAreas.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: READINESS OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 4 Core Gauge Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader className="p-4 pb-2">
                <CardDescription className="text-xs flex items-center justify-between">
                  <span>Overall Curriculum</span>
                  <Target className="h-4 w-4 text-blue-400" />
                </CardDescription>
                <CardTitle className="text-2xl font-bold text-white mt-1">
                  {data.overallCompletionPercentage}%
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${data.overallCompletionPercentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-zinc-400 mt-2">
                  {data.totalCompletedCount} of 188 topics completed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader className="p-4 pb-2">
                <CardDescription className="text-xs flex items-center justify-between">
                  <span>Current Study Streak</span>
                  <Flame className="h-4 w-4 text-amber-400" />
                </CardDescription>
                <CardTitle className="text-2xl font-bold text-amber-300 mt-1">
                  {data.activity.currentStreak} Days
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-[11px] text-zinc-400">
                <span>Longest streak: <strong>{data.activity.longestStreak} days</strong></span>
                <p className="text-zinc-500 mt-1">Consecutive calendar study days</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader className="p-4 pb-2">
                <CardDescription className="text-xs flex items-center justify-between">
                  <span>Study Time Logged</span>
                  <Clock className="h-4 w-4 text-emerald-400" />
                </CardDescription>
                <CardTitle className="text-2xl font-bold text-emerald-300 mt-1">
                  {Math.round(data.totalStudyMinutes / 60)}h {data.totalStudyMinutes % 60}m
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-[11px] text-zinc-400">
                <span>{data.activity.weeklyMinutes}m past 7 days</span>
                <p className="text-zinc-500 mt-1">Focus timer & coding sprints</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/40 border-zinc-800">
              <CardHeader className="p-4 pb-2">
                <CardDescription className="text-xs flex items-center justify-between">
                  <span>Mock Assessments</span>
                  <Award className="h-4 w-4 text-purple-400" />
                </CardDescription>
                <CardTitle className="text-2xl font-bold text-purple-300 mt-1">
                  {data.totalMockTestsAttempted}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-[11px] text-zinc-400">
                <span>Avg: <strong>{data.averageMockScorePercentage}%</strong> • Peak: <strong>{data.highestMockScorePercentage}%</strong></span>
                <p className="text-zinc-500 mt-1">Overall accuracy: {data.averageMockAccuracyPercentage}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Curriculum Item Breakdown Status */}
          <Card className="bg-zinc-900/40 border-zinc-800">
            <CardHeader className="pb-3 border-b border-zinc-800">
              <CardTitle className="text-sm font-semibold text-zinc-200">
                Curriculum Preparation Status (188 Total Items)
              </CardTitle>
              <CardDescription className="text-xs">
                Accurate aggregate across DSA (67 problems • 201 C++, Python, Java solutions), C++ (17), SQL (21), Core CS (47), and Aptitude (36).
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                  <span className="text-zinc-400 font-medium">Completed / Mastered:</span>
                  <div className="text-xl font-bold text-emerald-400 mt-1">
                    {data.totalCompletedCount}
                  </div>
                  <span className="text-[11px] text-zinc-500">{data.overallCompletionPercentage}% of target</span>
                </div>

                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                  <span className="text-zinc-400 font-medium">In Progress (Learning):</span>
                  <div className="text-xl font-bold text-blue-400 mt-1">
                    {data.totalLearningCount}
                  </div>
                  <span className="text-[11px] text-zinc-500">Attempted topics</span>
                </div>

                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                  <span className="text-zinc-400 font-medium">In Spaced Revision Queue:</span>
                  <div className="text-xl font-bold text-purple-400 mt-1">
                    {data.totalRevisionCount}
                  </div>
                  <span className="text-[11px] text-zinc-500">Active recall schedule</span>
                </div>

                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                  <span className="text-zinc-400 font-medium">Unstarted / Remaining:</span>
                  <div className="text-xl font-bold text-zinc-400 mt-1">
                    {data.totalCurriculumCount - data.totalCompletedCount - data.totalLearningCount}
                  </div>
                  <span className="text-[11px] text-zinc-500">To be covered</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 30-Day Activity Calendar Heatmap */}
          <Card className="bg-zinc-900/40 border-zinc-800">
            <CardHeader className="pb-3 border-b border-zinc-800">
              <CardTitle className="text-sm font-semibold text-zinc-200 flex items-center justify-between">
                <span>Recent 30-Day Study Consistency</span>
                <span className="text-xs text-zinc-500 font-mono font-normal">
                  {data.activity.monthlyMinutes} mins total
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-2">
                {Array.from({ length: 30 }).map((_, idx) => {
                  const d = new Date();
                  d.setDate(d.getDate() - (29 - idx));
                  const dStr = d.toISOString().split('T')[0];
                  const mins = data.activity.activityHeatmap[dStr] || 0;

                  let bgClass = 'bg-zinc-800/40 border-zinc-800 text-zinc-500';
                  if (mins >= 60) bgClass = 'bg-emerald-500 border-emerald-400 text-black font-bold';
                  else if (mins >= 30) bgClass = 'bg-emerald-600/70 border-emerald-500 text-white font-semibold';
                  else if (mins > 0) bgClass = 'bg-emerald-800/40 border-emerald-700 text-emerald-200';

                  return (
                    <div
                      key={dStr}
                      className={`h-9 rounded-md border flex flex-col items-center justify-center text-[10px] transition ${bgClass}`}
                      title={`${dStr}: ${mins} minutes logged`}
                    >
                      <span>{d.getDate()}</span>
                      {mins > 0 && <span className="text-[8px] leading-none opacity-80">{mins}m</span>}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-end gap-3 text-[11px] text-zinc-400 pt-3">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded bg-zinc-800/60 border border-zinc-700" />
                  0m
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded bg-emerald-800/40 border border-emerald-700" />
                  &lt;30m
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded bg-emerald-600/70 border border-emerald-500" />
                  30-60m
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded bg-emerald-500 border border-emerald-400" />
                  60m+
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SUBJECT BREAKDOWN (10 PILLARS) */}
      {/* ========================================================================= */}
      {activeTab === 'subjects' && (
        <div className="space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-semibold text-zinc-200">10-Pillar Placement Curriculum Health</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Live tracking across each technical discipline with completion percentages, revision queues, and mock test accuracy.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {data.subjects.map((sub) => (
              <Card key={sub.id} className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition">
                <CardHeader className="p-4 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      {sub.categoryKey}
                    </span>
                    <Badge
                      variant={
                        sub.completionPercentage >= 80
                          ? 'solved'
                          : sub.completionPercentage >= 40
                          ? 'attempted'
                          : 'outline'
                      }
                    >
                      {sub.completionPercentage}% Done
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-bold text-white mt-1">
                    {sub.name}
                  </CardTitle>
                  {sub.id === 'dsa' && (
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      201 solutions (C++, Python, Java) • Active:{' '}
                      <span className="font-semibold text-blue-400">
                        {getLanguageDisplayLabel(preferredLanguage)}
                      </span>
                    </p>
                  )}
                </CardHeader>

                <CardContent className="p-4 pt-0 space-y-3">
                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${sub.completionPercentage}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs pt-1 border-t border-zinc-800/80">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">Completed:</span>
                      <strong className="text-zinc-200">{sub.completedTopics}/{sub.totalTopics}</strong>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-[10px]">Revision Due:</span>
                      <strong className={sub.revisionBacklog > 0 ? 'text-purple-400' : 'text-zinc-400'}>
                        {sub.revisionBacklog} topics
                      </strong>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-[10px]">Mock Acc:</span>
                      <strong className={sub.mockAccuracy !== undefined ? 'text-emerald-400' : 'text-zinc-500'}>
                        {sub.mockAccuracy !== undefined ? `${sub.mockAccuracy}%` : 'N/A'}
                      </strong>
                    </div>
                  </div>

                  {navigate && (
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => navigate(sub.route)}
                        className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        Open Module <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MOCK TEST ANALYTICS */}
      {/* ========================================================================= */}
      {activeTab === 'mocks' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-800 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-zinc-200">Assessment History & Scoring Trends</h2>
              <p className="text-xs text-zinc-400">Computed strictly from saved mock test records in IndexedDB.</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={mockCategoryFilter}
                onChange={(e) => setMockCategoryFilter(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="mixed">Mixed Full Placement</option>
                <option value="technical">Technical MCQs</option>
                <option value="quantitative">Quantitative Aptitude</option>
                <option value="logical">Logical Reasoning</option>
                <option value="verbal">Verbal Ability</option>
              </select>

              <select
                value={mockDateRangeFilter}
                onChange={(e) => setMockDateRangeFilter(e.target.value as any)}
                className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
              >
                <option value="all">All Time</option>
                <option value="30d">Last 30 Days</option>
                <option value="7d">Last 7 Days</option>
              </select>
            </div>
          </div>

          {filteredMocks.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-500 bg-zinc-900/20 rounded-lg border border-zinc-800">
              No mock test attempts recorded under this filter yet. Practice a timed test in Mock Test Centre to view scoring trends.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                  <span className="text-xs text-zinc-400">Total Filtered Tests</span>
                  <div className="text-xl font-bold text-white mt-0.5">{filteredMocks.length}</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                  <span className="text-xs text-zinc-400">Average Score</span>
                  <div className="text-xl font-bold text-blue-400 mt-0.5">
                    {Math.round(filteredMocks.reduce((acc, t) => acc + t.score, 0) / filteredMocks.length)}%
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                  <span className="text-xs text-zinc-400">Peak Score</span>
                  <div className="text-xl font-bold text-emerald-400 mt-0.5">
                    {Math.max(...filteredMocks.map((t) => t.score))}%
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                  <span className="text-xs text-zinc-400">Avg Time per Test</span>
                  <div className="text-xl font-bold text-purple-400 mt-0.5">
                    {Math.round(
                      filteredMocks.reduce((acc, t) => acc + (t.durationSeconds || 0), 0) /
                        (filteredMocks.length * 60)
                    )}m
                  </div>
                </div>
              </div>

              {/* Chronological Test Records */}
              <Card className="bg-zinc-900/40 border-zinc-800">
                <CardHeader className="pb-3 border-b border-zinc-800">
                  <CardTitle className="text-sm font-semibold text-zinc-200">Chronological Attempts</CardTitle>
                </CardHeader>
                <CardContent className="pt-2 divide-y divide-zinc-800/80">
                  {filteredMocks.map((t) => (
                    <div key={t.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-zinc-100">{t.title}</span>
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {t.category}
                          </Badge>
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          {new Date(t.completedAt).toLocaleDateString()} at {new Date(t.completedAt).toLocaleTimeString()} • {Math.floor((t.durationSeconds || 0) / 60)}m spent
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <div className="text-right">
                          <span className="font-bold text-white">{t.score.toFixed(1)}</span>
                          <span className="text-zinc-500"> / {t.totalQuestions}</span>
                        </div>
                        <Badge
                          variant={t.score >= 70 ? 'solved' : t.score >= 50 ? 'attempted' : 'urgent'}
                        >
                          {t.correctCount}/{t.totalQuestions} Correct
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: WEAK AREA DIAGNOSIS */}
      {/* ========================================================================= */}
      {activeTab === 'weak-areas' && (
        <div className="space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>Diagnosed Weak Areas & Action Plan</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Data-backed diagnostic signals: Low mock test accuracy (&lt;60%), unresolved revision backlogs, or difficult coding problems.
            </p>
          </div>

          {data.weakAreas.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-400 bg-zinc-900/30 rounded-lg border border-zinc-800 space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
              <p className="font-semibold text-zinc-200">No Critical Weak Areas Detected!</p>
              <p className="text-zinc-500 max-w-md mx-auto">
                All attempted subjects are meeting benchmark accuracy (&gt;= 70%) and spaced revisions are on schedule. Continue practicing mock tests to discover edge cases.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.weakAreas.map((w) => (
                <Card
                  key={w.id}
                  className={`bg-zinc-900/40 border transition ${
                    w.severity === 'needs_improvement'
                      ? 'border-rose-500/30 hover:border-rose-500/50'
                      : 'border-amber-500/30 hover:border-amber-500/50'
                  }`}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={w.severity === 'needs_improvement' ? 'urgent' : 'attempted'}
                          className="capitalize text-[10px]"
                        >
                          {w.severity.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          {w.subject}
                        </Badge>
                      </div>

                      {navigate && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(w.linkRoute)}
                          className="text-xs h-7 gap-1"
                        >
                          Address Now <ChevronRight className="h-3 w-3" />
                        </Button>
                      )}
                    </div>

                    <CardTitle className="text-sm font-bold text-white mt-2">
                      {w.topicTitle}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-4 pt-1 space-y-2 text-xs">
                    <div className="text-zinc-300">
                      <strong className="text-rose-400 font-medium">Issue: </strong>
                      {w.flagReason}
                    </div>

                    <div className="text-zinc-400">
                      <strong className="text-zinc-300 font-medium">Evidence: </strong>
                      {w.supportingData}
                    </div>

                    <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-[11px] text-blue-300">
                      <strong>Recommended Action: </strong>
                      {w.recommendedAction}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
