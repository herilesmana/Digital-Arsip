import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton, CustomTable } from '@/components/ui/custom';
import { Users, Plus, Pencil, Trash2 } from 'lucide-react';
import { Link, router } from '@inertiajs/react';

/**
 * Master Pengguna Page
 * Halaman untuk mengelola data pengguna
 */
export default function PenggunaIndex({ auth, users, flash }) {
    // Handle delete pengguna
    const handleDelete = (userId) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            router.delete(route('pengguna.destroy', userId));
        }
    };

    // Define table columns
    const columns = [
        { key: 'no', label: 'No', className: 'w-16' },
        { key: 'nama', label: 'Nama' },
        { key: 'username', label: 'Username' },
        { key: 'role', label: 'Role', className: 'w-32' },
        { key: 'actions', label: 'Aksi', className: 'w-40 text-center' },
    ];

    // Render custom cell content
    const renderCell = (user, column) => {
        switch (column.key) {
            case 'no':
                return users.indexOf(user) + 1;
            case 'role':
                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${user.role === 'admin'
                            ? 'bg-[#4A7EBB]/10 text-[#4A7EBB]'
                            : 'bg-[#5B9BD5]/10 text-[#5B9BD5]'
                        }`}>
                        {user.role}
                    </span>
                );
            case 'actions':
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Link href={route('pengguna.edit', user.id_user)}>
                            <CustomButton variant="secondary" size="sm">
                                <Pencil className="w-3.5 h-3.5" />
                            </CustomButton>
                        </Link>
                        <CustomButton
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(user.id_user)}
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </CustomButton>
                    </div>
                );
            default:
                return user[column.key];
        }
    };

    return (
        <AppLayout
            auth={auth}
            title="Master Pengguna"
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
                        <h1 className="text-2xl font-bold text-neutral-900">Master Pengguna</h1>
                        <p className="text-neutral-600 mt-1">Kelola data pengguna sistem</p>
                    </div>
                    <Link href={route('pengguna.create')}>
                        <CustomButton variant="primary" size="md">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Pengguna
                        </CustomButton>
                    </Link>
                </div>

                {/* Table */}
                <CustomCard>
                    {users.length > 0 ? (
                        <CustomTable
                            columns={columns}
                            data={users}
                            renderCell={renderCell}
                            emptyMessage="Belum ada data pengguna"
                        />
                    ) : (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                Belum Ada Pengguna
                            </h3>
                            <p className="text-neutral-600 mb-4">
                                Mulai tambahkan pengguna untuk mengelola sistem
                            </p>
                            <Link href={route('pengguna.create')}>
                                <CustomButton variant="primary" size="md">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Pengguna Pertama
                                </CustomButton>
                            </Link>
                        </div>
                    )}
                </CustomCard>
            </div>
        </AppLayout>
    );
}

