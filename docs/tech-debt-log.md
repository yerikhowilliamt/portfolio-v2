# Technical Debt Log

This append-oriented log records discovered or intentionally introduced technical debt. Insert each new entry directly below **Entries**, newest first. Logging debt does not authorize fixing it outside the current task scope.

## Entry Template

```markdown
## DEBT-YYYYMMDD-NN — Short Debt Title

- **First recorded:** YYYY-MM-DDTHH:MM:SS+HH:MM
- **Last updated:** YYYY-MM-DDTHH:MM:SS+HH:MM
- **Status:** Open | Planned | In Progress | Resolved | Accepted
- **Priority:** Critical | High | Medium | Low
- **Area:** File, module, route, architecture, test, documentation, or infrastructure.
- **Introduced by:** TASK-YYYYMMDD-NN | Pre-existing | Unknown

### Description

Concrete description of the shortcut, gap, fragility, or maintainability problem.

### Why It Exists or Was Deferred

Context and rationale. State explicitly if the cause is unknown.

### Impact and Risk

Current cost, failure mode, affected users/developers, and likely consequence of leaving it unresolved.

### Recommended Remediation

Specific next action without turning this entry into a full implementation plan.

### Revisit Trigger

Date, milestone, scale threshold, related feature, or failure condition that should trigger action.

### Resolution

Resolution summary and validation evidence, or `Not resolved`.

### Related Logs

- **Tasks:** TASK-YYYYMMDD-NN
- **Errors:** ERR-YYYYMMDD-NN, or `None`.
- **ADR:** Link, or `Not required`.
```

## Entries

## DEBT-20260827-02 — Security Headers Need a Separately Approved Deployment Decision

- **First recorded:** 2026-08-27T18:27:14+07:00
- **Last updated:** 2026-08-27T18:27:14+07:00
- **Status:** Open
- **Priority:** Medium
- **Area:** Next.js/Vercel response security headers.
- **Introduced by:** Pre-existing

### Description

The production-local audit found no Content-Security-Policy or clickjacking protection header.

### Why It Exists or Was Deferred

`AGENTS.md` requires explicit approval before changing security controls, headers, or deployment configuration. Phase 06 authorizes QA but does not override that approval gate.

### Impact and Risk

Without an approved frame policy, the public pages may be embeddable by another origin. A CSP can also reduce script/style injection impact, but an incorrect policy could break Next.js, fonts, images, or future deployment behavior.

### Recommended Remediation

Approve and design the exact headers against the deployed Vercel application, then test navigation, fonts, images, social assets, and any required Next.js inline behavior before enforcement.

### Revisit Trigger

Phase 07 deployment preparation or any explicit security-header approval.

### Resolution

Not resolved; no security or deployment setting was changed.

### Related Logs

- **Tasks:** TASK-20260827-02
- **Errors:** None.
- **ADR:** Not required until the policy is approved and its trade-offs are known.

## DEBT-20260827-01 — Live-Origin SEO and Transport QA Remain Pending

- **First recorded:** 2026-08-27T18:27:14+07:00
- **Last updated:** 2026-08-27T18:27:14+07:00
- **Status:** Planned
- **Priority:** Medium
- **Area:** Canonical URLs, sitemap, robots, HTTPS, HTTP/2, caching, and social-preview URLs.
- **Introduced by:** TASK-20260827-02

### Description

The canonical/discovery implementation is complete, but the production origin does not exist before the separately approved Phase 07 deployment. Local output therefore uses `http://localhost:3000`, and a production server audited on another local port reports an expected sitemap-domain mismatch.

### Why It Exists or Was Deferred

Deployment is explicitly outside Phase 06 and requires separate approval. The implementation uses Vercel's built-in production URL at build time rather than inventing or configuring a domain early.

### Impact and Risk

HTTPS, HTTP/2, cache headers, final absolute canonical URLs, and external social-preview fetches are not proven until a real deployment is available.

### Recommended Remediation

After Phase 07 deployment approval, verify the assigned Vercel origin in canonical, robots, sitemap, Open Graph, and Twitter tags, then run full HTTPS crawl and preview checks.

### Revisit Trigger

Immediately after the first Vercel deployment.

