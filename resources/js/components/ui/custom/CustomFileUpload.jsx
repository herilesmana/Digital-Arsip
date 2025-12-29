import { useState, useRef } from 'react'
import { CustomButton } from './CustomButton'
import { Upload, X, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * CustomFileUpload - File upload dengan design system Digital Arsip
 * 
 * @param {Object} props
 * @param {string} props.label - Label file upload (opsional)
 * @param {string} props.error - Error message (opsional)
 * @param {Array} props.value - Array of selected files
 * @param {Function} props.onChange - Callback when files change
 * @param {boolean} props.multiple - Allow multiple files
 * @param {string} props.accept - Accepted file types
 * 
 * @example
 * <CustomFileUpload 
 *   label="Upload File" 
 *   value={selectedFiles}
 *   onChange={setSelectedFiles}
 *   multiple
 *   accept=".pdf,.doc,.docx,.jpg,.png"
 * />
 */
export function CustomFileUpload({
    label,
    error,
    value = [],
    onChange,
    multiple = false,
    accept,
    ...props
}) {
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || [])
        if (multiple) {
            onChange([...value, ...files])
        } else {
            onChange(files)
        }
    }

    const removeFile = (index) => {
        const newFiles = value.filter((_, i) => i !== index)
        onChange(newFiles)
        // Reset input if no files left
        if (newFiles.length === 0 && fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-neutral-700">
                    {label}
                </label>
            )}

            <div className={cn(
                "border-2 border-dashed rounded-md p-6 transition-all duration-200",
                error ? "border-red-500" : "border-neutral-300 hover:border-[#4A7EBB]"
            )}>
                <div className="flex flex-col items-center justify-center gap-3">
                    <Upload className="w-10 h-10 text-neutral-400" />
                    <div className="text-center">
                        <p className="text-sm text-neutral-600 mb-2">
                            Klik tombol di bawah untuk upload file
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            multiple={multiple}
                            accept={accept}
                            className="hidden"
                            {...props}
                        />
                        <CustomButton
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Pilih File
                        </CustomButton>
                    </div>
                    {accept && (
                        <p className="text-xs text-neutral-500">
                            Format: {accept}
                        </p>
                    )}
                </div>
            </div>

            {/* File List */}
            {value.length > 0 && (
                <div className="space-y-2 mt-3">
                    {value.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-neutral-50 rounded-md border border-neutral-200"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <FileText className="w-5 h-5 text-[#4A7EBB] flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-neutral-900 truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-neutral-500">
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="p-1 hover:bg-red-100 rounded-md transition-colors"
                            >
                                <X className="w-4 h-4 text-red-600" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}
