/**
 * AK67 Phase 2 Persistence & Backup Verification Test Suite
 * Executed in Node using fake-indexeddb to verify actual IndexedDB operations.
 */

import 'fake-indexeddb/auto';
import { AK67Database } from '../src/db/schema';
import { problemRepository } from '../src/db/repositories/problemRepository';
import { topicRepository } from '../src/db/repositories/topicRepository';
import { noteRepository } from '../src/db/repositories/noteRepository';
import { dailyPlannerRepository } from '../src/db/repositories/dailyPlannerRepository';
import { mockTestRepository } from '../src/db/repositories/mockTestRepository';
import { companyRepository } from '../src/db/repositories/companyRepository';
import { studySessionRepository } from '../src/db/repositories/studySessionRepository';
import { settingsRepository } from '../src/db/repositories/settingsRepository';
import { backupValidator } from '../src/services/backup/backupValidator';
import { backupDiff } from '../src/services/backup/backupDiff';
import { backupEngine } from '../src/services/backup/backupEngine';
import { statsService } from '../src/services/statsService';
import { ProblemProgress } from '../src/types/database';

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

async function runTestSuite() {
  console.log('\n======================================================');
  console.log('AK67 Phase 2: IndexedDB Persistence & Backup Verification');
  console.log('======================================================\n');

  const testDbName = 'AK67_Test_DB_' + Date.now();
  let testDb = new AK67Database(testDbName);

  // ---------------------------------------------------------
  // Test 1: Empty database initializes correctly
  // ---------------------------------------------------------
  console.log('Test Group 1: Initialization');
  await testDb.open();
  assert(testDb.isOpen(), '1. Empty database opens successfully');
  const initialStats = await statsService.getDatabaseStats(testDb);
  assert(initialStats.problemProgressCount === 0, '1b. Empty database has 0 problem records');
  assert(initialStats.notesCount === 0, '1c. Empty database has 0 note records');

  // ---------------------------------------------------------
  // Test 2: Type-safe CRUD operations
  // ---------------------------------------------------------
  console.log('\nTest Group 2: Type-safe CRUD Operations');
  const p1: ProblemProgress = {
    id: 'dsa-two-sum',
    topic: 'Arrays',
    difficulty: 'Easy',
    status: 'solved',
    personalNotes: 'Use hash map for O(n) time',
    bookmarked: true,
    revisionCount: 1,
    intervalDays: 3,
    easeFactor: 2.5,
    lastAttemptedAt: new Date().toISOString(),
    solvedAt: new Date().toISOString(),
  };
  await problemRepository.upsert(p1, testDb);
  const fetchedP1 = await problemRepository.getById('dsa-two-sum', testDb);
  assert(fetchedP1 !== undefined, '2a. Problem p1 saved and retrieved');
  assert(fetchedP1?.status === 'solved', '2b. Problem status is solved');
  assert(fetchedP1?.bookmarked === true, '2c. Problem is bookmarked');

  const noteId = await noteRepository.upsert(
    {
      title: 'Binary Search Invariant',
      category: 'DSA',
      tags: ['binary-search', 'invariants'],
      content: 'Always define search space [L, R] inclusive.',
      isMistakeLog: false,
    },
    testDb
  );
  const fetchedNote = await noteRepository.getById(noteId, testDb);
  assert(fetchedNote !== undefined, '2d. Note saved and retrieved');
  assert(fetchedNote?.title === 'Binary Search Invariant', '2e. Note title matches');

  // ---------------------------------------------------------
  // Test 3: Updating one record does not affect unrelated records
  // ---------------------------------------------------------
  console.log('\nTest Group 3: Record Isolation');
  const p2: ProblemProgress = {
    id: 'dsa-valid-anagram',
    topic: 'Strings',
    difficulty: 'Easy',
    status: 'attempted',
    personalNotes: 'Check lengths first',
    bookmarked: false,
    revisionCount: 0,
    intervalDays: 1,
    easeFactor: 2.5,
  };
  await problemRepository.upsert(p2, testDb);

  // Update p1 only
  await problemRepository.updateStatus('dsa-two-sum', 'revise', 'Updated note for two sum', testDb);

  const checkP1 = await problemRepository.getById('dsa-two-sum', testDb);
  const checkP2 = await problemRepository.getById('dsa-valid-anagram', testDb);
  assert(checkP1?.status === 'revise', '3a. p1 updated to revise');
  assert(checkP1?.personalNotes === 'Updated note for two sum', '3b. p1 notes updated');
  assert(checkP2?.status === 'attempted', '3c. p2 remained untouched (attempted)');
  assert(checkP2?.personalNotes === 'Check lengths first', '3d. p2 notes untouched');

  // ---------------------------------------------------------
  // Test 4: Duplicate records and idempotent upserts handled safely
  // ---------------------------------------------------------
  console.log('\nTest Group 4: Duplicate Record Handling');
  const initialCount = await problemRepository.countTotal(testDb);
  // Re-upserting p2 with same id
  await problemRepository.upsert({ ...p2, personalNotes: 'Refined check' }, testDb);
  const afterDuplicateCount = await problemRepository.countTotal(testDb);
  assert(afterDuplicateCount === initialCount, '4a. Duplicate upsert does not create redundant record');
  const updatedP2 = await problemRepository.getById('dsa-valid-anagram', testDb);
  assert(updatedP2?.personalNotes === 'Refined check', '4b. Duplicate upsert correctly updates record');

  // ---------------------------------------------------------
  // Test 5: Records survive database close and re-open (Simulating Page Refresh / Restart)
  // ---------------------------------------------------------
  console.log('\nTest Group 5: Persistence Across DB Close and Re-Open');
  testDb.close();
  assert(!testDb.isOpen(), '5a. Database closed successfully');

  // Re-open fresh instance targeting the exact same database name
  testDb = new AK67Database(testDbName);
  await testDb.open();
  assert(testDb.isOpen(), '5b. Database re-opened successfully');

  const reloadedP1 = await problemRepository.getById('dsa-two-sum', testDb);
  const reloadedP2 = await problemRepository.getById('dsa-valid-anagram', testDb);
  const reloadedNote = await noteRepository.getById(noteId, testDb);
  assert(reloadedP1 !== undefined && reloadedP1.status === 'revise', '5c. p1 survived reload with status intact');
  assert(reloadedP2 !== undefined && reloadedP2.status === 'attempted', '5d. p2 survived reload with status intact');
  assert(reloadedNote !== undefined && reloadedNote.title === 'Binary Search Invariant', '5e. Note survived reload');

  // ---------------------------------------------------------
  // Test 6: Transaction atomicity and rollback on failure
  // ---------------------------------------------------------
  console.log('\nTest Group 6: Transaction Atomicity & Rollback');
  const countBeforeFailedTx = await problemRepository.countTotal(testDb);
  let txFailed = false;

  try {
    await testDb.transaction('rw', testDb.problem_progress, async () => {
      await testDb.problem_progress.put({
        id: 'dsa-temp-valid',
        topic: 'Arrays',
        difficulty: 'Easy',
        status: 'solved',
        personalNotes: '',
        bookmarked: false,
        revisionCount: 0,
        intervalDays: 1,
        easeFactor: 2.5,
      });
      // Force an intentional failure inside the transaction
      throw new Error('Intentional transaction error to test rollback');
    });
  } catch {
    txFailed = true;
  }

  assert(txFailed, '6a. Transaction caught error as expected');
  const countAfterFailedTx = await problemRepository.countTotal(testDb);
  assert(countAfterFailedTx === countBeforeFailedTx, '6b. Failed transaction rolled back completely');
  const tempRecord = await testDb.problem_progress.get('dsa-temp-valid');
  assert(tempRecord === undefined, '6c. Uncommitted record does not exist');

  // ---------------------------------------------------------
  // Test 7: Invalid data rejection in repositories
  // ---------------------------------------------------------
  console.log('\nTest Group 7: Input Validation');
  let rejectedEmptyId = false;
  try {
    await problemRepository.upsert({ id: '' } as any, testDb);
  } catch {
    rejectedEmptyId = true;
  }
  assert(rejectedEmptyId, '7a. problemRepository rejects empty id');

  let rejectedEmptyTopicId = false;
  try {
    await topicRepository.upsert({ id: '' } as any, testDb);
  } catch {
    rejectedEmptyTopicId = true;
  }
  assert(rejectedEmptyTopicId, '7b. topicRepository rejects empty id');

  // ---------------------------------------------------------
  // Test 8: JSON Export generation
  // ---------------------------------------------------------
  console.log('\nTest Group 8: Backup JSON Export');
  const exported = await backupEngine.generateExport(testDb);
  assert(exported.appName === 'AK67', '8a. Exported appName is AK67');
  assert(exported.schemaVersion === 1, '8b. Exported schemaVersion is 1');
  assert(exported.backupFormatVersion === 1, '8c. Exported backupFormatVersion is 1');
  assert(typeof exported.exportedAt === 'string', '8d. Exported timestamp is string');
  assert(exported.data.problem_progress.length === 2, '8e. Exported 2 problem progress records');
  assert(exported.data.notes.length === 1, '8f. Exported 1 note');
  const lastBackupSetting = await settingsRepository.getLastBackupDate(testDb);
  assert(lastBackupSetting !== null, '8g. last_backup_timestamp saved in settings');

  // ---------------------------------------------------------
  // Test 9: Backup validation rejects invalid files
  // ---------------------------------------------------------
  console.log('\nTest Group 9: Backup Import Validation');
  assert(!backupValidator.validate(null).isValid, '9a. Null rejected');
  assert(!backupValidator.validate({ appName: 'OtherApp' }).isValid, '9b. Wrong appName rejected');
  assert(!backupValidator.validate({ appName: 'AK67', schemaVersion: 99 }).isValid, '9c. Future schemaVersion rejected');
  assert(!backupValidator.validate({ appName: 'AK67', schemaVersion: 1, data: 'string' }).isValid, '9d. Non-object data rejected');
  const validCheck = backupValidator.validate(exported);
  assert(validCheck.isValid, '9e. Valid backup accepted by validator');

  // ---------------------------------------------------------
  // Test 10: Dry-run Diff Analysis
  // ---------------------------------------------------------
  console.log('\nTest Group 10: Dry-run Diff Analysis');
  const diffAnalysis = await backupDiff.analyze(exported, testDb);
  assert(diffAnalysis.isValid, '10a. Diff analysis successful');
  assert(diffAnalysis.totalNewRecords === 0, '10b. 0 new records when diffed against self');
  assert(diffAnalysis.totalIdenticalRecords === exported.data.problem_progress.length + exported.data.notes.length + exported.data.app_settings.length, '10c. Correct count of identical records');

  // ---------------------------------------------------------
  // Test 11: Merge Restoration
  // ---------------------------------------------------------
  console.log('\nTest Group 11: Merge Restoration');
  // Create an incoming backup with 1 new problem and 1 updated note
  const incomingBackup: any = JSON.parse(JSON.stringify(exported));
  incomingBackup.data.problem_progress.push({
    id: 'dsa-3sum',
    topic: 'Two Pointers',
    difficulty: 'Medium',
    status: 'solved',
    personalNotes: 'Sort first, then fix one element',
    bookmarked: false,
    revisionCount: 1,
    intervalDays: 3,
    easeFactor: 2.5,
  });

  const mergeResult = await backupEngine.restoreMerge(incomingBackup, testDb);
  assert(mergeResult.success, '11a. Merge restoration succeeded');
  assert(mergeResult.recordsRestored >= 1, '11b. At least 1 new record restored');
  const restoredP3 = await problemRepository.getById('dsa-3sum', testDb);
  assert(restoredP3 !== undefined && restoredP3.status === 'solved', '11c. dsa-3sum correctly added to database');
  const existingStillThere = await problemRepository.getById('dsa-two-sum', testDb);
  assert(existingStillThere !== undefined, '11d. Existing dsa-two-sum preserved during merge');

  // ---------------------------------------------------------
  // Test 12: Clean Replace Restoration
  // ---------------------------------------------------------
  console.log('\nTest Group 12: Replace Restoration');
  // Replace with a clean backup containing only 1 problem
  const singleProblemBackup: any = JSON.parse(JSON.stringify(exported));
  singleProblemBackup.data.problem_progress = [
    {
      id: 'dsa-clean-replace-only',
      topic: 'Graphs',
      difficulty: 'Hard',
      status: 'solved',
      personalNotes: 'Dijkstra shortest path',
      bookmarked: true,
      revisionCount: 2,
      intervalDays: 7,
      easeFactor: 2.5,
    },
  ];
  singleProblemBackup.data.notes = [];

  const replaceResult = await backupEngine.restoreReplace(singleProblemBackup, testDb);
  assert(replaceResult.success, '12a. Replace restoration succeeded');
  const replacedList = await problemRepository.getAll(testDb);
  assert(replacedList.length === 1, '12b. Database contains exactly 1 problem after replace');
  assert(replacedList[0].id === 'dsa-clean-replace-only', '12c. The single restored problem matches backup');
  const replacedNotes = await noteRepository.getAll(testDb);
  assert(replacedNotes.length === 0, '12d. Notes table cleaned per backup state');

  // Close and clean test db
  await testDb.delete();
  console.log('\n======================================================');
  console.log(`ALL TESTS PASSED: ${passedCount} / ${testCount} assertions passed`);
  console.log('======================================================\n');
}

runTestSuite().catch((err) => {
  console.error('\nTest suite execution failed:', err);
  process.exit(1);
});
