# Repository Governance: Portfolio Website

This repository is a single-developer technical portfolio for European hiring teams that sponsor work visas or Blue Cards. Optimize for technical credibility, verifiable system impact, accessibility, and fast scanning.

This file governs how coding agents work in this repository. `docs/project-brief.md` is the product and content source of truth. If it conflicts with this file, follow this file for agent behavior and safety, then stop and ask the user to resolve any product conflict that would materially change the result.

## Instruction Precedence

Apply instructions in this order:

1. Platform/system safety requirements.
2. The user's explicit request for the current task.
3. This `AGENTS.md`.
4. Approved architecture decisions and `docs/project-brief.md`.
5. Existing code, tests, and repository conventions.

Do not use a lower-priority source to override a higher-priority rule. If two applicable instructions at the same level conflict, or the requested outcome remains materially ambiguous after inspecting the repository, stop and ask. Never infer approval from silence, an old approval, or a broad request when the specific gated action was not named.

## Stack and Target Architecture

- **Framework:** Next.js App Router with TypeScript.
- **UI:** shadcn/ui primitives and project-specific compositions.
- **Styling:** Tailwind CSS with centralized CSS-variable theme tokens.
- **Content:** MDX files under `content/projects/*.mdx`.
- **Deployment:** Vercel.

The following is the target structure, not proof that every path already exists. Verify the current repository before relying on a file, script, dependency, or route.

```text
app/
├── page.tsx
├── about/page.tsx
├── projects/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── contact/page.tsx
└── resume/page.tsx           # Optional; implement only when requested or approved
content/
└── projects/*.mdx
components/
├── ui/                       # shadcn/ui primitives
└── ...                       # Project-specific compositions
docs/
├── project-brief.md
├── task-log.md
├── error-log.md
└── tech-debt-log.md
```

Do not introduce a second content format, Pages Router, CMS, database, API layer, authentication, analytics provider, or internationalization system without explicit approval.

## Scope and Change Control

- Make the smallest coherent change that satisfies the request.
- Inspect task-relevant files, imports, tests, configuration, and documentation before editing. Exploration must be proportional: do not scan the whole repository for a localized change unless dependency tracing makes it necessary.
- Preserve existing behavior and public routes unless the task explicitly changes them.
- Do not perform unrelated refactors, cleanup, dependency upgrades, formatting sweeps, or fixes. Report unrelated findings separately.
- Follow existing patterns when they are compatible with this file. Do not create speculative abstractions, configuration, extension points, or reusable components for a single hypothetical future use.
- Update tests and documentation only when the requested change affects them.
- Treat `/resume`, Indonesian localization, new project categories, and new top-level routes as product-scope decisions that require explicit approval unless directly requested.

## Approval Gates

### Allowed Without Additional Approval

Within the user's requested scope, an agent may:

- Read repository files and run non-destructive inspection commands.
- Edit existing application, content, test, and documentation files.
- Create task-scoped application, content, component, test, or documentation files that follow the approved architecture and use only installed dependencies.
- Add a small task-specific component or test using already-installed dependencies.
- Run existing local lint, type-check, test, build, and formatting scripts.
- Fix failures directly caused by the current change.
- Maintain the required project logs described below.

### Requires Explicit Approval Before Acting

- Adding, removing, replacing, or upgrading a dependency or lockfile-resolved package.
- Changing foundational architecture, routing strategy, content format/schema, or public URL structure.
- Adding a CMS, database, persistence, API/route handler, server action with side effects, authentication, analytics, tracking, external service, or new environment variable.
- Making a breaking public interface or content-schema change.
- Changing security controls, headers, secret handling, deployment configuration, DNS, domains, or Vercel settings.
- Performing a large refactor, repository-wide rewrite, or change outside the requested scope.
- Creating or changing CI/CD workflows, infrastructure, or release configuration.
- Committing, amending, rebasing, tagging, pushing, opening a pull request, publishing, or deploying.
- Running destructive filesystem, Git, database, cloud, or production operations.

Approval must name or clearly encompass the specific action. Approval to implement code is not approval to install packages, push, deploy, or perform another gated action.

