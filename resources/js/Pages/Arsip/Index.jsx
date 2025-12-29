import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton, CustomTable } from '@/components/ui/custom';
import { FileText, Plus, Eye, Pencil, Trash2, Paperclip } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Data Arsip Page
 * Halaman untuk mengelola data arsip
 */
export default function ArsipIndex({ auth, arsip, flash }) {
    // Handle delete arsip
    const handleDelete = (arsipId) => {
        if (confirm('Apakah Anda yakin ingin menghapus arsip ini? Semua file terkait akan ikut terhapus.')) {
            router.delete(route('arsip.destroy', arsipId));
        }
    };

    // Define table columns
    const columns = [
        { key: 'no', label: 'No', className: 'w-16' },
        { key: 'tanggal_arsip', label: 'Tanggal', className: 'w-32' },
        { key: 'judul_arsip', label: 'Judul Arsip' },
        { key: 'kategori', label: 'Kategori', className: 'w-40' },
        { key: 'divisi', label: 'Divisi', className: 'w-40' },
        { key: 'files', label: 'File', className: 'w-20 text-center' },
        { key: 'actions', label: 'Aksi', className: 'w-48 text-center' },
    ];

    // Render custom cell content
    const renderCell = (item, column) => {
        switch (column.key) {
            case 'no':
                return arsip.indexOf(item) + 1;
            case 'tanggal_arsip':
                return format(new Date(item.tanggal_arsip), 'dd MMM yyyy', { locale: id });
            case 'kategori':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#5B9BD5]/10 text-[#5B9BD5]">
                        {item.kategori?.nama_kategori || '-'}
                    </span>
                );
            case 'divisi':
                return item.divisi?.nama_divisi || '-';
            case 'files':
                return (
                    <div className="flex items-center justify-center">
                        {item.files?.length > 0 ? (
                            <span className="inline-flex items-center gap-1 text-sm text-neutral-600">
                                <Paperclip className="w-4 h-4" />
                                {item.files.length}
                            </span>
                        ) : (
                            <span className="text-neutral-400">-</span>
                        )}
                    </div>
                );
            case 'actions':
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Link href={route('arsip.show', item.id_arsip)}>
                            <CustomButton variant="primary" size="sm" title="Lihat Detail">
                                <Eye className="w-3.5 h-3.5" />
                            </CustomButton>
                        </Link>
                        <Link href={route('arsip.edit', item.id_arsip)}>
                            <CustomButton variant="secondary" size="sm" title="Edit">
                                <Pencil className="w-3.5 h-3.5" />
                            </CustomButton>
                        </Link>
                        <CustomButton
                            variant="danger"
                            size="sm"
                            title="Hapus"
                            onClick={() => handleDelete(item.id_arsip)}
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </CustomButton>
                    </div>
                );
            default:
                return item[column.key];
        }
    };

    return (
        <AppLayout
            auth={auth}
            title="Data Arsip"
        >
            <div className="space-y-6">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-[#4CAF93]/10 border border-[#4CAF93] text-[#4CAF93] px-4 py-3 rounded-md">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        {flash.error}
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">Data Arsip</h1>
                        <p className="text-neutral-600 mt-1">Kelola data arsip dokumen</p>
                    </div>
                    <Link href={route('arsip.create')}>
                        <CustomButton variant="primary" size="md">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Arsip
                        </CustomButton>
                    </Link>
                </div>

                {/* Table */}
                <CustomCard>
                    {arsip.length > 0 ? (
                        <CustomTable
                            columns={columns}
                            data={arsip}
                            renderCell={renderCell}
                            emptyMessage="Belum ada data arsip"
                        />
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                Belum Ada Arsip
                            </h3>
                            <p className="text-neutral-600 mb-4">
                                Mulai tambahkan arsip dokumen ke sistem
                            </p>
                            <Link href={route('arsip.create')}>
                                <CustomButton variant="primary" size="md">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Arsip Pertama
                                </CustomButton>
                            </Link>
                        </div>
                    )}
                </CustomCard>
            </div>
        </AppLayout>
    );
}
