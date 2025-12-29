# Master Pengguna - Digital Arsip

## Overview
Fitur Master Pengguna untuk mengelola data pengguna sistem Digital Arsip PT Asando Karya.

## Fitur
- ✅ Daftar pengguna dengan tabel
- ✅ Tambah pengguna baru (halaman terpisah, tanpa modal)
- ✅ Edit pengguna (halaman terpisah, tanpa modal)
- ✅ Hapus pengguna dengan konfirmasi
- ✅ Validasi form (backend & frontend)
- ✅ Flash messages untuk notifikasi
- ✅ Role-based (Admin & User)
- ✅ Proteksi hapus akun sendiri

## Struktur File

### Backend
```
app/Http/Controllers/PenggunaController.php
- index()   : Menampilkan daftar pengguna
- create()  : Menampilkan form tambah
- store()   : Menyimpan pengguna baru
- edit()    : Menampilkan form edit
- update()  : Mengupdate data pengguna
- destroy() : Menghapus pengguna
```

### Frontend
```
resources/js/Pages/Pengguna/
├── Index.jsx  : Halaman daftar pengguna dengan tabel
├── Create.jsx : Halaman form tambah pengguna
└── Edit.jsx   : Halaman form edit pengguna
```

### Custom Components
```
resources/js/components/ui/custom/
├── CustomTable.jsx  : Komponen tabel dengan kolom dinamis
├── CustomInput.jsx  : Input field dengan label dan error message
├── CustomSelect.jsx : Dropdown select dengan label dan error message
├── CustomButton.jsx : Button dengan variant primary, secondary, danger, ghost
└── CustomCard.jsx   : Card container
```

## Routes
```php
Route::resource('pengguna', PenggunaController::class);
```

Generates:
- GET    /pengguna          → index
- GET    /pengguna/create   → create
- POST   /pengguna          → store
- GET    /pengguna/{id}/edit → edit
- PUT    /pengguna/{id}     → update
- DELETE /pengguna/{id}     → destroy

## Database Schema
```sql
Table: users
- id_user (PK)
- nama (varchar 100)
- username (varchar 50, unique)
- password (hashed)
- role (enum: admin, user)
- created_at
- updated_at
```

## Validasi

### Create/Store
- nama: required, max:100
- username: required, max:50, unique
- password: required, min:6
- role: required, in:admin,user

### Update
- nama: required, max:100
- username: required, max:50, unique (except current user)
- password: nullable, min:6
- role: required, in:admin,user

## Usage

### Menambah Pengguna
1. Klik tombol "Tambah Pengguna" di halaman index
2. Isi form (Nama, Username, Password, Role)
3. Klik "Simpan Pengguna"
4. Redirect ke halaman index dengan flash message

### Mengedit Pengguna
1. Klik icon edit (pensil) di tabel
2. Update data yang diperlukan
3. Kosongkan password jika tidak ingin mengubah
4. Klik "Simpan Perubahan"
5. Redirect ke halaman index dengan flash message

### Menghapus Pengguna
1. Klik icon hapus (trash) di tabel
2. Konfirmasi penghapusan
3. Data dihapus dengan soft delete (optional)
4. Flash message muncul

## Security Features
- Password di-hash otomatis (bcrypt)
- Tidak bisa hapus akun sendiri
- Username harus unique
- Role validation (admin/user only)
- Form validation server-side & client-side

## Design System
Mengikuti coding style guidance:
- Warna primary: #4A7EBB
- Warna secondary: #F5845C
- Warna success: #4CAF93
- Warna danger: red-600
- Font: Inter
- Icons: lucide-react
- Cards: shadow-none
- Buttons: rounded-md

## Testing
Data awal sudah ada di seeder:
```bash
php artisan migrate:fresh --seed
```

Default users:
- Admin: username `admin`, password `password`
- User: username `user`, password `password`

## Notes
- Tidak menggunakan modal untuk form create/edit
- Menggunakan halaman terpisah untuk better UX
- Flash messages terintegrasi dengan Inertia.js
- Responsive design dengan Tailwind CSS
- Follow clean architecture pattern
