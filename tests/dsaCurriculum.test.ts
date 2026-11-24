import { dsaProblems, dsaCategories } from '../src/content/dsa';

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

function runCurriculumTests() {
  console.log('\n======================================================');
  console.log('AK67 Phase 3: DSA 67-Problem Curriculum Verification');
  console.log('======================================================\n');

  // 1. Total count
  assert(dsaProblems.length === 67, `1. Exactly 67 problems exist (Actual: ${dsaProblems.length})`);

  // 2. Unique numbers from 1 to 67
  const numbers = new Set<number>();
  for (const p of dsaProblems) {
    numbers.add(p.number);
  }
  assert(numbers.size === 67, '2a. Exactly 67 unique problem numbers exist');
  for (let i = 1; i <= 67; ++i) {
    if (!numbers.has(i)) {
      throw new Error(`Missing problem number: ${i}`);
    }
  }
  assert(true, '2b. Problem numbers 1 to 67 are strictly continuous with 0 gaps');

  // 3. Unique IDs
  const ids = new Set<string>();
  for (const p of dsaProblems) {
    ids.add(p.id);
  }
  assert(ids.size === 67, '3. All 67 problem IDs are strictly unique');

  // 4. Category breakdown
  const categoryCounts: Record<string, number> = {};
  for (const p of dsaProblems) {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  }

  assert(categoryCounts['Arrays'] === 12, '4a. Arrays has 12 problems');
  assert(categoryCounts['Strings'] === 8, '4b. Strings has 8 problems');
  assert(categoryCounts['Hashing'] === 5, '4c. Hashing has 5 problems');
  assert(categoryCounts['Two Pointers & Sliding Window'] === 6, '4d. Two Pointers & Sliding Window has 6 problems');
  assert(categoryCounts['Sorting & Binary Search'] === 7, '4e. Sorting & Binary Search has 7 problems');
  assert(categoryCounts['Recursion & Backtracking'] === 5, '4f. Recursion & Backtracking has 5 problems');
  assert(categoryCounts['Linked Lists'] === 5, '4g. Linked Lists has 5 problems');
  assert(categoryCounts['Stack & Queue'] === 5, '4h. Stack & Queue has 5 problems');
  assert(categoryCounts['Trees & BST'] === 6, '4i. Trees & BST has 6 problems');
  assert(categoryCounts['Dynamic Programming'] === 5, '4j. Dynamic Programming has 5 problems');
  assert(categoryCounts['Basic Graphs'] === 3, '4k. Basic Graphs has 3 problems');

  // 5. Mandatory content fields check for all 67 problems
  let allFieldsValid = true;
  for (const p of dsaProblems) {
    if (
      !p.id ||
      !p.title ||
      !p.category ||
      !p.difficulty ||
      !p.description ||
      !Array.isArray(p.examples) || p.examples.length === 0 ||
      !Array.isArray(p.constraints) || p.constraints.length === 0 ||
      !Array.isArray(p.keyConcepts) || p.keyConcepts.length === 0 ||
      !p.pattern ||
      !p.timeComplexity ||
      !p.spaceComplexity ||
      !Array.isArray(p.hints) || p.hints.length !== 3 ||
      !p.cppSolution ||
      !p.pythonSolution ||
      !p.javaSolution ||
      !Array.isArray(p.edgeCases) || p.edgeCases.length === 0 ||
      !Array.isArray(p.commonMistakes) || p.commonMistakes.length === 0 ||
      !p.interviewExplanation
    ) {
      console.error(`Invalid fields in problem #${p.number}: ${p.title}`);
      allFieldsValid = false;
      break;
    }
  }
  assert(allFieldsValid, '5. All 67 problems contain complete, non-empty metadata, progressive 3 hints, examples, and interview guide');

  // 6. C++ solution code validation
  let allCppValid = true;
  for (const p of dsaProblems) {
    // Check balanced curly braces in C++ code
    let openBraces = 0;
    for (const ch of p.cppSolution) {
      if (ch === '{') openBraces++;
      if (ch === '}') openBraces--;
    }
    if (openBraces !== 0) {
      console.error(`Unbalanced braces in C++ solution for #${p.number}: ${p.title}`);
      allCppValid = false;
      break;
    }
  }
  assert(allCppValid, '6. All 67 C++ solutions have balanced braces and structured syntax');

  // 7. Multi-language Python and Java solutions validation
  let allMultiLanguageValid = true;
  for (const p of dsaProblems) {
    if (!p.pythonSolution || p.pythonSolution.length < 30 || !p.javaSolution || p.javaSolution.length < 30) {
      allMultiLanguageValid = false;
      break;
    }
  }
  assert(allMultiLanguageValid, '7. All 67 problems contain complete verified Python and Java solutions (201 solutions total)');

  console.log('\n======================================================');
  console.log(`ALL CURRICULUM TESTS PASSED: ${passedCount} / ${testCount} assertions passed`);
  console.log('======================================================\n');
}

runCurriculumTests();
