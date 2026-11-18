import { RouteId, NavItem } from '@/types/navigation';

export const NAVIGATION_ITEMS: NavItem[] = [
  // Core Section
  {
    id: 'dashboard',
    label: 'Dashboard',
    shortLabel: 'Home',
    section: 'core',
    iconName: 'LayoutDashboard',
    description: "Today's preparation command center and study streak",
  },
  {
    id: 'planner',
    label: 'Daily Planner',
    shortLabel: 'Planner',
    section: 'core',
    iconName: 'CalendarCheck',
    description: 'Daily study targets, custom tasks and Pomodoro timer',
  },
  {
    id: 'revision',
    label: 'Spaced Revision',
    shortLabel: 'Revision',
    section: 'core',
    iconName: 'RotateCcw',
    badge: 'Due',
    description: 'Interval-based spaced repetition to defeat forgetting curve',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    shortLabel: 'Metrics',
    section: 'core',
    iconName: 'BarChart3',
    description: 'True placement readiness, consistency and weak topics',
  },

  // Practice Section
  {
    id: 'dsa',
    label: '67 DSA Sheet',
    shortLabel: 'DSA',
    section: 'practice',
    iconName: 'Code2',
    badge: '67',
    description: 'High-yield curated placement DSA problems with verified C++ solutions',
  },
  {
    id: 'cpp',
    label: 'C++ Mastery',
    shortLabel: 'C++',
    section: 'practice',
    iconName: 'FileCode2',
    description: 'Memory layout, pointers, OOP mechanics, STL and interview QA',
  },
  {
    id: 'sql',
    label: 'SQL Arena',
    shortLabel: 'SQL',
    section: 'practice',
    iconName: 'Database',
    description: 'Joins, CTEs, window functions, normalization and query practice',
  },
  {
    id: 'core-cs',
    label: 'Core CS',
    shortLabel: 'Core CS',
    section: 'practice',
    iconName: 'Cpu',
    description: 'Operating Systems, DBMS, Computer Networks & Software Engineering',
  },
  {
    id: 'aptitude',
    label: 'Aptitude & Logic',
    shortLabel: 'Aptitude',
    section: 'practice',
    iconName: 'Brain',
    description: 'Quantitative, logical reasoning, verbal and data interpretation',
  },

  // Assessment & Career Section
  {
    id: 'mock-tests',
    label: 'Mock Tests',
    shortLabel: 'Mocks',
    section: 'assessment',
    iconName: 'Timer',
    description: 'Timed full-length placement assessments and scoring engine',
  },
  {
    id: 'interview',
    label: 'Interview Hub',
    shortLabel: 'Interview',
    section: 'assessment',
    iconName: 'MessageSquare',
    description: 'STAR framework, HR questions, project defense and tips',
  },
  {
    id: 'companies',
    label: 'Company Drives',
    shortLabel: 'Companies',
    section: 'assessment',
    iconName: 'Building2',
    description: 'Company hiring patterns, eligibility and round tracker',
  },

  // Personal Tools Section
  {
    id: 'notes',
    label: 'Personal Notes',
    shortLabel: 'Notes',
    section: 'personal',
    iconName: 'BookOpen',
    description: 'Personal searchable notes, code snippets and bookmarks',
  },
  {
    id: 'mistakes',
    label: 'Mistake Repository',
    shortLabel: 'Mistakes',
    section: 'personal',
    iconName: 'AlertOctagon',
    description: 'Systematic mistake logging, failure causes and lessons learned',
  },
  {
    id: 'settings',
    label: 'Data & Backup',
    shortLabel: 'Backup',
    section: 'personal',
    iconName: 'Settings',
    description: 'JSON progress export, validation, restoration and preferences',
  },
];

export const MOBILE_PRIMARY_NAV: RouteId[] = ['dashboard', 'dsa', 'revision', 'planner'];
