# Changelog

All notable changes to the **AK67 — Your Placement Preparation System** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned for Phase 3
- Curated 67 DSA placement problem dataset across 11 high-yield categories.
- DSA Problem Explorer with search, difficulty, status, and bookmark filters.
- Problem Detail View with progressive hints, complexity breakdown, verified C++ solutions, and personal notes.
- Dynamic Dashboard metrics connected to live IndexedDB problem records.

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
