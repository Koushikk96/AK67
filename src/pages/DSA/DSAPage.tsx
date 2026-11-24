import React, { useState, useMemo } from 'react';
import { useDSAProblems } from '@/hooks/useDSAProblems';
import { DSAProblemWithProgress, DSACategory } from '@/types/dsa';
import { useDSALanguagePreference, VALID_DSA_LANGUAGES, getLanguageDisplayLabel } from '@/utils/dsaLanguage';
import { ProblemDifficulty, ProblemStatus } from '@/types/database';
import { ProblemDetailModal } from '@/components/dsa/ProblemDetailModal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Search,
  Bookmark,
  CheckCircle2,
  ArrowUpDown,
  ChevronRight,
} from 'lucide-react';

export const DSAPage: React.FC = () => {
  const {
    problems,
    stats,
    loading,
    updateStatus,
    toggleBookmark,
    saveNotes,
    completeRevision,
  } = useDSAProblems();

  // Active filters and query
  const [searchQuery, setSearchQuery] = useState('');
  const { language: preferredLanguage, setLanguage: setPreferredLanguage } = useDSALanguagePreference();
  const [selectedCategory, setSelectedCategory] = useState<DSACategory | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ProblemDifficulty | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<ProblemStatus | 'all' | 'bookmarked' | 'due'>('all');
  const [sortBy, setSortBy] = useState<'number' | 'difficulty' | 'title'>('number');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Active selected problem for detail modal
  const [activeProblem, setActiveProblem] = useState<DSAProblemWithProgress | null>(null);

  // Multi-criteria filtering logic
  const filteredProblems = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];

    return problems
      .filter((p) => {
        // 1. Text search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchPattern = p.pattern.toLowerCase().includes(q);
          const matchNumber = String(p.number) === q.replace('#', '').trim();
          const matchConcepts = p.keyConcepts.some((c) => c.toLowerCase().includes(q));
          if (!matchTitle && !matchPattern && !matchNumber && !matchConcepts) {
            return false;
          }
        }

        // 2. Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }

        // 3. Difficulty filter
        if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) {
          return false;
        }

        // 4. Status / Bookmark / Due filter
        const currentStatus = p.progress?.status || 'not_started';
        if (selectedStatus === 'bookmarked') {
          if (!p.progress?.bookmarked) return false;
        } else if (selectedStatus === 'due') {
          if (!p.progress?.nextRevisionDate || p.progress.nextRevisionDate > today) return false;
        } else if (selectedStatus !== 'all') {
          if (currentStatus !== selectedStatus) return false;
        }

        return true;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortBy === 'number') {
          cmp = a.number - b.number;
        } else if (sortBy === 'title') {
          cmp = a.title.localeCompare(b.title);
        } else if (sortBy === 'difficulty') {
          const rank = { Easy: 1, Medium: 2, Hard: 3 };
          cmp = rank[a.difficulty] - rank[b.difficulty];
        }
        return sortOrder === 'asc' ? cmp : -cmp;
      });
  }, [problems, searchQuery, selectedCategory, selectedDifficulty, selectedStatus, sortBy, sortOrder]);

  // Keep activeProblem synchronized with live progress updates
  const currentActiveProblem = useMemo(() => {
    if (!activeProblem) return null;
    return problems.find((p) => p.id === activeProblem.id) || activeProblem;
  }, [activeProblem, problems]);

  return (
    <div className="space-y-6">
      {/* Module Header & Progress Card */}
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Module B • Curated Placement Sheet
              </span>
              <Badge variant="solved">67 High-Yield Problems</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              67 DSA Placement Sheet
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Master the exact 67 problems asked repeatedly in technical rounds. Each problem features progressive hints, complexity targets, verified C++, Python, and Java solutions (201 solutions total), and spaced revision scheduling.
            </p>
            <div className="flex items-center gap-2 pt-1.5 flex-wrap">
              <span className="text-xs text-zinc-400 font-medium">Preferred Language:</span>
              <div
                className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950 p-0.5"
                role="tablist"
                aria-label="Preferred DSA Solution Language"
              >
                {VALID_DSA_LANGUAGES.map((lang) => {
                  const label = getLanguageDisplayLabel(lang);
                  const isCurrent = preferredLanguage === lang;
                  return (
                    <button
                      key={lang}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      onClick={() => setPreferredLanguage(lang)}
                      className={`rounded px-2.5 py-0.5 text-xs font-semibold transition ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">(C++, Python, Java available)</span>
            </div>
          </div>

          {/* Overall Completion Gauge */}
          <div className="flex items-center gap-4 border-t border-zinc-800/80 pt-4 lg:border-t-0 lg:pt-0">
            <div className="text-right">
              <p className="text-xs text-zinc-400">Total Solved</p>
              <p className="text-2xl font-black text-white">
                {stats.solved} <span className="text-xs font-normal text-zinc-500">/ 67</span>
              </p>
              <p className="text-[11px] text-emerald-400 font-semibold">{stats.completionPercentage}% Complete</p>
            </div>

            <div className="w-32 sm:w-40 space-y-1">
              <div className="h-2.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${stats.completionPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>{stats.attempted} attempted</span>
                <span>{stats.dueRevisions} due</span>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown Strip */}
        <div className="mt-5 grid grid-cols-3 gap-2.5 pt-4 border-t border-zinc-800/60">
          {stats.difficulties.map((d) => (
            <div
              key={d.difficulty}
              className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-2 text-center"
            >
              <span className="text-[11px] font-medium text-zinc-400">{d.difficulty}</span>
              <p className="text-sm font-bold text-zinc-200 mt-0.5">
                {d.solved} <span className="text-[10px] font-normal text-zinc-500">/ {d.total}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Filter by Category
          </span>
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-xs text-blue-400 hover:underline"
          >
            Reset Category
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-medium transition ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All Categories (67)
          </button>
          {stats.categories.map((c) => (
            <button
              key={c.category}
              onClick={() => setSelectedCategory(c.category)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition flex items-center gap-1.5 ${
                selectedCategory === c.category
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>{c.category}</span>
              <span className="text-[10px] opacity-75">({c.solved}/{c.total})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search, Filter Controls & Sorting Toolbar */}
      <div className="flex flex-col gap-3 rounded-lg border border-zinc-800 bg-[#121215] p-3.5 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 67 problems by title, pattern (e.g. 'Two Pointers'), or #number..."
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 pl-9 pr-8 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-white text-xs"
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as any)}
            className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="solved">Solved Only</option>
            <option value="attempted">Attempted</option>
            <option value="revise">Marked Revise</option>
            <option value="not_started">Unsolved</option>
            <option value="bookmarked">Bookmarked Only</option>
            <option value="due">Revision Due Today</option>
          </select>

          {/* Sort By Field */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'number' | 'difficulty' | 'title')}
            className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="number">Sort: Problem #</option>
            <option value="difficulty">Sort: Difficulty</option>
            <option value="title">Sort: Title</option>
          </select>

          {/* Sort Order Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
            className="h-8 gap-1.5 border-zinc-800 bg-zinc-950 px-2 text-xs text-zinc-400 hover:text-white"
            title={`Sorting: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span className="hidden sm:inline uppercase text-[10px]">{sortOrder}</span>
          </Button>
        </div>
      </div>

      {/* Filter Result Counter */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <span>
          Showing <span className="font-semibold text-zinc-200">{filteredProblems.length}</span> of 67 problems
        </span>
        {(searchQuery || selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedStatus !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSelectedStatus('all');
            }}
            className="text-blue-400 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Problems List Table / Cards */}
      {loading ? (
        <div className="py-12 text-center text-xs text-zinc-500 animate-pulse">
          Loading 67-problem curriculum from storage...
        </div>
      ) : filteredProblems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-zinc-300">No problems match your current filters</p>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Try clearing the search query or adjusting category, difficulty, or status dropdowns.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSelectedStatus('all');
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredProblems.map((p) => {
            const status = p.progress?.status || 'not_started';
            const isBookmarked = p.progress?.bookmarked || false;
            const diffVariant =
              p.difficulty === 'Easy'
                ? 'easy'
                : p.difficulty === 'Medium'
                ? 'attempted'
                : 'urgent';

            const isDueToday =
              p.progress?.nextRevisionDate &&
              p.progress.nextRevisionDate <= new Date().toISOString().split('T')[0] &&
              (status === 'solved' || status === 'revise');

            return (
              <div
                key={p.id}
                className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border p-3.5 transition ${
                  status === 'solved'
                    ? 'border-zinc-800/80 bg-[#121215]/80 hover:border-zinc-700'
                    : status === 'attempted'
                    ? 'border-amber-500/30 bg-[#121215] hover:border-amber-500/50'
                    : status === 'revise'
                    ? 'border-purple-500/30 bg-[#121215] hover:border-purple-500/50'
                    : 'border-zinc-800 bg-[#121215] hover:border-zinc-700'
                }`}
              >
                {/* Left Problem Info */}
                <div
                  onClick={() => setActiveProblem(p)}
                  className="flex items-start sm:items-center gap-3 cursor-pointer flex-1"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-900 font-mono text-xs font-bold text-zinc-400 border border-zinc-800">
                    {p.number}
                  </span>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm text-zinc-100 group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h3>
                      <Badge variant={diffVariant} className="text-[10px] px-1.5 py-0">
                        {p.difficulty}
                      </Badge>
                      {isDueToday && (
                        <Badge variant="revise" className="text-[10px] px-1.5 py-0 animate-pulse">
                          Revision Due
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <span>{p.category}</span>
                      <span>•</span>
                      <span className="text-zinc-500 font-mono">{p.pattern}</span>
                      <span>•</span>
                      <span className="text-zinc-500">{p.timeComplexity}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-850">
                  {/* Status Toggle Button */}
                  <button
                    onClick={() =>
                      updateStatus(p.id, status === 'solved' ? 'attempted' : 'solved')
                    }
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                      status === 'solved'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : status === 'attempted'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : status === 'revise'
                        ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>
                      {status === 'solved'
                        ? 'Solved'
                        : status === 'attempted'
                        ? 'Attempted'
                        : status === 'revise'
                        ? 'Revise'
                        : 'Solve'}
                    </span>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(p.id)}
                    className="p-1.5 text-zinc-400 hover:text-amber-400 rounded-md hover:bg-zinc-800"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark problem'}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`}
                    />
                  </button>

                  {/* View Details Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveProblem(p)}
                    className="h-8 gap-1 text-xs border-zinc-800 bg-zinc-900"
                  >
                    <span>Details</span>
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Problem Detail Modal */}
      {currentActiveProblem && (
        <ProblemDetailModal
          problem={currentActiveProblem}
          onClose={() => setActiveProblem(null)}
          onUpdateStatus={updateStatus}
          onToggleBookmark={toggleBookmark}
          onSaveNotes={saveNotes}
          onCompleteRevision={completeRevision}
        />
      )}
    </div>
  );
};
