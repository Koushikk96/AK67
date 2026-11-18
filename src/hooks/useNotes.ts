import { useState, useEffect, useCallback, useMemo } from 'react';
import { db } from '@/db';
import { PersonalNote } from '@/types/database';
import { noteRepository } from '@/db/repositories/noteRepository';
import { problemRepository } from '@/db/repositories/problemRepository';
import { topicRepository } from '@/db/repositories/topicRepository';
import { companyRepository } from '@/db/repositories/companyRepository';
import { dsaProblems } from '@/content/dsa';

export interface UnifiedNoteItem {
  id: string;
  source: 'notes_table' | 'dsa_problem' | 'technical_topic' | 'company';
  title: string;
  category: string;
  tags: string[];
  content: string;
  isPinned: boolean;
  linkedId?: string;
  updatedAt: string;
}

export const useNotes = () => {
  const [notes, setNotes] = useState<UnifiedNoteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'title'>('latest');

  const loadAllNotes = useCallback(async () => {
    try {
      setLoading(true);
      const unified: UnifiedNoteItem[] = [];

      // 1. Direct notes from notes table (excluding mistake logs which have their own repository)
      const directNotes = await noteRepository.getAll();
      for (const n of directNotes) {
        if (!n.isMistakeLog) {
          unified.push({
            id: n.id,
            source: 'notes_table',
            title: n.title,
            category: n.category || 'General',
            tags: n.tags || [],
            content: n.content || '',
            isPinned: Boolean(n.isPinned),
            linkedId: n.linkedProblemId,
            updatedAt: n.updatedAt || n.createdAt || new Date().toISOString(),
          });
        }
      }

      // 2. Personal notes embedded in DSA problem progress
      const allProblems = await problemRepository.getAll();
      for (const p of allProblems) {
        if (p.personalNotes && p.personalNotes.trim().length > 0) {
          const problemDef = dsaProblems.find((item) => item.id === p.id);
          unified.push({
            id: 'dsa_note_' + p.id,
            source: 'dsa_problem',
            title: problemDef ? `#${problemDef.number} ${problemDef.title}` : `DSA: ${p.id}`,
            category: 'DSA',
            tags: ['DSA', problemDef?.category || 'Algorithm'],
            content: p.personalNotes,
            isPinned: false,
            linkedId: p.id,
            updatedAt: p.lastAttemptedAt || new Date().toISOString(),
          });
        }
      }

      // 3. Personal notes embedded in technical topics
      const allTopics = await topicRepository.getAll();
      for (const t of allTopics) {
        if (t.notes && t.notes.trim().length > 0) {
          unified.push({
            id: 'topic_note_' + t.id,
            source: 'technical_topic',
            title: `Topic: ${t.id}`,
            category: t.category ? t.category.toUpperCase() : 'Technical',
            tags: ['Theory', t.category || 'Topic'],
            content: t.notes,
            isPinned: false,
            linkedId: t.id,
            updatedAt: t.lastStudiedAt || new Date().toISOString(),
          });
        }
      }

      // 4. Personal notes embedded in company profiles
      const allCompanies = await companyRepository.getAll();
      for (const c of allCompanies) {
        if (c.notes && c.notes.trim().length > 0) {
          unified.push({
            id: 'company_note_' + c.id,
            source: 'company',
            title: `${c.name} — Referral & Round Notes`,
            category: 'Company',
            tags: ['Company', c.name],
            content: c.notes,
            isPinned: false,
            linkedId: c.id,
            updatedAt: c.updatedAt || new Date().toISOString(),
          });
        }
      }

      setNotes(unified);
    } catch (e) {
      console.error('[useNotes] Error loading notes:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllNotes();
  }, [loadAllNotes]);

  // Create standalone note in notes table
  const createNote = useCallback(
    async (note: {
      title: string;
      category?: string;
      tags?: string[];
      content: string;
      isPinned?: boolean;
      linkedProblemId?: string;
    }) => {
      const now = new Date().toISOString();
      const id = 'note_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);

      const record: PersonalNote = {
        id,
        title: note.title.trim(),
        category: note.category || 'General',
        tags: note.tags || [],
        content: note.content || '',
        isPinned: Boolean(note.isPinned),
        linkedProblemId: note.linkedProblemId,
        isMistakeLog: false,
        createdAt: now,
        updatedAt: now,
      };

      await noteRepository.upsert(record);
      await loadAllNotes();
      return record;
    },
    [loadAllNotes]
  );

  // Update note
  const updateNote = useCallback(
    async (id: string, updates: Partial<PersonalNote>) => {
      // If note belongs to notes table:
      if (!id.startsWith('dsa_note_') && !id.startsWith('topic_note_') && !id.startsWith('company_note_')) {
        const existing = await noteRepository.getById(id);
        if (existing) {
          await noteRepository.upsert({
            ...existing,
            ...updates,
            id,
            updatedAt: new Date().toISOString(),
          });
        }
      }
      await loadAllNotes();
    },
    [loadAllNotes]
  );

  // Toggle Pinned
  const togglePin = useCallback(
    async (id: string) => {
      if (!id.startsWith('dsa_note_') && !id.startsWith('topic_note_') && !id.startsWith('company_note_')) {
        const existing = await noteRepository.getById(id);
        if (existing) {
          await noteRepository.upsert({
            ...existing,
            isPinned: !existing.isPinned,
            updatedAt: new Date().toISOString(),
          });
          await loadAllNotes();
        }
      }
    },
    [loadAllNotes]
  );

  // Delete note
  const deleteNote = useCallback(
    async (id: string) => {
      if (!id.startsWith('dsa_note_') && !id.startsWith('topic_note_') && !id.startsWith('company_note_')) {
        await noteRepository.delete(id);
      } else if (id.startsWith('dsa_note_')) {
        const pId = id.replace('dsa_note_', '');
        await db.problem_progress.update(pId, { personalNotes: '' });
      } else if (id.startsWith('topic_note_')) {
        const tId = id.replace('topic_note_', '');
        await db.topic_progress.update(tId, { notes: '' });
      } else if (id.startsWith('company_note_')) {
        const cId = id.replace('company_note_', '');
        const c = await companyRepository.getById(cId);
        if (c) {
          await companyRepository.upsert({ ...c, notes: '', updatedAt: new Date().toISOString() });
        }
      }
      await loadAllNotes();
    },
    [loadAllNotes]
  );

  // Unique tags across all notes
  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const n of notes) {
      for (const t of n.tags) {
        if (t && t.trim()) set.add(t.trim());
      }
    }
    return Array.from(set).sort();
  }, [notes]);

  // Unique categories
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    for (const n of notes) {
      if (n.category) set.add(n.category);
    }
    return Array.from(set).sort();
  }, [notes]);

  // Filtered & sorted notes
  const filteredNotes = useMemo(() => {
    return notes
      .filter((n) => {
        if (selectedCategory !== 'all' && n.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
        if (selectedTag !== 'all' && !n.tags.includes(selectedTag)) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = n.title.toLowerCase().includes(q);
          const matchContent = n.content.toLowerCase().includes(q);
          const matchCategory = n.category.toLowerCase().includes(q);
          const matchTag = n.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchContent && !matchCategory && !matchTag) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        // Pinned notes always float to top
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'oldest') {
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        }
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [notes, selectedCategory, selectedTag, searchQuery, sortBy]);

  return {
    notes: filteredNotes,
    rawNotesCount: notes.length,
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
    refresh: loadAllNotes,
  };
};
