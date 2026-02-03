# Project Structure and Internals

This document describes the architecture, build automation, and core logic of the iiitkota.ac.in codebase. It explains where files are and why they exist.

The repo already contains instructions for AI code editors like Antigravity, VS Code (Copilot), Claude Code, Gemini CLI, and others so you can ask AI to do work directly.

## High-Level Folder Walkthrough

The project follows a feature-based and type-based separation.

```bash
.
├── scripts/                  # Build-time automation (Node.js/Bun scripts)
│   ├── generate-sitemap.js
│   ├── generate-static-pages.js
├── src/                      # Application Source Code
│   ├── components/           # Reusable UI building blocks
│   ├── data/                 # Static JSON data (Departments, Webmasters, etc.)
│   ├── hooks/                # Custom React hooks (Logic layer)
│   ├── icons/                # JSX-based SVG icons
│   ├── lib/                  # Core utilities and helpers
│   ├── pages/                # Route-level components (Filesystem routing)
│   ├── utils/                # Low-level security & browser utilities
│   ├── App.jsx               # Main Routing & Layout wiring
│   ├── index.css             # The only CSS file (Tailwind v4)
│   └── main.jsx              # Entry point (Providers, Error Boundaries)
├── bun.lockb                 # Binary lockfile for dependencies
├── index.html                # Vite entry template
└── vite.config.js            # Vite configuration
```

## Images and files

Note: Images and files are **NOT** stored in this repo. to use CDN, upload from your dashboard by logging in as administrator at [login.iiitkota.ac.in](https://login.iiitkota.ac.in)

## scripts/ - Build-Time Automation

Note: scripts in this folder run automatically during `bun run build`. They execute in Node/Bun, not the browser.

### generate-sitemap.js

- Purpose: SEO and indexing.
- Function: crawls routes and generates `sitemap.xml` in `dist/`.
- Why: ensures search engines can discover all dynamic routes.

### generate-static-pages.js

- Purpose: hybrid static site generation (SSG).
- Function: pre-renders critical pages into static HTML during the build.
- Mechanism:
- Fetches data from live APIs and the search index.
- Injects `<head>` meta tags and pre-rendered text content.
- Outcome: improved FCP and better indexing for non-JS crawlers.

## Root Files

### index.html

The root template used by Vite. It acts as the shell for SPA hydration.

- Contains: preloader, base meta tags, and global font styles.
- Special logic: includes scripts to remove Google Translate branding from the UI.

## src/ - Application Source Code

### Entry Points

#### main.jsx

The entry point for React.

- Responsibilities:
- Initializes global providers (Theme, Context).
- Wraps the app in a generic `ErrorBoundary`.
- Rule: no business logic belongs here.

#### App.jsx

Central routing file.

- Responsibilities:
- Imports all route-level components.
- Exposes routes to the `RouterProvider`.
- Handles top-level layout wiring.

#### index.css

- The only CSS file in the project.
- Stack: Tailwind CSS v4.
- Contents: Tailwind configuration, custom utilities, and global resets.
- Design choice: eliminates CSS sprawl.

## src/components/ - UI Building Blocks

Components are categorized by scope and reuse.

### ui/

Atomic reusable elements, mostly from shadcn/ui.

- Controls: `button.jsx`, `input.jsx`, `switch.jsx`, `select.jsx`, `date-picker.jsx`.
- Display: `card.jsx`, `badge.jsx`, `table.jsx`, `separator.jsx`.
- Overlays: `dialog.jsx`, `alert-dialog.jsx`, `popover.jsx`, `drawer.jsx`.
- Specialized:
- `markdown-renderer-*.jsx`: handles Markdown content with LaTeX support.
- `math-renderer.jsx`: renders complex equations (KaTeX/MathJax).

### common/

General-purpose logic components reusable across the app.

- `ErrorBoundary.jsx`: catches runtime errors.
- `NumberTicker.jsx`: animated counters for statistics.
- `SearchComponent.jsx`: standalone search logic.
- `VisitorCounter.jsx`: displays live site traffic stats.

### layout/

Structural components defining the page skeleton.

- `RootLayout.jsx`: main wrapper handling global context.
- `Header.jsx` / `SiteHeader.jsx`: main navigation.
- `ExternalLinkDialog.jsx`: security modal warning users before leaving the domain.

### universal/

Components used in diverse contexts.

- `DocumentPreview.jsx`: in-app preview for PDFs/Images.
- `SearchModal.jsx`: global `Cmd+K` search interface.

### page-components/

Components scoped to specific sections.

- `index`: landing page widgets.
- `faculty` / `students`: profile cards and list views.
- `webmasters`: team display cards.
- `forms`: logic for institutional forms.

## src/pages/ - Routing

The project uses a file-to-route mapping.

- Rule: 1 file = 1 route.
- Naming convention: filenames match the URL path. Underscores (`_`) resolve to hyphens (`-`).
- `about_institute.jsx` -> `/about-institute`
- `webmasters.jsx` -> `/webmasters`
- 404: `404.jsx` handles unmatched routes.

## src/data/ - Static Content

Stores hardcoded, rarely changing data to reduce API overhead.

- Examples: department lists, institute history, webmaster team info.
- Benefit: keeps UI components pure and logic-free.

## src/hooks/ - Custom Logic

### useApiData.js

Centralized API client.

- Strategy: stale-while-revalidate (custom implementation).
- Flow: returns cached data -> fetches fresh data -> updates UI on success.
- States: handles `loading`, `error`, and `success` explicitly.

### useDynamicSEO.js

- Usage: `useDynamicSEO(title, description, image, type)`
- Function: updates document meta tags after the page renders.
- Why: required for SEO on dynamic, API-driven pages.

### useGoogleAnalytics.js

- Function: listens for route changes and pushes page views to GA.
- Why: required because SPAs do not trigger standard page loads.

## src/lib/ - Core Utilities

### data.js (ApiData Class)

Wrapper class for standardizing HTTP requests and responses.

### fetchAlldata.js

- Trigger: runs after initial page load.
- Action: background-fetches all required API endpoints.
- Benefit: pre-fills cache, making navigation faster.

### formsdb.js and formvalidation.js

- formsdb: persists form state locally.
- formvalidation: uses server-driven validation instead of client regex.

### utils.js

- Key function: `cn()`
- Stack: `clsx` + `tailwind-merge`.
- Purpose: merges Tailwind classes and resolves conflicts.

## src/utils/ - Security and Hardening

### security.js

Client-side defense-in-depth.

- Console locking: prevents code execution via DevTools.
- Tamper protection: overrides and freezes `XMLHttpRequest` and `fetch` to prevent interception or modification by browser extensions.

## Architectural Decisions

1. Bun runtime only: optimized for speed, Node.js is not supported.
2. Hybrid rendering: SPA for interactivity and static generation for SEO.
3. Single CSS file: all styling via Tailwind v4.
4. Centralized caching: custom API hook keeps data consistent without Redux.
