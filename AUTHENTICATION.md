# Authentication Setup - Digital Arsip

## ✅ Authentication Implementation Complete

Authentication system sudah berhasil diimplementasikan menggunakan username dan password.

## 🔐 Credentials

### Default Users

**Admin Account:**
- Username: `admin`
- Password: `password`
- Role: `admin`

**Regular User Account:**
- Username: `user`
- Password: `password`
- Role: `user`

## 📂 File Structure

### Frontend Components

```
resources/js/
├── Pages/
│   ├── Auth/
│   │   └── Login.jsx              # Login page
│   └── Dashboard.jsx               # Dashboard after login
├── components/ui/custom/
│   ├── CustomInput.jsx             # Custom input with error handling
│   ├── LoginForm.jsx               # Login form component
│   └── index.js                    # Export all custom components
```

### Backend Files

```
app/
├── Http/
│   ├── Controllers/Auth/
│   │   └── LoginController.php    # Handle login/logout
│   ├── Requests/Auth/
│   │   └── LoginRequest.php       # Validate login data
│   └── Middleware/
│       └── HandleInertiaRequests.php  # Share auth data
├── Services/Auth/
│   └── AuthService.php             # Authentication logic
└── Models/
    └── User.php                    # User model
```

## 🛣️ Routes

### Public Routes
- `GET /` - Welcome page
- `GET /login` - Login page (guest only)
- `POST /login` - Login submission

### Protected Routes (Auth Required)
- `GET /dashboard` - Dashboard
- `POST /logout` - Logout

## 🏗️ Architecture

### Clean Architecture Pattern

**1. Controller Layer** (`LoginController.php`)
- Handle HTTP requests
- Validate data using FormRequest
- Call service layer
- Return Inertia response

**2. Service Layer** (`AuthService.php`)
- Business logic
- Authentication logic
- Session management
- No repository pattern (as per guidelines)

**3. Form Request** (`LoginRequest.php`)
- Validation rules
- Error messages in Indonesian

## 🎨 Custom Components

### CustomInput
```jsx
import { CustomInput } from '@/components/ui/custom'

<CustomInput
  label="Username"
  type="text"
  value={data.username}
  onChange={(e) => setData('username', e.target.value)}
  error={errors.username}
/>
```

### LoginForm
```jsx
import { LoginForm } from '@/components/ui/custom'

<LoginForm />
```

## 🔄 Authentication Flow

1. **User mengakses `/login`**
   - LoginController@create menampilkan halaman login
   - Inertia render Login.jsx

2. **User submit form**
   - Data dikirim via Inertia POST ke `/login`
   - LoginRequest memvalidasi data
   - LoginController@store memanggil AuthService
   - AuthService memverifikasi credentials
   - Session dibuat dan user di-login
   - Redirect ke `/dashboard`

3. **User mengakses protected route**
   - Middleware `auth` mengecek authentication
   - Jika authenticated: akses diberikan
   - Jika tidak: redirect ke `/login`

4. **User logout**
   - POST ke `/logout`
   - AuthService menghapus session
   - Redirect ke `/login`

## 🛡️ Security Features

- ✅ Password hashing dengan bcrypt
- ✅ Session regeneration setelah login
- ✅ CSRF protection (Laravel default)
- ✅ Remember me functionality
- ✅ Guest middleware untuk login page
- ✅ Auth middleware untuk protected routes

## 📝 Usage Examples

### Cek Authentication di Component

```jsx
export default function Dashboard({ auth }) {
  // auth.user berisi data user yang login
  console.log(auth.user.nama);
  console.log(auth.user.role);
}
```

### Logout Button

```jsx
import { router } from '@inertiajs/react'

const handleLogout = () => {
  router.post(route('logout'))
}

<button onClick={handleLogout}>Logout</button>
```

### Protected Route

```php
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});
```

## 🔧 Configuration

### User Model
- Primary key: `id_user`
- Fields: `nama`, `username`, `password`, `role`
- Password automatically hashed

### Shared Data (HandleInertiaRequests)
```php
'auth' => [
    'user' => [
        'id_user' => $user->id_user,
        'nama' => $user->nama,
        'username' => $user->username,
        'role' => $user->role,
    ]
]
```

## 🚀 Testing Authentication

1. **Start dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Access login page**:
   ```
   http://digital-arsip.test/login
   ```

3. **Login dengan credentials**:
   - Username: `admin`
   - Password: `password`

4. **Akan redirect ke dashboard**

5. **Test logout**: Click logout button

## 📦 Dependencies

- **Laravel**: Authentication scaffolding
- **Inertia.js**: Form handling dengan useForm
- **Ziggy**: Route helpers di frontend
- **shadcn/ui**: Base UI components (input, label)
- **Custom Components**: Following style guide

## 🎯 Following Guidelines

✅ **Clean Architecture**
- Service layer untuk business logic
- Form Request untuk validation
- No repository pattern

✅ **Component Structure**
- shadcn base components di `components/ui/`
- Custom wrappers di `components/ui/custom/`
- Following `style_guidance_json.json`

✅ **Coding Standards**
- Code in English
- Comments in Bahasa Indonesia
- Named exports for components
- Proper error handling

## 📚 Next Steps

Untuk menambah fitur authentication:

1. **Password Reset**
   - Create ForgotPasswordController
   - Create reset password service
   - Create reset password pages

2. **Email Verification**
   - Add email field to users
   - Implement verification logic

3. **Role-based Access Control**
   - Create middleware for roles
   - Protect routes based on role

4. **User Management**
   - CRUD users
   - Change password
   - User profile
