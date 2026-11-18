/**
 * AK67 Phase 7: Analytics, Notes & Mistake Repository Verification Tests
 * Verifies exact 188 curriculum count, unified analytics aggregation across 10 pillars,
 * streak calculation from study sessions, weak area diagnostic flags,
 * mistake repository CRUD, unified notes aggregation, and backup integrity.
 */

import 'fake-indexeddb/auto';
import { AK67Database } from '../src/db/schema';
import { analyticsService, CURRICULUM_COUNTS } from '../src/services/analyticsService';
import { mistakeService, MISTAKE_CATEGORIES, MISTAKE_SUBJECTS } from '../src/services/mistakeService';
import { noteRepository } from '../src/db/repositories/noteRepository';
import { dsaProblems } from '../src/content/dsa';
import { cppTopics } from '../src/content/cpp';
import { sqlTopics } from '../src/content/sql';
import { dbmsTopics, osTopics, networkTopics, softwareEngTopics } from '../src/content/coreCS';
import { quantTopics, logicalTopics, verbalTopics } from '../src/content/aptitude';
import { backupEngine } from '../src/services/backup/backupEngine';
import { MockTestRecord, StudySession, TopicProgress, ProblemProgress } from '../src/types/database';

let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition: boolean, message: string): void {
  if (condition) {
    passedAssertions++;
    console.log(`  ✓ [PASS] ${message}`);
  } else {
    failedAssertions++;
    console.error(`  ✗ [FAIL] ${message}`);
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('AK67 Phase 7: Analytics, Notes & Mistake Repository Tests');
  console.log('======================================================\n');

  // -----------------------------------------------------------
  // Test Group 1: Exact Curriculum Count Verification (Strictly 188)
  // -----------------------------------------------------------
  console.log('--- Test Group 1: Curriculum Count (Strictly 188) ---');
  assert(dsaProblems.length === 67, `DSA problems count is exactly 67 (Actual: ${dsaProblems.length})`);
  assert(cppTopics.length === 17, `C++ topics count is exactly 17 (Actual: ${cppTopics.length})`);
  assert(sqlTopics.length === 21, `SQL topics count is exactly 21 (Actual: ${sqlTopics.length})`);
  assert(dbmsTopics.length === 11, `DBMS topics count is exactly 11 (Actual: ${dbmsTopics.length})`);
  assert(osTopics.length === 13, `OS topics count is exactly 13 (Actual: ${osTopics.length})`);
  assert(networkTopics.length === 13, `Computer Networks topics count is exactly 13 (Actual: ${networkTopics.length})`);
  assert(softwareEngTopics.length === 10, `Software Engineering topics count is exactly 10 (Actual: ${softwareEngTopics.length})`);

  const coreCSTotal = dbmsTopics.length + osTopics.length + networkTopics.length + softwareEngTopics.length;
  assert(coreCSTotal === 47, `Core CS topics total is exactly 47 (Actual: ${coreCSTotal})`);

  assert(quantTopics.length === 16, `Quantitative topics count is exactly 16 (Actual: ${quantTopics.length})`);
  assert(logicalTopics.length === 10, `Logical Reasoning topics count is exactly 10 (Actual: ${logicalTopics.length})`);
  assert(verbalTopics.length === 10, `Verbal Ability topics count is exactly 10 (Actual: ${verbalTopics.length})`);

  const aptitudeTotal = quantTopics.length + logicalTopics.length + verbalTopics.length;
  assert(aptitudeTotal === 36, `Aptitude topics total is exactly 36 (Actual: ${aptitudeTotal})`);

  const grandTotal = dsaProblems.length + cppTopics.length + sqlTopics.length + coreCSTotal + aptitudeTotal;
  assert(grandTotal === 188, `Total curriculum count strictly equals 188 (Actual: ${grandTotal})`);
  assert(CURRICULUM_COUNTS.total === 188, `CURRICULUM_COUNTS.total constant is 188 (Actual: ${CURRICULUM_COUNTS.total})`);

  // -----------------------------------------------------------
  // Test Group 2: Unified Analytics Aggregation Engine
  // -----------------------------------------------------------
  console.log('\n--- Test Group 2: Unified Analytics Engine ---');
  const testDb = new AK67Database('test_analytics_' + Date.now());

  // Initial empty state verification
  const initialAnalytics = await analyticsService.getUnifiedAnalytics(testDb);
  assert(initialAnalytics.totalCurriculumCount === 188, 'Initial analytics curriculum count is 188');
  assert(initialAnalytics.totalCompletedCount === 0, 'Initial completed count is 0');
  assert(initialAnalytics.overallCompletionPercentage === 0, 'Initial completion percentage is 0%');
  assert(initialAnalytics.subjects.length === 10, 'Analytics exposes exactly 10 subject pillars');

  // Populate some completed problems and topics
  const sampleProblem: ProblemProgress = {
    id: dsaProblems[0].id,
    topic: dsaProblems[0].category,
    difficulty: dsaProblems[0].difficulty,
    status: 'solved',
    personalNotes: 'Two pointer technique with hash map',
    bookmarked: true,
    solvedAt: new Date().toISOString(),
    revisionCount: 1,
    intervalDays: 3,
    easeFactor: 2.5,
  };
  await testDb.problem_progress.put(sampleProblem);

  const sampleCppTopic: TopicProgress = {
    id: cppTopics[0].id,
    category: 'cpp',
    status: 'completed',
    isMastered: true,
    completedCheckpoints: ['cp1', 'cp2'],
    totalCheckpoints: 2,
    notes: 'Pointers store memory addresses',
    lastStudiedAt: new Date().toISOString(),
  };
  await testDb.topic_progress.put(sampleCppTopic);

  const updatedAnalytics = await analyticsService.getUnifiedAnalytics(testDb);
  assert(updatedAnalytics.totalCompletedCount === 2, `Accurately aggregates 2 completed items (Actual: ${updatedAnalytics.totalCompletedCount})`);
  assert(
    updatedAnalytics.overallCompletionPercentage === Math.round((2 / 188) * 100),
    `Accurately computes completion percentage (${updatedAnalytics.overallCompletionPercentage}%)`
  );

  const dsaSubject = updatedAnalytics.subjects.find((s) => s.id === 'dsa');
  assert(dsaSubject !== undefined && dsaSubject.completedTopics === 1, 'DSA pillar reflects 1 solved problem');
  assert(dsaSubject?.totalTopics === 67, 'DSA pillar total is 67');

  const cppSubject = updatedAnalytics.subjects.find((s) => s.id === 'cpp');
  assert(cppSubject !== undefined && cppSubject.completedTopics === 1, 'C++ pillar reflects 1 completed topic');
  assert(cppSubject?.totalTopics === 17, 'C++ pillar total is 17');

  // -----------------------------------------------------------
  // Test Group 3: Streak Calculation and Activity Heatmap
  // -----------------------------------------------------------
  console.log('\n--- Test Group 3: Streak Math & Activity Heatmap ---');
  const today = new Date();
  const formatYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  const sessions: StudySession[] = [
    {
      id: 'session-1',
      date: formatYMD(twoDaysAgo),
      durationMinutes: 45,
      problemsAttempted: ['two-sum'],
      problemsSolved: ['two-sum'],
      notesCreated: 1,
    },
    {
      id: 'session-2',
      date: formatYMD(yesterday),
      durationMinutes: 60,
      problemsAttempted: ['stock-buy-sell'],
      problemsSolved: ['stock-buy-sell'],
      notesCreated: 0,
    },
    {
      id: 'session-3',
      date: formatYMD(today),
      durationMinutes: 30,
      problemsAttempted: [],
      problemsSolved: [],
      notesCreated: 1,
    },
  ];
  await testDb.study_sessions.bulkPut(sessions);

  const analyticsWithSessions = await analyticsService.getUnifiedAnalytics(testDb);
  assert(analyticsWithSessions.activity.totalMinutes === 135, 'Total study time correctly sums to 135 minutes');
  assert(analyticsWithSessions.activity.currentStreak >= 3, `Current streak is at least 3 consecutive days (Actual: ${analyticsWithSessions.activity.currentStreak})`);
  assert(analyticsWithSessions.activity.longestStreak >= 3, `Longest streak is at least 3 days (Actual: ${analyticsWithSessions.activity.longestStreak})`);
  assert(analyticsWithSessions.activity.activityHeatmap[formatYMD(today)] === 30, 'Heatmap records 30 minutes for today');

  // -----------------------------------------------------------
  // Test Group 4: Weak Area Detection Diagnostics
  // -----------------------------------------------------------
  console.log('\n--- Test Group 4: Weak Area Detection Diagnostics ---');
  // Add a poor mock test result (<60% accuracy) in quantitative aptitude
  const weakMockTest: MockTestRecord = {
    id: 'mock_weak_1',
    title: 'Quantitative Diagnostic Test',
    category: 'Quantitative Aptitude',
    totalQuestions: 10,
    correctCount: 4,
    score: 40,
    durationSeconds: 600,
    responses: [],
    completedAt: new Date().toISOString(),
  };
  await testDb.mock_tests.put(weakMockTest);

  const analyticsWithWeakArea = await analyticsService.getUnifiedAnalytics(testDb);
  const weakItems = analyticsWithWeakArea.weakAreas;
  assert(Array.isArray(weakItems), 'Weak areas returns a valid array');

  const quantWeakFlag = weakItems.find(
    (w) => w.subject === 'Quantitative Aptitude' && w.severity === 'needs_improvement'
  );
  assert(quantWeakFlag !== undefined, 'Accurately diagnoses Quantitative Aptitude as needs_improvement due to <60% accuracy');
  assert(
    quantWeakFlag?.flagReason.includes('Mock accuracy') || quantWeakFlag?.supportingData.includes('40%'),
    'Flag includes diagnostic reasoning and supporting accuracy data'
  );

  // -----------------------------------------------------------
  // Test Group 5: Mistake Repository CRUD & Persistence
  // -----------------------------------------------------------
  console.log('\n--- Test Group 5: Mistake Repository CRUD ---');
  assert(MISTAKE_CATEGORIES.length === 8, `Exactly 8 mistake categories defined (Actual: ${MISTAKE_CATEGORIES.length})`);
  assert(MISTAKE_SUBJECTS.length === 10, `Exactly 10 mistake subjects defined (Actual: ${MISTAKE_SUBJECTS.length})`);

  // 5a. Create mistake
  const createdMistake = await mistakeService.createMistake(
    {
      title: 'Off-by-one error in binary search loop condition',
      subject: 'DSA',
      relatedId: 'binary-search',
      mistakeCategory: 'Edge case missed',
      whatWentWrong: 'Used while(left < right) instead of while(left <= right)',
      correctApproach: 'When search range is inclusive [left, right], condition must be left <= right',
      personalLesson: 'Always trace 1-element and 2-element arrays on paper before coding',
      difficulty: 'Medium',
    },
    testDb
  );

  assert(createdMistake.id.startsWith('mistake_'), 'Mistake created with formatted id');
  assert(createdMistake.isMistakeLog === true, 'isMistakeLog is true');
  assert(createdMistake.reviewStatus === 'pending', 'Initial reviewStatus is pending');
  assert(createdMistake.difficulty === 'Medium', 'Difficulty set to Medium');

  // 5b. Retrieve all mistakes
  const allMistakes = await mistakeService.getAllMistakes(testDb);
  assert(allMistakes.length === 1, `Retrieves 1 mistake from database (Actual: ${allMistakes.length})`);
  assert(allMistakes[0].title.includes('Off-by-one'), 'Mistake title persists accurately');

  // 5c. Update mistake review status
  const updatedMistake = await mistakeService.updateMistakeStatus(createdMistake.id, 'reviewed', testDb);
  assert(updatedMistake?.reviewStatus === 'reviewed', 'Mistake reviewStatus updated to reviewed');

  const resolvedMistake = await mistakeService.updateMistakeStatus(createdMistake.id, 'resolved', testDb);
  assert(resolvedMistake?.reviewStatus === 'resolved', 'Mistake reviewStatus updated to resolved');

  // 5d. Search mistakes
  const searchResults = await mistakeService.searchMistakes('binary search', testDb);
  assert(searchResults.length === 1, 'Search finds mistake by title keyword');

  // -----------------------------------------------------------
  // Test Group 6: Personal Notes Manager & Search
  // -----------------------------------------------------------
  console.log('\n--- Test Group 6: Personal Notes Manager ---');
  const directNoteId = await noteRepository.upsert(
    {
      title: 'SQL Window Functions Cheat Sheet',
      category: 'SQL',
      tags: ['SQL', 'WindowFunctions', 'DENSE_RANK'],
      content: 'ROW_NUMBER vs RANK vs DENSE_RANK explanation with partition by',
      isPinned: true,
      isMistakeLog: false,
    },
    testDb
  );

  const retrievedNote = await noteRepository.getById(directNoteId, testDb);
  assert(retrievedNote !== undefined, 'Direct note persisted successfully');
  assert(retrievedNote?.isPinned === true, 'Direct note retains isPinned = true');
  assert(retrievedNote?.tags.includes('DENSE_RANK') === true, 'Tags persisted as array');

  const searchNoteResults = await noteRepository.search('DENSE_RANK', testDb);
  assert(searchNoteResults.length >= 1, 'Search finds note by custom tag keyword');

  // -----------------------------------------------------------
  // Test Group 7: Backup Export & Restoration Integrity
  // -----------------------------------------------------------
  console.log('\n--- Test Group 7: Backup Integrity with Notes & Mistakes ---');
  const backupData = await backupEngine.generateExport(testDb);

  assert(backupData.appName === 'AK67', 'Backup file appName is AK67');
  assert(backupData.backupFormatVersion === 1, 'Backup format version is 1');
  assert(Array.isArray(backupData.data.notes), 'Backup contains notes table array');
  assert(backupData.data.notes.length >= 2, `Backup contains both note and mistake records (Actual: ${backupData.data.notes.length})`);

  const backupMistake = backupData.data.notes.find((n: any) => n.isMistakeLog === true);
  assert(backupMistake !== undefined, 'Exported backup contains structured mistake record');
  assert(backupMistake.mistakeCategory === 'Edge case missed', 'Mistake category preserved in backup export');
  assert(backupMistake.reviewStatus === 'resolved', 'Review status preserved in backup export');

  // Clean up test database
  await testDb.delete();

  // -----------------------------------------------------------
  // Summary
  // -----------------------------------------------------------
  console.log('\n======================================================');
  console.log(`Phase 7 Verification Summary: ${passedAssertions} PASSED, ${failedAssertions} FAILED`);
  console.log('======================================================\n');

  if (failedAssertions > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
