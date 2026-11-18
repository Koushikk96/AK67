# AK67 — Master Project Plan & Roadmap

This document outlines the architectural roadmap, phase breakdown, verification gates, and quality assurance criteria for **AK67 — Your Placement Preparation System**.

---

## 📌 Guiding Principles

1. **Zero Operating Cost Target**: The architecture strictly targets zero recurring costs ($0/₹0). No paid backend services, no subscription databases (Supabase, Firebase), no paid hosting. Hosted via Cloudflare Pages.
2. **Absolute Client-Side Privacy**: No user accounts, passwords, or authentication. Each user's study metrics, notes, and revision queues reside inside their browser's **IndexedDB** using Dexie.js.
3. **Data Safety First**: Progress must survive page refreshes, browser restarts, and application updates. Progress is easily exported/imported via validated JSON backups with conflict resolution (Merge vs Replace).
4. **Offline First (PWA)**: Installable on Android and desktop with full offline access to cached learning materials and local progress tracking.
5. **Session Continuity**: Every development session strictly inspects `README.md`, `PROJECT_PLAN.md`, `PROGRESS.md`, and the workspace before writing code.

---

## 🗺️ Phase Breakdown

### Phase 0: Architecture & Foundation Design *(Current Phase)*
- [x] Inspect workspace and initialize Git repository (`main` branch).
- [x] Establish comprehensive documentation suite (`README.md`, `PROJECT_PLAN.md`, `FEATURES.md`, `DATABASE_SCHEMA.md`, `DESIGN_SYSTEM.md`, `BACKUP_AND_RECOVERY.md`, `PROGRESS.md`, `CHANGELOG.md`).
- [x] Configure `.gitignore` and `.env.example`.
- [x] Design IndexedDB schema with Dexie.js (versioning, tables, indexes, type definitions).
- [x] Define Data Backup & Restoration strategy (JSON schema, validation, diff/merge/replace algorithms).
- [x] Define exact dependency tree (Vite, React, TypeScript, Tailwind CSS, Lucide React, Dexie, etc.).
- [x] Prepare Phase 1 execution plan.

### Phase 1: Application Skeleton, Tooling & Design System
- Setup Vite + React + TypeScript configuration.
- Install and configure Tailwind CSS and utility primitives (`clsx`, `tailwind-merge`, `lucide-react`).
- Set up path aliases (`@/*` pointing to `src/*`).
- Create Design System primitives:
  - Dark/Charcoal theme tokens and Light theme fallback.
  - Typography, surfaces, borders, buttons, cards, badges, inputs, dialogs, drawers.
- Build responsive App Shell:
  - Desktop collapsible sidebar with branding and section navigation.
  - Mobile bottom navigation bar with active indicators and haptic-friendly targets.
  - Main header with quick statistics overview, backup reminder icon, and theme toggle.
- Establish client-side router (Hash-based or HTML5 History with Cloudflare SPA fallback) for all 13 modules.

### Phase 2: Local Data Layer & Persistent Storage Architecture
- Install and initialize Dexie.js database (`AK67Database`).
- Implement robust database migration handlers to guarantee user data survives future schema updates.
- Create type-safe CRUD operations for:
  - `problem_progress`
  - `topic_progress`
  - `daily_planner`
  - `mock_tests`
  - `company_profiles`
  - `notes`
  - `study_sessions`
  - `app_settings`
- Build **Backup & Recovery Center**:
  - Full JSON export generator with timestamp, app metadata, and checksum.
  - File uploader with JSON schema validation.
  - Dry-run diff engine showing records to create, update, or overwrite.
  - Dual restoration mode: **Merge** (safe non-destructive sync) or **Replace** (clean overwrite with confirmation).
  - Proactive backup reminder trigger based on study activity.

### Phase 3: Dashboard & Curated 67 DSA Problems Module
- Build real-time **Dashboard**:
  - Live statistics calculated strictly from stored IndexedDB records (no fake progress).
  - Daily targets tracker and today's task checklist.
  - Active study streak counter (calculated from session timestamps).
  - Upcoming spaced revision queue.
  - Weak topics and recent activity list.
