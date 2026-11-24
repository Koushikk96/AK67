/**
 * AK67 Phase 11B Persistence & UI Behavior Test Suite
 * Verifies that Topic Progress updates, Checkpoint completion, Bookmarks,
 * Personal Notes, and Spaced Repetition Scheduling function correctly and persist.
 */

import 'fake-indexeddb/auto';
import { AK67Database } from '../src/db/schema';
import { topicRepository } from '../src/db/repositories/topicRepository';
import { allPythonTopics } from '../src/content/python';
import { TopicProgress } from '../src/types/database';

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

async function runPersistenceUISuite() {
  console.log('\n======================================================');
  console.log('AK67: Python Persistence & UI Behavior Verification');
  console.log('======================================================\n');

  const testDb = new AK67Database(`AK67_Persistence_Test_${Date.now()}`);
  await testDb.open();
  assert(testDb.isOpen(), 'Test database initialized');

  // Test 1: Checkpoint completion updates progress percentages and mastery
  console.log('\n--- 1. Checkpoint Completion & Mastery Calculation ---');
  const targetTopic = allPythonTopics[0]; // py-01-intro-execution
  assert(targetTopic.checkpoints.length === 2, 'py-01 has 2 checkpoints');

  const cp1 = targetTopic.checkpoints[0].id;
  const cp2 = targetTopic.checkpoints[1].id;

  // Toggle Checkpoint 1
  await topicRepository.toggleCheckpoint(targetTopic.id, cp1, 'python', 2, testDb);
  let record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record !== undefined, 'Record created on first checkpoint toggle');
  assert(record?.completedCheckpoints.includes(cp1) === true, 'Checkpoint 1 marked complete');
  assert(record?.isMastered === false, 'Not mastered yet (1 of 2 checkpoints)');
  assert(record?.status === 'learning', 'Status moved to learning');

  // Toggle Checkpoint 2
  await topicRepository.toggleCheckpoint(targetTopic.id, cp2, 'python', 2, testDb);
  record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record?.completedCheckpoints.length === 2, 'Both checkpoints complete');
  assert(record?.isMastered === true, 'Mastery achieved automatically when all checkpoints completed');
  assert(record?.status === 'completed', 'Status updated to completed');

  // Untoggle Checkpoint 2
  await topicRepository.toggleCheckpoint(targetTopic.id, cp2, 'python', 2, testDb);
  record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record?.completedCheckpoints.length === 1, 'Checkpoint 2 removed');
  assert(record?.isMastered === false, 'Mastery revoked when checkpoint removed');

  // Test 2: Bookmarks persist across reloads
  console.log('\n--- 2. Bookmark Persistence ---');
  await topicRepository.toggleBookmark(targetTopic.id, 'python', testDb);
  record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record?.bookmarked === true, 'Topic successfully bookmarked');

  // Simulate reload by re-fetching
  const reloadRecord = await topicRepository.getById(targetTopic.id, testDb);
  assert(reloadRecord?.bookmarked === true, 'Bookmark persisted across simulated reload');

  await topicRepository.toggleBookmark(targetTopic.id, 'python', testDb);
  record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record?.bookmarked === false, 'Bookmark un-toggled successfully');

  // Test 3: Personal notes save without corruption or overwriting
  console.log('\n--- 3. Personal Notes Persistence ---');
  const noteContent = 'Key concept: Python bytecode is stored in __pycache__ and executed by PVM.';
  await topicRepository.updateNotes(targetTopic.id, noteContent, 'python', testDb);
  record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record?.notes === noteContent, 'Personal notes stored accurately');
  assert(record?.completedCheckpoints.length === 1, 'Updating notes did not wipe completed checkpoints');

  // Test 4: Spaced Repetition Scheduling
  console.log('\n--- 4. Spaced Repetition Scheduling ---');
  const now = new Date();
  const nextTarget = new Date();
  nextTarget.setDate(now.getDate() + 3);
  const targetDateStr = nextTarget.toISOString().split('T')[0];

  const spacedRecord: TopicProgress = {
    ...record!,
    status: 'revise',
    revisionCount: 1,
    intervalDays: 3,
    nextRevisionDate: targetDateStr,
    inRevisionQueue: true,
  };
  await topicRepository.upsert(spacedRecord, testDb);

  const fetchedSpaced = await topicRepository.getById(targetTopic.id, testDb);
  assert(fetchedSpaced?.status === 'revise', 'Status set to revise');
  assert(fetchedSpaced?.revisionCount === 1, 'revisionCount is 1');
  assert(fetchedSpaced?.intervalDays === 3, 'intervalDays is 3');
  assert(fetchedSpaced?.nextRevisionDate === targetDateStr, 'nextRevisionDate matches target');
  assert(fetchedSpaced?.inRevisionQueue === true, 'Enrolled in revision queue');

  // Query queue
  const queue = await topicRepository.getRevisionQueue(testDb);
  assert(queue.some((t) => t.id === targetTopic.id), 'Topic retrieved in revision queue');

  // Test 5: Category Isolation (No collisions with C++, SQL, DSA)
  console.log('\n--- 5. Category Isolation ---');
  const pythonTopicsInDb = await topicRepository.getByCategory('python', testDb);
  const cppTopicsInDb = await topicRepository.getByCategory('cpp', testDb);
  assert(pythonTopicsInDb.length === 1, '1 Python topic in DB');
  assert(cppTopicsInDb.length === 0, '0 C++ topics in DB (No cross-category contamination)');

  await testDb.delete();
  console.log('\n======================================================');
  console.log(`Persistence & UI Behavior: ${passedCount} / ${testCount} Passed`);
  console.log('======================================================\n');
}

runPersistenceUISuite().catch((err) => {
  console.error('Fatal error during persistence UI audit:', err);
  process.exit(1);
});
