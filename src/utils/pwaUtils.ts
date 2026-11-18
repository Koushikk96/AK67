/**
 * PWA Utility Functions
 * Helper logic for assessment status, standalone detection, and offline fallbacks.
 */

/**
 * Checks whether an active timed assessment (Mock Test or Coding Sprint) is currently in progress.
 * Used to defer PWA service worker updates so users are never interrupted during exams.
 */
export const isAssessmentActive = (): boolean => {
  try {
    if (typeof localStorage === 'undefined') return false;

    // Check Mock Test Session
    const rawMock = localStorage.getItem('ak67_active_test_session');
    if (rawMock) {
      const parsed = JSON.parse(rawMock);
      if (parsed && !parsed.submitted && parsed.endTime && Date.now() < parsed.endTime) {
        return true;
      }
    }
  } catch {
    // Return false on storage or parse errors
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
