import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, StatCard } from '@/components/ui/custom';
import { FileText, Users, FolderOpen, CheckCircle } from 'lucide-react';

/**
 * Dashboard Page
 * Halaman utama setelah login dengan sidebar
 */
export default function Dashboard({ auth }) {
    return (
        <AppLayout auth={auth} title="Dashboard">
            <div className="space-y-6">
                {/* Welcome Card */}
                <CustomCard>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                                Welcome back, {auth.user.nama}! 👋
                            </h2>
                            <p className="text-neutral-600">
                                Selamat datang di sistem manajemen arsip digital PT Asando Karya
                            </p>
                        </div>
                    </div>
                </CustomCard>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        variant="blue"
                        value="1,234"
                        label="Total Arsip"
                        icon={<FileText className="w-8 h-8" />}
                    />
                    <StatCard
                        variant="orange"
                        value="45"
                        label="Kategori"
                        icon={<FolderOpen className="w-8 h-8" />}
                    />
                    <StatCard
                        variant="teal"
                        value="12"
                        label="Divisi"
                        icon={<Users className="w-8 h-8" />}
                    />
                    <StatCard
                        variant="darkblue"
                        value="98%"
                        label="Completion Rate"
                        icon={<CheckCircle className="w-8 h-8" />}
                    />
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CustomCard
                        title="Recent Activity"
                        description="Aktivitas terbaru sistem"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-md">
                                <div className="w-2 h-2 bg-[#4CAF93] rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-neutral-900">
                                        Arsip uploaded successfully
                                    </p>
                                    <p className="text-xs text-neutral-500">2 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-md">
                                <div className="w-2 h-2 bg-[#5B9BD5] rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-neutral-900">
                                        New category created
                                    </p>
                                    <p className="text-xs text-neutral-500">1 hour ago</p>
                                </div>
                            </div>
                        </div>
                    </CustomCard>

                    <CustomCard
                        title="System Info"
                        description="Informasi sistem"
                    >
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-neutral-600">Total Users</span>
                                <span className="text-sm font-medium text-neutral-900">24</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-neutral-600">Storage Used</span>
                                <span className="text-sm font-medium text-neutral-900">2.4 GB</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-neutral-600">Last Backup</span>
                                <span className="text-sm font-medium text-neutral-900">Today, 03:00 AM</span>
                            </div>
                        </div>
                    </CustomCard>
                </div>
            </div>
        </AppLayout>
    );
}

