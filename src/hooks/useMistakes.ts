import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  PersonalNote,
  MistakeReviewStatus,
} from '@/types/database';
import { mistakeService, CreateMistakeInput } from '@/services/mistakeService';

export const useMistakes = () => {
  const [mistakes, setMistakes] = useState<PersonalNote[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const loadMistakes = useCallback(async () => {
    try {
      setLoading(true);
      const list = await mistakeService.getAllMistakes();
      setMistakes(list);
    } catch (e) {
      console.error('[useMistakes] Error loading mistakes:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMistakes();
  }, [loadMistakes]);

  const addMistake = useCallback(
    async (input: CreateMistakeInput) => {
      const created = await mistakeService.createMistake(input);
      await loadMistakes();
      return created;
    },
    [loadMistakes]
  );

  const updateMistake = useCallback(
    async (id: string, updates: Partial<PersonalNote>) => {
      const updated = await mistakeService.updateMistake(id, updates);
      await loadMistakes();
      return updated;
    },
    [loadMistakes]
  );

  const setStatus = useCallback(
    async (id: string, status: MistakeReviewStatus) => {
      await mistakeService.updateStatus(id, status);
      await loadMistakes();
    },
    [loadMistakes]
  );

  const deleteMistake = useCallback(
    async (id: string) => {
      await mistakeService.deleteMistake(id);
      await loadMistakes();
    },
    [loadMistakes]
  );

  const filteredMistakes = useMemo(() => {
    return mistakes.filter((m) => {
      if (filterSubject !== 'all' && (m.subject || m.category) !== filterSubject) {
        return false;
      }
      if (filterCategory !== 'all' && (m.mistakeCategory || m.mistakeType) !== filterCategory) {
        return false;
      }
      if (filterStatus !== 'all' && (m.reviewStatus || 'pending') !== filterStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = m.title.toLowerCase().includes(q);
        const inWrong = (m.whatWentWrong || '').toLowerCase().includes(q);
        const inCorrect = (m.correctApproach || '').toLowerCase().includes(q);
        const inLesson = (m.personalLesson || '').toLowerCase().includes(q);
        const inSubject = (m.subject || m.category).toLowerCase().includes(q);
        if (!inTitle && !inWrong && !inCorrect && !inLesson && !inSubject) {
          return false;
        }
      }
      return true;
    });
  }, [mistakes, filterSubject, filterCategory, filterStatus, searchQuery]);

  return {
    mistakes,
    filteredMistakes,
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
    refresh: loadMistakes,
  };
};
