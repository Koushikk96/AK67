import { db, AK67Database } from '@/db';
import { dsaProblems } from '@/content/dsa';
import { cppTopics } from '@/content/cpp';
import { sqlTopics } from '@/content/sql';
import {
  dbmsTopics,
  osTopics,
  networkTopics,
  softwareEngTopics,
} from '@/content/coreCS';
import {
  quantTopics,
  logicalTopics,
  verbalTopics,
} from '@/content/aptitude';
import {
  ProblemProgress,
  TopicProgress,
  MockTestRecord,
} from '@/types/database';
import { RouteId } from '@/types/navigation';

export interface SubjectAnalytics {
  id: string;
  name: string;
  categoryKey: string;
  totalTopics: number;
  completedTopics: number;
  learningTopics: number;
  completionPercentage: number;
  revisionBacklog: number;
  mockAccuracy?: number;
  mockTestsAttempted?: number;
  route: RouteId;
}

export interface WeakAreaItem {
  id: string;
  subject: string;
  topicTitle: string;
  severity: 'needs_improvement' | 'moderate' | 'strong' | 'insufficient_data' | 'not_started';
  flagReason: string;
  supportingData: string;
  recommendedAction: string;
  linkRoute: RouteId;
  linkId?: string;
}

export interface StudyActivitySummary {
  dailyMinutes: number;
  weeklyMinutes: number;
  monthlyMinutes: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  activityHeatmap: Record<string, number>; // YYYY-MM-DD -> minutes
  problemsSolvedOverTime: { date: string; count: number }[];
  topicsCompletedOverTime: { date: string; count: number }[];
}

export interface UnifiedAnalyticsData {
  totalCurriculumCount: number; // Exactly 188
  totalCompletedCount: number;
  totalLearningCount: number;
  totalRevisionCount: number;
  overallCompletionPercentage: number;

  totalStudyMinutes: number;
  totalMockTestsAttempted: number;
  averageMockScorePercentage: number;
  highestMockScorePercentage: number;
  averageMockAccuracyPercentage: number;

  subjects: SubjectAnalytics[];
  weakAreas: WeakAreaItem[];
  activity: StudyActivitySummary;
  mockHistory: MockTestRecord[];
}

// Curriculum constant counts
export const CURRICULUM_COUNTS = {
  dsa: 67,
  cpp: 17,
  sql: 21,
  dbms: 11,
  os: 13,
  networks: 13,
  softwareEng: 10,
  quantitative: 16,
  logical: 10,
  verbal: 10,
  total: 188,
};

function getIsoDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function normalizeSubjectName(s: string): string {
  const lower = (s || '').toLowerCase();
  if (lower.includes('quant')) return 'Quantitative Aptitude';
  if (lower.includes('logic')) return 'Logical Reasoning';
  if (lower.includes('verb')) return 'Verbal Ability';
  if (lower.includes('cpp') || lower.includes('c++') || lower.includes('oop')) return 'C++';
  if (lower.includes('sql')) return 'SQL';
  if (lower.includes('dbms')) return 'DBMS';
  if (lower.includes('os') || lower.includes('operating')) return 'OS';
  if (lower.includes('network') || lower.includes('cn')) return 'Computer Networks';
  if (lower.includes('software') || lower.includes('se')) return 'Software Engineering';
  if (lower.includes('dsa') || lower.includes('algo')) return 'DSA';
  return s;
}

