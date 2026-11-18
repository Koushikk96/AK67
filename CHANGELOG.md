# Changelog

All notable changes to the **AK67 — Your Placement Preparation System** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned for Phase 9
- Comprehensive end-to-end quality assurance and responsiveness audit.
- Data persistence verification across refresh, browser restart, and profile switches.
- Performance & accessibility audit via Lighthouse.
- Cloudflare Pages build and deployment setup (`_routes.json` / `_redirects`).

---

## [0.9.0] - 2026-11-18

### Added (Phase 8: Progressive Web App & Offline Excellence)
- **PWA Infrastructure & Web App Manifest (`vite.config.ts`, `index.html`)**:
  - Integrated `vite-plugin-pwa@^2.0.0` and `workbox-window@^7.4.1` with Vite 6.
  - Configured Web App Manifest: name "AK67 — Your Placement Preparation System", short_name "AK67", theme_color `#09090b`, background_color `#09090b`, standalone display, portrait orientation, start_url `/`, and categories `['education', 'productivity']`.
  - Added HTML meta tags for mobile web app capability and apple-touch-icon.
- **Brand PNG Icons System (`public/`)**:
  - Generated full suite of PWA icon assets: `pwa-192x192.png`, `pwa-512x512.png`, `maskable-icon-512x512.png`, `apple-touch-icon.png`, `apple-touch-icon-180x180.png`, and `favicon-64x64.png`.
- **Workbox Service Worker Caching Strategies (`vite.config.ts`)**:
  - Precaching rules for HTML, CSS, JS, fonts, and icons with automated cache cleanup (`cleanupOutdatedCaches: true`).
  - Stale-while-revalidate caching strategy for scripts and stylesheets.
  - Cache-first caching strategy for images and icons.
  - Navigation route fallback for single-page client routing.
- **PWA Lifecycle Hooks & Utilities (`src/hooks/`, `src/utils/`)**:
  - `src/utils/pwaUtils.ts`: Assessment active detection (`isAssessmentActive()`) and standalone mode detector (`isStandaloneMode()`).
  - `src/hooks/useNetworkStatus.ts`: Real-time reactive network state tracking online, offline, and reconnected indicators.
  - `src/hooks/usePWAInstall.ts`: Captures `beforeinstallprompt`, tracks installability, prompts installation, and detects device platform.
  - `src/hooks/usePWAUpdate.ts`: Safe service worker update registration with `registerType: 'prompt'`, automated assessment deferral protection, and manual update check.
- **PWA User Interface Elements (`src/components/pwa/`, `src/components/layout/`)**:
  - `NetworkStatusBanner`: Top non-intrusive status banner displaying offline warning with IndexedDB safety guarantee and reconnected confirmation.
  - `PWAInstallBanner`: Non-intrusive floating install prompt with 1-click install and dismiss action.
  - `PWAUpdateToast`: Non-blocking prompt for new app version updates with "Update Now" and "Later" options.
  - `Header`: Added live offline indicator dot and quick-install action button.
- **PWA Management Panel in Settings (`src/pages/Settings/SettingsPage.tsx`)**:
  - Displays version `v0.9.0`, network connectivity, Workbox caching status, and display mode.
  - "Check for Updates" trigger with immediate feedback.
  - "Install AK67" button for immediate installation.
  - Step-by-step installation guides for Android (Chrome), Desktop (Chrome/Edge), and iOS (Safari).
- **Automated Verification Test Suite (`tests/pwaAndOffline.test.ts`)**:
  - 61 assertions covering icon assets, manifest schema, service worker configuration, 100% offline curriculum bundling, offline IndexedDB CRUD, offline backup export/restore, and assessment protection.
  - 100% pass rate across all 8 test suites (295 / 295 total assertions passed).
  - Production build (`npm run build`) passing with zero errors.

---

## [0.8.0] - 2026-11-18

