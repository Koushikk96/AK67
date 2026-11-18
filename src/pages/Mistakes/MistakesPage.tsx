import React, { useState } from 'react';
import { useMistakes } from '@/hooks/useMistakes';
import {
  PersonalNote,
  MistakeCategory,
  MistakeReviewStatus,
} from '@/types/database';
import {
  MISTAKE_CATEGORIES,
  MISTAKE_SUBJECTS,
} from '@/services/mistakeService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Plus,
  Search,
  CheckCircle2,
  Trash2,
  Edit2,
  X,
} from 'lucide-react';

export const MistakesPage: React.FC = () => {
  const {
    filteredMistakes,
    mistakes,
    loading,
    filterSubject,
    setFilterSubject,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    addMistake,
    updateMistake,
    setStatus,
    deleteMistake,
  } = useMistakes();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(MISTAKE_SUBJECTS[0]);
  const [relatedId, setRelatedId] = useState('');
  const [category, setCategory] = useState<MistakeCategory>(MISTAKE_CATEGORIES[0]);
  const [whatWentWrong, setWhatWentWrong] = useState('');
  const [correctApproach, setCorrectApproach] = useState('');
  const [personalLesson, setPersonalLesson] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setSubject(MISTAKE_SUBJECTS[0]);
    setRelatedId('');
    setCategory(MISTAKE_CATEGORIES[0]);
    setWhatWentWrong('');
    setCorrectApproach('');
    setPersonalLesson('');
    setDifficulty('Medium');
    setShowModal(true);
  };

  const openEditModal = (m: PersonalNote) => {
    setEditingId(m.id);
    setTitle(m.title);
    setSubject(m.subject || m.category || MISTAKE_SUBJECTS[0]);
    setRelatedId(m.relatedId || m.linkedProblemId || '');
    setCategory((m.mistakeCategory as MistakeCategory) || MISTAKE_CATEGORIES[0]);
    setWhatWentWrong(m.whatWentWrong || '');
    setCorrectApproach(m.correctApproach || '');
    setPersonalLesson(m.personalLesson || '');
    setDifficulty((m.difficulty as any) || 'Medium');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !whatWentWrong.trim()) return;

    if (editingId) {
      await updateMistake(editingId, {
        title: title.trim(),
        subject,
        category: subject,
        relatedId: relatedId.trim() || undefined,
        mistakeCategory: category,
        mistakeType: category,
        whatWentWrong: whatWentWrong.trim(),
        correctApproach: correctApproach.trim(),
        personalLesson: personalLesson.trim(),
        difficulty,
        content: `### What Went Wrong\n${whatWentWrong}\n\n### Correct Approach\n${correctApproach}\n\n### Personal Lesson\n${personalLesson}`,
      });
    } else {
      await addMistake({
        title: title.trim(),
        subject,
        relatedId: relatedId.trim() || undefined,
        mistakeCategory: category,
        whatWentWrong: whatWentWrong.trim(),
        correctApproach: correctApproach.trim(),
        personalLesson: personalLesson.trim(),
        difficulty,
      });
    }

    setShowModal(false);
  };

  // Metrics
  const stats = {
    total: mistakes.length,
    pending: mistakes.filter((m) => (m.reviewStatus || 'pending') === 'pending').length,
    reviewed: mistakes.filter((m) => m.reviewStatus === 'reviewed').length,
    resolved: mistakes.filter((m) => m.reviewStatus === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Module M</span>
          <Badge variant="urgent">Mistake Tracking System</Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Mistake Repository</h1>
            <p className="text-xs text-zinc-400 max-w-2xl mt-1">
              Systematic mistake journal for recording failure modes across DSA problems, SQL queries, core theory concepts, and mock assessments so errors are never repeated in interviews.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={openAddModal}
            className="flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Log New Mistake
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
          <span className="text-xs text-zinc-400">Total Mistakes</span>
          <div className="text-xl font-bold text-white mt-0.5">{stats.total}</div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
          <span className="text-xs text-rose-400">Pending Review</span>
          <div className="text-xl font-bold text-rose-300 mt-0.5">{stats.pending}</div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
          <span className="text-xs text-amber-400">Under Review</span>
          <div className="text-xl font-bold text-amber-300 mt-0.5">{stats.reviewed}</div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
          <span className="text-xs text-emerald-400">Resolved / Mastered</span>
          <div className="text-xl font-bold text-emerald-300 mt-0.5">{stats.resolved}</div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* Subject Filter */}
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
          >
            <option value="all">All Subjects</option>
            {MISTAKE_SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
          >
            <option value="all">All Failure Causes</option>
            {MISTAKE_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="relative min-w-[220px]">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search mistakes, causes, lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      {/* Mistakes List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-zinc-500">Loading mistakes...</div>
        ) : filteredMistakes.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-500 bg-zinc-900/20 rounded-lg border border-zinc-800/80">
            No mistake logs recorded matching this filter. Click &quot;Log New Mistake&quot; to begin tracking your error patterns.
          </div>
        ) : (
          filteredMistakes.map((m) => {
            const status = m.reviewStatus || 'pending';

            return (
              <Card key={m.id} className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-750 transition">
                <CardHeader className="p-4 sm:p-5 pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-[10px]">
                          {m.subject || m.category}
                        </Badge>
                        <Badge
                          variant={
                            m.mistakeCategory === 'Conceptual misunderstanding'
                              ? 'urgent'
                              : m.mistakeCategory === 'Edge case missed'
                              ? 'attempted'
                              : 'secondary'
                          }
                          className="text-[10px]"
                        >
                          {m.mistakeCategory || m.mistakeType}
                        </Badge>
                        <Badge
                          variant={
                            m.difficulty === 'Easy'
                              ? 'easy'
                              : m.difficulty === 'Hard'
                              ? 'urgent'
                              : 'attempted'
                          }
                          className="text-[10px]"
                        >
                          {m.difficulty || 'Medium'}
                        </Badge>
                        {m.relatedId && (
                          <span className="text-[10px] text-zinc-500 font-mono">
                            Ref: {m.relatedId}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-base font-bold text-white mt-1">
                        {m.title}
                      </CardTitle>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Review Status Dropdown */}
                      <select
                        value={status}
                        onChange={(e) => setStatus(m.id, e.target.value as MistakeReviewStatus)}
                        className={`text-xs px-2.5 py-1 rounded border font-semibold ${
                          status === 'resolved'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : status === 'reviewed'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="resolved">Resolved</option>
                      </select>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(m)}
                        className="text-zinc-400 hover:text-white h-7 w-7 p-0"
                        title="Edit mistake"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMistake(m.id)}
                        className="text-zinc-500 hover:text-rose-400 h-7 w-7 p-0"
                        title="Delete mistake"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-5 pt-0 space-y-3">
                  {/* What Went Wrong */}
                  {m.whatWentWrong && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs">
                      <span className="font-semibold text-rose-300 block mb-0.5">What Went Wrong:</span>
                      <p className="text-rose-200 leading-relaxed whitespace-pre-wrap">{m.whatWentWrong}</p>
                    </div>
                  )}

                  {/* Correct Approach */}
                  {m.correctApproach && (
                    <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
                      <span className="font-semibold text-emerald-400 block mb-0.5">Correct Approach:</span>
                      <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{m.correctApproach}</p>
                    </div>
                  )}

                  {/* Personal Lesson */}
                  {m.personalLesson && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
                      <span className="font-semibold text-amber-300 block mb-0.5">Key Personal Takeaway:</span>
                      <p className="text-amber-200 leading-relaxed whitespace-pre-wrap">{m.personalLesson}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80 text-[11px] text-zinc-500">
                    <span>Recorded on {new Date(m.createdAt).toLocaleDateString()}</span>
                    {status === 'resolved' && (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="h-3 w-3" /> Mastered
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* CREATE / EDIT MISTAKE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="max-w-lg w-full bg-zinc-900 border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base text-white">
                    {editingId ? 'Edit Mistake Entry' : 'Log New Mistake'}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Document the exact failure cause and rule of thumb.
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="h-7 w-7 p-0 text-zinc-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-4 pt-1">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium">Mistake Title / Description *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Integer overflow with 10^9 in binary search"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium">Subject *</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200"
                    >
                      {MISTAKE_SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium">Failure Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as MistakeCategory)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200"
                    >
                      {MISTAKE_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium">Related Question / Problem ID</label>
                    <input
                      type="text"
                      placeholder="e.g. dsa-01, cpp-05, q-profit-02"
                      value={relatedId}
                      onChange={(e) => setRelatedId(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium">What Went Wrong *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Describe how the bug occurred or what was misunderstood..."
                    value={whatWentWrong}
                    onChange={(e) => setWhatWentWrong(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium">Correct Approach</label>
                  <textarea
                    rows={2}
                    placeholder="Explain the right mathematical logic, formula or algorithmic pattern..."
                    value={correctApproach}
                    onChange={(e) => setCorrectApproach(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium">Personal Lesson / Rule of Thumb</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Always check 1 <= N <= 10^9 before declaring int instead of long long..."
                    value={personalLesson}
                    onChange={(e) => setPersonalLesson(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                  <Button variant="outline" size="sm" type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    {editingId ? 'Save Changes' : 'Save Mistake'}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
