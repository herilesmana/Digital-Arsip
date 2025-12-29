import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton } from '@/components/ui/custom';
import { ArrowLeft, Pencil, Download, Calendar, Tag, Building2, User, FileText } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Halaman Detail Arsip
 * Menampilkan informasi lengkap arsip
 */
export default function ArsipShow({ auth, arsip }) {
    return (
        <AppLayout
            auth={auth}
            title="Detail Arsip"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('arsip.index')}>
                            <CustomButton variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4" />
                            </CustomButton>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-neutral-900">Detail Arsip</h1>
                            <p className="text-neutral-600 mt-1">Informasi lengkap arsip dokumen</p>
                        </div>
                    </div>
                    <Link href={route('arsip.edit', arsip.id_arsip)}>
                        <CustomButton variant="secondary" size="md">
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Arsip
                        </CustomButton>
                    </Link>
                </div>

                {/* Main Info */}
                <CustomCard>
                    <div className="space-y-6">
                        {/* Judul */}
                        <div>
                            <label className="text-sm font-medium text-neutral-500 block mb-1">
                                Judul Arsip
                            </label>
                            <h2 className="text-xl font-bold text-neutral-900">
                                {arsip.judul_arsip}
                            </h2>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tanggal */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#4A7EBB]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-5 h-5 text-[#4A7EBB]" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-neutral-500 block mb-1">
                                        Tanggal Arsip
                                    </label>
                                    <p className="text-base font-semibold text-neutral-900">
                                        {format(new Date(arsip.tanggal_arsip), 'dd MMMM yyyy', { locale: id })}
                                    </p>
                                </div>
                            </div>

                            {/* Kategori */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#5B9BD5]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Tag className="w-5 h-5 text-[#5B9BD5]" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-neutral-500 block mb-1">
                                        Kategori
                                    </label>
                                    <p className="text-base font-semibold text-neutral-900">
                                        {arsip.kategori?.nama_kategori || '-'}
                                    </p>
                                </div>
                            </div>

                            {/* Divisi */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#F5845C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Building2 className="w-5 h-5 text-[#F5845C]" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-neutral-500 block mb-1">
                                        Divisi
                                    </label>
                                    <p className="text-base font-semibold text-neutral-900">
                                        {arsip.divisi?.nama_divisi || '-'}
                                    </p>
                                </div>
                            </div>

                            {/* User */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#4CAF93]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-[#4CAF93]" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-neutral-500 block mb-1">
                                        Dibuat Oleh
                                    </label>
                                    <p className="text-base font-semibold text-neutral-900">
                                        {arsip.user?.nama || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Keterangan */}
                        {arsip.keterangan && (
                            <div>
                                <label className="text-sm font-medium text-neutral-500 block mb-2">
                                    Keterangan
                                </label>
                                <p className="text-base text-neutral-700 whitespace-pre-wrap">
                                    {arsip.keterangan}
                                </p>
                            </div>
                        )}
                    </div>
                </CustomCard>

                {/* Files */}
                {arsip.files && arsip.files.length > 0 && (
                    <CustomCard>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#4A7EBB]" />
                                <h3 className="text-lg font-semibold text-neutral-900">
                                    File Terlampir ({arsip.files.length})
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {arsip.files.map((file) => (
                                    <div
                                        key={file.id_file}
                                        className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-[#4A7EBB] transition-colors"
                                    >
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            <div className="w-12 h-12 bg-[#4A7EBB]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-sm font-bold text-[#4A7EBB] uppercase">
                                                    {file.tipe_file}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-base font-semibold text-neutral-900 truncate">
                                                    {file.nama_file}
                                                </p>
                                                <p className="text-sm text-neutral-500">
                                                    {file.tipe_file.toUpperCase()} File
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={`/storage/${file.path_file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                        >
                                            <CustomButton variant="primary" size="sm">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download
                                            </CustomButton>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CustomCard>
                )}
            </div>
        </AppLayout>
    );
}
