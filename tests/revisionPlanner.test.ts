/**
 * AK67 Phase 5: Spaced Revision & Daily Planner Verification Tests
 * Verifies date math across month boundaries, interval progressions,
 * queue bucketing, postponement, non-duplication, and daily planner CRUD.
 */

import 'fake-indexeddb/auto';
import { AK67Database } from '../src/db/schema';
import {
  addDays,
  diffInDays,
  formatIsoDate,
  parseIsoDate,
  getNextInterval,
  revisionService,
  SPATIAL_INTERVALS,
} from '../src/services/revisionService';
import { dailyPlannerRepository } from '../src/db/repositories/dailyPlannerRepository';

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
  console.log('AK67 Phase 5: Spaced Revision & Daily Planner Tests');
  console.log('======================================================\n');

  console.log('Test Group 1: Calendar-Safe Date Math & Intervals');

  // 1a. Safe month boundary math
  assert(addDays('2026-01-31', 1) === '2026-02-01', 'Jan 31 + 1 day = Feb 01 (month rollover)');
  assert(addDays('2026-02-28', 1) === '2026-03-01', 'Feb 28 + 1 day = Mar 01 (non-leap year)');
  assert(addDays('2026-12-31', 1) === '2027-01-01', 'Dec 31 + 1 day = Jan 01 next year (year rollover)');
  assert(addDays('2026-11-18', 30) === '2026-12-18', 'Nov 18 + 30 days = Dec 18 (30-day interval)');
  assert(addDays('2026-04-30', 7) === '2026-05-07', 'Apr 30 + 7 days = May 07 (7-day interval)');

  // 1b. Day difference calculation
  assert(diffInDays('2026-11-18', '2026-11-18') === 0, 'Same day diff is 0');
  assert(diffInDays('2026-11-15', '2026-11-18') === -3, 'Past day diff is -3 (overdue)');
  assert(diffInDays('2026-11-25', '2026-11-18') === 7, 'Future day diff is +7 (upcoming)');

  // 1c. Interval Progression: 1 -> 3 -> 7 -> 14 -> 30
  assert(getNextInterval(1) === 3, 'Next interval after 1 is 3');
  assert(getNextInterval(3) === 7, 'Next interval after 3 is 7');
  assert(getNextInterval(7) === 14, 'Next interval after 7 is 14');
  assert(getNextInterval(14) === 30, 'Next interval after 14 is 30');
  assert(getNextInterval(30) === 30, 'Interval caps at 30 days');

  console.log('\nTest Group 2: IndexedDB Spaced Revision Operations');

  const testDb = new AK67Database('test_db_phase5_' + Date.now());
  await testDb.open();

  // 2a. Enroll DSA problem and Topic
  await revisionService.enrollItem('two-sum', 'dsa', 0, testDb); // due today (0 days)
  await revisionService.enrollItem('reverse-words-in-a-string', 'dsa', 3, testDb); // upcoming in 3 days
  await revisionService.enrollItem('cpp-07-oop-basics', 'topic', -2, testDb); // overdue by 2 days
  await revisionService.enrollItem('quant-percentages', 'topic', 0, testDb); // due today

  let queue = await revisionService.getRevisionQueue(testDb);

  assert(queue.dueToday.length === 2, `Due today has 2 items (Actual: ${queue.dueToday.length})`);
  assert(queue.overdue.length === 1, `Overdue has 1 item (Actual: ${queue.overdue.length})`);
  assert(queue.upcoming.length === 1, `Upcoming has 1 item (Actual: ${queue.upcoming.length})`);

  // Verify non-duplication
  const allIds = [...queue.dueToday, ...queue.overdue, ...queue.upcoming].map((i) => i.id);
  const uniqueIds = new Set(allIds);
  assert(allIds.length === uniqueIds.size, 'No duplicate entries exist in active revision queue');

  // 2b. Mark reviewed
  await revisionService.markRevised('two-sum', 'dsa', testDb);
  queue = await revisionService.getRevisionQueue(testDb);

  assert(!queue.dueToday.some((i) => i.id === 'two-sum'), 'Marked item no longer in due today');
  assert(queue.upcoming.some((i) => i.id === 'two-sum'), 'Marked item moved to upcoming with advanced interval');
  assert(queue.completed.some((i) => i.id === 'two-sum'), 'Marked item recorded in completed revisions');

  // 2c. Postpone overdue item
  await revisionService.postponeItem('cpp-07-oop-basics', 'topic', 2, testDb);
  queue = await revisionService.getRevisionQueue(testDb);

  assert(!queue.overdue.some((i) => i.id === 'cpp-07-oop-basics'), 'Postponed item removed from overdue');
  assert(queue.upcoming.some((i) => i.id === 'cpp-07-oop-basics'), 'Postponed item now scheduled in upcoming');

  // 2d. Remove from queue
  await revisionService.removeFromQueue('quant-percentages', 'topic', testDb);
  queue = await revisionService.getRevisionQueue(testDb);

  assert(!queue.dueToday.some((i) => i.id === 'quant-percentages'), 'Removed item no longer in due today');

  console.log('\nTest Group 3: Daily Planner CRUD & Target Tracking');

  const today = formatIsoDate(new Date());

  // 3a. Add custom tasks with categories & priorities
  const task1 = await dailyPlannerRepository.addCustomTask(
    today,
    'Solve Two Sum and Maximum Subarray',
    'high',
    testDb
  );
  assert(Boolean(task1.id), 'Custom task 1 created with unique ID');
  assert(task1.priority === 'high', 'Custom task 1 priority is high');

  const task2 = await dailyPlannerRepository.addCustomTask(
    today,
    'Revise SQL Window Functions',
    'medium',
    testDb
  );
  assert(Boolean(task2.id), 'Custom task 2 created with unique ID');

  // 3b. Retrieve and toggle task
  let entry = await dailyPlannerRepository.getByDate(today, testDb);
  assert(entry?.customTasks.length === 2, `Planner entry has 2 custom tasks (Actual: ${entry?.customTasks.length})`);

  const toggled = await dailyPlannerRepository.toggleCustomTask(today, task1.id, testDb);
  assert(toggled === true, 'Task toggled to completed=true');

  entry = await dailyPlannerRepository.getByDate(today, testDb);
  const task1Updated = entry?.customTasks.find((t) => t.id === task1.id);
  assert(task1Updated?.completed === true, 'Persisted task status is completed');

  // 3c. Delete task
  await dailyPlannerRepository.deleteCustomTask(today, task2.id, testDb);
  entry = await dailyPlannerRepository.getByDate(today, testDb);
  assert(entry?.customTasks.length === 1, 'Planner entry has 1 task after deletion');
  assert(!entry?.customTasks.some((t) => t.id === task2.id), 'Deleted task no longer present');

  // 3d. Update study minutes and targets
  if (entry) {
    entry.studyMinutes = 75;
    entry.actualProblemsCount = 2;
    entry.targetProblemsCount = 3;
    entry.targetStudyMinutes = 90;
    entry.targetAptitudeCount = 5;
    entry.actualAptitudeCount = 4;
    await dailyPlannerRepository.upsert(entry, testDb);
  }

  const updatedEntry = await dailyPlannerRepository.getByDate(today, testDb);
  assert(updatedEntry?.studyMinutes === 75, 'Study minutes saved correctly');
  assert(updatedEntry?.targetStudyMinutes === 90, 'Target study minutes saved correctly');
  assert(updatedEntry?.actualAptitudeCount === 4, 'Actual aptitude count saved correctly');

  await testDb.close();

  console.log('\n======================================================');
  console.log(`ALL REVISION & PLANNER TESTS: ${passedAssertions} / ${passedAssertions + failedAssertions} passed`);
  console.log('======================================================\n');

  if (failedAssertions > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test runner failure:', err);
  process.exit(1);
});
