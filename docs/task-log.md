# Task Log

This append-oriented log is the handoff record for completed, partial, and blocked tasks. Insert each new entry directly below **Entries**, newest first. Keep entries proportional and record context that is not obvious from reading the changed files.

## Entry Template

```markdown
## TASK-YYYYMMDD-NN — Short Task Title

- **Timestamp:** YYYY-MM-DDTHH:MM:SS+HH:MM
- **Status:** Complete | Partial | Blocked
- **Request:** One-sentence description of the requested outcome.
- **Scope:** Files, modules, routes, or documentation intentionally covered.

### Summary

What was accomplished and the resulting behavior.

### What Changed

- Concrete change and affected file/module.

### Key Decisions

- **Decision:** What was chosen.
  - **Reasoning:** Why it was chosen.
  - **ADR:** Link, or `Not required`.

### Validation

- `command or check` — Passed | Failed | Not run (reason).

### Current State

What works, what is partial, and what is explicitly deferred or out of scope.

### Handoff Notes

Non-obvious assumptions, fragile areas, manual steps, and what the next AI mode/developer should know.

### Open Threads

- Follow-up item, owner/input needed, or `None`.

### Related Logs

- **Errors:** ERR-YYYYMMDD-NN, or `None`.
- **Tech debt:** DEBT-YYYYMMDD-NN, or `None`.
```

## Entries

## TASK-20260827-02 — Complete Phase 06 QA, Accessibility, and SEO

- **Timestamp:** 2026-08-27T18:27:14+07:00
- **Status:** Complete
- **Request:** Implement `docs/plannings/phase-06-qa-a11y-seo.md`.
- **Scope:** Cross-site route/state QA, semantics, keyboard/focus, contrast, responsive behavior, reduced motion, route metadata, canonical origin resolution, robots, sitemap, static social-preview assets, link checks, production audit, regression tests, and pre-deploy documentation.

### Summary

Completed the pre-deploy Phase 06 sweep. Every approved public route now exposes complete canonical/Open Graph/Twitter metadata; robots, sitemap, and 1200×630 static OG/Twitter images are generated; the primary action contrast and two accessible-link patterns are corrected; the custom 404 has a semantic H1; and the smooth-scroll Next.js declaration is in place. The full local matrix passed except for explicitly deployment-bound checks and LinkedIn's automated crawler response.

### What Changed

- Added `lib/site-metadata.ts` to resolve the canonical origin from Vercel system URLs and build consistent per-route metadata without inventing a production domain.
- Added `app/robots.ts`, `app/sitemap.ts`, static Open Graph/Twitter images and alt files, plus the deterministic SVG source.
- Added canonical, Open Graph, and Twitter metadata to Home, Projects, About, Contact, and published project details.
- Corrected primary button text contrast from 2.44:1 to 7.79:1, normalized link accessible names, and added the missing 404 H1.
- Removed the `dynamicParams = false` override after production reproduction showed that Next.js logged `NoFallbackError` for unknown slugs; published routes remain SSG and invalid slugs return the custom 404 without a server error.
- Replaced the old image preload/eager combination with explicit eager loading and high fetch priority for primary project images; secondary gallery images remain lazy.
- Added Phase 06 metadata/discovery/image tests and expanded route regression coverage.
- Added `docs/phase-06-pre-deploy-checklist.md` with the complete route matrix, results, audit boundaries, and Phase 07 gates.

### Key Decisions

- **Decision:** Resolve production metadata from `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`, with localhost only as the local fallback.
  - **Reasoning:** The Phase 07 origin is not approved yet; Vercel's built-in production URL provides an absolute origin without adding a custom environment variable or hard-coding an unverified domain.
  - **ADR:** Not required.
- **Decision:** Use deterministic SVG typography rasterized to static PNGs for social previews.
  - **Reasoning:** Exact approved copy and 1200×630 layout are more reliable than a generated visual, while keeping runtime/font complexity out of the request path.
  - **ADR:** Not required.
- **Decision:** Leave security headers, privacy/legal routes, agent-specific endpoints, and copy expansion outside this implementation.
  - **Reasoning:** Security/deployment controls and new routes require separate approval; generic word-count and agent heuristics conflict with the approved recruiter-scanning brief.
  - **ADR:** Not required.

### Validation

- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed; 6 files and 22 tests.
- `npx next build --webpack` — Passed; 12 outputs generated, including robots, sitemap, static social images, and `/projects/ohmypos`.
- Browser route matrix at 390×844, 1440×900, and 720×450 layout-zoom equivalent — Passed with no horizontal overflow, empty alt text, or broken images.
- Keyboard QA — Passed for first-focus skip link, visible 3px focus treatment, mobile focus trap, Escape dismissal, and focus restoration.
- Contrast check — Passed; default primary action is 7.79:1.
- Squirrelscan production full crawl — Completed; overall 58, Core SEO 100, Accessibility 99, Images/Mobile/Social Media 100. Remaining score losses are documented deployment, scope, heuristic, or crawler-bound items.
- Internal production route/MIME check — Passed; five public HTML routes 200, invalid slug 404, robots/sitemap/social images/CV served with intended MIME types.
- External links — Six approved destinations returned HTTP 200; LinkedIn returned HTTP 999 to automated requests (ERR-20260827-09).
- `git diff --check` — Passed.

### Current State

The repository is locally ready for Phase 07 deployment approval. No dependency, environment file, deployment configuration, security header, analytics, DNS, commit, push, or deployment change was made.

### Handoff Notes

After Vercel assigns the production origin, verify that canonical, OG image, robots host, and sitemap URLs use HTTPS and the intended domain, then run the full audit against that live URL. Local `next start` uses the intentional `http://localhost:3000` fallback, so audits from a different port report a sitemap-domain mismatch.

### Open Threads

- Phase 07 live-origin, HTTPS, caching, and deployment verification.
- Security-header decision in DEBT-20260827-02 requires explicit approval.
- Normal-browser verification of LinkedIn after deployment; automated HTTP clients currently receive 999.

### Related Logs

- **Errors:** ERR-20260827-04, ERR-20260827-05, ERR-20260827-06, ERR-20260827-07, ERR-20260827-08, ERR-20260827-09, ERR-20260827-10, ERR-20260827-11.
- **Tech debt:** DEBT-20260826-04 (resolved), DEBT-20260827-01, DEBT-20260827-02.

## TASK-20260827-01 — Integrate User-Supplied OhMyPos Screenshots

- **Timestamp:** 2026-08-27T00:04:19+07:00
- **Status:** Complete
- **Request:** Use the OhMyPos project screenshots supplied under the repository documentation folder.
- **Scope:** Screenshot safety review, image selection, reusable screenshot composition, Home hero proof, Projects card visual, OhMyPos detail gallery, regression coverage, build, responsive visual QA, and continuity logs.

### Summary

Integrated authentic OhMyPos interface screenshots into the recruiter-facing portfolio. The POS active-cart screen now replaces the Home metric-panel fallback and leads the Projects card, while the case-study detail adds a three-image gallery with the dashboard and product/recipe views. All published images use `next/image`, stable dimensions, factual captions, and descriptive alternatives.

### What Changed

- Added `lib/project-visuals.ts` as the project-to-visual mapping for the three selected user-supplied assets without changing the MDX content schema.
- Added `components/project-screenshot.tsx` as a semantic `figure`/`figcaption` composition over `next/image`, supporting framed and embedded presentation.
- Replaced the Home proof fallback with the active-cart screenshot and preserved the approved written concurrency result in the selected-work section.
- Added the primary screenshot to the OhMyPos Projects card and a primary-plus-two-secondary gallery to `/projects/ohmypos`.
- Added factual alt text and captions that describe visible interface structure without promoting screenshot values as measured portfolio outcomes.
- Updated Home and project-route tests for image presence, gallery semantics, and the revised Card/Badge composition counts.
- Updated the Phase 05 evidence checklist with the user-supplied visual source, selected files, and publication boundary.

### Key Decisions

- **Decision:** Publish `03-pos-active-cart.png`, `02-dashboard-overview.png`, and `11-master-data-products.png` only.
  - **Reasoning:** These provide the strongest sales-to-operations narrative without exposing the names and email addresses visible in the RBAC screenshot or repeating the login screen's sample credential and security-marketing copy.
  - **ADR:** Not required.
- **Decision:** Import images directly from `docs/portfolio-screenshots/ohmypos/` through a project visual map.
  - **Reasoning:** Static imports let Next.js optimize the supplied files without duplicating assets under `public/` or changing the approved MDX schema.
  - **ADR:** Not required.
