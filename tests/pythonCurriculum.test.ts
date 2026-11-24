import 'fake-indexeddb/auto';
import assert from 'node:assert';
import {
  pythonModules,
  allPythonTopics,
  pythonTopicsById,
  pythonTopicsByNumber,
  PYTHON_TOTAL_TOPICS,
  PYTHON_TOTAL_MODULES,
} from '../src/content/python';
import { AK67Database } from '../src/db/schema';
import { topicRepository } from '../src/db/repositories/topicRepository';
import { TopicProgress } from '../src/types/database';

console.log('\n======================================================');
console.log('AK67 Phase 11B: Python Mastery Curriculum Verification');
console.log('======================================================\n');

let passedTests = 0;

function test(description: string, fn: () => void | Promise<void>) {
  try {
    const res = fn();
    if (res instanceof Promise) {
      return res
        .then(() => {
          console.log(`  ✓ [PASS] ${description}`);
          passedTests++;
        })
        .catch((err) => {
          console.error(`  ✗ [FAIL] ${description}`);
          console.error('    Error:', err.message);
          process.exit(1);
        });
    }
    console.log(`  ✓ [PASS] ${description}`);
    passedTests++;
  } catch (err: any) {
    console.error(`  ✗ [FAIL] ${description}`);
    console.error('    Error:', err.message);
    process.exit(1);
  }
}

