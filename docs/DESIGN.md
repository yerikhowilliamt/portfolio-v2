# Yerikho William Tasilima — Portfolio Design System

## 0. Status dan Otoritas

- **Status:** Approved — disetujui pengguna pada 2026-08-26 sebagai arah redesign dan kontrak UI implementasi.
- **Approval boundary:** Approval desain tidak mengisi personal-content fields yang masih terbuka dan tidak otomatis menyetujui dependency/registry mutation; keputusan tersebut tetap harus dikonfirmasi pada phase yang membutuhkannya.
- **Scope:** Visual direction, information hierarchy, responsive layout, component composition, interaction, accessibility, dan visual QA untuk route yang sudah disetujui.
- **Tidak mengubah:** Public URL, content schema MDX, dependency, evidence contract, atau scope produk.
- **Otoritas:** `docs/project-brief.md` tetap menjadi sumber kebenaran produk dan konten. Dokumen ini adalah kontrak UI yang telah disetujui. Jika keduanya berbeda, `docs/project-brief.md` menang sampai konflik diselesaikan bersama pengguna.
- **Public language:** Semua contoh copy yang benar-benar diterapkan ke website harus berbahasa Inggris.

Dokumen ini disusun dari audit UI aktual, kontrak repository, dan pencarian `ui-ux-pro-max`. Rekomendasi skill yang dipakai adalah Minimalism & Swiss Style, editorial grid, hierarchy yang konsisten, high contrast, responsive grid, dan motion ringan. Rekomendasi light theme serta pasangan font alternatif tidak dipakai karena bertentangan dengan keputusan pengguna yang sudah final: dark-first, technical blue, Plus Jakarta Sans, dan JetBrains Mono.

## 1. Diagnosis UI Saat Ini

UI saat ini bersih dan dapat diakses, tetapi belum mempresentasikan Yerikho sebagai software engineer profesional secara cukup personal dan meyakinkan.

### Bukti dari Render Aktual

| Temuan | Bukti audit | Dampak recruiter |
|---|---:|---|
| Hero tidak menyebut nama Yerikho | H1 saat ini adalah “Engineering work you can inspect, not just read about.” | Visitor harus menyimpulkan sendiri siapa pemilik situs. |
| Role belum menjadi headline utama | Role hanya muncul sebagai eyebrow kecil | Positioning profesional tidak tertangkap pada scan pertama. |
| Home terlalu pendek | Hanya 2 section dan 1 card | Belum ada alur identity → proof → selected work → approach → contact. |
| Tidak ada visual project | 0 image/SVG pada Home dan Projects | Project terasa seperti dokumen abstrak, bukan hasil kerja yang dapat dilihat. |
| Mobile header terlalu tinggi | 149px pada viewport 390px | Navigation mengambil ruang berharga sebelum value proposition terlihat. |
| Proof terlambat terlihat di mobile | Hero berakhir sekitar y=881 pada viewport setinggi 844px | Strongest evidence berada di bawah first viewport. |
| Projects belum punya hierarchy matang | 1 fixture card, 0 visual project | Grid dua kolom belum relevan dan membuat state satu project tampak kosong. |
| Surface terlalu seragam | Alert dan Card menjadi pola visual utama | Semua informasi memiliki bobot visual hampir sama. |
| About masih abstrak | Berisi principles, belum professional profile | Recruiter belum mendapat konteks ownership, cara kerja, atau arah karier. |
| Contact seperti directory | Empat card berulang | CTA utama dan jalur recruiter tidak cukup jelas. |

### Kesimpulan Diagnosis

Masalah utamanya bukan kurang dekorasi. Masalahnya adalah **identity, ownership, proof, dan project depth belum membentuk hierarchy recruiter-oriented**. Redesign harus mengurangi pola “template developer/HUD” dan membangun pengalaman seperti engineering dossier yang editorial, personal, dan dapat diverifikasi.