### Added (Phase 7: Analytics, Notes & Mistake Repository)
- **Unified Analytics Dashboard (`src/pages/Analytics/AnalyticsPage.tsx`, `src/services/analyticsService.ts`)**:
  - Live data aggregation across all 188 curriculum items (DSA: 67, C++: 17, SQL: 21, Core CS: 47, Aptitude: 36).
  - Readiness overview tab: total curriculum items, completed items, learning items, in-revision items, overall completion percentage, total study hours, mock test count, average mock score, highest mock score, and average mock accuracy.
  - 10-pillar subject performance tab: progress meters, completion percentages, active revision backlogs, and mock accuracy benchmarks.
  - Mock test analytics tab: score progression, category breakdown, difficulty filters, and accuracy distribution.
  - Study activity tab: daily, weekly, monthly study time, consecutive day streak, longest streak, and 30-day activity heatmap.
- **Weak Area Detection Diagnostics (`src/services/analyticsService.ts`)**:
  - Automated diagnostic rules: low mock test accuracy (<60%), overdue revisions (>3 days), and difficult problem patterns.
  - Classification into 5 discrete severities: `needs_improvement`, `moderate`, `strong`, `not_started`, and `insufficient_data`.
  - Detailed diagnostic card for each weak area with diagnostic flag reason, supporting data (e.g. 40% mock accuracy), actionable recommendation, and 1-click navigation to practice or review.
- **Mistake Repository (`src/pages/Mistakes/MistakesPage.tsx`, `src/services/mistakeService.ts`, `src/hooks/useMistakes.ts`)**:
  - Dedicated mistake tracking system: title, subject (10 pillars), related problem/topic, 8 standardized mistake categories (Conceptual misunderstanding, Incorrect formula, Logical error, Syntax error, Edge case missed, Time management, Careless mistake, Misread question), whatWentWrong, correctApproach, personalLesson, difficulty (Easy, Medium, Hard), and reviewStatus (`pending`, `reviewed`, `resolved`).
  - Search, multi-criteria filter dropdowns by subject, mistake category, and review status.
  - Add and Edit mistake modals with pre-filled inputs.
  - 1-click status progression (`pending` -> `reviewed` -> `resolved`).
  - Non-destructive persistence within IndexedDB `notes` table using `isMistakeLog: true`.
- **Personal Notes Manager (`src/pages/Notes/NotesPage.tsx`, `src/hooks/useNotes.ts`)**:
  - Consolidated knowledge hub combining direct notes, DSA problem personal notes, technical topic notes, and company interview notes.
  - Note pinning, tags indexing, category filtering, and instant search across titles, content, and tags.
  - Interactive Markdown preview toggle.
- **Placement Command Dashboard Enhancements (`src/pages/Dashboard/DashboardPage.tsx`)**:
  - Overall Curriculum Readiness gauge (`x / 188` Mastered) added to primary metrics.
  - Secondary metrics row upgraded with Consistency Rhythm (streak, longest streak, weekly study minutes) and Weak Area Diagnostic Radar.
  - Diagnostic Alert Banner dynamically displayed when critical weak areas are identified.
  - Recent Mistakes widget (last 3 entries with status badge) and Recent Notes widget (last 3 entries with tag pills).
  - Quick action buttons added to Command Banner for Analytics, Mistakes, and Notes.
  - Bottom learning roadmap updated with Module L (Analytics) and Module M (Mistakes & Notes Hub).
- **Automated Verification Suite (`tests/analyticsAndNotes.test.ts`)**:
  - 53 assertions covering exact 188 curriculum count, unified analytics calculations, streak and heatmap derivation, weak area diagnostic flags, mistake repository CRUD, notes search/pinning, and JSON backup integrity.
  - 100% pass rate across all 7 test suites (234 / 234 total assertions passed).
  - Production build (`npm run build`) passing with zero errors.

---

## [0.7.0] - 2026-11-18

