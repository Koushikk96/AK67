# Changelog

All notable changes to the **AK67 — Your Placement Preparation System** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned for Phase 5
- Module F: Aptitude & Reasoning (Quantitative, Logical, Verbal with topic formulas and practice sets).
- Module G: Spaced Revision System (SM-2 review queue, retention tracking, due items).
- Module H: Daily Study Planner & Pomodoro (Daily targets, custom tasks, focus timer with IndexedDB study logging).

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
