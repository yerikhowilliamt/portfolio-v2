# Phase 05 OhMyPos Claim-to-Evidence Checklist

## Purpose

This checklist maps every public OhMyPos claim introduced in Phase 05 to the approval record. It is an internal publication gate, not an additional public evidence destination.

## Approved Claim Set

| Public claim or field | Approval and evidence | Publication boundary | Status |
|---|---|---|---|
| Project summary | `docs/phase-01-decision-packet.md`, approved fallback hook | Use the approved sentence without broader product or scale claims. | Ready |
| Project-card hook | `docs/phase-01-decision-packet.md`, approved metric copy | Exact bounded wording: 30 requests, 15 successes, 15 conflicts, Rp0.00, zero server errors. | Ready |
| Settlement workload | Approved metric scenario and method | One Rp300,000.00 payable; 30 authenticated OWNER requests of Rp20,000.00. | Ready |
| Settlement outcome | Approved metric and public B4 test | 15 HTTP 201, 15 HTTP 409, zero 5xx, final Rp0.00 and `SETTLED`. | Ready |
| Database outcome | Approved metric and public B4 test | 15 settlement rows and 15 `PAYABLE_SETTLEMENT` ledger entries totaling Rp300,000.00. | Ready |
| Locking decision | Approved scenario | Pessimistic `SELECT ... FOR UPDATE` protection; do not generalize to unrelated write paths. | Ready |
| Harness method | Approved method | `settleAllChunked` size five with `Promise.allSettled`; state why this narrows the claim. | Ready |
| Environment and date | Approved environment and date | Preserve framework/database versions, loopback TCP, default Read Committed isolation, and the 2026-08-22 date. Do not infer hardware or exact Node.js version. | Ready |
| Demonstrated ability | Directly bounded by the approved method and assertions | Describe invariant definition and verification, not production scale or business impact. | Ready |
| Limitations | Approved copy boundary and missing environment fields | Explicitly exclude latency, throughput, scalability, production traffic, hardware comparison, and unrestricted 30-connection concurrency. | Ready |
| Public destinations | Phase 01 publication inventory | Use only the approved demo, repository, PRD, ADR, docs, B4 test, TASK-065, and DEBT-007 URLs. | Ready |

## Excluded Draft Claims

The local `docs/ohmypos-case-study.md` also contains report benchmarks, latency percentiles, test-suite totals, deadlock findings, and broader architectural descriptions. They are not published in Phase 05 because the Phase 01 packet did not approve them for public copy.

## Verification Record

- All eight approved public destinations returned HTTP 200 on 2026-08-26. The live demo resolved to its public login entry point.
- `content/projects/ohmypos.mdx` contains no `[... REQUIRED]` placeholder.
- `content/projects/project-system-demo.mdx` is draft-only after the real case study becomes the public project entry.

## User-Supplied Visual Evidence

The user supplied 13 OhMyPos interface screenshots under `docs/portfolio-screenshots/ohmypos/` on 2026-08-27 for portfolio use. Phase 05 publishes three views that provide clear system context without exposing the account names and email addresses visible in the RBAC screenshot:

- `03-pos-active-cart.png` — primary visual on Home, Projects, and the case-study gallery.
- `02-dashboard-overview.png` — secondary gallery view.
- `11-master-data-products.png` — secondary gallery view.

Captions describe only visible interface structure. Numeric values inside screenshots are not restated as measured portfolio outcomes.