### Added (Phase 6: Mock Tests & Interview Preparation)
- **Technical MCQ Question Bank (`src/content/mcq/`)**:
  - 102 verified placement multiple-choice questions across 7 technical subjects: C++ (15), OOP (15), DBMS (15), SQL (15), OS (15), Computer Networks (15), Software Engineering (12).
  - Every question includes 4 choices, single valid correct index (0-3), detailed technical derivation/explanation, and difficulty rating.
  - Zero duplicate question IDs across the entire application (282 total MCQs across Aptitude + Technical pools).
- **Assessment Engine & Mock Test Centre (`src/services/mockTestService.ts`, `src/pages/MockTests/MockTestsPage.tsx`, `src/hooks/useMockTests.ts`)**:
  - 4 Predefined standard tests: 15-min quick placement drill, 30-min aptitude test, 30-min core technical test, 60-min full placement mock.
  - Custom test generator modal: custom title, category, question count (10-50), duration (10-60m), difficulty, and negative marking toggle.
  - Active test mode: wall-clock timestamp resilient countdown timer resilient to page reloads/tab blur, question navigation palette with 5 states (not visited, answered, not answered, marked for review, answered & marked), direct question jumping, and clear response.
  - Instant scoring with negative marking (-0.25 per wrong answer, floored at 0), category performance breakdown, and question review modal with filters.
  - Real-time test analytics dashboard: total tests taken, average score %, highest score %, average accuracy %, and recent test history list.
- **Coding Assessment Sprint Simulator (`src/hooks/useCodingAssessment.ts`, `src/pages/MockTests/MockTestsPage.tsx`)**:
  - Timed DSA problem sprints on the 67 curated problems (15m, 30m, 45m).
  - Problem statement, constraints, time/space target complexities, and 3-tier progressive hints.
  - Optimal C++ reference solution toggle.
  - Self-reflection evaluation form: assistance level (`independent`, `hints`, `solution`), actual minutes, and notes persisted to `problem_progress` and `study_sessions`.
- **Interview Preparation Centre (`src/content/interviews/`, `src/pages/Interviews/InterviewsPage.tsx`, `src/hooks/useInterviewPrep.ts`)**:
  - **Technical Interview (90 Questions)**: 10-12 questions each across 8 subjects (C++, OOP, DSA, DBMS, SQL, OS, CN, SE) with concise core answers for quick recall, deep technical explanations, code snippets, and follow-up interviewer questions.
  - **HR & Behavioral Round (10 Questions)**: 10 core placement HR questions with recruiter objective, 3-part answering structure, realistic sample answer, mistakes to avoid, pro tips, and personal answer draft textarea persisted to IndexedDB `notes` (`Interview HR`).
  - **Project Defense & Architecture Blueprint**: 5-step defense guide, 10 frequent project questions, and interactive editable project blueprint form preloaded with AK67 architecture and persisted to IndexedDB `notes` (`Interview Project`).
- **Company Preparation Hub & Pipeline (`src/content/companies/initialCompanies.ts`, `src/pages/Companies/CompaniesPage.tsx`, `src/hooks/useCompanyProfiles.ts`)**:
  - 10 pre-loaded company profiles: TCS, Infosys, Wipro, Accenture, Cognizant, Capgemini, Deloitte, LTIMindtree, Amazon, Microsoft.
  - Pipeline status filters: All, Wishlist, Applied, OA Cleared, Interviewing, Offered, Rejected.
  - Prominent guidance disclaimer on campus recruitment criteria.
  - 4 preparation focus pillars: Aptitude focus, Coding/DSA focus, Technical interview focus, HR focus.
  - Interactive round preparation checklists and editable personal referral notes persisted to IndexedDB `company_profiles`.
  - Add custom target company modal.
