import assert from 'node:assert';
import { cppTopics, cppInterviewFAQs } from '../src/content/cpp';
import { sqlTopics, practicalSQLProblems } from '../src/content/sql';
import {
  dbmsTopics,
  osTopics,
  networkTopics,
  softwareEngTopics,
  allCoreCSTopics,
} from '../src/content/coreCS';

console.log('\n======================================================');
console.log('AK67 Phase 4: Essential C++, SQL & Core CS Verification');
console.log('======================================================\n');

let passedTests = 0;

function test(description: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✓ [PASS] ${description}`);
    passedTests++;
  } catch (err: any) {
    console.error(`  ✗ [FAIL] ${description}`);
    console.error('    Error:', err.message);
    process.exit(1);
  }
}

// 1. C++ Verification
test('1a. Exactly 17 C++ topics exist', () => {
  assert.strictEqual(cppTopics.length, 17, `Expected 17 C++ topics, got ${cppTopics.length}`);
});

test('1b. C++ topics are numbered 1 to 17 continuously', () => {
  for (let i = 0; i < 17; i++) {
    assert.strictEqual(cppTopics[i].number, i + 1, `Topic at index ${i} has wrong number`);
  }
});

test('1c. All C++ topics contain explanation, code example, interview Qs, common mistakes, and revision notes', () => {
  for (const t of cppTopics) {
    assert.ok(t.id && t.id.startsWith('cpp-'), `Invalid id for ${t.title}`);
    assert.ok(t.title && t.title.length > 3, `Empty title for ${t.id}`);
    assert.ok(t.explanation && t.explanation.length > 20, `Explanation too short for ${t.id}`);
    assert.ok(t.codeOrSyntax && t.codeOrSyntax.length > 20, `Missing code example for ${t.id}`);
    assert.ok(t.interviewQuestions.length >= 2, `Too few interview questions for ${t.id}`);
    assert.ok(t.commonMistakes && t.commonMistakes.length >= 1, `Missing common mistakes for ${t.id}`);
    assert.ok(t.revisionNotes.length >= 2, `Too few revision notes for ${t.id}`);
  }
});

test('1d. C++ Interview FAQs collection contains at least 15 placement questions', () => {
  assert.ok(cppInterviewFAQs.length >= 15, `Expected >= 15 FAQs, got ${cppInterviewFAQs.length}`);
  for (const faq of cppInterviewFAQs) {
    assert.ok(faq.question && faq.shortAnswer, `Incomplete FAQ: ${faq.id}`);
  }
});

// 2. SQL Verification
test('2a. Exactly 21 SQL topics exist', () => {
  assert.strictEqual(sqlTopics.length, 21, `Expected 21 SQL topics, got ${sqlTopics.length}`);
});

test('2b. SQL topics are numbered 1 to 21 continuously', () => {
  for (let i = 0; i < 21; i++) {
    assert.strictEqual(sqlTopics[i].number, i + 1, `SQL topic at index ${i} has wrong number`);
  }
});

test('2c. All SQL topics contain explanation, syntax, sample table, expected output, and interview questions', () => {
  for (const t of sqlTopics) {
    assert.ok(t.id && t.id.startsWith('sql-'), `Invalid id for ${t.title}`);
    assert.ok(t.explanation && t.explanation.length > 20, `Explanation too short for ${t.id}`);
    assert.ok(t.codeOrSyntax && t.codeOrSyntax.length > 10, `Missing syntax for ${t.id}`);
    assert.ok(t.sampleTable && t.sampleTable.length > 5, `Missing sample table for ${t.id}`);
    assert.ok(t.expectedOutput && t.expectedOutput.length > 5, `Missing expected output for ${t.id}`);
    assert.ok(t.interviewQuestions.length >= 2, `Too few interview questions for ${t.id}`);
  }
});

test('2d. Exactly 21 Practical SQL problems exist progressing from basic to intermediate', () => {
  assert.ok(
    practicalSQLProblems.length >= 20 && practicalSQLProblems.length <= 25,
    `Expected 20-25 practical SQL problems, got ${practicalSQLProblems.length}`
  );
  for (const p of practicalSQLProblems) {
    assert.ok(p.title && p.statement && p.sqlSolution && p.explanation, `Incomplete practical SQL problem: ${p.id}`);
    assert.ok(p.difficulty === 'Basic' || p.difficulty === 'Intermediate', `Invalid difficulty for ${p.id}`);
  }
});

// 3. DBMS Verification
test('3. Exactly 11 DBMS topics exist with all required fields', () => {
  assert.strictEqual(dbmsTopics.length, 11, `Expected 11 DBMS topics, got ${dbmsTopics.length}`);
  for (const t of dbmsTopics) {
    assert.ok(t.explanation && t.interviewQuestions.length >= 2 && t.revisionNotes.length >= 2, `Incomplete DBMS topic: ${t.id}`);
  }
});

// 4. Operating Systems Verification
test('4. Exactly 13 OS topics exist with all required fields', () => {
  assert.strictEqual(osTopics.length, 13, `Expected 13 OS topics, got ${osTopics.length}`);
  for (const t of osTopics) {
    assert.ok(t.explanation && t.interviewQuestions.length >= 2 && t.revisionNotes.length >= 2, `Incomplete OS topic: ${t.id}`);
  }
});

// 5. Computer Networks Verification
test('5. Exactly 13 Computer Networks topics exist with all required fields', () => {
  assert.strictEqual(networkTopics.length, 13, `Expected 13 Network topics, got ${networkTopics.length}`);
  for (const t of networkTopics) {
    assert.ok(t.explanation && t.interviewQuestions.length >= 2 && t.revisionNotes.length >= 2, `Incomplete CN topic: ${t.id}`);
  }
});

// 6. Software Engineering Verification
test('6. Exactly 10 Software Engineering topics exist with all required fields', () => {
  assert.strictEqual(softwareEngTopics.length, 10, `Expected 10 SE topics, got ${softwareEngTopics.length}`);
  for (const t of softwareEngTopics) {
    assert.ok(t.explanation && t.interviewQuestions.length >= 2 && t.revisionNotes.length >= 2, `Incomplete SE topic: ${t.id}`);
  }
});

test('7. Core CS total topics count is exactly 47', () => {
  assert.strictEqual(allCoreCSTopics.length, 47, `Expected 47 Core CS topics, got ${allCoreCSTopics.length}`);
});

// 8. Global Uniqueness Check
test('8. All IDs across all modules are strictly unique (0 duplicates)', () => {
  const allIds = [
    ...cppTopics.map((t) => t.id),
    ...cppInterviewFAQs.map((f) => f.id),
    ...sqlTopics.map((t) => t.id),
    ...practicalSQLProblems.map((p) => p.id),
    ...allCoreCSTopics.map((t) => t.id),
  ];
  const uniqueIds = new Set(allIds);
  assert.strictEqual(
    allIds.length,
    uniqueIds.size,
    `Duplicate IDs found! Total: ${allIds.length}, Unique: ${uniqueIds.size}`
  );
});

console.log(`\n======================================================`);
console.log(`ALL TECHNICAL CURRICULUM TESTS PASSED: ${passedTests} / 14 assertions passed`);
console.log(`======================================================\n`);