- Curate and structure the **67 High-Yield Placement DSA Problems** categorized across:
  1. Arrays
  2. Strings
  3. Hashing
  4. Two Pointers & Sliding Window
  5. Sorting & Binary Search
  6. Recursion & Backtracking
  7. Linked Lists
  8. Stack & Queue
  9. Trees & BST
  10. Dynamic Programming
  11. Basic Graphs
- Build DSA Problem Explorer:
  - Multi-criteria filtering (Topic, Difficulty, Status, Bookmarks).
  - Real-time instant search.
  - Sort by frequency, difficulty, or revision urgency.
- Build Problem Detail View:
  - Clean markdown description and problem pattern tags.
  - External problem links (LeetCode, GFG - verified URLs only).
  - Progressive progressive hints (spoiler-revealable).
  - Time & Space complexity breakdown.
  - Verified C++ reference solutions with syntax highlighting.
  - Personal inline notes editor with auto-save to IndexedDB.
  - Status toggle (`Not Started`, `Attempted`, `Solved`, `Revise`).
  - Revision scheduler trigger.

### Phase 4: Core Technical Modules (C++, SQL & Core CS)
- **C++ Module**:
  - Interactive structured reference: Fundamentals, Pointers & References, Memory Management, STL Containers & Algorithms, OOP Concepts (Inheritance, Polymorphism, Virtual Functions), Modern C++ (C++11/14/17).
  - High-frequency interview Q&A with conceptual explanations and pitfalls.
  - Topic completion checkboxes and personal concept notes.
- **SQL Module**:
  - Comprehensive query guide: `SELECT`, `WHERE`, `ORDER BY`, `GROUP BY`, `HAVING`, Joins (`INNER`, `LEFT`, `RIGHT`, `FULL`), Subqueries, CTEs, Window Functions (`ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LEAD`, `LAG`).
  - Database Normalization (1NF, 2NF, 3NF, BCNF) and ACID constraints.
  - Practice query problems with schema descriptions, sample queries, and expected outputs.
- **Core CS Module**:
  - DBMS: Transactions, Indexing (B-Trees, Hash), Concurrency Control, NoSQL vs SQL.
  - Operating Systems: Process vs Thread, Scheduling, Memory Management, Paging, Virtual Memory, Deadlocks, Synchronization primitives (Mutex, Semaphores).
  - Computer Networks: OSI & TCP/IP layers, HTTP/HTTPS, DNS, TCP handshake, Subnetting, WebSockets.
  - Software Engineering: SDLC, Agile/Scrum, Git fundamentals, Design Principles (SOLID), REST APIs.
  - Read-status tracking and revision flashcard mode.

### Phase 5: Aptitude, Revision System & Daily Planner
- **Aptitude Preparation**:
  - Question banks for: Quantitative Aptitude, Logical Reasoning, Verbal Ability, Data Interpretation.
  - Practice mode with step-by-step formula derivations and time-saving shortcuts.
  - Timed practice mode with accuracy calculation.
- **Spaced Revision System**:
  - Spaced repetition algorithm (1-day, 3-day, 7-day, 21-day, 60-day intervals).
  - Dedicated "Due Today" and "Overdue" revision queues.
  - One-click revision completion with confidence rating (`Easy`, `Medium`, `Hard`) adjusting future intervals.
  - Revision history timeline.
- **Daily Planner & Study Sessions**:
  - Customizable daily study targets (e.g. 3 DSA problems + 1 Core CS topic).
  - Custom task creator with deadline tags.
  - Integrated Pomodoro study timer with focus session logging directly to IndexedDB.
  - Preparation countdown timer (e.g. Days remaining until Placement Season).

### Phase 6: Mock Tests & Interview Preparation
- **Mock Assessment Simulator**:
  - Full-length and topic-wise mock tests (Mix of Aptitude, Core CS, DSA MCQs, SQL queries).
  - Real exam timer with question navigation palette (Answered, Marked for Review, Unvisited).
  - Instant scoring, percentage accuracy, time-spent analysis, and answer review with explanations.
  - Mock test history table persisted in IndexedDB.
- **Interview Preparation Hub**:
  - Technical interview questions and answering frameworks (STAR method).
  - HR & Behavioral questions with sample strong responses and guidance.
  - Project presentation guide: How to explain resume projects, architecture trade-offs, and challenges.
  - Resume review checklist and common red flags.
  - Personal interview notes workspace.
