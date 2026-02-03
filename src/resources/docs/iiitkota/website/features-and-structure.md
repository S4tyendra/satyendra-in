TL;DR:

  * **Structure:** Detailed breakdown of the file system and architectural logic.
  * **Focus:** Explains *what* each file does and *why* it exists.
  * **Scope:** Covers build scripts, core source code, components, hooks, and security utilities.

Here is the restructured, detailed documentation for the project internals.

-----

# 🏗️ Project Structure & Internals

This document details the architectural layout, build automation, and core logic of the **iiitkota.ac.in** codebase. It explains not just where files are, but *why* they are there.

-----

## 📂 High-Level Folder Walkthrough

The project follows a strict feature-based and type-based separation.

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
│   ├── index.css             # The ONLY CSS file (Tailwind v4)
│   └── main.jsx              # Entry point (Providers, Error Boundaries)
├── bun.lockb                 # Binary lockfile for dependencies
├── index.html                # Vite entry template
└── vite.config.js            # Vite configuration
```

-----

## ⚙️ `scripts/` - Build-Time Automation

> ⚠️ **Note:** Scripts in this folder are executed automatically during the `bun run build` process. They run in the Node/Bun environment, not the browser.

### `generate-sitemap.js`

  * **Purpose:** SEO & Indexing.
  * **Function:** Crawls routes and generates a standard `sitemap.xml` in the `dist/` directory.
  * **Why:** Ensures search engines (Google, Bing) can discover all dynamic routes efficiently.

### `generate-static-pages.js`

  * **Purpose:** Hybrid Static Site Generation (SSG).
  * **Function:** Pre-renders critical pages into static HTML files during the build.
  * **Mechanism:**
      * Fetches data from live APIs and the search index.
      * Injects proper `<head>` meta tags and pre-rendered text content.
  * **Outcome:** Improved First Contentful Paint (FCP) and better indexing for non-JS crawlers.

-----

## ⚡ Root Files

### `index.html`

The root template used by Vite. It acts as the shell for SPA hydration.

  * **Contains:** Preloader, base meta tags, and global font styles.
  * **Special Logic:** Includes scripts to remove Google Translate branding from the UI.

-----

## 💻 `src/` - Application Source Code

### Entry Points

#### `main.jsx`

The absolute entry point for React.

  * **Responsibilities:**
      * Initializes Global Providers (Theme, Context).
      * Wraps the app in a generic `ErrorBoundary`.
      * **Rule:** No business logic belongs here; keeps the bootstrap process predictable.

#### `App.jsx`

The central nervous system for routing.

  * **Responsibilities:**
      * Imports all route-level components.
      * Exposes routes to the `RouterProvider`.
      * Handles top-level layout wiring.

#### `index.css`

  * **The only CSS file in the project.**
  * **Stack:** Tailwind CSS v4.
  * **Contents:** Tailwind configuration, custom utilities, and global resets.
  * **Design Choice:** Eliminates CSS sprawl and specificity wars.

-----

## 🧩 `src/components/` - UI Building Blocks

Components are categorized by their scope and reuse potential.

### `ui/`

Atomic, highly reusable elements. Most are derived from **shadcn/ui**.

  * **Controls:** `button.jsx`, `input.jsx`, `switch.jsx`, `select.jsx`, `date-picker.jsx`.
  * **Display:** `card.jsx`, `badge.jsx`, `table.jsx`, `separator.jsx`.
  * **Overlays:** `dialog.jsx`, `alert-dialog.jsx`, `popover.jsx`, `drawer.jsx`.
  * **Specialized:**
      * `markdown-renderer-*.jsx`: Handles Markdown content with LaTeX support.
      * `math-renderer.jsx`: Renders complex equations (KaTeX/MathJax).

### `common/`

General-purpose logic components reusable across the app.

  * `ErrorBoundary.jsx`: Catches runtime errors to prevent white-screen crashes.
  * `NumberTicker.jsx`: Animated counters for statistics.
  * `SearchComponent.jsx`: Standalone search logic.
  * `VisitorCounter.jsx`: Displays live site traffic stats.

### `layout/`

Structural components defining the page skeleton.

  * `RootLayout.jsx`: Main wrapper handling global context.
  * `Header.jsx` / `SiteHeader.jsx`: Main navigation.
  * `ExternalLinkDialog.jsx`: Security modal warning users before leaving the domain.

### `universal/`

Components used in diverse contexts (global utilities).

  * `DocumentPreview.jsx`: In-app preview for PDFs/Images.
  * `SearchModal.jsx`: The global `Cmd+K` search interface.

### `page-components/`

Components scoped to specific sections.

  * **`index`**: Landing page widgets.
  * **`faculty` / `students`**: Profile cards and list views.
  * **`webmasters`**: Team display cards.
  * **`forms`**: specific logic for institutional forms.

-----

## 📍 `src/pages/` - Routing

The project uses a structured file-to-route mapping.

  * **Rule:** 1 file = 1 route.
  * **Naming Convention:** Filenames must match the URL path. Underscores (`_`) resolve to hyphens (`-`).
      * `about_institute.jsx` → `/about-institute`
      * `webmasters.jsx` → `/webmasters`
  * **404:** `404.jsx` handles all unmatched routes.

-----

## 🗄️ `src/data/` - Static Content

Stores hardcoded, rarely changing data to reduce API overhead.

  * **Examples:** Department lists, Institute history, Webmaster team info.
  * **Benefit:** Keeps UI components pure and logic-free.

-----

## 🎣 `src/hooks/` - Custom Logic

### `useApiData.js`

The centralized API client.

  * **Strategy:** Stale-while-revalidate (custom implementation).
  * **Flow:** Returns cached data immediately → Fetches fresh data → Updates UI on success.
  * **States:** Handles `loading`, `error`, and `success` explicitly.

### `useDynamicSEO.js`

  * **Usage:** `useDynamicSEO(title, description, image, type)`
  * **Function:** Updates document meta tags **after** the page renders.
  * **Why:** Essential for correcting SEO tags on dynamic, API-driven pages.

### `useGoogleAnalytics.js`

  * **Function:** Listens for route changes and pushes page views to GA.
  * **Why:** Required because SPAs do not trigger standard page loads.

-----

## 🛠️ `src/lib/` - Core Utilities

### `data.js` (ApiData Class)

A wrapper class for standardizing HTTP requests and responses.

### `fetchAlldata.js`

  * **Trigger:** Runs after the initial page load.
  * **Action:** Background-fetches **all** required API endpoints.
  * **Benefit:** Prefills the cache, making subsequent navigation instant.

### `formsdb.js` & `formvalidation.js`

  * **formsdb:** Persists form state locally (data survives page reloads).
  * **formvalidation:** Implements **server-driven validation**, rejecting fragile client-side regex in favor of backend rules.

### `utils.js`

  * **Key Function:** `cn()`
  * **Stack:** `clsx` + `tailwind-merge`.
  * **Purpose:** Merges Tailwind classes intelligently, resolving conflicts dynamically.

-----

## 🛡️ `src/utils/` - Security & Hardening

### `security.js`

Implements client-side defense-in-depth.

  * **Console Locking:** Prevents execution of arbitrary code via DevTools.
  * **Tamper Protection:** Overrides and freezes `XMLHttpRequest` and `fetch` to prevent unauthorized interception or modification by browser extensions.

-----

## 🏗️ Architectural Decisions

1.  **Bun Runtime Only:** Optimized for speed; Node.js is not supported.
2.  **Hybrid Rendering:** SPA for interactivity + Static Generation for SEO.
3.  **Zero CSS Sprawl:** All styling is handled via Tailwind v4 in a single file.
4.  **Centralized Caching:** The custom API hook ensures data consistency without external state libraries like Redux.
