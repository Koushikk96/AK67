import React, { useState } from 'react';
import { useNotes, UnifiedNoteItem } from '@/hooks/useNotes';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Plus,
  Search,
  Pin,
  Trash2,
  Edit2,
  X,
} from 'lucide-react';

export const NotesPage: React.FC = () => {
  const {
    notes,
    rawNotesCount,
    loading,
    selectedCategory,
    setSelectedCategory,
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    allTags,
    allCategories,
    createNote,
    updateNote,
    togglePin,
    deleteNote,
  } = useNotes();

  // Create/Edit modal state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [tagInput, setTagInput] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setCategory('General');
    setTagInput('');
    setContent('');
    setIsPinned(false);
    setShowModal(true);
  };

  const openEditModal = (note: UnifiedNoteItem) => {
    setEditingId(note.id);
    setTitle(note.title);
    setCategory(note.category);
    setTagInput(note.tags.join(', '));
    setContent(note.content);
    setIsPinned(note.isPinned);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingId) {
      await updateNote(editingId, {
        title: title.trim(),
        category: category.trim() || 'General',
        tags,
        content: content.trim(),
        isPinned,
      });
    } else {
      await createNote({
        title: title.trim(),
        category: category.trim() || 'General',
        tags,
        content: content.trim(),
        isPinned,
      });
    }

    setShowModal(false);
  };

  // Source icon helper
  const getSourceBadge = (source: UnifiedNoteItem['source']) => {
    switch (source) {
      case 'dsa_problem':
        return (
          <Badge variant="outline" className="text-[10px] text-blue-400 border-blue-500/30">
            DSA Problem
          </Badge>
        );
      case 'technical_topic':
        return (
          <Badge variant="outline" className="text-[10px] text-purple-400 border-purple-500/30">
            Theory Topic
          </Badge>
        );
      case 'company':
        return (
          <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-500/30">
            Company Prep
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-[10px]">
            Personal Note
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module M</span>
          <Badge variant="outline">Central Knowledge Repository</Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Personal Notes Manager</h1>
            <p className="text-xs text-zinc-400 max-w-2xl mt-1">
              Unified knowledge hub combining standalone study notes, problem reflections, topic annotations, and company recruitment notes.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={openAddModal}
            className="flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Create Standalone Note
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
          >
            <option value="all">All Categories ({rawNotesCount})</option>
            {allCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
            >
              <option value="all">All Tags</option>
              {allTags.map((t) => (
                <option key={t} value={t}>#{t}</option>
              ))}
            </select>
          )}

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
          >
            <option value="latest">Sort: Recently Updated</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="title">Sort: Title A-Z</option>
          </select>
        </div>

        <div className="relative min-w-[220px]">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search notes, tags, concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-12 text-center text-xs text-zinc-500">
            Loading notes...
          </div>
        ) : notes.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-zinc-500 bg-zinc-900/20 rounded-lg border border-zinc-800/80">
            No notes found. Create your first standalone note or annotate any DSA problem or Core CS topic.
          </div>
        ) : (
          notes.map((note) => (
            <Card
              key={note.id}
              className={`bg-zinc-900/40 border transition flex flex-col justify-between ${
                note.isPinned
                  ? 'border-blue-500/40 bg-blue-950/10 shadow-sm'
                  : 'border-zinc-800 hover:border-zinc-750'
              }`}
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {getSourceBadge(note.source)}
                      <Badge variant="outline" className="text-[10px]">
                        {note.category}
                      </Badge>
                      {note.isPinned && (
                        <span className="text-[10px] text-blue-400 font-semibold flex items-center gap-0.5">
                          <Pin className="h-3 w-3 fill-blue-400 text-blue-400 rotate-45" /> Pinned
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-sm font-bold text-white line-clamp-1 mt-1">
                      {note.title}
                    </CardTitle>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => togglePin(note.id)}
                      className={`h-7 w-7 rounded flex items-center justify-center transition ${
                        note.isPinned
                          ? 'text-blue-400 bg-blue-500/10'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                      title={note.isPinned ? 'Unpin note' : 'Pin to top'}
                    >
                      <Pin className={`h-3.5 w-3.5 ${note.isPinned ? 'fill-blue-400 rotate-45' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditModal(note)}
                      className="h-7 w-7 rounded flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition"
                      title="Edit note"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteNote(note.id)}
                      className="h-7 w-7 rounded flex items-center justify-center text-zinc-500 hover:text-rose-400 transition"
                      title="Delete note"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-1 flex-1 flex flex-col justify-between space-y-3">
                {/* Note Content Preview */}
                <div className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap bg-zinc-950/70 p-3 rounded-lg border border-zinc-800/80 font-mono text-[11px] max-h-48 overflow-y-auto">
                  {note.content}
                </div>

                {/* Footer Tags & Date */}
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500">
                  <div className="flex items-center gap-1 flex-wrap overflow-hidden max-w-[70%]">
                    {note.tags.map((t, idx) => (
                      <span key={idx} className="text-zinc-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* CREATE / EDIT NOTE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="max-w-lg w-full bg-zinc-900 border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base text-white">
                    {editingId ? 'Edit Personal Note' : 'Create New Note'}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Store algorithms, syntax quirks, system design blueprints, or interview tips.
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
                  <label className="text-xs text-zinc-300 font-medium">Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. C++ Vector Capacity vs Size Tricks"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium">Category</label>
                    <input
                      type="text"
                      placeholder="e.g. DSA, C++, SQL, System Design"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium">Tags (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. pointers, stl, interview"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium">Content / Markdown *</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Type personal notes, formulas, code snippets..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-xs text-zinc-200 font-mono leading-relaxed resize-none focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="pin-check"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="h-4 w-4 rounded accent-blue-600 cursor-pointer"
                  />
                  <label htmlFor="pin-check" className="text-xs text-zinc-300 cursor-pointer select-none">
                    Pin note to top of list
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                  <Button variant="outline" size="sm" type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    {editingId ? 'Save Changes' : 'Create Note'}
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
