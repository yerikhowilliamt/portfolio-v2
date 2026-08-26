# Error Log

This append-oriented log records errors encountered during task execution, validation, and runtime. Insert each new entry directly below **Entries**, newest first. Keep resolved entries and update their status/history rather than deleting them.

## Entry Template

```markdown
## ERR-YYYYMMDD-NN — Short Error Title

- **Timestamp:** YYYY-MM-DDTHH:MM:SS+HH:MM
- **Status:** Open | Resolved | Workaround
- **Severity:** Critical | High | Medium | Low
- **Task:** TASK-YYYYMMDD-NN
- **Area:** Command, file, module, route, environment, or service.

### What Happened

Exact error message or observable symptom and the context that triggered it.

### Reproduction

1. Minimal step or command.
2. Observed result.

### Root Cause

Confirmed cause, or `Unknown — investigation still required`.

### Resolution or Workaround

What changed or what temporary action was taken. Use `Unresolved` when applicable.

### Why This Approach

Reasoning, alternatives considered, and accepted trade-offs.

### Residual Risk

Conditions under which the error could recur, or `None known`.

### Related Files and Logs

- **Files:** `path/to/file`
- **Tech debt:** DEBT-YYYYMMDD-NN, or `None`.
```

## Entries

## ERR-20260827-03 — Primary Screenshot Triggered a Next Image LCP Advisory

- **Timestamp:** 2026-08-27T00:04:19+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260827-01
- **Area:** `components/project-screenshot.tsx` and browser performance validation.

### What Happened

Desktop Home QA reported that `03-pos-active-cart.png` was detected as the Largest Contentful Paint image and recommended adding `loading="eager"` because it appears above the fold.

### Reproduction

1. Render Home at 1440×900 with the active-cart screenshot in the hero.
2. Inspect the Next.js development console and observe the LCP image advisory.

### Root Cause

The screenshot composition passed the deprecated `priority` prop, which preloaded the image but did not emit the explicit eager-loading attribute checked by this Next.js 16 development warning.

### Resolution or Workaround

Mapped the composition's priority state to Next.js 16's `preload` prop and `loading="eager"`. A clean browser tab then rendered the image eagerly with no application image warning; secondary gallery images remained lazy.

### Why This Approach

Only the above-the-fold image receives eager loading, preserving lazy loading for secondary visual evidence while following the installed framework API.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** `components/project-screenshot.tsx`
- **Tech debt:** None.

## ERR-20260827-02 — Gallery Visual Lookup Was Declared in Metadata Generation

- **Timestamp:** 2026-08-27T00:04:19+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260827-01
- **Area:** `app/projects/[slug]/page.tsx`.

### What Happened

The focused project-detail test failed with `ReferenceError: visuals is not defined` when the page renderer reached the interface-gallery condition.

### Reproduction

1. Render `ProjectPage` for the published `ohmypos` slug.
2. Observe the undefined `visuals` binding at the gallery branch.

### Root Cause

The initial patch inserted `getProjectVisuals(slug)` into `generateMetadata` instead of the similarly shaped `ProjectPage` setup block.

### Resolution or Workaround

Removed the unused metadata binding and declared it in `ProjectPage` after the project lookup. The focused and full test suites then passed.

### Why This Approach

The gallery is render-only state and does not belong in metadata generation.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** `app/projects/[slug]/page.tsx`
- **Tech debt:** None.

## ERR-20260827-01 — Vitest PNG Imports Did Not Provide Intrinsic Image Dimensions

- **Timestamp:** 2026-08-27T00:04:19+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260827-01
- **Area:** `lib/project-visuals.ts`, `components/project-screenshot.tsx`, and route rendering tests.

### What Happened

The focused Home and Projects tests failed with `Image with src "/docs/portfolio-screenshots/ohmypos/03-pos-active-cart.png" is missing required "width" property.`

### Reproduction

1. Import a local PNG through the Vitest asset transformer and pass it to Next Image without explicit dimensions.
2. Render Home or Projects and observe Next Image reject the string URL fixture.

### Root Cause

The production bundler provides `StaticImageData`, but Vitest transforms the same PNG import into a URL string without intrinsic width and height metadata.

### Resolution or Workaround

Recorded each selected screenshot's verified 1440×900 dimensions in the project visual map and passed them explicitly to Next Image. Focused tests then passed, and the production build still optimized the static imports.

### Why This Approach

Explicit dimensions preserve stable layout and make the composition behave consistently in production and tests without mocking Next Image.

### Residual Risk

New screenshots with different dimensions must record their actual width and height in the visual map.

### Related Files and Logs

- **Files:** `lib/project-visuals.ts`, `components/project-screenshot.tsx`
- **Tech debt:** None.

## ERR-20260826-21 — Port 3000 Served an Unrelated Local Application

- **Timestamp:** 2026-08-26T21:59:21+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-10
- **Area:** Local browser QA target.

### What Happened

The first browser navigation to `http://localhost:3000/projects` displayed an Indofund application 404 rather than this portfolio.

### Reproduction

1. Navigate the connected browser to `http://localhost:3000/projects` while the unrelated local service owns port 3000.
2. Observe the foreign site shell and `404 Not Found` heading.

### Root Cause

The prior QA record that identified port 3000 as this repository's running dev server was stale; another local application currently owns that port.

### Resolution or Workaround

Left the unrelated process untouched, started this repository on dedicated port 4173, and repeated all browser checks against `http://127.0.0.1:4173`.

### Why This Approach

A dedicated port gives deterministic route evidence without stopping or changing a user-owned process.

### Residual Risk

Never infer a localhost port's project identity from an earlier session; verify the visible shell before accepting QA evidence.

### Related Files and Logs

- **Files:** None.
- **Tech debt:** None.

## ERR-20260826-20 — Web Link Verifier Could Not Fetch Approved Destinations

- **Timestamp:** 2026-08-26T21:59:21+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-10
- **Area:** Public evidence-link validation tooling.

### What Happened

The web fetch returned `URL ... is not safe to open` for the demo and `Cache miss` for the GitHub destinations, so it produced no valid destination evidence.

### Reproduction

1. Submit the eight approved Phase 01 URLs to the web opener.
2. Observe the internal safety/cache errors instead of page responses.

### Root Cause

The web tool could not resolve uncached direct URLs in that request. The destinations themselves were not proven faulty.

### Resolution or Workaround

Repeated the checks with direct followed HTTP requests. All eight destinations returned HTTP 200, and the demo resolved to its public login entry point.

### Why This Approach

Direct status checks answer the Phase 05 link-availability requirement without changing the approved destinations.

### Residual Risk

Public availability can change after this 2026-08-26 check and should be revalidated before deployment.

### Related Files and Logs

