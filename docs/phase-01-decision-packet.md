# Phase 01 Decision Packet

## Purpose

This packet records the product and evidence decisions approved on 2026-08-25. It does not authorize application scaffolding, dependency installation, publication, deployment, or new benchmarking. The user explicitly declined authorization to proceed to Phase 02.

## 1. Accent System

Contrast ratios below were calculated with the WCAG relative-luminance formula against both planned near-black background candidates. Each listed accent passes WCAG AA for normal text (minimum `4.5:1`) and non-text focus indicators or component boundaries (minimum `3:1`) when used as a solid color against either background. Near-black text on a solid accent fill has the same ratio as the corresponding accent-on-background pairing.

| Direction | Role | Token candidate | On `#0a0a0a` | On `#0f0f0f` |
|---|---|---:|---:|---:|
| Technical blue | Default / focus | `#60a5fa` | `7.79:1` | `7.54:1` |
| Technical blue | Hover | `#93c5fd` | `10.98:1` | `10.63:1` |
| Technical blue | Pressed | `#3b82f6` | `5.38:1` | `5.21:1` |
| Cyan | Default / focus | `#22d3ee` | `10.96:1` | `10.61:1` |
| Cyan | Hover | `#67e8f9` | `13.66:1` | `13.22:1` |
| Cyan | Pressed | `#06b6d4` | `8.15:1` | `7.90:1` |
| Emerald | Default / focus | `#34d399` | `10.30:1` | `9.97:1` |
| Emerald | Hover | `#6ee7b7` | `12.99:1` | `12.58:1` |
| Emerald | Pressed | `#10b981` | `7.80:1` | `7.56:1` |

### Approved direction

- **Technical blue — approved:** default/focus `#60a5fa`, hover `#93c5fd`, and pressed `#3b82f6`.
- The direction communicates links and primary actions predictably for hiring teams while leaving green available for success/status semantics.
- All approved states pass WCAG AA for normal text and the `3:1` non-text contrast threshold against either planned near-black background.

The selected family will be used consistently for primary actions, links, highlighted metrics, and visible focus. Exact theme-variable names and any disabled-state treatment belong to the implementation phase; disabled UI will not rely on the accent alone.

**Decision:** `Approved` on 2026-08-25.

## 2. Public CV Destination

The CV destination is now confirmed as the repository-controlled public file `/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf`, sourced from `public/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf`. Resume/CV links may target this exact file and must open in a new tab with accessible PDF naming. Creating a `/resume` route remains out of scope unless separately approved.

**Decision:** Initially approved as `Unavailable`, then superseded by `Approved — Available` on 2026-08-25 when the user supplied the public PDF.

## 2A. Public Contact Destinations

The user approved the following public contact destinations on 2026-08-25:

| Channel | Approved destination | Public wording |
|---|---|---|
| Email | `mailto:yerikhowilliamt@gmail.com` | `Email` |
| LinkedIn | `https://www.linkedin.com/in/yerikhowilliamt` | `LinkedIn` |
| GitHub | `https://github.com/yerikhowilliamt` | `GitHub` |
| Resume | `/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf` | `Resume` |

External profile links and the PDF open in a new tab. Email uses a direct `mailto:` destination.

## 3. OhMyPos Publication Inventory

The following destinations were approved by the user and returned `HTTP 200` without authenticated session state on 2026-08-25. The demo resolves to its public login route, which is acceptable as the entry point to the live application.