## 2. Design Thesis

### Nama Arah Visual

**Technical Editorial Dossier**

### Positioning Visual

Portfolio harus terasa seperti perpaduan:

- engineering case-study publication;
- professional profile seorang full-stack software engineer;
- technical documentation yang nyaman dipindai;
- evidence archive dengan visual yang nyata, bukan dekoratif.

### Kalimat Pengarah

> Personal enough to remember, technical enough to inspect, restrained enough to trust.

### Bukan Ini

- Bukan landing page startup yang menjual produk fiktif.
- Bukan terminal/HUD sci-fi dengan glow, ticker, atau decoration tanpa makna.
- Bukan dashboard yang menaruh setiap informasi di dalam card.
- Bukan portfolio kreatif yang mengandalkan animasi dan mockup palsu.
- Bukan resume panjang yang dipindahkan mentah ke web.

## 3. Prinsip Desain

### 3.1 Identity Before Abstraction

Nama, role, area spesialisasi, dan project unggulan harus terlihat sebelum slogan abstrak. Dalam 10–15 detik recruiter harus dapat menjawab:

1. Siapa engineer ini?
2. Role apa yang dituju?
3. Sistem seperti apa yang sudah dibangun?
4. Apa bukti terkuatnya?
5. Di mana CV dan cara menghubunginya?

### 3.2 Proof Before Adjectives

Gunakan hasil, keputusan, diagram, screenshot, dan link publik. Hindari kata seperti “scalable”, “high-performance”, atau “production-ready” tanpa evidence dan context.

### 3.3 One Strong Story Beats Many Weak Cards

Selama hanya OhMyPos yang siap, tampilkan satu featured case study besar. Jangan memaksakan grid beberapa kolom atau membuat project dummy agar layout terlihat penuh.

### 3.4 Fewer, Stronger Surfaces

Card hanya digunakan ketika sebuah kelompok informasi membutuhkan boundary. Gunakan whitespace, typography, grid, dan Separator untuk hierarchy utama. shadcn tetap menjadi sumber visual/action primitives, tetapi bukan alasan untuk memasukkan setiap paragraph ke dalam Card.

### 3.5 Authentic Visual Evidence

Visual harus berasal dari artifact nyata:

- screenshot aplikasi yang benar-benar berjalan;
- system or data-flow diagram yang sesuai implementasi;
- benchmark chart dari data yang disetujui;
- code or schema excerpt yang benar-benar ada;
- test result atau architecture decision yang dapat ditelusuri.

Jangan membuat dashboard, terminal, chart, browser frame, atau metric yang tidak didukung implementasi.

### 3.6 Progressive Technical Depth

Home menjawab “why this engineer”. Projects menjawab “what was built”. Project detail menjawab “how and why it works”. Recruiter tidak harus membaca seluruh case study untuk menemukan nilai utama.

## 4. Visual Language

### 4.1 Color System

Dark-first tetap menjadi default dan satu-satunya mode pada MVP.

| Token | Nilai target | Penggunaan |
|---|---|---|
| `background` | `#0A0A0A` | Canvas utama; jangan gunakan pure black. |
| `surface` | `#0F0F0F` | Card atau grouped evidence. |
| `surface-raised` | `#171717` | Active navigation, selected state, compact proof strip. |
| `foreground` | `#FAFAFA` | Heading dan body penting. |
| `muted-foreground` | `#A3A3A3` | Supporting copy; tetap periksa contrast. |
| `border` | `#3F3F46` | Divider dan card boundary normal. |
| `border-strong` | `#737373` | Focus-adjacent or emphasized evidence boundary only. |
| `primary` | `#60A5FA` | Primary CTA, focus, highlighted verified metric. |
| `primary-hover` | `#93C5FD` | Hover state. |
| `primary-active` | `#3B82F6` | Pressed state. |
| `destructive` | `#F87171` | Error/destructive state only. |

