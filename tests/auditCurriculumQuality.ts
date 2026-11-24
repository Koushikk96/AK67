/**
 * AK67 Phase 11B Curriculum Quality & Rigor Audit
 * Inspects all 89 topics across 8 modules to verify:
 * 1. Educational depth and explanation length
 * 2. 3-tier practice exercises (Beginner, Intermediate, Advanced) with active recall solutions
 * 3. MCQ schema integrity (options >= 4, valid correctOptionIndex, comprehensive explanations)
 * 4. Topic checkpoints, revision notes, common mistakes, real world applications
 */

import { allPythonTopics, pythonModules } from '../src/content/python';

console.log('======================================================');
console.log('AK67: Python Mastery Curriculum Quality & Rigor Audit');
console.log('======================================================\n');

let totalIssues = 0;
let exerciseCount = 0;
let beginnerExCount = 0;
let interExCount = 0;
let advExCount = 0;
let mcqCount = 0;
let checkpointCount = 0;
let revisionNotesCount = 0;

console.log(`Checking ${pythonModules.length} Modules and ${allPythonTopics.length} Topics...\n`);

// 1. Module distribution check
for (const mod of pythonModules) {
  const topicsInMod = allPythonTopics.filter((t) => t.moduleNumber === mod.number);
  console.log(`Module ${mod.number}: "${mod.title}" -> ${topicsInMod.length} topics (Module topics: ${mod.topics.length})`);
  if (topicsInMod.length !== mod.topics.length) {
    console.error(`  [ERROR] Topic count mismatch in Module ${mod.number}: expected ${mod.topics.length}, found ${topicsInMod.length}`);
    totalIssues += 1;
  }
}

console.log('\n--- Auditing Topic Fields, Depth & Educational Rigor ---');

