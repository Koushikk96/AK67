# Changelog

All notable changes to the **AK67 — Your Placement Preparation System** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned for Phase 2
- Dexie.js IndexedDB database layer initialization.
- Type-safe CRUD operations for all 8 storage tables.
- JSON Export and safe validation/import engine (diff preview, merge vs. replace).
- Backup reminder tracking based on activity.

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
