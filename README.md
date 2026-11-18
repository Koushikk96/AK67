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

## 🔒 Data Safety, Storage & Known Limitations

### Where Data Is Stored
All personal learning progress—including problem statuses, custom notes, bookmarks, revision intervals, daily planner tasks, mock test history, mistake entries, and study sessions—is stored strictly in your browser's local **IndexedDB** (`AK67_Database`).

### ⚠️ Critical Data Limitations Every User Must Know
> [!IMPORTANT]
> - **No Cloud Synchronization**: AK67 has ₹0 server cost and zero backend. There is NO automatic background cloud synchronization across your phone and laptop.
> - **Independent Device Progress**: Progress made on your laptop browser stays on your laptop; progress on your mobile phone stays on your mobile phone.
> - **PWA Installation Does Not Sync**: Installing AK67 as a PWA to your home screen or desktop creates an installable app shell, but it still utilizes the local browser profile's storage on that device.
> - **Browser Cache Clearing Warning**: Manually selecting "Clear Browsing Data" or "Clear Site Data and Cookies" in Chrome/Firefox/Edge will wipe your local IndexedDB storage.
> - **Incognito / Private Windows**: Browsing in Incognito mode uses ephemeral storage that is destroyed as soon as the window is closed.

### How to Export Backups
1. Navigate to **Settings** (`#settings`) or click the **Backup Now** button in the top navigation banner.
2. Under **Backup & Recovery Center**, click **"Export Complete Backup"**.
3. A timestamped JSON file (`AK67_Backup_YYYY-MM-DD_HHmmss.json`) will download instantly to your device.

### How to Restore Backups
1. Go to **Settings** -> **Restore Backup**.
2. Select your previously downloaded `.json` backup file.
3. The built-in **Dry-Run Diff Engine** will parse the file, validate its schema and signatures, and display a comparative preview of new, conflicting, and identical records.
4. Choose your restoration strategy:
   - **Merge (Recommended)**: Preserves existing local progress and only adds new records or updates statuses where the backup has higher completion.
   - **Replace**: Creates an in-memory safety snapshot, wipes local tables, and commits the backup snapshot cleanly (with automated rollback safety on error).

---

## ☁️ Cloudflare Pages Free Deployment Guide

AK67 is designed for ₹0 permanent hosting using **Cloudflare Pages**:

### Deployment Steps
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit"
   git remote add origin https://github.com/<your-username>/AK67.git
   git branch -M main
   git push -u origin main
   ```
2. **Connect Cloudflare Pages**:
   - Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
   - Select your `AK67` repository.
3. **Configure Build Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Root Directory**: `/`
   - **Environment Variables**: None required (Zero paid APIs, zero backend secrets).
4. **Deploy**:
   - Click **"Save and Deploy"**.
   - Cloudflare Pages builds static assets into `dist/`.
   - Cloudflare Pages uses native SPA fallback (`not_found_handling: "single-page-application"`), ensuring single-page routing functions seamlessly across all paths and refreshes.
   - Access the live application via your generated `*.pages.dev` URL or attach your free custom domain.

---

## 📱 Progressive Web App (PWA) & Offline Capability

AK67 is a fully compliant, installable Progressive Web App built with `vite-plugin-pwa` and Workbox:

### Key Offline Features
- **100% Offline Curriculum**: All 188 curriculum items (67 DSA problems with solutions, 17 C++ topics, 21 SQL queries, 47 Core CS modules, 36 Aptitude lessons), 282 MCQs, 100 interview questions, and 10 company profiles are bundled client-side.
- **Workbox Service Worker**: Precaches the entire application shell, styles, scripts, and fonts.
- **IndexedDB Isolation**: Cache clearing, service worker updates, or network switches **never** wipe or interfere with user progress, notes, or test results stored in IndexedDB.
- **Assessment Interruption Protection**: Service worker updates are safely held back whenever a student is actively taking a timed mock test or coding assessment.
- **Network Status Bar**: Real-time non-intrusive status bar indicating `Online`, `Offline (IndexedDB active)`, or `Connection Restored`.

### How to Install
- **Android (Chrome)**: Tap the "Install AK67" header button or browser menu `⋮` -> "Install app" / "Add to Home screen".
- **Desktop (Chrome/Edge)**: Click the Install icon in the browser address bar or the "Install AK67" button in Settings.
- **iOS (Safari)**: Tap the Share button `􀈂` -> "Add to Home Screen".

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