Rules:

- Satu accent utama: technical blue.
- Tidak ada decorative gradient, neon glow, glass-card stack, atau multi-accent rainbow.
- Accent tidak digunakan pada semua heading; gunakan untuk CTA, focus, eyebrow, link penting, dan metric terverifikasi.
- Surface elevation dibedakan terutama melalui spacing dan border, bukan shadow besar.

### 4.2 Typography

| Peran | Font | Weight | Target |
|---|---|---:|---|
| Display/H1 | Plus Jakarta Sans | 600–700 | Personal, modern, confident. |
| H2/H3 | Plus Jakarta Sans | 600 | Clear editorial hierarchy. |
| Body/UI | Plus Jakarta Sans | 400–600 | Professional and readable. |
| Numeric/benchmark | JetBrains Mono | 500–700 | Tabular, inspectable, technical. |
| Code/tag/eyebrow | JetBrains Mono | 400–600 | Technical metadata only. |

Type scale target:

| Token | Desktop | Mobile | Line height |
|---|---:|---:|---:|
| Display | `clamp(3.5rem, 6vw, 5.5rem)` | min 3rem | 0.98–1.02 |
| H1 inner page | `clamp(3rem, 5vw, 4.5rem)` | min 2.5rem | 1.00–1.08 |
| H2 | `clamp(2rem, 3vw, 3rem)` | min 1.75rem | 1.10–1.18 |
| H3 | 1.25–1.5rem | 1.125–1.25rem | 1.25 |
| Body lead | 1.125rem | 1rem | 1.7–1.8 |
| Body | 1rem | 1rem | 1.6–1.75 |
| Label | 0.75–0.8125rem | sama | 1.4 |
| Metric | 2.5–4rem | 2–3rem | 1.0 |

Rules:

- Body copy maksimal 65–72 karakter per baris.
- Jangan menggunakan all-caps Plus Jakarta Sans untuk label teknis; gunakan JetBrains Mono.
- Letter spacing besar hanya untuk eyebrow pendek, bukan nama panjang atau paragraph.
- Gunakan `text-wrap: balance` pada display heading dan `text-wrap: pretty` pada lead copy bila didukung.

### 4.3 Grid dan Spacing

- Container desktop: max-width `1200–1280px`.
- Desktop ≥1024px: 12-column grid, gutter 24–32px.
- Tablet 768–1023px: 8-column grid, gutter 24px.
- Mobile <768px: 4-column grid, gutter 16–20px.
- Section spacing desktop: 96–128px.
- Section spacing mobile: 64–80px.
- Spacing unit: 4px; gunakan rhythm 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Border radius: 8px untuk controls, 12px untuk evidence surfaces; jangan memakai rounded pill kecuali Badge.
- Shadow: tidak digunakan secara default. Jika boundary tidak cukup, gunakan border atau tonal surface terlebih dahulu.

### 4.4 Image dan Diagram Treatment

- Screenshot menggunakan `next/image`, aspect ratio stabil, dan caption faktual.
- Gunakan border 1px dan background surface; browser chrome palsu tidak wajib.
- Diagram harus sederhana: 1 accent color, neutral connectors, label jelas, dan dapat dibaca tanpa hover.
- Jangan menampilkan screenshot yang memuat secret, production data, customer PII, atau internal URL.
- Jika visual nyata belum tersedia, gunakan layout berbasis text + verified metrics. Jangan membuat placeholder publik palsu.

## 5. Information Architecture dan Page Layout

Public route tetap:

```text
/
├── /projects
│   └── /projects/[slug]
├── /about
└── /contact
```

Tidak ada route baru dalam redesign ini. `/resume`, blog, services, dan localization tetap di luar scope tanpa approval.

## 6. Shared Shell

### Desktop Header

