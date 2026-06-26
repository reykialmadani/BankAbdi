# Bank Abdi - Website Profil & Layanan Perbankan

Repositori ini berisi kode sumber untuk website **Bank Abdi** (Bank Perekonomian Rakyat / Pembiayaan Rakyat Syariah), yang dibangun menggunakan **Next.js** (Pages Router), **TypeScript**, dan **Tailwind CSS**.

Website ini dirancang untuk menyajikan informasi profil perusahaan, produk perbankan (tabungan, deposito, pinjaman/pembiayaan), laporan keuangan/tahunan, serta artikel/berita terbaru kepada nasabah dan masyarakat luas.

---

## 🚀 Fitur Utama

- **Halaman Beranda Dinamis**: Banner hero interaktif, keunggulan layanan, solusi perbankan, ulasan nasabah (testimoni), dan informasi terbaru.
- **Halaman Profil (Tentang Kami)**: Informasi detail mengenai visi, misi, sejarah, kepengurusan, dan legalitas Bank Abdi.
- **Produk Perbankan Dinamis**:
  - **Tabungan**: Informasi berbagai jenis produk tabungan nasabah.
  - **Deposito**: Detail program simpanan berjangka dengan bagi hasil/suku bunga kompetitif.
  - **Pinjaman**: Informasi pembiayaan atau pinjaman untuk modal usaha, konsumtif, dll.
- **Laporan Perusahaan**: Akses publik untuk laporan tahunan dan laporan tata kelola bank.
- **Blog & Informasi**: Informasi edukasi keuangan, berita terbaru, dan pengumuman resmi.
- **Formulir Hubungi Kami**: Kontak detail, peta lokasi kantor, serta formulir pengiriman pesan.
- **Visitor Tracker**: Integrasi pencatat kunjungan nasabah/pengunjung website.

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun di atas ekosistem modern web development:

- **Framework**: [Next.js 15 (Pages Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Animasi & Transisi**: [Framer Motion](https://www.framer.com/motion/)
- **Slider/Karusel**: [Swiper](https://swiperjs.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [FontAwesome 6](https://fontawesome.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Rich Text Editor**: [React Quill (React Quill New)](https://github.com/zenoamaro/react-quill)
- **State/Cookie Management**: [js-cookie](https://github.com/js-cookie/js-cookie) & [uuid](https://github.com/uuidjs/uuid)

---

## 📂 Struktur Direktori Utama

```text
bankabdi/
├── public/              # Aset statis (gambar, logo, ikon, dokumen)
├── src/
│   ├── lib/             # Konfigurasi utilitas bersama (helper, API helper)
│   ├── styles/          # File style global dan konfigurasi CSS
│   └── pages/           # Sistem Routing Next.js (Pages Router)
│       ├── components/  # Komponen UI Reusable
│       │   ├── layout/  # Header, Footer, Sidebar
│       │   └── section/ # Komponen bagian halaman (Hero, Keunggulan, dll)
│       ├── deposito/    # Rute dinamis produk Deposito
│       ├── informasi/   # Rute dinamis info/pengumuman
│       ├── laporan/     # Rute dinamis laporan keuangan/tahunan
│       ├── pinjaman/    # Rute dinamis produk Pinjaman/Pembiayaan
│       ├── posts/       # Rute dinamis artikel & berita blog
│       ├── tabungan/    # Rute dinamis produk Tabungan
│       ├── _app.tsx     # Inisialisasi halaman utama
│       ├── _document.tsx# Kustomisasi tag HTML dan Body
│       ├── index.tsx    # Halaman Utama (Home Entry Point)
│       ├── about.tsx    # Halaman Tentang Kami
│       └── contact.tsx  # Halaman Hubungi Kami
├── .env.local           # Konfigurasi Environment Variables (Lokal)
├── next.config.ts       # Konfigurasi Next.js
├── tailwind.config.ts   # Konfigurasi Tailwind CSS
└── tsconfig.json        # Konfigurasi TypeScript
```

---

## ⚙️ Persiapan & Instalasi

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di komputer lokal Anda:

### 1. Prasyarat
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (Versi LTS direkomendasikan, minimal v18+)
- Package manager seperti `npm` (bawaan Node.js), `yarn`, atau `pnpm`.

### 2. Kloning Repositori
```bash
git clone <url-repositori-anda>
cd bankabdi
```

### 3. Instalasi Dependensi
Jalankan perintah berikut untuk mengunduh semua library yang dibutuhkan:
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 4. Konfigurasi Environment Variables
Buat berkas `.env.local` di root direktori jika belum ada (Anda dapat menyalin dari `.env`), lalu sesuaikan variabel lingkungan seperti URL API backend:
```env
NEXT_PUBLIC_API_URL=https://api.bankabdi.co.id
```

### 5. Menjalankan Server Pengembangan
Jalankan server lokal untuk melihat hasil codingan secara langsung:
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```
Setelah berjalan, buka [http://localhost:3000](http://localhost:3000) di peramban (browser) Anda.

### 6. Membuat Build Produksi
Untuk mengompilasi dan mengoptimalkan website sebelum di-deploy ke production:
```bash
npm run build
npm run start
```

