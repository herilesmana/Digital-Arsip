import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton } from '@/components/ui/custom';
import { Users, Plus } from 'lucide-react';

/**
 * Master Pengguna Page
 * Halaman untuk mengelola data pengguna
 */
export default function PenggunaIndex({ auth }) {
    return (
        <AppLayout
            auth={auth}
            title="Master Pengguna"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">Master Pengguna</h1>
                        <p className="text-neutral-600 mt-1">Kelola data pengguna sistem</p>
                    </div>
                    <CustomButton variant="primary" size="md">
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Pengguna
                    </CustomButton>
                </div>

                {/* Content */}
                <CustomCard>
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                            Master Pengguna
                        </h3>
                        <p className="text-neutral-600">
                            Halaman ini akan menampilkan daftar pengguna
                        </p>
                    </div>
                </CustomCard>
            </div>
        </AppLayout>
    );
}