### Forbidden

- Never fabricate or embellish metrics, benchmarks, employers, dates, responsibilities, testimonials, repository links, technical evidence, or project outcomes.
- Never expose, log, commit, or place secrets, tokens, private keys, production data, or unnecessary personal data in output or repository files.
- Never disable tests, lint rules, type checks, accessibility safeguards, or security controls merely to make validation pass.
- Never hide failures, delete user work, or claim that an unperformed check passed.

## Planning and Execution

For a small, localized, reversible change, inspect the relevant context and proceed directly. For a change that is cross-cutting, foundational, ambiguous, or subject to an approval gate:

1. State the intended outcome and relevant assumptions.
2. Identify affected routes, components, content, configuration, and tests.
3. Present genuinely different viable options when a material design choice exists, including trade-offs and a recommendation.
4. Identify risks and the validation plan.
5. Obtain explicit approval before editing or performing the gated action.

If inspection reveals that the documented architecture does not match the repository, follow the implemented architecture for a localized task. Stop for approval if reconciliation would change architecture, public behavior, or task scope.

## Content and Evidence

- Public-facing portfolio copy, code comments, and case studies must be in English. Conversation with the user and internal planning documents may use the user's language. Do not add an Indonesian public-content toggle unless approved.
- Use a technical, precise, concise tone. Avoid unsupported words such as “scalable,” “high-performance,” or “production-ready.”
- Every quantitative claim must be traceable to user-provided evidence or a reproducible benchmark. Preserve the measurement context, such as workload, environment, sample size, percentile, and date, when available.
- If evidence is missing, use an explicit placeholder such as `[METRIC REQUIRED]` or ask the user; do not estimate a plausible number.
- Project cards should lead with a verified result when available. If no verified metric exists, use a factual non-quantified hook rather than inventing one.
- Every project detail page must follow this order:
  1. Hook
  2. Problem
  3. Key Decisions & Trade-offs
  4. Measured Results
  5. What This Demonstrates
  6. Limitations & Next Steps
  7. Technical Evidence
- Links must point to real, intended public destinations. Do not expose private repositories or documents.

## UI and Implementation Standards

- Use a dark-first theme with near-black tokens such as `#0a0a0a` or `#0f0f0f`, not flat `#000000` as the main background.
- Define theme colors and spacing in the existing central token system; do not scatter repeated hard-coded values through components.
- Use one accent color consistently for primary actions and highlighted metrics. If no approved accent token exists, present options and obtain approval before selecting one.
- Prefer Geist for body and headings when the project has not already selected a font. Use monospace for code, technical tags, and numeric benchmark displays.
- Prefer an existing shadcn/ui primitive when it matches the required semantics and behavior. Native semantic HTML and small project-specific compositions are allowed; do not force an unsuitable primitive.
- Use Tailwind utilities. Only `globals.css` may contain global theme tokens, resets, and rules that cannot reasonably be expressed as utilities. Do not add standalone component CSS files.
- Prefer Server Components. Add `"use client"` only where browser APIs, state, or event handlers require it, and keep the client boundary narrow.
- Motion must be subtle, purposeful, respect `prefers-reduced-motion`, and should use existing CSS or installed capabilities. A new motion dependency requires approval.
- Preserve semantic HTML, keyboard access, visible focus, sufficient contrast, descriptive link text, useful image alternatives, and responsive behavior.

## Security and External Boundaries

- Treat MDX and external content as untrusted unless its source and compilation path are controlled. Do not introduce arbitrary runtime code execution from content.
- Validate and minimize any user input before it crosses a server or external-service boundary.
- Use environment variables for secrets and document variable names with placeholders only; never write real values into examples.
- Do not access production systems, private accounts, external dashboards, or third-party services unless the user explicitly requests and authorizes that action.

## Validation

Run the checks that exist and are applicable to the changed surface:

