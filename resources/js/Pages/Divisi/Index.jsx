import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton, CustomTable } from '@/components/ui/custom';
import { Building2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Link, router } from '@inertiajs/react';

/**
 * Master Divisi Page
 * Halaman untuk mengelola data divisi
 */
export default function DivisiIndex({ auth, divisi, flash }) {
    // Handle delete divisi
    const handleDelete = (divisiId) => {
        if (confirm('Apakah Anda yakin ingin menghapus divisi ini?')) {
            router.delete(route('divisi.destroy', divisiId));
        }
    };

    // Define table columns
    const columns = [
        { key: 'no', label: 'No', className: 'w-16' },
        { key: 'nama_divisi', label: 'Nama Divisi' },
        { key: 'keterangan', label: 'Keterangan' },
        { key: 'actions', label: 'Aksi', className: 'w-40 text-center' },
    ];

    // Render custom cell content
    const renderCell = (item, column) => {
        switch (column.key) {
            case 'no':
                return divisi.indexOf(item) + 1;
            case 'keterangan':
                return item.keterangan || '-';
            case 'actions':
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Link href={route('divisi.edit', item.id_divisi)}>
                            <CustomButton variant="secondary" size="sm">
                                <Pencil className="w-3.5 h-3.5" />
                            </CustomButton>
                        </Link>
                        <CustomButton
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(item.id_divisi)}
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
            title="Master Divisi"
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
                        <h1 className="text-2xl font-bold text-neutral-900">Master Divisi</h1>
                        <p className="text-neutral-600 mt-1">Kelola data divisi perusahaan</p>
                    </div>
                    <Link href={route('divisi.create')}>
                        <CustomButton variant="primary" size="md">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Divisi
                        </CustomButton>
                    </Link>
                </div>

                {/* Table */}
                <CustomCard>
                    {divisi.length > 0 ? (
                        <CustomTable
                            columns={columns}
                            data={divisi}
                            renderCell={renderCell}
                            emptyMessage="Belum ada data divisi"
                        />
                    ) : (
                        <div className="text-center py-12">
                            <Building2 className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                Belum Ada Divisi
                            </h3>
                            <p className="text-neutral-600 mb-4">
                                Mulai tambahkan divisi untuk mengorganisir perusahaan
                            </p>
                            <Link href={route('divisi.create')}>
                                <CustomButton variant="primary" size="md">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Divisi Pertama
                                </CustomButton>
                            </Link>
                        </div>
                    )}
                </CustomCard>
            </div>
        </AppLayout>
    );
}
