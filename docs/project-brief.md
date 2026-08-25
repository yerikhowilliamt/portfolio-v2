# Portfolio Website — Project Brief

## Status dan Otoritas Dokumen

Dokumen ini adalah **single source of truth untuk keputusan produk, konten, information architecture, stack, dan arah visual** portfolio website.

- `AGENTS.md` mengatur perilaku, scope, approval gate, validasi, dan keselamatan coding agent.
- Dokumen ini mengatur apa yang dibangun dan alasan produknya.
- Implementasi harus mengikuti keputusan yang tercatat di sini. Jika implementasi berbeda, jangan mengubah keputusan produk secara diam-diam; dokumentasikan perbedaannya dan minta persetujuan jika rekonsiliasi mengubah arsitektur atau perilaku publik.
- Keputusan yang belum final harus tercatat secara eksplisit di bagian **Open Decisions**. Agent tidak boleh menebaknya.

## 1. Positioning dan Target Audience

Portfolio ini ditujukan untuk menunjukkan kredibilitas teknis, dampak sistem yang dapat diverifikasi, dan kemampuan menjelaskan trade-off secara ringkas.

**Primary audience:** Hiring manager dan technical recruiter di perusahaan Eropa yang memiliki rekam jejak sponsorship visa kerja, Blue Card, atau skilled-worker visa.

**Secondary audience:** Technical interviewer yang membutuhkan bahan diskusi konkret untuk system-design atau engineering interview.

Dalam pemindaian kurang dari satu menit, pengunjung harus dapat menemukan:

- Bukti membangun sistem nyata, bukan tutorial.
- Hasil atau benchmark yang konkret dan dapat diverifikasi.
- Live demo atau technical evidence yang benar-benar dapat diakses, jika tersedia untuk publik.
- Stack yang relevan dengan posisi full-stack TypeScript.
- Keputusan arsitektur beserta trade-off-nya.

## 2. Prinsip Konten

- Semua konten publik menggunakan bahasa Inggris. Lokalisasi bahasa Indonesia berada di luar scope sampai disetujui secara eksplisit.
- Nada penulisan harus teknis, presisi, ringkas, dan berbasis bukti.
- Jangan menggunakan klaim seperti “scalable,” “high-performance,” atau “production-ready” tanpa konteks dan bukti.
- Setiap metrik harus berasal dari bukti yang diberikan pengguna atau benchmark yang dapat direproduksi. Jangan mengarang angka, hasil, tanggal, tanggung jawab, atau technical evidence.
- Jika metrik belum tersedia, gunakan hook faktual tanpa angka atau placeholder `[METRIC REQUIRED]` sampai data dikonfirmasi.
- Struktur informasi menggunakan dua lapisan:
  - Project list untuk scan-read singkat.
  - Project detail untuk deep-read dan technical evidence.

## 3. Information Architecture

```text
/                         → Home
├── /about                → Background, skill summary, dan roadmap singkat
├── /projects             → Daftar project dan card summary
│   ├── /projects/ohmypos → Case study OhMyPos
│   ├── /projects/kanban  → Case study real-time Kanban (fase berikutnya)
│   └── /projects/analytics → Case study analytics/geospatial (fase berikutnya)
└── /contact              → Email, LinkedIn, GitHub, dan akses CV
```

### Navigasi

- Header sticky berisi Home, Projects, About, dan Contact.
- CTA Resume/CV menggunakan file publik `/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf` dan dibuka di tab baru dengan accessible PDF naming.
- Route `/resume` tetap memerlukan persetujuan terpisah dan tidak dibuat untuk file CV ini.
- Footer berisi GitHub, LinkedIn, dan copyright.

### Project List

Setiap project card harus memuat:

- Hook berupa hasil terverifikasi; gunakan hook faktual non-kuantitatif jika belum ada metrik.
- Deskripsi masalah dalam satu atau dua kalimat.
- Stack utama.
- Link menuju case study dan live demo/repository hanya jika destinasi tersebut nyata dan boleh dipublikasikan.

### Project Detail