- Tinggi target: 64px.
- Kiri: wordmark text `Yerikho William Tasilima` tanpa tracking ekstrem.
- Tengah/kanan: Home, Projects, About, Contact.
- Far right: primary or outline `Resume` action.
- Sticky dengan background near-black opaque/translucent secukupnya; divider tipis.
- Current route terlihat melalui shadcn Button state, bukan underline dekoratif yang samar.

### Mobile Header

- Tinggi target closed state: 56–64px, bukan 149px.
- Kiri: full name dalam ukuran yang tetap terbaca.
- Kanan: shadcn Button icon/text yang membuka shadcn Sheet.
- Sheet memuat Home, Projects, About, Contact, dan Resume dengan target sentuh minimal 44px.
- Menu harus dapat ditutup dengan Escape, focus-trapped, dan mengembalikan focus ke trigger.

Menambahkan `Sheet` dari registry atau icon dependency tetap membutuhkan approval sesuai repository governance.

### Footer

Susunan desktop:

1. Nama + concise role line.
2. GitHub, LinkedIn, Email, Resume.
3. Copyright dan optional “Built with Next.js” hanya jika benar-benar membantu, bukan badge teknologi dekoratif.

Mobile menjadi satu kolom dengan action links berukuran sentuh memadai.

## 7. Home Page Contract

### 7.1 Hero — Identity + Professional Value

Urutan informasi:

1. Name: `Yerikho William Tasilima`.
2. Exact target role: `Software Engineer`.
3. Value proposition berbasis evidence, bukan slogan generik.
4. Satu paragraph yang menjelaskan jenis sistem dan ownership.
5. Primary CTA: `View selected work`.
6. Secondary CTA: `Open resume`.
7. Supporting link: GitHub atau Contact, bukan tiga CTA setara.

Desktop: content 7 kolom, proof visual 5 kolom. Mobile: identity dan CTA lebih dulu, lalu proof snapshot.

Proof visual priority:

1. Screenshot OhMyPos yang disetujui; atau
2. Architecture/system-flow diagram yang sesuai implementation; atau
3. Verified metric panel jika asset visual belum siap.

Hapus `EVIDENCE_LEDGER` sebagai dekorasi hero. Konsep evidence tetap dipakai sebagai hierarchy nyata, bukan terminal-style callout.

### 7.2 Recruiter Facts Strip

Compact strip setelah hero:

- Role target.
- Current location.
- Relocation/work authorization or sponsorship need.
- Availability.

Field yang belum dikonfirmasi tidak boleh tampil sebagai tebakan. Gunakan placeholders hanya di dokumen atau draft:

- `[LOCATION REQUIRED]`
- `[RELOCATION / VISA STATUS REQUIRED]`
- `[AVAILABILITY REQUIRED]`

### 7.3 Selected Work

Selama hanya satu project siap, gunakan satu editorial feature, bukan grid dua kolom.

```text
┌──────────────────────────────────────────────────────────────┐
│  PROJECT VISUAL / SYSTEM DIAGRAM          7 columns          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  OHMYPOS · FEATURED                       5 columns          │
│  Problem / ownership / verified result                       │
│  [metric] [metric] [metric]                                  │
│  View case study · Live demo · Source                         │
└──────────────────────────────────────────────────────────────┘
```

Pada ≥2 project, OhMyPos tetap featured full width; project berikutnya dapat masuk grid dua kolom di bawahnya. Jangan menambah filter sebelum jumlah project cukup untuk membutuhkan filter.

### 7.4 Verified Outcomes

Gunakan 2–4 metric yang paling bermakna dan sudah disetujui. Setiap metric wajib menyertakan label dan context. Jangan menampilkan angka tanpa menjelaskan workload/environment.

### 7.5 Engineering Approach

Tiga capability maksimal, masing-masing terhubung ke evidence:

- Domain and application architecture.
- Data integrity and concurrency.
- Verification and engineering traceability.

Gunakan editorial columns atau Separator; Card hanya jika boundary dibutuhkan.

