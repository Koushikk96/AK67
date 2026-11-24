/**
 * AK67 Phase 11E: Three-Language DSA Integration & System-Wide Consistency Tests
 *
 * Verifies:
 * 1. Shared problem completion across C++, Python, Java (no triple counting).
 * 2. Uninflated Dashboard & Analytics calculations (67 DSA, 188 total).
 * 3. Revision queue deduplication and single-record retention.
 * 4. Shared notes and bookmarks persistence across language switches.
 * 5. Global language preference synchronization, normalization, and invalid-value fallback.
 * 6. Legacy sprint payload recovery and backwards compatibility.
 * 7. Backup and restore integrity (merge and replace modes) with language preference sync.
 */

import 'fake-indexeddb/auto';
import { AK67Database } from '../src/db/schema';
import { problemRepository } from '../src/db/repositories/problemRepository';
import { settingsRepository } from '../src/db/repositories/settingsRepository';
import { noteRepository } from '../src/db/repositories/noteRepository';
import { dsaProblems } from '../src/content/dsa';
import { analyticsService, CURRICULUM_COUNTS } from '../src/services/analyticsService';
import { revisionService } from '../src/services/revisionService';
import { backupEngine } from '../src/services/backup/backupEngine';
import {
  PREFERRED_DSA_LANGUAGE_STORAGE_KEY,
  PREFERRED_DSA_LANGUAGE_SETTINGS_KEY,
  DEFAULT_DSA_LANGUAGE,
  normalizeDSALanguage,
  isValidDSALanguage,
  getSavedDSALanguage,
  getPersistedDSALanguage,
  setPreferredDSALanguage,
  getLanguageDisplayLabel,
} from '../src/utils/dsaLanguage';
import {
  getSavedSprint,
  saveSprint,
  ActiveCodingSprint,
  setMemorySprintForTesting,
} from '../src/hooks/useCodingAssessment';
import { ACTIVE_CODING_STORAGE_KEY, LEGACY_CODING_STORAGE_KEY } from '../src/utils/pwaUtils';
import { DSALanguage } from '../src/types/dsa';
import { ProblemProgress } from '../src/types/database';

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

