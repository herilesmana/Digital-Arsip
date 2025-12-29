import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

/**
 * Custom Table Component
 * Wrapper untuk shadcn Table dengan styling sesuai design system
 * 
 * @param {Array} columns - Array of column definitions [{ key: string, label: string, className?: string }]
 * @param {Array} data - Array of data objects
 * @param {Function} renderCell - Optional custom cell renderer (item, column) => ReactNode
 * @param {string} caption - Optional table caption
 * @param {string} emptyMessage - Message when data is empty
 */
export function CustomTable({
    columns = [],
    data = [],
    renderCell,
    caption,
    emptyMessage = "Tidak ada data"
}) {
    return (
        <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
                <TableRow>
                    {columns.map((column, index) => (
                        <TableHead
                            key={index}
                            className={column.className}
                        >
                            {column.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="text-center py-8 text-neutral-500">
                            {emptyMessage}
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((item, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <TableCell key={colIndex} className={column.cellClassName}>
                                    {renderCell
                                        ? renderCell(item, column)
                                        : item[column.key]
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