### 7.6 About Preview

Satu foto profesional bersifat optional, bukan requirement. Tanpa foto, gunakan concise professional narrative dan satu authentic artifact. Jangan memakai avatar generatif.

### 7.7 Contact CTA

Penutup singkat dengan satu primary action `Discuss an engineering role` dan secondary `View LinkedIn`. Tidak ada contact form pada MVP.

## 8. Projects Index Contract

### One-Project State

- H1 menjelaskan bahwa halaman berisi engineering case studies.
- OhMyPos tampil sebagai large featured row/full-width composition.
- Tampilkan: problem, ownership, verified hook, stack, evidence availability, dan case-study CTA.
- Fixture demonstrasi boleh tetap digunakan saat development, tetapi harus diganti oleh Phase 5 sebelum portfolio dianggap recruiter-ready.

### Multi-Project State

- Featured project full width.
- Secondary project grid dua kolom.
- Setiap project mempunyai authentic visual atau explicit text-only state.
- Filter/search hanya dipertimbangkan setelah >6 published projects dan membutuhkan approval scope.

### Project Card Anatomy

1. Project visual or system diagram.
2. Project name + concise category.
3. One-sentence problem.
4. Ownership statement.
5. One verified result or factual hook.
6. 3–5 primary stack badges, bukan seluruh dependency list.
7. `Read case study` sebagai primary action.
8. Demo/source link hanya jika publik dan disetujui.

## 9. Project Detail Contract

### Header

- Breadcrumb or back-to-projects link.
- Project title, category, role/ownership, timeline only when verified.
- One-sentence hook.
- Approved actions: Live demo, Source, Architecture decisions.
- Hero visual dari aplikasi/diagram nyata.

### Executive Summary Band

Tiga blok:

1. Problem.
2. Responsibility/ownership.
3. Verified outcome.

### Long-Form Layout

Desktop:

```text
┌───────────────┬──────────────────────────────┬───────────────┐
│ Sticky TOC    │ Main narrative               │ Proof notes   │
│ 2 columns     │ 7 columns                    │ 3 columns     │
└───────────────┴──────────────────────────────┴───────────────┘
```

Mobile:

- Single column.
- TOC menjadi compact jump links atau Accordion only if needed.
- Proof notes ditempatkan setelah paragraph yang didukung.
- Code, table, dan diagrams tidak boleh membuat horizontal page scroll.

Urutan konten tetap mengikuti project brief:

1. Hook.
2. Problem.
3. Key Decisions & Trade-offs.
4. Measured Results.
5. What This Demonstrates.
6. Limitations & Next Steps.
7. Technical Evidence.

### Decision Block

Setiap keputusan penting mempunyai struktur:

- Context.
- Decision.
- Alternative considered.
- Trade-off.
- Evidence or consequence.

Gunakan Card hanya untuk decision yang perlu dibaca sebagai unit. Jangan menjadikan setiap paragraph Card.

## 10. About Page Contract

Tujuan About adalah menjawab “how this engineer thinks and works”, bukan mengulang Home.

Urutan:

1. Professional introduction dengan nama dan target role.
2. Current focus dan jenis problem yang dikerjakan.
3. Ownership: product understanding → architecture → implementation → verification.
4. Capability evidence, bukan skill cloud.
5. Working principles dalam 3–4 concise items.
6. Career/location/relocation facts hanya setelah dikonfirmasi pengguna.
7. Resume + Contact CTA.

Jangan membuat timeline perusahaan, years of experience, certification, atau education detail tanpa sumber yang disetujui.

## 11. Contact Page Contract

Gunakan layout dua bagian:

- Kiri: concise recruitment invitation, role interest, dan response channel.
- Kanan: one primary email action, kemudian LinkedIn, GitHub, Resume sebagai secondary list.

Email adalah CTA utama. Empat destination tidak perlu empat Card identik. shadcn Button mengelola action; Separator mengelola list rhythm.