- **Decision:** Use one screenshot as the repeated visual signature and reserve secondary views for the detail page.
  - **Reasoning:** Recruiter scan surfaces stay immediately recognizable, while deeper system breadth remains progressive rather than crowding every card.
  - **ADR:** Not required.

### Validation

- Manual review of all 13 supplied screenshots — Passed; selected three public-safe views and excluded the RBAC/login screens from rendering.
- `npm test -- app/static-pages.test.tsx app/projects/projects.test.tsx` — Initial failure logged as ERR-20260827-01 and ERR-20260827-02; rerun passed, 2 files and 6 tests.
- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed; 5 files and 17 tests.
- `npx next build --webpack` — Passed; all static routes and `/projects/ohmypos` generated with optimized static-image imports.
- Browser QA at 390×844 and 1440×900 — Passed on Home, Projects, and OhMyPos detail; all images loaded when in view, captions remained legible, and no horizontal overflow occurred.
- Primary-image loading check — Passed; rendered `loading="eager"`, secondary gallery images remained lazy, and the resolved LCP advisory did not recur in a clean validation tab.
- Browser console — No application error or image warning after remediation; the known extension-owned error recurred.
- `git diff --check` — Passed.

### Current State

The supplied OhMyPos visuals are integrated locally across the three recruiter-facing surfaces. The work remains uncommitted, unpushed, and undeployed.

### Handoff Notes

The repository folder is `docs/portfolio-screenshots/`, despite the `screenshoots` spelling in the user message. All 13 user-supplied files remain preserved; only three are imported into the public site. Do not expose `08-users-rbac.png` without confirming that its visible names and email addresses are safe for publication.

### Open Threads

- None for this screenshot integration. Phase 06 still owns the broader final QA pass.

### Related Logs

- **Errors:** ERR-20260827-01, ERR-20260827-02, ERR-20260827-03, ERR-20260826-17, ERR-20260826-11, ERR-20260825-11.
- **Tech debt:** DEBT-20260826-03 (updated, resolved).

## TASK-20260826-10 — Publish the Evidence-Bounded OhMyPos Case Study

- **Timestamp:** 2026-08-26T21:59:21+07:00
- **Status:** Complete
- **Request:** Implement `docs/plannings/phase-05-populate-ohmypos.md`.
- **Scope:** OhMyPos claim audit, project MDX and metadata, fixture publication state, placeholder guard, regression coverage, link checks, production build, responsive/accessibility QA, and continuity logs.

### Summary

Published OhMyPos as the portfolio's only public project case study using the exact Phase 01-approved hook, settlement metric, environment, method, limitations, and public destinations. The Phase 04 demonstration fixture is now draft-only, and published MDX fails validation when an unresolved `[...] REQUIRED` placeholder remains.

### What Changed

- Added `content/projects/ohmypos.mdx` with the mandatory seven sections, one qualified stat block, explicit concurrency trade-offs, evidence boundaries, limitations, and eight approved public links.
- Added `docs/phase-05-claim-evidence-checklist.md` to map every published claim and field to the Phase 01 approval record and to document intentionally excluded draft claims.
- Changed `content/projects/project-system-demo.mdx` from published to draft so `/projects` contains only the real OhMyPos entry.
- Extended `lib/mdx.ts` to reject required placeholders in published content while continuing to permit them in drafts.
- Updated loader and route tests for the OhMyPos index card, generated route, metadata, section structure, metric semantics, evidence links, draft filtering, and publication guard.

### Key Decisions

- **Decision:** Publish only the approved partial-settlement correctness result and omit all other metrics from the broader local case-study draft.
  - **Reasoning:** Phase 05 permits only Phase 01-approved claims; report latency, suite totals, and other benchmark claims remain outside that approval boundary.
  - **ADR:** Not required.
- **Decision:** Demote the Phase 04 fixture to draft rather than delete it.
  - **Reasoning:** This removes the temporary public entry while preserving a useful non-public contract fixture.
  - **ADR:** Not required.
- **Decision:** Enforce unresolved required placeholders in the shared loader.
  - **Reasoning:** The publication gate should fail deterministically before a placeholder can reach the project index or static detail route.
  - **ADR:** Not required.

### Validation

- Claim-to-evidence audit against `docs/phase-01-decision-packet.md` — Passed; no unapproved metric entered public copy.
- Eight approved public destinations checked with followed HTTP requests — Passed; all returned HTTP 200, and the demo resolved to its public login entry point.
- `npm test -- lib/mdx.test.tsx app/projects/projects.test.tsx` — Passed; 2 files, 10 tests.
- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed; 5 files, 17 tests.
- `npx next build --webpack` — Passed; `/projects/ohmypos` was the only generated project detail route.
- Browser QA at 390×844 and 1440×900 — Passed for `/projects` and `/projects/ohmypos`; exact section order, metadata title, metric, eight external links, no fixture or required placeholder, and no horizontal overflow.
- Keyboard QA — Passed; the skip link was first in tab order, visible when focused, and rendered a 3px Technical Blue focus ring.
- Browser console — No application error; the known extension error recurred, and a pre-existing Next.js smooth-scroll advisory was logged as DEBT-20260826-04.
- `git diff --check` — Passed.

### Current State

OhMyPos is available locally at `/projects/ohmypos`, appears as the sole published project card, and is ready for Phase 06 QA. It remains uncommitted, unpushed, and undeployed.

### Handoff Notes

Do not widen the concurrency result into a performance or production-scale claim. The local `docs/ohmypos-case-study.md` contains additional figures that still require the Phase 01 approval process before publication. Keep `project-system-demo.mdx` draft-only unless a future test-specific replacement is introduced.

### Open Threads

- Phase 06 owns the broader accessibility, SEO, and final QA pass.
- DEBT-20260826-04 may be addressed when shared layout behavior is next in scope.

### Related Logs

- **Errors:** ERR-20260826-19, ERR-20260826-20, ERR-20260826-21, ERR-20260826-11, ERR-20260826-01, ERR-20260825-11.
- **Tech debt:** DEBT-20260826-01 (resolved), DEBT-20260826-04.

## TASK-20260826-09 — Branch Creation, Commit, and PR for Portfolio Redesign

- **Timestamp:** 2026-08-26T14:06:00+07:00
- **Status:** Complete
- **Request:** Create and switch to a new branch for the current redesign phase, commit changes, and open a PR to dev.
- **Scope:** Branch creation `feature/phase-04-redesign`, staging of implementation files, commit creation, push to remote origin, and PR creation targeting `dev`.

### Summary

Created branch `feature/phase-04-redesign` carrying all redesign changes from TASK-20260826-08, committed them under Conventional Commits convention, pushed to GitHub remote, and created a pull request to `dev`.

### What Changed

- Created and switched to Git branch `feature/phase-04-redesign`.
- Committed all redesign components, routes, tests, theme adjustments, and log entries.
- Pushed branch to remote `origin`.
- Opened pull request targeting `dev`.

### Key Decisions