### Resolution

Not resolved; this is the explicit Phase 07 live verification gate.

### Related Logs

- **Tasks:** TASK-20260827-02
- **Errors:** None.
- **ADR:** Not required.

## DEBT-20260826-04 — Root Layout Does Not Declare Smooth Scroll Behavior to Next.js

- **First recorded:** 2026-08-26T21:59:21+07:00
- **Last updated:** 2026-08-27T18:27:14+07:00
- **Status:** Resolved
- **Priority:** Low
- **Area:** `app/layout.tsx` and global route-transition behavior.
- **Introduced by:** Pre-existing

### Description

Browser QA reports Next.js's `missing-data-scroll-behavior` advisory because `app/globals.css` sets `scroll-behavior: smooth` on `html`, while the root `<html>` element does not declare `data-scroll-behavior="smooth"`.

### Why It Exists or Was Deferred

The behavior predates Phase 05. Changing the shared root layout is outside the content-population scope and was not necessary to validate the new project routes.

### Impact and Risk

Next.js may not disable smooth scrolling as intended during route transitions, and the advisory adds console noise during local QA. Reduced-motion CSS already overrides smooth scrolling for users who request it.

### Recommended Remediation

When shared layout behavior is next in scope, confirm the current Next.js guidance, add the supported declaration to the root `<html>` element, and rerun route-transition and reduced-motion checks.

### Revisit Trigger

Satisfied during Phase 06 QA.

### Resolution

Resolved in TASK-20260827-02 by adding `data-scroll-behavior="smooth"` to the root `<html>` element while retaining the reduced-motion override. The browser console no longer emitted the Next.js advisory during the same-origin interaction pass.

### Related Logs

- **Tasks:** TASK-20260826-10, TASK-20260827-02
- **Errors:** None.
- **ADR:** Not required.

## DEBT-20260826-03 — Frontend Did Not Implement the Recruiter-Oriented Design Proposal

- **First recorded:** 2026-08-26T08:09:02+07:00
- **Last updated:** 2026-08-27T00:04:19+07:00
- **Status:** Resolved
- **Priority:** High
- **Area:** Shared shell, Home, Projects, project detail, About, Contact, and authentic project visuals.
- **Introduced by:** TASK-20260825-06

### Description

Before TASK-20260826-08, the frontend satisfied the original Phase 3/4 contracts but did not implement the recruiter-oriented hierarchy in `docs/DESIGN.md`. Home had only two sections, its hero prioritized an abstract slogan over personal identity/role, mobile navigation consumed 149px, the one-project index used a generic grid card, and About/Contact remained structurally generic.

### Why It Exists or Was Deferred

The original implementation intentionally stayed within the earlier approved scope and available content. TASK-20260826-06 was explicitly a design-document task; implementing a cross-route redesign before the user approves its direction or supplies required personal/visual content would violate change-control and evidence rules.

### Impact and Risk

Recruiters may not identify Yerikho's role, ownership, strongest proof, and contact path quickly enough. The interface is functional and accessible but can read as a technical template instead of a memorable professional engineering portfolio.

### Recommended Remediation

Completed in TASK-20260826-08: compact the shell, rebuild the Home recruiter journey, create an intentional one-project presentation, refine project detail, About, Contact, and 404, use the approved metric-panel fallback in place of unapproved visual assets, and complete responsive/accessibility QA.

### Revisit Trigger

Satisfied on 2026-08-26 after the user approved the design, target role, and shadcn Sheet registry action.

### Resolution

Resolved in TASK-20260826-08. Every existing public route follows the approved Technical Editorial Dossier hierarchy; the shared header is 65px at both tested breakpoints, mobile navigation uses shadcn Sheet, and the design passed its implementation gates. TASK-20260827-01 subsequently replaced the approved project-visual fallback with user-supplied OhMyPos screenshots across Home, Projects, and project detail, with responsive and accessibility validation. Missing recruiter facts remain intentionally omitted rather than inferred.

### Related Logs

