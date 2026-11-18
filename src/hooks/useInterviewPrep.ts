import { useState, useEffect, useCallback } from 'react';
import type {
  InterviewSubject,
  ProjectPreparationTemplate,
} from '@/types/interview';
import {
  technicalInterviewQuestions,
  technicalInterviewSubjects,
  hrInterviewQuestions,
  defaultProjectTemplate,
} from '@/content/interviews';
import { noteRepository } from '@/db/repositories/noteRepository';

export const useInterviewPrep = () => {
  const [selectedSubject, setSelectedSubject] = useState<InterviewSubject | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hrNotes, setHrNotes] = useState<Record<string, string>>({});
  const [projectData, setProjectData] = useState<ProjectPreparationTemplate>(defaultProjectTemplate);
  const [loading, setLoading] = useState(true);

  // Load user's saved HR answers and project details from IndexedDB notes
  const loadStoredNotes = useCallback(async () => {
    try {
      setLoading(true);
      const allNotes = await noteRepository.getAll();

      // Load HR personal notes
      const hrMap: Record<string, string> = {};
      for (const n of allNotes) {
        if (n.category === 'Interview HR') {
          hrMap[n.title] = n.content;
        }
      }
      setHrNotes(hrMap);

      // Load Project details
      const projectNote = allNotes.find((n) => n.category === 'Interview Project');
      if (projectNote) {
        try {
          const parsed = JSON.parse(projectNote.content);
          setProjectData(parsed);
        } catch {
          // If plain text, retain default template
        }
      }
    } catch (e) {
      console.error('[useInterviewPrep] Error loading interview notes:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStoredNotes();
  }, [loadStoredNotes]);

  // Save personal answer for an HR question
  const saveHrNote = useCallback(async (questionId: string, content: string) => {
    setHrNotes((prev) => ({ ...prev, [questionId]: content }));
    const existing = (await noteRepository.getAll()).find(
      (n) => n.category === 'Interview HR' && n.title === questionId
    );

    const now = new Date().toISOString();
    await noteRepository.upsert({
      id: existing ? existing.id : 'note_hr_' + questionId,
      title: questionId,
      category: 'Interview HR',
      tags: ['HR', 'Placement'],
      content,
      isMistakeLog: false,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now,
    });
  }, []);

  // Save project defense template
  const saveProjectData = useCallback(async (updated: ProjectPreparationTemplate) => {
    setProjectData(updated);
    const existing = (await noteRepository.getAll()).find((n) => n.category === 'Interview Project');
    const now = new Date().toISOString();

    await noteRepository.upsert({
      id: existing ? existing.id : 'note_project_defense',
      title: 'Major Project Defense Blueprint',
      category: 'Interview Project',
      tags: ['Project', 'Architecture', 'Interview'],
      content: JSON.stringify(updated),
      isMistakeLog: false,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now,
    });
  }, []);

  // Filtered technical questions
  const filteredTechnicalQuestions = technicalInterviewQuestions.filter((q) => {
    if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(query);
      const matchA = q.answer.toLowerCase().includes(query);
      const matchTags = q.tags.some((t) => t.toLowerCase().includes(query));
      if (!matchQ && !matchA && !matchTags) return false;
    }
    return true;
  });

  return {
    technicalInterviewQuestions: filteredTechnicalQuestions,
    allTechnicalQuestionsCount: technicalInterviewQuestions.length,
    technicalInterviewSubjects,
    hrInterviewQuestions,
    selectedSubject,
    setSelectedSubject,
    searchQuery,
    setSearchQuery,
    hrNotes,
    saveHrNote,
    projectData,
    saveProjectData,
    loading,
    refreshNotes: loadStoredNotes,
  };
};
