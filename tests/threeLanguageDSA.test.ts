import 'fake-indexeddb/auto';
import { dsaProblems, getProblemById, getProblemByNumber } from '../src/content/dsa';
import { DSALanguage } from '../src/types/dsa';
import { settingsRepository } from '../src/db/repositories/settingsRepository';
import { getSavedSprint, saveSprint, ActiveCodingSprint, setMemorySprintForTesting } from '../src/hooks/useCodingAssessment';
import { ACTIVE_CODING_STORAGE_KEY, LEGACY_CODING_STORAGE_KEY, isAssessmentActive } from '../src/utils/pwaUtils';
import { db } from '../src/db';

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

async function runThreeLanguageDSATests() {
  console.log('\n======================================================');
  console.log('AK67 Phase 11D: Three-Language DSA & Coding Sprint Verification');
  console.log('======================================================\n');

  // Group 1: Problem Count and Preservation
  console.log('--- Group 1: Curriculum & Problem Count Integrity ---');
  assert(dsaProblems.length === 67, `1a. Exactly 67 DSA problems exist (Found: ${dsaProblems.length})`);

  const numbers = new Set<number>();
  for (const p of dsaProblems) {
    numbers.add(p.number);
  }
  assert(numbers.size === 67, '1b. Exactly 67 unique problem numbers exist');
  for (let i = 1; i <= 67; i++) {
    if (!numbers.has(i)) {
      throw new Error(`Missing problem number: ${i}`);
    }
  }
  assert(true, '1c. Numbers 1 to 67 are strictly continuous with 0 gaps');

  const ids = new Set<string>();
  for (const p of dsaProblems) {
    ids.add(p.id);
  }
  assert(ids.size === 67, '1d. Exactly 67 unique problem IDs exist');

  // Verify lookup helpers
  const p1 = getProblemById('two-sum');
  assert(p1 !== undefined && p1.number === 1, '1e. Lookup by ID (two-sum) returns problem #1');
  const p67 = getProblemByNumber(67);
  assert(p67 !== undefined && p67.id === 'find-if-path-exists-in-graph', '1f. Lookup by number (67) returns find-if-path-exists-in-graph');

  // Group 2: Three-Language Solutions Verification (201 Solutions)
  console.log('\n--- Group 2: Three-Language Reference Solutions Completeness (201 Solutions) ---');
  let cppCount = 0;
  let pyCount = 0;
  let javaCount = 0;

  for (const p of dsaProblems) {
    // C++
    if (p.cppSolution && typeof p.cppSolution === 'string' && p.cppSolution.length > 30) {
      cppCount++;
    }
    // Python
    if (p.pythonSolution && typeof p.pythonSolution === 'string' && p.pythonSolution.length > 30) {
      pyCount++;
    }
    // Java
    if (p.javaSolution && typeof p.javaSolution === 'string' && p.javaSolution.length > 30) {
      javaCount++;
    }
  }

  assert(cppCount === 67, `2a. Exactly 67 valid C++ solutions exist (Actual: ${cppCount})`);
  assert(pyCount === 67, `2b. Exactly 67 valid Python solutions exist (Actual: ${pyCount})`);
  assert(javaCount === 67, `2c. Exactly 67 valid Java solutions exist (Actual: ${javaCount})`);
  assert(cppCount + pyCount + javaCount === 201, `2d. Total language-specific solutions is exactly 201 (Actual: ${cppCount + pyCount + javaCount})`);

  // Syntax and structural checks for all 3 languages
  let allCppBracesBalanced = true;
  let allJavaBracesBalanced = true;
  let allPyStructured = true;

  for (const p of dsaProblems) {
    // C++ braces
    let cppBraces = 0;
    for (const ch of p.cppSolution) {
      if (ch === '{') cppBraces++;
      if (ch === '}') cppBraces--;
    }
    if (cppBraces !== 0) {
      console.error(`Unbalanced C++ braces in problem #${p.number}: ${p.id}`);
      allCppBracesBalanced = false;
    }

    // Java braces
    let javaBraces = 0;
    for (const ch of p.javaSolution) {
      if (ch === '{') javaBraces++;
      if (ch === '}') javaBraces--;
    }
    if (javaBraces !== 0) {
      console.error(`Unbalanced Java braces in problem #${p.number}: ${p.id}`);
      allJavaBracesBalanced = false;
    }

    // Python structure (class Solution: and def)
    if (!p.pythonSolution.includes('class ') || !p.pythonSolution.includes('def ')) {
      console.error(`Missing Python class/def structure in problem #${p.number}: ${p.id}`);
      allPyStructured = false;
    }
  }

  assert(allCppBracesBalanced, '2e. All 67 C++ solutions have balanced braces');
  assert(allJavaBracesBalanced, '2f. All 67 Java solutions have balanced braces');
  assert(allPyStructured, '2g. All 67 Python solutions have proper class and method definitions');

  // Group 3: Preferred Language Persistence (settingsRepository & localStorage)
  console.log('\n--- Group 3: Preferred Language Persistence ---');
  await db.open();

  await settingsRepository.set('preferred_dsa_language', 'python');
  const storedLang1 = await settingsRepository.get<DSALanguage>('preferred_dsa_language');
  assert(storedLang1 === 'python', '3a. Preferred language can be set and retrieved as python');

  await settingsRepository.set('preferred_dsa_language', 'java');
  const storedLang2 = await settingsRepository.get<DSALanguage>('preferred_dsa_language');
  assert(storedLang2 === 'java', '3b. Preferred language can be set and retrieved as java');

  await settingsRepository.set('preferred_dsa_language', 'cpp');
  const storedLang3 = await settingsRepository.get<DSALanguage>('preferred_dsa_language');
  assert(storedLang3 === 'cpp', '3c. Preferred language can be set and retrieved as cpp (default)');

  // Group 4: Coding Sprint Integration & Backward Compatibility
  console.log('\n--- Group 4: Coding Sprint & Multi-Language Assessment Integration ---');

  // Mock sprint with selectedLanguage = 'java'
  const mockSprintJava: ActiveCodingSprint = {
    problem: p1!,
    durationMinutes: 45,
    startTimestamp: Date.now(),
    endTime: Date.now() + 45 * 60 * 1000,
    status: 'solving',
    revealedHints: 1,
    showSolution: false,
    selectedLanguage: 'java',
  };

  saveSprint(mockSprintJava);
  const loadedSprintJava = getSavedSprint();
  assert(loadedSprintJava !== null, '4a. Saved sprint successfully loaded');
  assert(loadedSprintJava?.selectedLanguage === 'java', '4b. Sprint preserved selectedLanguage = java');
  assert(loadedSprintJava?.durationMinutes === 45, '4c. Sprint preserved durationMinutes');

  // Mock sprint with selectedLanguage = 'python'
  const mockSprintPy: ActiveCodingSprint = {
    ...mockSprintJava,
    selectedLanguage: 'python',
  };
  saveSprint(mockSprintPy);
  const loadedSprintPy = getSavedSprint();
  assert(loadedSprintPy?.selectedLanguage === 'python', '4d. Sprint preserved selectedLanguage = python');

  // Test backward compatibility: legacy payload without selectedLanguage
  const legacyPayload = {
    problem: p1!,
    durationMinutes: 30,
    startTimestamp: Date.now(),
    endTime: Date.now() + 30 * 60 * 1000,
    status: 'solving',
    revealedHints: 0,
    showSolution: false,
    // selectedLanguage is intentionally omitted (simulating existing user storage)
  };

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LEGACY_CODING_STORAGE_KEY, JSON.stringify(legacyPayload));
    localStorage.removeItem(ACTIVE_CODING_STORAGE_KEY);
  } else {
    setMemorySprintForTesting(JSON.stringify(legacyPayload));
  }
  const loadedLegacy = getSavedSprint();
  assert(loadedLegacy !== null, '4e. Legacy sprint payload loaded successfully');
  assert(loadedLegacy?.selectedLanguage === 'cpp', '4f. Legacy sprint payload gracefully defaults selectedLanguage to cpp');

  // Clean up sprint
  saveSprint(null);
  assert(getSavedSprint() === null, '4g. Sprint cleanup removes records cleanly');

  // Group 5: Metadata & Pedagogical Consistency
  console.log('\n--- Group 5: Problem Metadata Completeness ---');
  let allMetadataValid = true;
  for (const p of dsaProblems) {
    if (
      !p.hints || p.hints.length !== 3 ||
      !p.edgeCases || p.edgeCases.length === 0 ||
      !p.commonMistakes || p.commonMistakes.length === 0 ||
      !p.keyConcepts || p.keyConcepts.length === 0 ||
      !p.pattern ||
      !p.timeComplexity ||
      !p.spaceComplexity ||
      !p.interviewExplanation
    ) {
      allMetadataValid = false;
      console.error(`Incomplete metadata in #${p.number}: ${p.id}`);
      break;
    }
  }
  assert(allMetadataValid, '5a. All 67 problems retain complete progressive 3-tier hints, edge cases, and recruiter guides');

  console.log('\n======================================================');
  console.log(`ALL THREE-LANGUAGE DSA TESTS PASSED: ${passedCount} / ${testCount} assertions passed`);
  console.log('======================================================\n');
}

runThreeLanguageDSATests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Test suite failed:', err);
    process.exit(1);
  });
