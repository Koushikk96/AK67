# AK67 — Design System & UI/UX Guidelines

This document specifies the visual design architecture, design tokens, component hierarchy, responsive layouts, and typography for **AK67 — Your Placement Preparation System**.

---

## 🎨 Visual Philosophy

- **Premium Dark Aesthetics (Default)**: Engineered for long, focused study sessions. Deep charcoals, rich neutral slates, subtle borders, and low visual fatigue.
- **Light Theme Support**: Clean, high-contrast, paper-neutral light mode for bright study environments.
- **Restrained & Intentional Accents**: Color is used strictly to communicate status (Solved, Overdue, Warning, Success), never as frivolous eye candy.
- **Purposeful Density**: Avoid overly bubbly, toy-like cards or cavernous empty spaces. Information is dense, clean, and scannable like an engineering tool.
- **Subtle Motion**: Transitions are restricted to rapid micro-interactions (150ms - 200ms ease-out) for dropdowns, tabs, and drawer expansions. No distracting floating elements or gratuitous animations.

---

## 📐 Color System & Tokens

### Dark Theme (Primary)
- **Background Base**: `#09090b` (Zinc 950 - pitch charcoal)
- **Surface / Card Background**: `#121215` (Zinc 900 modified - raised card layer)
- **Elevated / Popover Surface**: `#18181b` (Zinc 900)
- **Subtle Borders**: `#27272a` (Zinc 800 - crisp 1px borders)
- **Muted Text / Secondary Labels**: `#a1a1aa` (Zinc 400)
- **Subtle Text / Tertiary Labels**: `#71717a` (Zinc 500)
- **Foreground / Primary Headings**: `#fafafa` (Zinc 50)
- **Body Text**: `#e4e4e7` (Zinc 200)

### Light Theme
- **Background Base**: `#ffffff`
- **Surface / Card Background**: `#f4f4f5` (Zinc 100)
- **Elevated / Popover Surface**: `#ffffff`
- **Subtle Borders**: `#e4e4e7` (Zinc 200)
- **Foreground / Primary Headings**: `#09090b` (Zinc 950)
- **Body Text**: `#27272a` (Zinc 800)

### Semantic & Status Accents
| Status / Role | Dark Color | Light Color | Usage |
| :--- | :--- | :--- | :--- |
| **Solved / Success** | `#10b981` (Emerald 500) | `#059669` (Emerald 600) | Completed problems, passed tests, safe backup status |
| **Attempted / In Progress** | `#f59e0b` (Amber 500) | `#d97706` (Amber 600) | Active attempts, ongoing study sessions, medium difficulty |
| **Revise / Overdue** | `#8b5cf6` (Purple 500) | `#7c3aed` (Purple 600) | Items due for spaced review, flashcards |
| **Urgent / Error / Hard** | `#ef4444` (Red 500) | `#dc2626` (Red 600) | Overdue revisions, Hard difficulty problems, test errors |
| **Primary Brand Accent** | `#3b82f6` (Blue 500) | `#2563eb` (Blue 600) | Primary CTA buttons, active sidebar tabs, study timer |
| **Easy Difficulty** | `#06b6d4` (Cyan 500) | `#0891b2` (Cyan 600) | Easy difficulty badge |

---

## 🔤 Typography System

- **Primary Sans Font**: System font stack / Inter (`font-sans`):
  `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- **Code & Monospace Font**: JetBrains Mono / Fira Code / system mono (`font-mono`):
  `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

### Type Scale & Hierarchy
- **Display 1 (App Header / Hero)**: `text-2xl font-bold tracking-tight` (24px)
- **Section Heading (Module Title)**: `text-xl font-semibold tracking-tight` (20px)
- **Card Heading / Subtitle**: `text-base font-semibold` (16px)
- **Body Regular**: `text-sm font-normal leading-relaxed` (14px)
- **Caption / Meta Information**: `text-xs font-medium text-zinc-400` (12px)
- **Micro Badge**: `text-[10px] font-semibold uppercase tracking-wider` (10px)

---

## 📱 Layout & Navigation Architecture

### Desktop Layout (>= 1024px)
- **Fixed Collapsible Left Sidebar (Width: 260px)**:
  - Header with **AK67** logo, version tag, and tagline *"Your Placement Preparation System"*.
  - Grouped navigation links with icons:
    - **Core**: Dashboard, Daily Planner, Spaced Revision, Placement Analytics.
    - **Practice**: 67 DSA Sheet, C++ Reference, SQL Arena, Core CS Modules, Aptitude.
    - **Mock & Interview**: Assessment Simulator, Interview Hub, Company Drives.
    - **Personal**: Notes & Mistake Log, Settings & Data Backup.
  - Persistent backup health indicator at sidebar footer.
- **Main View Area**:
  - Top bar with placement target countdown, study streak pill, quick search (`Ctrl+K`), and theme toggle.
  - Generous max-width content container (`max-w-7xl mx-auto`) with responsive grid.

### Mobile Layout (< 1024px)
- **Sticky Top Bar**:
  - Compact AK67 brand badge, streak badge, and settings/backup icon.
- **Main View Area**:
  - Touch-optimized padding (`px-4 py-3`), full-width cards with edge-to-edge readability.
  - Strict zero-overflow: horizontal tables convert to stacked cards or cleanly scrollable inline containers.
- **Fixed Bottom Navigation Bar (Height: 64px)**:
  - 5 High-frequency destinations:
    1. **Dashboard** (`LayoutDashboard`)
    2. **DSA** (`Code2`)
    3. **Revision** (`RotateCcw`)
    4. **Planner** (`CalendarCheck`)
    5. **More Menu** (`Menu` - opens full drawer with Core CS, Aptitude, Mocks, Notes, Settings).

---

## 🧩 UI Primitives (shadcn/ui Pattern)

1. **Buttons**:
   - `default`: Charcoal/slate surface with crisp white text.
   - `primary`: Blue accent with high contrast.
   - `outline`: Subtle border (`border-zinc-800`), transparent background, hover surface tint.
   - `ghost`: Borderless, active background on press.
   - `destructive`: Red background with white text for destructive operations (e.g. data overwrite).
2. **Badges**:
   - Status indicators with subtle tinted backgrounds (e.g., `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`).
3. **Cards**:
   - Flat background (`bg-[#121215]`), crisp border (`border border-zinc-850`), soft inner highlight, zero harsh drop shadows.
4. **Dialogs & Modals**:
   - Centered overlay with backdrop blur (`backdrop-blur-sm bg-black/70`), accessible ESC key dismissal, focus trap, and keyboard shortcuts.
5. **Data Tables / Lists**:
   - Alternating subtle row highlights, clean column alignment, sticky headers, and clear empty states.

---

## ♿ Accessibility & Ergonomics

- All interactive elements meet minimum touch target standards ($\ge 44 \times 44$ px on mobile).
- Strict WCAG 2.1 AA color contrast compliance for text elements.
- Accessible ARIA labels on all icon-only buttons.
- Keyboard navigability with visible focus rings (`focus-visible:ring-2 focus-visible:ring-blue-500`).
