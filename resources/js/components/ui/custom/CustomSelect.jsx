import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'

/**
 * CustomSelect - Dropdown select dengan design system Digital Arsip
 * 
 * @param {Object} props
 * @param {string} props.label - Label select (opsional)
 * @param {string} props.error - Error message (opsional)
 * @param {Array} props.options - Array of {value, label} objects
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Selected value
 * @param {Function} props.onValueChange - Callback when value changes
 * @param {string} props.className - Class tambahan
 * 
 * @example
 * <CustomSelect 
 *   label="Role" 
 *   error={errors.role}
 *   options={[
 *     { value: 'admin', label: 'Admin' },
 *     { value: 'user', label: 'User' }
 *   ]}
 *   value={data.role}
 *   onValueChange={(value) => setData('role', value)}
 *   placeholder="Pilih role"
 * />
 */
export function CustomSelect({
    label,
    error,
    options = [],
    placeholder,
    value,
    onValueChange,
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
            <Select value={value} onValueChange={onValueChange} {...props}>
                <SelectTrigger
                    className={cn(
                        "w-full border-neutral-300 focus:border-[#4A7EBB] focus:ring-[#4A7EBB]/20 rounded-md transition-all duration-200",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        className
                    )}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}