async function runAllTests() {
  // 1. Structure & Module Counts
  test('1a. Exactly 8 Python curriculum modules exist', () => {
    assert.strictEqual(
      pythonModules.length,
      PYTHON_TOTAL_MODULES,
      `Expected ${PYTHON_TOTAL_MODULES} modules, got ${pythonModules.length}`
    );
  });

  test('1b. Exactly 89 total curated topics exist', () => {
    assert.strictEqual(
      allPythonTopics.length,
      PYTHON_TOTAL_TOPICS,
      `Expected ${PYTHON_TOTAL_TOPICS} topics, got ${allPythonTopics.length}`
    );
  });

  test('1c. Topics are numbered 1 to 89 continuously without gaps', () => {
    for (let i = 0; i < 89; i++) {
      const expectedNumber = i + 1;
      assert.strictEqual(
        allPythonTopics[i].topicNumber,
        expectedNumber,
        `Topic at index ${i} has topicNumber ${allPythonTopics[i].topicNumber}, expected ${expectedNumber}`
      );
    }
  });

  test('1d. All 89 topic IDs are unique and formatted correctly', () => {
    const seenIds = new Set<string>();
    for (const t of allPythonTopics) {
      assert.ok(t.id && t.id.startsWith('py-'), `Invalid topic ID format: ${t.id}`);
      assert.ok(!seenIds.has(t.id), `Duplicate topic ID found: ${t.id}`);
      seenIds.add(t.id);
    }
    assert.strictEqual(seenIds.size, 89);
  });

  test('1e. Expected topic distribution per module matches Phase 11A plan', () => {
    const expectedCounts = [10, 10, 12, 11, 15, 12, 9, 10];
    const actualCounts = pythonModules.map((m) => m.topics.length);
    assert.deepStrictEqual(
      actualCounts,
      expectedCounts,
      `Module distribution mismatch. Expected ${expectedCounts.join(',')}, got ${actualCounts.join(',')}`
    );
    const sum = actualCounts.reduce((a, b) => a + b, 0);
    assert.strictEqual(sum, 89);
  });

  // 2. Comprehensive Educational Content Quality
  test('2a. Every topic contains substantial explanation, whyItMatters, syntax and structure', () => {
    for (const t of allPythonTopics) {
      assert.ok(t.title && t.title.length >= 4, `Title too short for ${t.id}`);
      assert.ok(t.whyItMatters && t.whyItMatters.length >= 20, `whyItMatters too short for ${t.id}`);
      assert.ok(t.explanation && t.explanation.length >= 40, `Explanation too short for ${t.id}`);
      assert.ok(
        t.syntaxAndStructure && t.syntaxAndStructure.length >= 10,
        `syntaxAndStructure too short for ${t.id}`
      );
      assert.ok(
        ['Beginner', 'Intermediate', 'Advanced'].includes(t.level),
        `Invalid level for ${t.id}: ${t.level}`
      );
    }
  });

  test('2b. Every topic contains at least 2 practical code examples with expected output and explanation', () => {
    for (const t of allPythonTopics) {
      assert.ok(
        t.codeExamples && t.codeExamples.length >= 2,
        `Topic ${t.id} has fewer than 2 code examples (got ${t.codeExamples?.length})`
      );
      for (const ex of t.codeExamples) {
        assert.ok(ex.title && ex.title.length >= 3, `Empty example title in ${t.id}`);
        assert.ok(ex.code && ex.code.length >= 15, `Empty example code in ${t.id}`);
        assert.ok(ex.expectedOutput && ex.expectedOutput.length >= 1, `Missing expected output in ${t.id}`);
        assert.ok(ex.explanation && ex.explanation.length >= 10, `Missing example explanation in ${t.id}`);
      }
    }
  });

  test('2c. Every topic contains real-world applications, common mistakes, and interview relevance', () => {
    for (const t of allPythonTopics) {
      assert.ok(
        t.realWorldApplications && t.realWorldApplications.length >= 2,
        `Fewer than 2 real-world apps in ${t.id}`
      );
      assert.ok(
        t.commonMistakes && t.commonMistakes.length >= 2,
        `Fewer than 2 common mistakes in ${t.id}`
      );
      assert.ok(
        t.interviewRelevance && t.interviewRelevance.length >= 20,
        `interviewRelevance too short in ${t.id}`
      );
    }
  });

  test('2d. Every topic has at least 2 checkpoints with valid IDs', () => {
    for (const t of allPythonTopics) {
      assert.ok(t.checkpoints && t.checkpoints.length >= 2, `Fewer than 2 checkpoints in ${t.id}`);
      for (const cp of t.checkpoints) {
        assert.ok(cp.id && cp.label && cp.label.length >= 5, `Invalid checkpoint in ${t.id}`);
      }
    }
  });

  test('2e. Every topic has exactly 3 tiered practice exercises (Beginner, Intermediate, Advanced) with solutions', () => {
    for (const t of allPythonTopics) {
      assert.strictEqual(
        t.practiceExercises.length,
        3,
        `Topic ${t.id} does not have exactly 3 exercises (got ${t.practiceExercises.length})`
      );
      const diffs = t.practiceExercises.map((e) => e.difficulty);
      assert.deepStrictEqual(
        diffs,
        ['Beginner', 'Intermediate', 'Advanced'],
        `Topic ${t.id} exercises must be [Beginner, Intermediate, Advanced]`
      );
      for (const ex of t.practiceExercises) {
        assert.ok(ex.id && ex.title && ex.prompt, `Incomplete exercise in ${t.id}`);
        assert.ok(ex.solution && ex.solution.length >= 5, `Missing solution in exercise ${ex.id}`);
        assert.ok(ex.explanation && ex.explanation.length >= 5, `Missing explanation in exercise ${ex.id}`);
      }
    }
  });

  test('2f. Every topic has at least 2 quiz questions with 4 options, valid answer index, and explanation', () => {
    for (const t of allPythonTopics) {
      assert.ok(
        t.quizQuestions && t.quizQuestions.length >= 2,
        `Topic ${t.id} has fewer than 2 quiz questions`
      );
      for (const q of t.quizQuestions) {
        assert.ok(q.question && q.question.length >= 10, `Question text too short in ${t.id}`);
        assert.ok(
          q.options && q.options.length >= 4,
          `Question ${q.id} in ${t.id} has fewer than 4 options`
        );
        assert.ok(
          q.correctOptionIndex >= 0 && q.correctOptionIndex < q.options.length,
          `Invalid correctOptionIndex in question ${q.id}`
        );
        assert.ok(q.explanation && q.explanation.length >= 10, `Missing explanation in ${q.id}`);
      }
    }
  });

  test('2g. Every topic has at least 3 concise revision notes', () => {
    for (const t of allPythonTopics) {
      assert.ok(
        t.revisionNotes && t.revisionNotes.length >= 3,
        `Fewer than 3 revision notes in ${t.id}`
      );
      for (const note of t.revisionNotes) {
        assert.ok(note && note.length >= 5, `Revision note too short in ${t.id}`);
      }
    }
  });

  // 3. Lookup Maps
  test('3a. pythonTopicsById and pythonTopicsByNumber maps contain all 89 items', () => {
    assert.strictEqual(Object.keys(pythonTopicsById).length, 89);
    assert.strictEqual(Object.keys(pythonTopicsByNumber).length, 89);
    for (let num = 1; num <= 89; num++) {
      assert.ok(pythonTopicsByNumber[num], `Missing topic number ${num}`);
      assert.strictEqual(pythonTopicsByNumber[num].topicNumber, num);
    }
  });

  // 4. Dexie IndexedDB Integration & Persistence
  await test('4a. TopicProgress records with category "python" can be persisted and queried in IndexedDB', async () => {
    const testDb = new AK67Database('test_python_mastery_db');
    await testDb.open();

    const sampleTopic = allPythonTopics[0];
    const record: TopicProgress = {
      id: sampleTopic.id,
      category: 'python',
      status: 'learning',
      bookmarked: true,
      totalCheckpoints: sampleTopic.checkpoints.length,
      completedCheckpoints: [sampleTopic.checkpoints[0].id],
      isMastered: false,
      notes: 'Initial test note for Python fundamentals.',
      lastStudiedAt: new Date().toISOString(),
    };

    await topicRepository.upsert(record, testDb);

    const fetched = await topicRepository.getById(sampleTopic.id, testDb);
    assert.ok(fetched, `Failed to retrieve persisted topic ${sampleTopic.id}`);
    assert.strictEqual(fetched?.category, 'python');
    assert.strictEqual(fetched?.status, 'learning');
    assert.strictEqual(fetched?.bookmarked, true);
    assert.strictEqual(fetched?.completedCheckpoints.length, 1);
    assert.strictEqual(fetched?.notes, 'Initial test note for Python fundamentals.');

    // Query by category
    const pythonList = await topicRepository.getByCategory('python', testDb);
    assert.strictEqual(pythonList.length, 1);
    assert.strictEqual(pythonList[0].id, sampleTopic.id);

    // Toggle checkpoint
    await topicRepository.toggleCheckpoint(
      sampleTopic.id,
      sampleTopic.checkpoints[1].id,
      'python',
      sampleTopic.checkpoints.length,
      testDb
    );
    const updated = await topicRepository.getById(sampleTopic.id, testDb);
    assert.strictEqual(updated?.completedCheckpoints.length, 2);

    await testDb.delete();
  });

  console.log(`\n======================================================`);
  console.log(`All ${passedTests} Python Mastery curriculum test assertions passed!`);
  console.log(`======================================================\n`);
}

runAllTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
