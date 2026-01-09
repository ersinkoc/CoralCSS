# CoralCSS Project Context

## Overview
**CoralCSS** (`@coral-css/core`) is a modern, zero-dependency, utility-first CSS framework written in TypeScript. It features a micro-kernel architecture where core functionality, utilities, and variants are implemented as plugins. It supports both build-time generation (via Vite/PostCSS) and runtime usage (via CDN).

**Key Features:**
*   **Utility-First:** Comprehensive utility classes (similar to Tailwind CSS).
*   **Modern CSS:** First-class support for anchor positioning, container queries, scroll-driven animations, etc.
*   **Headless Components:** Accessible, unstyled UI components (Dialog, Dropdown, Tabs, etc.).
*   **Architecture:** Plugin-based micro-kernel. Everything is a plugin.
*   **Modes:** Build-time (Vite, PostCSS, CLI) and Runtime (browser-side).

## Tech Stack
*   **Language:** TypeScript (Strict mode)
*   **Runtime:** Node.js >= 18
*   **Build Tool:** `tsup` (for library), `vite` (for website/examples)
*   **Testing:** `vitest` (Unit/Integration), `playwright` (E2E)
*   **Linting/Formatting:** ESLint, Prettier

## Project Structure

```text
D:\Codebox\PROJECTS\CoralCSS\
├── src/
│   ├── core/           # Core engine (Kernel, Generator, Parser, Cache)
│   ├── plugins/        # Built-in plugins (Core utils, Variants, Optional features)
│   ├── presets/        # Configuration presets (Coral, Wind, Mini, Full)
│   ├── components/     # Headless UI components (Dialog, Tabs, etc.)
│   ├── theme/          # Default theme system
│   ├── runtime/        # Runtime/CDN logic (Observer, Injector)
│   ├── build/          # Build tool integrations (CLI, Vite, PostCSS)
│   └── utils/          # Shared utilities (Color, CSS, DOM)
├── tests/              # Vitest unit and integration tests
├── examples/           # Usage examples (Vanilla JS/HTML)
├── website/            # Documentation site (React + Vite)
├── SPECIFICATION.md    # Detailed technical specs and API reference
└── package.json        # Dependencies and scripts
```

## Key Commands

### Development
*   **Install Dependencies:** `npm install`
*   **Build Library:** `npm run build`
*   **Watch Mode:** `npm run dev`
*   **Type Check:** `npm run typecheck`

### Testing
*   **Run Unit Tests:** `npm run test`
*   **Watch Tests:** `npm run test:watch`
*   **Coverage:** `npm run test:coverage` (Target: 100%)
*   **E2E Tests:** `npm run test:e2e`

### Quality
*   **Lint:** `npm run lint`
*   **Format:** `npm run format`

## Architecture & Conventions

### Core Concepts
1.  **Kernel:** The central manager (`createCoral`) that handles configuration and plugin registration.
2.  **Plugins:** Define rules (utilities) and variants.
    *   **Rules:** Match class names (RegExp) -> Generate CSS.
    *   **Variants:** Modify selectors (e.g., `hover:`, `dark:`).
3.  **Presets:** Collections of plugins and theme configurations.
    *   `coralPreset`: Default, modern features.
    *   `windPreset`: Tailwind compatibility.

### Coding Guidelines
*   **Functional:** Prefer functional patterns over heavy class inheritance where possible, though the core uses classes for state management.
*   **Immutability:** Avoid mutating shared state.
*   **Types:** Export explicit types for all public APIs.
*   **Testing:** Maintain high test coverage (aiming for 100%).
*   **No Runtime Deps:** The core library must remain zero-dependency.

### Creating a New Utility
To add a new utility, create a plugin in `src/plugins/core/utilities/` and register it in the appropriate preset.
```typescript
// Example Rule
{
  name: 'my-utility',
  pattern: /^my-util-(.+)$/,
  generate: (match, theme) => ({ property: match[1] })
}
```

## Documentation
*   **SPECIFICATION.md:** The source of truth for features and API design.
*   **README.md:** High-level overview and quick start.
*   **website/:** The public documentation site.
