# Phase 02 Scaffold and Dependency Approval Packet

## Status

`Approved and complete.` The scaffold, amended compatible dependency graph, lockfile, validation scripts, controlled MDX pipeline, theme, and foundation tests are present. Both compatibility amendments are recorded in section 8.

This packet is limited to the approved Phase 02 architecture. It preserves `AGENTS.md`, `docs/project-brief.md`, the Phase 01 decision record, and all continuity logs.

## 1. Recommended Foundation

- **Package manager:** npm 11.17.0 with exactly one `package-lock.json`.
- **Runtime floor:** Node.js `>=20.9.0`; the current local runtime is Node.js 24.19.0.
- **Framework:** Next.js 16.3.2 App Router with React 19.2.8 and amended TypeScript 6.0.3.
- **Styling:** Tailwind CSS 4.3.3 through `@tailwindcss/postcss`, using centralized CSS variables in `app/globals.css`.
- **UI primitive baseline:** shadcn-compatible `components.json`, `cn()` utility, and one Button primitive from the official `new-york-v4` registry shape. The shadcn CLI will not be installed or executed; this avoids its large CLI-only transitive dependency tree and prevents generator overwrite.
- **MDX:** controlled filesystem loading from `content/projects/*.mdx` with `next-mdx-remote/rsc`; only repository-owned files compile, slugs are path-constrained, and imports from MDX content are not enabled.
- **Tests:** Vitest with jsdom and Testing Library for the foundation component/content checks.
- **Fonts:** Geist Sans and Geist Mono through `next/font/google`; no font package is added.

The prior product, architecture, and governance discussion is already settled in `docs/project-brief.md`, `AGENTS.md`, and the phase plans. Phase 02 will not regenerate or replace those documents.

## 2. Exact Production Dependencies

Versions were read from the npm registry on 2026-08-25 and will be saved exactly, without caret or tilde ranges.

| Package | Version | Purpose | Notable transitive implication |
|---|---:|---|---|
| `next` | `16.3.2` | App Router framework, build, routing, metadata, and `next/font` | Includes the Next compiler/runtime toolchain; requires Node.js `>=20.9.0`. |
| `react` | `19.2.8` | Server and UI component runtime | Must remain version-aligned with `react-dom`. |
| `react-dom` | `19.2.8` | DOM and server rendering | Must remain version-aligned with React. |
| `next-mdx-remote` | `6.0.0` | Compile controlled local MDX into React Server Components | Pulls `@mdx-js/mdx`, `@mdx-js/react`, Babel parsing helpers, unified/vfile utilities, and frontmatter parsing support. MDX remains a code-execution boundary and is restricted to repository-owned files. |
| `zod` | `4.4.3` | Validate frontmatter and loader outputs before Phase 04 consumes them | Adds a runtime schema validator; avoids untyped metadata entering routes. |
| `class-variance-authority` | `0.7.1` | Typed Button variants | Small runtime helper used by the official shadcn Button shape. |
| `clsx` | `2.1.1` | Conditional class composition | Used only through the centralized `cn()` helper. |
| `tailwind-merge` | `3.6.0` | Resolve conflicting Tailwind utilities | Used only through the centralized `cn()` helper. |
| `radix-ui` | `1.6.7` | `Slot` behavior for Button `asChild` composition | Aggregate Radix package with multiple primitive subpackages; only `Slot` is imported in Phase 02. This follows the current official shadcn registry shape. |

Proposed install command after approval:

```bash
npm install --save-exact next@16.3.2 react@19.2.8 react-dom@19.2.8 next-mdx-remote@6.0.0 zod@4.4.3 class-variance-authority@0.7.1 clsx@2.1.1 tailwind-merge@3.6.0 radix-ui@1.6.7
```

## 3. Exact Development Dependencies

| Package | Version | Purpose |
|---|---:|---|
| `typescript` | `6.0.3` | Static type checking and Next.js compilation; amended from incompatible 7.0.2. |
| `@types/node` | `24.13.3` | Types aligned to the local Node.js 24 runtime rather than the newer Node.js 26 type line. |
| `@types/react` | `19.2.18` | React TypeScript declarations. |
| `@types/react-dom` | `19.2.5` | React DOM TypeScript declarations. |
| `tailwindcss` | `4.3.3` | Utility CSS compiler. |
| `@tailwindcss/postcss` | `4.3.3` | Tailwind 4 PostCSS integration. |
| `eslint` | `9.39.5` | Lint runner; amended from incompatible 10.9.1. npm marks this compatible release line unsupported, tracked as DEBT-20260825-02. |
| `eslint-config-next` | `16.3.2` | Next.js, React, accessibility, and TypeScript lint rules. |
| `vitest` | `4.1.11` | Unit and component test runner; compatible with Node.js 24. |
| `jsdom` | `30.0.1` | DOM environment for component tests. |
| `@testing-library/react` | `16.3.2` | Semantic React component testing. |
| `@testing-library/jest-dom` | `7.0.1` | Accessible DOM assertions. |

No explicit `vite` or React Vite plugin will be installed: Vitest owns its compatible Vite dependency, and the foundation tests do not need a separate Vite application pipeline.