- **Files:** `docs/phase-05-claim-evidence-checklist.md`
- **Tech debt:** None.

## ERR-20260826-19 — Unquoted Dynamic Route Path Expanded as a Shell Glob

- **Timestamp:** 2026-08-26T21:59:21+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-10
- **Area:** Repository inspection command.

### What Happened

An inspection command failed with `zsh:1: no matches found: app/projects/[slug]/page.tsx` before reading the intended route and test files.

### Reproduction

1. Pass `app/projects/[slug]/page.tsx` unquoted to zsh.
2. Observe zsh interpreting `[slug]` as a filename pattern.

### Root Cause

The dynamic route path was not quoted, so zsh treated the square brackets as glob syntax.

### Resolution or Workaround

Quoted the path and reran the focused inspection successfully.

### Why This Approach

Quoting preserves the literal Next.js route name and avoids disabling useful shell glob checks globally.

### Residual Risk

Future commands that reference bracketed App Router segments must quote those paths.

### Related Files and Logs

- **Files:** `app/projects/[slug]/page.tsx`
- **Tech debt:** None.

## ERR-20260826-18 — Browser QA Helpers Used Unsupported Syntax and Wait State

- **Timestamp:** 2026-08-26T08:38:24+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-08
- **Area:** Responsive browser validation commands.

### What Happened

The first responsive-metrics evaluator used a TypeScript non-null assertion in a JavaScript browser callback and stopped with `Expected ')'`. An earlier local-page wait also reported that `networkidle` is unsupported by the browser integration.

### Reproduction

1. Evaluate browser JavaScript containing `document.querySelector("dd")!`, or request the unsupported `networkidle` state.
2. Observe the parser or wait-helper error before the intended assertion completes.

### Root Cause

The browser evaluator accepts JavaScript rather than TypeScript syntax, and this integration's load-state helper does not implement `networkidle` despite the general API type listing it.

### Resolution or Workaround

Replaced the non-null assertion with explicit null guards and used `domcontentloaded` plus direct DOM/screenshot assertions. Mobile and desktop QA then completed successfully.

### Why This Approach

Direct layout, DOM, and screenshot evidence is deterministic for this static site and avoids unsupported helpers.

### Residual Risk

Future browser scripts should remain plain JavaScript and avoid `networkidle` in this environment.

### Related Files and Logs

- **Files:** None.
- **Tech debt:** None.

## ERR-20260826-17 — Local Dev Server Port and Lock State Were Inconsistent

- **Timestamp:** 2026-08-26T08:38:24+07:00
- **Status:** Workaround
- **Severity:** Low
- **Task:** TASK-20260826-08, TASK-20260827-01
- **Area:** Local browser QA server.

### What Happened

`npm run dev` first failed with `listen EPERM` in the sandbox. The network-enabled retry announced port 3001, then exited because an existing repository dev server held the Next.js lock. Browser navigation to 3001 returned `ERR_CONNECTION_REFUSED`, while the existing server remained available to the browser at port 3000. TASK-20260827-01 repeated the same sequence on requested port 4173 before reusing the verified portfolio server at port 3000.

### Reproduction

1. Start another local dev server while the repository's existing Next.js dev process and `.next/dev/lock` are present.
2. Observe the sandbox bind error or the second process exit and refused port.

### Root Cause

The managed sandbox blocks port binding, and a pre-existing dev process already owned the repository dev lock. The second process's initial port message did not mean it remained alive.

### Resolution or Workaround

Preserved the existing process and used its browser-accessible `http://localhost:3000` endpoint. Browser QA completed without killing or replacing user-owned processes.

### Why This Approach

Reusing the existing server avoided a destructive process action and respected the dirty-worktree/process boundary.

### Residual Risk

Command-line curl from the restricted sandbox may not see the same local endpoint that the external browser can access.

### Related Files and Logs

- **Files:** `.next/dev/lock`, `.next/dev/logs/next-development.log`
- **Tech debt:** None.

## ERR-20260826-16 — Turbopack Build Could Not Bind Its Internal Process Port

- **Timestamp:** 2026-08-26T08:38:24+07:00
- **Status:** Workaround
- **Severity:** Low
- **Task:** TASK-20260826-08
- **Area:** Production build validation.

### What Happened

After font access was allowed, `npm run build` still failed with `TurbopackInternalError: Failed to write app endpoint /page`, caused by `creating new process`, `binding to a port`, and `Operation not permitted (os error 1)`.

### Reproduction

1. Run the default Next.js 16 Turbopack production build in this managed environment.
2. Observe the internal port-binding panic while transforming `app/globals.css`.

### Root Cause

The environment prevents Turbopack's internal CSS worker from binding the required local port; the failure is not an application compile or type error.

### Resolution or Workaround

Ran the repository's validated fallback, `npx next build --webpack`. The final build compiled, type-checked, and prerendered all seven static outputs successfully.

### Why This Approach

Webpack validates the same Next.js application output without the environment-specific Turbopack worker requirement.

### Residual Risk

Default `next build` may continue to fail in this managed environment until Turbopack can bind its internal port.

### Related Files and Logs

- **Files:** `app/globals.css`, `next.config.ts`
- **Tech debt:** None.

## ERR-20260826-15 — Sandboxed Build Could Not Fetch Google Fonts

- **Timestamp:** 2026-08-26T08:38:24+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-08
- **Area:** `next/font` production build.

### What Happened

The first `npm run build` failed because `next/font` could not fetch Plus Jakarta Sans and JetBrains Mono from `fonts.googleapis.com` inside the restricted sandbox.

### Reproduction

1. Run the production build without network access.
2. Observe `Failed to fetch JetBrains Mono from Google Fonts` and the equivalent Plus Jakarta Sans error.

### Root Cause

The build-time Google Fonts requests require network access that the default sandbox blocks.

### Resolution or Workaround

Repeated production validation with approved network access. The final Webpack build fetched both fonts and completed successfully.

### Why This Approach

The user explicitly selected these fonts, and `next/font` remains the approved implementation; changing to unapproved local font assets would expand scope.

### Residual Risk

Offline builds will continue to require cached or local font files unless the project later approves self-hosting.

### Related Files and Logs

- **Files:** `app/layout.tsx`
- **Tech debt:** None.

## ERR-20260826-14 — Redesign Regression Assertions Retained Old Accessible Names

- **Timestamp:** 2026-08-26T08:38:24+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-08
- **Area:** Static-page, shell, and MDX regression tests.

### What Happened

Initial test runs failed because assertions still expected the old Contact `Email` label, the first footer paragraph to be copyright, or accessible names without the new “opens in a new tab” qualification.

### Reproduction

1. Run `npm test` after the intentional page hierarchy and accessible-name changes.
2. Observe Testing Library failures in `app/static-pages.test.tsx`, `components/site-shell.test.tsx`, and `lib/mdx.test.tsx`.

