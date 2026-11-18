import { useState, useEffect } from 'react';

export type NetworkState = 'online' | 'offline' | 'reconnected';

export interface UseNetworkStatusReturn {
  isOnline: boolean;
  isOffline: boolean;
  wasOffline: boolean;
  networkState: NetworkState;
  since: Date | null;
}

export const useNetworkStatus = (): UseNetworkStatusReturn => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [wasOffline, setWasOffline] = useState<boolean>(false);
  const [networkState, setNetworkState] = useState<NetworkState>('online');
  const [since, setSince] = useState<Date | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let reconnectedTimer: ReturnType<typeof setTimeout> | null = null;

    const handleOnline = () => {
      setIsOnline(true);
      setSince(new Date());

      // If previously offline, show brief reconnected state
      setWasOffline(true);
      setNetworkState('reconnected');

      // Clear reconnected pill after 4 seconds
      reconnectedTimer = setTimeout(() => {
        setNetworkState('online');
        setWasOffline(false);
      }, 4000);
    };

    const handleOffline = () => {
      if (reconnectedTimer) clearTimeout(reconnectedTimer);
      setIsOnline(false);
      setWasOffline(false);
      setNetworkState('offline');
      setSince(new Date());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (!navigator.onLine) {
      setNetworkState('offline');
      setSince(new Date());
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (reconnectedTimer) clearTimeout(reconnectedTimer);
    };
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
    wasOffline,
    networkState,
    since,
  };
};
