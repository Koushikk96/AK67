/**
 * AK67 Phase 11C Persistence & UI Behavior Test Suite
 * Verifies that Java Topic Progress updates, Checkpoint completion, Bookmarks,
 * Personal Notes, Spaced Repetition Scheduling, and Category Isolation function correctly.
 */

import 'fake-indexeddb/auto';
import { AK67Database } from '../src/db/schema';
import { topicRepository } from '../src/db/repositories/topicRepository';
import { allJavaTopics } from '../src/content/java';
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

async function runJavaPersistenceUISuite() {
  console.log('\n======================================================');
  console.log('AK67: Java Persistence & UI Behavior Verification');
  console.log('======================================================\n');

  const testDb = new AK67Database(`AK67_Java_Persistence_${Date.now()}`);
  await testDb.open();
  assert(testDb.isOpen(), 'Test database initialized');

  // Test 1: Checkpoint completion updates progress percentages and mastery
  console.log('\n--- 1. Java Checkpoint Completion & Mastery Calculation ---');
  const targetTopic = allJavaTopics[0]; // java-01-platform-jvm-architecture
  assert(targetTopic.checkpoints.length === 3, 'java-01 has 3 checkpoints');

  const cp1 = targetTopic.checkpoints[0].id;
  const cp2 = targetTopic.checkpoints[1].id;
  const cp3 = targetTopic.checkpoints[2].id;

  // Toggle Checkpoint 1
  await topicRepository.toggleCheckpoint(targetTopic.id, cp1, 'java', 3, testDb);
  let record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record !== undefined, 'Record created on first checkpoint toggle');
  assert(record?.category === 'java', 'Record category is java');
  assert(record?.completedCheckpoints.includes(cp1) === true, 'Checkpoint 1 marked complete');
  assert(record?.isMastered === false, 'Not mastered yet (1 of 3 checkpoints)');
  assert(record?.status === 'learning', 'Status moved to learning');

  // Toggle Checkpoint 2
  await topicRepository.toggleCheckpoint(targetTopic.id, cp2, 'java', 3, testDb);
  record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record?.completedCheckpoints.length === 2, '2 of 3 checkpoints complete');
  assert(record?.isMastered === false, 'Not mastered yet (2 of 3 checkpoints)');

  // Toggle Checkpoint 3
  await topicRepository.toggleCheckpoint(targetTopic.id, cp3, 'java', 3, testDb);
  record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record?.completedCheckpoints.length === 3, 'All 3 checkpoints complete');
  assert(record?.isMastered === true, 'Mastery achieved automatically when all checkpoints completed');
  assert(record?.status === 'completed', 'Status updated to completed');

  // Untoggle Checkpoint 3
  await topicRepository.toggleCheckpoint(targetTopic.id, cp3, 'java', 3, testDb);
  record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record?.completedCheckpoints.length === 2, 'Checkpoint 3 untoggled, 2 remain');
  assert(record?.isMastered === false, 'Mastery revoked when checkpoint removed');

  // Test 2: Bookmarks persist across reloads
  console.log('\n--- 2. Java Bookmark Persistence ---');
  await topicRepository.toggleBookmark(targetTopic.id, 'java', testDb);
  record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record?.bookmarked === true, 'Topic successfully bookmarked');

  // Simulate reload by re-fetching
  const reloadRecord = await topicRepository.getById(targetTopic.id, testDb);
  assert(reloadRecord?.bookmarked === true, 'Bookmark persisted across simulated reload');

  await topicRepository.toggleBookmark(targetTopic.id, 'java', testDb);
  record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record?.bookmarked === false, 'Bookmark un-toggled successfully');

  // Test 3: Personal notes save without corruption or overwriting
  console.log('\n--- 3. Java Personal Notes Persistence ---');
  const noteContent = 'JVM Architecture: Metaspace replaced PermGen in Java 8; JIT Hotspot C2 tier compiles hot bytecode.';
  await topicRepository.updateNotes(targetTopic.id, noteContent, 'java', testDb);
  record = await topicRepository.getById(targetTopic.id, testDb);
  assert(record?.notes === noteContent, 'Personal notes stored accurately');
  assert(record?.completedCheckpoints.length === 2, 'Updating notes did not wipe completed checkpoints');

  // Test 4: Spaced Repetition Scheduling
  console.log('\n--- 4. Spaced Repetition Scheduling ---');
  const now = new Date();
  const nextTarget = new Date();
  nextTarget.setDate(now.getDate() + 7);
  const targetDateStr = nextTarget.toISOString().split('T')[0];

  const spacedRecord: TopicProgress = {
    ...record!,
    status: 'revise',
    revisionCount: 2,
    intervalDays: 7,
    nextRevisionDate: targetDateStr,
    inRevisionQueue: true,
  };
  await topicRepository.upsert(spacedRecord, testDb);

  const fetchedSpaced = await topicRepository.getById(targetTopic.id, testDb);
  assert(fetchedSpaced?.status === 'revise', 'Status set to revise');
  assert(fetchedSpaced?.revisionCount === 2, 'revisionCount is 2');
  assert(fetchedSpaced?.intervalDays === 7, 'intervalDays is 7');
  assert(fetchedSpaced?.nextRevisionDate === targetDateStr, 'nextRevisionDate matches target');
  assert(fetchedSpaced?.inRevisionQueue === true, 'Enrolled in revision queue');

  // Query queue
  const queue = await topicRepository.getRevisionQueue(testDb);
  assert(queue.some((t) => t.id === targetTopic.id), 'Java topic retrieved in revision queue');

  // Test 5: Category Isolation (Strict boundary between Java, Python, C++, SQL)
  console.log('\n--- 5. Category Isolation & Multi-Language Coexistence ---');
  // Seed a Python topic and C++ topic into same database
  const pythonTopic: TopicProgress = {
    id: 'py-01-intro-execution',
    category: 'python',
    status: 'completed',
    bookmarked: false,
    totalCheckpoints: 2,
    completedCheckpoints: ['py-01-cp-1', 'py-01-cp-2'],
    isMastered: true,
    notes: 'CPython bytecode execution model',
    lastStudiedAt: '2026-11-24T12:00:00.000Z',
    revisionCount: 1,
    intervalDays: 3,
    nextRevisionDate: '2026-11-27',
    inRevisionQueue: true,
  };
  await topicRepository.upsert(pythonTopic, testDb);

  const cppTopic: TopicProgress = {
    id: 'cpp-pointers-memory',
    category: 'cpp',
    status: 'learning',
    bookmarked: true,
    totalCheckpoints: 3,
    completedCheckpoints: ['cpp-cp-1'],
    isMastered: false,
    notes: 'Pointer arithmetic and RAII',
    lastStudiedAt: '2026-11-24T13:00:00.000Z',
    revisionCount: 0,
    intervalDays: 1,
    nextRevisionDate: '2026-11-25',
    inRevisionQueue: false,
  };
  await topicRepository.upsert(cppTopic, testDb);

  const javaTopicsInDb = await topicRepository.getByCategory('java', testDb);
  const pythonTopicsInDb = await topicRepository.getByCategory('python', testDb);
  const cppTopicsInDb = await topicRepository.getByCategory('cpp', testDb);
  const sqlTopicsInDb = await topicRepository.getByCategory('sql', testDb);

  assert(javaTopicsInDb.length === 1, 'Exactly 1 Java topic returned by getByCategory');
  assert(javaTopicsInDb[0].id === targetTopic.id, 'Returned Java topic is java-01');
  assert(pythonTopicsInDb.length === 1, 'Exactly 1 Python topic returned');
  assert(pythonTopicsInDb[0].id === 'py-01-intro-execution', 'Returned Python topic is py-01');
  assert(cppTopicsInDb.length === 1, 'Exactly 1 C++ topic returned');
  assert(cppTopicsInDb[0].id === 'cpp-pointers-memory', 'Returned C++ topic is cpp-pointers');
  assert(sqlTopicsInDb.length === 0, '0 SQL topics returned (no cross-contamination)');

  // Verify full topic list count
  const allTopicsInDb = await testDb.topic_progress.toArray();
  assert(allTopicsInDb.length === 3, 'Total 3 multi-language topics coexisting cleanly in DB');

  await testDb.delete();
  console.log('\n======================================================');
  console.log(`Java Persistence & UI Behavior: ${passedCount} / ${testCount} Passed`);
  console.log('======================================================\n');
}

runJavaPersistenceUISuite().catch((err) => {
  console.error('Fatal error during Java persistence UI audit:', err);
  process.exit(1);
});
