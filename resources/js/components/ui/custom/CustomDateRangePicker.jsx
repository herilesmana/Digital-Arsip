import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CustomButton } from './CustomButton'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

/**
 * CustomDateRangePicker - Date range picker untuk filter laporan
 * 
 * @param {Object} props
 * @param {string} props.label - Label date picker (opsional)
 * @param {string} props.error - Error message (opsional)
 * @param {Object} props.value - Selected date range {from: Date, to: Date}
 * @param {Function} props.onChange - Callback when date range changes
 * @param {string} props.placeholder - Placeholder text
 * 
 * @example
 * <CustomDateRangePicker 
 *   label="Periode Tanggal" 
 *   value={dateRange}
 *   onChange={(range) => setDateRange(range)}
 *   placeholder="Pilih rentang tanggal"
 * />
 */
export function CustomDateRangePicker({
    label,
    error,
    value,
    onChange,
    placeholder = 'Pilih rentang tanggal',
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [tempRange, setTempRange] = useState(value)

    const handleSelect = (range) => {
        // Jika range sudah lengkap (from dan to ada),
        // klik tanggal baru akan reset dan mulai range baru
        if (tempRange?.from && tempRange?.to) {
            // Reset: set tanggal yang diklik sebagai start baru
            if (range?.from) {
                setTempRange({ from: range.from, to: undefined })
            }
        } else {
            // Jika range belum lengkap, update normal
            setTempRange(range)
        }
    }

    const handleApply = () => {
        if (tempRange) {
            onChange(tempRange)
        }
        setIsOpen(false)
    }

    const handleCancel = () => {
        setTempRange(value)
        setIsOpen(false)
    }

    const handleOpenChange = (open) => {
        setIsOpen(open)
        if (open) {
            setTempRange(value)
        }
    }

    const formatDateRange = () => {
        if (!value?.from) return placeholder

        if (!value.to) {
            return format(value.from, 'dd MMM yyyy', { locale: id })
        }

        return `${format(value.from, 'dd MMM yyyy', { locale: id })} - ${format(value.to, 'dd MMM yyyy', { locale: id })}`
    }

    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-neutral-700">
                    {label}
                </label>
            )}
            <Popover open={isOpen} onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            'w-full flex items-center justify-between px-3 py-2 text-sm bg-white border rounded-md transition-colors',
                            'hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#4A7EBB] focus:ring-offset-1',
                            error ? 'border-red-500' : 'border-neutral-300',
                            !value?.from && 'text-neutral-400'
                        )}
                    >
                        <span>{formatDateRange()}</span>
                        <CalendarIcon className="w-4 h-4 text-neutral-400" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3 space-y-3">
                        <Calendar
                            mode="range"
                            selected={tempRange}
                            onSelect={handleSelect}
                            locale={id}
                            numberOfMonths={1}
                            defaultMonth={tempRange?.from || value?.from}
                            showOutsideDays={true}
                            {...props}
                        />
                        <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
                            <button
                                type="button"
                                onClick={handleApply}
                                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-[#4A7EBB] rounded-md hover:bg-[#3d6ba3] transition-colors"
                                disabled={!tempRange?.from || !tempRange?.to}
                            >
                                Terapkan
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}