Tidak ada contact form, server action, database, atau external service pada MVP.

## 12. shadcn Component Contract

Semua reusable visual/action primitives menggunakan shadcn source components atau project compositions di atas primitive tersebut.

| Kebutuhan | Primitive |
|---|---|
| CTA, nav action, external action | `Button` + `asChild` |
| Grouped project/evidence surface | `Card` full composition |
| Stack/status/technical label | `Badge` |
| Section/list divider | `Separator` |
| Important bounded note | `Alert` |
| Mobile navigation | `Sheet` — requires registry approval before addition |
| Optional compact disclosure | `Accordion` — only if content warrants it and after approval |

Rules:

- Native semantic HTML tetap digunakan untuk `main`, `section`, `article`, headings, paragraphs, lists, figures, captions, tables, inline links, code, dan blockquote.
- Jangan membuat custom button, card, badge, dialog, sheet, separator, atau alert dari styled native markup.
- Jangan memakai Card sebagai default layout container. Grid, section, figure, dan article adalah structure, bukan visual primitive.
- Registry component atau dependency baru harus melalui approval gate.

## 13. Interaction dan Motion

- Hover transition: 150–220ms.
- Gunakan color, border, dan maksimal `translateY(-2px)` pada interactive project surface.
- Jangan menggunakan scale animation pada card besar; dapat membuat typography tampak goyah.
- Link underline atau arrow movement maksimal 2–4px dan tidak boleh menjadi satu-satunya indikator interaksi.
- Focus ring minimal 3px dan tidak boleh tertutup sticky header.
- Semua motion harus memiliki final state yang sama saat `prefers-reduced-motion: reduce`.
- Tidak ada parallax, cursor follower, scroll hijacking, autoplay carousel, typewriter animation, atau intro loader.

## 14. Responsive Contract

### 375–479px

- Closed header 56–64px.
- Single-column content.
- Display heading maksimal 4–5 baris pada 375px.
- Primary CTA dapat full width; secondary CTA tidak harus full width jika label tetap muat.
- Identity, role, dan primary CTA harus terlihat pada first viewport; minimal awal proof cue juga sebaiknya terlihat.
- Table menggunakan responsive wrapper hanya jika table adalah format evidence terbaik.

### 480–767px

- Tetap satu kolom dengan spacing sedikit lebih besar.
- Project metric dapat menjadi 2-column grid jika label tidak terpotong.

### 768–1023px

- 8-column grid.
- Header dapat kembali ke inline nav jika semua target sentuh muat tanpa wrap.
- Project feature dapat memakai 4/4 split.

### 1024–1439px

- 12-column grid.
- Hero 7/5, selected work 7/5, About 4/8.

### ≥1440px

- Container tetap maksimal 1200–1280px; jangan meregangkan line length.
- Tambahkan whitespace, bukan memperbesar seluruh typography tanpa batas.

### Zoom dan Reflow

- Layout harus tetap berfungsi pada 200% zoom.
- Tidak boleh ada horizontal page scroll pada viewport 320px.
- Sticky element tidak boleh menutupi heading tujuan anchor.

## 15. Accessibility Contract

- Satu H1 per page.
- Landmark dan heading order harus logis tanpa bergantung visual layout.
- Semua action dapat diakses keyboard.
- Target sentuh minimum 44×44px pada mobile.
- Focus state selalu terlihat dan memiliki contrast memadai.
- Normal text minimum contrast 4.5:1; large text minimum 3:1.
- Link harus deskriptif; hindari beberapa `Learn more` tanpa accessible name spesifik.
- External link menyebut perilaku new-tab dalam accessible name ketika relevan.
- Screenshot memiliki alt yang menjelaskan informasi penting, bukan sekadar “screenshot”.
- Diagram kompleks mempunyai caption dan text equivalent.
- Metric tidak bergantung pada warna untuk menyampaikan makna.
- Reduced-motion diverifikasi, bukan hanya dideklarasikan.

