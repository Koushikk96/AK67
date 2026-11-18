import { useState, useCallback, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { isAssessmentActive } from '@/utils/pwaUtils';

export { isAssessmentActive };

export interface UsePWAUpdateReturn {
  needRefresh: boolean;
  isDeferred: boolean;
  isRegistered: boolean;
  registrationStatus: 'registered' | 'error' | 'pending' | 'unsupported';
  lastUpdated: string | null;
  updateApp: () => Promise<void>;
  dismissUpdate: () => void;
  checkForUpdates: () => Promise<boolean>;
}

export const usePWAUpdate = (): UsePWAUpdateReturn => {
  const [isDeferred, setIsDeferred] = useState<boolean>(false);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<
    'registered' | 'error' | 'pending' | 'unsupported'
  >('pending');
  const [lastUpdated, setLastUpdated] = useState<string | null>(() => {
    try {
      return localStorage.getItem('ak67_pwa_last_updated');
    } catch {
      return null;
    }
  });

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      if (registration) {
        setSwRegistration(registration);
        setRegistrationStatus('registered');
      }
    },
    onRegisterError(error) {
      console.warn('[PWA] Service Worker registration failed:', error);
      setRegistrationStatus('error');
    },
  });

  // Check if assessment is active when needRefresh becomes true
  useEffect(() => {
    if (needRefresh) {
      if (isAssessmentActive()) {
        setIsDeferred(true);
      } else {
        setIsDeferred(false);
      }
    }
  }, [needRefresh]);

  // Periodic check to un-defer if assessment finished
  useEffect(() => {
    if (needRefresh && isDeferred) {
      const interval = setInterval(() => {
        if (!isAssessmentActive()) {
          setIsDeferred(false);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [needRefresh, isDeferred]);

  // Manual update function
  const updateApp = useCallback(async () => {
    try {
      const now = new Date().toISOString();
      localStorage.setItem('ak67_pwa_last_updated', now);
      setLastUpdated(now);
      await updateServiceWorker(true);
    } catch (err) {
      console.error('[PWA] Update execution error:', err);
    }
  }, [updateServiceWorker]);

  // Dismiss / Defer update for this session
  const dismissUpdate = useCallback(() => {
    setNeedRefresh(false);
    setIsDeferred(false);
  }, [setNeedRefresh]);

  // Manual check for updates (called from Settings page)
  const checkForUpdates = useCallback(async (): Promise<boolean> => {
    if (!swRegistration) {
      if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
          setSwRegistration(reg);
          await reg.update();
          return !!reg.waiting;
        }
      }
      return false;
    }

    try {
      await swRegistration.update();
      return !!swRegistration.waiting;
    } catch (err) {
      console.warn('[PWA] Check update error:', err);
      return false;
    }
  }, [swRegistration]);

  return {
    needRefresh,
    isDeferred,
    isRegistered: registrationStatus === 'registered',
    registrationStatus,
    lastUpdated,
    updateApp,
    dismissUpdate,
    checkForUpdates,
  };
};