Setiap halaman `/projects/[slug]` mengikuti urutan berikut:

1. **Hook** — hasil utama atau headline metric yang terverifikasi.
2. **Problem** — konteks, constraint, dan alasan masalah penting.
3. **Key Decisions & Trade-offs** — keputusan bergaya ADR dan alternatif yang dipertimbangkan.
4. **Measured Results** — benchmark dengan konteks pengukuran.
5. **What This Demonstrates** — kemampuan teknis yang benar-benar dibuktikan.
6. **Limitations & Next Steps** — batas sistem dan pekerjaan lanjutan.
7. **Technical Evidence** — repository, PRD, ADR, demo, atau dokumen publik yang valid.

## 4. Keputusan Stack

| Area | Keputusan | Alasan |
|---|---|---|
| Framework | **Next.js App Router + TypeScript** | Mendukung SSG/SSR, SEO, initial load cepat, dan narasi full-stack TypeScript. |
| UI components | **shadcn/ui** | Primitive accessible yang dapat dikomposisikan tanpa ketergantungan pada visual library tertutup. |
| Styling | **Tailwind CSS** | Menjaga konsistensi spacing, typography, responsive layout, dan dark-first theme melalui utility dan token terpusat. |
| Case-study content | **MDX di `content/projects/*.mdx`** | Mempertahankan authoring berbasis Markdown sekaligus memungkinkan komponen seperti stat block dan code sample. |
| Typography | **Plus Jakarta Sans + JetBrains Mono** | Plus Jakarta Sans untuk body/heading; JetBrains Mono untuk angka, benchmark, tag teknis, dan kode. |
| Hosting | **Vercel** | Integrasi native dengan Next.js dan deployment berbasis Git. |
| Public language | **English only** | Selaras dengan target hiring team dan proses interview Eropa. |

Stack ini mengoptimalkan kecepatan build, SEO, dan konsistensi visual—bukan fleksibilitas CMS. CMS hanya dievaluasi jika kebutuhan editorial berubah.

## 5. Arah Visual

**Tone:** Technical · Dark-first · Premium · Elegant · Data-forward

### Prinsip

- Gunakan background near-black melalui theme token; jangan memakai pure black sebagai background utama.
- Gunakan satu accent color secara konsisten untuk CTA utama, focus state, dan highlighted metrics.
- Accent yang disetujui adalah technical blue: default/focus `#60a5fa`, hover `#93c5fd`, dan pressed `#3b82f6`. Semua state ini memiliki contrast minimal `5.21:1` terhadap kandidat background `#0a0a0a` dan `#0f0f0f`.
- Tampilkan p95, throughput, test pass rate, atau hasil terverifikasi lain sebagai stat block, bukan menyembunyikannya dalam paragraf.
- Gunakan whitespace yang cukup agar halaman case study tetap mudah dipindai.
- Gunakan motion secara subtle dan purposeful. Hormati `prefers-reduced-motion` dan hindari animasi dekoratif.
- Gunakan semantic HTML, keyboard navigation, visible focus, contrast yang memadai, dan responsive layout.
- Hindari tampilan template portfolio generik, gradient dekoratif berlebihan, dan visual yang tidak mendukung technical evidence.

Referensi karakter visual: produk developer tools seperti Linear, Vercel, dan Raycast. Referensi ini menentukan karakter, bukan izin untuk menyalin layout atau aset.

## 6. Kontrak Implementasi

- Target struktur menggunakan `app/`, `components/`, dan `content/projects/` sebagaimana ditetapkan di `AGENTS.md`.
- Gunakan atau komposisikan shadcn/ui untuk setiap reusable visual/action primitive yang memiliki padanan sesuai; jangan membuat ulang card, badge, separator, alert, atau button dengan native styled markup. Native semantic HTML tetap digunakan untuk struktur dokumen dan inline content yang tidak memiliki padanan shadcn yang tepat.
- Gunakan Tailwind utilities. `globals.css` hanya untuk token global, reset, dan aturan yang tidak wajar jika diekspresikan sebagai utility.
- Simpan warna dan spacing dalam token terpusat; jangan menyebarkan nilai hard-coded berulang di komponen.
- Prefer Server Components dan batasi `"use client"` pada boundary yang benar-benar memerlukan state, event handler, atau browser API.
- Jangan menambahkan CMS, database, API, authentication, analytics, external service, dependency baru, atau localization system tanpa approval sesuai `AGENTS.md`.