- **Company Preparation Tracker**:
  - Company directory (TCS, Infosys, Cognizant, Wipro, Capgemini, Amazon, Cisco, Startup hiring, etc.).
  - Eligibility criteria, exam patterns, round breakdowns.
  - Personal application status tracker (`Wishlist`, `Applied`, `OA Cleared`, `Interviewing`, `Offered`, `Rejected`).
  - Company-specific preparation checklists.

### Phase 7: Analytics, Notes & Mistake Repository
- **Deep Analytics Engine**:
  - Overall placement readiness score calculated from actual progress across all modules.
  - Topic-wise completion radars / progress bars.
  - Solved problem difficulty distribution (Easy / Medium / Hard).
  - Revision compliance rate and overdue backlog.
  - Study consistency heatmap / calendar.
  - Automatically identified weak areas (topics with lowest mock accuracy or highest revision delays).
- **Notes & Bookmarks**:
  - Global rich notes organizer with tag-based filtering.
  - Dedicated "Mistake Log" to document algorithmic errors, conceptual misunderstandings, and exam traps.
  - Instant search across all personal notes, bookmarks, and logs.

### Phase 8: Progressive Web App (PWA) & Offline Excellence *(Completed)*
- Configured `vite-plugin-pwa` with Workbox caching strategies:
  - Cache-first strategy for static application assets (HTML, CSS, JS, fonts).
  - Stale-while-revalidate for runtime chunks and scripts.
  - Cache-first for images and brand icons.
  - SPA navigation fallback to `/index.html`.
  - Automated cache cleanup (`cleanupOutdatedCaches: true`).
- Generated high-resolution icons (192x192, 512x512, maskable 512x512, apple-touch-icon 180x180, favicon 64x64) and web manifest:
  - App Name: `AK67 — Your Placement Preparation System`.
  - Short Name: `AK67`.
  - Display: `standalone`.
  - Theme color: `#09090b` (Dark charcoal).
  - Background color: `#09090b`.
  - Orientation: `portrait`.
- Implemented safe service worker lifecycle handling (`registerType: 'prompt'`) with user-facing update toast.
- Built active assessment protection: automatically defers update notifications during timed mock tests.
- Built network status bar (`useNetworkStatus`) and install promotion banner/header button (`usePWAInstall`).
- Added PWA & Offline management panel in Settings (`src/pages/Settings/SettingsPage.tsx`).
- Created automated PWA & Offline verification suite (`tests/pwaAndOffline.test.ts`) passing 61/61 assertions.

### Phase 9: Quality Assurance, Verification & Deployment
- Comprehensive end-to-end verification across desktop and mobile screen widths.
- Data persistence verification:
  - Browser hard refresh (`Ctrl + F5`).
  - Browser restart.
  - Simulated app version upgrade.
  - Full JSON backup export and re-import verification on a fresh profile.
- Performance & accessibility audit via Lighthouse (Target: 95+ on Performance, Accessibility, Best Practices, PWA).
- Cloudflare Pages build and deployment setup (`npm run build` -> `dist`).
- Validation of SPA routing rewrite rules (`_routes.json` or `_redirects`).
- Public URL verification.

---

## 🛡️ Quality Verification Gates

| Gate | Requirement | Check Method |
| :--- | :--- | :--- |
| **G1: Zero Auth / Zero Cost** | No login screens, no auth tokens, no external paid APIs, no Supabase code | Codebase inspection & bundle review |
| **G2: True Local Persistence** | All personal actions persist across page reload and browser restart | IndexedDB inspection in Chrome DevTools |
| **G3: Backup Integrity** | Exported JSON can be cleanly restored on an empty browser profile without loss | Export/Import test cycle with schema check |
| **G4: Real Metrics Only** | Every percentage, streak, or count on Dashboard/Analytics is derived from actual DB data | Code verification & zero mock-data fallbacks |
| **G5: Mobile Responsiveness** | Flawless rendering on mobile viewports (360px - 430px) with bottom navigation | DevTools mobile emulation |
| **G6: Offline Capability** | Complete study flow operates in DevTools "Offline" network mode | Network throttling / Offline toggle test |
| **G7: Error Free Console** | Zero React warnings, zero unhandled promise rejections, zero CSS overflow issues | Browser console monitoring |
