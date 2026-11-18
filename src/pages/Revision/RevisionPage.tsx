import React, { useState } from 'react';
import { useRevisionQueue } from '@/hooks/useRevisionQueue';
import { RevisionDomain } from '@/services/revisionService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  RotateCcw,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  Check,
  Trash2,
} from 'lucide-react';

export const RevisionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'due' | 'upcoming' | 'completed'>('due');
  const [selectedDomain, setSelectedDomain] = useState<RevisionDomain | 'all'>('all');
  const [postponeDropdownId, setPostponeDropdownId] = useState<string | null>(null);

  const {
    dueToday,
    overdue,
    upcoming,
    completed,
    counts,
    markRevised,
    postpone,
    removeFromQueue,
  } = useRevisionQueue(selectedDomain);

  const combinedDueAndOverdue = [...overdue, ...dueToday];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Module G</span>
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10">
            Active Recall & Retention
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Spaced Revision Engine</h1>
            <p className="text-xs text-zinc-400 max-w-2xl mt-1">
              Automatic interval scheduling (1d $\to$ 3d $\to$ 7d $\to$ 14d $\to$ 30d) across all 67 DSA problems, C++, SQL, Core CS, and Aptitude topics.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xl font-bold text-white">{counts.totalActive}</span>
              <span className="text-xs text-zinc-500"> Active in Queue</span>
              <div className="text-[11px] text-purple-400 font-medium">
                {counts.dueToday + counts.overdue} Ready Today
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-4">
        {/* Overdue */}
        <Card
          onClick={() => setActiveTab('due')}
          className={`cursor-pointer transition-all border ${
            activeTab === 'due' && counts.overdue > 0
              ? 'border-rose-500 bg-rose-950/20'
              : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
          }`}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Overdue</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">{counts.overdue}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-[11px] text-zinc-400">High priority recovery items</p>
          </CardContent>
        </Card>

        {/* Due Today */}
        <Card
          onClick={() => setActiveTab('due')}
          className={`cursor-pointer transition-all border ${
            activeTab === 'due'
              ? 'border-purple-500 bg-purple-950/20'
              : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
          }`}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Due Today</span>
              <RotateCcw className="w-4 h-4 text-purple-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">{counts.dueToday}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-[11px] text-zinc-400">Scheduled for today's active recall</p>
          </CardContent>
        </Card>

        {/* Upcoming */}
        <Card
          onClick={() => setActiveTab('upcoming')}
          className={`cursor-pointer transition-all border ${
            activeTab === 'upcoming'
              ? 'border-blue-500 bg-blue-950/20'
              : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
          }`}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Upcoming</span>
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">{counts.upcoming}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-[11px] text-zinc-400">Future scheduled intervals</p>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card
          onClick={() => setActiveTab('completed')}
          className={`cursor-pointer transition-all border ${
            activeTab === 'completed'
              ? 'border-emerald-500 bg-emerald-950/20'
              : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
          }`}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Completed
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">{counts.completed}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-[11px] text-zinc-400">Cumulative items revised</p>
          </CardContent>
        </Card>
      </div>

      {/* Interval Reference Bar */}
      <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-zinc-300">
          <Layers className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-white">Algorithm Intervals:</span>
          <span>1 Day $\to$ 3 Days $\to$ 7 Days $\to$ 14 Days $\to$ 30 Days</span>
        </div>
        <div className="text-zinc-500 text-[11px]">
          Marking revised advances item to next memory tier
        </div>
      </div>

      {/* Tab Navigation & Domain Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Main Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900/60 border border-zinc-800 rounded-lg overflow-x-auto">
          <button
            onClick={() => setActiveTab('due')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'due'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Due Today & Overdue</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                counts.overdue + counts.dueToday > 0 ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              {counts.overdue + counts.dueToday}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'upcoming'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Upcoming Schedule</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-400">
              {counts.upcoming}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'completed'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Revision History</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-400">
              {counts.completed}
            </span>
          </button>
        </div>

        {/* Domain Filter Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">Filter Domain:</span>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Domains</option>
            <option value="DSA">DSA (67 Problems)</option>
            <option value="C++">C++ Essentials</option>
            <option value="SQL">SQL & DB</option>
            <option value="DBMS">DBMS</option>
            <option value="OS">Operating Systems</option>
            <option value="Computer Networks">Computer Networks</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Aptitude">Aptitude & Reasoning</option>
          </select>
        </div>
      </div>

      {/* TAB CONTENT */}

      {/* 1. DUE TODAY & OVERDUE */}
      {activeTab === 'due' && (
        <div className="space-y-4">
          {combinedDueAndOverdue.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-semibold text-white">All caught up! No revisions due today.</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Items you mark as solved or completed in DSA, C++, SQL, Core CS, or Aptitude are automatically scheduled for active recall.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {combinedDueAndOverdue.map((item) => {
                const isOverdue = item.daysDiff < 0;

                return (
                  <Card
                    key={item.id}
                    className={`border transition-all flex flex-col justify-between ${
                      isOverdue
                        ? 'border-rose-900/60 bg-rose-950/10 hover:border-rose-700'
                        : 'border-purple-900/40 bg-purple-950/10 hover:border-purple-700'
                    }`}
                  >
                    <CardHeader className="p-4 pb-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant={
                              item.domain === 'DSA'
                                ? 'default'
                                : item.domain === 'C++' || item.domain === 'SQL'
                                ? 'secondary'
                                : 'outline'
                            }
                            className="text-[10px] px-1.5 py-0"
                          >
                            {item.domain}
                          </Badge>
                          {item.difficulty && (
                            <Badge
                              variant={
                                item.difficulty === 'Easy'
                                  ? 'easy'
                                  : item.difficulty === 'Medium'
                                  ? 'attempted'
                                  : 'urgent'
                              }
                              className="text-[10px] px-1.5 py-0"
                            >
                              {item.difficulty}
                            </Badge>
                          )}
                        </div>

                        <Badge
                          variant={isOverdue ? 'urgent' : 'revise'}
                          className="text-[10px] flex items-center gap-1"
                        >
                          {isOverdue ? (
                            <>
                              <AlertTriangle className="w-3 h-3" />
                              {Math.abs(item.daysDiff)}d Overdue
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              Due Today
                            </>
                          )}
                        </Badge>
                      </div>

                      <CardTitle className="text-sm font-semibold text-zinc-100 line-clamp-1">
                        {item.title}
                      </CardTitle>

                      {item.subtitle && (
                        <p className="text-xs text-zinc-400 line-clamp-1">{item.subtitle}</p>
                      )}
                    </CardHeader>

                    <CardContent className="p-4 pt-2 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/60">
                        <span>
                          Current Interval:{' '}
                          <span className="font-semibold text-zinc-300">
                            {item.intervalDays} day{item.intervalDays > 1 ? 's' : ''}
                          </span>
                        </span>
                        <span>
                          Revisions:{' '}
                          <span className="font-semibold text-zinc-300">{item.revisionCount}</span>
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-1.5">
                          {/* Postpone button */}
                          <div className="relative">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setPostponeDropdownId(
                                  postponeDropdownId === item.id ? null : item.id
                                )
                              }
                              className="h-7 text-xs px-2 text-zinc-400 hover:text-white"
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              Postpone
                            </Button>

                            {postponeDropdownId === item.id && (
                              <div className="absolute left-0 bottom-full mb-1 z-20 w-32 rounded-lg bg-zinc-900 border border-zinc-700 shadow-xl p-1 text-xs space-y-0.5">
                                <button
                                  onClick={() => {
                                    postpone(item.id, item.itemType, 1);
                                    setPostponeDropdownId(null);
                                  }}
                                  className="w-full text-left px-2 py-1.5 rounded text-zinc-300 hover:bg-zinc-800 hover:text-white"
                                >
                                  +1 Day
                                </button>
                                <button
                                  onClick={() => {
                                    postpone(item.id, item.itemType, 3);
                                    setPostponeDropdownId(null);
                                  }}
                                  className="w-full text-left px-2 py-1.5 rounded text-zinc-300 hover:bg-zinc-800 hover:text-white"
                                >
                                  +3 Days
                                </button>
                                <button
                                  onClick={() => {
                                    postpone(item.id, item.itemType, 7);
                                    setPostponeDropdownId(null);
                                  }}
                                  className="w-full text-left px-2 py-1.5 rounded text-zinc-300 hover:bg-zinc-800 hover:text-white"
                                >
                                  +7 Days
                                </button>
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromQueue(item.id, item.itemType)}
                            className="h-7 text-xs px-2 text-zinc-500 hover:text-rose-400"
                            title="Remove from revision queue"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Mark Revised Button */}
                        <Button
                          size="sm"
                          onClick={() => markRevised(item.id, item.itemType)}
                          className="h-7 text-xs px-3 bg-purple-600 hover:bg-purple-500 text-white"
                        >
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Mark Revised
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. UPCOMING SCHEDULE */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcoming.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
              <Calendar className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <p className="text-zinc-300 text-sm font-semibold">No upcoming revisions scheduled.</p>
              <p className="text-zinc-500 text-xs mt-1">
                Completed problems and topics will appear here with scheduled review dates.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {upcoming.map((item) => (
                <Card
                  key={item.id}
                  className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between"
                >
                  <CardHeader className="p-4 pb-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {item.domain}
                        </Badge>
                        {item.difficulty && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {item.difficulty}
                          </Badge>
                        )}
                      </div>

                      <Badge variant="secondary" className="text-[10px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-400" />
                        In {item.daysDiff} day{item.daysDiff > 1 ? 's' : ''} ({item.nextRevisionDate})
                      </Badge>
                    </div>

                    <CardTitle className="text-sm font-semibold text-zinc-100 line-clamp-1">
                      {item.title}
                    </CardTitle>

                    {item.subtitle && (
                      <p className="text-xs text-zinc-400 line-clamp-1">{item.subtitle}</p>
                    )}
                  </CardHeader>

                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/60">
                      <span>Interval: {item.intervalDays} days</span>
                      <span>Past Revisions: {item.revisionCount}</span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markRevised(item.id, item.itemType)}
                        className="h-7 text-xs px-2.5 text-zinc-300 hover:text-white"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Revise Early
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromQueue(item.id, item.itemType)}
                        className="h-7 text-xs px-2 text-zinc-500 hover:text-rose-400"
                        title="Remove from queue"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. REVISION HISTORY */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completed.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <p className="text-zinc-300 text-sm font-semibold">No revision history recorded yet.</p>
              <p className="text-zinc-500 text-xs mt-1">
                Every time you review an item and click &quot;Mark Revised&quot;, your retention history is logged here.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {completed.map((item) => (
                <Card
                  key={item.id}
                  className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between"
                >
                  <CardHeader className="p-4 pb-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {item.domain}
                      </Badge>
                      <Badge variant="solved" className="text-[10px] flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {item.revisionCount} Revision{item.revisionCount > 1 ? 's' : ''} Done
                      </Badge>
                    </div>

                    <CardTitle className="text-sm font-semibold text-zinc-100 line-clamp-1">
                      {item.title}
                    </CardTitle>

                    {item.subtitle && (
                      <p className="text-xs text-zinc-400 line-clamp-1">{item.subtitle}</p>
                    )}
                  </CardHeader>

                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/60">
                      <span>Retention Interval: {item.intervalDays} days</span>
                      <span>Next Due: {item.nextRevisionDate || 'Completed'}</span>
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
