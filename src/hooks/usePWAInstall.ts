import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export type PWAUserPlatform = 'android' | 'ios' | 'desktop' | 'other';

export interface UsePWAInstallReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  isDismissed: boolean;
  platform: PWAUserPlatform;
  promptInstall: () => Promise<boolean>;
  dismissBanner: () => void;
  resetDismissal: () => void;
}

const DISMISS_KEY = 'ak67_pwa_install_dismissed';

export const usePWAInstall = (): UsePWAInstallReturn => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [platform, setPlatform] = useState<PWAUserPlatform>('desktop');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Detect standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');

    setIsInstalled(isStandalone);

    // 2. Detect platform
    const ua = navigator.userAgent.toLowerCase();
    if (/android/i.test(ua)) {
      setPlatform('android');
    } else if (/iphone|ipad|ipod/i.test(ua)) {
      setPlatform('ios');
    } else if (/windows|macintosh|linux/i.test(ua) && !/mobile/i.test(ua)) {
      setPlatform('desktop');
    } else {
      setPlatform('other');
    }

    // 3. Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsInstalled(e.matches);
    };
    mediaQuery.addEventListener('change', handleDisplayModeChange);

    // 4. Capture native beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // 5. Handle app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      try {
        localStorage.removeItem(DISMISS_KEY);
      } catch {
        // ignore
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        return true;
      }
      return false;
    } catch (err) {
      console.warn('[PWA] Install prompt error:', err);
      return false;
    }
  }, [deferredPrompt]);

  const dismissBanner = useCallback(() => {
    setIsDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      // ignore
    }
  }, []);

  const resetDismissal = useCallback(() => {
    setIsDismissed(false);
    try {
      localStorage.removeItem(DISMISS_KEY);
    } catch {
      // ignore
    }
  }, []);

  const isInstallable = !isInstalled && deferredPrompt !== null;

  return {
    isInstallable,
    isInstalled,
    isDismissed,
    platform,
    promptInstall,
    dismissBanner,
    resetDismissal,
  };
};
