import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/**
 * CustomInput - Input field dengan design system Digital Arsip
 * 
 * @param {Object} props
 * @param {string} props.label - Label input (opsional)
 * @param {string} props.error - Error message (opsional)
 * @param {string} props.className - Class tambahan
 * @param {React.Ref} ref - Ref forwarding
 * 
 * @example
 * <CustomInput 
 *   label="Username" 
 *   error={errors.username}
 *   value={data.username}
 *   onChange={(e) => setData('username', e.target.value)}
 * />
 */
export function CustomInput({
    label,
    error,
    className = '',
    ...props
}) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-neutral-700">
                    {label}
                </label>
            )}
            <Input
                className={cn(
                    "border-neutral-300 focus:border-[#4A7EBB] focus:ring-[#4A7EBB]/20 rounded-md transition-all duration-200",
                    error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