### Root Cause

The UI behavior changed intentionally, but several assertions remained coupled to the previous presentation or exact accessible name.

### Resolution or Workaround

Updated assertions to verify the new recruiter hierarchy, semantic destinations, shadcn primitive counts, combined copyright text, and descriptive accessible names. The final suite passes all 16 tests.

### Why This Approach

The revised assertions test user-visible contracts without removing the accessibility improvements or numeric typography span.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** `app/static-pages.test.tsx`, `components/site-shell.test.tsx`, `lib/mdx.test.tsx`
- **Tech debt:** None.

## ERR-20260826-13 — shadcn Sheet Requires Dependency-Mutation Approval

- **Timestamp:** 2026-08-26T08:19:34+07:00
- **Status:** Resolved
- **Severity:** Medium
- **Task:** TASK-20260826-08
- **Area:** Compact mobile navigation implementation.

### What Happened

The approved redesign requires a compact mobile navigation panel. The official `npx shadcn@latest add @shadcn/sheet --dry-run` reports one new source file and a `radix-ui` dependency operation, so the mutating command cannot run under the current dependency approval boundary.

### Reproduction

1. Refresh shadcn project context and confirm Sheet is not installed.
2. Run the official Sheet dry-run.
3. Observe `components/ui/sheet.tsx` plus `radix-ui` under Dependencies.

### Root Cause

The shadcn registry item composes Radix dialog primitives and the CLI declares the umbrella `radix-ui` package even though it is already installed. Repository governance requires explicit approval for commands that may alter package or lockfile state.

### Resolution or Workaround

The user approved the exact registry mutation. `npx shadcn@latest add @shadcn/sheet` created `components/ui/sheet.tsx` and did not change `package.json`, `package-lock.json`, or `components.json`. The generated close action was adapted to use a text label so the project did not need an undeclared icon dependency.

### Why This Approach

Stopping preserves the dependency approval gate and avoids substituting a hand-built native overlay for the required shadcn primitive.

### Residual Risk

None known; manifest and lockfile diffs were explicitly checked and remained empty.

### Related Files and Logs

- **Files:** `components.json`, `package.json`, `package-lock.json`, `components/ui/sheet.tsx`
- **Tech debt:** DEBT-20260826-03.

## ERR-20260826-12 — Sandboxed shadcn Registry Lookup Could Not Resolve npm

- **Timestamp:** 2026-08-26T08:19:34+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-08
- **Area:** shadcn project and component inspection.

### What Happened

The first combined shadcn context/docs/dry-run command failed with `getaddrinfo ENOTFOUND registry.npmjs.org` inside the restricted sandbox.

### Reproduction

1. Run `npx shadcn@latest info --json` in the default sandbox.
2. Observe npm registry DNS resolution fail.

### Root Cause

The managed sandbox blocks outbound registry access required by the shadcn CLI.

### Resolution or Workaround

Repeated the read-only registry calls with approved network access. Project context, documentation links, and Sheet dry-run output were retrieved successfully.

### Why This Approach

The official registry is the authoritative source for generated component and dependency impact.

### Residual Risk

Future shadcn registry calls in this environment may continue to require network-enabled execution.

### Related Files and Logs

- **Files:** `components.json`
- **Tech debt:** None.

## ERR-20260826-11 — Local Dev Server Rewrote next-env Type Paths

- **Timestamp:** 2026-08-26T08:09:02+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-06, TASK-20260826-10, TASK-20260827-01
- **Area:** Generated Next.js type declaration.

### What Happened

Final documentation diff inspection found `next-env.d.ts` changed from the repository's `.next/types/*` imports to `.next/dev/types/*` imports even though this task did not intentionally edit application configuration.

### Reproduction

1. Use the existing local Next.js development server for browser inspection.
2. Inspect `git diff -- next-env.d.ts` and observe the generated dev-type paths.

### Root Cause

The running Next.js development environment regenerated `next-env.d.ts` for its dev type output. The same behavior recurred during TASK-20260826-10 and was present again at the start of TASK-20260827-01 while the existing development server was active.

### Resolution or Workaround

Restored the two generated import paths to the current repository version with a focused patch in each task and verified that `next-env.d.ts` no longer appears in the final diff.

### Why This Approach

The generated change was unrelated to the requested design document and would add accidental noise to the task diff.

### Residual Risk

The development server may regenerate the dev paths during future local runs; final diff inspection should continue to catch it.

### Related Files and Logs

- **Files:** `next-env.d.ts`
- **Tech debt:** None.

## ERR-20260826-10 — Browser Audit Bindings Reset Across an Interrupted Run

- **Timestamp:** 2026-08-26T08:09:02+07:00
- **Status:** Workaround
- **Severity:** Low
- **Task:** TASK-20260826-06
- **Area:** Local browser design audit session.

### What Happened

The first combined browser audit was aborted when a new user message arrived. The next attempt returned `browser is not defined`, and a later cleanup attempt returned `designAuditTab is not defined` because the transient browser-control context had reset between calls.

### Reproduction

1. Start a browser audit that is interrupted by new turn input.
2. Reuse an in-memory browser or tab binding from the interrupted execution context.
3. Observe that the binding is no longer defined.

### Root Cause

The interrupted browser-control execution did not preserve its transient bindings into the resumed context. The application and Chrome connection were not the source of the failure.

### Resolution or Workaround

Reinitialized the approved browser runtime, opened a fresh local audit tab, and completed the desktop/mobile measurements successfully. Agent-created audit tabs remain ephemeral and require no user-facing handoff.

### Why This Approach

Refreshing only the transient automation context avoided changing application state or relying on stale tab identifiers.

### Residual Risk

An interrupted browser audit may require a fresh binding on a subsequent call.

### Related Files and Logs

- **Files:** None.
- **Tech debt:** None.

## ERR-20260826-09 — Phase 5 Planning Filename Was Assumed Incorrectly

- **Timestamp:** 2026-08-26T08:09:02+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-06
- **Area:** Design-context file inspection.

### What Happened

The first context-read command targeted `docs/plannings/phase-05-ohmypos-case-study.md`, which does not exist, and `sed` returned `No such file or directory`.

### Reproduction

1. Attempt to read the assumed Phase 5 path.
2. Observe the missing-file error.

### Root Cause

The actual repository filename is `docs/plannings/phase-05-populate-ohmypos.md`.

### Resolution or Workaround

Listed planning files with `rg --files`, located the correct Phase 5 document, and reviewed it before finalizing the design contract.

### Why This Approach

Repository file discovery is authoritative and prevents further assumptions about planning filenames.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** `docs/plannings/phase-05-populate-ohmypos.md`, `docs/DESIGN.md`
- **Tech debt:** None.

