/**
 * PWA Utility Functions
 * Helper logic for assessment status, standalone detection, and offline fallbacks.
 */

export const ACTIVE_MOCK_STORAGE_KEY = 'ak67_active_test_session';
export const ACTIVE_CODING_STORAGE_KEY = 'ak67_active_coding_sprint';

let inMemoryAssessmentActive = false;

export const setAssessmentActiveInMemory = (active: boolean) => {
  inMemoryAssessmentActive = active;
};

/**
 * Checks whether an active timed assessment (Mock Test or Coding Sprint) is currently in progress.
 * Used to defer PWA service worker updates so users are never interrupted during exams.
 * If assessment state cannot be verified reliably due to storage errors, defers updates safely.
 */
export const isAssessmentActive = (): boolean => {
  if (inMemoryAssessmentActive) return true;

  try {
    if (typeof localStorage === 'undefined') return false;

    // 1. Check Mock Test Session
    const rawMock = localStorage.getItem(ACTIVE_MOCK_STORAGE_KEY);
    if (rawMock) {
      const parsed = JSON.parse(rawMock);
      if (parsed && !parsed.submitted && parsed.endTime && Date.now() < parsed.endTime) {
        return true;
      }
    }

    // 2. Check Coding Sprint Session
    const rawCoding = localStorage.getItem(ACTIVE_CODING_STORAGE_KEY);
    if (rawCoding) {
      const parsed = JSON.parse(rawCoding);
      if (parsed && parsed.status === 'solving' && parsed.endTime && Date.now() < parsed.endTime) {
        return true;
      }
    }
  } catch {
    // Defer updates safely if storage check throws an error
    return true;
  }
  return false;
};

/**
 * Detects whether the web app is running in standalone PWA display mode.
 */
export const isStandaloneMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
    document.referrer.includes('android-app://')
  );
};
