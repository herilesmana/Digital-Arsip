/**
 * StatCard - Card untuk menampilkan statistik dengan warna branded
 * 
 * @param {Object} props
 * @param {'blue'|'orange'|'teal'|'darkblue'} props.variant - Varian warna
 * @param {string|number} props.value - Nilai statistik
 * @param {string} props.label - Label statistik
 * @param {React.ReactNode} props.icon - Icon (dari lucide-react)
 * @param {string} props.className - Class tambahan
 * 
 * @example
 * import { FileText } from 'lucide-react'
 * 
 * <StatCard 
 *   variant="blue" 
 *   value="1,234" 
 *   label="Total Arsip"
 *   icon={<FileText className="w-8 h-8" />}
 * />
 */
export function StatCard({
    variant = 'blue',
    value,
    label,
    icon,
    className = '',
    ...props
}) {
    const variants = {
        blue: 'bg-[#5B9BD5]',
        orange: 'bg-[#F5845C]',
        teal: 'bg-[#4CAF93]',
        darkblue: 'bg-[#4A7EBB]',
    };

    return (
        <div
            className={`${variants[variant]} text-white p-6 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${className}`}
            {...props}
        >
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-3xl font-bold mb-1">{value}</div>
                    <div className="text-sm opacity-90">{label}</div>
                </div>
                {icon && (
                    <div className="opacity-80">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}