## ERR-20260826-08 — Browser Evaluation Did Not Expose requestAnimationFrame

- **Timestamp:** 2026-08-26T01:04:52+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-05
- **Area:** Responsive browser validation command.

### What Happened

An attempted viewport-settle check stopped with `TypeError: requestAnimationFrame is not a function` inside the browser evaluation context.

### Reproduction

1. Set the validation viewport to 1440×900.
2. Evaluate a promise that calls `requestAnimationFrame` through the scoped browser evaluator.
3. Observe the missing-function error.

### Root Cause

The scoped evaluator used by this browser integration does not expose `requestAnimationFrame` as a callable global in this execution mode.

### Resolution or Workaround

Reloaded the route after setting the desktop viewport, then verified `innerWidth`, horizontal overflow, and the rendered screenshot directly. The page reported 1440px and rendered the expected desktop header.

### Why This Approach

An awaited route navigation provides a deterministic render boundary without relying on an unsupported timing helper.

### Residual Risk

Future browser scripts should avoid assuming every browser global is exposed by the scoped evaluator.

### Related Files and Logs

- **Files:** None.
- **Tech debt:** None.

## ERR-20260826-07 — Copyright Test Assumed Text Was a Single Node

- **Timestamp:** 2026-08-26T01:04:52+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-05
- **Area:** `components/site-shell.test.tsx`.

### What Happened

The first branding regression run failed because `getByText(/© 2026 Yerikho William Tasilima\./)` could not match copyright text split by the numeric `<span>`.

### Reproduction

1. Render `SiteFooter`.
2. Query the complete copyright with `getByText` while the year is wrapped in a `font-mono` span.
3. Observe Testing Library report that the text is broken across multiple elements.

### Root Cause

The assertion treated the copyright as one text node even though the deliberate typography composition splits it across the paragraph and numeric span.

### Resolution or Workaround

Asserted the complete accessible text content on the semantic footer paragraph. The corrected test passed with the full 16-test suite.

### Why This Approach

The paragraph's combined text content is the user-visible contract; removing the numeric span would regress the approved JetBrains Mono styling.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** `components/site-footer.tsx`, `components/site-shell.test.tsx`
- **Tech debt:** None.

## ERR-20260826-06 — Saved Browser Tab Was Stale During Typography QA

- **Timestamp:** 2026-08-26T00:54:57+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-04
- **Area:** Local browser validation session.

### What Happened

The first typography QA evaluation returned `No tab with id: 1685144231` because the tab retained from the prior task was no longer open.

### Reproduction

1. Reuse the prior task's saved tab binding after that browser tab has been closed.
2. Attempt navigation or evaluation and observe the stale-tab error.

### Root Cause

The persistent browser binding remained valid, but its previously selected tab had been closed between validation tasks.

### Resolution or Workaround

Listed the live tabs, confirmed none remained, opened a fresh tab from the existing browser binding, and completed desktop/mobile typography QA successfully.

### Why This Approach

Refreshing only the stale tab preserves the valid browser connection and avoids unnecessary session reinitialization.

### Residual Risk

Browser tabs may be closed between future tasks and should be reacquired when stale.

### Related Files and Logs

- **Files:** None.
- **Tech debt:** None.

## ERR-20260826-05 — Browser QA Used an Unsupported Wait Helper

- **Timestamp:** 2026-08-26T00:40:56+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-03
- **Area:** Local browser validation command.

### What Happened

The first cross-route QA script stopped with `tabAll.waitForTimeout is not a function` after navigating to `/projects`.

### Reproduction

1. Call `tabAll.waitForTimeout(300)` in the connected browser session.
2. Observe that the Browser tab wrapper does not expose that Playwright helper.

### Root Cause

The browser session exposes scoped navigation and evaluation methods, not the full Playwright `Page` API.

### Resolution or Workaround

Removed the unsupported delay and relied on the awaited `goto` calls before evaluating each route. The project index and detail QA then completed successfully.

### Why This Approach

Navigation was already awaited, so an additional fixed delay was unnecessary and would not improve the validity of the checks.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** None.
- **Tech debt:** None.

## ERR-20260826-04 — shadcn Add Requires Explicit Dependency-Mutation Approval

- **Timestamp:** 2026-08-26T00:20:54+07:00
- **Status:** Resolved
- **Severity:** Medium
- **Task:** TASK-20260826-02
- **Area:** shadcn registry component installation.

### What Happened

`npx shadcn@latest add @shadcn/card @shadcn/badge @shadcn/separator` was rejected before execution because the mutating CLI command may add or alter the Radix dependency and lockfile. The user's visual-component preference did not explicitly approve that gated package or lockfile impact.

### Reproduction

1. Verify only `button` is installed in the project shadcn component inventory.
2. Dry-run adding `card`, `badge`, and `separator`; observe three source files plus a reported `radix-ui` dependency.
3. Attempt the mutating add command without explicit dependency/lockfile approval and observe it stop before repository mutation.

### Root Cause

Repository governance requires explicit approval before adding or changing dependencies or lockfile-resolved packages. The shadcn CLI cannot be assumed to leave those files untouched even though `radix-ui` is already present.

### Resolution or Workaround

The user explicitly approved the exact shadcn add command and any resulting manifest or lockfile changes. The command then created `card.tsx`, `badge.tsx`, and `separator.tsx`; inspection confirmed it did not change `package.json`, `package-lock.json`, or `components.json`. The Phase 04 refactor and full validation matrix passed.

### Why This Approach

Stopping preserves the dependency approval boundary and follows the shadcn registry workflow instead of bypassing it.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** `components/project-card.tsx`, `components/stat-block.tsx`, `components/project-mdx-components.tsx`, `package.json`, `package-lock.json`
- **Tech debt:** DEBT-20260826-02.

## ERR-20260826-03 — Sandboxed shadcn Registry Lookup Could Not Resolve npm

- **Timestamp:** 2026-08-26T00:20:54+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-02
- **Area:** shadcn CLI registry inspection.

### What Happened

The initial sandboxed `npx shadcn@latest info --json` and documentation lookup failed with `getaddrinfo ENOTFOUND registry.npmjs.org` and could not write npm logs outside the workspace.

### Reproduction

1. Run the shadcn CLI registry lookup in the restricted network sandbox.
2. Observe npm registry DNS resolution fail.

### Root Cause

The managed sandbox blocks the outbound registry access required by `npx shadcn@latest`.

### Resolution or Workaround

Repeated the read-only lookup with approved network access. Project context, official documentation links, and dry-run output were then retrieved successfully.

### Why This Approach

The official registry is the authoritative source for the current component API and generated-file impact.

### Residual Risk

Future shadcn registry operations in this environment will continue to require network-enabled execution.

### Related Files and Logs