Proposed install command after approval:

```bash
npm install --save-dev --save-exact typescript@6.0.3 @types/node@24.13.3 @types/react@19.2.18 @types/react-dom@19.2.5 tailwindcss@4.3.3 @tailwindcss/postcss@4.3.3 eslint@9.39.5 eslint-config-next@16.3.2 vitest@4.1.11 jsdom@30.0.1 @testing-library/react@16.3.2 @testing-library/jest-dom@7.0.1
```

## 4. Expected File Impact

### Create

- `package.json` and `package-lock.json`
- `next.config.ts`, `tsconfig.json`, `next-env.d.ts`
- `eslint.config.mjs`, `postcss.config.mjs`
- `vitest.config.ts`, `vitest.setup.ts`
- `components.json`
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `components/ui/button.tsx`
- `lib/utils.ts`
- `lib/mdx.ts`
- `content/projects/foundation-smoke.mdx`
- Focused foundation tests for the Button and MDX loader

### Modify

- `.gitignore` to add standard Next.js, npm, coverage, build, local-environment, and OS/editor artifacts while preserving `/docs/plannings/`.
- Continuity logs required by `AGENTS.md`.

### Explicitly preserve

- `AGENTS.md`
- All existing files under `docs/`, including `docs/ohmypos-case-study.md`
- All approved Phase 01 wording, links, claim boundaries, and the unavailable CV state

No `/about`, `/projects`, `/contact`, or `/resume` route is created in this phase. The root route will remain a minimal semantic smoke surface rather than the Phase 03 design.

## 5. Theme and Content Boundaries

- Background tokens use near-black `#0a0a0a` and `#0f0f0f`, never pure black as the main surface.
- Approved technical-blue tokens are default/focus `#60a5fa`, hover `#93c5fd`, and pressed `#3b82f6`.
- Foreground, muted, border, destructive, card, input, and ring values will be centralized and contrast-checked.
- Button focus remains visible, keyboard operable, and compatible with reduced motion.
- MDX accepts only validated slugs resolved under `content/projects`; missing, traversal, malformed, or invalid-frontmatter content fails predictably.
- The smoke fixture contains no real portfolio claims and will not create a public project route.

## 6. Scripts and Validation

The manifest will expose:

```text
dev        next dev
build      next build
start      next start
lint       eslint .
typecheck  tsc --noEmit
test       vitest run
test:watch vitest
```

After installation and implementation:

1. Review `npm audit` output without automatic upgrades.
2. Run `npm run lint`.
3. Run `npm run typecheck`.
4. Run `npm test`.
5. Run `npm run build`.
6. Render the root route at representative mobile and desktop widths, check keyboard focus, and confirm no hydration warning.
7. Inspect every generated file and confirm existing governance/content documents are unchanged except required continuity-log updates.

## 7. Approval Required

Approve or amend this exact batch:

```text
Package manager: npm + package-lock.json — Approve / Amend
Exact production dependencies: Approve / Amend
Exact development dependencies: Approve / Amend
Filesystem + RSC MDX approach: Approve / Amend
Manual shadcn configuration + Button primitive: Approve / Amend
Generated-file impact: Approve / Amend
Authorize installation and Phase 02 scaffold now: Yes / No
```

The user approved every item and authorized installation on 2026-08-25.

## 8. Required Compatibility Amendments

### Amendment 1 — TypeScript

The installed `eslint-config-next@16.3.2` resolves `typescript-eslint@8.68.0`, whose supported TypeScript range is `>=4.8.4 <6.1.0` and whose entrypoint explicitly throws when TypeScript 7 is detected. Consequently, `typescript@7.0.2` passes `tsc --noEmit` but makes `npm run lint` impossible.

Recommended amendment:

```text
Replace development dependency typescript@7.0.2 with typescript@6.0.3: Approve / Reject
```

**Status:** Approved and applied on 2026-08-25. Type-check, tests, audit, and Webpack production build pass with TypeScript 6.0.3. The TypeScript-specific lint failure is resolved.

### Amendment 2 — ESLint

After TypeScript compatibility was restored, lint reached rule execution and exposed the next peer mismatch: `eslint-plugin-react@7.37.5`, `eslint-plugin-jsx-a11y@6.10.2`, and `eslint-plugin-import@2.32.0` do not support ESLint 10. `npm run lint` now fails inside `react/display-name` with `contextOrFilename.getFilename is not a function`.

Recommended amendment:

```text
Replace development dependency eslint@10.9.1 with eslint@9.39.5: Approve / Reject
```

No other package change is proposed. ESLint 9.39.5 is the newest npm-published 9.x version inspected on 2026-08-25, satisfies `eslint-config-next@16.3.2` (`>=9`) and the resolved React/import/accessibility plugin peer ranges, and avoids overriding their declared compatibility boundary.

**Status:** Approved and applied on 2026-08-25. Lint, type-check, tests, audit, and Webpack production build all pass with ESLint 9.39.5. npm's unsupported-release warning is recorded as DEBT-20260825-02 rather than hidden.