## 16. Content and Evidence Contract

- Lead with business problem, ownership, impact, lalu technical depth.
- Tampilkan exact role contribution; jangan membuat project tampak sebagai team/company work jika sebenarnya personal work, atau sebaliknya.
- Metric selalu menyertakan workload, environment, sample size, percentile, dan tanggal jika tersedia.
- Jangan menampilkan employer logo, testimonial, client logo, atau certification badge tanpa izin dan bukti.
- Jangan menampilkan “available for work”, location, visa status, sponsorship need, atau relocation status sebelum pengguna mengonfirmasinya.
- Draft dan `[METRIC REQUIRED]` tidak boleh masuk halaman published.

## 17. Required States

### Project Index

- One published project: full-width featured layout.
- Multiple projects: featured + secondary grid.
- Zero projects: tidak untuk production recruiter-ready; tampilkan honest empty state hanya di development/preview.

### Project Visual

- Asset available: render optimized image/diagram dengan caption.
- Asset unavailable: intentional text + metric composition, bukan grey skeleton palsu pada static page.

### External Evidence

- Valid public destination: render action.
- Private/unapproved/missing: omit action entirely.
- Broken destination discovered during QA: block release, jangan mengganti URL dengan tebakan.

### Error dan Not Found

- Gunakan nama situs, concise explanation, dan Button kembali ke Projects/Home.
- Jangan memakai ilustrasi generik atau joke yang mengurangi tone profesional.

## 18. Page Wireframes

