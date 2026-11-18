/**
 * AK67 Phase 5: Aptitude Curriculum Verification Tests
 * Verifies all 36 topics (16 Quant, 10 Logical, 10 Verbal) and all practice questions.
 */

import { allAptitudeTopics, quantTopics, logicalTopics, verbalTopics } from '../src/content/aptitude';

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

console.log('\n======================================================');
console.log('AK67 Phase 5: Aptitude Curriculum Verification');
console.log('======================================================\n');

// 1. Topic Counts
assert(allAptitudeTopics.length === 36, `Total Aptitude topics is exactly 36 (Actual: ${allAptitudeTopics.length})`);
assert(quantTopics.length === 16, `Quantitative topics count is exactly 16 (Actual: ${quantTopics.length})`);
assert(logicalTopics.length === 10, `Logical Reasoning topics count is exactly 10 (Actual: ${logicalTopics.length})`);
assert(verbalTopics.length === 10, `Verbal Ability topics count is exactly 10 (Actual: ${verbalTopics.length})`);

// 2. Unique Topic IDs
const topicIds = new Set<string>();
let duplicateTopicId: string | null = null;
for (const topic of allAptitudeTopics) {
  if (topicIds.has(topic.id)) {
    duplicateTopicId = topic.id;
    break;
  }
  topicIds.add(topic.id);
}
assert(topicIds.size === 36 && duplicateTopicId === null, `All 36 topic IDs are strictly unique (duplicates: ${duplicateTopicId ?? 'none'})`);

// 3. Continuous Numbering in Each Category
const quantNumbers = quantTopics.map((t) => t.number);
const logicalNumbers = logicalTopics.map((t) => t.number);
const verbalNumbers = verbalTopics.map((t) => t.number);

const quantContinuous = quantNumbers.every((n, i) => n === i + 1);
const logicalContinuous = logicalNumbers.every((n, i) => n === i + 1);
const verbalContinuous = verbalNumbers.every((n, i) => n === i + 1);

assert(quantContinuous, `Quantitative topics numbered continuously 1 to 16`);
assert(logicalContinuous, `Logical topics numbered continuously 1 to 10`);
assert(verbalContinuous, `Verbal topics numbered continuously 1 to 10`);

// 4. Topic Content Integrity
let allHaveFormulas = true;
let allHaveSolvedExamples = true;
let allHaveShortcuts = true;
let allHaveMistakes = true;
let allHaveEnoughQuestions = true;
let invalidTopic: string | null = null;

for (const t of allAptitudeTopics) {
  if (!t.title || !t.explanation || t.explanation.length < 20) {
    invalidTopic = t.id;
    break;
  }
  if (!Array.isArray(t.formulas) || t.formulas.length === 0) {
    allHaveFormulas = false;
    invalidTopic = t.id;
    break;
  }
  if (!Array.isArray(t.solvedExamples) || t.solvedExamples.length < 2) {
    allHaveSolvedExamples = false;
    invalidTopic = t.id;
    break;
  }
  for (const ex of t.solvedExamples) {
    if (!ex.question || !ex.solution) {
      allHaveSolvedExamples = false;
      invalidTopic = t.id;
      break;
    }
  }
  if (!Array.isArray(t.shortcuts) || t.shortcuts.length === 0) {
    allHaveShortcuts = false;
    invalidTopic = t.id;
    break;
  }
  if (!Array.isArray(t.commonMistakes) || t.commonMistakes.length === 0) {
    allHaveMistakes = false;
    invalidTopic = t.id;
    break;
  }
  if (!Array.isArray(t.practiceQuestions) || t.practiceQuestions.length < 5) {
    allHaveEnoughQuestions = false;
    invalidTopic = t.id;
    break;
  }
}

assert(allHaveFormulas, `Every topic contains formulas / key rules (failure at: ${invalidTopic ?? 'none'})`);
assert(allHaveSolvedExamples, `Every topic contains at least 2 solved step-by-step examples`);
assert(allHaveShortcuts, `Every topic contains speed shortcuts`);
assert(allHaveMistakes, `Every topic contains common interview traps/mistakes`);
assert(allHaveEnoughQuestions, `Every topic has at least 5 practice questions`);

// 5. Practice Questions Validation
const questionIds = new Set<string>();
let duplicateQuestionId: string | null = null;
let totalQuestions = 0;
let invalidQuestion = false;

for (const topic of allAptitudeTopics) {
  for (const q of topic.practiceQuestions) {
    totalQuestions++;
    if (questionIds.has(q.id)) {
      duplicateQuestionId = q.id;
    }
    questionIds.add(q.id);

    if (
      !q.question ||
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      typeof q.correctOptionIndex !== 'number' ||
      q.correctOptionIndex < 0 ||
      q.correctOptionIndex > 3 ||
      !q.explanation ||
      !['Easy', 'Medium', 'Hard'].includes(q.difficulty)
    ) {
      invalidQuestion = true;
      console.error(`Invalid question format in topic ${topic.id}:`, q);
    }
  }
}

assert(totalQuestions >= 180, `Curriculum contains at least 180 high-yield questions (Actual: ${totalQuestions})`);
assert(duplicateQuestionId === null, `All question IDs are strictly unique (duplicates: ${duplicateQuestionId ?? 'none'})`);
assert(!invalidQuestion, `All practice questions have 4 options, valid correct option index, explanation, and difficulty`);

console.log('\n======================================================');
console.log(`ALL APTITUDE TESTS COMPLETED: ${passedAssertions} / ${passedAssertions + failedAssertions} assertions passed`);
console.log('======================================================\n');

if (failedAssertions > 0) {
  process.exit(1);
}
