import { db, AK67Database } from '@/db';
import { noteRepository } from '@/db/repositories/noteRepository';
import {
  PersonalNote,
  MistakeCategory,
  MistakeReviewStatus,
} from '@/types/database';

export interface CreateMistakeInput {
  title: string;
  subject: string;
  relatedId?: string;
  mistakeCategory: MistakeCategory;
  whatWentWrong: string;
  correctApproach: string;
  personalLesson: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export const MISTAKE_CATEGORIES: MistakeCategory[] = [
  'Conceptual misunderstanding',
  'Incorrect formula',
  'Logical error',
  'Syntax error',
  'Edge case missed',
  'Time management',
  'Careless mistake',
  'Misread question',
];

export const MISTAKE_SUBJECTS = [
  'DSA',
  'C++',
  'SQL',
  'DBMS',
  'OS',
  'Computer Networks',
  'Software Engineering',
  'Quantitative Aptitude',
  'Logical Reasoning',
  'Verbal Ability',
];

export const mistakeService = {
  /**
   * Retrieves all mistakes from the persistent notes repository.
   */
  async getAllMistakes(database: AK67Database = db): Promise<PersonalNote[]> {
    const all = await noteRepository.getAll(database);
    return all.filter((n) => n.isMistakeLog === true);
  },

  /**
   * Creates a new structured mistake entry.
   */
  async createMistake(
    input: CreateMistakeInput,
    database: AK67Database = db
  ): Promise<PersonalNote> {
    const now = new Date().toISOString();
    const id = 'mistake_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);

    const record: PersonalNote = {
      id,
      title: input.title.trim(),
      category: input.subject,
      subject: input.subject,
      relatedId: input.relatedId,
      mistakeCategory: input.mistakeCategory,
      mistakeType: input.mistakeCategory,
      whatWentWrong: input.whatWentWrong.trim(),
      correctApproach: input.correctApproach.trim(),
      personalLesson: input.personalLesson.trim(),
      dateRecorded: now,
      reviewStatus: 'pending',
      difficulty: input.difficulty || 'Medium',
      isMistakeLog: true,
      tags: ['Mistake', input.subject, input.mistakeCategory],
      content: `### What Went Wrong\n${input.whatWentWrong}\n\n### Correct Approach\n${input.correctApproach}\n\n### Personal Lesson\n${input.personalLesson}`,
      createdAt: now,
      updatedAt: now,
    };

    await noteRepository.upsert(record, database);
    return record;
  },

  /**
   * Updates an existing mistake entry.
   */
  async updateMistake(
    id: string,
    updates: Partial<PersonalNote>,
    database: AK67Database = db
  ): Promise<PersonalNote | undefined> {
    const existing = await noteRepository.getById(id, database);
    if (!existing) return undefined;

    const merged: PersonalNote = {
      ...existing,
      ...updates,
      id,
      isMistakeLog: true,
      updatedAt: new Date().toISOString(),
    };

    await noteRepository.upsert(merged, database);
    return merged;
  },

  /**
   * Updates review status (e.g. pending -> reviewed -> resolved).
   */
  async updateStatus(
    id: string,
    reviewStatus: MistakeReviewStatus,
    database: AK67Database = db
  ): Promise<PersonalNote | undefined> {
    const existing = await noteRepository.getById(id, database);
    if (!existing) return undefined;

    const updated: PersonalNote = {
      ...existing,
      reviewStatus,
      updatedAt: new Date().toISOString(),
    };
    await noteRepository.upsert(updated, database);
    return updated;
  },

  /**
   * Alias for updateStatus
   */
  async updateMistakeStatus(
    id: string,
    reviewStatus: MistakeReviewStatus,
    database: AK67Database = db
  ): Promise<PersonalNote | undefined> {
    return this.updateStatus(id, reviewStatus, database);
  },

  /**
   * Deletes a mistake entry.
   */
  async deleteMistake(id: string, database: AK67Database = db): Promise<void> {
    await noteRepository.delete(id, database);
  },

  /**
   * Searches mistakes by query across title, notes, and lessons.
   */
  async searchMistakes(query: string, database: AK67Database = db): Promise<PersonalNote[]> {
    const q = (query || '').trim().toLowerCase();
    const all = await this.getAllMistakes(database);
    if (!q) return all;
    return all.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.whatWentWrong && m.whatWentWrong.toLowerCase().includes(q)) ||
        (m.correctApproach && m.correctApproach.toLowerCase().includes(q)) ||
        (m.personalLesson && m.personalLesson.toLowerCase().includes(q)) ||
        (Array.isArray(m.tags) && m.tags.some((t) => t.toLowerCase().includes(q)))
    );
  },
};
