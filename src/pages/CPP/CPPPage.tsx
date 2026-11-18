import React, { useState, useMemo } from 'react';
import { cppTopics, cppInterviewFAQs } from '@/content/cpp';
import { useTechnicalTopics } from '@/hooks/useTechnicalTopics';
import { TechnicalTopicWithProgress } from '@/types/technical';
import { TopicStatus } from '@/types/database';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TopicDetailModal } from '@/components/technical/TopicDetailModal';
import {
  Search,
  Bookmark,
  CheckCircle2,
  Terminal,
  HelpCircle,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const CPPPage: React.FC = () => {
  const {
    topics,
    stats,
    loading,
    updateStatus,
    toggleBookmark,
    saveNotes,
  } = useTechnicalTopics(cppTopics, 'cpp');

  const [activeTab, setActiveTab] = useState<'topics' | 'faqs'>('topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TopicStatus | 'all' | 'bookmarked'>('all');
  const [activeTopic, setActiveTopic] = useState<TechnicalTopicWithProgress | null>(null);

  // Filter topics
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchExplanation = t.explanation.toLowerCase().includes(q);
        const matchNotes = t.revisionNotes.some((n) => n.toLowerCase().includes(q));
        if (!matchTitle && !matchExplanation && !matchNotes) return false;
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

  // Synchronize active topic with live progress updates
  const currentActiveTopic = useMemo(() => {
    if (!activeTopic) return null;
    return topics.find((t) => t.id === activeTopic.id) || activeTopic;
  }, [activeTopic, topics]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Module C • Core Technical
              </span>
              <Badge variant="solved">Essential C++ Placement Mastery</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center gap-2.5">
              <Terminal className="h-7 w-7 text-amber-400" />
              <span>C++ Essentials</span>
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              17 high-yield topics designed for fresher placement interviews. Memory layout, pointer mechanics, modern STL idioms, virtual functions, and frequent recruiter traps.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="text-zinc-400">Mastery:</span>
                <span className="font-mono font-bold text-white">
                  {loading ? '...' : `${stats.completed} / ${stats.total}`} ({stats.completionPercentage}%)
                </span>
              </div>
              <div className="h-1.5 w-36 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full bg-amber-500 transition-all duration-500"
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

      {/* Tabs & Search Bar */}
      <div className="flex flex-col gap-3 rounded-lg border border-zinc-800 bg-[#121215] p-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5">
          <Button
            variant={activeTab === 'topics' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('topics')}
            className="text-xs"
          >
            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
            17 C++ Topics ({stats.total})
          </Button>
          <Button
            variant={activeTab === 'faqs' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('faqs')}
            className="text-xs"
          >
            <HelpCircle className="mr-1.5 h-3.5 w-3.5 text-purple-400" />
            Interview FAQs ({cppInterviewFAQs.length})
          </Button>
        </div>

        {/* Search & Status Filters (when topics tab active) */}
        {activeTab === 'topics' && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search C++ concepts..."
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
        )}
      </div>

      {/* Main View: 17 Topics Grid */}
      {activeTab === 'topics' && (
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
                      <span className="font-mono text-xs font-bold text-amber-400">
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
                    className="mt-2 text-sm font-semibold text-zinc-100 cursor-pointer hover:text-amber-300 transition-colors line-clamp-2"
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

      {/* FAQs Tab */}
      {activeTab === 'faqs' && (
        <div className="space-y-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Placement Recruiter Traps & High-Frequency C++ Q&As</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Rapid-fire answers to conceptual placement interview questions asked by product and service companies.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {cppInterviewFAQs.map((faq, idx) => (
              <Card key={faq.id} className="border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-purple-400 font-semibold">Q{idx + 1}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {faq.category}
                  </Badge>
                </div>
                <h4 className="text-xs font-semibold text-zinc-100">{faq.question}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950/60 p-2.5 rounded border border-zinc-850">
                  {faq.shortAnswer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

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
