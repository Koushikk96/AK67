/**
 * AK67 Phase 11B Verification: Python Mastery Backup & Restore Test Suite
 * Tests backup creation, format validation, schema integrity, and restoration (both merge and replace)
 * ensuring full persistence across Python and existing curriculum data.
 */

import 'fake-indexeddb/auto';
import { AK67Database } from '../src/db/schema';
import { topicRepository } from '../src/db/repositories/topicRepository';
import { problemRepository } from '../src/db/repositories/problemRepository';
import { mockTestRepository } from '../src/db/repositories/mockTestRepository';
import { noteRepository } from '../src/db/repositories/noteRepository';
import { backupEngine } from '../src/services/backup/backupEngine';
import { backupValidator } from '../src/services/backup/backupValidator';
import { TopicProgress, ProblemProgress } from '../src/types/database';

let testCount = 0;
let passedCount = 0;

function assert(condition: boolean, testName: string) {
  testCount += 1;
  if (condition) {
    passedCount += 1;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    console.error(`  ✗ [FAIL] ${testName}`);
    throw new Error(`Test assertion failed: ${testName}`);
  }
}

async function runPythonBackupRestoreSuite() {
  console.log('\n======================================================');
  console.log('AK67: Python Mastery Backup & Restore Verification Suite');
  console.log('======================================================\n');

  // Setup isolated test database
  const sourceDbName = `AK67_Audit_SourceDB_${Date.now()}`;
  const sourceDb = new AK67Database(sourceDbName);
  await sourceDb.open();
  assert(sourceDb.isOpen(), 'Source database opened successfully');

  console.log('\nStep 1: Populating Representative Python Progress & Existing Curriculum Data');

  // 1. Python Topic 1: Completed, Mastered, Bookmarked, Notes, Spaced Repetition
  const pyCompleted: TopicProgress = {
    id: 'py-01-intro-execution',
    category: 'python',
    status: 'completed',
    bookmarked: true,
    totalCheckpoints: 2,
    completedCheckpoints: ['py-01-cp-1', 'py-01-cp-2'],
    isMastered: true,
    notes: 'CPython uses bytecode compilation (.pyc) followed by the Python Virtual Machine (PVM).',
    lastStudiedAt: '2026-11-24T18:00:00.000Z',
    revisionCount: 3,
    intervalDays: 7,
    nextRevisionDate: '2026-12-01',
    lastRevisedAt: '2026-11-24T18:00:00.000Z',
    inRevisionQueue: true,
  };
  await topicRepository.upsert(pyCompleted, sourceDb);

  // 2. Python Topic 2: Learning (in-progress), 1 checkpoint done, not bookmarked
  const pyLearning: TopicProgress = {
    id: 'py-11-strings-methods',
    category: 'python',
    status: 'learning',
    bookmarked: false,
    totalCheckpoints: 3,
    completedCheckpoints: ['py-11-cp-1'],
    isMastered: false,
    notes: 'Strings are immutable Unicode sequences. Use .join() instead of += in loops.',
    lastStudiedAt: '2026-11-24T18:30:00.000Z',
    revisionCount: 0,
    intervalDays: 1,
    nextRevisionDate: '2026-11-25',
    inRevisionQueue: false,
  };
  await topicRepository.upsert(pyLearning, sourceDb);

  // 3. Python Topic 3: Revise, 0 checkpoints, personal note
  const pyRevise: TopicProgress = {
    id: 'py-31-decorators',
    category: 'python',
    status: 'revise',
    bookmarked: true,
    totalCheckpoints: 2,
    completedCheckpoints: [],
    isMastered: false,
    notes: 'Always use functools.wraps(fn) to preserve __name__ and docstrings.',
    lastStudiedAt: '2026-11-24T17:00:00.000Z',
    revisionCount: 1,
    intervalDays: 3,
    nextRevisionDate: '2026-11-27',
    inRevisionQueue: true,
  };
  await topicRepository.upsert(pyRevise, sourceDb);

  // 4. Non-Python Curriculum Data: C++ topic
  const cppTopic: TopicProgress = {
    id: 'cpp-smart-pointers',
    category: 'cpp',
    status: 'completed',
    bookmarked: false,
    totalCheckpoints: 3,
    completedCheckpoints: ['cpp-sp-1', 'cpp-sp-2', 'cpp-sp-3'],
    isMastered: true,
    notes: 'unique_ptr is zero-overhead move-only. shared_ptr has atomic ref count.',
    lastStudiedAt: '2026-11-20T10:00:00.000Z',
  };
  await topicRepository.upsert(cppTopic, sourceDb);

  // 5. Non-Python Curriculum Data: SQL topic
  const sqlTopic: TopicProgress = {
    id: 'sql-window-functions',
    category: 'sql',
    status: 'learning',
    bookmarked: true,
    totalCheckpoints: 2,
    completedCheckpoints: ['sql-wf-1'],
    isMastered: false,
    notes: 'ROW_NUMBER vs RANK vs DENSE_RANK handling of ties.',
    lastStudiedAt: '2026-11-21T12:00:00.000Z',
  };
  await topicRepository.upsert(sqlTopic, sourceDb);

  // 6. Non-Python Curriculum Data: DSA Problem
  const dsaProblem: ProblemProgress = {
    id: 'dsa-two-sum',
    topic: 'Arrays',
    difficulty: 'Easy',
    status: 'solved',
    personalNotes: 'Use hash map for complement lookup in O(N) time',
    bookmarked: true,
    revisionCount: 2,
    intervalDays: 7,
    easeFactor: 2.5,
    lastAttemptedAt: '2026-11-22T14:00:00.000Z',
    solvedAt: '2026-11-22T14:15:00.000Z',
  };
  await problemRepository.upsert(dsaProblem, sourceDb);

  // 7. Non-Python Curriculum Data: Mock Test
  await mockTestRepository.create(
    {
      id: 'mock-test-audit-1',
      title: 'TCS NQT Full Mock 1',
      category: 'full_mock',
      totalQuestions: 60,
      correctCount: 48,
      score: 80,
      durationSeconds: 3600,
      responses: [],
      completedAt: '2026-11-23T09:00:00.000Z',
    },
    sourceDb
  );

  // 8. General Note
  await noteRepository.upsert(
    {
      title: 'Global Python Strategy',
      category: 'python',
      tags: ['placement', 'python'],
      content: 'Focus on generator memory efficiency, dict internal hash tables, and async I/O.',
      isMistakeLog: false,
    },
    sourceDb
  );

  const initialTopics = await sourceDb.topic_progress.toArray();
  assert(initialTopics.length === 5, 'Source DB contains 5 topics (3 Python + 1 C++ + 1 SQL)');

  console.log('\nStep 2: Exporting Backup via backupEngine.generateExport()');
  const backupFile = await backupEngine.generateExport(sourceDb);

  assert(backupFile.appName === 'AK67', 'Export has valid appName AK67');
  assert(backupFile.schemaVersion === 1, 'Export has schemaVersion 1');
  assert(backupFile.data.topic_progress.length === 5, 'Export includes all 5 topics');
  assert(backupFile.data.problem_progress.length === 1, 'Export includes DSA problem');
  assert(backupFile.data.mock_tests.length === 1, 'Export includes mock test');
  assert(backupFile.data.notes.length === 1, 'Export includes personal note');

  console.log('\nStep 3: Validating Backup File Structure via backupValidator');
  const validation = backupValidator.validate(backupFile);
  assert(validation.isValid === true, 'backupValidator confirms file is 100% valid');

  console.log('\nStep 4: Verifying Python Topic Progress Integrity in Exported JSON');
  const exportedPy1 = backupFile.data.topic_progress.find((t) => t.id === 'py-01-intro-execution');
  assert(exportedPy1?.status === 'completed', 'py-01 status is completed');
  assert(exportedPy1?.bookmarked === true, 'py-01 is bookmarked');
  assert(exportedPy1?.completedCheckpoints.length === 2, 'py-01 has 2 completed checkpoints');
  assert(exportedPy1?.isMastered === true, 'py-01 isMastered is true');
  assert(exportedPy1?.revisionCount === 3, 'py-01 revisionCount is 3');
  assert(exportedPy1?.intervalDays === 7, 'py-01 intervalDays is 7');
  assert(exportedPy1?.nextRevisionDate === '2026-12-01', 'py-01 nextRevisionDate preserved');
  assert(exportedPy1?.notes.includes('CPython uses bytecode'), 'py-01 personal notes preserved');

  console.log('\nStep 5: Testing Clean Replace Restoration into targetDb');
  const replaceDbName = `AK67_Audit_ReplaceDB_${Date.now()}`;
  const replaceDb = new AK67Database(replaceDbName);
  await replaceDb.open();

  // Populate replaceDb with dummy record to confirm clearing
  await topicRepository.upsert(
    {
      id: 'dummy-topic',
      category: 'test',
      totalCheckpoints: 1,
      completedCheckpoints: [],
      isMastered: false,
      notes: 'will be wiped',
      lastStudiedAt: new Date().toISOString(),
    },
    replaceDb
  );

  const replaceResult = await backupEngine.restoreReplace(backupFile, replaceDb);
  assert(replaceResult.success === true, 'restoreReplace succeeded');

  const restoredReplaceTopics = await replaceDb.topic_progress.toArray();
  assert(restoredReplaceTopics.length === 5, 'Replace restored exactly 5 topics');
  assert(!restoredReplaceTopics.some((t) => t.id === 'dummy-topic'), 'Dummy topic was cleaned');

  const restoredPy1Replace = await topicRepository.getById('py-01-intro-execution', replaceDb);
  assert(restoredPy1Replace?.status === 'completed', 'Replace restored py-01 status completed');
  assert(restoredPy1Replace?.bookmarked === true, 'Replace restored py-01 bookmarked true');
  assert(restoredPy1Replace?.completedCheckpoints.length === 2, 'Replace restored py-01 checkpoints');
  assert(restoredPy1Replace?.notes === pyCompleted.notes, 'Replace restored py-01 exact notes');
  assert(restoredPy1Replace?.nextRevisionDate === '2026-12-01', 'Replace restored py-01 nextRevisionDate');

  const restoredCppReplace = await topicRepository.getById('cpp-smart-pointers', replaceDb);
  assert(restoredCppReplace !== undefined && restoredCppReplace.isMastered === true, 'Non-Python C++ topic preserved');

  const restoredDsaReplace = await problemRepository.getById('dsa-two-sum', replaceDb);
  assert(restoredDsaReplace !== undefined && restoredDsaReplace.status === 'solved', 'Non-Python DSA problem preserved');

  console.log('\nStep 6: Testing Merge Mode Restoration');
  const mergeDbName = `AK67_Audit_MergeDB_${Date.now()}`;
  const mergeDb = new AK67Database(mergeDbName);
  await mergeDb.open();

  // Existing local state in mergeDb:
  // py-01 was only 'learning' locally with 1 checkpoint, local note
  const localPy1: TopicProgress = {
    id: 'py-01-intro-execution',
    category: 'python',
    status: 'learning',
    bookmarked: false,
    totalCheckpoints: 2,
    completedCheckpoints: ['py-01-cp-1'],
    isMastered: false,
    notes: 'Local note from yesterday.',
    lastStudiedAt: '2026-11-23T10:00:00.000Z',
    revisionCount: 1,
    intervalDays: 2,
  };
  await topicRepository.upsert(localPy1, mergeDb);

  // An existing local DSA problem
  await problemRepository.upsert(
    {
      id: 'dsa-3sum',
      topic: 'Arrays',
      difficulty: 'Medium',
      status: 'attempted',
      personalNotes: 'Sort first then 2-pointer',
      bookmarked: false,
      revisionCount: 0,
      intervalDays: 1,
      easeFactor: 2.5,
      lastAttemptedAt: '2026-11-23T11:00:00.000Z',
    },
    mergeDb
  );

  const mergeResult = await backupEngine.restoreMerge(backupFile, mergeDb);
  assert(mergeResult.success === true, 'restoreMerge succeeded');

  const mergedTopics = await mergeDb.topic_progress.toArray();
  // 5 from backup + 0 extra topics (py-01 collided and merged)
  assert(mergedTopics.length === 5, 'Merge resolved conflicts and maintains correct topic count');

  const mergedPy1 = await topicRepository.getById('py-01-intro-execution', mergeDb);
  assert(mergedPy1?.status === 'completed', 'Merge upgraded status from learning to completed');
  assert(mergedPy1?.bookmarked === true, 'Merge combined bookmarked flag to true');
  assert(mergedPy1?.completedCheckpoints.length === 2, 'Merge united checkpoints set');
  assert(mergedPy1?.isMastered === true, 'Merge confirmed mastery');
  assert(mergedPy1?.revisionCount === 3, 'Merge kept higher revisionCount (3 vs 1)');
  assert(mergedPy1?.intervalDays === 7, 'Merge kept higher intervalDays (7 vs 2)');
  assert(mergedPy1?.nextRevisionDate === '2026-12-01', 'Merge kept scheduled revision date');
  assert(mergedPy1?.notes.includes('Local note') && mergedPy1?.notes.includes('CPython uses bytecode'), 'Merge appended both distinct notes without data loss');

  // Verify non-colliding local DSA problem in mergeDb remains intact
  const localDsaMerged = await problemRepository.getById('dsa-3sum', mergeDb);
  assert(localDsaMerged !== undefined && localDsaMerged.status === 'attempted', 'Local non-colliding DSA problem intact');

  // Verify imported DSA problem also present in mergeDb
  const importedDsaMerged = await problemRepository.getById('dsa-two-sum', mergeDb);
  assert(importedDsaMerged !== undefined && importedDsaMerged.status === 'solved', 'Imported DSA problem present in merged DB');

  // Clean up databases
  await sourceDb.delete();
  await replaceDb.delete();
  await mergeDb.delete();
  console.log('\nCleaned up all temporary test databases.');

  console.log('\n======================================================');
  console.log(`Python Backup & Restore Verification: ${passedCount} / ${testCount} Passed`);
  console.log('======================================================\n');
}

runPythonBackupRestoreSuite().catch((err) => {
  console.error('Fatal error during Python backup/restore audit:', err);
  process.exit(1);
});
