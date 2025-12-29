import { router } from '@inertiajs/react';
import { CustomButton, CustomCard, StatCard } from '@/components/ui/custom';
import { FileText, Users, FolderOpen, CheckCircle, LogOut, Menu } from 'lucide-react';

/**
 * Dashboard Page
 * Halaman utama setelah login
 */
export default function Dashboard({ auth }) {
    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            {/* Navbar */}
            <nav className="bg-[#4A7EBB] text-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <FileText className="w-8 h-8" />
                            <div>
                                <h1 className="text-xl font-bold">Digital Arsip</h1>
                                <p className="text-xs opacity-90">PT Asando Karya</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium">{auth.user.nama}</p>
                                <p className="text-xs opacity-90 capitalize">{auth.user.role}</p>
                            </div>
                            <CustomButton
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                                className="bg-white/10 hover:bg-white/20 text-white"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto p-6 space-y-6">
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

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CustomCard
                        title="Quick Actions"
                        description="Aksi cepat untuk mengelola arsip"
                    >
                        <div className="space-y-3">
                            <CustomButton variant="primary" className="w-full">
                                <FileText className="w-4 h-4 mr-2" />
                                Upload Arsip Baru
                            </CustomButton>
                            <CustomButton variant="secondary" className="w-full">
                                <FolderOpen className="w-4 h-4 mr-2" />
                                Browse Arsip
                            </CustomButton>
                        </div>
                    </CustomCard>

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
                </div>
            </main>
        </div>
    );
}
