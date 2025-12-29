import { Link } from '@inertiajs/react';
import { CustomButton } from '@/components/ui/custom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

/**
 * Halaman 403 - Akses Ditolak
 * Ditampilkan ketika user tidak memiliki akses ke halaman tertentu
 */
export default function Error403() {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#EBF2FA] to-[#D7E5F5] flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                {/* Icon */}
                <div className="mb-6">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <ShieldAlert className="w-10 h-10 text-red-600" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                    Akses Ditolak
                </h1>

                {/* Message */}
                <p className="text-neutral-600 mb-6">
                    Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.
                    Halaman ini hanya dapat diakses oleh administrator.
                </p>

                {/* Error Code */}
                <div className="text-sm text-neutral-500 mb-8">
                    Error Code: <span className="font-mono font-semibold">403 Forbidden</span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <Link href={route('dashboard')}>
                        <CustomButton variant="primary" size="md" className="w-full">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Dashboard
                        </CustomButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}
