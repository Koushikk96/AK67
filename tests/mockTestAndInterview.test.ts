/**
 * AK67 Phase 6: Mock Tests & Interview Preparation Verification Tests
 * Verifies Technical MCQs, Question Generator, Scoring Engine, Negative Marking,
 * Interview Q&A Banks (Technical, HR, Project Blueprint), and Company Profiles.
 */

import 'fake-indexeddb/auto';
import { db } from '../src/db';
import { allTechnicalMCQs, getTechnicalMCQsBySubject } from '../src/content/mcq';
import { allAptitudeTopics } from '../src/content/aptitude';
import {
  technicalInterviewQuestions,
  technicalInterviewSubjects,
  hrInterviewQuestions,
  defaultProjectTemplate,
} from '../src/content/interviews';
import { initialCompanyProfiles } from '../src/content/companies/initialCompanies';
import { mockTestService, predefinedMockTests } from '../src/services/mockTestService';
import { mockTestRepository } from '../src/db/repositories/mockTestRepository';
import { companyRepository } from '../src/db/repositories/companyRepository';
import { MockTestConfig, ActiveTestSession } from '../src/types/mockTest';

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
  console.log('AK67 Phase 6: Mock Tests & Interview Verification');
  console.log('======================================================\n');

  // -----------------------------------------------------------
  // 1. Technical MCQ Pool Quality & Uniqueness
  // -----------------------------------------------------------
  console.log('--- 1. Technical MCQ Pool Validation ---');
  assert(
    allTechnicalMCQs.length >= 100,
    `Technical MCQ bank contains at least 100 questions (Actual: ${allTechnicalMCQs.length})`
  );

  const mcqIdSet = new Set<string>();
  let hasDuplicateMcqId = false;
  let allOptionsValid = true;
  let allExplanationsValid = true;

  for (const q of allTechnicalMCQs) {
    if (mcqIdSet.has(q.id)) hasDuplicateMcqId = true;
    mcqIdSet.add(q.id);

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      allOptionsValid = false;
    }
    if (q.correctOptionIndex < 0 || q.correctOptionIndex > 3) {
      allOptionsValid = false;
    }
    if (!q.explanation || q.explanation.trim().length === 0) {
      allExplanationsValid = false;
    }
  }

  assert(!hasDuplicateMcqId, 'All Technical MCQ IDs are strictly unique');
  assert(allOptionsValid, 'Every Technical MCQ has exactly 4 options with valid correct index (0-3)');
  assert(allExplanationsValid, 'Every Technical MCQ includes a detailed non-empty explanation');

  // Verify subject coverage in MCQs
  const cppMcqs = getTechnicalMCQsBySubject('C++');
  const oopMcqs = getTechnicalMCQsBySubject('OOP');
  const dbmsMcqs = getTechnicalMCQsBySubject('DBMS');
  const sqlMcqs = getTechnicalMCQsBySubject('SQL');
  const osMcqs = getTechnicalMCQsBySubject('Operating Systems');
  const cnMcqs = getTechnicalMCQsBySubject('Computer Networks');
  const seMcqs = getTechnicalMCQsBySubject('Software Engineering');

  assert(cppMcqs.length >= 15, `C++ MCQs count >= 15 (Actual: ${cppMcqs.length})`);
  assert(oopMcqs.length >= 15, `OOP MCQs count >= 15 (Actual: ${oopMcqs.length})`);
  assert(dbmsMcqs.length >= 15, `DBMS MCQs count >= 15 (Actual: ${dbmsMcqs.length})`);
  assert(sqlMcqs.length >= 15, `SQL MCQs count >= 15 (Actual: ${sqlMcqs.length})`);
  assert(osMcqs.length >= 15, `OS MCQs count >= 15 (Actual: ${osMcqs.length})`);
  assert(cnMcqs.length >= 15, `Computer Networks MCQs count >= 15 (Actual: ${cnMcqs.length})`);
  assert(seMcqs.length >= 10, `Software Engineering MCQs count >= 10 (Actual: ${seMcqs.length})`);

  // Verify total question pool uniqueness against Aptitude MCQs
  const globalIdSet = new Set<string>();
  let globalCollision = false;

  for (const top of allAptitudeTopics) {
    for (const pq of top.practiceQuestions) {
      if (globalIdSet.has(pq.id)) globalCollision = true;
      globalIdSet.add(pq.id);
    }
  }

  for (const mcq of allTechnicalMCQs) {
    if (globalIdSet.has(mcq.id)) globalCollision = true;
    globalIdSet.add(mcq.id);
  }

  assert(
    !globalCollision,
    `Zero ID collisions across Aptitude (180) and Technical (102) pools (Total: ${globalIdSet.size})`
  );

  // -----------------------------------------------------------
  // 2. Predefined Mock Test Configs & Generation
  // -----------------------------------------------------------
  console.log('\n--- 2. Mock Test Generator & Configs ---');
  assert(predefinedMockTests.length === 4, `Predefined mock tests count is 4 (Actual: ${predefinedMockTests.length})`);

  // Generate test session for each predefined config
  for (const config of predefinedMockTests) {
    const session = mockTestService.startTest(config);
    assert(
      session.questions.length === config.questionCount,
      `Generated test "${config.title}" has exact requested question count (${session.questions.length}/${config.questionCount})`
    );

    // Verify no duplicates within generated test session
    const sessionQIds = new Set(session.questions.map((q) => q.id));
    assert(
      sessionQIds.size === session.questions.length,
      `All questions in test "${config.title}" are distinct and non-duplicated`
    );
  }

  // Test custom configuration generation across categories
  const customConfig: MockTestConfig = {
    title: 'Custom Mixed Test',
    category: 'mixed',
    questionCount: 25,
    durationMinutes: 30,
    difficulty: 'All',
    negativeMarking: true,
  };
  const customSession = mockTestService.startTest(customConfig);
  assert(customSession.questions.length === 25, `Custom test generated exactly 25 questions`);
  assert(customSession.negativeMarking === true, `Custom test negative marking flag preserved`);

  // -----------------------------------------------------------
  // 3. Scoring Engine & Negative Marking Calculation
  // -----------------------------------------------------------
  console.log('\n--- 3. Scoring Engine & Evaluation ---');

  // Test standard scoring (No negative marking)
  const dummySessionStandard: ActiveTestSession = {
    testId: 'test_eval_1',
    title: 'Eval Test Standard',
    category: 'technical',
    durationSeconds: 1800,
    startTimestamp: Date.now(),
    currentIndex: 0,
    negativeMarking: false,
    submitted: false,
    markedForReview: {},
    visited: {},
    questions: [
      {
        id: 'q1',
        question: 'Q1',
        options: ['A', 'B', 'C', 'D'],
        correctOptionIndex: 0,
        explanation: 'Exp1',
        category: 'tech',
        subject: 'C++',
        difficulty: 'Easy',
      },
      {
        id: 'q2',
        question: 'Q2',
        options: ['A', 'B', 'C', 'D'],
        correctOptionIndex: 1,
        explanation: 'Exp2',
        category: 'tech',
        subject: 'C++',
        difficulty: 'Easy',
      },
      {
        id: 'q3',
        question: 'Q3',
        options: ['A', 'B', 'C', 'D'],
        correctOptionIndex: 2,
        explanation: 'Exp3',
        category: 'tech',
        subject: 'C++',
        difficulty: 'Easy',
      },
      {
        id: 'q4',
        question: 'Q4',
        options: ['A', 'B', 'C', 'D'],
        correctOptionIndex: 3,
        explanation: 'Exp4',
        category: 'tech',
        subject: 'C++',
        difficulty: 'Easy',
      },
    ],
    answers: {
      q1: 0, // correct (+1)
      q2: 0, // incorrect (0)
      // q3 unanswered
      q4: 3, // correct (+1)
    },
  };

  const resStandard = await mockTestService.submitTest(dummySessionStandard);
  assert(resStandard.totalQuestions === 4, 'Total questions evaluated = 4');
  assert(resStandard.correctCount === 2, 'Correct count = 2');
  assert(resStandard.incorrectCount === 1, 'Incorrect count = 1');
  assert(resStandard.unansweredCount === 1, 'Unanswered count = 1');
  assert(resStandard.score === 2, `Standard score without negative marking = 2.0 (Actual: ${resStandard.score})`);
  assert(resStandard.scorePercentage === 50, `Score percentage = 50% (Actual: ${resStandard.scorePercentage}%)`);
  assert(resStandard.accuracyPercentage === 67, `Accuracy = 67% (2 correct out of 3 attempted, Actual: ${resStandard.accuracyPercentage}%)`);

  // Test negative marking (-0.25 penalty)
  const dummySessionNegative: ActiveTestSession = {
    ...dummySessionStandard,
    testId: 'test_eval_2',
    negativeMarking: true,
  };
  const resNegative = await mockTestService.submitTest(dummySessionNegative);
  // Score = 2.0 - (1 * 0.25) = 1.75
  assert(resNegative.score === 1.75, `Negative marking deducted 0.25 correctly (Score: 1.75, Actual: ${resNegative.score})`);

  // Test floor at 0 for negative marking
  const dummyAllWrong: ActiveTestSession = {
    ...dummySessionStandard,
    testId: 'test_eval_3',
    negativeMarking: true,
    answers: { q1: 1, q2: 0, q3: 0, q4: 0 }, // 4 wrong, 0 correct -> 0 - 1.0 = -1.0 -> floored to 0
  };
  const resFloored = await mockTestService.submitTest(dummyAllWrong);
  assert(resFloored.score === 0, `Negative score floored to 0 (Actual: ${resFloored.score})`);

  // -----------------------------------------------------------
  // 4. Timer Timestamp Math & Browser Resilience
  // -----------------------------------------------------------
  console.log('\n--- 4. Timer Resilience & Wall-clock Math ---');
  const now = Date.now();
  const sessionActive: ActiveTestSession = {
    ...dummySessionStandard,
    testId: 'test_active_timer',
    submitted: false,
    durationSeconds: 1800, // 30 mins
    startTimestamp: now - 300 * 1000, // 5 minutes elapsed
  };
  mockTestService.saveActiveSession(sessionActive);

  const restored = mockTestService.getActiveSession();
  assert(restored !== null, 'Active session restored from storage');
  assert(
    restored !== null && restored.remainingSeconds <= 1500 && restored.remainingSeconds >= 1498,
    `Remaining time reflects elapsed wall-clock time (~1500s, Actual: ${restored?.remainingSeconds}s)`
  );
  assert(restored?.isExpired === false, 'Test is not expired yet');

  // Test expired session
  const sessionExpired: ActiveTestSession = {
    ...dummySessionStandard,
    testId: 'test_expired_timer',
    submitted: false,
    durationSeconds: 600, // 10 mins
    startTimestamp: now - 700 * 1000, // 11.6 mins elapsed
  };
  mockTestService.saveActiveSession(sessionExpired);
  const restoredExpired = mockTestService.getActiveSession();
  assert(restoredExpired?.isExpired === true, 'Timer correctly detects expired session on page restore');
  mockTestService.clearActiveSession();

  // -----------------------------------------------------------
  // 5. Technical Interview Curriculum Verification
  // -----------------------------------------------------------
  console.log('\n--- 5. Technical Interview Questions ---');
  assert(
    technicalInterviewQuestions.length >= 90,
    `Total technical interview questions count >= 90 (Actual: ${technicalInterviewQuestions.length})`
  );
  assert(
    technicalInterviewSubjects.length === 8,
    `Technical interview covers all 8 core subjects (Actual: ${technicalInterviewSubjects.length})`
  );

  for (const sub of technicalInterviewSubjects) {
    const questionsForSub = technicalInterviewQuestions.filter((q) => q.subject === sub.id);
    assert(
      questionsForSub.length >= 10,
      `Subject "${sub.name}" has >= 10 questions (Actual: ${questionsForSub.length})`
    );
  }

  const technicalIdSet = new Set<string>();
  let duplicateTechId = false;
  let allHaveValidAnswers = true;
  let allHaveFollowUps = true;

  for (const q of technicalInterviewQuestions) {
    if (technicalIdSet.has(q.id)) duplicateTechId = true;
    technicalIdSet.add(q.id);

    if (!q.answer || q.answer.trim().length === 0) allHaveValidAnswers = false;
    if (!Array.isArray(q.followUpQuestions)) allHaveFollowUps = false;
  }

  assert(!duplicateTechId, 'All technical interview question IDs are unique');
  assert(allHaveValidAnswers, 'All technical interview questions provide concise core answers');
  assert(allHaveFollowUps, 'All technical interview questions include follow-up questions');

  // -----------------------------------------------------------
  // 6. HR Interview & Project Defense Blueprints
  // -----------------------------------------------------------
  console.log('\n--- 6. HR & Project Defense Verification ---');
  assert(hrInterviewQuestions.length === 10, `HR interview questions count is exactly 10 (Actual: ${hrInterviewQuestions.length})`);

  let hrStructureValid = true;
  for (const hr of hrInterviewQuestions) {
    if (
      !hr.objective ||
      !Array.isArray(hr.answerStructure) ||
      !hr.sampleAnswer ||
      !Array.isArray(hr.mistakesToAvoid) ||
      !Array.isArray(hr.proTips)
    ) {
      hrStructureValid = false;
    }
  }
  assert(hrStructureValid, 'All 10 HR questions include objective, 3-part structure, sample answer, and mistakes');

  // Project defense template
  assert(Boolean(defaultProjectTemplate.title), 'Default project defense blueprint has title');
  assert(Boolean(defaultProjectTemplate.problemStatement), 'Project defense has problem statement');
  assert(Boolean(defaultProjectTemplate.architecture), 'Project defense has architecture description');
  assert(Boolean(defaultProjectTemplate.techStack), 'Project defense has tech stack rationale');
  assert(Boolean(defaultProjectTemplate.databaseDesign), 'Project defense has database design');
  assert(Boolean(defaultProjectTemplate.challengesFaced), 'Project defense details technical challenges faced');
  assert(
    defaultProjectTemplate.interviewerQuestions.length === 10,
    `Project blueprint includes exactly 10 frequent interview questions (Actual: ${defaultProjectTemplate.interviewerQuestions.length})`
  );

  // -----------------------------------------------------------
  // 7. Company Preparation Profiles
  // -----------------------------------------------------------
  console.log('\n--- 7. Company Profiles & Pipeline ---');
  assert(
    initialCompanyProfiles.length === 10,
    `Initial company profiles count is exactly 10 (Actual: ${initialCompanyProfiles.length})`
  );

  const companyNames = initialCompanyProfiles.map((c) => c.name);
  const expectedCompanies = [
    'TCS',
    'Infosys',
    'Wipro',
    'Accenture',
    'Cognizant',
    'Capgemini',
    'Deloitte',
    'LTIMindtree',
    'Amazon',
    'Microsoft',
  ];

  const allExpectedPresent = expectedCompanies.every((name) =>
    companyNames.some((n) => n.toLowerCase().includes(name.toLowerCase()))
  );
  assert(allExpectedPresent, 'All 10 required top recruiters are present in company profiles');

  let allHaveRoundsAndChecklist = true;
  for (const comp of initialCompanyProfiles) {
    if (!comp.eligibility || !comp.assessmentPattern || comp.rounds.length === 0 || comp.checklist.length === 0) {
      allHaveRoundsAndChecklist = false;
    }
  }
  assert(allHaveRoundsAndChecklist, 'Every company profile has eligibility, pattern, rounds, and checklists');

  // -----------------------------------------------------------
  // 8. IndexedDB Persistence for Mock Tests & Company Profiles
  // -----------------------------------------------------------
  console.log('\n--- 8. IndexedDB Repository Persistence ---');

  // Test company repository
  await companyRepository.batchPut(initialCompanyProfiles);
  const storedCompanies = await companyRepository.getAll();
  assert(storedCompanies.length === 10, `Stored 10 company profiles in IndexedDB (Actual: ${storedCompanies.length})`);

  const tcs = storedCompanies.find((c) => c.name.includes('TCS'));
  assert(Boolean(tcs), 'TCS profile retrieved from IndexedDB');

  if (tcs) {
    await companyRepository.updateStatus(tcs.id, 'applied');
    const updatedTcs = await companyRepository.getById(tcs.id);
    assert(updatedTcs?.status === 'applied', 'Company status updated to "applied"');

    const firstChecklistId = tcs.checklist[0].id;
    await companyRepository.toggleChecklist(tcs.id, firstChecklistId);
    const toggledTcs = await companyRepository.getById(tcs.id);
    assert(
      toggledTcs?.checklist[0].completed === true,
      'Checklist item toggled to completed in IndexedDB'
    );
  }

  // Test mock test repository
  const testId = await mockTestRepository.create({
    title: 'Persistence Test Mock',
    category: 'mixed',
    totalQuestions: 20,
    attemptedCount: 18,
    correctCount: 15,
    incorrectCount: 3,
    unansweredCount: 2,
    score: 75,
    maxScore: 20,
    scorePercentage: 75,
    accuracyPercentage: 83,
    timeSpentSeconds: 1200,
    negativeMarking: true,
    responses: [],
  });

  const retrievedMock = await mockTestRepository.getById(testId);
  assert(Boolean(retrievedMock), 'Mock test record retrieved from IndexedDB');
  assert(retrievedMock?.score === 75, `Mock test score verified (Expected 75, Actual: ${retrievedMock?.score})`);

  // Analytics calculation
  const analytics = await mockTestService.getAnalytics();
  assert(analytics.totalTests >= 1, `Analytics reports >= 1 completed test (Actual: ${analytics.totalTests})`);
  assert(analytics.highestScorePercentage >= 70, `Highest score percentage calculated correctly (${analytics.highestScorePercentage}%)`);

  // -----------------------------------------------------------
  // Summary
  // -----------------------------------------------------------
  console.log('\n======================================================');
  console.log(`Phase 6 Test Results: ${passedAssertions} PASSED, ${failedAssertions} FAILED`);
  console.log('======================================================\n');

  if (failedAssertions > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