## 7. Evidence dan Acceptance Criteria

### Destinasi Kontak Publik yang Disetujui

- **Email:** `mailto:yerikhowilliamt@gmail.com`
- **LinkedIn:** `https://www.linkedin.com/in/yerikhowilliamt`
- **GitHub:** `https://github.com/yerikhowilliamt`
- **CV:** `/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf`

### OhMyPos — Evidence yang Disetujui

- **Live demo:** `https://ohmypos.vercel.app`
- **Source repository:** `https://github.com/yerikhowilliamt/ohmypos`
- **PRD:** `https://github.com/yerikhowilliamt/ohmypos/blob/main/docs/00%20-%20PRD.md`
- **ADR:** `https://github.com/yerikhowilliamt/ohmypos/blob/main/docs/02%20-%20ADR.md`
- **Project documentation:** `https://github.com/yerikhowilliamt/ohmypos/tree/main/docs`
- **Local supporting case study:** `docs/ohmypos-case-study.md` (evidence source only; not an approved public destination)
- **Approved fallback hook:** “A multi-branch POS system built to keep sales, inventory, and financial ledgers consistent under concurrent transactions.”
- **Approved measured-result copy:** “30 concurrent settlement requests against a single payable resolved into exactly 15 successes and 15 conflicts — final balance Rp0.00, zero server errors.”
- **Claim boundary:** Hasil tersebut membuktikan correctness pada skenario dan environment pengujian 2026-08-22 yang tercatat di Phase 01 decision packet. Jangan mengubahnya menjadi klaim latency, throughput, scalability, atau production traffic.

Sebuah halaman atau case study dianggap siap hanya jika:

- Semua klaim penting memiliki evidence atau ditandai belum tersedia.
- Link publik valid dan tidak mengekspos repository atau dokumen privat.
- Struktur halaman sesuai information architecture dan template case study.
- Copy publik berbahasa Inggris dan dapat dipindai dengan cepat.
- Layout bekerja pada viewport mobile dan desktop.
- Navigasi keyboard, focus state, contrast, dan reduced-motion behavior telah diperiksa pada area yang terpengaruh.
- Lint, type-check, test relevan, dan production build dijalankan sesuai matriks validasi di `AGENTS.md` ketika script tersebut tersedia.

## 8. Out of Scope Tanpa Approval

- Route `/resume` versi web.
- Toggle atau lokalisasi bahasa Indonesia.
- Headless CMS atau editor non-teknis.
- Database, persistence, API, authentication, analytics, dan tracking.
- Project atau top-level route di luar sitemap yang disetujui.
- Perubahan content schema atau public URL yang bersifat breaking.

## 9. Open Decisions

Keputusan Phase 01 untuk accent, status CV, tautan publik OhMyPos, fallback hook, dan metric concurrency pertama telah diselesaikan pada 2026-08-25 dan dicatat di Phase 01 decision packet.

- CV publik, email, LinkedIn, dan personal GitHub telah disetujui pada 2026-08-25. Tampilkan hanya destinasi persis yang tercatat di atas; route `/resume` tetap tidak disetujui.
- Metric tambahan untuk OhMyPos atau project lain tetap memerlukan evidence contract dan persetujuan copy secara terpisah.
- **Phase 02 selesai pada 2026-08-25.** Foundation Next.js, theme tokens, shadcn-compatible primitive, dan controlled MDX pipeline telah tervalidasi sebelum Phase 03 dimulai.
- **Phase 04 selesai pada 2026-08-26.** `/projects`, static project detail, validated seven-section MDX contract, draft filtering, constrained components, dan reusable stat block telah tervalidasi. Konten publik masih berupa fixture transparan; Phase 05 tetap memiliki publikasi narrative OhMyPos.