- **Tasks:** TASK-20260825-06, TASK-20260826-06, TASK-20260826-07, TASK-20260826-08, TASK-20260827-01
- **Errors:** ERR-20260826-13, ERR-20260826-14, ERR-20260826-15, ERR-20260826-16, ERR-20260826-17, ERR-20260826-18.
- **ADR:** Not required until implementation reveals a foundational architecture choice.

## DEBT-20260826-02 — Phase 04 Visual Primitives Are Not Yet shadcn-Composed

- **First recorded:** 2026-08-26T00:20:54+07:00
- **Last updated:** 2026-08-26T00:25:59+07:00
- **Status:** Resolved
- **Priority:** Medium
- **Area:** Phase 04 project cards, stack labels, stat surface, section dividers, and link actions.
- **Introduced by:** TASK-20260826-01

### Description

Before TASK-20260826-02, Phase 04 used project-specific styled markup for visual card, badge-like stack labels, stat surface, section borders, and link actions even though official shadcn `Card`, `Badge`, `Separator`, and the installed `Button` were the intended primitives.

### Why It Exists or Was Deferred

The original Phase 04 implementation followed the repository rule that semantic native HTML is allowed. The user subsequently established a stricter shadcn-first preference, then explicitly approved the registry CLI and any potential dependency/lockfile mutations.

### Impact and Risk

The inconsistency could have caused custom visual markup to diverge from shared shadcn variants. The resolved implementation now uses the shared primitives while preserving semantic document elements.

### Recommended Remediation

Completed: official `Card`, `Badge`, and `Separator` source components were added through the shadcn CLI, Phase 04 surfaces were composed with them, and the existing `Button` now owns the case-study CTA.

### Revisit Trigger

Satisfied on 2026-08-26 when the user approved the exact shadcn add command.

### Resolution

Resolved in TASK-20260826-02 after explicit approval. Official shadcn Card, Badge, and Separator source components were added without manifest or lockfile changes; Phase 04 cards, tags, stat surface, dividers, and CTA were migrated and passed lint, type-check, 16 tests, Webpack production build, and mobile/desktop browser QA.

### Related Logs

- **Tasks:** TASK-20260826-01, TASK-20260826-02
- **Errors:** ERR-20260826-04.
- **ADR:** Not required.

## DEBT-20260826-01 — Public Project Index Uses a Temporary Implementation Fixture

- **First recorded:** 2026-08-26T00:12:17+07:00
- **Last updated:** 2026-08-26T21:59:21+07:00
- **Status:** Resolved
- **Priority:** Medium
- **Area:** `content/projects/project-system-demo.mdx` and public project index content.
- **Introduced by:** TASK-20260826-01

### Description

The public project index currently contains a transparent implementation fixture so Phase 04 can verify list/detail behavior without publishing the Phase 05 OhMyPos narrative. It is deliberately labeled as a fixture and makes no product benchmark or client claim.

### Why It Exists or Was Deferred

Phase 04 requires representative public content and route rendering, while the approved phase boundary reserves real OhMyPos case-study population for Phase 05.

### Impact and Risk

The project system is fully testable and honest, but recruiters see a template demonstration rather than the portfolio's intended flagship case study until Phase 05 completes.

### Recommended Remediation

In Phase 05, add the evidence-approved OhMyPos MDX case study, validate every claim and destination, then remove or demote the implementation fixture without weakening the shared contract.

### Revisit Trigger

Start of Phase 05 or any request to publish the OhMyPos case study.

### Resolution

Resolved in TASK-20260826-10. OhMyPos is now the sole published project entry, the implementation fixture remains available as a draft-only content-contract fixture, and list/detail tests plus the production build verify the public replacement.

### Related Logs

- **Tasks:** TASK-20260826-01, TASK-20260826-10
- **Errors:** None.
- **ADR:** Not required.

## DEBT-20260825-06 — Projects Navigation Precedes the Project Index Route

- **First recorded:** 2026-08-25T21:06:50+07:00
- **Last updated:** 2026-08-26T00:12:17+07:00
- **Status:** Resolved
- **Priority:** Medium
- **Area:** `/projects` navigation destination and Phase 04 route delivery.
- **Introduced by:** TASK-20260825-06

### Description

The approved shared navigation includes `/projects`, but the project-index route is explicitly outside Phase 03 and therefore returns the Next.js 404 surface until Phase 04.

