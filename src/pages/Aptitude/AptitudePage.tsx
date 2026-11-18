import React, { useState, useMemo } from 'react';
import { useAptitudeTopics } from '@/hooks/useAptitudeTopics';
import { AptitudeTopicWithProgress, AptitudeCategory } from '@/types/aptitude';
import { TopicStatus } from '@/types/database';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AptitudeTopicModal } from '@/components/aptitude/AptitudeTopicModal';
import {
  Calculator,
  Compass,
  BookOpen,
  Search,
  Bookmark,
  ArrowRight,
} from 'lucide-react';

export const AptitudePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<AptitudeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TopicStatus | 'all' | 'bookmarked'>('all');
  const [activeTopic, setActiveTopic] = useState<AptitudeTopicWithProgress | null>(null);

  const {
    topics,
    stats,
    updateStatus,
    toggleBookmark,
    saveNotes,
  } = useAptitudeTopics(selectedCategory);

  // Filter topics by search query and status
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchExplanation = t.explanation.toLowerCase().includes(q);
        const matchFormulas = t.formulas.some((f) => f.toLowerCase().includes(q));
        if (!matchTitle && !matchExplanation && !matchFormulas) return false;
      }

      const status: TopicStatus =
        t.progress?.status || (t.progress?.isMastered ? 'completed' : 'not_started');

      if (statusFilter === 'bookmarked') {
        if (!t.progress?.completedCheckpoints?.includes('bookmark')) return false;
      } else if (statusFilter !== 'all') {
        if (status !== statusFilter) return false;
      }

      return true;
    });
  }, [topics, searchQuery, statusFilter]);

  // Keep active topic synchronized with live progress updates
  const currentActiveTopic = useMemo(() => {
    if (!activeTopic) return null;
    return topics.find((t) => t.id === activeTopic.id) || activeTopic;
  }, [topics, activeTopic]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module F</span>
          <Badge variant="outline">Campus Placement Screening</Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Aptitude & Logical Reasoning</h1>
            <p className="text-xs text-zinc-400 max-w-2xl mt-1">
              Curated speed math, analytical reasoning, and verbal accuracy topics with 180 practice questions for fresher OA rounds.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xl font-bold text-white">{stats.completedTopics}</span>
              <span className="text-xs text-zinc-500"> / {stats.totalTopics} Topics</span>
              <div className="text-[11px] text-emerald-400 font-medium">
                {stats.completionPercentage}% Mastered
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {/* Quantitative */}
        <Card
          onClick={() => setSelectedCategory('quantitative')}
          className={`cursor-pointer transition-all border ${
            selectedCategory === 'quantitative'
              ? 'border-blue-500 bg-blue-950/20'
              : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
          }`}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Calculator className="w-4 h-4" />
                </div>
                <CardTitle className="text-sm font-semibold text-white">Quantitative</CardTitle>
              </div>
              <span className="text-xs font-bold text-zinc-300">
                {stats.quantProgress.completed} / {stats.quantProgress.total}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-2">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{
                  width: `${
                    stats.quantProgress.total > 0
                      ? (stats.quantProgress.completed / stats.quantProgress.total) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
            <p className="text-[11px] text-zinc-400">
              Percentages, Profit & Loss, SI/CI, Work, Speed & DI (16 topics)
            </p>
          </CardContent>
        </Card>

        {/* Logical */}
        <Card
          onClick={() => setSelectedCategory('logical')}
          className={`cursor-pointer transition-all border ${
            selectedCategory === 'logical'
              ? 'border-purple-500 bg-purple-950/20'
              : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
          }`}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Compass className="w-4 h-4" />
                </div>
                <CardTitle className="text-sm font-semibold text-white">Logical Reasoning</CardTitle>
              </div>
              <span className="text-xs font-bold text-zinc-300">
                {stats.logicalProgress.completed} / {stats.logicalProgress.total}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-2">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-purple-500 h-full transition-all duration-300"
                style={{
                  width: `${
                    stats.logicalProgress.total > 0
                      ? (stats.logicalProgress.completed / stats.logicalProgress.total) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
            <p className="text-[11px] text-zinc-400">
              Series, Blood Relations, Seating, Syllogisms & Puzzles (10 topics)
            </p>
          </CardContent>
        </Card>

        {/* Verbal */}
        <Card
          onClick={() => setSelectedCategory('verbal')}
          className={`cursor-pointer transition-all border ${
            selectedCategory === 'verbal'
              ? 'border-emerald-500 bg-emerald-950/20'
              : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
          }`}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <CardTitle className="text-sm font-semibold text-white">Verbal Ability</CardTitle>
              </div>
              <span className="text-xs font-bold text-zinc-300">
                {stats.verbalProgress.completed} / {stats.verbalProgress.total}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-2">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{
                  width: `${
                    stats.verbalProgress.total > 0
                      ? (stats.verbalProgress.completed / stats.verbalProgress.total) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
            <p className="text-[11px] text-zinc-400">
              Reading Comp, Grammar Rules, Jumbles, Synonyms (10 topics)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900/60 border border-zinc-800 rounded-lg overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Topics ({stats.totalTopics})
          </button>
          <button
            onClick={() => setSelectedCategory('quantitative')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'quantitative'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Quantitative (16)
          </button>
          <button
            onClick={() => setSelectedCategory('logical')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'logical'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Logical (10)
          </button>
          <button
            onClick={() => setSelectedCategory('verbal')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'verbal'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Verbal (10)
          </button>
        </div>

        {/* Search & Status Filter */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search topics, formulas, tricks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="not_started">Not Started</option>
              <option value="learning">In Learning</option>
              <option value="completed">Completed</option>
              <option value="revise">Needs Revision</option>
              <option value="bookmarked">Bookmarked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
          <p className="text-zinc-400 text-sm">No aptitude topics match your current filter criteria.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setStatusFilter('all');
            }}
            className="mt-3 text-xs"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic) => {
            const currentStatus: TopicStatus =
              topic.progress?.status || (topic.progress?.isMastered ? 'completed' : 'not_started');
            const isBookmarked =
              topic.progress?.completedCheckpoints?.includes('bookmark') || false;

            return (
              <Card
                key={topic.id}
                className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between group"
              >
                <CardHeader className="p-4 pb-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-zinc-500">#{topic.number}</span>
                      <Badge
                        variant={
                          topic.category === 'quantitative'
                            ? 'default'
                            : topic.category === 'logical'
                            ? 'outline'
                            : 'secondary'
                        }
                        className="text-[10px] px-1.5 py-0"
                      >
                        {topic.category === 'quantitative'
                          ? 'Quant'
                          : topic.category === 'logical'
                          ? 'Logical'
                          : 'Verbal'}
                      </Badge>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(topic.id);
                      }}
                      className="text-zinc-500 hover:text-amber-400 transition-colors p-1"
                      aria-label="Toggle bookmark"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isBookmarked ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <CardTitle className="text-sm font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors line-clamp-1">
                    {topic.title}
                  </CardTitle>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {topic.explanation}
                  </p>
                </CardHeader>

                <CardContent className="p-4 pt-2 space-y-3">
                  {/* Key formula preview */}
                  {topic.formulas.length > 0 && (
                    <div className="p-2 rounded bg-zinc-950 border border-zinc-850 font-mono text-[10px] text-zinc-400 truncate">
                      {topic.formulas[0]}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          currentStatus === 'completed'
                            ? 'solved'
                            : currentStatus === 'learning'
                            ? 'attempted'
                            : currentStatus === 'revise'
                            ? 'revise'
                            : 'outline'
                        }
                        className="text-[10px] px-1.5 py-0"
                      >
                        {currentStatus === 'completed'
                          ? 'Done'
                          : currentStatus === 'learning'
                          ? 'Learning'
                          : currentStatus === 'revise'
                          ? 'Revise'
                          : 'Not Started'}
                      </Badge>
                      <span className="text-[11px] text-zinc-500">
                        {topic.practiceQuestions.length} Qs
                      </span>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setActiveTopic(topic)}
                      className="h-7 text-xs px-2.5 bg-zinc-850 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                    >
                      <span>Study & Practice</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Topic Study & Practice Modal */}
      {currentActiveTopic && (
        <AptitudeTopicModal
          topic={currentActiveTopic}
          onClose={() => setActiveTopic(null)}
          onUpdateStatus={updateStatus}
          onToggleBookmark={toggleBookmark}
          onSaveNotes={saveNotes}
        />
      )}
    </div>
  );
};