- **Files:** `components.json`
- **Tech debt:** None.

## ERR-20260826-02 — Stat Test Assumed DT Text Was an Accessible Name

- **Timestamp:** 2026-08-26T00:12:17+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-01
- **Area:** `lib/mdx.test.tsx` and `app/projects/projects.test.tsx` stat-block assertions.

### What Happened

The first full test run passed lint and type-check but failed two tests because `getByRole("term", { name: ... })` could not find the rendered `<dt>` elements even though their visible text and `term` roles were present.

### Reproduction

1. Render a `StatBlock` with a visible `<dt>` label.
2. Query it with Testing Library using role `term` plus a name derived from its text.
3. Observe that the role exists but has an empty accessible name under the accessibility-query model.

### Root Cause

The test incorrectly assumed that a `<dt>` element's text content becomes an accessible name for role-based querying. The semantic `<dl>/<dt>/<dd>` markup itself was correct.

### Resolution or Workaround

Kept the semantic component unchanged and asserted the `term` role, visible text, and adjacent `<dd>` reading order separately. The full 16-test suite then passed.

### Why This Approach

Adding redundant ARIA solely to satisfy a mistaken test would reduce semantic clarity. The revised assertion verifies the intended document structure directly.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** `components/stat-block.tsx`, `lib/mdx.test.tsx`, `app/projects/projects.test.tsx`
- **Tech debt:** None.

## ERR-20260826-01 — Combined Patch Targeted the Same File Twice

- **Timestamp:** 2026-08-26T00:12:17+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260826-01, TASK-20260826-10
- **Area:** Initial Phase 04 `apply_patch` operations.

### What Happened

Two Phase 04 patches and one Phase 05 log patch were rejected with `invalid patch: multiple operations target ...` because each attempted more than one operation against the same path. None of the rejected patches changed repository files.

### Reproduction

1. Submit one patch containing both `Delete File` and `Add File` for an existing path.
2. Observe patch verification fail before edits are applied.

### Root Cause

The patch format does not accept multiple operations against the same path in one invocation.

### Resolution or Workaround

Separated the repeated file operations into one operation per path, then applied the remaining task-scoped changes normally.

### Why This Approach

Splitting the operations retained reviewable `apply_patch` edits and avoided unsafe broad file rewrites.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** `lib/mdx.ts`, `lib/mdx.test.tsx`, `docs/error-log.md`
- **Tech debt:** None.

## ERR-20260825-19 — LinkedIn Returned Anti-Bot HTTP 999

- **Timestamp:** 2026-08-25T23:43:36+07:00
- **Status:** Workaround
- **Severity:** Low
- **Task:** TASK-20260825-07
- **Area:** Public LinkedIn destination verification.

### What Happened

An automated `curl` reachability check for `https://www.linkedin.com/in/yerikhowilliamt` returned LinkedIn-specific `HTTP 999` instead of a normal public-page response.

### Reproduction

1. Request the approved LinkedIn URL with a non-browser HTTP client.
2. Observe status 999.

### Root Cause

LinkedIn blocks some automated clients with its anti-bot response. The status does not establish that the user-supplied browser destination is invalid.

### Resolution or Workaround

Preserved the exact user-approved URL and verified its rendered href, target, rel, accessible name, responsive layout, and test assertion locally. GitHub and the local CV were independently reachable.

### Why This Approach

Rewriting or rejecting an explicitly approved profile URL because of platform anti-bot behavior would not improve browser navigation correctness.

### Residual Risk

Automated availability monitoring cannot confirm this LinkedIn profile without a browser-compatible validation path.

### Related Files and Logs

- **Files:** `app/contact/page.tsx`, `components/site-footer.tsx`
- **Tech debt:** None.

## ERR-20260825-18 — Combined Patch Used Context from the Wrong File

- **Timestamp:** 2026-08-25T23:43:36+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260825-07
- **Area:** Responsive-header refinement patch.

### What Happened

The first combined patch attempted to match the Contact arrow line inside the header-file update context and failed without changing files.

### Reproduction

1. Apply the combined header and Contact patch with the misplaced context line.
2. Observe `apply_patch verification failed` for the arrow line.

### Root Cause

The arrow replacement belonged to `app/contact/page.tsx`, not `components/site-header.tsx`.

### Resolution or Workaround

Applied one correctly scoped patch containing explicit update sections for each file, then reran lint, type-check, tests, build, and visual checks.

### Why This Approach

Correcting patch context preserves atomic, reviewable edits without using broad text replacement.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** `components/site-header.tsx`, `app/contact/page.tsx`
- **Tech debt:** None.

## ERR-20260825-17 — PDF Viewer Required Non-HTML Navigation Recovery

- **Timestamp:** 2026-08-25T23:43:36+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260825-07
- **Area:** Chrome PDF visual validation.

### What Happened

Navigation to the PDF timed out waiting for the normal HTML load event even though Chrome had opened the document. The first scroll coordinate exceeded the viewer's actual control viewport, and the PDF viewer tab later became stale after inspection.

### Reproduction

1. Navigate the controlled tab directly to the local PDF and wait for the standard load event.
2. Observe a timeout while the viewer is present.
3. Attempt the initial large-coordinate scroll and observe an out-of-bounds response.

### Root Cause

Chrome's built-in PDF viewer has a different lifecycle and effective control viewport from a normal HTML page.

### Resolution or Workaround

Inspected the already-open tab state instead of renavigating, verified the PDF URL/title and `2 / 2` page indicator, used visible in-bounds scroll coordinates to inspect the page-two footer, and created a fresh tab for subsequent HTML QA.

### Why This Approach

The viewer's visible state was authoritative and avoided repeatedly loading the same asset after the document had already opened.

### Residual Risk

Browser automation should not rely on standard HTML load completion for Chrome PDF viewer documents.

### Related Files and Logs

- **Files:** `public/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf`
- **Tech debt:** None.

## ERR-20260825-16 — Existing Dev Server Rejected a Second Instance

- **Timestamp:** 2026-08-25T23:43:36+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260825-07
- **Area:** Local browser validation server.

### What Happened

The attempted validation server announced port 3001 because port 3000 was occupied, then exited because the same repository already had a Next.js development server running. The first browser request to port 3001 returned `ERR_CONNECTION_REFUSED`.

### Reproduction

1. Run `npm run dev` while the same repository already has a Next.js dev server on port 3000.
2. Attempt to open the announced temporary port 3001.

### Root Cause

Next.js prevents two development-server instances from sharing the same repository build state.

### Resolution or Workaround

Left the existing process untouched and reused the already-running repository server at `http://localhost:3000` for all visual and asset validation.

### Why This Approach

Reusing the healthy same-repository server avoids terminating user-owned processes or changing build directories.

### Residual Risk

None known for this task.

