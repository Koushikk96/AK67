import { ProjectPreparationTemplate } from '@/types/interview';

export const defaultProjectTemplate: ProjectPreparationTemplate = {
  title: 'AK67 — Local-First Placement Preparation System',
  problemStatement:
    'Engineering students preparing for campus placements face fragmented resources: coding platforms, interview notes, and theory guides are scattered across paid websites that require signups and subscriptions. Existing web apps fail during spotty campus Wi-Fi connections and monetize user study data.',
  architecture:
    'Client-only Single-Page Application (SPA) built with React and TypeScript, leveraging IndexedDB via Dexie.js for 100% persistent on-device data storage. Decoupled repository architecture ensures UI components never access raw tables directly. Client-side hash routing enables instant zero-latency page transitions without server round-trips.',
  techStack:
    'Frontend: React 18, TypeScript, Tailwind CSS, Lucide React.\nStorage: IndexedDB (Dexie v4), LocalStorage for themes.\nTooling: Vite 6, tsx test runner, Vitest/automated assert suites.\nHosting: Cloudflare Pages / Static Edge CDN.',
  databaseDesign:
    '8 persistent normalized tables: problem_progress, topic_progress, daily_planner, mock_tests, company_profiles, notes, study_sessions, app_settings. Indexed by primary keys, status, dates, and categories for O(1) lookups.',
  implementationDecisions:
    '1. Chosen local IndexedDB over cloud database (Supabase/Firebase) to eliminate operational hosting costs, maintain 100% student privacy, and enable complete offline usage.\n2. Built custom JSON backup with dry-run diff engine allowing users to merge progress across devices without data loss.\n3. Used calendar-safe date math for the SM-2 Spaced Revision system to prevent daylight saving and month boundary glitches.',
  challengesFaced:
    'Ensuring the spaced revision queue and mock test countdown timer remained completely reliable across browser page reloads and backgrounded tabs. Solved by calculating remaining duration from persistent epoch start timestamps rather than relying solely on JavaScript intervals.',
  securityConsiderations:
    'Zero backend attack surface; no passwords, cookies, or JWTs stored that could be leaked via XSS. Strict JSON schema validation on backup import prevents injection of malicious payload structures.',
  futureImprovements:
    '1. WebAssembly-powered offline C++ compilation sandbox.\n2. Progressive Web App (PWA) service worker caching for offline asset delivery.\n3. Advanced analytics visualizing retention curves over 6-month preparation timelines.',
  interviewerQuestions: [
    'Why did you choose IndexedDB instead of LocalStorage or SQLite (Wasm)?',
    'How do you handle schema version migrations when the app is updated?',
    'What happens if two browser tabs write to the IndexedDB database concurrently?',
    'How would you scale this architecture if a university asked to synchronize progress to a central LMS server?',
    'What was the single hardest bug you had to diagnose and how did you resolve it?',
    'How did you ensure that large question banks do not bloat bundle size and initial page load times?',
    'Explain the algorithmic trade-offs between Merge restoration and Replace restoration in your backup engine.',
    'How does your timer handle a user who changes their system clock during a test?',
    'If you had to rewrite this project today from scratch, what would you do differently?',
    'How did you verify data persistence and revision algorithms using automated tests?',
  ],
};

export const projectDefenseFrameworkSteps = [
  {
    step: '1. The 30-Second Elevator Pitch',
    guidance:
      'State what the project is, who it is for, and the core problem it solves in 2 clear sentences. Avoid buzzwords.',
  },
  {
    step: '2. Architecture & Tech Stack Rationale',
    guidance:
      'Never say "I used React because I knew it." Explain the architectural reason (e.g. component reusability, strict typing, responsive design).',
  },
  {
    step: '3. Data Flow & Database Schema',
    guidance:
      'Be prepared to draw your schema tables, foreign keys, and indexes on a whiteboard or virtual canvas.',
  },
  {
    step: '4. Deepest Technical Challenge (STAR)',
    guidance:
      'Pick a bug or performance bottleneck that took real thought to diagnose, and explain how you measured its resolution.',
  },
  {
    step: '5. Trade-offs & What You Would Do Differently',
    guidance:
      'Every real engineering project involves trade-offs. Acknowledging trade-offs demonstrates senior engineering maturity.',
  },
];