- **Dashboard Synchronization (`src/pages/Dashboard/DashboardPage.tsx`)**:
  - Header navigation shortcuts for Mock Tests, Interviews, and Companies.
  - Secondary metrics row: Mock assessment performance (attempt count, average score %, latest score %) and Campus hiring pipeline (total tracked, active drives).
  - Roadmap modules updated: Module I, Module J, Module K activated with live data.
- **Automated Verification Test Suite (`tests/mockTestAndInterview.test.ts`)**:
  - 69 assertions verifying technical MCQs, scoring algorithms, negative marking, timer resilience, interview question banks, company profiles, and IndexedDB persistence.
  - 100% pass rate across all 6 test suites (181 / 181 total assertions).
  - Production build (`npm run build`) passing with zero errors and zero warnings.

---

## [0.6.0] - 2026-11-18

### Added (Phase 5: Aptitude Preparation, Spaced Revision & Daily Planner)
- **Aptitude Preparation Curriculum (`src/content/aptitude/`)**:
  - 36 total topics across 3 core placement aptitude areas:
    - **Quantitative Aptitude (16)**: Percentages, Profit and Loss, SI & CI, Ratio & Proportion, Averages, Time & Work, Pipes & Cisterns, Time Speed & Distance, Problems on Trains, Mixtures & Alligation, Number Systems, HCF & LCM, Permutations & Combinations, Probability, Ages, Data Interpretation.
    - **Logical Reasoning (10)**: Series, Coding-Decoding, Blood Relations, Direction Sense, Seating Arrangements, Syllogisms, Statement & Conclusion, Analogies, Odd One Out, Puzzles.
    - **Verbal Ability (10)**: Reading Comprehension, Sentence Correction, Subject-Verb Agreement, Tenses, Prepositions, Articles, Synonyms & Antonyms, Para Jumbles, Error Spotting, One Word Substitution.
  - Detailed concept theory, key mathematical formulas / grammatical rules, 2 step-by-step solved examples per topic, speed shortcuts, and common mistakes/traps.
  - 180 practice questions (5 per topic) with 4 options, difficulty tags (Easy/Medium/Hard), verified answer keys, and step-by-step solutions.
- **Interactive Aptitude Experience (`src/pages/Aptitude/AptitudePage.tsx`, `src/components/aptitude/AptitudeTopicModal.tsx`)**:
  - Category filtering tabs (All, Quant, Logical, Verbal), search bar, and status filtering.
  - Multi-tab modal: Theory & Formulas, Solved Examples, Interactive Practice Test, and Notes.
  - Live practice test mode with instant option feedback, running score, and mathematical derivation reveal.
  - Reactive persistence via `useAptitudeTopics.ts` to IndexedDB `topic_progress`.
- **Spaced Revision System (`src/services/revisionService.ts`, `src/pages/Revision/RevisionPage.tsx`)**:
  - Unified revision queue spanning all 67 DSA problems, 17 C++ topics, 21 SQL concepts, 47 Core CS topics, and 36 Aptitude topics.
  - Spaced repetition intervals: 1d -> 3d -> 7d -> 14d -> 30d.
  - Calendar-safe date math handling month and year rollovers without daylight saving / timezone shifts.
  - Buckets: Due Today, Overdue, Upcoming Schedule, and Completed Revisions.
  - Actions: Mark Revised Today, Postpone (+1d, +3d, +7d), Remove from Queue, and Early Review.
  - Duplicate-free revision schedule guaranteed.
- **Daily Study Planner & Targets (`src/pages/Planner/PlannerPage.tsx`, `src/hooks/useDailyPlanner.ts`)**:
  - Daily target quota tracking: Focus study minutes, DSA problems, and Aptitude questions with live progress bars.
  - Time-boxed checklist tasks across 10 categories (DSA, C++, SQL, DBMS, OS, Computer Networks, Software Engineering, Aptitude, Revision, Mock Test).
  - Add task modal/form with category, topic, duration, priority, and date.
  - Checkbox toggle for completed tasks and deletion support.
  - Quick focus study time logger (+15m, +30m, +60m) and end-of-day reflection journal.
