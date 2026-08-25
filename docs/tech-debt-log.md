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
