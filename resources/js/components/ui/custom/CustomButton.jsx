import { Button } from '@/components/ui/button';

/**
 * CustomButton - Tombol dengan design system Digital Arsip
 * 
 * @param {Object} props
 * @param {'primary'|'secondary'|'success'|'ghost'} props.variant - Varian tombol
 * @param {'sm'|'md'|'lg'} props.size - Ukuran tombol
 * @param {React.ReactNode} props.children - Konten tombol
 * @param {Object} props.rest - Props lainnya yang diteruskan ke Button
 * 
 * @example
 * <CustomButton variant="primary" size="md">
 *   Save Changes
 * </CustomButton>
 */
export function CustomButton({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}) {
    const variants = {
        primary: 'bg-[#4A7EBB] hover:bg-[#3B6296] text-white font-medium',
        secondary: 'bg-[#F5845C] hover:bg-[#F25E2B] text-white font-medium',
        success: 'bg-[#4CAF93] hover:bg-[#3D8C76] text-white font-medium',
        ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-700',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <Button
            className={`rounded-md transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </Button>
    );
}