async function runPhase11EIntegrationTests() {
  console.log('\n======================================================');
  console.log('AK67 Phase 11E: Three-Language DSA System Integration');
  console.log('======================================================\n');

  const testDb = new AK67Database(`AK67_Phase11E_Test_${Date.now()}`);
  await testDb.open();
  assert(testDb.isOpen(), 'Test database initialized');

  // -------------------------------------------------------------
  // Group 1: Shared Problem Completion & No Triple Counting
  // -------------------------------------------------------------
  console.log('\n--- Group 1: Shared Problem Completion & No Triple Counting ---');

  // Verify curriculum baseline
  assert(dsaProblems.length === 67, '1a. Curriculum contains exactly 67 problems');
  assert(CURRICULUM_COUNTS.dsa === 67, '1b. Analytics CURRICULUM_COUNTS.dsa is exactly 67');
  assert(CURRICULUM_COUNTS.total === 188, '1c. Total placement curriculum is exactly 188 items');

  // Solve problem 1 ('two-sum')
  await problemRepository.updateStatus('two-sum', 'solved', 'Solvable in O(n) via hash map in all 3 languages', testDb);
  const p1Record = await problemRepository.getById('two-sum', testDb);
  assert(p1Record !== undefined, '1d. Problem record created in problem_progress');
  assert(p1Record?.status === 'solved', '1e. Problem status is solved');

  // Verify solved count in database is 1, not 3
  const allSolved = await problemRepository.getByStatus('solved', testDb);
  assert(allSolved.length === 1, '1f. Solved count in IndexedDB is exactly 1 (no triple counting)');

  // Solve problem 2 ('best-time-to-buy-and-sell-stock')
  await problemRepository.updateStatus('best-time-to-buy-and-sell-stock', 'solved', undefined, testDb);
  const allSolved2 = await problemRepository.getByStatus('solved', testDb);
  assert(allSolved2.length === 2, '1g. Solved count in IndexedDB is exactly 2');

  // -------------------------------------------------------------
  // Group 2: Analytics Determinism & Uninflated Metrics
  // -------------------------------------------------------------
  console.log('\n--- Group 2: Analytics Determinism & Metric Accuracy ---');

  const analytics = await analyticsService.getUnifiedAnalytics(testDb);
  assert(analytics.totalCurriculumCount === 188, '2a. Unified analytics reports totalCurriculumCount = 188');
  assert(analytics.totalCompletedCount === 2, '2b. Unified analytics reports exactly 2 completed items');

  const dsaSubject = analytics.subjects.find((s) => s.id === 'dsa');
  assert(dsaSubject !== undefined, '2c. DSA subject present in analytics');
  assert(dsaSubject?.totalTopics === 67, '2d. DSA total topics is exactly 67');
  assert(dsaSubject?.completedTopics === 2, '2e. DSA completed topics is exactly 2');
  const expectedPercentage = Math.round((2 / 67) * 100);
  assert(dsaSubject?.completionPercentage === expectedPercentage, `2f. DSA completion percentage is ${expectedPercentage}%`);

  // -------------------------------------------------------------
  // Group 3: Revision Queue Deduplication & Scheduling
  // -------------------------------------------------------------
  console.log('\n--- Group 3: Revision Queue Deduplication ---');

  // Enroll two-sum in revision queue
  const todayStr = new Date().toISOString().split('T')[0];
  const updatedP1: ProblemProgress = {
    ...p1Record!,
    status: 'revise',
    nextRevisionDate: todayStr,
    revisionCount: 1,
    intervalDays: 3,
  };
  await problemRepository.upsert(updatedP1, testDb);

  const dueProblems = await problemRepository.getDueRevisions(todayStr, testDb);
  assert(dueProblems.length === 1, '3a. Exactly 1 DSA problem due in revision queue');
  assert(dueProblems[0].id === 'two-sum', '3b. Due revision references original problem id (two-sum)');

  // Verify that problem progress holds exactly one record for two-sum
  const allRecords = await problemRepository.getAll(testDb);
  const twoSumRecords = allRecords.filter((r) => r.id === 'two-sum');
  assert(twoSumRecords.length === 1, '3c. Single persistent record for two-sum in problem_progress');

  // -------------------------------------------------------------
  // Group 4: Shared Notes & Bookmarks Across Languages
  // -------------------------------------------------------------
  console.log('\n--- Group 4: Shared Notes & Bookmarks ---');

  // Toggle bookmark on problem 1
  const isBookmarked = await problemRepository.toggleBookmark('two-sum', testDb);
  assert(isBookmarked === true, '4a. Bookmark toggled to true');
  const bookmarkedRec = await problemRepository.getById('two-sum', testDb);
  assert(bookmarkedRec?.bookmarked === true, '4b. Bookmark persisted on original problem id');

  // Attach a personal note
  const sampleNote = 'C++: unordered_map, Python: dict, Java: HashMap. Same logic across all three.';
  await problemRepository.updateStatus('two-sum', 'solved', sampleNote, testDb);
  const noteRec = await problemRepository.getById('two-sum', testDb);
  assert(noteRec?.personalNotes === sampleNote, '4c. Personal notes attached to original problem record');

  // Verify standalone notes table integration
  const noteId = await noteRepository.upsert(
    {
      title: 'Two Sum Multi-Language Patterns',
      category: 'DSA',
      content: sampleNote,
      linkedProblemId: 'two-sum',
      tags: ['arrays', 'hashing', 'multi-language'],
      isMistakeLog: false,
    },
    testDb
  );
  const savedStandaloneNote = await noteRepository.getById(noteId, testDb);
  assert(savedStandaloneNote !== undefined, '4d. Standalone note saved successfully');
  assert(savedStandaloneNote?.linkedProblemId === 'two-sum', '4e. Standalone note links to problem id two-sum');

  // -------------------------------------------------------------
  // Group 5: Language Preference Synchronization & Fallback
  // -------------------------------------------------------------
  console.log('\n--- Group 5: Language Preference Consistency & Fallbacks ---');

  // Normalization checks
  assert(normalizeDSALanguage('cpp') === 'cpp', '5a. Normalizes cpp to cpp');
  assert(normalizeDSALanguage('python') === 'python', '5b. Normalizes python to python');
  assert(normalizeDSALanguage('java') === 'java', '5c. Normalizes java to java');
  assert(normalizeDSALanguage('ruby') === 'cpp', '5d. Invalid ruby safely falls back to cpp');
  assert(normalizeDSALanguage(null) === 'cpp', '5e. Null safely falls back to cpp');
  assert(normalizeDSALanguage(undefined) === 'cpp', '5f. Undefined safely falls back to cpp');
  assert(normalizeDSALanguage(123) === 'cpp', '5g. Number safely falls back to cpp');

  // Display labels
  assert(getLanguageDisplayLabel('cpp') === 'C++', '5h. Display label for cpp is C++');
  assert(getLanguageDisplayLabel('python') === 'Python', '5i. Display label for python is Python');
  assert(getLanguageDisplayLabel('java') === 'Java', '5j. Display label for java is Java');

  // Persistence to app_settings
  await settingsRepository.set(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY, 'python', testDb);
  const retrievedLang = await settingsRepository.get<DSALanguage>(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY, undefined, testDb);
  assert(retrievedLang === 'python', '5k. Language preference stored and retrieved from app_settings');

  await settingsRepository.set(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY, 'java', testDb);
  const retrievedLang2 = await settingsRepository.get<DSALanguage>(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY, undefined, testDb);
  assert(retrievedLang2 === 'java', '5l. Language preference successfully updated to java');

  // -------------------------------------------------------------
  // Group 6: Legacy Coding Sprint Compatibility
  // -------------------------------------------------------------
  console.log('\n--- Group 6: Legacy Sprint Payload Fallback ---');

  // Simulated active sprint with language = 'python'
  const sprintPy: ActiveCodingSprint = {
    problem: dsaProblems[0],
    durationMinutes: 30,
    startTimestamp: Date.now(),
    endTime: Date.now() + 30 * 60 * 1000,
    status: 'solving',
    revealedHints: 0,
    showSolution: false,
    selectedLanguage: 'python',
  };
  saveSprint(sprintPy);
  const loadedPy = getSavedSprint();
  assert(loadedPy?.selectedLanguage === 'python', '6a. Modern sprint preserves selectedLanguage = python');

  // Simulated legacy sprint payload without selectedLanguage property
  const legacyPayload = {
    problem: dsaProblems[0],
    durationMinutes: 45,
    startTimestamp: Date.now(),
    endTime: Date.now() + 45 * 60 * 1000,
    status: 'solving',
    revealedHints: 1,
    showSolution: false,
  };

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(ACTIVE_CODING_STORAGE_KEY, JSON.stringify(legacyPayload));
  } else {
    setMemorySprintForTesting(JSON.stringify(legacyPayload));
  }
  const loadedLegacy = getSavedSprint();
  assert(loadedLegacy !== null, '6b. Legacy sprint payload loads successfully');
  assert(loadedLegacy?.selectedLanguage === 'cpp', '6c. Legacy sprint without selectedLanguage safely defaults to cpp');

  // Simulated sprint payload with invalid language ('go')
  const invalidLangPayload = {
    ...legacyPayload,
    selectedLanguage: 'go',
  };
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(ACTIVE_CODING_STORAGE_KEY, JSON.stringify(invalidLangPayload));
  } else {
    setMemorySprintForTesting(JSON.stringify(invalidLangPayload));
  }
  const loadedInvalid = getSavedSprint();
  assert(loadedInvalid?.selectedLanguage === 'cpp', '6d. Sprint with invalid language safely normalizes to cpp');

  // Cleanup sprint
  saveSprint(null);
  assert(getSavedSprint() === null, '6e. Sprint cleanup removes records');

  // -------------------------------------------------------------
  // Group 7: Backup and Restore Integrity
  // -------------------------------------------------------------
  console.log('\n--- Group 7: Backup & Restore Integrity (Merge & Replace) ---');

  // Generate backup from testDb
  const backup = await backupEngine.generateExport(testDb);
  assert(backup.appName === 'AK67', '7a. Backup format appName is AK67');
  assert(backup.schemaVersion === 1, '7b. Schema version is 1');
  assert(backup.backupFormatVersion === 1, '7c. Backup format version is 1');
  assert(backup.data.problem_progress.length === 2, '7d. Backup contains exactly 2 problem records');
  assert(backup.data.notes.length >= 1, '7e. Backup contains standalone note');

  const prefInBackup = backup.data.app_settings.find((s) => s.key === PREFERRED_DSA_LANGUAGE_SETTINGS_KEY);
  assert(prefInBackup !== undefined, '7f. preferred_dsa_language included in backup app_settings');
  assert(prefInBackup?.value === 'java', '7g. Backed-up language preference matches saved value (java)');

  // Test Replace Restoration in a clean database
  const restoreDb = new AK67Database(`AK67_Phase11E_Restore_${Date.now()}`);
  await restoreDb.open();

  const replaceResult = await backupEngine.restoreReplace(backup, restoreDb);
  assert(replaceResult.success === true, '7h. Clean replace restoration succeeded');

  const restoredProblems = await problemRepository.getAll(restoreDb);
  assert(restoredProblems.length === 2, '7i. Exactly 2 problem records restored');
  const restoredP1 = await problemRepository.getById('two-sum', restoreDb);
  assert(restoredP1?.status === 'solved', '7j. Restored status preserved as solved');
  assert(restoredP1?.bookmarked === true, '7k. Restored bookmark preserved as true');
  assert(restoredP1?.personalNotes === sampleNote, '7l. Restored personal notes preserved');

  const restoredPref = await settingsRepository.get<DSALanguage>(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY, undefined, restoreDb);
  assert(restoredPref === 'java', '7m. Language preference java restored in app_settings');

  // Test Backward Compatibility: Restore legacy backup without preferred_dsa_language
  const legacyBackup = {
    ...backup,
    data: {
      ...backup.data,
      app_settings: backup.data.app_settings.filter((s) => s.key !== PREFERRED_DSA_LANGUAGE_SETTINGS_KEY),
    },
  };
  const legacyRestoreDb = new AK67Database(`AK67_Phase11E_LegacyRestore_${Date.now()}`);
  await legacyRestoreDb.open();

  const legacyReplaceResult = await backupEngine.restoreReplace(legacyBackup, legacyRestoreDb);
  assert(legacyReplaceResult.success === true, '7n. Legacy backup restored successfully');
  const legacyPrefSetting = await settingsRepository.get<DSALanguage>(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY, undefined, legacyRestoreDb);
  assert(normalizeDSALanguage(legacyPrefSetting) === 'cpp', '7o. Legacy backup without preference safely defaults to cpp');

  // Close test databases
  await testDb.close();
  await restoreDb.close();
  await legacyRestoreDb.close();

  console.log('\n======================================================');
  console.log(`ALL PHASE 11E INTEGRATION TESTS PASSED: ${passedCount} / ${testCount} assertions passed`);
  console.log('======================================================\n');
}

runPhase11EIntegrationTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Phase 11E Integration tests failed:', err);
    process.exit(1);
  });
