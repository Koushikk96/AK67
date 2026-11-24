import 'fake-indexeddb/auto';
import assert from 'node:assert';
import {
  javaModules,
  allJavaTopics,
  javaTopicsById,
  javaTopicsByNumber,
  getJavaTopicById,
  getJavaTopicByNumber,
  getJavaTopicsByModule,
  JAVA_TOTAL_TOPICS,
  JAVA_TOTAL_MODULES,
} from '../src/content/java';

console.log('\n======================================================');
console.log('AK67 Phase 11C: Java Mastery Curriculum Verification');
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
  test('1a. Exactly 8 Java curriculum modules exist', () => {
    assert.strictEqual(
      javaModules.length,
      JAVA_TOTAL_MODULES,
      `Expected ${JAVA_TOTAL_MODULES} modules, got ${javaModules.length}`
    );
  });

  test('1b. Exactly 106 total curated topics exist', () => {
    assert.strictEqual(
      allJavaTopics.length,
      JAVA_TOTAL_TOPICS,
      `Expected ${JAVA_TOTAL_TOPICS} topics, got ${allJavaTopics.length}`
    );
  });

  test('1c. Topics are numbered 1 to 106 continuously without gaps', () => {
    for (let i = 0; i < 106; i++) {
      const expectedNumber = i + 1;
      assert.strictEqual(
        allJavaTopics[i].topicNumber,
        expectedNumber,
        `Topic at index ${i} has topicNumber ${allJavaTopics[i].topicNumber}, expected ${expectedNumber}`
      );
    }
  });

  test('1d. Every topic has unique ID and unique topicNumber', () => {
    const ids = new Set<string>();
    const numbers = new Set<number>();

    for (const t of allJavaTopics) {
      assert.ok(!ids.has(t.id), `Duplicate topic ID found: ${t.id}`);
      assert.ok(!numbers.has(t.topicNumber), `Duplicate topicNumber found: ${t.topicNumber}`);
      ids.add(t.id);
      numbers.add(t.topicNumber);
    }
    assert.strictEqual(ids.size, 106);
    assert.strictEqual(numbers.size, 106);
  });

  test('1e. Expected module topic distributions', () => {
    const expectedDistributions: Record<number, number> = {
      1: 11, // Module 1: Java Fundamentals (11)
      2: 11, // Module 2: Core Programming (11)
      3: 16, // Module 3: Object-Oriented Programming (16)
      4: 15, // Module 4: Collections Framework (15)
      5: 20, // Module 5: Advanced Java (20)
      6: 13, // Module 6: Java Problem Solving (13)
      7: 9,  // Module 7: Practical Java (9)
      8: 11, // Module 8: Java Interview Preparation (11)
    };

    for (const mod of javaModules) {
      const expected = expectedDistributions[mod.number];
      const actual = mod.topics.length;
      assert.strictEqual(
        actual,
        expected,
        `Module ${mod.number} (${mod.title}) expected ${expected} topics, got ${actual}`
      );
    }
  });

  // 2. Comprehensive Educational Content Quality
  test('2a. Every topic has complete narrative fields and language="java"', () => {
    for (const t of allJavaTopics) {
      assert.strictEqual(t.language, 'java', `Topic ${t.id} must have language="java"`);
      assert.ok(t.title && t.title.trim().length > 3, `Topic ${t.id} missing title`);
      assert.ok(t.whyItMatters && t.whyItMatters.trim().length > 20, `Topic ${t.id} missing whyItMatters`);
      assert.ok(t.explanation && t.explanation.trim().length > 40, `Topic ${t.id} missing explanation`);
      assert.ok(t.syntaxAndStructure && t.syntaxAndStructure.trim().length > 5, `Topic ${t.id} missing syntaxAndStructure`);
      assert.ok(t.interviewRelevance && t.interviewRelevance.trim().length > 10, `Topic ${t.id} missing interviewRelevance`);
    }
  });

  test('2b. Every topic has at least 2 practical code examples with expected outputs', () => {
    for (const t of allJavaTopics) {
      assert.ok(
        t.codeExamples && t.codeExamples.length >= 2,
        `Topic ${t.id} has ${t.codeExamples?.length || 0} code examples, expected at least 2`
      );

      for (let i = 0; i < t.codeExamples.length; i++) {
        const ex = t.codeExamples[i];
        assert.ok(ex.title && ex.title.trim().length > 3, `Topic ${t.id} example ${i} missing title`);
        assert.ok(ex.code && ex.code.trim().length > 10, `Topic ${t.id} example ${i} missing code`);
        assert.ok(ex.expectedOutput && ex.expectedOutput.trim().length > 0, `Topic ${t.id} example ${i} missing expectedOutput`);
        assert.ok(ex.explanation && ex.explanation.trim().length > 10, `Topic ${t.id} example ${i} missing explanation`);
      }
    }
  });

  test('2c. Every topic has real-world applications (>=2) and common mistakes (>=3)', () => {
    for (const t of allJavaTopics) {
      assert.ok(
        t.realWorldApplications && t.realWorldApplications.length >= 2,
        `Topic ${t.id} has ${t.realWorldApplications?.length || 0} realWorldApplications, expected >= 2`
      );
      assert.ok(
        t.commonMistakes && t.commonMistakes.length >= 3,
        `Topic ${t.id} has ${t.commonMistakes?.length || 0} commonMistakes, expected >= 3`
      );
    }
  });

  test('2d. Every topic has exactly 3 practice exercises (Beginner, Intermediate, Advanced) with starter code and solutions', () => {
    for (const t of allJavaTopics) {
      assert.strictEqual(
        t.practiceExercises.length,
        3,
        `Topic ${t.id} has ${t.practiceExercises.length} exercises, expected exactly 3`
      );

      const difficulties = t.practiceExercises.map((e) => e.difficulty);
      assert.ok(difficulties.includes('Beginner'), `Topic ${t.id} missing Beginner exercise`);
      assert.ok(difficulties.includes('Intermediate'), `Topic ${t.id} missing Intermediate exercise`);
      assert.ok(difficulties.includes('Advanced'), `Topic ${t.id} missing Advanced exercise`);

      for (const ex of t.practiceExercises) {
        assert.ok(ex.title && ex.title.trim().length > 3, `Exercise ${ex.id} missing title`);
        assert.ok(ex.prompt && ex.prompt.trim().length > 10, `Exercise ${ex.id} missing prompt`);
        assert.ok(ex.solution && ex.solution.trim().length > 10, `Exercise ${ex.id} missing solution`);
        assert.ok(ex.explanation && ex.explanation.trim().length > 10, `Exercise ${ex.id} missing explanation`);
      }
    }
  });

  test('2e. Every topic has at least 2 MCQs with 4 options and valid correctOptionIndex', () => {
    for (const t of allJavaTopics) {
      assert.ok(
        t.quizQuestions && t.quizQuestions.length >= 2,
        `Topic ${t.id} has ${t.quizQuestions?.length || 0} quizQuestions, expected >= 2`
      );

      for (const q of t.quizQuestions) {
        assert.ok(q.question && q.question.trim().length > 5, `Question ${q.id} missing text`);
        assert.strictEqual(q.options.length, 4, `Question ${q.id} must have exactly 4 options`);
        assert.ok(
          q.correctOptionIndex >= 0 && q.correctOptionIndex < 4,
          `Question ${q.id} correctOptionIndex ${q.correctOptionIndex} is out of bounds`
        );
        assert.ok(q.explanation && q.explanation.trim().length > 5, `Question ${q.id} missing explanation`);
      }
    }
  });

  test('2f. Every topic has checkpoints (>=3) and revisionNotes (>=3)', () => {
    for (const t of allJavaTopics) {
      assert.ok(
        t.checkpoints && t.checkpoints.length >= 3,
        `Topic ${t.id} has ${t.checkpoints?.length || 0} checkpoints, expected >= 3`
      );
      assert.ok(
        t.revisionNotes && t.revisionNotes.length >= 3,
        `Topic ${t.id} has ${t.revisionNotes?.length || 0} revisionNotes, expected >= 3`
      );
    }
  });

  // 3. Lookup Utilities & Index Maps
  test('3a. Lookup functions return correct topics by ID and Number', () => {
    const t1 = getJavaTopicById('java-01-platform-jvm-architecture');
    assert.ok(t1, 'Topic java-01-platform-jvm-architecture not found by ID');
    assert.strictEqual(t1.topicNumber, 1);

    const t74 = getJavaTopicByNumber(74);
    assert.ok(t74, 'Topic 74 not found by Number');
    assert.strictEqual(t74.id, 'java-74-complexity');

    const t106 = getJavaTopicByNumber(106);
    assert.ok(t106, 'Topic 106 not found by Number');
    assert.strictEqual(t106.id, 'java-106-readiness-assessment');

    const m6Topics = getJavaTopicsByModule(6);
    assert.strictEqual(m6Topics.length, 13);
  });

  // 4. Module Assessments
  test('4a. Every module assessment has passing score percentage and questions', () => {
    for (const mod of javaModules) {
      assert.ok(mod.moduleAssessment, `Module ${mod.id} missing moduleAssessment`);
      assert.ok(
        mod.moduleAssessment.passingScorePercentage >= 70,
        `Module ${mod.id} passingScorePercentage should be >= 70`
      );
      assert.ok(
        mod.moduleAssessment.questions.length >= mod.topics.length * 2,
        `Module ${mod.id} assessment questions count (${mod.moduleAssessment.questions.length}) is less than expected`
      );
      assert.ok(
        mod.revisionQuestions && mod.revisionQuestions.length >= 3,
        `Module ${mod.id} missing revisionQuestions`
      );
    }
  });

  console.log(`\n======================================================`);
  console.log(`All Java Curriculum tests passed! Total: ${passedTests}`);
  console.log(`======================================================\n`);
}

runAllTests();