### Related Files and Logs

- **Files:** `.next/dev/logs/next-development.log`
- **Tech debt:** None.

## ERR-20260825-15 — Poppler PDF Tools Were Unavailable

- **Timestamp:** 2026-08-25T23:43:36+07:00
- **Status:** Workaround
- **Severity:** Low
- **Task:** TASK-20260825-07
- **Area:** Public CV PDF visual validation.

### What Happened

`pdfinfo` and `pdftoppm` were unavailable. The first Quick Look fallback also failed inside the sandbox with `sandbox initialization failed: invalid data type of path filter`.

### Reproduction

1. Run the Poppler metadata/render command and observe `command not found: pdfinfo`.
2. Run `qlmanage` inside the default sandbox and observe its sandbox-initialization error.

### Root Cause

Poppler and Python PDF packages are not installed in this environment, while macOS Quick Look requires execution outside the managed command sandbox.

### Resolution or Workaround

Used approved Quick Look execution to render and inspect the first page, then served the PDF through Next.js and inspected both pages plus the page-two footer in Chrome's built-in PDF viewer. No project dependency or PDF content was changed.

### Why This Approach

The available system and browser renderers provided visual evidence without installing an unapproved dependency.

### Residual Risk

Automated per-page PNG rendering remains unavailable until Poppler is installed; browser and Quick Look visual inspection passed for this two-page document.

### Related Files and Logs

- **Files:** `public/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf`
- **Tech debt:** None.

## ERR-20260825-14 — Browser Evaluator Rejected DOM Constructor Check

- **Timestamp:** 2026-08-25T21:04:37+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260825-06
- **Area:** Desktop keyboard-focus browser validation.

### What Happened

The first keyboard-state evaluator failed with `TypeError: Right-hand side of 'instanceof' is not an object` while checking `document.activeElement instanceof HTMLElement`.

### Reproduction

1. Focus the skip link with keyboard Tab in the connected browser.
2. Evaluate the active element using the unavailable `HTMLElement` constructor in the isolated page evaluator.

### Root Cause

The evaluator did not expose `HTMLElement` as an object in that execution boundary even though DOM element properties remained readable.

### Resolution or Workaround

Replaced the constructor check with direct capability checks for attributes, computed style, and `getBoundingClientRect`. Validation then confirmed the visible skip link and approved 3px technical-blue focus indicator.

### Why This Approach

The test only needs observable focus state; constructor identity is not part of the acceptance criterion.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** `app/layout.tsx`
- **Tech debt:** None.

## ERR-20260825-13 — Shell Test Retained a Header from the Previous Test

- **Timestamp:** 2026-08-25T21:02:50+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260825-06
- **Area:** `components/site-shell.test.tsx` test isolation.

### What Happened

The first Phase 03 test run failed because `getByRole("link", { name: "About" })` found two links after a header rendered by the previous test remained in the document.

### Reproduction

1. Run `npm test` with both shell tests.
2. Observe the duplicate About-link query failure in the second test.

### Root Cause

This Vitest setup does not automatically clean Testing Library renders between tests, and the new file did not register cleanup explicitly.

### Resolution or Workaround

Added `afterEach(cleanup)` to the shell test. The full suite then passed with 4 files and 12 tests.

### Why This Approach

Explicit cleanup preserves independent DOM state without weakening or broadening the assertions.

### Residual Risk

New multi-test component files should register cleanup unless a future global setup provides it.

### Related Files and Logs

- **Files:** `components/site-shell.test.tsx`
- **Tech debt:** None.

## ERR-20260825-12 — ESLint 10 Is Incompatible with Next.js React Plugins

- **Timestamp:** 2026-08-25T20:45:29+07:00
- **Status:** Resolved
- **Severity:** High
- **Task:** TASK-20260825-05
- **Area:** Approved development dependency batch and `npm run lint`.

### What Happened

After the approved TypeScript downgrade allowed lint to reach rule execution, `npm run lint` failed while loading `react/display-name` with `contextOrFilename.getFilename is not a function` under ESLint 10.9.1.

### Reproduction

1. Install `eslint@10.9.1` with `eslint-config-next@16.3.2` and its resolved plugin graph.
2. Run `npm run lint` after using a supported TypeScript version.
3. Observe the rule-loading exception while linting `app/page.tsx`.

### Root Cause

The resolved `eslint-plugin-react@7.37.5`, `eslint-plugin-jsx-a11y@6.10.2`, and `eslint-plugin-import@2.32.0` peer ranges stop at ESLint 9. npm installed ESLint 10 through peer overrides, but the React plugin calls a context API incompatible with ESLint 10.

### Resolution or Workaround

The user approved the amendment. Replaced exact `eslint@10.9.1` with exact `eslint@9.39.5`, updated the lockfile, and verified lint, type-check, tests, audit, and the Webpack production build. npm's unsupported-release warning for ESLint 9 is tracked separately as DEBT-20260825-02.

### Why This Approach

Aligning the root ESLint version with every resolved plugin's declared range is safer than suppressing peer warnings or patching third-party rule internals.

### Residual Risk

The incompatibility is resolved. The compatible version's maintenance status remains a tracked upgrade constraint in DEBT-20260825-02.

### Related Files and Logs

- **Files:** `package.json`, `package-lock.json`, `eslint.config.mjs`
- **Tech debt:** DEBT-20260825-02.

## ERR-20260825-11 — Chrome Extension Error Appeared During Local Console Check

- **Timestamp:** 2026-08-25T20:40:27+07:00
- **Status:** Workaround
- **Severity:** Low
- **Task:** TASK-20260825-05, TASK-20260825-06, TASK-20260826-01, TASK-20260826-02, TASK-20260826-03, TASK-20260826-04, TASK-20260826-05, TASK-20260826-06, TASK-20260826-10, TASK-20260827-01
- **Area:** Browser console validation.

### What Happened

Desktop and mobile browser checks captured `TypeError: Cannot read properties of null (reading 'addEventListener')` from `chrome-extension://.../js/share-modal.js`.

### Reproduction

1. Open `http://localhost:3000/` in the connected Chrome validation session.
2. Inspect warning/error logs and observe the extension-originated exception.

### Root Cause

A Chrome extension content script failed independently of the localhost application. The error URL is extension-owned, and no application-origin warning or error was captured. It recurred across the Phase 04 project index, detail, 404, shadcn-refactor, full-site primitive-migration, typography, personal-branding, and design-audit browser checks on 2026-08-26; every captured instance remained extension-owned.

### Resolution or Workaround

Excluded the extension error from application results while retaining it in the validation record. It recurred during TASK-20260825-06, TASK-20260826-10, and TASK-20260827-01; every captured URL remained extension-owned and no application-origin error was present.

### Why This Approach