export const analyticsService = {
  /**
   * Aggregates live data across all persistent tables and content libraries.
   */
  async getUnifiedAnalytics(database: AK67Database = db): Promise<UnifiedAnalyticsData> {
    const [
      problemProgressList,
      topicProgressList,
      mockTestList,
      studySessionsList,
    ] = await Promise.all([
      database.problem_progress.toArray(),
      database.topic_progress.toArray(),
      database.mock_tests.orderBy('completedAt').reverse().toArray(),
      database.study_sessions.orderBy('date').toArray(),
    ]);

    const problemMap = new Map<string, ProblemProgress>();
    for (const p of problemProgressList) {
      problemMap.set(p.id, p);
    }

    const topicMap = new Map<string, TopicProgress>();
    for (const t of topicProgressList) {
      topicMap.set(t.id, t);
    }

    const todayStr = getIsoDate(new Date());

    // 1. Calculate Subject Metrics
    // -------------------------------------------------------------
    // DSA
    let dsaCompleted = 0;
    let dsaLearning = 0;
    let dsaRevision = 0;
    for (const p of dsaProblems) {
      const prog = problemMap.get(p.id);
      if (prog) {
        if (prog.status === 'solved') dsaCompleted++;
        else if (prog.status === 'attempted') dsaLearning++;
        if (prog.nextRevisionDate || prog.status === 'revise') dsaRevision++;
      }
    }

    // C++
    let cppCompleted = 0;
    let cppLearning = 0;
    let cppRevision = 0;
    for (const t of cppTopics) {
      const prog = topicMap.get(t.id);
      if (prog) {
        if (prog.status === 'completed' || prog.isMastered) cppCompleted++;
        else if (prog.status === 'learning') cppLearning++;
        if (prog.inRevisionQueue || prog.status === 'revise') cppRevision++;
      }
    }

    // SQL
    let sqlCompleted = 0;
    let sqlLearning = 0;
    let sqlRevision = 0;
    for (const t of sqlTopics) {
      const prog = topicMap.get(t.id);
      if (prog) {
        if (prog.status === 'completed' || prog.isMastered) sqlCompleted++;
        else if (prog.status === 'learning') sqlLearning++;
        if (prog.inRevisionQueue || prog.status === 'revise') sqlRevision++;
      }
    }

    // Core CS - DBMS
    let dbmsCompleted = 0;
    let dbmsLearning = 0;
    let dbmsRevision = 0;
    for (const t of dbmsTopics) {
      const prog = topicMap.get(t.id);
      if (prog) {
        if (prog.status === 'completed' || prog.isMastered) dbmsCompleted++;
        else if (prog.status === 'learning') dbmsLearning++;
        if (prog.inRevisionQueue || prog.status === 'revise') dbmsRevision++;
      }
    }

    // Core CS - OS
    let osCompleted = 0;
    let osLearning = 0;
    let osRevision = 0;
    for (const t of osTopics) {
      const prog = topicMap.get(t.id);
      if (prog) {
        if (prog.status === 'completed' || prog.isMastered) osCompleted++;
        else if (prog.status === 'learning') osLearning++;
        if (prog.inRevisionQueue || prog.status === 'revise') osRevision++;
      }
    }

    // Core CS - Networks
    let cnCompleted = 0;
    let cnLearning = 0;
    let cnRevision = 0;
    for (const t of networkTopics) {
      const prog = topicMap.get(t.id);
      if (prog) {
        if (prog.status === 'completed' || prog.isMastered) cnCompleted++;
        else if (prog.status === 'learning') cnLearning++;
        if (prog.inRevisionQueue || prog.status === 'revise') cnRevision++;
      }
    }

    // Core CS - SE
    let seCompleted = 0;
    let seLearning = 0;
    let seRevision = 0;
    for (const t of softwareEngTopics) {
      const prog = topicMap.get(t.id);
      if (prog) {
        if (prog.status === 'completed' || prog.isMastered) seCompleted++;
        else if (prog.status === 'learning') seLearning++;
        if (prog.inRevisionQueue || prog.status === 'revise') seRevision++;
      }
    }

    // Aptitude - Quant
    let quantCompleted = 0;
    let quantLearning = 0;
    let quantRevision = 0;
    for (const t of quantTopics) {
      const prog = topicMap.get(t.id);
      if (prog) {
        if (prog.status === 'completed' || prog.isMastered) quantCompleted++;
        else if (prog.status === 'learning') quantLearning++;
        if (prog.inRevisionQueue || prog.status === 'revise') quantRevision++;
      }
    }

    // Aptitude - Logical
    let logCompleted = 0;
    let logLearning = 0;
    let logRevision = 0;
    for (const t of logicalTopics) {
      const prog = topicMap.get(t.id);
      if (prog) {
        if (prog.status === 'completed' || prog.isMastered) logCompleted++;
        else if (prog.status === 'learning') logLearning++;
        if (prog.inRevisionQueue || prog.status === 'revise') logRevision++;
      }
    }

    // Aptitude - Verbal
    let verbCompleted = 0;
    let verbLearning = 0;
    let verbRevision = 0;
    for (const t of verbalTopics) {
      const prog = topicMap.get(t.id);
      if (prog) {
        if (prog.status === 'completed' || prog.isMastered) verbCompleted++;
        else if (prog.status === 'learning') verbLearning++;
        if (prog.inRevisionQueue || prog.status === 'revise') verbRevision++;
      }
    }

    // Mock test category performance breakdown
    const mockSubjectAccuracy: Record<string, { totalQ: number; correctQ: number; tests: number }> = {};
    for (const mt of mockTestList) {
      if (mt.responses && mt.responses.length > 0) {
        for (const resp of mt.responses) {
          const rawSub = resp.questionId.startsWith('cpp-')
            ? 'C++'
            : resp.questionId.startsWith('oop-')
            ? 'C++'
            : resp.questionId.startsWith('dbms-')
            ? 'DBMS'
            : resp.questionId.startsWith('sql-')
            ? 'SQL'
            : resp.questionId.startsWith('os-')
            ? 'OS'
            : resp.questionId.startsWith('cn-')
            ? 'Computer Networks'
            : resp.questionId.startsWith('se-')
            ? 'Software Engineering'
            : resp.questionId.startsWith('quant-')
            ? 'Quantitative Aptitude'
            : resp.questionId.startsWith('log-')
            ? 'Logical Reasoning'
            : resp.questionId.startsWith('verb-')
            ? 'Verbal Ability'
            : mt.category;

          const sub = normalizeSubjectName(rawSub);
          if (!mockSubjectAccuracy[sub]) {
            mockSubjectAccuracy[sub] = { totalQ: 0, correctQ: 0, tests: 0 };
          }
          if (resp.selectedOptionIndex !== undefined) {
            mockSubjectAccuracy[sub].totalQ++;
            if (resp.isCorrect) mockSubjectAccuracy[sub].correctQ++;
          }
        }
      } else {
        const sub = normalizeSubjectName(mt.category);
        if (!mockSubjectAccuracy[sub]) {
          mockSubjectAccuracy[sub] = { totalQ: 0, correctQ: 0, tests: 0 };
        }
        const totalQ = mt.totalQuestions || 0;
        const correctQ = mt.correctCount ?? (mt as any).breakdown?.correctCount ?? (typeof mt.score === 'number' ? Math.round(mt.score) : 0);
        mockSubjectAccuracy[sub].totalQ += totalQ;
        mockSubjectAccuracy[sub].correctQ += correctQ;
        mockSubjectAccuracy[sub].tests += 1;
      }
    }

    const calcAccuracy = (key: string): number | undefined => {
      const norm = normalizeSubjectName(key);
      const data = mockSubjectAccuracy[norm] || mockSubjectAccuracy[key];
      if (!data || data.totalQ === 0) return undefined;
      return Math.round((data.correctQ / data.totalQ) * 100);
    };

    const subjects: SubjectAnalytics[] = [
      {
        id: 'dsa',
        name: 'Data Structures & Algorithms',
        categoryKey: 'DSA',
        totalTopics: CURRICULUM_COUNTS.dsa,
        completedTopics: dsaCompleted,
        learningTopics: dsaLearning,
        completionPercentage: Math.round((dsaCompleted / CURRICULUM_COUNTS.dsa) * 100),
        revisionBacklog: dsaRevision,
        route: 'dsa',
      },
      {
        id: 'cpp',
        name: 'C++ Language & STL',
        categoryKey: 'C++',
        totalTopics: CURRICULUM_COUNTS.cpp,
        completedTopics: cppCompleted,
        learningTopics: cppLearning,
        completionPercentage: Math.round((cppCompleted / CURRICULUM_COUNTS.cpp) * 100),
        revisionBacklog: cppRevision,
        mockAccuracy: calcAccuracy('C++'),
        route: 'cpp',
      },
      {
        id: 'sql',
        name: 'SQL & Relational Queries',
        categoryKey: 'SQL',
        totalTopics: CURRICULUM_COUNTS.sql,
        completedTopics: sqlCompleted,
        learningTopics: sqlLearning,
        completionPercentage: Math.round((sqlCompleted / CURRICULUM_COUNTS.sql) * 100),
        revisionBacklog: sqlRevision,
        mockAccuracy: calcAccuracy('SQL'),
        route: 'sql',
      },
      {
        id: 'dbms',
        name: 'Database Management Systems',
        categoryKey: 'DBMS',
        totalTopics: CURRICULUM_COUNTS.dbms,
        completedTopics: dbmsCompleted,
        learningTopics: dbmsLearning,
        completionPercentage: Math.round((dbmsCompleted / CURRICULUM_COUNTS.dbms) * 100),
        revisionBacklog: dbmsRevision,
        mockAccuracy: calcAccuracy('DBMS'),
        route: 'core-cs',
      },
      {
        id: 'os',
        name: 'Operating Systems',
        categoryKey: 'OS',
        totalTopics: CURRICULUM_COUNTS.os,
        completedTopics: osCompleted,
        learningTopics: osLearning,
        completionPercentage: Math.round((osCompleted / CURRICULUM_COUNTS.os) * 100),
        revisionBacklog: osRevision,
        mockAccuracy: calcAccuracy('Operating Systems'),
        route: 'core-cs',
      },
      {
        id: 'networks',
        name: 'Computer Networks',
        categoryKey: 'Computer Networks',
        totalTopics: CURRICULUM_COUNTS.networks,
        completedTopics: cnCompleted,
        learningTopics: cnLearning,
        completionPercentage: Math.round((cnCompleted / CURRICULUM_COUNTS.networks) * 100),
        revisionBacklog: cnRevision,
        mockAccuracy: calcAccuracy('Computer Networks'),
        route: 'core-cs',
      },
      {
        id: 'softwareEng',
        name: 'Software Engineering',
        categoryKey: 'Software Engineering',
        totalTopics: CURRICULUM_COUNTS.softwareEng,
        completedTopics: seCompleted,
        learningTopics: seLearning,
        completionPercentage: Math.round((seCompleted / CURRICULUM_COUNTS.softwareEng) * 100),
        revisionBacklog: seRevision,
        mockAccuracy: calcAccuracy('Software Engineering'),
        route: 'core-cs',
      },
      {
        id: 'quantitative',
        name: 'Quantitative Aptitude',
        categoryKey: 'Quantitative',
        totalTopics: CURRICULUM_COUNTS.quantitative,
        completedTopics: quantCompleted,
        learningTopics: quantLearning,
        completionPercentage: Math.round((quantCompleted / CURRICULUM_COUNTS.quantitative) * 100),
        revisionBacklog: quantRevision,
        mockAccuracy: calcAccuracy('Quantitative'),
        route: 'aptitude',
      },
      {
        id: 'logical',
        name: 'Logical Reasoning',
        categoryKey: 'Logical Reasoning',
        totalTopics: CURRICULUM_COUNTS.logical,
        completedTopics: logCompleted,
        learningTopics: logLearning,
        completionPercentage: Math.round((logCompleted / CURRICULUM_COUNTS.logical) * 100),
        revisionBacklog: logRevision,
        mockAccuracy: calcAccuracy('Logical Reasoning'),
        route: 'aptitude',
      },
      {
        id: 'verbal',
        name: 'Verbal Ability',
        categoryKey: 'Verbal Ability',
        totalTopics: CURRICULUM_COUNTS.verbal,
        completedTopics: verbCompleted,
        learningTopics: verbLearning,
        completionPercentage: Math.round((verbCompleted / CURRICULUM_COUNTS.verbal) * 100),
        revisionBacklog: verbRevision,
        mockAccuracy: calcAccuracy('Verbal Ability'),
        route: 'aptitude',
      },
    ];

    // Total Curriculum Overall Aggregates
    const totalCurriculumCount = CURRICULUM_COUNTS.total; // Exactly 188
    const totalCompletedCount =
      dsaCompleted +
      cppCompleted +
      sqlCompleted +
      dbmsCompleted +
      osCompleted +
      cnCompleted +
      seCompleted +
      quantCompleted +
      logCompleted +
      verbCompleted;

    const totalLearningCount =
      dsaLearning +
      cppLearning +
      sqlLearning +
      dbmsLearning +
      osLearning +
      cnLearning +
      seLearning +
      quantLearning +
      logLearning +
      verbLearning;

    const totalRevisionCount =
      dsaRevision +
      cppRevision +
      sqlRevision +
      dbmsRevision +
      osRevision +
      cnRevision +
      seRevision +
      quantRevision +
      logRevision +
      verbRevision;

    const overallCompletionPercentage =
      totalCurriculumCount > 0 ? Math.round((totalCompletedCount / totalCurriculumCount) * 100) : 0;

    // 2. Study Activity & Heatmap
    // -------------------------------------------------------------
    let totalStudyMinutes = 0;
    let dailyMinutes = 0;
    let weeklyMinutes = 0;
    let monthlyMinutes = 0;

    const heatmap: Record<string, number> = {};
    const sessionDays = new Set<string>();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoStr = getIsoDate(sevenDaysAgo);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = getIsoDate(thirtyDaysAgo);

    for (const session of studySessionsList) {
      const mins = session.durationMinutes || 0;
      totalStudyMinutes += mins;

      heatmap[session.date] = (heatmap[session.date] || 0) + mins;
      sessionDays.add(session.date);

      if (session.date === todayStr) {
        dailyMinutes += mins;
      }
      if (session.date >= sevenDaysAgoStr) {
        weeklyMinutes += mins;
      }
      if (session.date >= thirtyDaysAgoStr) {
        monthlyMinutes += mins;
      }
    }

    // Streak calculation (actual consecutive calendar days)
    const sortedDays = Array.from(sessionDays).sort();
    let currentStreak = 0;
    let longestStreak = 0;
    let runningStreak = 0;
    let prevDate: Date | null = null;

    for (const dayStr of sortedDays) {
      const curDate = new Date(dayStr + 'T00:00:00');
      if (!prevDate) {
        runningStreak = 1;
      } else {
        const diffMs = curDate.getTime() - prevDate.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          runningStreak++;
        } else {
          runningStreak = 1;
        }
      }
      if (runningStreak > longestStreak) longestStreak = runningStreak;
      prevDate = curDate;
    }

    // Determine if current streak is active (today or yesterday)
    if (sessionDays.has(todayStr)) {
      currentStreak = runningStreak;
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = getIsoDate(yesterday);
      if (sessionDays.has(yesterdayStr)) {
        currentStreak = runningStreak;
      } else {
        currentStreak = 0;
      }
    }

    // 3. Mock Test Analytics
    // -------------------------------------------------------------
    const totalMockTestsAttempted = mockTestList.length;
    let totalMockScore = 0;
    let highestMockScorePercentage = 0;
    let totalQuestionsAttempted = 0;
    let totalQuestionsCorrect = 0;

    for (const mt of mockTestList) {
      totalMockScore += mt.score;
      if (mt.score > highestMockScorePercentage) {
        highestMockScorePercentage = mt.score;
      }
      totalQuestionsCorrect += mt.correctCount;
      const att = mt.responses?.filter((r) => r.selectedOptionIndex !== undefined).length || mt.correctCount;
      totalQuestionsAttempted += att;
    }

    const averageMockScorePercentage =
      totalMockTestsAttempted > 0 ? Math.round(totalMockScore / totalMockTestsAttempted) : 0;
    const averageMockAccuracyPercentage =
      totalQuestionsAttempted > 0 ? Math.round((totalQuestionsCorrect / totalQuestionsAttempted) * 100) : 0;

    // 4. Weak Area Detection Engine
    // -------------------------------------------------------------
    const weakAreas: WeakAreaItem[] = [];

    // Signal A: Low Mock Test Accuracy by Subject
    for (const [subKey, data] of Object.entries(mockSubjectAccuracy)) {
      if (data.totalQ >= 3) {
        const acc = Math.round((data.correctQ / data.totalQ) * 100);
        if (acc < 60) {
          weakAreas.push({
            id: 'mock_weak_' + subKey.toLowerCase().replace(/[^a-z0-9]/g, '_'),
            subject: subKey,
            topicTitle: `${subKey} Mock Assessment Accuracy`,
            severity: acc < 50 ? 'needs_improvement' : 'moderate',
            flagReason: `Mock test accuracy in ${subKey} is critically below benchmark (${acc}% vs 70% target)`,
            supportingData: `${data.correctQ} correct out of ${data.totalQ} attempted across mock assessments (${acc}% accuracy)`,
            recommendedAction: `Focus on fundamentals and revise high-frequency interview MCQs for ${subKey}`,
            linkRoute: subKey.includes('C++')
              ? 'cpp'
              : subKey.includes('SQL')
              ? 'sql'
              : subKey.includes('Quantitative') || subKey.includes('Logical') || subKey.includes('Verbal')
              ? 'aptitude'
              : 'core-cs',
          });
        }
      }
    }

    // Signal B: Overdue Revisions (> 3 days overdue)
    for (const [id, prog] of topicMap.entries()) {
      if (prog.inRevisionQueue && prog.nextRevisionDate && prog.nextRevisionDate < todayStr) {
        const diffDays = Math.round(
          (new Date(todayStr).getTime() - new Date(prog.nextRevisionDate).getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays >= 3) {
          weakAreas.push({
            id: 'overdue_' + id,
            subject: prog.category ? prog.category.toUpperCase() : 'Technical',
            topicTitle: `Topic: ${id}`,
            severity: diffDays >= 7 ? 'needs_improvement' : 'moderate',
            flagReason: `Spaced revision is overdue by ${diffDays} days, causing active recall decay`,
            supportingData: `Scheduled revision was due on ${prog.nextRevisionDate}`,
            recommendedAction: `Complete scheduled active recall review in Spaced Revision`,
            linkRoute: 'revision',
            linkId: id,
          });
        }
      }
    }

    // Signal C: DSA Problems solved with 'hints' or 'solution'
    for (const [pId, pProg] of problemMap.entries()) {
      if (pProg.status === 'attempted' || pProg.status === 'revise') {
        const pObj = dsaProblems.find((p) => p.id === pId);
        if (pObj) {
          weakAreas.push({
            id: 'dsa_unresolved_' + pId,
            subject: 'DSA',
            topicTitle: `#${pObj.number} ${pObj.title} (${pObj.category})`,
            severity: pObj.difficulty === 'Hard' ? 'needs_improvement' : 'moderate',
            flagReason: `Problem marked for revision or incomplete without optimal independent solution`,
            supportingData: `Status: ${pProg.status} • Difficulty: ${pObj.difficulty}`,
            recommendedAction: `Perform a timed 30-minute sprint without looking at hints`,
            linkRoute: 'dsa',
            linkId: pId,
          });
        }
      }
    }

    // Rank weak areas: 'needs_improvement' first, then 'moderate'
    weakAreas.sort((a, b) => {
      if (a.severity === 'needs_improvement' && b.severity !== 'needs_improvement') return -1;
      if (b.severity === 'needs_improvement' && a.severity !== 'needs_improvement') return 1;
      return 0;
    });

    return {
      totalCurriculumCount,
      totalCompletedCount,
      totalLearningCount,
      totalRevisionCount,
      overallCompletionPercentage,

      totalStudyMinutes,
      totalMockTestsAttempted,
      averageMockScorePercentage,
      highestMockScorePercentage,
      averageMockAccuracyPercentage,

      subjects,
      weakAreas,
      activity: {
        dailyMinutes,
        weeklyMinutes,
        monthlyMinutes,
        totalMinutes: totalStudyMinutes,
        currentStreak,
        longestStreak,
        activityHeatmap: heatmap,
        problemsSolvedOverTime: [],
        topicsCompletedOverTime: [],
      },
      mockHistory: mockTestList,
    };
  },
};
