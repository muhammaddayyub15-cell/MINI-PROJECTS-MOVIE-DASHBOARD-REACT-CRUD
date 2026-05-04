Project Dokumentasi ID

# 🎬 INDOFLIX — Movie Dashboard React CRUD

> Mini Project React.js + Laravel dengan fitur autentikasi, manajemen user & movie, watchlist, reactions, dan admin dashboard. Dibangun dengan desain **Glassmorphism** premium.

---

## 📦 Library yang Digunakan

| Library | Versi | Kegunaan |
|---|---|---|
| `react` | ^19 | Frontend framework utama |
| `react-dom` | ^19 | Rendering React ke DOM |
| `react-router-dom` | ^7 | Routing & navigation (SPA) |
| `axios` | ^1 | HTTP client untuk komunikasi API |
| `tailwindcss` | ^4 | Utility-first CSS framework |
| `vite` | ^6 | Build tool & dev server |

---

## Fitur Utama (Requirement)

### 🔐 Autentikasi
- **Register** — form registrasi user baru, token langsung dikembalikan setelah daftar
- **Login** — autentikasi dengan token (Laravel Sanctum)
- **Logout** — hapus token dari storage
- **Protected Routes** — halaman tertentu hanya bisa diakses user yang sudah login
- **Role-based Access** — halaman Admin hanya bisa diakses role `admin`

### 👥 User Management
- **Daftar User** — tabel user dengan pagination di Admin Dashboard
- **Detail User** — halaman detail per user (`/admin/users/:id`)
- **Edit User** — form edit data user (nama, email, password, role)
- **Hapus User** — konfirmasi sebelum delete
- **Toggle Status** — aktifkan / nonaktifkan (suspend) user langsung dari tabel tanpa reload

### 🎬 Movie Features
- **Daftar Film** — grid responsive dengan pagination (24 per halaman)
- **Search Film** — search real-time via API (Navbar desktop; semua halaman: Home, Popular, Genre, Watchlist)
- **Search via URL Params** — keyword search tersimpan di URL (`?search=...`), mendukung bookmark & share
- **Detail Film** — pop-up hover card dengan deskripsi, rating, views, reaksi
- **Watchlist** — simpan film ke watchlist personal
- **Reactions** — berikan reaksi Love / Neutral / Hate pada film
- **Smart Poster Sorting** — film tanpa poster (URL kosong atau 404) otomatis dipindah ke halaman terakhir

### 🛠️ Admin Dashboard
- **Kelola User** — CRUD lengkap dengan quick modal
- **Kelola Movie** — CRUD film (tambah, edit, hapus) dengan pagination tabel (10 per halaman)
- **Badge "No Poster"** — indikator oranye pada film yang belum memiliki poster
- **Statistik** — total user dan total film dari API

### 📱 Responsive Design
- **Desktop** — sidebar permanen, search di Navbar
- **Tablet & Mobile** — sidebar drawer (burger menu), search di halaman utama
- Layout menyesuaikan di semua ukuran layar (2 kolom mobile → 6 kolom desktop)

---

## ⭐ Fitur Tambahan

| Fitur | Deskripsi |
|---|---|
| **Hover Expand Card** | MovieCard membesar saat di-hover, menampilkan detail film tanpa pindah halaman |
| **Pin Card** | Klik card untuk mengunci tampilan detail (tetap expanded walau cursor pindah) |
| **Optimistic UI** | Toggle watchlist & reaction langsung update tampilan tanpa menunggu response API |
| **Status Badge Toggle** | Klik badge status user untuk langsung toggle aktif/nonaktif tanpa buka form edit |
| **Quick Modal User** | Klik baris user di tabel memunculkan modal detail dengan aksi Edit, Delete, dan View Detail |
| **Skeleton Loading** | Placeholder animasi saat data sedang dimuat |
| **Glassmorphism UI** | Desain modern dengan efek blur, transparan, dan gradient |
| **Poster Auto-Sort** | Film tanpa poster (URL kosong atau gambar 404) otomatis dipindah ke halaman akhir |
| **Trending Badge** | Film dengan `is_trending=1` mendapat badge khusus |
| **404 Not Found Page** | Halaman estetik dengan tombol kembali cerdas (ke Home jika login, ke Landing jika tidak) |

---

## 🗂️ Struktur Project

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.jsx             # Axios instance + interceptor token
│   ├── components/
│   │   ├── layout/
│   │   │   └── MainLayout.jsx    # Layout utama (sidebar + navbar + outlet)
│   │   └── ui/
│   │       ├── admin/
│   │       │   ├── Modal.jsx
│   │       │   ├── MovieForm.jsx
│   │       │   └── UserForm.jsx
│   │       ├── bar-side/
│   │       │   ├── Navbar.jsx
│   │       │   ├── Sidebar.jsx
│   │       │   ├── SidebarItem.jsx
│   │       │   └── UserSection.jsx
│   │       └── movie/
│   │           ├── MovieCard.jsx
│   │           └── MovieList.jsx
│   ├── contexts/
│   │   ├── AuthContexts.jsx      # Global auth state (token, user, login, logout)
│   │   └── MovieContexts.jsx     # Global watchlist state
│   ├── pages/
│   │   ├── Landing.jsx           # Halaman publik utama
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── UserDetail.jsx
│   │   ├── Watchlist.jsx
│   │   ├── Popular.jsx
│   │   ├── Genre.jsx
│   │   ├── ComingSoon.jsx
│   │   └── NotFound.jsx          # Halaman 404 dengan redirect cerdas
│   └── route/
│       └── ProtectedRoute.jsx

backend/
├── app/Http/Controllers/
│   ├── AuthController.php
│   ├── MovieController.php
│   ├── UserController.php
│   ├── ReactionController.php
│   └── WatchlistController.php
├── routes/
│   └── api.php
└── database/
    ├── migrations/
    └── seeders/
```

---

## 🚀 Cara Menjalankan

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8001
```

> Admin Default: `admin@mail.com` | Password: `password`

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

> Pastikan backend berjalan di `http://localhost:8001` dan frontend di `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| POST | `/api/register` | ❌ | Register user baru + dapat token |
| POST | `/api/login` | ❌ | Login & dapat token |
| POST | `/api/logout` | ✅ | Logout |
| GET | `/api/me` | ✅ | Info user yang sedang login |
| GET | `/api/users` | ✅ Admin | List semua user |
| GET | `/api/users/:id` | ✅ Admin | Detail user |
| PUT | `/api/users/:id` | ✅ Admin | Update user / toggle suspend |
| DELETE | `/api/users/:id` | ✅ Admin | Hapus user |
| GET | `/api/movies` | ❌ | List film + search + filter genre + pagination |
| GET | `/api/movies/:id` | ✅ | Detail film + reaction count |
| POST | `/api/movies` | ✅ Admin | Tambah film |
| PUT | `/api/movies/:id` | ✅ Admin | Edit film |
| DELETE | `/api/movies/:id` | ✅ Admin | Hapus film |
| GET | `/api/watchlist` | ✅ | Daftar watchlist user |
| POST | `/api/watchlist/:id` | ✅ | Toggle watchlist |
| POST | `/api/reactions/:id` | ✅ | Tambah / ubah reaksi film |

---

## 👨‍💻 Developer

**Muhammad Ayyub** — Mini Project React CRUD Movie Dashboard
