# OhMyPos — POS yang Menyatukan Penjualan, Stok, Utang, dan Rekonsiliasi Bank

> Portfolio case study · Full-stack engineering · System design · Financial correctness

## Ringkasan

OhMyPos adalah aplikasi POS dan back-office berbasis web untuk bisnis F&B multi-cabang di Indonesia. Sistem ini menggantikan pencatatan yang tersebar di spreadsheet dan buku dengan satu alur terintegrasi: transaksi kasir memperbarui penjualan, konsumsi bahan baku, HPP, dan buku besar; transaksi non-tunai kemudian dapat dicocokkan dengan mutasi bank.

Fokus engineering proyek ini bukan sekadar membuat layar kasir, tetapi menjaga agar angka stok dan keuangan tetap konsisten ketika banyak proses bisnis saling bersinggungan.

**Peran dan cakupan kontribusi:** menerjemahkan kebutuhan operasional menjadi model domain, merancang arsitektur aplikasi, membangun backend dan frontend, serta melakukan hardening melalui pengujian concurrency, end-to-end, dan benchmark berbasis volume.

**Stack:** TypeScript, NestJS, Next.js, PostgreSQL, Prisma, Zod, React Query, shadcn/ui, pnpm, Turborepo, Docker, Vercel, dan Render.

## Problem statement

Bisnis target mengelola penjualan, pengeluaran, pembelian bahan baku, stok, dan utang supplier secara manual di beberapa cabang. Kondisi ini menimbulkan empat masalah utama:

- Tidak ada satu sumber data untuk omzet, HPP, margin produk, dan posisi stok.
- Perubahan harga bahan baku dapat mengubah laporan historis apabila HPP tidak disimpan pada saat penjualan.
- Pembelian secara utang mudah tercampur dengan pengeluaran kas, padahal uang belum benar-benar keluar.
- Pembayaran QRIS, transfer, dan kartu baru masuk ke rekening setelah jeda atau potongan biaya, sehingga catatan POS sulit dicocokkan dengan settlement bank.

Tantangan teknisnya: satu transaksi penjualan harus membuat sale, menyimpan HPP historis, mengurangi beberapa bahan baku, dan menulis pendapatan ke ledger tanpa menghasilkan state parsial—termasuk ketika transaksi berjalan bersamaan.

## Keputusan arsitektur kunci

### 1. Modular monolith dan satu database untuk transaksi lintas-domain

Backend dibangun sebagai modular monolith NestJS dengan satu PostgreSQL. Frontend Next.js berkomunikasi melalui REST, sementara modul sale, inventory, payable, ledger, dan reconciliation tetap dipisahkan berdasarkan tanggung jawab domain.

Pilihan ini memungkinkan sale, pergerakan stok, dan ledger diselesaikan dalam satu transaksi database. Memisahkannya menjadi beberapa service sejak awal akan mengubah masalah tersebut menjadi distributed transaction yang membutuhkan retry, idempotency, dan mekanisme pemulihan tambahan.

**Trade-off:** deployment dan scaling backend belum dapat dilakukan per domain. Ini diterima karena skala awal adalah satu bisnis multi-cabang dan nilai utamanya terletak pada konsistensi data, bukan independent service scaling.

### 2. Stok dan kas terpusat, tetapi setiap transaksi tetap memiliki atribusi cabang

Bisnis menggunakan satu dapur pusat dan satu pool kas, sehingga OhMyPos tidak membuat saldo stok atau rekening terpisah untuk setiap cabang. Sebaliknya, `branchId` disimpan pada transaksi untuk analisis asal penjualan dan pengeluaran.

**Trade-off:** model lebih sederhana dan sesuai operasi nyata, tetapi belum mendukung saldo stok per cabang. Jika kebutuhan tersebut muncul, perubahan harus dilakukan pada model data dan aturan konsistensi—bukan sekadar menambahkan filter UI.

### 3. Correctness finansial dijadikan invariant sistem

Nilai uang dan kuantitas menggunakan Decimal, bukan floating point. HPP dihitung dari resep lalu disimpan pada setiap item penjualan agar laporan lama tidak berubah ketika harga bahan baku diperbarui. Stock movement dan ledger diperlakukan sebagai histori append-only.

Pada penjualan, baris bahan baku dikunci dengan `SELECT ... FOR UPDATE` dalam urutan ID yang konsisten sebelum stok diubah. Strategi ini mencegah overselling dan mengurangi risiko deadlock pada transaksi bersamaan.

**Trade-off:** locking menambah round trip dan dapat membatasi throughput pada skala sangat tinggi. Untuk skala target, biaya tersebut lebih kecil daripada risiko stok negatif atau ledger yang tidak cocok dengan transaksi.

### 4. Zod sebagai kontrak bersama backend dan frontend

Schema request/response disimpan dalam package bersama dan digunakan oleh NestJS maupun Next.js. Validasi runtime dan tipe TypeScript berasal dari sumber yang sama, sehingga perubahan kontrak tidak bergantung pada sinkronisasi DTO dan interface secara manual.

**Trade-off:** frontend dan backend menjadi terkoordinasi pada level kontrak dan perlu divalidasi bersama ketika schema berubah. Dalam monorepo, coupling ini disengaja karena menangkap contract drift sebelum deployment.

### 5. Laporan dihitung saat query, bukan melalui materialized view