| Artifact | Approved URL | Status | Public wording |
|---|---|---|---|
| Live demo | [ohmypos.vercel.app](https://ohmypos.vercel.app) | Approved, public, verified | `Live demo` |
| Source repository | [github.com/yerikhowilliamt/ohmypos](https://github.com/yerikhowilliamt/ohmypos) | Approved, public, verified | `Source repository` |
| PRD | [00 - PRD.md](https://github.com/yerikhowilliamt/ohmypos/blob/main/docs/00%20-%20PRD.md) | Approved, public, verified | `Product requirements` |
| ADR(s) | [02 - ADR.md](https://github.com/yerikhowilliamt/ohmypos/blob/main/docs/02%20-%20ADR.md) | Approved, public, verified | `Architecture decisions` |
| Other technical evidence | [docs](https://github.com/yerikhowilliamt/ohmypos/tree/main/docs) | Approved, public, verified | `Project documentation` |

Private or unavailable artifacts will be omitted from public links. A factual case study may describe work without implying that private evidence can be accessed.

## 4. OhMyPos Metrics and Claims

### Approved metric 1 — concurrent partial settlement integrity

| Field | Approved content |
|---|---|
| Metric | 30 settlement requests at Rp20,000.00 against one Rp300,000.00 payable produced exactly 15 HTTP 201 successes, 15 HTTP 409 conflicts, a final Rp0.00 balance with `SETTLED` status, 15 settlement rows, 15 `PAYABLE_SETTLEMENT` ledger entries totaling Rp300,000.00, and zero 5xx responses. |
| Scenario | Thirty partial-settlement requests competing for one payable under pessimistic `SELECT ... FOR UPDATE` protection. |
| Environment | Node.js; NestJS 11; Prisma 7.9.1; TypeScript; PostgreSQL 16 using `postgres:16-alpine` with default `Read Committed` isolation; Jest and Supertest over loopback TCP. Requests were dispatched through `settleAllChunked` with a chunk size of five to avoid client-runner socket drops. Hardware and exact Node.js version were not recorded and must not be inferred. |
| Method | Create one unpaid Rp300,000.00 supplier purchase and payable; construct 30 authenticated OWNER settlement requests of Rp20,000.00; dispatch them through `settleAllChunked(factories, 5)` using `Promise.allSettled`; assert zero rejected promises, 15×201, 15×409, and zero responses at or above 500; verify the final payable, settlement rows, and ledger rows and sum in PostgreSQL. |
| Date | 2026-08-22, Phase 14 Verification & Hardening Gate, Workstream B. |
| Evidence | Public [B4 test suite](https://github.com/yerikhowilliamt/ohmypos/blob/main/apps/api/test/concurrency.e2e-spec.ts#L737-L817), [TASK-065](https://github.com/yerikhowilliamt/ohmypos/blob/main/docs/07%20-%20Task_Log.md#L408), and [DEBT-007](https://github.com/yerikhowilliamt/ohmypos/blob/main/docs/08%20-%20Tech_Debt_Log.md#L577-L588); local [OhMyPos case study](./ohmypos-case-study.md#validasi-concurrency-dan-konsistensi); and explicit user attestation. The original public `docs/portfolio/ohmypos-case-study.md` path returned `HTTP 404`; the pasted local copy is supporting evidence, not an approved public destination. |
| Copy boundary | “30 concurrent settlement requests against a single payable resolved into exactly 15 successes and 15 conflicts — final balance Rp0.00, zero server errors.” |

**Decision:** Metric and exact public wording `Approved` on 2026-08-25. The claim is a correctness/concurrency outcome, not a latency, throughput, scalability, or production-traffic claim.

### Approved fallback hook

> A multi-branch POS system built to keep sales, inventory, and financial ledgers consistent under concurrent transactions.

The unmatched trailing quotation mark in the submitted reply was treated as a formatting artifact and omitted.

## 5. Decision Record

| Item | Status | Recorded outcome |
|---|---|---|
| Accent family and tokens | Approved | Technical blue; `#60a5fa`, `#93c5fd`, `#3b82f6` |
| CV destination | Approved | `/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf`; render Resume CTA and open in a new tab |
| Email destination | Approved | `mailto:yerikhowilliamt@gmail.com` |
| LinkedIn destination | Approved | `https://www.linkedin.com/in/yerikhowilliamt` |
| Personal GitHub destination | Approved | `https://github.com/yerikhowilliamt` |
| OhMyPos live demo | Approved | Public and verified |
| OhMyPos repository | Approved | Public and verified |
| OhMyPos PRD | Approved | Public and verified |
| OhMyPos ADR(s) | Approved | Public and verified |
| Other OhMyPos evidence | Approved | Public docs directory verified |
| OhMyPos metric 1 | Approved | Evidence and copy boundary recorded above |
| Non-quantitative fallback hook | Approved | Replacement wording recorded above |
| Authorization to proceed to Phase 02 | Rejected | User explicitly selected `No`; Phase 02 remains blocked |
