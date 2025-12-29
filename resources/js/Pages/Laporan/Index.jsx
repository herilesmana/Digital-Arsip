import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton } from '@/components/ui/custom';
import { FileBarChart, Download } from 'lucide-react';

/**
 * Laporan Page
 * Halaman untuk melihat dan generate laporan
 */
export default function LaporanIndex({ auth }) {
    return (
        <AppLayout
            auth={auth}
            title="Laporan"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">Laporan</h1>
                        <p className="text-neutral-600 mt-1">Generate dan download laporan</p>
                    </div>
                    <CustomButton variant="primary" size="md">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Laporan
                    </CustomButton>
                </div>

                {/* Content */}
                <CustomCard>
                    <div className="text-center py-12">
                        <FileBarChart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                            Laporan
                        </h3>
                        <p className="text-neutral-600">
                            Halaman ini akan menampilkan berbagai jenis laporan
                        </p>
                    </div>
                </CustomCard>
            </div>
        </AppLayout>
    );
}