Laporan laba-rugi, profit per produk, pendapatan per metode pembayaran, produk terlaris, dan pendapatan harian dihitung langsung dari ledger dan transaksi. Pendekatan ini menghindari cache invalidation dan risiko read model tertinggal dari sumber data.

**Trade-off:** biaya query bertambah bersama histori. Keputusan tidak dianggap permanen; proyek menetapkan trigger terukur untuk beralih ke snapshot atau materialized view ketika latency melewati budget.

## Hasil yang terukur

### Validasi skala laporan

Benchmark menggunakan database disposable dengan tiga cabang dan volume sekitar tiga kali skala aktual bisnis saat pengukuran:

| Dataset benchmark | Volume |
|---|---:|
| Histori transaksi | 36 bulan |
| Sales | 395.022 |
| Sale items | 986.384 |
| Stock movements | 1.808.816 |

Lima endpoint laporan utama diuji menggunakan 20 warm HTTP requests per skenario dan diperiksa dengan `EXPLAIN (ANALYZE, BUFFERS)`:

- Worst case laporan satu tahun adalah **720 ms p95**, masih di bawah budget arsitektur 1 detik.
- Seluruh query laporan satu bulan menggunakan index; trigger optimasi materialized view belum aktif.
- Inventory summary mencapai **222 ms p50 / 768 ms p95** pada 1,8 juta stock movements. Angka ini masih di bawah budget global 1 detik, tetapi telah melewati budget khusus inventory 250 ms dan dicatat sebagai batas skalabilitas yang perlu ditangani dengan monthly snapshot/read model.

### Validasi concurrency dan konsistensi

- Skenario oversubscription berisi 50 request penjualan mencatat **75 ms p50, 173 ms p95, dan 183 ms maksimum**. Karena batas koneksi environment lokal, request dijalankan dalam burst maksimal 20; hasil ini tidak diklaim sebagai benchmark 50 koneksi serentak penuh.
- Uji 30 settlement yang bersaing pada satu payable menghasilkan tepat **15 sukses dan 15 respons conflict**, saldo akhir **Rp0,00**, serta **0 respons 5xx**.
- Probe lock-ordering 40 request menemukan deadlock nyata pada alur pembelian. Urutan operasi kemudian diperbaiki agar explicit row lock selalu diperoleh sebelum penulisan item pembelian.

### Quality gate

- Hardening gate lintas monorepo terakhir untuk fase verifikasi lulus **15/15 task**: lint, typecheck, test, dan build.
- Run monorepo terbaru yang terdokumentasi lulus **13/13 task**, terdiri dari **175/175 API unit tests** dan **456/456 web tests**; targeted API E2E untuk perubahan tersebut lulus **41/41**.
- Pengujian mengikuti risiko, bukan mengejar satu angka coverage global: sale, rollback, row locking, RBAC, branch isolation, payable settlement, rekonsiliasi, dan monthly financial cycle mendapat pengujian lebih dalam daripada komponen presentasional.

Angka di atas berasal dari benchmark sintetis dan validation run lokal/CI yang terdokumentasi, bukan metrik traffic produksi.

## Dampak engineering

Proyek ini menunjukkan kemampuan untuk:

- Mengubah proses operasional yang ambigu menjadi domain model dan invariant yang dapat diuji.
- Menyeimbangkan correctness, biaya operasional, dan kebutuhan scale tanpa langsung memilih microservices atau precomputation.
- Menemukan defect yang hanya muncul pada integrasi nyata, termasuk deadlock database, perbedaan batas periode UTC/WIB, dan kegagalan CORS pada browser yang tidak terlihat melalui `curl`.
- Mengukur asumsi arsitektur dengan data lalu mempertahankan atau meninjau keputusan berdasarkan threshold yang eksplisit.
- Menjaga traceability melalui PRD, system design, ADR, error log, task log, dan tech-debt register.

## Batasan dan langkah berikutnya

OhMyPos v1 sengaja difokuskan untuk satu bisnis. Multi-tenant SaaS, stok per cabang, dan materialized reporting belum menjadi bagian implementasi ini. Prioritas berikutnya adalah:

1. Membuat monthly inventory snapshot ketika volume historis mendekati benchmark T2 atau latency produksi mengonfirmasi bottleneck.
2. Menambahkan idempotency key pada pembuatan sale untuk menangani respons jaringan yang hilang dengan aman.
3. Menyelesaikan alur void/refund dengan transaksi pembalik yang menjaga ledger, stok, dan audit trail tetap konsisten.
4. Memperluas tenant isolation hanya melalui migrasi arsitektur terencana, bukan dengan menempelkan `tenantId` pada sebagian tabel.

## Bukti teknis

Detail keputusan dan pengukuran dapat ditelusuri pada:

- [Product Requirements Document](../00%20-%20PRD.md)
- [System Design](../01%20-%20System_Design.md)
- [Architecture Decision Records](../02%20-%20ADR.md)
- [Engineering Playbook](../04%20-%20Engineering_Playbook.md)
- [Task Log — Phase 14 Verification & Hardening](../07%20-%20Task_Log.md#task-065--phase-14-verification--hardening-gate)
- [Tech Debt Log — measured performance boundaries](../08%20-%20Tech_Debt_Log.md#debt-001--reports-computed-at-query-time-no-materialized-views)
