import { useState, useEffect, useCallback } from 'react';
import { RouteId } from '@/types/navigation';

export const useRouter = () => {
  const getRouteFromHash = (): RouteId => {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    const validRoutes: RouteId[] = [
      'dashboard',
      'dsa',
      'cpp',
      'sql',
      'core-cs',
      'aptitude',
      'revision',
      'planner',
      'mock-tests',
      'interview',
      'companies',
      'analytics',
      'notes',
      'settings',
    ];
    if (validRoutes.includes(hash as RouteId)) {
      return hash as RouteId;
    }
    return 'dashboard';
  };

  const [currentRoute, setCurrentRoute] = useState<RouteId>(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((route: RouteId) => {
    window.location.hash = `/${route}`;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { currentRoute, navigate };
};
