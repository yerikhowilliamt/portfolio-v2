# Phase 06 Pre-Deploy QA Checklist

- **Executed:** 2026-08-27T18:27:14+07:00
- **Build under test:** Local Next.js 16.3.2 Webpack production build
- **Public origin:** Pending Phase 07 deployment approval
- **Status:** Ready for Phase 07 deployment verification, with the explicit live-origin and security-header gates below

## Route and State Matrix

| Route or state | Expected result | Automated/rendered result |
|---|---|---|
| `/` | Home, one H1, selected-work anchor, approved public links | Pass |
| `/projects` | Published project index; draft fixture absent | Pass |
| `/projects/ohmypos` | Static case study, exact seven-section order, three safe images | Pass |
| `/about` | Evidence-bounded professional profile | Pass |
| `/contact` | Approved email, LinkedIn, GitHub, and CV destinations | Pass |
| `/projects/not-a-project` | HTTP 404 and custom semantic H1 | Pass |
| Mobile navigation | Dialog opens, traps focus, closes with Escape, restores trigger focus | Pass at 390×844 |
| Reduced motion | Smooth scroll disabled and animation/transition duration minimized | CSS branch present; OS preference was not active in the connected browser |
| External links | Approved destinations respond or have a documented crawler restriction | Pass except LinkedIn automated HTTP 999; destination retained from the approved decision packet |

## Accessibility and Responsive Review

- Landmarks: one `main` on each tested state, shared banner and content information landmarks, and labelled navigation regions.
- Headings: one H1 on every public page and the custom 404; case-study H2/H3 order remains valid.
- Images: no empty alternatives or broken images on the rendered route matrix.
- Keyboard: skip link is the first page focus target and becomes visible; the mobile Sheet focuses Close, Escape dismisses it, and focus returns to the Menu trigger.
- Focus: rendered focus treatment includes a 3px Technical Blue ring against the near-black background.
- Contrast: default primary actions now use `#0a0a0a` text on `#60a5fa` (7.79:1). Foreground, muted text, accent text, and secondary text token pairs remain above WCAG AA text thresholds.
- Layout: no horizontal overflow at 390×844, 1440×900, or the 720×450 layout-viewport equivalent of a 200% desktop zoom pass.
- Visual inspection: Home at 390×844 and `/projects/ohmypos` at 1440×900 retained the approved hierarchy, readable captions, and uncut primary content.
- Automated audit: final squirrelscan production crawl reported Accessibility 99, Images 100, Mobile 100, Internationalization 100, and Site Integrity 100.

## SEO, Discovery, and Social Preview

- Global and route metadata include unique titles and descriptions, canonical paths, Open Graph fields, and Twitter large-card fields.
- `metadataBase`, robots host, sitemap URLs, and canonical URLs resolve from Vercel's built-in `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`; localhost is used only when neither exists.
- Published project paths remain generated through `generateStaticParams`; invalid slugs reach the validated lookup and custom `notFound()` state without a production `NoFallbackError`.
- `/robots.txt` and `/sitemap.xml` are generated and return the correct MIME types.
- The sitemap includes `/`, `/projects`, `/about`, `/contact`, and every published project detail route; drafts and invalid slugs are excluded.
- Static `app/opengraph-image.png` and `app/twitter-image.png` are 1200×630 PNGs with matching text alternatives and are present on every tested public page.
- The OG source is preserved in `docs/phase-06-og-source.svg`; the rendered asset contains only approved identity and positioning copy.
- Squirrelscan Core SEO improved from 46 to 100; the overall score improved from 32 on the development baseline to 58 on the production build.

## Automated Validation

| Check | Result |
|---|---|
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm test` | Pass — 6 files, 22 tests |
| `npx next build --webpack` | Pass — 12 static/SSG outputs including robots, sitemap, and social images |
| `git diff --check` | Pass |
| Internal production HTTP/MIME matrix | Pass — public HTML 200, invalid slug 404, robots text, sitemap XML, social images PNG, CV PDF |
| Approved external link checks | Six destinations HTTP 200; LinkedIn returned crawler-specific HTTP 999 |
| Squirrelscan full production crawl | Completed — 6 pages, 548 passed rules, 53 warnings, 6 failures; Core SEO 100 and Accessibility 99 |

## Phase 07 Live-Origin Gates

- Confirm Vercel exposes `VERCEL_PROJECT_PRODUCTION_URL` and that canonical, OG, robots, and sitemap URLs use the assigned HTTPS production origin.
- Re-run full crawl against HTTPS. Local HTTP necessarily fails HTTPS/HTTP2 checks and the alternate local port makes sitemap-domain coverage incomparable.
- Security headers remain unchanged because CSP, clickjacking headers, and deployment configuration require separate explicit approval. See `DEBT-20260827-02`.
- Decide separately whether a privacy-policy route, `llms.txt`, Markdown responses, or content-author/date schema belongs in product scope. They were audit suggestions, not Phase 06 defects, and were not added.
- Do not add words to recruiter pages solely to satisfy a generic 300-word crawler heuristic; the approved product brief prioritizes fast scanning.
- Recheck LinkedIn in a normal human browser after deployment; automated requests currently receive HTTP 999.

## Performance Sanity Notes

- The final production crawl removed the development-only megabyte bundle, source-map, duplicate-JS, and slow-TTFB findings.
- Primary project images render with `loading="eager"` and `fetchPriority="high"`; secondary case-study gallery images remain lazy.
- The production HTML contains the high-priority attribute, although squirrelscan 0.0.87 continued to report it as absent and also classified the below-primary gallery images as above-fold.
- Cache-header and HTTP/2 behavior must be measured on Vercel, not inferred from `next start` over local HTTP.
