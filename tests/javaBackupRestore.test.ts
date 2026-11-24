/**
 * AK67 Phase 11C Verification: Java Mastery Backup & Restore Test Suite
 * Tests backup creation, format validation, schema integrity, and restoration (both merge and replace)
 * ensuring full persistence across Java and existing curriculum data.
 */

import 'fake-indexeddb/auto';
import { AK67Database } from '../src/db/schema';
import { topicRepository } from '../src/db/repositories/topicRepository';
import { problemRepository } from '../src/db/repositories/problemRepository';
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

async function runJavaBackupRestoreSuite() {
  console.log('\n======================================================');
  console.log('AK67: Java Mastery Backup & Restore Verification Suite');
  console.log('======================================================\n');

  // Setup isolated test database
  const sourceDbName = `AK67_Java_SourceDB_${Date.now()}`;
  const sourceDb = new AK67Database(sourceDbName);
  await sourceDb.open();
  assert(sourceDb.isOpen(), 'Source database opened successfully');

  console.log('\nStep 1: Populating Representative Java Progress & Multi-Language Curriculum Data');

  // 1. Java Topic 1: Completed, Mastered, Bookmarked, Checkpoints, Notes, Spaced Repetition
  const javaCompleted: TopicProgress = {
    id: 'java-01-platform-jvm-architecture',
    category: 'java',
    status: 'completed',
    bookmarked: true,
    totalCheckpoints: 3,
    completedCheckpoints: ['java-01-cp-1', 'java-01-cp-2', 'java-01-platform-jvm-architecture-cp-3'],
    isMastered: true,
    notes: 'HotSpot JVM executes bytecode using adaptive JIT compilation with tiered compilation (C1 and C2).',
    lastStudiedAt: '2026-11-24T18:00:00.000Z',
    revisionCount: 3,
    intervalDays: 7,
    nextRevisionDate: '2026-12-01',
    lastRevisedAt: '2026-11-24T18:00:00.000Z',
    inRevisionQueue: true,
  };
  await topicRepository.upsert(javaCompleted, sourceDb);

  // 2. Java Topic 2: Learning (in-progress), 1 checkpoint done, not bookmarked
  const javaLearning: TopicProgress = {
    id: 'java-44-hashmap',
    category: 'java',
    status: 'learning',
    bookmarked: false,
    totalCheckpoints: 3,
    completedCheckpoints: ['java-44-cp-1'],
    isMastered: false,
    notes: 'Treeification happens at 8 bin collisions if table capacity >= 64.',
    lastStudiedAt: '2026-11-24T18:30:00.000Z',
    revisionCount: 0,
    intervalDays: 1,
    nextRevisionDate: '2026-11-25',
    inRevisionQueue: false,
  };
  await topicRepository.upsert(javaLearning, sourceDb);

  // 3. Java Topic 3: Revise, 0 checkpoints, personal note
  const javaRevise: TopicProgress = {
    id: 'java-83-stacks',
    category: 'java',
    status: 'revise',
    bookmarked: true,
    totalCheckpoints: 3,
    completedCheckpoints: [],
    isMastered: false,
    notes: 'Always use ArrayDeque instead of java.util.Stack in modern Java.',
    lastStudiedAt: '2026-11-24T17:00:00.000Z',
    revisionCount: 1,
    intervalDays: 3,
    nextRevisionDate: '2026-11-27',
    inRevisionQueue: true,
  };
  await topicRepository.upsert(javaRevise, sourceDb);

  // 4. Multi-language persistence: Python Topic
  const pyTopic: TopicProgress = {
    id: 'py-01-intro-execution',
    category: 'python',
    status: 'completed',
    bookmarked: true,
    totalCheckpoints: 2,
    completedCheckpoints: ['py-01-cp-1'],
    isMastered: true,
    notes: 'CPython PVM execution note',
    lastStudiedAt: '2026-11-24T12:00:00.000Z',
  };
  await topicRepository.upsert(pyTopic, sourceDb);

  // 5. Multi-language persistence: C++ topic
  const cppTopic: TopicProgress = {
    id: 'cpp-01-memory-layout',
    category: 'cpp',
    status: 'completed',
    bookmarked: true,
    totalCheckpoints: 2,
    completedCheckpoints: ['cpp-01-cp-1'],
    isMastered: true,
    notes: 'Virtual table pointer (vptr) offset in polymorphic classes.',
    lastStudiedAt: '2026-11-24T10:00:00.000Z',
  };
  await topicRepository.upsert(cppTopic, sourceDb);

  // 6. Problem progress (DSA sheet)
  const dsaProgress: ProblemProgress = {
    id: 'dsa-two-sum',
    topic: 'Arrays',
    difficulty: 'Easy',
    status: 'solved',
    personalNotes: 'Solved with C++, Python, and Java implementations.',
    bookmarked: true,
    revisionCount: 1,
    intervalDays: 3,
    easeFactor: 2.5,
    lastAttemptedAt: '2026-11-24T15:00:00.000Z',
    solvedAt: '2026-11-24T15:00:00.000Z',
  };
  await problemRepository.upsert(dsaProgress, sourceDb);

  // 7. General Note
  await noteRepository.upsert(
    {
      title: 'Global Java Placement Strategy',
      category: 'java',
      tags: ['placement', 'java'],
      content: 'Focus on JVM memory model, G1 GC regions, CompletableFuture, and Concurrency.',
      isMistakeLog: false,
    },
    sourceDb
  );

  const initialTopics = await sourceDb.topic_progress.toArray();
  assert(initialTopics.length === 5, 'Source DB contains 5 topics (3 Java + 1 Python + 1 C++)');

  console.log('\nStep 2: Exporting Backup via backupEngine.generateExport()');
  const backupFile = await backupEngine.generateExport(sourceDb);

  assert(backupFile.appName === 'AK67', 'Export has valid appName AK67');
  assert(backupFile.schemaVersion === 1, 'Export has schemaVersion 1');
  assert(backupFile.data.topic_progress.length === 5, 'Export includes all 5 topics');
  assert(backupFile.data.problem_progress.length === 1, 'Export includes DSA problem');
  assert(backupFile.data.notes.length === 1, 'Export includes personal note');

  // Verify Java topics present in backup export
  const exportedJava = backupFile.data.topic_progress.filter((t: TopicProgress) => t.category === 'java');
  assert(exportedJava.length === 3, `Expected 3 Java progress records in backup, found ${exportedJava.length}`);

  console.log('\nStep 3: Validating Backup File Structure via backupValidator');
  const validation = backupValidator.validate(backupFile);
  assert(validation.isValid === true, 'backupValidator confirms backup file is 100% valid');

  console.log('\nStep 4: Verifying Java Topic Progress Integrity in Exported JSON');
  const exportedJava1 = backupFile.data.topic_progress.find((t: TopicProgress) => t.id === 'java-01-platform-jvm-architecture');
  assert(exportedJava1?.status === 'completed', 'java-01 status is completed');
  assert(exportedJava1?.bookmarked === true, 'java-01 is bookmarked');
  assert(exportedJava1?.completedCheckpoints.length === 3, 'java-01 has 3 completed checkpoints');
  assert(exportedJava1?.isMastered === true, 'java-01 isMastered is true');
  assert(exportedJava1?.revisionCount === 3, 'java-01 revisionCount is 3');
  assert(exportedJava1?.intervalDays === 7, 'java-01 intervalDays is 7');
  assert(exportedJava1?.nextRevisionDate === '2026-12-01', 'java-01 nextRevisionDate preserved');
  assert(exportedJava1?.notes?.includes('HotSpot JVM') === true, 'java-01 personal notes preserved');

  console.log('\nStep 5: Testing Clean Replace Restoration into replaceDb');
  const replaceDbName = `AK67_Java_ReplaceDB_${Date.now()}`;
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
  assert(replaceResult.success === true, 'restoreReplace reported success');

  const restoredReplaceTopics = await replaceDb.topic_progress.toArray();
  assert(restoredReplaceTopics.length === 5, 'Replace restored exactly 5 topics');
  assert(!restoredReplaceTopics.some((t) => t.id === 'dummy-topic'), 'Dummy topic was cleaned');

  const restoredJava1Replace = await topicRepository.getById('java-01-platform-jvm-architecture', replaceDb);
  assert(restoredJava1Replace?.status === 'completed', 'Replace restored java-01 status completed');
  assert(restoredJava1Replace?.bookmarked === true, 'Replace restored java-01 bookmarked true');
  assert(restoredJava1Replace?.completedCheckpoints.length === 3, 'Replace restored java-01 checkpoints');
  assert(restoredJava1Replace?.notes === javaCompleted.notes, 'Replace restored java-01 exact notes');
  assert(restoredJava1Replace?.nextRevisionDate === '2026-12-01', 'Replace restored java-01 nextRevisionDate');

  const restoredPythonReplace = await topicRepository.getById('py-01-intro-execution', replaceDb);
  assert(restoredPythonReplace !== undefined && restoredPythonReplace.isMastered === true, 'Non-Java Python topic preserved');

  const restoredCppReplace = await topicRepository.getById('cpp-01-memory-layout', replaceDb);
  assert(restoredCppReplace !== undefined && restoredCppReplace.isMastered === true, 'Non-Java C++ topic preserved');

  const restoredDsaReplace = await problemRepository.getById('dsa-two-sum', replaceDb);
  assert(restoredDsaReplace !== undefined && restoredDsaReplace.status === 'solved', 'Non-Java DSA problem preserved');

  console.log('\nStep 6: Testing Merge Mode Restoration');
  const mergeDbName = `AK67_Java_MergeDB_${Date.now()}`;
  const mergeDb = new AK67Database(mergeDbName);
  await mergeDb.open();

  // Seed mergeDb with an existing Java record with newer lastStudiedAt and unique custom topic
  const existingJava: TopicProgress = {
    id: 'java-01-platform-jvm-architecture',
    category: 'java',
    status: 'learning',
    bookmarked: false,
    totalCheckpoints: 3,
    completedCheckpoints: ['java-01-cp-1'],
    isMastered: false,
    notes: 'Local pre-existing note on JVM',
    lastStudiedAt: '2026-11-25T12:00:00.000Z', // newer than backup
  };
  await topicRepository.upsert(existingJava, mergeDb);

  const localOnlyTopic: TopicProgress = {
    id: 'java-custom-local',
    category: 'java',
    status: 'learning',
    totalCheckpoints: 1,
    completedCheckpoints: [],
    isMastered: false,
    notes: 'Created only on local machine',
    lastStudiedAt: '2026-11-25T12:00:00.000Z',
  };
  await topicRepository.upsert(localOnlyTopic, mergeDb);

  const mergeResult = await backupEngine.restoreMerge(backupFile, mergeDb);
  assert(mergeResult.success === true, 'restoreMerge reported success');

  const postMergeTopics = await mergeDb.topic_progress.toArray();
  // 5 backup topics + 1 local-only topic = 6 topics total
  assert(postMergeTopics.length === 6, `Merge DB contains 6 topics (got ${postMergeTopics.length})`);
  assert(postMergeTopics.some((t) => t.id === 'java-custom-local'), 'Local-only topic preserved in merge');

  console.log('\n======================================================');
  console.log(`All Java Backup & Restore tests passed! Total: ${passedCount}/${testCount}`);
  console.log('======================================================\n');
}

runJavaBackupRestoreSuite().catch((err) => {
  console.error('Fatal error running Java Backup & Restore suite:', err);
  process.exit(1);
});