Changing application code cannot correct an unrelated browser-extension script, and hiding the observation would make the console result misleading.

### Residual Risk

The extension may continue to add noise to future Chrome console checks.

### Related Files and Logs

- **Files:** None.
- **Tech debt:** None.

## ERR-20260825-10 — Browser Wait Strategy Used an Unsupported State

- **Timestamp:** 2026-08-25T20:40:27+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260825-05
- **Area:** Local browser validation command.

### What Happened

The browser control reported `playwright_wait_for_load_state does not support networkidle` during the first localhost inspection.

### Reproduction

1. Navigate the validation tab to `http://localhost:3000/`.
2. Request the unsupported `networkidle` load state.

### Root Cause

The connected browser's supported load-state API accepts `load` and `domcontentloaded`, not `networkidle` for this operation.

### Resolution or Workaround

Used the supported `domcontentloaded` state and completed DOM, responsive, focus, screenshot, and console checks.

### Why This Approach

The root surface is static and the supported DOM-ready state is sufficient before direct layout and console assertions.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** None.
- **Tech debt:** None.

## ERR-20260825-09 — Next.js Dev Server Mutated AGENTS.md

- **Timestamp:** 2026-08-25T20:40:27+07:00
- **Status:** Resolved
- **Severity:** Medium
- **Task:** TASK-20260825-05
- **Area:** `next dev` automatic agent-rule generation.

### What Happened

The first successful Next.js 16 development-server start appended a managed `nextjs-agent-rules` block to the repository's existing `AGENTS.md`.

### Reproduction

1. Start `next dev` with the default `agentRules` setting in an AI-agent environment.
2. Observe `Generated AGENTS.md for AI agents` and the appended managed block.

### Root Cause

Next.js 16 enables automatic agent-rule generation by default when it detects an AI coding environment and the managed marker is absent.

### Resolution or Workaround

Set the documented `agentRules: false` option in `next.config.ts`, removed only the generated marker block, and verified the running server restarted without regenerating it.

### Why This Approach

The Phase 02 approval explicitly requires existing governance documents to remain unchanged; disabling the generator prevents repeat mutation while preserving all original rules.

### Residual Risk

None known while `agentRules: false` remains configured.

### Related Files and Logs

- **Files:** `AGENTS.md`, `next.config.ts`
- **Tech debt:** None.

## ERR-20260825-08 — Sandbox Restrictions Blocked Default Build and Server Paths

- **Timestamp:** 2026-08-25T20:40:27+07:00
- **Status:** Workaround
- **Severity:** Low
- **Task:** TASK-20260825-05, TASK-20260825-06, TASK-20260826-04
- **Area:** Next.js build and local development server validation.

### What Happened

The sandboxed production build could not fetch Geist from Google Fonts. A network-enabled Turbopack build then panicked because an internal process could not bind a port (`Operation not permitted`). The sandboxed dev server hit the same `listen EPERM` restriction on port 3000. The same sandbox DNS restriction recurred in TASK-20260826-04 while validating Plus Jakarta Sans and JetBrains Mono.

### Reproduction

1. Run `npm run build` in the sandbox and observe the font-fetch failure.
2. Retry with network access and observe the Turbopack internal port-binding panic.
3. Run `npm run dev` in the sandbox and observe `listen EPERM` on port 3000.

### Root Cause

The managed execution environment restricts outbound font requests and process port binding used by Turbopack and the development server.

### Resolution or Workaround

Ran `npx next build --webpack`; it compiled, type-checked, generated all static pages, and completed successfully in TASK-20260825-05 and again in TASK-20260825-06. In TASK-20260826-04, reran the Webpack build with approved network access; both requested fonts loaded and every route built successfully. Started the dev server with approved elevated port access and completed browser validation for the applicable tasks.

### Why This Approach

Webpack is a built-in Next.js production bundler and validates the same application without changing the approved production script merely to accommodate this environment.

### Residual Risk

The default Turbopack build remains unverified in this managed environment; the failure evidence points to sandbox port policy rather than application code.

### Related Files and Logs

- **Files:** `app/layout.tsx`, `app/globals.css`, `next.config.ts`
- **Tech debt:** None.

## ERR-20260825-07 — Sandboxed npm Audit Could Not Resolve the Registry

- **Timestamp:** 2026-08-25T20:40:27+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260825-05
- **Area:** Dependency security audit.

### What Happened

The first explicit `npm audit --json` failed with `getaddrinfo ENOTFOUND registry.npmjs.org` and could not write npm logs outside the workspace.

### Reproduction

1. Run `npm audit --json` under the default sandbox.
2. Observe registry DNS failure and the secondary npm-log directory warning.

### Root Cause

The default sandbox blocks the required registry network request and cannot write to the user-level npm log directory.

### Resolution or Workaround

Repeated the audit with approved network access. npm reported zero vulnerabilities.

### Why This Approach

The audit requires current registry data; an offline result would not satisfy the dependency validation requirement.

### Residual Risk

Audit results are time-sensitive and should be rerun after any lockfile change.

### Related Files and Logs

- **Files:** `package-lock.json`
- **Tech debt:** None.

## ERR-20260825-06 — TypeScript 7 Is Incompatible with Next.js Lint Toolchain

- **Timestamp:** 2026-08-25T20:40:27+07:00
- **Status:** Resolved
- **Severity:** High
- **Task:** TASK-20260825-05
- **Area:** Approved development dependency batch and `npm run lint`.

### What Happened

`npm run lint` exits before analyzing source with `typescript-eslint does not support TS 7.0`. A focused dependency check reports TypeScript 7.0.2 invalid against the transitive `>=4.8.4 <6.1.0` peer range.

### Reproduction

1. Install the approved `typescript@7.0.2` with `eslint-config-next@16.3.2`.
2. Run `npm run lint`.
3. Observe the hard error from `typescript-eslint@8.68.0`.

### Root Cause

The npm registry's latest TypeScript release is newer than the TypeScript API supported by the current Next.js lint dependency graph. Registry version and broad top-level peer checks did not expose the nested hard runtime guard before installation.

### Resolution or Workaround

The user approved the amendment. Replaced exact `typescript@7.0.2` with exact `typescript@6.0.3`, updated the lockfile, and verified that the TypeScript-specific lint startup error no longer occurs. Type-check, tests, audit, and Webpack build pass with the amended version.

### Why This Approach

Downgrading one development dependency is simpler and safer than overriding or duplicating the lint parser's TypeScript runtime, and it keeps compiler and lint analysis on the same supported API.

### Residual Risk

The TypeScript incompatibility is resolved. Lint exposed a separate ESLint 10/plugin incompatibility recorded as ERR-20260825-12.

### Related Files and Logs

- **Files:** `package.json`, `package-lock.json`, `eslint.config.mjs`
- **Tech debt:** None.

