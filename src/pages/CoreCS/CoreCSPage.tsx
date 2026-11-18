import React, { useState, useMemo } from 'react';
import {
  allCoreCSTopics,
  coreCSSubjects,
  dbmsTopics,
  osTopics,
  networkTopics,
  softwareEngTopics,
} from '@/content/coreCS';
import { useTechnicalTopics } from '@/hooks/useTechnicalTopics';
import { TechnicalTopicWithProgress, TechnicalCategory } from '@/types/technical';
import { TopicStatus } from '@/types/database';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TopicDetailModal } from '@/components/technical/TopicDetailModal';
import {
  Layers,
  Cpu,
  Server,
  Network,
  GitBranch,
  Search,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';

export const CoreCSPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TopicStatus | 'all' | 'bookmarked'>('all');
  const [activeTopic, setActiveTopic] = useState<TechnicalTopicWithProgress | null>(null);

  // Hook for all core CS topics
  const {
    topics,
    stats,
    loading,
    updateStatus,
    toggleBookmark,
    saveNotes,
  } = useTechnicalTopics(
    allCoreCSTopics,
    selectedSubject === 'all' ? 'all' : (selectedSubject as TechnicalCategory)
  );

  // Filter topics
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      // 1. Subject filter
      if (selectedSubject !== 'all' && t.category !== selectedSubject) {
        return false;
      }

      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchExplanation = t.explanation.toLowerCase().includes(q);
        const matchNotes = t.revisionNotes.some((n) => n.toLowerCase().includes(q));
        if (!matchTitle && !matchExplanation && !matchNotes) return false;
      }

      // 3. Status filter
      const status: TopicStatus =
        t.progress?.status || (t.progress?.isMastered ? 'completed' : 'not_started');

      if (selectedStatus === 'bookmarked') {
        if (!t.progress?.bookmarked) return false;
      } else if (selectedStatus !== 'all') {
        if (status !== selectedStatus) return false;
      }

      return true;
    });
  }, [topics, selectedSubject, searchQuery, selectedStatus]);

  const currentActiveTopic = useMemo(() => {
    if (!activeTopic) return null;
    return topics.find((t) => t.id === activeTopic.id) || activeTopic;
  }, [activeTopic, topics]);

  const getSubjectIcon = (category: string) => {
    switch (category) {
      case 'os':
        return <Cpu className="h-4 w-4 text-rose-400" />;
      case 'dbms':
        return <Server className="h-4 w-4 text-emerald-400" />;
      case 'cn':
        return <Network className="h-4 w-4 text-blue-400" />;
      case 'se':
        return <GitBranch className="h-4 w-4 text-purple-400" />;
      default:
        return <Layers className="h-4 w-4 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Module E • Core Technical
              </span>
              <Badge variant="solved">Essential Core CS Placement Mastery</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center gap-2.5">
              <Layers className="h-7 w-7 text-indigo-400" />
              <span>Core CS Essentials</span>
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Curated conceptual essentials across 4 foundation pillars: DBMS (11), Operating Systems (13), Computer Networks (13), and Software Engineering (10). Zero fluff, 100% interview-focused.
            </p>
          </div>

          {/* Live Progress Card */}
          <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="text-zinc-400">Total Mastery:</span>
                <span className="font-mono font-bold text-white">
                  {loading ? '...' : `${stats.completed} / ${allCoreCSTopics.length}`} ({stats.completionPercentage}%)
                </span>
              </div>
              <div className="h-1.5 w-36 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full bg-indigo-500 transition-all duration-500"
                  style={{ width: `${stats.completionPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-500">
                <span>{stats.learning} learning</span>
                <span>{stats.bookmarked} bookmarked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
        {coreCSSubjects.map((sub) => {
          const isSelected = selectedSubject === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                isSelected
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {sub.id !== 'all' && getSubjectIcon(sub.id)}
              <span>{sub.label}</span>
              <span className="text-[10px] opacity-75">({sub.count})</span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-3 rounded-lg border border-zinc-800 bg-[#121215] p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Core CS topics (e.g. deadlock, OSI, ACID, SOLID)..."
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 pl-8 pr-2.5 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

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
      </div>

      {/* 4-Subject Quick Metrics Row (when All Subjects is chosen) */}
      {selectedSubject === 'all' && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div
            onClick={() => setSelectedSubject('dbms')}
            className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 transition hover:border-zinc-700"
          >
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold text-zinc-200">DBMS</span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-400">{dbmsTopics.length} Core Topics</p>
          </div>

          <div
            onClick={() => setSelectedSubject('os')}
            className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 transition hover:border-zinc-700"
          >
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-rose-400" />
              <span className="text-xs font-semibold text-zinc-200">Operating Systems</span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-400">{osTopics.length} Core Topics</p>
          </div>

          <div
            onClick={() => setSelectedSubject('cn')}
            className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 transition hover:border-zinc-700"
          >
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-semibold text-zinc-200">Computer Networks</span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-400">{networkTopics.length} Core Topics</p>
          </div>

          <div
            onClick={() => setSelectedSubject('se')}
            className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 transition hover:border-zinc-700"
          >
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-semibold text-zinc-200">Software Eng.</span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-400">{softwareEngTopics.length} Core Topics</p>
          </div>
        </div>
      )}

      {/* Topics Grid */}
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
                  <div className="flex items-center gap-1.5">
                    {getSubjectIcon(topic.category)}
                    <span className="font-mono text-[11px] font-bold text-zinc-400">
                      {topic.subject} #{topic.number}
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
                  className="mt-2 text-sm font-semibold text-zinc-100 cursor-pointer hover:text-indigo-300 transition-colors line-clamp-2"
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

      {/* Topic Detail Modal */}
      {currentActiveTopic && (
        <TopicDetailModal
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
