import React, { useState, useMemo } from 'react';
import { useJavaMastery } from '@/hooks/useJavaMastery';
import { MasteryTopicWithProgress, MasteryDifficulty } from '@/types/mastery';
import { TopicStatus } from '@/types/database';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TopicDetailModal } from '@/components/mastery/TopicDetailModal';
import { ModuleCard } from '@/components/mastery/ModuleCard';
import {
  Search,
  Bookmark,
  CheckCircle2,
  Coffee,
  HelpCircle,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const JavaPage: React.FC = () => {
  const {
    topics,
    allTopicsWithProgress,
    modules,
    stats,
    selectedModule,
    setSelectedModule,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    updateTopicStatus,
    toggleBookmark,
    toggleCheckpoint,
    saveNotes,
    scheduleRevision,
  } = useJavaMastery();

  const [activeTopic, setActiveTopic] = useState<MasteryTopicWithProgress | null>(null);

  // Sync activeTopic with live changes
  const currentActiveTopic = useMemo(() => {
    if (!activeTopic) return null;
    return allTopicsWithProgress.find((t) => t.id === activeTopic.id) || activeTopic;
  }, [activeTopic, allTopicsWithProgress]);

  const handleModuleSelect = (modNum: number) => {
    if (selectedModule === modNum) {
      setSelectedModule('all');
    } else {
      setSelectedModule(modNum);
    }
  };

  const getDifficultyBadge = (level: MasteryDifficulty) => {
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

  const getStatusBadge = (status: TopicStatus) => {
    switch (status) {
      case 'completed':
        return <Badge variant="solved">Completed</Badge>;
      case 'learning':
        return <Badge variant="attempted">Learning</Badge>;
      case 'revise':
        return <Badge variant="revise">Revise</Badge>;
      default:
        return (
          <Badge variant="outline" className="text-slate-400 dark:text-slate-500">
            Not Started
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <Coffee className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Placement Mastery Track
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Java Mastery Curriculum
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            8 Modules • 106 Curated Topics • Enterprise Architecture • Problem Solving & Placement Preparation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
              {stats.completedTopics}/{stats.totalTopics}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Topics Mastered ({stats.completionPercentage}%)
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Topics</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{stats.totalTopics}</div>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/50 dark:bg-emerald-950/20">
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Completed</span>
          <div className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mt-0.5">{stats.completedTopics}</div>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-950/60 bg-amber-50/50 dark:bg-amber-950/20">
          <span className="text-xs font-medium text-amber-700 dark:text-amber-400">In Progress</span>
          <div className="text-xl font-bold text-amber-800 dark:text-amber-300 mt-0.5">{stats.learningTopics}</div>
        </div>

        <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-950/60 bg-purple-50/50 dark:bg-purple-950/20">
          <span className="text-xs font-medium text-purple-700 dark:text-purple-400">For Revision</span>
          <div className="text-xl font-bold text-purple-800 dark:text-purple-300 mt-0.5">{stats.reviseTopics}</div>
        </div>

        <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-950/60 bg-blue-50/50 dark:bg-blue-950/20">
          <span className="text-xs font-medium text-blue-700 dark:text-blue-400">Bookmarked</span>
          <div className="text-xl font-bold text-blue-800 dark:text-blue-300 mt-0.5">{stats.bookmarkedTopics}</div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Unstarted</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{stats.notStartedTopics}</div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            Curriculum Modules
          </h2>
          {selectedModule !== 'all' && (
            <button
              onClick={() => setSelectedModule('all')}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Show All Modules
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {modules.map((mod) => {
            const completedCount = allTopicsWithProgress.filter(
              (t) => t.moduleNumber === mod.number && t.progress?.status === 'completed'
            ).length;
            return (
              <ModuleCard
                key={mod.id}
                module={mod}
                completedCount={completedCount}
                isSelected={selectedModule === mod.number}
                onSelect={handleModuleSelect}
              />
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 106 topics by title, concept, or keywords..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Difficulty Dropdown */}
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value as MasteryDifficulty | 'all')}
          className="text-xs sm:text-sm py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="all">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Status Dropdown */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as TopicStatus | 'all')}
          className="text-xs sm:text-sm py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="all">All Statuses</option>
          <option value="not_started">⚪ Not Started</option>
          <option value="learning">🟡 In Progress</option>
          <option value="completed">🟢 Completed</option>
          <option value="revise">🟣 For Revision</option>
        </select>

        {/* Clear Filters */}
        {(selectedModule !== 'all' ||
          selectedDifficulty !== 'all' ||
          selectedStatus !== 'all' ||
          searchQuery.trim()) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedModule('all');
              setSelectedDifficulty('all');
              setSelectedStatus('all');
              setSearchQuery('');
            }}
            className="text-xs"
          >
            Reset
          </Button>
        )}
      </div>

      {/* Topics Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <strong>{topics.length}</strong> of <strong>{stats.totalTopics}</strong> topics
          </span>
          {selectedModule !== 'all' && (
            <span className="font-medium text-amber-600 dark:text-amber-400">
              Filtered: Module {selectedModule}
            </span>
          )}
        </div>

        {topics.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
            <HelpCircle className="w-10 h-10 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No matching Java topics found
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Try adjusting your search terms or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {topics.map((t) => {
              const status: TopicStatus = t.progress?.status || 'not_started';
              const isBookmarked = t.progress?.bookmarked || false;
              const checkpointsDone = t.progress?.completedCheckpoints?.length || 0;
              const totalCheckpoints = t.checkpoints.length;

              return (
                <div
                  key={t.id}
                  onClick={() => setActiveTopic(t)}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-400 dark:hover:border-amber-600 transition-all cursor-pointer flex flex-col justify-between shadow-sm group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          #{t.topicNumber}
                        </span>
                        {getDifficultyBadge(t.level)}
                        {getStatusBadge(status)}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(t.id);
                        }}
                        className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                          isBookmarked
                            ? 'text-amber-500'
                            : 'text-slate-300 dark:text-slate-600 hover:text-slate-500'
                        }`}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Topic'}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
                      {t.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                      {t.explanation}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                      {checkpointsDone}/{totalCheckpoints} checkpoints
                    </span>

                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">
                      Study <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Topic Modal */}
      {currentActiveTopic && (
        <TopicDetailModal
          topic={currentActiveTopic}
          onClose={() => setActiveTopic(null)}
          onUpdateStatus={updateTopicStatus}
          onToggleBookmark={toggleBookmark}
          onToggleCheckpoint={toggleCheckpoint}
          onSaveNotes={saveNotes}
          onScheduleRevision={scheduleRevision}
        />
      )}
    </div>
  );
};
export default JavaPage;
