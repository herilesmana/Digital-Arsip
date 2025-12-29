import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton } from '@/components/ui/custom';
import { FileText, Plus, Search } from 'lucide-react';

/**
 * Data Arsip Page
 * Halaman untuk mengelola data arsip
 */
export default function ArsipIndex({ auth }) {
    return (
        <AppLayout
            auth={auth}
            title="Data Arsip"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">Data Arsip</h1>
                        <p className="text-neutral-600 mt-1">Kelola semua arsip dokumen</p>
                    </div>
                    <CustomButton variant="primary" size="md">
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Arsip
                    </CustomButton>
                </div>

                {/* Content */}
                <CustomCard>
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                            Data Arsip
                        </h3>
                        <p className="text-neutral-600">
                            Halaman ini akan menampilkan daftar arsip
                        </p>
                    </div>
                </CustomCard>
            </div>
        </AppLayout>
    );
}