### Home Desktop

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ Yerikho William Tasilima    Home Projects About Contact        Resume  │
├─────────────────────────────────────────────────────────────────────────┤
│ NAME / ROLE / VALUE                         REAL PROJECT VISUAL         │
│ Clear professional headline                 or verified proof panel    │
│ Concise ownership statement                                             │
│ [View selected work] [Open resume]                                      │
├─────────────────────────────────────────────────────────────────────────┤
│ Role target │ Location │ Relocation / visa │ Availability              │
├─────────────────────────────────────────────────────────────────────────┤
│ OHMYPOS FEATURE VISUAL               │ Problem + ownership + outcome    │
│                                      │ Metrics + case-study CTA         │
├─────────────────────────────────────────────────────────────────────────┤
│ Verified outcomes                                                       │
├─────────────────────────────────────────────────────────────────────────┤
│ Architecture │ Data integrity │ Verification                           │
├─────────────────────────────────────────────────────────────────────────┤
│ About preview                                      Contact CTA           │
└─────────────────────────────────────────────────────────────────────────┘
```

### Home Mobile

```text
┌──────────────────────────────┐
│ Yerikho William Tasilima  ☰  │
├──────────────────────────────┤
│ NAME                         │
│ ROLE                         │
│ Value proposition            │
│ [View selected work]         │
│ [Open resume]                │
│ Proof cue                    │
├──────────────────────────────┤
│ Recruiter facts              │
├──────────────────────────────┤
│ OhMyPos visual               │
│ Problem / result / CTA       │
├──────────────────────────────┤
│ Capabilities                 │
├──────────────────────────────┤
│ Contact CTA                  │
└──────────────────────────────┘
```

### Project Detail Desktop

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ Back to projects                                                        │
│ Project title + hook                         Demo / Source / ADR         │
│ Hero screenshot or architecture diagram                                │
├─────────────────────────────────────────────────────────────────────────┤
│ Problem              │ Ownership             │ Verified outcome         │
├─────────────────────────────────────────────────────────────────────────┤
│ Sticky contents      │ Main case study        │ Context / proof notes    │
│                      │ Decisions              │                          │
│                      │ Results                │                          │
│                      │ Limitations            │                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## 19. Anti-Slop Gate

Reject implementation jika salah satu kondisi berikut muncul:

- Hero dapat dipindahkan ke portfolio developer lain tanpa perubahan berarti.
- Nama dan role Yerikho bukan bagian dari first-screen hierarchy.
- Fake terminal, code rain, grid background, glow, atau decorative chart menggantikan evidence nyata.
- Semua section dimasukkan ke Card yang sama bentuknya.
- Project image hanya generic laptop/browser mockup tanpa informasi sistem.
- Skill ditampilkan sebagai icon cloud tanpa context atau evidence.
- Progress bar digunakan untuk menilai kemampuan pribadi secara arbitrer.
- CTA utama tidak jelas karena tiga atau lebih action memiliki visual weight sama.
- Animation mengganggu scanning atau tidak memiliki reduced-motion state.
- Mobile navigation menghabiskan lebih dari satu baris sebelum dibuka.
- Copy berisi klaim unsupported atau metric tanpa context.

## 20. Implementation Sequence Setelah Approval

### Phase A — Foundation and Shell

- Reconcile tokens dengan `globals.css`.
- Refine Button/Card variants bila perlu.
- Implement desktop header dan compact mobile navigation.
- Preserve keyboard, focus, and route-state tests.

### Phase B — Home Recruiter Journey

- Rebuild hero identity hierarchy.
- Add recruiter facts only after user provides exact content.
- Build one-project selected-work feature.
- Add outcomes, capabilities, and contact CTA.

### Phase C — Project Presentation

- Replace fixture with approved Phase 5 OhMyPos content.
- Build one-project index state.
- Refine project detail executive summary, TOC, proof notes, and real visual assets.

### Phase D — About and Contact

- Rewrite About around verified professional narrative and ownership.
- Simplify Contact into primary + secondary paths.

### Phase E — QA

- Automated route/component/content regression.
- Responsive QA at 375, 768, 1024, and 1440px.
- Keyboard, focus, reduced-motion, contrast, zoom/reflow.
- Production build and public-link verification.

Setiap phase memerlukan task scope yang jelas. Dependency, new shadcn registry component, new route, content schema change, metric, personal claim, public asset, dan deployment tetap mengikuti approval gate repository.

## 21. Acceptance Criteria

Design dianggap berhasil jika:

- Visitor dapat menyebut nama, target role, strongest project, satu verified outcome, dan contact path setelah scan 15 detik.
- Home memiliki distinct hierarchy: identity → proof → selected work → approach → contact.
- First mobile viewport menampilkan identity, role/value proposition, dan primary CTA tanpa header 149px.
- State satu project terasa intentional dan tidak seperti grid kosong.
- Screenshot/diagram yang digunakan merupakan artifact nyata dan aman dipublikasikan.
- Tidak ada fake metric, fake dashboard, fake code, employer logo, atau testimonial.
- shadcn mengelola semua visual/action primitives yang sesuai tanpa memaksa semantic content ke komponen yang salah.
- Body and heading memakai Plus Jakarta Sans; numeric/code memakai JetBrains Mono.
- Technical blue tetap menjadi satu-satunya accent utama.
- Semua route lolos responsive, keyboard, focus, contrast, reduced-motion, type-check, tests, dan production build setelah implementasi.

## 22. Open Decisions Sebelum Implementasi

Pengguna perlu mengonfirmasi secara terpisah:

1. **Resolved 2026-08-26:** Exact target role title adalah `Software Engineer`.
2. Current location yang boleh dipublikasikan.
3. Relocation, work-authorization, dan sponsorship wording.
4. Availability wording.
5. Apakah ada professional portrait yang boleh dipublikasikan.
6. Screenshot atau diagram OhMyPos mana yang boleh tampil publik.
7. Apakah mobile navigation boleh menambahkan shadcn `Sheet` melalui registry.
8. Urutan project setelah OhMyPos ketika project berikutnya siap.

Tidak satu pun keputusan terbuka di atas boleh ditebak saat implementasi.