- **Decision:** Use branch name `feature/phase-04-redesign`.
  - **Reasoning:** Clearly distinguishes the approved design overhaul from the initial phase-04 project system PR (#3).
  - **ADR:** Not required.

### Validation

- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed (5 test files, 16 tests).
- `npx next build --webpack` — Passed (all routes statically generated).
- `gh pr create` — Passed.

### Current State

Branch `feature/phase-04-redesign` is created, pushed, and PR is open against `dev`.

### Handoff Notes

Proceed to review or merge PR into `dev`, then continue to Phase 05 (`feature/phase-05-populate-ohmypos`).

### Open Threads

- None.

### Related Logs

- **Errors:** None.
- **Tech debt:** None.

## TASK-20260826-08 — Begin Approved Portfolio Redesign Implementation

- **Timestamp:** 2026-08-26T08:38:24+07:00
- **Status:** Complete
- **Request:** Execute the approved portfolio redesign now, using `Software Engineer` as the target role.
- **Scope:** Approved design contract, shared shell, mobile navigation, theme tokens, Home, Projects, project detail, About, Contact, 404, regression coverage, production build, responsive/accessibility QA, and continuity logs.

### Summary

Implemented the approved “Technical Editorial Dossier” across every existing public route. The portfolio now identifies Yerikho and the `Software Engineer` role before abstract positioning, leads with bounded OhMyPos evidence, uses a compact 65px shell with an accessible shadcn Sheet on mobile, and presents Projects, project detail, About, Contact, and 404 with a consistent recruiter-oriented editorial hierarchy.

### What Changed

- Added official shadcn `Sheet` source and composed `components/mobile-nav.tsx` with a labelled dialog, four route links, Resume action, Escape dismissal, focus trapping, and trigger-focus restoration.
- Rebuilt the shared header/footer around Yerikho's full name, `Software Engineer` positioning, compact responsive navigation, and approved public destinations.
- Rebuilt Home into identity, verified proof, selected OhMyPos work, three engineering capabilities, professional approach, and contact CTA sections.
- Reworked the single-project index into one full-width editorial feature instead of a forced multi-card grid.
- Added a sticky seven-section reading guide and anchor IDs to project detail while preserving the fixed MDX publishing contract.
- Reframed About around professional ownership and system boundaries; reframed Contact around a primary email CTA with secondary professional channels.
- Added a branded 404 surface and migrated remaining divider/link actions to shadcn `Separator` and `Button` composition.
- Updated theme border tokens, preserved Plus Jakarta Sans for body/headings and JetBrains Mono for numeric/technical content, and retained reduced-motion safeguards.
- Expanded regression assertions for the new hierarchy, shadcn primitives, public destinations, section anchors, and accessible names.

### Key Decisions

- **Decision:** Use official shadcn Sheet for the mobile menu and adapt its close control to a text label.
  - **Reasoning:** The approved registry command created only the component source; removing its undeclared Lucide import avoided an unnecessary dependency while preserving the accessible Radix/shadcn behavior.
  - **ADR:** Not required.
- **Decision:** Omit unconfirmed recruiter facts and project visuals rather than infer them.
  - **Reasoning:** Location, visa/relocation, availability, portrait, and approved OhMyPos visuals remain public-content decisions; the redesign supports intentional evidence-only fallback states.
  - **ADR:** Not required.
- **Decision:** Keep the transparent Phase 04 project-system fixture while featuring approved OhMyPos evidence on Home.
  - **Reasoning:** Publishing the full OhMyPos MDX narrative belongs to Phase 05; redesign approval did not silently authorize replacing that content boundary.
  - **ADR:** Not required.

### Validation

- `npx shadcn@latest add @shadcn/sheet` — Passed; created `components/ui/sheet.tsx` with no manifest, lockfile, or `components.json` change.
- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed; 5 files and 16 tests.
- `npx next build --webpack` — Passed; all static routes, 404, and generated project detail prerendered successfully.
- Browser QA at 390×844 and 1440×900 — Passed on Home, Projects, project detail, About, Contact, and 404; no horizontal overflow.
- Typography/render metrics — Passed; Plus Jakarta Sans is the computed body/display font and JetBrains Mono is the computed metric font; H1 is 48px mobile and 84px desktop.
- Mobile navigation interaction — Passed; four route links are present, Escape closes the Sheet, and focus returns to `Open navigation menu`.
- Keyboard focus check — Passed; the skip link becomes visible and receives a 3px technical-blue focus ring.
- Browser console — No application-origin warning or error; only the previously logged Chrome-extension-origin error recurred.

### Current State

The approved frontend redesign is implemented and validated across all existing public routes. Missing location, visa/relocation, availability, portrait, and authentic OhMyPos visual assets remain intentionally omitted rather than guessed. The project index still exposes the transparent Phase 04 fixture until the separately scoped Phase 05 content task.

### Handoff Notes

The default Turbopack production build remains incompatible with this managed environment's internal port restrictions; use `npx next build --webpack` for validated local production builds. Do not remove the fixture or publish a full OhMyPos MDX case study without executing the approved Phase 05 content contract.

### Open Threads

- Phase 05 replacement of the transparent project-system fixture with the evidence-approved OhMyPos case study.
- Optional recruiter facts and authentic assets require exact user-supplied content before publication.

### Related Logs

- **Errors:** ERR-20260826-12, ERR-20260826-13, ERR-20260826-14, ERR-20260826-15, ERR-20260826-16, ERR-20260826-17, ERR-20260826-18.
- **Tech debt:** DEBT-20260826-01, DEBT-20260826-03.

## TASK-20260826-07 — Record Approval of the Portfolio Design Contract

- **Timestamp:** 2026-08-26T08:14:25+07:00
- **Status:** Complete
- **Request:** Approve the proposed professional software engineer portfolio design.
- **Scope:** Design-status record, project-brief authority update, redesign-debt status update, and next implementation gate.

### Summary

Recorded the user's approval of the “Technical Editorial Dossier” direction. `docs/DESIGN.md` is now the approved UI implementation contract, while its explicitly open personal-content and registry decisions remain gated rather than inferred.

### What Changed

- Changed `docs/DESIGN.md` from `Proposed` to `Approved` with the approval date.
- Clarified that design approval does not supply missing personal facts or automatically authorize dependency/registry mutation.
- Updated `docs/project-brief.md` to recognize the approved UI contract.
- Updated DEBT-20260826-03 to record that design approval is satisfied while implementation remains pending required inputs.

### Key Decisions

- **Decision:** Treat the user's `approved` response as approval of the complete documented design direction.
  - **Reasoning:** The response directly followed delivery of the proposal and satisfies its explicit design approval gate.
  - **ADR:** Not required.
- **Decision:** Preserve the separate gates for target role, personal/location/visa/availability copy, public visual assets, and shadcn registry mutation.
  - **Reasoning:** Those decisions materially affect public claims or dependency state and were explicitly listed as separate confirmations.
  - **ADR:** Not required.

### Validation

- `docs/DESIGN.md` status and authority text — Reviewed; approval date and boundary are explicit.
- `docs/project-brief.md` authority text — Reviewed; design contract is recognized without displacing product authority.
- `git diff --check` — Passed.
- Lint, type-check, tests, build, and browser QA — Not run; this approval-record task changes documentation only.

### Current State

The design direction is approved and ready for phased implementation. Implementation has not started because the first public positioning decision—the exact target role title—must be supplied by the user.

### Handoff Notes

Resolve section 22 decisions one consequential question at a time. Begin with the exact target role, then continue with publishable recruiter facts and the component/asset approvals needed by each phase.

### Open Threads

- Exact target role title for the hero and recruiter-facing metadata.
- Remaining `docs/DESIGN.md` section 22 decisions.

### Related Logs

- **Errors:** None.
- **Tech debt:** DEBT-20260826-03.

## TASK-20260826-06 — Define a Professional Software Engineer Portfolio Design System

- **Timestamp:** 2026-08-26T08:09:02+07:00
- **Status:** Complete
- **Request:** Create `DESIGN.md` with `ui-ux-pro-max` because the current frontend does not yet look like a professional software engineer portfolio.
- **Scope:** Current rendered-UI audit, design-system research, visual thesis, page hierarchy, shared shell, typography/color/grid contracts, shadcn composition, responsive behavior, accessibility, wireframes, anti-slop gate, implementation sequencing, project-brief authority note, and continuity logs.

### Summary

Created `docs/DESIGN.md` as a proposal for a recruiter-oriented “Technical Editorial Dossier.” The document explains the current UI gap with measured render evidence, then defines a personal and evidence-led layout for Home, Projects, project detail, About, Contact, shared navigation, responsive states, and visual QA. No frontend source was changed; implementation remains approval-gated.

### What Changed

- Added a 22-section design contract covering diagnosis, design thesis, design principles, tokens, typography, grid, imagery, route layouts, shadcn component mapping, interaction, responsive behavior, accessibility, evidence rules, required states, wireframes, anti-slop criteria, implementation phases, acceptance criteria, and open decisions.
- Recorded the current render measurements: Home has two sections, one card, no project image/SVG; Projects has one fixture card and no visual; the 390px header is 149px high and the first Home section ends around y=881 on an 844px viewport.
- Preserved approved decisions: dark-first near-black surfaces, technical blue accent, Plus Jakarta Sans, JetBrains Mono, English public copy, current routes, evidence boundaries, and shadcn-first visual/action primitives.
- Rejected off-contract `ui-ux-pro-max` suggestions for a light palette and alternate fonts while adopting its relevant Minimal Swiss, editorial-grid, scanning, contrast, responsive, and reduced-motion guidance.
- Added a project-brief authority note stating that `docs/DESIGN.md` is a detailed proposal and becomes an implementation reference only after user approval.

### Key Decisions

- **Decision:** Use “Technical Editorial Dossier” rather than a terminal/HUD or generic SaaS landing-page aesthetic.
  - **Reasoning:** Recruiters need identity, role, ownership, proof, and case-study depth; decorative technical styling cannot substitute for authentic artifacts and evidence.
  - **ADR:** Not required until implementation reveals a foundational architecture decision.
- **Decision:** Design an intentional one-project state instead of forcing a two-column project grid.
  - **Reasoning:** OhMyPos is the only planned real case study for the MVP; one strong feature is more credible than filler content or an empty-looking grid.
  - **ADR:** Not required.
- **Decision:** Keep the design document in `Proposed` status and make no frontend changes.
  - **Reasoning:** The redesign is cross-cutting and still depends on explicit approval plus personal-content decisions that cannot be inferred.
  - **ADR:** Not required.

### Validation

- `ui-ux-pro-max --design-system` — Completed for a software-engineer portfolio; Minimalism & Swiss Style and clear hierarchy were the applicable outputs.
- Focused `ui-ux-pro-max` searches for landing, style, recruiter scanning, and Next.js — Completed; portfolio-grid, trust/authority, editorial-grid, consistent type hierarchy, responsive imagery, and accessibility guidance were evaluated.
- Browser audit at 1440×900 and 390×844 — Completed; captured current section/card/image counts, header and hero dimensions, route titles, and horizontal-overflow state.
- Current Home, About, Contact, Projects, project detail, project-card, stat-block, Phase 3, Phase 5, and project-brief contracts — Reviewed for implementation and evidence constraints.
- `docs/DESIGN.md` heading/contract audit — Passed; status, shadcn rule, approved fonts/colors, responsive breakpoints, implementation gate, and open decisions are explicit.
- Documentation claim review — Passed; measurements are from the current local render and personal/recruitment fields that lack evidence remain marked as required decisions rather than public copy.
- Browser console — No application-origin warning or error; only the known extension-origin error from ERR-20260825-11 recurred.
- `git diff --check` — Passed.
- `git diff --no-index --check /dev/null docs/DESIGN.md` — No whitespace errors; exit 1 is expected because the new file differs from an empty source.
- Lint, type-check, tests, and build — Not run; this task changes documentation only and intentionally does not implement the redesign.

### Current State

`docs/DESIGN.md` is complete as a reviewable proposal. The current frontend remains unchanged and therefore does not yet satisfy the new design acceptance criteria. Implementation must wait for explicit approval and the open personal-content decisions.

### Handoff Notes

Start any approved redesign from Phase A in `docs/DESIGN.md`, not by editing individual pages opportunistically. Resolve the exact target role, publishable location/relocation/visa/availability copy, authentic OhMyPos visual assets, and shadcn Sheet approval before the relevant implementation step.

### Open Threads

- User approval of the proposed design direction.
- Eight explicit content/component decisions listed in `docs/DESIGN.md` section 22.
- Phase 5 replacement of the project-system fixture with the approved OhMyPos case study.

### Related Logs

- **Errors:** ERR-20260826-09 (resolved), ERR-20260826-10 (workaround), ERR-20260826-11 (resolved), ERR-20260825-11.
- **Tech debt:** DEBT-20260826-03.

## TASK-20260826-05 — Replace Generic Portfolio Branding with Yerikho William Tasilima

- **Timestamp:** 2026-08-26T01:04:52+07:00
- **Status:** Complete
- **Request:** Identify the website as Yerikho William Tasilima's personal portfolio for attracting recruiters at European companies, rather than as “Technical Portfolio.”
- **Scope:** Shared header/footer identity, global metadata title and description, shell regression coverage, project positioning source of truth, responsive browser QA, and continuity logs.

### Summary

Replaced the remaining generic public identity with Yerikho William Tasilima. The header brand, footer copyright, default browser title, route-title template, and metadata description now consistently present the site as his evidence-led full-stack TypeScript portfolio for European hiring teams.

### What Changed

- Replaced `Systems / Work` in the shared header with `Yerikho William Tasilima` while preserving the home link and shadcn Button composition.
- Replaced the generic footer copyright owner with `Yerikho William Tasilima` while preserving JetBrains Mono for the numeric year.
- Changed the default metadata title to `Yerikho William Tasilima` and the page template to `%s | Yerikho William Tasilima`.
- Reframed the metadata description around Yerikho's evidence-led full-stack TypeScript work and the intended European hiring audience.
- Recorded the public identity and personal-portfolio positioning in `docs/project-brief.md`.
- Added shared-shell regression assertions for the branded home link and copyright owner.

### Key Decisions

- **Decision:** Use the full legal/professional name as the site brand and metadata site name.
  - **Reasoning:** Recruiters should identify the portfolio owner immediately; a generic product-like label obscures ownership and weakens the intended personal positioning.
  - **ADR:** Not required.
- **Decision:** Keep the public copy in English while documenting the product decision in Indonesian.
  - **Reasoning:** The project contract targets European hiring teams and requires English public-facing content, while internal planning documents may use the user's language.
  - **ADR:** Not required.

### Validation

- Identity source audit — Passed; no `Technical Portfolio`, `Systems / Work`, or uppercase equivalent remains in public application components or the current project brief.
- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed after correcting the nested copyright assertion; 5 files and 16 tests.
- `npx next build --webpack` — Passed; all static routes and the generated project detail built successfully.
- Browser checks at 390×844 and 1440×900 — Passed; full name renders in the header, footer ownership is correct, title templates resolve correctly, and no horizontal overflow occurs.
- Desktop and mobile visual inspection — Passed; the longer brand remains readable and preserves navigation hierarchy.
- Browser console — No application-origin warning or error; only the known extension-origin error from ERR-20260825-11 recurred.
- `git diff --check` — Passed.

### Current State

The current portfolio is publicly identified as Yerikho William Tasilima's site across the shared UI and metadata. The user-facing positioning now explicitly serves European hiring teams without adding unsupported employment or sponsorship claims.

### Handoff Notes

Use `Yerikho William Tasilima` as the canonical public site name in future metadata, social previews, deployment configuration, and public assets. Do not reintroduce generic ownership labels such as `Technical Portfolio`.

### Open Threads

- Social/OG image branding remains part of the later SEO phase; no new asset was introduced here.

### Related Logs

- **Errors:** ERR-20260826-07 (resolved), ERR-20260826-08 (resolved), ERR-20260825-11.
- **Tech debt:** None.

## TASK-20260826-04 — Switch Portfolio Typography to Plus Jakarta Sans and JetBrains Mono

- **Timestamp:** 2026-08-26T00:54:57+07:00
- **Status:** Complete
- **Request:** Use Plus Jakarta Sans for the portfolio and JetBrains Mono for numeric content.
- **Scope:** Global Next.js font loading, Tailwind font tokens, explicit footer numeric styling, typography source of truth, automated validation, and responsive browser QA.

### Summary

Replaced the global Geist pairing with Plus Jakarta Sans for body and headings and JetBrains Mono for numeric, benchmark, technical-tag, and code contexts. The existing `font-sans` and `font-mono` contracts remain intact, so all current routes and shadcn compositions inherit the new typography without call-site duplication.

### What Changed

- Replaced the `Geist` and `Geist_Mono` `next/font/google` loaders with `Plus_Jakarta_Sans` and `JetBrains_Mono` in `app/layout.tsx`.
- Repointed the centralized Tailwind `--font-sans` and `--font-mono` tokens to the new generated font variables.
- Applied the numeric font explicitly to the footer year; existing stats, benchmark values, technical labels, badges, and code already consume `font-mono`.
- Updated `docs/project-brief.md` so Plus Jakarta Sans plus JetBrains Mono is the current typography source of truth.

### Key Decisions

- **Decision:** Preserve the semantic `font-sans` and `font-mono` utility contracts while replacing their underlying families.
  - **Reasoning:** This updates the whole interface centrally, keeps shadcn and project compositions consistent, and avoids scattered font-family overrides.
  - **ADR:** Not required.
- **Decision:** Continue using JetBrains Mono for technical text and code in addition to numeric displays.
  - **Reasoning:** The user selected JetBrains Mono for numeric content, and the existing monospace contract intentionally groups benchmark values, technical tags, and code under one legible technical family.
  - **ADR:** Not required.

### Validation

- UI typography guidance search — Plus Jakarta Sans verified as a modern, professional portfolio/SaaS family; the requested pairing was applied without changing layout or color direction.
- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed; 5 files and 16 tests.
- `npx next build --webpack` — Passed with network access; all static routes and the generated project detail built successfully.
- Browser computed-style checks at 1440×900 and 390×844 — Passed; body and headings resolve to Plus Jakarta Sans, numeric stats and the footer year resolve to JetBrains Mono, and neither viewport has horizontal overflow.
- Desktop and mobile visual inspection — Passed; typography remains legible and the existing responsive hierarchy is preserved.
- Browser console — No application-origin warning or error; only the known extension-origin error from ERR-20260825-11 recurred.
- `git diff --check` — Passed.

### Current State

All current routes now inherit Plus Jakarta Sans through `font-sans`; numeric and other established technical monospace contexts inherit JetBrains Mono through `font-mono`. No dependency, lockfile, routing, content-schema, or public-copy change was introduced.

### Handoff Notes

Use `font-sans` for normal interface and editorial text. Use `font-mono` for explicit numeric displays, benchmarks, technical tags, and code so the centralized pairing remains consistent.

### Open Threads

- None.

### Related Logs

- **Errors:** ERR-20260826-06 (resolved), ERR-20260825-08 (workaround), ERR-20260825-11.
- **Tech debt:** None.

## TASK-20260826-03 — Migrate Site-Wide Visual and Action Primitives to shadcn

- **Timestamp:** 2026-08-26T00:40:56+07:00
- **Status:** Complete
- **Request:** Apply the shadcn-first visual/action primitive policy across the whole portfolio, not only Phase 04.
- **Scope:** Shared shell, Home, About, Contact, Projects regression coverage, shadcn Alert source, implementation contract, browser QA, and continuity logs.

### Summary

Migrated every eligible reusable visual/action primitive across the current public site to shadcn composition. Navigation, brand, skip, footer, hero, evidence, and contact actions now use Button; informational callouts use Alert; visual surfaces use Card; labels use Badge; and decorative dividers use Separator. Semantic document and inline-content elements remain native only where shadcn has no suitable equivalent.

### What Changed

- Added the official shadcn Alert source component without changing dependencies, the lockfile, or registry configuration.
- Added a centralized `brand` Button variant and migrated shared shell links, active navigation, skip link, homepage CTAs/evidence links, and contact destinations to `Button asChild` compositions.
- Migrated Home and About callouts to Alert, Home/About/Contact visual surfaces to full Card compositions, index labels to Badge, and shell/section dividers to Separator.
- Added component-slot regression assertions to the static-page and site-shell tests.
- Tightened `docs/project-brief.md` so future reusable visual/action primitives must use an appropriate shadcn component while semantic document structure remains native.

### Key Decisions

- **Decision:** Apply the rule to visual/action primitives, not to every emitted HTML element.
  - **Reasoning:** shadcn itself renders native semantic elements; replacing headings, paragraphs, lists, inline MDX links, blockquotes, or code blocks with unsuitable controls would reduce semantics and accessibility.
  - **ADR:** Not required.
- **Decision:** Keep Button customization in a named `brand` variant.
  - **Reasoning:** Shared brand treatment belongs in the shadcn primitive contract rather than repeated call-site class overrides.
  - **ADR:** Not required.

### Validation

- `npx shadcn@latest docs alert` — Passed; official Alert composition reviewed.
- `npx shadcn@latest add @shadcn/alert --dry-run` — Passed; one source file and no dependency changes proposed.
- `npx shadcn@latest add @shadcn/alert` — Passed; created `components/ui/alert.tsx` without manifest, lockfile, or registry-config changes.
- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed; 5 files and 16 tests.
- `npx next build --webpack` — Passed; all public routes built and the project detail fixture remained statically generated.
- Browser checks at 390×844 and 1440×900 — Passed across Home, About, Contact, Projects, and project detail; expected shadcn slots render, navigation state is correct, focus remains visible, and no horizontal overflow occurs.
- Browser console — No application-origin warning or error; only the known extension-origin error from ERR-20260825-11 recurred.
- Source audit — Remaining styled native surfaces are limited to MDX blockquote/code renderers; remaining native anchors are semantic children of `Button asChild` or inline content links.

### Current State

The whole current portfolio now follows the shadcn-first visual/action primitive policy, including the shared shell and all existing public routes. No dependency or public-route changes were introduced.

### Handoff Notes

For future UI, start from installed shadcn primitives and add registry components only through the approval-aware workflow. Preserve native HTML for semantic structure and inline document content when no suitable shadcn primitive exists.

### Open Threads

- None.

### Related Logs

- **Errors:** ERR-20260826-05 (resolved), ERR-20260825-11.
- **Tech debt:** None.

## TASK-20260826-02 — Align Phase 04 Visual Primitives with shadcn

- **Timestamp:** 2026-08-26T00:20:54+07:00
- **Status:** Complete
- **Request:** Use shadcn components consistently instead of hand-built native visual components.
- **Scope:** Phase 04 project card, stack badges, stat surface, section separators, action links, shadcn registry inspection, dependency-impact check, and continuity logs.

### Summary

Migrated all eligible Phase 04 visual primitives to official shadcn source components after explicit approval. Project cards now use the full Card composition, stack and stat labels use Badge, visual dividers use Separator, and the case-study CTA uses the existing Button with `asChild`. Semantic headings, articles, lists, links, and definition-list data remain native underneath the component system because they express document structure and accessibility rather than replaceable visual primitives.

### What Changed

- Added official `Card`, `Badge`, and `Separator` source files through the shadcn CLI; the approved command did not change `package.json`, `package-lock.json`, or `components.json`.
- Added a project-specific `technical` Badge variant so technical tags retain the repository's monospace design contract without scattered overrides.
- Reworked the project card around `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`; its CTA now composes `Button asChild` with Next.js `Link`.
- Reworked `StatBlock` as a shadcn Card while preserving ordered `<dl>/<dt>/<dd>` semantics.
- Replaced raw visual border dividers in the detail header and MDX section headings with shadcn Separator.

### Key Decisions

- **Decision:** Preserve semantic HTML underneath shadcn compositions rather than interpreting “no native components” literally.
  - **Reasoning:** shadcn components themselves render semantic native elements; headings, articles, lists, links, and definition lists remain necessary for accessibility. The requested constraint is applied to reusable visual primitives, not to removal of document semantics.
  - **ADR:** Not required.
- **Decision:** Add the official registry components only after the user explicitly approved the exact CLI action and possible manifest/lockfile impact.
  - **Reasoning:** This preserves the dependency approval boundary while keeping the components registry-traceable; inspection confirmed the command ultimately created only three source files.
  - **ADR:** Not required.

### Validation

- `npx shadcn@latest info --json` — Passed; Next.js 16, Tailwind v4, RSC, Radix base, and only `button` currently installed.
- Official shadcn docs for `card`, `badge`, and `separator` — Reviewed.
- `npx shadcn@latest add card badge separator --dry-run` — Passed; proposed three new UI source files and identified `radix-ui`, which is already installed.
- `npx shadcn@latest add @shadcn/card @shadcn/badge @shadcn/separator` — Passed after explicit approval; created three UI source files with no manifest or lockfile diff.
- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed; 5 files and 16 tests.
- `npx next build --webpack` — Passed; `/projects` remains static and `/projects/project-system-demo` remains prerendered through `generateStaticParams`.
- Browser checks at 390×844 and 1440×900 — Passed; shadcn Card, Badge, Button, and Separator slots render, no horizontal overflow occurs, the seven-section order and stat reading order remain correct, code stays contained, and focus retains its visible 3px technical-blue outline.
- Browser console — No application-origin warning or error; only the known extension-origin error from ERR-20260825-11 recurred.
- `git diff --check` — Passed.

### Current State

Phase 04 now follows the stricter shadcn-first component preference for every eligible visual primitive. Semantic document elements remain intentionally native because shadcn does not replace their meaning and itself renders native elements internally.

### Handoff Notes

Use shadcn primitives before introducing future project-specific visual markup. Preserve native semantic elements where they represent content structure, and add any missing registry component through the same approval-aware CLI workflow.

### Open Threads

- None.

### Related Logs

- **Errors:** ERR-20260826-03, ERR-20260826-04 (resolved), ERR-20260825-11.
- **Tech debt:** DEBT-20260826-02 (resolved).

## TASK-20260826-01 — Implement Phase 04 Project System

- **Timestamp:** 2026-08-26T00:12:17+07:00
- **Status:** Complete
- **Request:** Implement `docs/plannings/phase-04-project-system.md`.
- **Scope:** Project metadata and discovery, controlled MDX rendering, `/projects`, `/projects/[slug]`, static generation, draft and 404 behavior, stat blocks, fixtures, tests, browser QA, project status, and continuity logs.

### Summary

Implemented the Phase 04 project list and static detail system. Published content now passes a typed metadata contract and exact seven-section case-study contract before it can enter the public build; published routes are generated deterministically, while drafts and unknown slugs remain unavailable. A transparent implementation fixture exercises the surface without publishing the deferred OhMyPos narrative or unsupported metrics.

### What Changed

- Expanded `lib/mdx.ts` with validated metadata, deterministic discovery and ordering, duplicate-slug detection, draft filtering, constrained MDX validation, and published-project lookup.
- Added `/projects` cards and `/projects/[slug]` static detail generation with per-project metadata, `dynamicParams = false`, and explicit 404 behavior.
- Added a reusable semantic `StatBlock`, project card, and allowlisted MDX presentation components. Project links accept only root-relative or HTTPS destinations; external links receive `noopener noreferrer`.
- Replaced the Phase 02 smoke fixture with a transparent published template fixture and a valid non-public draft fixture. The published fixture explicitly makes no product benchmark or client claim.
- Added loader and route coverage for sorting, duplicates, drafts, missing and malformed slugs, seven-section order, safe evidence links, raw/unsupported MDX rejection, metadata, cards, static params, and stat semantics.
- Updated the project brief to record Phase 04 completion while preserving Phase 05 ownership of the real OhMyPos narrative.

### Key Decisions

- **Decision:** Enforce the content contract before MDX compilation with exact H2 order plus an allowlist containing only `StatBlock`; reject imports, exports, and raw JSX/HTML.
  - **Reasoning:** Repository-owned MDX remains expressive enough for the approved case-study format while malformed structure and an expanded execution/rendering boundary fail the build.
  - **ADR:** Not required; this implements the approved Phase 02 pipeline and Phase 04 plan without changing architecture.
- **Decision:** Keep `slug` canonical in metadata rather than deriving it from the filename.
  - **Reasoning:** This supports explicit schema validation and makes duplicate metadata slugs detectable across distinct files while still restricting public slugs to lowercase kebab case.
  - **ADR:** Not required.
- **Decision:** Publish only a plainly labeled implementation fixture in Phase 04.
  - **Reasoning:** The route and template need representative public rendering, but Phase 05 owns the approved OhMyPos case-study copy and no product result may be invented.
  - **ADR:** Not required.

### Validation

- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed; 5 files and 16 tests.
- `npx next build --webpack` — Passed; `/projects` is static and `/projects/project-system-demo` is prerendered through `generateStaticParams`.
- `git diff --check` — Passed.
- Browser checks at 390×844 and 1440×900 — Passed; index/detail have one H1, correct Projects active state, no horizontal overflow, exact seven-section order, contained code, ordered stat semantics, and three evidence-list items.
- Keyboard focus check — Passed; skip link is first in traversal with a visible 3px technical-blue outline.
- Unknown and draft route checks — Passed; unknown slug rendered the 404 surface and draft publication is excluded by loader and static-param tests.
- Browser console — No application-origin warnings or errors; the known extension-origin error recurred and remains tracked in ERR-20260825-11.

### Current State

Phase 04 is complete. `/projects` and the published fixture detail route work as static pages; draft, invalid, duplicate, and missing content are handled predictably. Real OhMyPos narrative, product metrics, demo/repository evidence links, search, filtering, pagination, CMS, and other projects remain out of scope.

### Handoff Notes

Phase 05 should replace the public implementation fixture with approved `ohmypos` content rather than relaxing the metadata or section validator. Preserve the metric context and public-destination evidence contract from `docs/project-brief.md`. Adding another MDX component requires updating both the component map and source allowlist deliberately.

### Open Threads

- Replace the transparent Phase 04 fixture when Phase 05 publishes the approved OhMyPos case study.

### Related Logs

- **Errors:** ERR-20260826-01, ERR-20260826-02, ERR-20260825-11.
- **Tech debt:** DEBT-20260826-01; DEBT-20260825-06 (resolved).

## TASK-20260825-07 — Publish Approved Contact and Resume Destinations

- **Timestamp:** 2026-08-25T23:43:36+07:00
- **Status:** Complete
- **Request:** Add the supplied public email, LinkedIn, GitHub profile, and CV PDF to the Phase 03 portfolio surfaces.
- **Scope:** Shared header/footer, Contact route, static-page and shell tests, public CV asset validation, authoritative product documents, and continuity logs.

### Summary

Published all four user-approved destinations. The header now includes a responsive Resume CTA that opens the repository-controlled two-page PDF without creating `/resume`; Contact exposes Email, LinkedIn, GitHub, and Resume; and the footer exposes the approved personal GitHub and LinkedIn profiles.

### What Changed

- Added a Resume CTA in `components/site-header.tsx` targeting `/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf` with accessible PDF/new-tab naming.
- Reworked the mobile header so visual and keyboard order remain aligned: brand, four-item primary navigation, then Resume. Desktop remains a single 65px row.
- Replaced temporary project-review links on `/contact` with the approved email, LinkedIn, personal GitHub, and Resume destinations.
- Replaced the project-repository footer link with approved personal GitHub and LinkedIn links.
- Updated shell and route tests for every exact destination.
- Superseded the unavailable-CV decision in `docs/phase-01-decision-packet.md`, updated `docs/project-brief.md`, reconciled the ignored local Phase 03 plan, and resolved DEBT-20260825-05.

### Key Decisions

- **Decision:** Link the public PDF directly rather than creating `/resume`.
  - **Reasoning:** This matches the supplied asset, the approved route boundary, and the intended new-tab document behavior without adding a new route.
  - **ADR:** Not required.
- **Decision:** Keep email in the current tab via `mailto:` while profile and PDF links use `_blank` with `noopener noreferrer` and explicit accessible naming.
  - **Reasoning:** The behavior matches each destination type and avoids falsely announcing a new tab for email.
  - **ADR:** Not required.

### Validation

- `file public/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf` — Passed; valid PDF 1.4 with two pages.
- Quick Look first-page preview and Chrome PDF viewer inspection — Passed; both pages and the page-two footer are legible with no visible clipping or overlap.
- Local PDF HTTP check — Passed; `HTTP 200`, `Content-Type: application/pdf`, and `Content-Length: 6281`.
- Personal GitHub HTTP check — Passed; `HTTP 200`.
- LinkedIn automated HTTP check — Limited; returned LinkedIn anti-bot `HTTP 999`, while the exact user-approved URL and rendered href contract passed.
- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed; 4 files and 12 tests.
- `npx next build --webpack` — Passed after the final responsive change; `/`, `/about`, and `/contact` remain statically generated.
- Browser checks at 390×844 and 1440×900 — Passed; no horizontal overflow, Contact has one H1 and correct active state, mobile header height is 133px, desktop header height is 65px, and DOM/visual link order is aligned.

### Current State

The approved public identity destinations are fully wired and tested. `/resume` remains absent; the Resume CTA and Contact entry serve the static PDF directly. Phase 04's `/projects` route remains the only planned navigation gap.

### Handoff Notes

Keep the current PDF filename stable unless every corresponding href, test, and decision record is updated together. Do not copy additional CV metrics into site copy without a separate evidence/copy review.

### Open Threads

- Phase 04 must resolve the existing `/projects` navigation gap tracked by DEBT-20260825-06.

### Related Logs

- **Errors:** ERR-20260825-15, ERR-20260825-16, ERR-20260825-17, ERR-20260825-18, ERR-20260825-19.
- **Tech debt:** DEBT-20260825-05 (resolved), DEBT-20260825-06.

## TASK-20260825-06 — Implement Phase 03 Layout Shell and Static Pages

- **Timestamp:** 2026-08-25T20:54:57+07:00
- **Status:** Complete
- **Request:** Implement `docs/plannings/phase-03-layout-shell-static-pages.md`.
- **Scope:** Root shell, responsive navigation, footer, Home, About, Contact, metadata, accessibility states, route/component tests, Phase 03 planning reconciliation, and continuity logs.

### Summary

Implemented the Phase 03 shared shell and three static routes using only approved public evidence. The result is a responsive, dark-first, evidence-led portfolio surface with a sticky four-item navigation, skip link, active states, verified OhMyPos links and exact metric wording, and no Resume/CV route or CTA.

### What Changed

- Rebuilt `app/layout.tsx` around a shared sticky header, keyboard-visible skip link, content region, footer, metadata title template, and existing Geist theme.
- Replaced the foundation smoke page with an evidence-led Home route and approved OhMyPos concurrency result presented as a scannable stat ledger.
- Added `/about` and `/contact` as statically rendered routes; both avoid unsupported biography/contact claims and use only evidence already approved for publication.
- Added shared page-container, navigation, header, and footer components. The only client boundary is active-route detection in `PrimaryNav`; mobile navigation is CSS-responsive.
- Added five route smoke tests and two shell/navigation tests, bringing the suite to 12 tests.
- Reconciled the Phase 03 plan with the Phase 01 `Unavailable` CV decision and corrected the stale Phase 02 status in the project brief.

### Key Decisions

- **Decision:** Treat the Phase 01 packet as authoritative and omit Resume/CV, direct email, and LinkedIn destinations that are not approved.
  - **Reasoning:** This implements the largest safe Phase 03 surface without fabricating personal details or rendering broken placeholder links.
  - **ADR:** Not required.
- **Decision:** Use a CSS-responsive four-item navigation with one narrow active-route client component.
  - **Reasoning:** Four short labels remain usable without menu state, reducing interaction complexity while preserving route awareness and keyboard access.
  - **ADR:** Not required.

### Validation

- `npm run lint` — Passed.
- `npm run typecheck` — Passed.
- `npm test` — Passed; 4 files and 12 tests.
- `npm run build` — Environment-blocked by the known Turbopack internal port-binding restriction tracked in ERR-20260825-08.
- `npx next build --webpack` — Passed; compiled, type-checked, and statically generated `/`, `/about`, and `/contact` with no `/resume` route.
- Browser checks at 390×844, 768×1024, and 1440×900 — Passed; no horizontal overflow, correct active route, one H1 per route, sticky header, exact approved metric copy, and valid external-link attributes.
- Keyboard and accessibility inspection — Passed; skip link is first in traversal, visible when focused, targets `#main-content`, and uses the approved 3px technical-blue focus indicator. Reduced-motion CSS is present.
- Browser console — No application-origin warnings or errors; the recurring Chrome-extension error remains tracked in ERR-20260825-11.
- `/resume` direct browser request — Passed; returned the Next.js 404 surface and no rendered link points to `/resume`.

### Current State

Phase 03 is complete within the currently approved publication boundary. Home, About, and Contact render through the shared shell. Direct email, LinkedIn, CV, `/resume`, and project-index content remain absent; `/projects` is the approved next-phase navigation destination and will return 404 until Phase 04 implements it.

### Handoff Notes

Do not replace the project-oriented Contact links with guessed personal destinations. When approved email, LinkedIn, personal GitHub, or CV destinations become available, update Contact/footer and revisit the CV omission. Phase 04 should implement `/projects` without changing the current navigation URL.

### Open Threads

- Approved personal email, LinkedIn, personal GitHub, and CV destinations remain future content inputs.
- Phase 04 must resolve the intentional `/projects` navigation gap.

### Related Logs

- **Errors:** ERR-20260825-08, ERR-20260825-11, ERR-20260825-13, ERR-20260825-14.
- **Tech debt:** DEBT-20260825-03, DEBT-20260825-04, DEBT-20260825-05, DEBT-20260825-06.

## TASK-20260825-05 — Implement Phase 02 Foundation Scaffold

- **Timestamp:** 2026-08-25T20:26:29+07:00
- **Status:** Complete
- **Request:** Continue to Phase 02 foundation and scaffold work.
- **Scope:** Current-runtime inspection, exact dependency compatibility research, package-manager and implementation recommendation, generated-file impact, validation plan, and approval gate.

### Summary

Completed the approved Phase 02 foundation: Next.js App Router, amended compatible exact dependencies, one lockfile, Tailwind theme tokens, Geist fonts, shadcn-compatible Button, controlled MDX loader, required directory skeleton, and focused tests. Lint, type-check, tests, audit, Webpack production build, and mobile/desktop visual checks pass.

### What Changed

- Added `docs/phase-02-approval-packet.md` with exact production and development dependency versions, purposes, transitive implications, install commands, generated-file inventory, implementation boundaries, scripts, validation plan, and a compact approval block.
- Queried current npm registry metadata and compatibility constraints against the local Node.js 24.19.0 and npm 11.17.0 runtime.
- Preserved all existing governance, product, evidence, and Phase 01 documents.
- Added the approved npm manifest and lockfile, Next.js/TypeScript/ESLint/PostCSS/Vitest configuration, root App Router smoke surface, centralized dark-first theme, official-shape shadcn Button, controlled MDX fixture/loader, and seven foundation tests.
- Added `public/.gitkeep` so the approved public-assets directory exists without introducing an unapproved asset.
- Disabled Next.js 16 automatic agent-rule generation after the first dev-server start appended a managed block to `AGENTS.md`; removed only that generated block and preserved the original governance content.
- Renamed the Vitest configuration to `.mts` to eliminate its module-loader warning without changing test behavior or dependencies.

### Key Decisions

- **Decision:** Recommend npm with one `package-lock.json`.
  - **Reasoning:** It matches the repository's planned command convention, is already available locally, and avoids creating competing lockfiles.
  - **ADR:** Not required.
- **Decision:** Recommend `next-mdx-remote/rsc` with a filesystem-constrained loader.
  - **Reasoning:** It supports future dynamic project slugs without a manual import registry while keeping the code-execution boundary restricted to repository-controlled MDX.
  - **ADR:** Not required.
- **Decision:** Configure shadcn manually from the current official registry shape instead of installing or executing its CLI.
  - **Reasoning:** This produces the required open-code Button primitive and configuration without pulling a large CLI-only transitive tree or risking generator overwrite in the non-empty repository.
  - **ADR:** Not required.
- **Decision:** Replace TypeScript 7.0.2 with exact TypeScript 6.0.3 after explicit approval.
  - **Reasoning:** The installed `typescript-eslint` hard-fails on TypeScript 7 and declares support only below 6.1; 6.0.3 is the newest compatible 6.x release inspected.
  - **ADR:** Not required.
- **Decision:** Replace ESLint 10.9.1 with exact ESLint 9.39.5 after explicit approval.
  - **Reasoning:** Once TypeScript was corrected, lint exposed that three transitive Next.js plugins only support ESLint through version 9; 9.39.5 is the newest compatible 9.x release inspected.
  - **ADR:** Not required.

### Validation

- Workspace and package-manager inspection — Passed; Node.js 24.19.0/npm 11.17.0 are available and exactly one `package-lock.json` now exists.
- npm registry version lookup — Passed for all proposed exact dependencies.
- `npm ls --depth=0` — Passed; all approved top-level versions are installed exactly.
- `npm audit --json` — Passed after network-enabled retry; 0 vulnerabilities across 747 dependencies reported by npm.
- Official shadcn Button registry inspection — Passed; current `new-york-v4` Button uses `radix-ui`, `class-variance-authority`, and the standard `cn()` utility.
- `npm run typecheck` — Passed before and after the approved TypeScript 6.0.3 amendment.
- `npm test` — Passed; 2 files and 7 tests, with no remaining module-loader warning.
- `npm run lint` — Passed after the two explicitly approved compatibility amendments.
- `npm run build` — Environment-blocked: sandbox font fetch failed, then Turbopack could not bind an internal port even with network access.
- `npx next build --webpack` — Passed both before and after the TypeScript amendment; compiled, type-checked, generated 3/3 static pages, and emitted `/` plus `/_not-found`.
- Browser smoke check at 390×844 and 1440×900 — Passed; semantic region/heading/link present, no horizontal overflow, English document language, one H1, and visible `3px` technical-blue keyboard focus ring.
- Browser console — No application warnings or errors; two captured errors originated from a Chrome extension URL and not localhost.

### Current State

The approved Phase 02 foundation is complete and operational. No Phase 03 route or design, `/resume`, external service, deployment setting, or unsupported claim was introduced. ESLint 9.39.5's unsupported-release warning remains transparently tracked as technical debt.

### Handoff Notes

Phase 03 is a separate scoped implementation phase and should not begin without a new user request. Keep the TypeScript and ESLint pins until their dependent Next.js lint graph supports newer releases, then use a separately approved dependency update.

### Open Threads

- None.

### Related Logs

- **Errors:** ERR-20260825-05, ERR-20260825-06, ERR-20260825-07, ERR-20260825-08, ERR-20260825-09, ERR-20260825-10, ERR-20260825-11, ERR-20260825-12.
- **Tech debt:** DEBT-20260825-01 (pre-existing and unchanged), DEBT-20260825-02.

## TASK-20260825-04 — Prepare Phase 01 Decision Packet

- **Timestamp:** 2026-08-25T19:16:34+07:00
- **Status:** Complete
- **Request:** Execute the Phase 01 open-decisions plan.
- **Scope:** Accent-system evidence, CV and OhMyPos publication inputs, metric evidence contract, approval record, and continuity logs.

### Summary

Completed the Phase 01 decision record after receiving explicit user input. Technical blue, the unavailable CV state, five public OhMyPos destinations, one concurrency/correctness metric, and its exact public copy are approved and recorded. Phase 02 remains blocked by the user's explicit `No` authorization decision.

### What Changed

- Added and finalized `docs/phase-01-decision-packet.md` with the approved accent tokens, CV behavior, verified links, normalized metric contract, exact copy boundaries, and final decision statuses.
- Updated `docs/project-brief.md` so later implementation has an authoritative accent system, omits the unavailable Resume/CV CTA, uses only the approved OhMyPos links and wording, and preserves the Phase 02 block.
- Excluded the originally supplied public case-study path after verification returned `HTTP 404`; after the user pasted `docs/ohmypos-case-study.md`, verified its concurrency statement and recorded the local copy as supporting evidence rather than a public destination.
- Recorded Git, public-fetch, and evidence-path validation errors in the error log.

### Key Decisions

- **Decision:** Record the user's technical-blue selection with default/focus, hover, and pressed tokens.
  - **Reasoning:** The selected family preserves conventional link/action semantics for fast-scanning hiring teams, leaves green available for status semantics, and all three approved state colors pass the planned contrast thresholds.
  - **ADR:** Not required.
- **Decision:** Approve only the user-supplied URLs and quantitative wording that passed public evidence verification.
  - **Reasoning:** This makes the publication boundary explicit while preventing fabricated claims or accidental exposure of private artifacts.
  - **ADR:** Not required.
- **Decision:** Treat `Unavailable` as the resolved CV state and omit the CTA.
  - **Reasoning:** Rendering a nonfunctional or guessed Resume/CV link would violate the approved public-destination boundary.
  - **ADR:** Not required.
- **Decision:** Record but do not act beyond Phase 01 after the user selected `Proceed to Phase 02: No`.
  - **Reasoning:** Phase 02 scaffolding and dependency work has a separate explicit approval gate.
  - **ADR:** Not required.

### Validation

- WCAG relative-luminance calculation for 18 accent/background pairs — Passed; every ratio exceeds `4.5:1`.
- Decision-packet completeness review against all seven Phase 01 implementation steps — Passed.
- Logged-out HTTP reachability checks — Passed for the live demo, repository, PRD, ADR, docs directory, test suite, task log, and debt log; all returned `HTTP 200`. The demo resolved publicly to `/login?next=%2F`.
- Metric evidence cross-check — Passed; the B4 test assertions, TASK-065 execution record, and DEBT-007 result note support the approved correctness claim and its stated boundaries.
- Supplied public case-study evidence path — Failed with `HTTP 404`; the subsequently pasted local `docs/ohmypos-case-study.md` was inspected and passed a focused content cross-check for the approved settlement claim.
- Local case-study technical-evidence links — Failed; all six retain paths relative to the source OhMyPos repository and do not resolve in the portfolio repository.
- `git status --short` — Failed; this workspace is not currently exposed as a Git worktree.
- Application lint, tests, and build — Not run; Phase 01 forbids application implementation and no application/package scripts exist.

### Current State

Phase 01 decisions are complete and reflected in the project brief. No application code, dependency, deployment configuration, or external content was changed. Phase 02 remains blocked because the user explicitly declined authorization to proceed.

### Handoff Notes

The approved metric is a bounded concurrency/correctness result, not a latency, throughput, scalability, or production-traffic claim. The original public case-study path does not exist on OhMyPos `main`; the pasted local copy supports the claim but is not an approved public destination. Its six source-repository-relative links remain broken in this repository. Do not start Phase 02 without a new explicit approval.

### Open Threads

- A future public CV destination requires separate approval before displaying the CTA.
- Phase 02 requires new explicit authorization from the user.

### Related Logs

- **Errors:** ERR-20260825-02, ERR-20260825-03, ERR-20260825-04.
- **Tech debt:** DEBT-20260825-01.

## TASK-20260825-03 — Split Planning by Phase

- **Timestamp:** 2026-08-25T18:51:39+07:00
- **Status:** Complete
- **Request:** Store each of the eight implementation phases in its own standalone planning file instead of one combined document.
- **Scope:** Local-only planning-document organization.

### Summary

Replaced the combined planning structure with eight standalone documents, each containing exactly one phase and enough prerequisite, boundary, risk, execution, testing, and completion context to be used independently.

### What Changed

- Removed the obsolete combined planning document.
- Created exactly eight standalone phase documents.
- Preserved all required approval gates, evidence restrictions, phase dependencies, validation expectations, and deployment boundaries.
- Kept continuity logs free of links and paths to ignored planning artifacts.

### Key Decisions

- **Decision:** Each phase is now a self-contained execution contract rather than a section in a master document.
  - **Reasoning:** This directly matches the requested one-phase-per-file organization and lets a future executor load only the relevant phase.
  - **ADR:** Not required.

### Validation

- Planning-file count — Passed; exactly eight files.
- One-phase-per-file heading check — Passed.
- Required eight-section check per file — Passed.
- Combined-document absence check — Passed.
- Trailing-whitespace and continuity-log reference checks — Passed.
- Application lint, tests, and build — Not run because this changes ignored planning documentation only.

### Current State

All eight phase plans are separated and ready for review. No application code or gated external action was performed.

### Handoff Notes

Load only the phase being executed, plus its explicitly named prerequisites and repository governance. Phase 1 remains the first hard approval gate.

### Open Threads

- Phase 1 decisions still require explicit user input before implementation starts.

### Related Logs

- **Errors:** None.
- **Tech debt:** None.

## TASK-20260825-02 — Plan the Portfolio Delivery Phases

- **Timestamp:** 2026-08-25T18:45:36+07:00
- **Status:** Complete
- **Request:** Produce an implementation plan for all eight portfolio delivery phases and keep the planning artifact local-only.
- **Scope:** Repository ignore configuration and the requested local planning deliverable.

### Summary

Prepared a single master execution plan covering all eight phases, their dependencies, approval gates, blast radius, sequenced steps, risks, testing strategy, and phase-specific completion criteria. Added an ignore rule so the local planning directory is excluded from version control.

### What Changed

- Added one repository ignore rule for the local planning directory.
- Prepared eight independently executable phase contracts in one master document so cross-phase prerequisites remain explicit.
- Kept continuity logs free of links and file paths to the ignored planning artifact as requested.

### Key Decisions

- **Decision:** Use one master plan rather than eight disconnected documents.
  - **Reasoning:** It preserves the dependency chain and gate transitions without duplicating global constraints, while every phase still has a complete planning structure.
  - **ADR:** Not required.
- **Decision:** Interpret the truncated final instruction as prohibiting publication of unverified, incomplete, or placeholder project data.
  - **Reasoning:** This matches the repository's existing evidence rules and the stated Phase 8 workflow.
  - **ADR:** Not required.

### Validation

- Phase and required-section count checks — Passed; all eight phases contain all eight planning sections.
- Approval-gate and scope-boundary checks — Passed.
- Markdown code-fence and trailing-whitespace checks — Passed.
- Continuity-log reference scan inside the planning artifact — Passed; none found.
- Ignore-rule syntax check — Passed.
- Application lint, tests, and build — Not run because this task creates planning documentation only and no `package.json` exists.

### Current State

Planning is complete; no application code, dependencies, deployment configuration, DNS, or analytics were changed. Phase 1 remains the first execution gate.

### Handoff Notes

Do not treat approval of the plan as authorization to perform gated work. Resolve Phase 1 evidence and design decisions explicitly before requesting the single Phase 2 scaffold/dependency approval.

### Open Threads

- Phase 1 decisions remain unresolved and require user input before implementation begins.

### Related Logs

- **Errors:** None.
- **Tech debt:** None.

## TASK-20260825-01 — Establish Mandatory Continuity Logs

- **Timestamp:** 2026-08-25T18:36:36+07:00
- **Status:** Complete
- **Request:** Require task handoffs and error/technical-debt logging, with reusable documentation templates.
- **Scope:** `AGENTS.md` and continuity logs under `docs/`.

### Summary

Added enforceable end-of-task logging rules and initialized task, error, and technical-debt logs with stable IDs, cross-references, and reusable templates.

### What Changed

- Added mandatory logging workflow, naming rules, completion criteria, and log references to `AGENTS.md`.
- Added templates to `docs/task-log.md`, `docs/error-log.md`, and `docs/tech-debt-log.md`.
- Standardized all governance and template references on `docs/tech-debt-log.md`; the initially observed empty typo path `docs/tech-debt-og.md` is no longer present.

### Key Decisions

- **Decision:** Use three append-oriented Markdown files with newest entries first.
  - **Reasoning:** Separate concerns while keeping handoff discovery simple and repository-local.
  - **ADR:** Not required.
- **Decision:** Log maintenance does not recursively create another task-log obligation.
  - **Reasoning:** Prevents an infinite bookkeeping loop while preserving the mandatory handoff.
  - **ADR:** Not required.

### Validation

- Markdown structure, code-fence balance, required rule phrases, expected file paths, and trailing whitespace — Passed.
- Application lint, tests, and build — Not run because this task changes documentation only and no `package.json` exists.

### Current State

The log system is initialized and ready for subsequent agents. No application implementation exists in the current workspace.

### Handoff Notes

Add one task entry before ending every future task. Record all encountered execution/validation/runtime errors even when resolved, and record discovered debt without expanding scope to fix it automatically.

### Open Threads

- None.

### Related Logs

- **Errors:** ERR-20260825-01.
- **Tech debt:** None.
