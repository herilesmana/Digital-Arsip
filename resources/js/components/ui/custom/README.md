# Custom UI Components

This directory contains all custom UI components for the Digital Arsip project.

## 📁 Directory Structure

```
custom/
├── README.md (this file)
└── [Your custom components here]
```

## 🎨 Design System

All custom components follow the design system defined in `style_guidance_json.json`.

## ✨ Component Guidelines

### Creating New Components

1. **Use shadcn as base**: Install base component via `npx shadcn@latest add [component]`
2. **Create custom wrapper**: Create your component in this directory
3. **Apply design tokens**: Use colors and styles from `style_guidance_json.json`
4. **Named exports**: Always use named exports

### Example Structure

```jsx
// CustomButton.jsx
import { Button } from '@/components/ui/button'

export function CustomButton({ variant = 'primary', children, ...props }) {
  const variants = {
    primary: 'bg-[#4A7EBB] hover:bg-[#3B6296] text-white',
    secondary: 'bg-[#F5845C] hover:bg-[#F25E2B] text-white',
  }
  
  return (
    <Button 
      className={`rounded-md transition-all duration-200 ${variants[variant]}`} 
      {...props}
    >
      {children}
    </Button>
  )
}
```

### Usage in Pages

```jsx
import { CustomButton } from '@/components/ui/custom/CustomButton'

export default function MyPage() {
  return <CustomButton variant="primary">Click Me</CustomButton>
}
```

## 🎯 Key Rules

- ✅ Always import from this directory in your pages
- ✅ Follow PascalCase naming convention
- ✅ Use design tokens from style_guidance_json.json
- ✅ Add `shadow-none` className for cards
- ❌ Never modify shadcn components directly
- ❌ Never use inline Tailwind classes in pages

## 📚 Reference

- Style Guide: `style_guidance_json.json`
- Coding Standards: `.coding-style-guidance.json`
- shadcn/ui Docs: https://ui.shadcn.com