- **Dashboard Synchronization (`src/pages/Dashboard/DashboardPage.tsx`)**:
  - Today's study action items widget with inline checkbox toggling.
  - Daily preparation targets progress widget.
  - Due revision alert banner linking directly to revision queue.
  - Live Aptitude readiness card (X / 36 Mastered).
  - Preparation roadmap pillars updated to reflect active status.
- **Automated Verification Suites**:
  - `tests/aptitudeCurriculum.test.ts` (16 assertions, 100% passed).
  - `tests/revisionPlanner.test.ts` (34 assertions, 100% passed).
  - All 112 assertions across 5 test suites passing.
  - Production build (`npm run build`) passing with zero errors.

---

## [0.5.0] - 2026-11-18

### Added (Phase 4: Essential C++, SQL & Core CS Preparation)
- **C++ Essentials Curriculum (`src/content/cpp/`)**:
  - 17 high-yield topics: Data types, conditions/loops, functions/recursion, arrays/strings, pointers/references, pass-by-value vs pass-by-reference, OOP principles, constructors/destructors, overloading vs overriding, virtual functions & vtable, stack vs heap, STL containers, STL algorithms, complexity analysis, shallow vs deep copy, exception handling, const and static keywords.
  - Practical runnable C++ code examples, interview questions, candidate traps, and revision notes for each topic.
  - 15 frequently asked C++ interview FAQs covering placement recruiter traps.
- **SQL Essentials & Practical Queries Arena (`src/content/sql/`)**:
  - 21 core topics: DBMS/RDBMS basics, primary/foreign keys, constraints, SELECT/WHERE/DISTINCT, ORDER BY, DML (INSERT, UPDATE, DELETE), aggregate functions, GROUP BY/HAVING, INNER JOIN, LEFT JOIN, RIGHT JOIN, SELF JOIN, subqueries (correlated vs non-correlated), CTEs, window functions (ROW_NUMBER, RANK, DENSE_RANK), NULL handling, DELETE vs TRUNCATE vs DROP, normalization (1NF, 2NF, 3NF), indexing, ACID properties, transactions.
  - 21 practical SQL query interview problems with syntax, schemas, verified solutions, and explanations.
- **Core CS Fundamentals (`src/content/coreCS/`)**:
  - **DBMS (11 topics)**: DBMS vs RDBMS, keys/relationships, ER model, normalization, FDs, joins, indexing, ACID/transactions, concurrency/2PL, deadlocks, SQL execution.
  - **Operating Systems (13 topics)**: Process vs thread, states, CPU scheduling (FCFS, SJF, RR, Priority), context switching, synchronization, mutex vs semaphore, critical section, deadlocks, paging vs segmentation, virtual memory/thrashing, page replacement (FIFO, LRU, Optimal), stack vs heap, multithreading.
  - **Computer Networks (13 topics)**: OSI 7 layers, TCP/IP, TCP vs UDP, 3-way handshake & 4-way teardown, HTTP vs HTTPS, DNS, DHCP, IP vs MAC/ARP, IPv4 vs IPv6, router vs switch, common ports, subnetting/CIDR, congestion control.
  - **Software Engineering (10 topics)**: SDLC, Waterfall vs Agile, Scrum ceremonies, functional vs NFRs, testing levels, black-box vs white-box, unit/integration/system, verification vs validation, Git fundamentals, SOLID principles.
- **Unified UX & Persistence (`src/hooks/useTechnicalTopics.ts`)**:
  - Full IndexedDB `topic_progress` integration for status tracking (`not_started`, `learning`, `completed`, `revise`), bookmarking, and personal notes auto-saved on blur.
  - Study session logging to `study_sessions` upon completing topics.
