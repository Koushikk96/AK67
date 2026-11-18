# AK67 — Your Placement Preparation System

> **A polished, functional, zero-cost personal placement preparation web application designed for students preparing for fresher software engineering jobs.**

---

## 🎯 Project Overview

**AK67** is a structured, zero-cost placement preparation platform built specifically for students preparing for campus placements, off-campus drives, and fresher software engineering roles. It unifies DSA practice, C++ language depth, SQL querying, Core Computer Science fundamentals, aptitude training, spaced revision, mock assessments, and company interview tracking into a single cohesive system.

### 🌟 Core Philosophy & Absolute Constraints
1. **Zero Operating Cost (₹0 forever)**: No paid APIs, no subscriptions, no cloud databases, and no monthly hosting bills.
2. **Zero Login & Frictionless Access**: No registration, no passwords, no email collection, no user accounts, no admin barriers. Open the URL and begin immediately.
3. **Client-Side Privacy & Independence**: Each person's preparation data (problem solutions, notes, bookmarks, revision intervals, mock test scores) is stored locally on their own device using **IndexedDB (via Dexie.js)**.
4. **Offline-First PWA**: Installable on Android and desktop via modern Web App Manifest and Service Worker caching. Preparation continues without an active internet connection.
5. **Separation of Content & Progress**: Shared learning content (curated 67 DSA problems, Core CS notes, SQL guides) is static and immutable, while personal study progress is tracked independently on each user's device.
6. **Robust Data Portability**: Comprehensive JSON Export, Schema Validation, Preview Diff, and Safe Restoration (Merge or Replace) to ensure zero data loss.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19 / 18](https://react.dev/) + [Vite](https://vitejs.dev/) | High-performance, reactive UI and blazing-fast bundling |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe models, database contracts, and static analysis |
| **Styling & System** | [Tailwind CSS v4 / v3](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | Premium dark/neutral design system, accessible UI primitives |
| **Local Storage** | [Dexie.js](https://dexie.org/) (IndexedDB wrapper) | Persistent, transactional, ACID-compliant in-browser storage |
| **Icons & Visuals** | [Lucide React](https://lucide.dev/) | Clean, consistent, lightweight iconography |
| **Offline & PWA** | [Vite PWA Plugin](https://vite-pwa-org.netlify.app/) | Service worker lifecycle, asset pre-caching, web manifest |
| **Hosting & CDN** | [Cloudflare Pages](https://pages.cloudflare.com/) | Unlimited bandwidth, global edge distribution at ₹0 cost |
| **Version Control** | [Git](https://git-scm.com/) & GitHub | Milestone-driven revision management |

---

## 📦 Architecture & Folder Structure

```
AK67/
├── .github/                      # CI/CD workflows (Cloudflare Pages deploy)
├── docs/                         # Extended architectural documentation
├── public/                       # Static public assets (favicons, manifests, icons)
│   ├── icons/                    # PWA icons (192x192, 512x512, maskable)
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/                   # Bundled static assets
│   ├── components/               # Reusable UI components
│   │   ├── common/               # Header, Footer, Breadcrumbs, Empty States
│   │   ├── layout/               # AppShell, DesktopSidebar, MobileBottomNav
│   │   ├── ui/                   # shadcn/ui primitives (Button, Dialog, Badge, Card, etc.)
│   │   └── data/                 # Data displays, filters, search bars, stat counters
│   ├── content/                  # Immutable Curated Learning Content
│   │   ├── dsa/                  # 67 Curated DSA Problems (organized by 11 categories)
│   │   ├── cpp/                  # C++ Fundamentals, STL, OOP, Interview QA
│   │   ├── sql/                  # SQL syntax, queries, clauses, normalization
│   │   ├── core-cs/              # OS, DBMS, Computer Networks, Software Engineering
│   │   ├── aptitude/             # Quantitative, Logical, Verbal, DI question sets
│   │   └── interview/            # HR questions, technical discussion, project templates
│   ├── db/                       # IndexedDB layer (Dexie.js)
│   │   ├── schema.ts             # Database versioning, table schemas, indexes
│   │   ├── index.ts              # Dexie DB instance export
│   │   └── operations/           # Type-safe CRUD operations for progress, notes, reviews
│   ├── hooks/                    # Custom React hooks
│   │   ├── useProblems.ts        # Problem progress hooks
│   │   ├── useRevision.ts        # Spaced repetition scheduler hooks
│   │   ├── useAnalytics.ts       # Performance metrics calculator
│   │   ├── useBackup.ts          # Export, import, and backup reminder hooks
│   │   └── useTheme.ts           # Dark/light mode switcher
│   ├── pages/                    # Core Application Views
│   │   ├── Dashboard/            # Daily targets, streak, upcoming revisions, stats
│   │   ├── DSA/                  # 67-Problem sheet, detail views, code, hints
│   │   ├── CPP/                  # C++ guide and interactive reference
│   │   ├── SQL/                  # SQL practice & cheat sheets
│   │   ├── CoreCS/               # OS, DBMS, Networks, SE theory & flashcards
│   │   ├── Aptitude/             # Practice modules & timed quizzes
│   │   ├── Revision/             # Due-today, overdue, spaced intervals
│   │   ├── Planner/              # Daily targets, study sessions, Pomodoro
│   │   ├── MockTests/            # Timed placement test simulator & review
│   │   ├── Interviews/           # HR, tech, behavioral, resume prep
│   │   ├── Companies/            # Company rounds, checklists, tracking
│   │   ├── Analytics/            # Deep-dive completion charts & weak areas
│   │   ├── Notes/                # Personal notes, bookmarks, mistake repository
│   │   └── Settings/             # Data export/import, backup health, reset safety
│   ├── services/                 # Business logic & utilities
│   │   ├── backupService.ts      # JSON serializer, schema validator, merge engine
│   │   ├── revisionEngine.ts     # Spaced repetition calculation (interval/SM-2)
│   │   └── streakService.ts      # Active streak & calendar calculator
│   ├── types/                    # TypeScript interfaces & types
│   │   ├── dsa.ts
│   │   ├── database.ts
│   │   ├── backup.ts
│   │   └── modules.ts
│   ├── utils/                    # Helper formatting, dates, string utilities
│   ├── App.tsx                   # Main router and shell
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global Tailwind styles & CSS variables
├── .env.example                  # Environment example
├── .gitignore                    # Standard Git ignore rules
├── BACKUP_AND_RECOVERY.md        # Comprehensive backup & restoration specification
├── CHANGELOG.md                  # Release and change tracking
├── DATABASE_SCHEMA.md            # IndexedDB schema specification
├── DESIGN_SYSTEM.md              # UI/UX theme and component specifications
├── FEATURES.md                   # Complete module breakdown
├── PROJECT_PLAN.md               # Master phase-by-phase implementation plan
├── PROGRESS.md                   # Real-time development progress tracker
├── package.json                  # Dependencies and build scripts
├── tsconfig.json                 # TypeScript strict compiler options
└── vite.config.ts                # Vite build and PWA configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher (v24 LTS recommended)
- `npm` or `pnpm`

### Local Setup
```bash
# Clone the repository
git clone https://github.com/<your-username>/AK67.git
cd AK67

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
# Build optimized static bundle with PWA service worker
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Data Safety & Persistence

- **Local-First**: All data is stored in browser-managed IndexedDB. It will not disappear on page refresh or browser restart.
- **Backup Reminder**: AK67 monitors your study volume and prompts you to download a timestamped `.json` backup file.
- **Restoration Validation**: Every uploaded backup undergoes schema verification, version checking, and presents a dry-run diff (showing items to add, modify, or merge) before committing to IndexedDB.
- **Zero Cloud Leak**: None of your notes, code attempts, or mock test results are sent to an external server.

---

## 📋 Session Continuity Protocol for Agents

Whenever resuming work on this codebase in a new session:
1. Read `README.md`.
2. Read `PROJECT_PLAN.md`.
3. Read `PROGRESS.md`.
4. Inspect the existing workspace using file tools and git commands.
5. Identify completed work vs remaining tasks.
6. Continue cleanly from the existing implementation without breaking or resetting existing state.

---

## 📄 License
Non-commercial personal project created for students preparing for software engineering placements.
All rights reserved.
