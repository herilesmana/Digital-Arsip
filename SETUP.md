# Digital Arsip - Setup Documentation

## 🎉 Setup Complete!

Project Digital Arsip sudah dikonfigurasi dengan:
- ✅ Laravel 12
- ✅ Inertia.js v2.0
- ✅ React 18
- ✅ Tailwind CSS v4
- ✅ shadcn/ui
- ✅ Custom Components Structure

## 📁 Struktur Project

```
Digital-Arsip/
├── resources/js/
│   ├── Pages/              # Halaman Inertia
│   │   └── Welcome.jsx
│   ├── components/
│   │   └── ui/
│   │       ├── button.jsx       # shadcn base
│   │       ├── card.jsx         # shadcn base
│   │       └── custom/          # Custom components
│   │           ├── CustomButton.jsx
│   │           ├── CustomCard.jsx
│   │           ├── StatCard.jsx
│   │           └── index.js
│   ├── lib/
│   │   └── utils.js
│   └── app.jsx
├── .coding-style-guidance.json  # Panduan coding
├── style_guidance_json.json     # Design system
└── components.json              # shadcn config
```

## 🎨 Design System

### Colors (dari style_guidance_json.json)

- **Primary**: #4A7EBB (Blue)
- **Secondary**: #F5845C (Orange)
- **Success**: #4CAF93 (Teal)
- **Info**: #5B9BD5 (Light Blue)
- **Neutral**: #64748B (Gray)

### Typography

- **Font Family**: Inter
- **Font Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl

## 🔧 Cara Kerja

### 1. Install shadcn Component (Base)

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# dst...
```

Ini akan membuat file di `resources/js/components/ui/`

### 2. Buat Custom Component

Buat wrapper di `resources/js/components/ui/custom/`:

```jsx
// CustomButton.jsx
import { Button } from '@/components/ui/button'

export function CustomButton({ variant = 'primary', children, ...props }) {
  const variants = {
    primary: 'bg-[#4A7EBB] hover:bg-[#3B6296] text-white',
    secondary: 'bg-[#F5845C] hover:bg-[#F25E2B] text-white'
  }
  
  return (
    <Button className={variants[variant]} {...props}>
      {children}
    </Button>
  )
}
```

### 3. Export di index.js

```js
// custom/index.js
export { CustomButton } from './CustomButton'
export { CustomCard } from './CustomCard'
```

### 4. Gunakan di Page

```jsx
// Pages/Dashboard.jsx
import { CustomButton, CustomCard } from '@/components/ui/custom'

export default function Dashboard() {
  return (
    <CustomCard title="Dashboard">
      <CustomButton variant="primary">
        Save
      </CustomButton>
    </CustomCard>
  )
}
```

## 📚 Aturan Penting

### ✅ DO (Lakukan)

1. **Selalu gunakan** `npx shadcn@latest add [component]` untuk base components
2. **Buat custom wrapper** di `components/ui/custom/`
3. **Ikuti design system** dari `style_guidance_json.json`
4. **Gunakan custom components** di seluruh project
5. **Card selalu** `shadow-none`
6. **Icons** menggunakan `lucide-react`

### ❌ DON'T (Jangan)

1. ❌ Jangan modifikasi shadcn components langsung
2. ❌ Jangan tulis inline Tailwind di Pages
3. ❌ Jangan hardcode warna, gunakan design tokens
4. ❌ Jangan import shadcn langsung di Pages

## 🚀 Development Workflow

### Menambah Fitur Baru

1. **Identifikasi** komponen UI yang dibutuhkan
2. **Install shadcn base** (jika belum ada)
3. **Buat custom wrapper** sesuai design system
4. **Tambahkan ke exports** di `custom/index.js`
5. **Gunakan di Page** component

### Contoh: Menambah Form Input

```bash
# 1. Install shadcn input
npx shadcn@latest add input

# 2. Buat CustomInput.jsx
```

```jsx
// resources/js/components/ui/custom/CustomInput.jsx
import { Input } from '@/components/ui/input'

export function CustomInput({ error, ...props }) {
  return (
    <div className="space-y-2">
      <Input 
        className="border-neutral-300 focus:border-[#4A7EBB] rounded-md"
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
```

```js
// 3. Export di index.js
export { CustomInput } from './CustomInput'
```

```jsx
// 4. Gunakan di form
import { CustomInput } from '@/components/ui/custom'

<CustomInput 
  placeholder="Email" 
  error={errors.email}
/>
```

## 📖 Reference Files

- **Coding Guide**: `.coding-style-guidance.json`
- **Design System**: `style_guidance_json.json`
- **shadcn Config**: `components.json`
- **Custom Components**: `resources/js/components/ui/custom/README.md`

## 🌐 Running the Project

```bash
# Development
npm run dev

# Access
http://digital-arsip.test
```

## 📝 Notes

- Project menggunakan **Laravel Herd** untuk local development
- Domain: `digital-arsip.test`
- Vite running di `localhost:5173`
- Always follow clean architecture di backend
- Komentar dalam Bahasa Indonesia, code dalam English