- **Interactive Pages**:
  - [`CPPPage.tsx`](file:///d:/Projects/AK67/src/pages/CPP/CPPPage.tsx): 17 C++ topics explorer + FAQs accordion.
  - [`SQLPage.tsx`](file:///d:/Projects/AK67/src/pages/SQL/SQLPage.tsx): Dual-tab interface with 21 Core Concepts + 21 Practical Queries inspection modal.
  - [`CoreCSPage.tsx`](file:///d:/Projects/AK67/src/pages/CoreCS/CoreCSPage.tsx): Tabbed multi-subject explorer across DBMS, OS, Computer Networks, and Software Engineering.
  - [`TopicDetailModal.tsx`](file:///d:/Projects/AK67/src/components/technical/TopicDetailModal.tsx): Reusable modal with code copying, candidate traps, interview Qs, revision notes, and auto-saving personal notes.
- **Persistent Dashboard Integration (`src/pages/Dashboard/DashboardPage.tsx`)**:
  - Live technical foundations card displaying real completion across C++ (x/17), SQL (x/21), OS (x/13), DBMS (x/11), CN (x/13), and SE (x/10).
  - Roadmap pillar cards updated to active with live mastery counts.
- **Automated Verification (`tests/technicalCurriculum.test.ts`)**:
  - 14 automated assertions verifying all 85 topics exist, have valid fields, and have 100% globally unique IDs.
  - All 78 assertions across 3 test suites passing.

---

## [0.4.0] - 2026-11-18

### Added (Phase 3: Dashboard & 67-Problem DSA Preparation System)
- **Static Content Library (`src/content/dsa/`)**:
  - Exactly 67 curated DSA problems across 11 high-yield categories (12 Arrays, 8 Strings, 5 Hashing, 6 Two Pointers/Sliding Window, 7 Sorting/Binary Search, 5 Recursion/Backtracking, 5 Linked Lists, 5 Stack/Queue, 6 Trees/BST, 5 Dynamic Programming, 3 Basic Graphs).
  - Clean original conceptual descriptions, input/output test examples, 3-tier progressive hints, Big-O time and space complexity targets, verified C++ reference solutions, edge cases, and recruiter talking points.
- **Curriculum Verification Test Suite (`tests/dsaCurriculum.test.ts`)**:
  - Automated 17-assertion suite guaranteeing: 67 total problems, continuous 1..67 numbering, unique IDs, exact category quotas, balanced C++ code braces, and complete metadata.
- **Reactive State Management (`src/hooks/useDSAProblems.ts`)**:
  - Live synchronization between static content and local IndexedDB `problemRepository`.
  - Computes real-time statistics: total solved, attempted, revise, bookmarked, due revisions, percentage completion, category-wise breakdowns, and difficulty breakdown.
  - Automatic spaced revision scheduling (1, 3, 7, 21, 60 days) on mark-as-solved, with automatic logging to `study_sessions` store.
- **Problem Detail Modal (`src/components/dsa/ProblemDetailModal.tsx`)**:
  - Spoiler-free progressive hints revealed on user demand (Conceptual -> Data Structure -> Edge Cases & Algorithm).
  - Modern C++ reference code with one-click clipboard copy.
  - Complexity analysis cards and edge cases checklist.
  - Auto-saving personal notes textarea with instant feedback and IndexedDB persistence.
- **Interactive DSA Explorer (`src/pages/DSA/DSAPage.tsx`)**:
  - Instant text search across problem titles, patterns, problem numbers, and concepts.
  - 11 category selector pills with live solved/total progress counters.
  - Multi-criteria filter dropdowns for Difficulty and Status.
  - Interactive sorting by problem number, difficulty, or title with order flip.
  - One-click problem solving toggle and bookmarking directly from card view.
- **Data-Driven Dashboard (`src/pages/Dashboard/DashboardPage.tsx`)**:
  - Real-time KPI cards: DSA Solved (`x / 67`), Study Streak (`studySessionRepository.calculateStreak()`), Due Revisions count, and Device Storage count.
  - Curriculum progress cards with horizontal bars for all 11 DSA categories.
  - Difficulty distribution metrics (Easy, Medium, Hard).
  - Daily planner progress tracker (problems solved vs target and study minutes).
  - Recent problem activity stream with relative timestamps and quick inspection modal.
  - Spaced revision due alert banner with 1-click navigation.
  - Quick action links to all preparation modules.

---

## [0.3.0] - 2026-11-18

### Added (Phase 2: Local Data Layer & Backup Architecture)
- Integrated Dexie.js (`^4.4.7`) and `dexie-react-hooks` (`^4.4.0`) for IndexedDB storage.
- Implemented `AK67Database` class with all 8 planned tables: `problem_progress`, `topic_progress`, `daily_planner`, `mock_tests`, `company_profiles`, `notes`, `study_sessions`, and `app_settings`.
- Built type-safe data access layer with 8 dedicated repository singletons in `src/db/repositories/`.
- Created JSON Backup & Recovery Engine:
  - `backupValidator`: Strict syntax, version, and signature verification.
  - `backupDiff`: Dry-run diff engine showing records to merge or replace.
  - `backupEngine`: Deterministic 1-click JSON export, non-destructive `restoreMerge`, and transactional `restoreReplace` with snapshot rollback.
- Built interactive Backup Center in Settings:
  - `StorageOverviewCard`: Real live counts of stored records across tables.
  - `BackupPreviewModal`: Interactive review dialog with table breakdown and strategy selection.
  - `BackupReminderBanner`: Dismissible, non-blocking reminder banner on Dashboard and AppShell when backup is due.
- Added automated test suite `tests/databasePersistence.test.ts` with 47 passed assertions covering empty initialization, CRUD isolation, database reload persistence, transaction rollback, input validation, export, diffing, merge, and replace.

---

## [0.2.0] - 2026-11-18

### Added (Phase 1: Application Skeleton, Tooling & Design System)
- Initialized modern build pipeline with React 18.3.1, Vite 6.1.0, and strict TypeScript 5.7.3.
- Configured Tailwind CSS with custom charcoal tokens, zinc borders, and dark/light mode palette matching `DESIGN_SYSTEM.md`.
- Implemented `useTheme` hook with immediate `localStorage` fallback and document element class synchronization.
- Created accessible shadcn/ui style components: `Button`, `Badge`, `Card`, and dynamic `NavIcon`.
- Built responsive App Shell:
  - Sticky header with placement target pill, active streak pill, backup reminder, and theme toggle.
  - Desktop collapsible sidebar with categorized section hierarchy and storage health status.
  - Mobile bottom navigation with 4 primary targets and slide-up drawer for secondary modules.
- Created zero-dependency hash router (`useRouter`) with history synchronization.
- Created clean placeholder views for all 13 application modules and settings.
- Verified TypeScript compilation and production build (`npm run build`) passing with zero errors.

---

## [0.1.0] - 2026-11-18

### Added (Phase 0: Foundation)
- Initialized Git repository on `main` branch.
- Created `README.md` documenting zero-cost architecture, zero-auth, and client-side persistence principles.
- Created `PROJECT_PLAN.md` detailing the 10-phase roadmap, quality assurance gates, and verification criteria.
- Created `FEATURES.md` defining deep specifications for all 13 application modules.
- Created `DATABASE_SCHEMA.md` specifying the Dexie.js IndexedDB schema, TypeScript data models, and migration strategy.
- Created `DESIGN_SYSTEM.md` defining dark/charcoal design tokens, typography, layout rules, and mobile ergonomics.
- Created `BACKUP_AND_RECOVERY.md` detailing the JSON backup specification, validation pipeline, and merge/replace restoration flows.
- Created `PROGRESS.md` tracking real-time status and phase completion.
- Created `.gitignore` and `.env.example`.
