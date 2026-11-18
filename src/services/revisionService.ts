import { db, AK67Database } from '../db';
import { ProblemProgress, TopicProgress } from '../types/database';
import { dsaProblems } from '../content/dsa';
import { cppTopics } from '../content/cpp';
import { sqlTopics } from '../content/sql';
import { allCoreCSTopics } from '../content/coreCS';
import { allAptitudeTopics } from '../content/aptitude';

export const SPATIAL_INTERVALS = [1, 3, 7, 14, 30] as const;

export type RevisionDomain =
  | 'DSA'
  | 'C++'
  | 'SQL'
  | 'DBMS'
  | 'OS'
  | 'Computer Networks'
  | 'Software Engineering'
  | 'Aptitude';

export interface RevisionItem {
  id: string;
  itemType: 'dsa' | 'topic';
  domain: RevisionDomain;
  title: string;
  subtitle?: string;
  difficulty?: string;
  nextRevisionDate: string; // YYYY-MM-DD
  intervalDays: number;
  revisionCount: number;
  lastRevisedAt?: string;
  daysDiff: number; // < 0 overdue, 0 due today, > 0 upcoming
  notes?: string;
}

export interface RevisionQueueData {
  dueToday: RevisionItem[];
  overdue: RevisionItem[];
  upcoming: RevisionItem[];
  completed: RevisionItem[];
  totalActive: number;
}

// ----------------- Date Utility Functions -----------------

export function formatIsoDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseIsoDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  // Noon prevents daylight saving / time zone edge flips
  return new Date(year, month - 1, day, 12, 0, 0);
}

export function getTodayStr(): string {
  return formatIsoDate(new Date());
}

export function addDays(baseDateStr: string, daysToAdd: number): string {
  const d = parseIsoDate(baseDateStr);
  d.setDate(d.getDate() + daysToAdd);
  return formatIsoDate(d);
}

export function diffInDays(targetDateStr: string, baseDateStr: string = getTodayStr()): number {
  const target = parseIsoDate(targetDateStr);
  const base = parseIsoDate(baseDateStr);
  const msDiff = target.getTime() - base.getTime();
  return Math.round(msDiff / (1000 * 60 * 60 * 24));
}

export function getNextInterval(currentInterval?: number): number {
  if (!currentInterval || currentInterval < 1) return 1;
  const idx = SPATIAL_INTERVALS.indexOf(currentInterval as (typeof SPATIAL_INTERVALS)[number]);
  if (idx === -1) {
    const next = SPATIAL_INTERVALS.find((i) => i > currentInterval);
    return next ?? 30;
  }
  if (idx + 1 < SPATIAL_INTERVALS.length) {
    return SPATIAL_INTERVALS[idx + 1];
  }
  return 30;
}

// ----------------- Catalog Lookups -----------------

interface CatalogMetadata {
  title: string;
  domain: RevisionDomain;
  subtitle?: string;
  difficulty?: string;
}

const catalogMap = new Map<string, CatalogMetadata>();

// 1. DSA
for (const p of dsaProblems) {
  catalogMap.set(p.id, {
    title: p.title,
    domain: 'DSA',
    subtitle: p.category,
    difficulty: p.difficulty,
  });
}

// 2. C++
for (const t of cppTopics) {
  catalogMap.set(t.id, {
    title: t.title,
    domain: 'C++',
    subtitle: 'C++ Core Concept',
  });
}

// 3. SQL
for (const t of sqlTopics) {
  catalogMap.set(t.id, {
    title: t.title,
    domain: 'SQL',
    subtitle: 'SQL & Relational DB',
  });
}

// 4. Core CS
for (const t of allCoreCSTopics) {
  let domain: RevisionDomain = 'OS';
  if (t.category === 'dbms') domain = 'DBMS';
  else if (t.category === 'os') domain = 'OS';
  else if (t.category === 'cn') domain = 'Computer Networks';
  else if (t.category === 'se') domain = 'Software Engineering';

  catalogMap.set(t.id, {
    title: t.title,
    domain,
    subtitle: t.subject,
  });
}

// 5. Aptitude
for (const t of allAptitudeTopics) {
  catalogMap.set(t.id, {
    title: t.title,
    domain: 'Aptitude',
    subtitle:
      t.category === 'quantitative'
        ? 'Quantitative Aptitude'
        : t.category === 'logical'
        ? 'Logical Reasoning'
        : 'Verbal Ability',
  });
}

export function getCatalogMetadata(id: string): CatalogMetadata {
  return (
    catalogMap.get(id) || {
      title: id,
      domain: 'DSA',
      subtitle: 'Topic',
    }
  );
}

// ----------------- Revision Service -----------------