| Change type | Required validation |
|---|---|
| Documentation or isolated copy | Review diff; verify language, claims, links, and formatting. Run content checks if provided. |
| TypeScript, component, or route | Lint, type-check if a script exists, relevant tests, and production build. |
| UI, styling, or interaction | Above checks plus visual inspection at representative mobile and desktop widths; verify keyboard focus and reduced-motion behavior where affected. |
| Content loader, MDX schema, routing, or configuration | Relevant tests, lint, type-check, production build, and affected-route/link verification. |
| Dependency or infrastructure change | Only after approval; run the broadest relevant validation and inspect generated/configuration diffs. |

Use repository-defined scripts and its detected package manager. Do not assume a command exists. Typical scripts, when present, are:

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

Do not start a long-running development server unless it is needed for requested or applicable browser validation. Never describe checks as passed unless they completed successfully in the current working state.

## Failure Handling

- If a required command or tool is missing, do not invent a substitute result. Report what is missing and use the safest available validation.
- If a check fails because of the current change, investigate and fix it before completion.
- If a failure appears pre-existing, verify that with focused evidence where practical, avoid altering unrelated code, and report the exact failure and its impact.
- If requirements conflict, evidence for a claim is missing, or a safe solution requires a gated action, stop and request direction.
- Do not weaken the implementation or validation standard merely because the environment is unavailable. State what remains unverified.

## Mandatory Project Logs

Use these append-oriented continuity logs:

- `docs/task-log.md` — one handoff entry for every completed, partially completed, or blocked task.
- `docs/error-log.md` — every error encountered during execution, validation, or runtime, including errors resolved in the same task.
- `docs/tech-debt-log.md` — every discovered or intentionally introduced technical debt item, whether fixed immediately or deferred.

At the start of a task, read only the latest task entries and open error/debt items relevant to the requested area. Do not read the full history unless needed.

Before ending a task:

1. Add one entry to `docs/task-log.md` using its template. State the resulting behavior, key decisions and reasoning, affected files, validation evidence, current state, and next-session notes.
2. Reference related error IDs and tech-debt IDs, or write `None` explicitly.
3. Add every encountered error to `docs/error-log.md` using its template. Record the actual symptom, root cause when known, resolution or workaround, reasoning, and residual risk. A resolved error remains in the log. Harmless exploratory no-match results need not be logged unless they were unexpected or affected the task.
4. Add every discovered or introduced debt item to `docs/tech-debt-log.md` using its template. Do not fix out-of-scope debt merely because it was logged.
5. Update an existing error or debt entry instead of creating a duplicate when the same underlying item already exists. Preserve its original ID and history.

Use IDs `TASK-YYYYMMDD-NN`, `ERR-YYYYMMDD-NN`, and `DEBT-YYYYMMDD-NN`, incrementing `NN` for that date by scanning the corresponding file. Insert new entries directly below the `Entries` heading so the newest item appears first. Use ISO 8601 timestamps with timezone. Never include secrets, credentials, production data, or unnecessary personal data in a log.

Log maintenance is part of the task being recorded and does not create another recursive logging task. A task is not complete until the required log updates are written.

## Git and Destructive Operations

- Treat existing modified and untracked files as user work. Preserve them and do not overwrite, revert, stage, or include them unless the task requires it.
- Read-only Git inspection is allowed. Commits, pushes, branch changes, PR actions, tags, releases, deployments, rebases, resets, clean operations, and history rewrites require explicit approval.
- Prefer reversible operations. Before any authorized destructive action, resolve and report the exact target and expected impact.

## Definition of Done

A task is complete only when:

- The requested outcome is implemented without unapproved scope expansion.
- Applicable validation has passed, or every unavailable/pre-existing failure is clearly disclosed.
- No unsupported portfolio claim or unintended public-content change was introduced.
- Affected tests and documentation are updated where necessary.
- The final diff contains no known unrelated or accidental changes.
- The task log is updated, and every encountered error or identified tech debt is recorded in the corresponding log.

The completion report must concisely include:

- What changed and why.
- Important files or routes affected.
- Validation commands/checks performed and their results.
- Task, error, and tech-debt log IDs created or updated.
- Known limitations, skipped checks, and unresolved issues.
