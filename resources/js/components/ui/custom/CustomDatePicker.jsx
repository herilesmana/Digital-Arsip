import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CustomButton } from './CustomButton'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

/**
 * CustomDatePicker - Date picker dengan design system Digital Arsip
 * 
 * @param {Object} props
 * @param {string} props.label - Label date picker (opsional)
 * @param {string} props.error - Error message (opsional)
 * @param {Date} props.value - Selected date
 * @param {Function} props.onChange - Callback when date changes
 * @param {string} props.placeholder - Placeholder text
 * 
 * @example
 * <CustomDatePicker 
 *   label="Tanggal Arsip" 
 *   error={errors.tanggal_arsip}
 *   value={data.tanggal_arsip}
 *   onChange={(date) => setData('tanggal_arsip', date)}
 *   placeholder="Pilih tanggal"
 * />
 */
export function CustomDatePicker({
    label,
    error,
    value,
    onChange,
    placeholder = 'Pilih tanggal',
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-neutral-700">
                    {label}
                </label>
            )}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-2 text-sm border rounded-md bg-white transition-all duration-200",
                            "border-neutral-300 focus:border-[#4A7EBB] focus:ring-2 focus:ring-[#4A7EBB]/20",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                            !value && "text-neutral-500"
                        )}
                        {...props}
                    >
                        {value ? (
                            format(new Date(value), 'dd MMMM yyyy', { locale: id })
                        ) : (
                            <span>{placeholder}</span>
                        )}
                        <CalendarIcon className="w-4 h-4 text-neutral-500" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        onSelect={(date) => {
                            onChange(date)
                            setIsOpen(false)
                        }}
                        locale={id}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}