## ERR-20260825-05 — Initial npm Install Yielded Without Artifacts

- **Timestamp:** 2026-08-25T20:40:27+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260825-05
- **Area:** Approved dependency installation.

### What Happened

The first network-enabled `npm install` execution yielded as a background cell and then completed without producing `package-lock.json`, `node_modules`, or a terminal error payload.

### Reproduction

1. Run the approved production install through the initial background execution.
2. Wait for completion and inspect the workspace.
3. Observe that neither install artifact exists.

### Root Cause

Unknown — the first background execution ended without returning npm output or applying filesystem changes.

### Resolution or Workaround

Repeated the exact approved command, followed its live process session through completion, and verified the complete exact dependency set with `npm ls --depth=0`.

### Why This Approach

Retrying the unchanged approved command was the smallest safe recovery and did not broaden the dependency scope.

### Residual Risk

None known.

### Related Files and Logs

- **Files:** `package.json`, `package-lock.json`
- **Tech debt:** None.

## ERR-20260825-04 — Supplied Public Case-Study Evidence Path Returned 404

- **Timestamp:** 2026-08-25T19:56:19+07:00
- **Status:** Workaround
- **Severity:** Low
- **Task:** TASK-20260825-04
- **Area:** OhMyPos metric evidence verification.

### What Happened

The supplied `docs/portfolio/ohmypos-case-study.md` evidence path returned `HTTP 404` from the public repository's `main` branch, and the repository tree exposed no matching case-study or portfolio path.

### Reproduction

1. Request `https://raw.githubusercontent.com/yerikhowilliamt/ohmypos/main/docs/portfolio/ohmypos-case-study.md` without authentication.
2. Observe `HTTP 404`.
3. Search the public recursive `main` tree for case-study or portfolio paths and observe no match.

### Root Cause

The referenced file is not published at the supplied path on the public `main` branch. Whether it exists only locally or was moved is unknown.

### Resolution or Workaround

Initially excluded that path from verified evidence. On 2026-08-25, the user pasted the source document at `docs/ohmypos-case-study.md`; its concurrency section was inspected and matches the approved settlement result. The local copy is now recorded as supporting evidence, while the original broken public path remains excluded as a public destination.

### Why This Approach

Excluding a broken source prevents the portfolio from linking to nonexistent evidence without discarding a claim supported by other public artifacts.

### Residual Risk

The local copy is available for evidence review, but the case-study document remains unavailable at the originally supplied public URL. Its internal evidence links also do not resolve from the portfolio repository; see DEBT-20260825-01.

### Related Files and Logs

- **Files:** `docs/ohmypos-case-study.md`, `docs/phase-01-decision-packet.md`, `docs/project-brief.md`
- **Tech debt:** DEBT-20260825-01.

## ERR-20260825-03 — Initial Public URL Verification Could Not Reach DNS

- **Timestamp:** 2026-08-25T19:56:19+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260825-04
- **Area:** Public URL reachability verification.

### What Happened

The browser fetch returned internal safe-open/cache errors for the supplied URLs, and the first sandboxed HTTP checks failed with `curl: (6) Could not resolve host` for Vercel, GitHub, and raw GitHub domains.

### Reproduction

1. Open the supplied destinations through the public browser fetch and observe internal fetch errors.
2. Run the same checks through sandboxed `curl` and observe DNS resolution failures with status `000`.

### Root Cause

The initial verification environments could not resolve or fetch the external destinations; the failures were tooling/network restrictions rather than evidence that the public URLs were broken.

### Resolution or Workaround

Repeated the checks through an approved unsandboxed, unauthenticated `curl` request. The live demo, repository, PRD, ADR, docs directory, test suite, task log, and debt log all returned `HTTP 200`.

### Why This Approach

Direct HTTP status checks without cookies or authenticated browser state satisfy the public-access validation while avoiding false conclusions from the restricted fetch environments.

### Residual Risk

HTTP reachability proves public access at the check time but does not guarantee future availability.

### Related Files and Logs

- **Files:** `docs/phase-01-decision-packet.md`, `docs/project-brief.md`
- **Tech debt:** None.

## ERR-20260825-02 — Git Worktree Metadata Unavailable

- **Timestamp:** 2026-08-25T19:16:34+07:00
- **Status:** Open
- **Severity:** Low
- **Task:** TASK-20260825-04
- **Area:** Repository diff and status validation.

### What Happened

Read-only Git inspection returned `fatal: not a git repository (or any of the parent directories): .git` from the repository working directory.

### Reproduction

1. Run `git status --short` from `/Users/indofund.id/Documents/Yerikho/Projects/portfolio`.
2. Observe the fatal not-a-repository response.

### Root Cause

The current workspace does not expose usable Git worktree metadata at or above the working directory.

### Resolution or Workaround

Unresolved. Validation used direct file inspection and content checks; no Git-dependent or destructive operation was attempted.

### Why This Approach

Reconstructing or initializing repository metadata would be outside the requested task and could interfere with user-owned version-control state.

### Residual Risk

The final diff and ignored-file status cannot be verified with Git until valid worktree metadata is available.

### Related Files and Logs

- **Files:** `docs/phase-01-decision-packet.md`, `docs/task-log.md`, `docs/error-log.md`
- **Tech debt:** None.

## ERR-20260825-01 — Combined Patch Referenced a Stale Typo Path

- **Timestamp:** 2026-08-25T18:39:04+07:00
- **Status:** Resolved
- **Severity:** Low
- **Task:** TASK-20260825-01
- **Area:** Documentation patch application.

### What Happened

The combined patch was rejected before applying any changes because it attempted to delete `docs/tech-debt-og.md`, but that path no longer existed when the patch was validated.

### Reproduction

1. Inspect the initial empty log placeholders, including `docs/tech-debt-og.md`.
2. Apply a combined patch that updates the governance files and deletes that typo path.
3. The patch validator reports: `Failed to read .../docs/tech-debt-og.md: No such file or directory`.

### Root Cause

The filesystem changed between inspection and patch validation: the initially observed empty typo path had been replaced by `docs/tech-debt-log.md`. The actor responsible for that intervening rename was not established.

### Resolution or Workaround

Re-inspected `docs/`, confirmed all log files were still empty, and reapplied the changes against the current `docs/tech-debt-log.md` path without the obsolete deletion operation.

### Why This Approach

Re-reading the exact targets avoided overwriting shared workspace changes and preserved the repository's corrected filename.

### Residual Risk

Shared-workspace files can change between inspection and patch application. Re-verify targets after any stale-path failure.

### Related Files and Logs

- **Files:** `AGENTS.md`, `docs/task-log.md`, `docs/error-log.md`, `docs/tech-debt-log.md`
- **Tech debt:** None.