export const revisionService = {
  addDays,
  getTodayStr,
  diffInDays,
  getNextInterval,

  /**
   * Fetches all scheduled revision items from IndexedDB, separated into buckets:
   * dueToday, overdue, upcoming, and completed.
   */
  async getRevisionQueue(database: AK67Database = db): Promise<RevisionQueueData> {
    const todayStr = getTodayStr();

    // Fetch problem progresses and topic progresses
    const [problems, topics] = await Promise.all([
      database.problem_progress.toArray(),
      database.topic_progress.toArray(),
    ]);

    const dueToday: RevisionItem[] = [];
    const overdue: RevisionItem[] = [];
    const upcoming: RevisionItem[] = [];
    const completed: RevisionItem[] = [];

    // 1. Process DSA problems
    for (const p of problems) {
      const meta = getCatalogMetadata(p.id);
      const isEnrolled = Boolean(p.nextRevisionDate);

      if (isEnrolled && p.nextRevisionDate) {
        const days = diffInDays(p.nextRevisionDate, todayStr);
        const item: RevisionItem = {
          id: p.id,
          itemType: 'dsa',
          domain: meta.domain,
          title: meta.title,
          subtitle: meta.subtitle,
          difficulty: meta.difficulty,
          nextRevisionDate: p.nextRevisionDate,
          intervalDays: p.intervalDays || 1,
          revisionCount: p.revisionCount || 0,
          lastRevisedAt: p.lastAttemptedAt,
          daysDiff: days,
          notes: p.personalNotes,
        };

        if (days < 0) {
          overdue.push(item);
        } else if (days === 0) {
          dueToday.push(item);
        } else {
          upcoming.push(item);
        }
      }

      if ((p.revisionCount || 0) > 0) {
        completed.push({
          id: p.id,
          itemType: 'dsa',
          domain: meta.domain,
          title: meta.title,
          subtitle: meta.subtitle,
          difficulty: meta.difficulty,
          nextRevisionDate: p.nextRevisionDate || todayStr,
          intervalDays: p.intervalDays || 1,
          revisionCount: p.revisionCount,
          lastRevisedAt: p.lastAttemptedAt,
          daysDiff: p.nextRevisionDate ? diffInDays(p.nextRevisionDate, todayStr) : 0,
          notes: p.personalNotes,
        });
      }
    }

    // 2. Process Topics (C++, SQL, Core CS, Aptitude)
    for (const t of topics) {
      const meta = getCatalogMetadata(t.id);
      const isEnrolled = Boolean(t.nextRevisionDate) || Boolean(t.inRevisionQueue);

      if (isEnrolled && t.nextRevisionDate) {
        const days = diffInDays(t.nextRevisionDate, todayStr);
        const item: RevisionItem = {
          id: t.id,
          itemType: 'topic',
          domain: meta.domain,
          title: meta.title,
          subtitle: meta.subtitle,
          nextRevisionDate: t.nextRevisionDate,
          intervalDays: t.intervalDays || 1,
          revisionCount: t.revisionCount || 0,
          lastRevisedAt: t.lastRevisedAt || t.lastStudiedAt,
          daysDiff: days,
          notes: t.notes,
        };

        if (days < 0) {
          overdue.push(item);
        } else if (days === 0) {
          dueToday.push(item);
        } else {
          upcoming.push(item);
        }
      }

      if ((t.revisionCount || 0) > 0) {
        completed.push({
          id: t.id,
          itemType: 'topic',
          domain: meta.domain,
          title: meta.title,
          subtitle: meta.subtitle,
          nextRevisionDate: t.nextRevisionDate || todayStr,
          intervalDays: t.intervalDays || 1,
          revisionCount: t.revisionCount || 0,
          lastRevisedAt: t.lastRevisedAt || t.lastStudiedAt,
          daysDiff: t.nextRevisionDate ? diffInDays(t.nextRevisionDate, todayStr) : 0,
          notes: t.notes,
        });
      }
    }

    // Sort overdue by most overdue first (ascending daysDiff: -5 before -1)
    overdue.sort((a, b) => a.daysDiff - b.daysDiff);
    // Sort upcoming by earliest due first (ascending daysDiff: 1 before 5)
    upcoming.sort((a, b) => a.daysDiff - b.daysDiff);
    // Sort completed by revision count descending
    completed.sort((a, b) => b.revisionCount - a.revisionCount);

    return {
      dueToday,
      overdue,
      upcoming,
      completed,
      totalActive: dueToday.length + overdue.length + upcoming.length,
    };
  },

  /**
   * Marks an item as reviewed today and advances its spaced repetition interval.
   */
  async markRevised(id: string, itemType: 'dsa' | 'topic', database: AK67Database = db): Promise<void> {
    const todayStr = getTodayStr();
    const nowIso = new Date().toISOString();

    if (itemType === 'dsa') {
      const existing = await database.problem_progress.get(id);
      const currentInterval = existing?.intervalDays || 1;
      const nextInterval = getNextInterval(currentInterval);
      const nextDate = addDays(todayStr, nextInterval);
      const nextCount = (existing?.revisionCount || 0) + 1;

      if (existing) {
        await database.problem_progress.update(id, {
          revisionCount: nextCount,
          intervalDays: nextInterval,
          nextRevisionDate: nextDate,
          lastAttemptedAt: nowIso,
          status: 'solved',
        });
      } else {
        const meta = getCatalogMetadata(id);
        const newRecord: ProblemProgress = {
          id,
          topic: meta.subtitle || 'General',
          difficulty: (meta.difficulty as any) || 'Medium',
          status: 'solved',
          personalNotes: '',
          bookmarked: false,
          lastAttemptedAt: nowIso,
          solvedAt: nowIso,
          revisionCount: 1,
          intervalDays: nextInterval,
          easeFactor: 2.5,
          nextRevisionDate: nextDate,
        };
        await database.problem_progress.put(newRecord);
      }
    } else {
      const existing = await database.topic_progress.get(id);
      const currentInterval = existing?.intervalDays || 1;
      const nextInterval = getNextInterval(currentInterval);
      const nextDate = addDays(todayStr, nextInterval);
      const nextCount = (existing?.revisionCount || 0) + 1;

      if (existing) {
        await database.topic_progress.update(id, {
          revisionCount: nextCount,
          intervalDays: nextInterval,
          nextRevisionDate: nextDate,
          lastRevisedAt: nowIso,
          lastStudiedAt: nowIso,
          inRevisionQueue: true,
        });
      } else {
        const meta = getCatalogMetadata(id);
        const newRecord: TopicProgress = {
          id,
          category: meta.domain.toLowerCase(),
          totalCheckpoints: 5,
          completedCheckpoints: [],
          isMastered: true,
          notes: '',
          lastStudiedAt: nowIso,
          lastRevisedAt: nowIso,
          revisionCount: 1,
          intervalDays: nextInterval,
          nextRevisionDate: nextDate,
          inRevisionQueue: true,
        };
        await database.topic_progress.put(newRecord);
      }
    }
  },

  /**
   * Postpones the revision by N days from today without advancing the interval.
   */
  async postponeItem(
    id: string,
    itemType: 'dsa' | 'topic',
    daysToAdd: number = 1,
    database: AK67Database = db
  ): Promise<void> {
    const todayStr = getTodayStr();
    const newNextDate = addDays(todayStr, daysToAdd);

    if (itemType === 'dsa') {
      const existing = await database.problem_progress.get(id);
      if (existing) {
        await database.problem_progress.update(id, {
          nextRevisionDate: newNextDate,
        });
      }
    } else {
      const existing = await database.topic_progress.get(id);
      if (existing) {
        await database.topic_progress.update(id, {
          nextRevisionDate: newNextDate,
          inRevisionQueue: true,
        });
      }
    }
  },

  /**
   * Removes an item from the active revision queue.
   */
  async removeFromQueue(id: string, itemType: 'dsa' | 'topic', database: AK67Database = db): Promise<void> {
    if (itemType === 'dsa') {
      const existing = await database.problem_progress.get(id);
      if (existing) {
        await database.problem_progress.update(id, {
          nextRevisionDate: undefined,
        });
      }
    } else {
      const existing = await database.topic_progress.get(id);
      if (existing) {
        await database.topic_progress.update(id, {
          nextRevisionDate: undefined,
          inRevisionQueue: false,
        });
      }
    }
  },

  /**
   * Enrolls an item into the active revision queue.
   */
  async enrollItem(
    id: string,
    itemType: 'dsa' | 'topic',
    daysUntilDue: number = 1,
    database: AK67Database = db
  ): Promise<void> {
    const targetDate = addDays(getTodayStr(), daysUntilDue);

    if (itemType === 'dsa') {
      const existing = await database.problem_progress.get(id);
      if (existing) {
        await database.problem_progress.update(id, {
          nextRevisionDate: targetDate,
          intervalDays: existing.intervalDays || 1,
        });
      } else {
        const meta = getCatalogMetadata(id);
        const newRecord: ProblemProgress = {
          id,
          topic: meta.subtitle || 'General',
          difficulty: (meta.difficulty as any) || 'Medium',
          status: 'attempted',
          personalNotes: '',
          bookmarked: false,
          revisionCount: 0,
          intervalDays: 1,
          easeFactor: 2.5,
          nextRevisionDate: targetDate,
        };
        await database.problem_progress.put(newRecord);
      }
    } else {
      const existing = await database.topic_progress.get(id);
      if (existing) {
        await database.topic_progress.update(id, {
          nextRevisionDate: targetDate,
          intervalDays: existing.intervalDays || 1,
          inRevisionQueue: true,
        });
      } else {
        const meta = getCatalogMetadata(id);
        const newRecord: TopicProgress = {
          id,
          category: meta.domain.toLowerCase(),
          totalCheckpoints: 5,
          completedCheckpoints: [],
          isMastered: false,
          notes: '',
          lastStudiedAt: new Date().toISOString(),
          revisionCount: 0,
          intervalDays: 1,
          nextRevisionDate: targetDate,
          inRevisionQueue: true,
        };
        await database.topic_progress.put(newRecord);
      }
    }
  },
};
