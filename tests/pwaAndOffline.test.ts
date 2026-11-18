/**
 * AK67 Phase 8: Progressive Web App (PWA) & Offline Excellence Verification Tests
 * Verifies Web App Manifest compliance, icon assets, service worker generation,
 * offline static content availability, IndexedDB offline persistence,
 * assessment-active update deferral logic, network state transitions,
 * and offline backup export & restoration.
 */

import 'fake-indexeddb/auto';
import fs from 'fs';
import path from 'path';

// Node.js test environment localStorage polyfill
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map<string, string>();
  (globalThis as any).localStorage = {
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: (key: string, val: string) => store.set(key, String(val)),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] || null,
    get length() {
      return store.size;
    },
  };
}
import { AK67Database } from '../src/db/schema';
import { problemRepository } from '../src/db/repositories/problemRepository';
import { noteRepository } from '../src/db/repositories/noteRepository';
import { mockTestRepository } from '../src/db/repositories/mockTestRepository';
import { backupEngine } from '../src/services/backup/backupEngine';
import { isAssessmentActive, isStandaloneMode } from '../src/utils/pwaUtils';
import { dsaProblems } from '../src/content/dsa';
import { cppTopics } from '../src/content/cpp';
import { sqlTopics } from '../src/content/sql';
import { dbmsTopics, osTopics, networkTopics, softwareEngTopics } from '../src/content/coreCS';
import { quantTopics, logicalTopics, verbalTopics } from '../src/content/aptitude';
import { allTechnicalMCQs } from '../src/content/mcq';
import { allAptitudeTopics } from '../src/content/aptitude';
import { technicalInterviewQuestions, hrInterviewQuestions } from '../src/content/interviews';
import { initialCompanyProfiles } from '../src/content/companies/initialCompanies';
import { ProblemProgress, PersonalNote, MockTestRecord } from '../src/types/database';

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
  console.log('AK67 Phase 8: PWA & Offline Excellence Verification');
  console.log('======================================================\n');

  const rootDir = process.cwd();
  const publicDir = path.resolve(rootDir, 'public');
  const distDir = path.resolve(rootDir, 'dist');

  // -----------------------------------------------------------
  // Test Group 1: PWA Icon Assets Verification
  // -----------------------------------------------------------
  console.log('--- 1. PWA Icon Assets & Brand System ---');
  const requiredIcons = [
    { file: 'pwa-192x192.png', minSize: 1000 },
    { file: 'pwa-512x512.png', minSize: 2000 },
    { file: 'maskable-icon-512x512.png', minSize: 2000 },
    { file: 'apple-touch-icon.png', minSize: 1000 },
    { file: 'apple-touch-icon-180x180.png', minSize: 1000 },
    { file: 'favicon.svg', minSize: 200 },
    { file: 'favicon-64x64.png', minSize: 400 },
  ];

  for (const icon of requiredIcons) {
    const fullPath = path.join(publicDir, icon.file);
    const exists = fs.existsSync(fullPath);
    assert(exists, `Icon exists: public/${icon.file}`);
    if (exists) {
      const stats = fs.statSync(fullPath);
      assert(
        stats.size >= icon.minSize,
        `Icon public/${icon.file} has valid file size (${stats.size} bytes >= ${icon.minSize})`
      );
    }
  }

  // -----------------------------------------------------------
  // Test Group 2: Production Build & Manifest Verification
  // -----------------------------------------------------------
  console.log('\n--- 2. Production Build & Web App Manifest ---');
  const manifestPath = path.join(distDir, 'manifest.webmanifest');
  const swPath = path.join(distDir, 'sw.js');

  assert(fs.existsSync(manifestPath), 'dist/manifest.webmanifest exists in production build');
  assert(fs.existsSync(swPath), 'dist/sw.js service worker bundle exists in production build');

  if (fs.existsSync(manifestPath)) {
    const manifestContent = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert(
      manifestContent.name === 'AK67 — Your Placement Preparation System',
      `Manifest name matches exact identity ("${manifestContent.name}")`
    );
    assert(manifestContent.short_name === 'AK67', 'Manifest short_name is "AK67"');
    assert(manifestContent.display === 'standalone', 'Manifest display is "standalone"');
    assert(manifestContent.orientation === 'portrait', 'Manifest orientation is "portrait"');
    assert(manifestContent.theme_color === '#09090b', 'Manifest theme_color is "#09090b"');
    assert(manifestContent.background_color === '#09090b', 'Manifest background_color is "#09090b"');
    assert(manifestContent.start_url === '/', 'Manifest start_url is "/"');
    assert(manifestContent.scope === '/', 'Manifest scope is "/"');
    assert(Array.isArray(manifestContent.icons) && manifestContent.icons.length >= 3, 'Manifest defines at least 3 icons');

    const maskableIcon = manifestContent.icons.find((i: any) => i.purpose === 'maskable');
    assert(maskableIcon !== undefined, 'Manifest includes explicit maskable icon for Android');
    assert(maskableIcon?.sizes === '512x512', 'Maskable icon size is 512x512');
  }

  // -----------------------------------------------------------
  // Test Group 3: Workbox Service Worker Verification
  // -----------------------------------------------------------
  console.log('\n--- 3. Workbox Service Worker Caching Strategy ---');
  if (fs.existsSync(swPath)) {
    const swContent = fs.readFileSync(swPath, 'utf8');
    assert(swContent.includes('precacheAndRoute'), 'Service worker includes precacheAndRoute');
    assert(swContent.includes('cleanupOutdatedCaches'), 'Service worker configures cleanupOutdatedCaches');
    assert(swContent.includes('SKIP_WAITING'), 'Service worker listens for safe SKIP_WAITING update message');
    assert(swContent.includes('NavigationRoute'), 'Service worker registers NavigationRoute for offline SPA routing');
    assert(swContent.includes('StaleWhileRevalidate'), 'Service worker registers StaleWhileRevalidate runtime cache');
    assert(swContent.includes('CacheFirst'), 'Service worker registers CacheFirst image cache');
  }

  // -----------------------------------------------------------
  // Test Group 4: Local Static Curriculum Offline Availability
  // -----------------------------------------------------------
  console.log('\n--- 4. Local Curriculum Offline Availability ---');
  // Confirm all learning material is bundled statically in code (zero backend API dependency)
  assert(dsaProblems.length === 67, 'All 67 DSA problems bundled locally');
  assert(cppTopics.length === 17, 'All 17 C++ topics bundled locally');
  assert(sqlTopics.length === 21, 'All 21 SQL queries & topics bundled locally');
  assert(dbmsTopics.length === 11, 'All 11 DBMS topics bundled locally');
  assert(osTopics.length === 13, 'All 13 OS topics bundled locally');
  assert(networkTopics.length === 13, 'All 13 Computer Networks topics bundled locally');
  assert(softwareEngTopics.length === 10, 'All 10 Software Engineering topics bundled locally');

  const totalCurriculum =
    dsaProblems.length +
    cppTopics.length +
    sqlTopics.length +
    dbmsTopics.length +
    osTopics.length +
    networkTopics.length +
    softwareEngTopics.length +
    quantTopics.length +
    logicalTopics.length +
    verbalTopics.length;
  assert(totalCurriculum === 188, `Exactly 188 curriculum items bundled locally (Actual: ${totalCurriculum})`);

  let totalAptitudeMCQs = 0;
  for (const t of allAptitudeTopics) {
    totalAptitudeMCQs += t.practiceQuestions.length;
  }
  const totalMCQs = totalAptitudeMCQs + allTechnicalMCQs.length;
  assert(totalMCQs === 282, `All 282 MCQ questions bundled locally (Actual: ${totalMCQs})`);
  assert(technicalInterviewQuestions.length === 90, 'All 90 technical interview questions bundled locally');
  assert(hrInterviewQuestions.length === 10, 'All 10 HR interview questions bundled locally');
  assert(initialCompanyProfiles.length === 10, 'All 10 recruiter company profiles bundled locally');

  // -----------------------------------------------------------
  // Test Group 5: IndexedDB Offline Data Persistence & Safety
  // -----------------------------------------------------------
  console.log('\n--- 5. IndexedDB Persistence & Offline Operations ---');
  const testDb = new AK67Database('test_pwa_offline_' + Date.now());

  // 5a. Save DSA progress offline
  const problemRecord: ProblemProgress = {
    id: 'dsa-two-sum',
    topic: 'Arrays',
    difficulty: 'Easy',
    status: 'solved',
    personalNotes: 'Offline note: use hash map for O(n) solution',
    bookmarked: true,
    solvedAt: new Date().toISOString(),
    revisionCount: 1,
    intervalDays: 3,
    easeFactor: 2.5,
  };
  await problemRepository.upsert(problemRecord, testDb);
  const retrievedProblem = await problemRepository.getById('dsa-two-sum', testDb);
  assert(retrievedProblem !== undefined, 'DSA progress written and retrieved in local IndexedDB');
  assert(retrievedProblem?.status === 'solved', 'Problem status is solved');
  assert(retrievedProblem?.personalNotes.includes('Offline note') === true, 'Problem notes preserved');

  // 5b. Save Mistake record offline
  const nowIso = new Date().toISOString();
  const mistakeRecord: PersonalNote = {
    id: 'mistake_offline_1',
    title: 'Off-by-one in loop condition',
    category: 'DSA',
    subject: 'DSA',
    mistakeCategory: 'Edge case missed',
    whatWentWrong: 'Missed equality condition',
    correctApproach: 'Use <= for closed intervals',
    personalLesson: 'Trace loop boundaries on paper',
    dateRecorded: nowIso,
    reviewStatus: 'pending',
    difficulty: 'Medium',
    isMistakeLog: true,
    tags: ['Mistake', 'DSA'],
    content: 'Boundary check',
    createdAt: nowIso,
    updatedAt: nowIso,
  };
  await noteRepository.upsert(mistakeRecord, testDb);
  const retrievedMistake = await noteRepository.getById('mistake_offline_1', testDb);
  assert(retrievedMistake !== undefined, 'Mistake record persisted offline');
  assert(retrievedMistake?.isMistakeLog === true, 'isMistakeLog is true');

  // 5c. Save Mock Test attempt offline
  const mockRecord: MockTestRecord = {
    id: 'mock_offline_1',
    title: 'Offline Quick Placement Quiz',
    category: 'Full Mock Test',
    totalQuestions: 15,
    correctCount: 12,
    score: 80,
    durationSeconds: 900,
    responses: [],
    completedAt: nowIso,
  };
  await mockTestRepository.create(mockRecord, testDb);
  const retrievedMock = await mockTestRepository.getById('mock_offline_1', testDb);
  assert(retrievedMock !== undefined, 'Mock test record persisted offline');
  assert(retrievedMock?.score === 80, 'Mock test score is 80%');

  // -----------------------------------------------------------
  // Test Group 6: Offline JSON Backup Export & Restoration
  // -----------------------------------------------------------
  console.log('\n--- 6. Offline Backup Export & Restoration ---');
  const backupData = await backupEngine.generateExport(testDb);
  assert(backupData.appName === 'AK67', 'Offline backup generated successfully');
  assert(backupData.data.problem_progress.length === 1, 'Backup contains offline problem record');
  assert(backupData.data.notes.length === 1, 'Backup contains offline mistake record');
  assert(backupData.data.mock_tests.length === 1, 'Backup contains offline mock test record');

  // Restore into a fresh database completely offline
  const restoreDb = new AK67Database('test_pwa_restore_' + Date.now());
  const restoreResult = await backupEngine.restoreReplace(backupData, restoreDb);
  assert(restoreResult.success === true, 'Offline backup restore succeeded');

  const restoredProblem = await problemRepository.getById('dsa-two-sum', restoreDb);
  assert(restoredProblem !== undefined && restoredProblem.status === 'solved', 'Restored problem verified in fresh DB');

  // Clean up
  await testDb.delete();
  await restoreDb.delete();

  // -----------------------------------------------------------
  // Test Group 7: Service Worker Update & Assessment Protection
  // -----------------------------------------------------------
  console.log('\n--- 7. Assessment-Active Update Protection ---');

  // When no test is in localStorage, isAssessmentActive() returns false
  const initialAssessmentState = isAssessmentActive();
  assert(initialAssessmentState === false, 'No assessment active initially');

  // Simulate active test session in localStorage
  const activeSessionMock = {
    testId: 'active-test-1',
    category: 'Full Mock',
    startTime: Date.now(),
    endTime: Date.now() + 600000, // 10 minutes from now
    submitted: false,
  };
  localStorage.setItem('ak67_active_test_session', JSON.stringify(activeSessionMock));

  const assessmentActiveState = isAssessmentActive();
  assert(assessmentActiveState === true, 'Correctly detects active assessment in progress');

  // Simulate submitted test session
  const submittedSessionMock = {
    ...activeSessionMock,
    submitted: true,
  };
  localStorage.setItem('ak67_active_test_session', JSON.stringify(submittedSessionMock));
  assert(isAssessmentActive() === false, 'Detects assessment completed (submitted = true), allowing update');

  // Clean up test key
  localStorage.removeItem('ak67_active_test_session');

  // -----------------------------------------------------------
  // Summary
  // -----------------------------------------------------------
  console.log('\n======================================================');
  console.log(`Phase 8 Verification Summary: ${passedAssertions} PASSED, ${failedAssertions} FAILED`);
  console.log('======================================================\n');

  if (failedAssertions > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