### Why It Exists or Was Deferred

The information architecture fixes `/projects` as the public destination while the phase boundary assigns its implementation to Phase 04. A temporary fragment or alternate URL would create a second public behavior to remove later.

### Impact and Risk

Visitors who select Projects before Phase 04 is delivered reach a 404 page.

### Recommended Remediation

Implement the approved `/projects` index in Phase 04 and retain the existing navigation URL.

### Revisit Trigger

Start of Phase 04.

### Resolution

Resolved in TASK-20260826-01. `/projects` now renders a static published-project index, the shared navigation active state is verified, and the current published card resolves to its statically generated detail route.

### Related Logs

- **Tasks:** TASK-20260825-06, TASK-20260826-01
- **Errors:** None.
- **ADR:** Not required.

## DEBT-20260825-05 — Personal Contact Destinations Are Not Approved

- **First recorded:** 2026-08-25T21:06:50+07:00
- **Last updated:** 2026-08-25T23:43:36+07:00
- **Status:** Resolved
- **Priority:** Medium
- **Area:** Contact route and shared footer content.
- **Introduced by:** Pre-existing content gap

### Description

No public email, LinkedIn, personal GitHub profile, or CV destination is recorded in the approved publication inventory. Contact and footer therefore expose only verified OhMyPos destinations, while the project brief's intended LinkedIn footer destination remains unavailable.

### Why It Exists or Was Deferred

Guessing personal destinations would violate the repository evidence boundary. Phase 03 proceeds with transparent project-review links rather than placeholders.

### Impact and Risk

Hiring teams can inspect public work but cannot initiate direct contact or open a personal professional profile from the site.

### Recommended Remediation

Obtain explicit approval for each intended public destination, then add the approved links to Contact and the footer with accessible new-tab naming.

### Revisit Trigger

Receipt of verified personal contact or CV destinations.

### Resolution

Resolved after the user supplied and approved the public email, LinkedIn, personal GitHub, and two-page CV PDF. TASK-20260825-07 added these exact destinations to Contact, footer, and the Resume CTA with tests and accessible link behavior.

### Related Logs

- **Tasks:** TASK-20260825-06, TASK-20260825-07
- **Errors:** ERR-20260825-15.
- **ADR:** Not required.

## DEBT-20260825-04 — Project Brief Retained a Stale Phase 02 Block

- **First recorded:** 2026-08-25T21:06:50+07:00
- **Last updated:** 2026-08-25T21:06:50+07:00
- **Status:** Resolved
- **Priority:** Low
- **Area:** `docs/project-brief.md` phase status.
- **Introduced by:** Pre-existing

### Description

The project brief still said Phase 02 was unauthorized after TASK-20260825-05 had completed and validated the foundation.

### Why It Exists or Was Deferred

The status line was not updated when Phase 02 was later explicitly requested and implemented.

### Impact and Risk

Later agents could incorrectly treat the Phase 03 prerequisite as unmet despite the completed implementation and validation record.

### Recommended Remediation

Keep project status statements synchronized with the newest completed task log.

### Revisit Trigger

Any future mismatch between project-brief phase status and the task log.

### Resolution

Resolved in TASK-20260825-06 by updating the brief to record Phase 02 completion on 2026-08-25.

### Related Logs

- **Tasks:** TASK-20260825-05, TASK-20260825-06
- **Errors:** None.
- **ADR:** Not required.

## DEBT-20260825-03 — Phase 03 Plan Conflicts with Approved CV State

- **First recorded:** 2026-08-25T20:54:57+07:00
- **Last updated:** 2026-08-25T23:43:36+07:00
- **Status:** Resolved
- **Priority:** High
- **Area:** `docs/plannings/phase-03-layout-shell-static-pages.md` product acceptance criteria.
- **Introduced by:** Pre-existing

### Description

The Phase 03 summary, scope, implementation steps, and definition of done require an approved Resume CTA. The later authoritative Phase 01 decision packet and `docs/project-brief.md` record the CV destination as `Unavailable` and explicitly prohibit rendering a Resume/CV CTA until a real public destination is approved.

### Why It Exists or Was Deferred

