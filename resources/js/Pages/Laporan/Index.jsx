import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton, CustomSelect, CustomDatePicker } from '@/components/ui/custom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileBarChart, Download, Filter, RotateCcw, Eye } from 'lucide-react';
import { router, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Laporan Page
 * Halaman untuk melihat laporan arsip dengan filter
 */
export default function LaporanIndex({ auth, arsip, kategori, divisi, filters }) {
    // Debug: log data yang diterima
    console.log('Laporan Data:', { arsip, kategori, divisi, filters });

    const [filterState, setFilterState] = useState({
        id_kategori: filters.id_kategori || '',
        id_divisi: filters.id_divisi || '',
        tanggal_dari: filters.tanggal_dari ? new Date(filters.tanggal_dari) : null,
        tanggal_sampai: filters.tanggal_sampai ? new Date(filters.tanggal_sampai) : null,
    });

    // Handle filter submit
    const handleFilter = () => {
        const params = {};

        if (filterState.id_kategori) {
            params.id_kategori = filterState.id_kategori;
        }

        if (filterState.id_divisi) {
            params.id_divisi = filterState.id_divisi;
        }

        if (filterState.tanggal_dari) {
            params.tanggal_dari = format(filterState.tanggal_dari, 'yyyy-MM-dd');
        }

        if (filterState.tanggal_sampai) {
            params.tanggal_sampai = format(filterState.tanggal_sampai, 'yyyy-MM-dd');
        }

        router.get(route('laporan.index'), params, {
            preserveState: true,
        });
    };

    // Handle reset filter
    const handleReset = () => {
        setFilterState({
            id_kategori: '',
            id_divisi: '',
            tanggal_dari: null,
            tanggal_sampai: null,
        });

        router.get(route('laporan.index'));
    };

    // Convert kategori & divisi untuk CustomSelect
    const kategoriOptions = kategori.map(k => ({
        value: k.id_kategori.toString(),
        label: k.nama_kategori
    }));

    const divisiOptions = divisi.map(d => ({
        value: d.id_divisi.toString(),
        label: d.nama_divisi
    }));

    // Table columns configuration
    const columns = [
        {
            header: 'No',
            accessor: (item, index) => index + 1,
            width: '60px'
        },
        {
            header: 'Judul Arsip',
            accessor: 'judul_arsip',
            className: 'font-medium text-neutral-900'
        },
        {
            header: 'Kategori',
            accessor: (item) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4A7EBB]/10 text-[#4A7EBB]">
                    {item.kategori?.nama_kategori || '-'}
                </span>
            )
        },
        {
            header: 'Divisi',
            accessor: (item) => item.divisi?.nama_divisi || '-'
        },
        {
            header: 'Tanggal Upload',
            accessor: (item) => {
                try {
                    return format(new Date(item.created_at), 'dd MMM yyyy', { locale: id })
                } catch (error) {
                    console.error('Error formatting date:', item.created_at, error);
                    return '-'
                }
            }
        },
        {
            header: 'Uploader',
            accessor: (item) => item.user?.nama || '-'
        },
        {
            header: 'Aksi',
            accessor: (item) => (
                <div className="flex items-center gap-2">
                    <Link href={route('arsip.show', item.id_arsip)}>
                        <CustomButton variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                        </CustomButton>
                    </Link>
                    {/* {item.files && item.files.length > 0 && (
                        <a
                            href={`/storage/${item.files[0].path_file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <CustomButton variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                            </CustomButton>
                        </a>
                    )} */}
                </div>
            ),
            width: '120px'
        }
    ];

    return (
        <AppLayout
            auth={auth}
            title="Laporan"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">Laporan Arsip</h1>
                        <p className="text-neutral-600 mt-1">Lihat dan filter laporan arsip dokumen</p>
                    </div>
                </div>

                {/* Filter Card */}
                <CustomCard>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
                            <Filter className="w-5 h-5 text-neutral-600" />
                            <h3 className="text-base font-semibold text-neutral-900">Filter Laporan</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            {/* Kategori Filter */}
                            <CustomSelect
                                label="Kategori"
                                placeholder="Semua Kategori"
                                options={kategoriOptions}
                                value={filterState.id_kategori}
                                onValueChange={(value) => setFilterState({ ...filterState, id_kategori: value })}
                            />

                            {/* Divisi Filter */}
                            <CustomSelect
                                label="Divisi"
                                placeholder="Semua Divisi"
                                options={divisiOptions}
                                value={filterState.id_divisi}
                                onValueChange={(value) => setFilterState({ ...filterState, id_divisi: value })}
                            />

                            {/* Tanggal Dari */}
                            <CustomDatePicker
                                label="Tanggal Dari"
                                placeholder="Pilih tanggal mulai"
                                value={filterState.tanggal_dari}
                                onChange={(date) => setFilterState({ ...filterState, tanggal_dari: date })}
                            />

                            {/* Tanggal Sampai */}
                            <CustomDatePicker
                                label="Tanggal Sampai"
                                placeholder="Pilih tanggal selesai"
                                value={filterState.tanggal_sampai}
                                onChange={(date) => setFilterState({ ...filterState, tanggal_sampai: date })}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-2">
                            <CustomButton
                                variant="primary"
                                size="md"
                                onClick={handleFilter}
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Terapkan Filter
                            </CustomButton>
                            <CustomButton
                                variant="ghost"
                                size="md"
                                onClick={handleReset}
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reset
                            </CustomButton>
                        </div>
                    </div>
                </CustomCard>

                {/* Results Card */}
                <CustomCard>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                            <div>
                                <h3 className="text-base font-semibold text-neutral-900">Hasil Laporan</h3>
                                <p className="text-sm text-neutral-600 mt-1">
                                    Ditemukan {arsip.length} arsip
                                </p>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {columns.map((col, index) => (
                                            <TableHead key={index} style={{ width: col.width }}>
                                                {col.header}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {arsip.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="text-center py-12">
                                                <FileBarChart className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                                                <p className="text-neutral-600">Tidak ada data arsip</p>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        arsip.map((item, index) => (
                                            <TableRow key={item.id_arsip}>
                                                {columns.map((col, colIndex) => (
                                                    <TableCell key={colIndex} className={col.className}>
                                                        {typeof col.accessor === 'function'
                                                            ? col.accessor(item, index)
                                                            : item[col.accessor]
                                                        }
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CustomCard>
            </div>
        </AppLayout>
    );
}