allPythonTopics.forEach((topic) => {
  // Title & Level
  if (!topic.title || topic.title.length < 5) {
    console.error(`[ERROR] Topic #${topic.topicNumber} has invalid title: "${topic.title}"`);
    totalIssues += 1;
  }

  // Why it matters
  if (!topic.whyItMatters || topic.whyItMatters.length < 30) {
    console.error(`[ERROR] Topic #${topic.topicNumber} ("${topic.title}") has shallow whyItMatters (${topic.whyItMatters?.length || 0} chars)`);
    totalIssues += 1;
  }

  // Explanation
  if (!topic.explanation || topic.explanation.length < 100) {
    console.error(`[ERROR] Topic #${topic.topicNumber} ("${topic.title}") has shallow explanation (${topic.explanation?.length || 0} chars)`);
    totalIssues += 1;
  }

  // Syntax and structure
  if (!topic.syntaxAndStructure || topic.syntaxAndStructure.length < 20) {
    console.error(`[ERROR] Topic #${topic.topicNumber} has shallow syntaxAndStructure`);
    totalIssues += 1;
  }

  // Code examples
  if (!Array.isArray(topic.codeExamples) || topic.codeExamples.length < 2) {
    console.error(`[ERROR] Topic #${topic.topicNumber} has fewer than 2 code examples (${topic.codeExamples?.length || 0})`);
    totalIssues += 1;
  }

  // Checkpoints
  if (!Array.isArray(topic.checkpoints) || topic.checkpoints.length < 2) {
    console.error(`[ERROR] Topic #${topic.topicNumber} has fewer than 2 checkpoints`);
    totalIssues += 1;
  } else {
    checkpointCount += topic.checkpoints.length;
  }

  // Real world applications
  if (!Array.isArray(topic.realWorldApplications) || topic.realWorldApplications.length < 1) {
    console.error(`[ERROR] Topic #${topic.topicNumber} missing realWorldApplications`);
    totalIssues += 1;
  }

  // Common mistakes
  if (!Array.isArray(topic.commonMistakes) || topic.commonMistakes.length < 2) {
    console.error(`[ERROR] Topic #${topic.topicNumber} has fewer than 2 common mistakes`);
    totalIssues += 1;
  }

  // Interview relevance
  if (!topic.interviewRelevance || topic.interviewRelevance.length < 20) {
    console.error(`[ERROR] Topic #${topic.topicNumber} missing interviewRelevance`);
    totalIssues += 1;
  }

  // Revision notes
  if (!Array.isArray(topic.revisionNotes) || topic.revisionNotes.length < 2) {
    console.error(`[ERROR] Topic #${topic.topicNumber} has fewer than 2 revision notes`);
    totalIssues += 1;
  } else {
    revisionNotesCount += topic.revisionNotes.length;
  }

  // Practice exercises
  if (!Array.isArray(topic.practiceExercises) || topic.practiceExercises.length < 3) {
    console.error(`[ERROR] Topic #${topic.topicNumber} has fewer than 3 exercises (${topic.practiceExercises?.length || 0})`);
    totalIssues += 1;
  } else {
    const hasBeginner = topic.practiceExercises.some((e) => e.difficulty === 'Beginner');
    const hasInter = topic.practiceExercises.some((e) => e.difficulty === 'Intermediate');
    const hasAdv = topic.practiceExercises.some((e) => e.difficulty === 'Advanced');

    if (!hasBeginner || !hasInter || !hasAdv) {
      console.error(`[ERROR] Topic #${topic.topicNumber} missing 3-tier exercise coverage: Beginner=${hasBeginner}, Inter=${hasInter}, Adv=${hasAdv}`);
      totalIssues += 1;
    }

    topic.practiceExercises.forEach((ex) => {
      exerciseCount += 1;
      if (ex.difficulty === 'Beginner') beginnerExCount++;
      if (ex.difficulty === 'Intermediate') interExCount++;
      if (ex.difficulty === 'Advanced') advExCount++;

      if (!ex.prompt || ex.prompt.length < 15) {
        console.error(`[ERROR] Exercise "${ex.title}" in Topic #${topic.topicNumber} has shallow prompt`);
        totalIssues += 1;
      }
      if (!ex.solution || ex.solution.length < 20) {
        console.error(`[ERROR] Exercise "${ex.title}" in Topic #${topic.topicNumber} has missing/shallow solution`);
        totalIssues += 1;
      }
    });
  }

  // MCQs / Quiz Questions
  if (!Array.isArray(topic.quizQuestions) || topic.quizQuestions.length < 1) {
    console.error(`[ERROR] Topic #${topic.topicNumber} missing quizQuestions`);
    totalIssues += 1;
  } else {
    topic.quizQuestions.forEach((mcq, idx) => {
      mcqCount += 1;
      if (!mcq.question || mcq.question.length < 10) {
        console.error(`[ERROR] Quiz Question #${idx + 1} in Topic #${topic.topicNumber} has shallow question`);
        totalIssues += 1;
      }
      if (!Array.isArray(mcq.options) || mcq.options.length < 4) {
        console.error(`[ERROR] Quiz Question #${idx + 1} in Topic #${topic.topicNumber} has fewer than 4 options`);
        totalIssues += 1;
      }
      if (mcq.correctOptionIndex < 0 || mcq.correctOptionIndex >= mcq.options.length) {
        console.error(`[ERROR] Quiz Question #${idx + 1} in Topic #${topic.topicNumber} has out-of-bounds correctOptionIndex (${mcq.correctOptionIndex})`);
        totalIssues += 1;
      }
      if (!mcq.explanation || mcq.explanation.length < 15) {
        console.error(`[ERROR] Quiz Question #${idx + 1} in Topic #${topic.topicNumber} has shallow explanation`);
        totalIssues += 1;
      }
    });
  }
});

console.log('\n================ CURRICULUM AUDIT SUMMARY ================');
console.log(`Total Topics Audited: ${allPythonTopics.length} / 89`);
console.log(`Total Practice Exercises: ${exerciseCount} (Beginner: ${beginnerExCount}, Intermediate: ${interExCount}, Advanced: ${advExCount})`);
console.log(`Total MCQs Audited: ${mcqCount}`);
console.log(`Total Checkpoints Audited: ${checkpointCount}`);
console.log(`Total Revision Notes: ${revisionNotesCount}`);
console.log(`Total Quality Issues Detected: ${totalIssues}`);
console.log('==========================================================\n');

if (totalIssues > 0) {
  process.exit(1);
} else {
  console.log('Curriculum quality audit PASSED 100%!');
}
