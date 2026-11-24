export type NavSection = 'core' | 'practice' | 'assessment' | 'personal';

export type RouteId =
  | 'dashboard'
  | 'dsa'
  | 'cpp'
  | 'python'
  | 'java'
  | 'sql'
  | 'core-cs'
  | 'aptitude'
  | 'revision'
  | 'planner'
  | 'mock-tests'
  | 'interview'
  | 'companies'
  | 'analytics'
  | 'notes'
  | 'mistakes'
  | 'settings';

export interface NavItem {
  id: RouteId;
  label: string;
  shortLabel?: string;
  section: NavSection;
  iconName: string;
  badge?: string;
  description: string;
}