The phase plan was not reconciled when the CV decision was finalized. The user then directed implementation using the existing Phase 01 decision packet as the source of truth.

### Impact and Risk

Following the phase plan literally would require a fabricated or broken destination; following the project brief without documenting the difference would make the phase's stated definition of done impossible to satisfy as written.

### Recommended Remediation

Keep the Phase 03 plan aligned with the Phase 01 CV state until a new public destination is explicitly approved.

### Revisit Trigger

Whenever a public CV destination is approved.

### Resolution

Resolved in TASK-20260825-06 by aligning the plan to the then-current unavailable state. When the user later supplied an approved public PDF in TASK-20260825-07, the same plan and product documents were updated to require the exact PDF CTA while preserving `/resume` as a 404.

### Related Logs

- **Tasks:** TASK-20260825-06, TASK-20260825-07
- **Errors:** None.
- **ADR:** Not required.

## DEBT-20260825-02 — Compatible ESLint Release Is No Longer Supported Upstream

- **First recorded:** 2026-08-25T20:48:10+07:00
- **Last updated:** 2026-08-25T20:48:10+07:00
- **Status:** Accepted
- **Priority:** Medium
- **Area:** JavaScript/TypeScript lint toolchain.
- **Introduced by:** TASK-20260825-05

### Description

The project pins `eslint@9.39.5` because the React, accessibility, and import plugins resolved by `eslint-config-next@16.3.2` do not support ESLint 10. npm marks ESLint 9.39.5 as no longer supported upstream.

### Why It Exists or Was Deferred

ESLint 10.9.1 installs through peer overrides but crashes during `react/display-name` rule loading. Patching third-party plugins or suppressing their compatibility boundary would be less reliable than using the newest version accepted by the complete lint graph.

### Impact and Risk

Lint is fully operational and npm audit reports zero vulnerabilities, but the root lint runner no longer receives upstream support. Future security or runtime fixes may require coordinated upgrades across Next.js and its lint plugins.

### Recommended Remediation

When a newer `eslint-config-next` dependency graph declares and demonstrates ESLint 10 support, request approval to upgrade ESLint and the aligned Next.js lint packages together, then rerun the full quality gate.

### Revisit Trigger

A Next.js or resolved plugin release adds ESLint 10 compatibility, or npm audit reports a vulnerability affecting the pinned lint graph.

### Resolution

Accepted temporarily on 2026-08-25. Validation: lint, type-check, 7/7 tests, Webpack production build, and npm audit all pass; audit reports zero vulnerabilities.

### Related Logs

- **Tasks:** TASK-20260825-05
- **Errors:** ERR-20260825-12.
- **ADR:** Not required.

## DEBT-20260825-01 — Local OhMyPos Case-Study Evidence Links Do Not Resolve

- **First recorded:** 2026-08-25T20:15:25+07:00
- **Last updated:** 2026-08-25T20:15:25+07:00
- **Status:** Open
- **Priority:** Low
- **Area:** `docs/ohmypos-case-study.md` technical-evidence references.
- **Introduced by:** Pre-existing in the pasted source document

### Description

The six links under `Bukti teknis` retain paths relative to the source OhMyPos repository, such as `../00%20-%20PRD.md`. Those targets do not exist relative to `docs/ohmypos-case-study.md` in the portfolio repository, so the links do not resolve here.

### Why It Exists or Was Deferred

The document was pasted from the OhMyPos repository as supporting evidence. Rewriting its source links or translating/restructuring the document was not requested and would modify user-provided source material beyond the focused evidence update.

### Impact and Risk

The local concurrency statement remains readable and usable for evidence review, but readers cannot follow its six technical-evidence links from this repository. The file must not be published directly in this state.

### Recommended Remediation

Before using the document as public content, replace the six relative references with the already approved public GitHub destinations or convert the relevant evidence into the eventual English MDX case study.

### Revisit Trigger

Phase that creates `content/projects/ohmypos.mdx` or any request to publish or expose `docs/ohmypos-case-study.md`.

### Resolution

Not resolved.

### Related Logs

- **Tasks:** TASK-20260825-04
- **Errors:** ERR-20260825-04.
- **ADR:** Not required.
