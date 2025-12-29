import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton, CustomInput, CustomTextarea, CustomSelect, CustomDatePicker, CustomFileUpload, KategoriModal } from '@/components/ui/custom';
import { ArrowLeft, Save, X, Download } from 'lucide-react';
import { Link, useForm, router } from '@inertiajs/react';
import { format } from 'date-fns';

/**
 * Halaman Form Edit Arsip
 * Form untuk mengedit data arsip tanpa modal
 */
export default function ArsipEdit({ auth, arsip, kategori, divisi }) {
    const [kategoriList, setKategoriList] = useState(kategori);

    const { data, setData, post, processing, errors } = useForm({
        judul_arsip: arsip.judul_arsip || '',
        id_kategori: arsip.id_kategori?.toString() || '',
        id_divisi: arsip.id_divisi?.toString() || '',
        tanggal_arsip: arsip.tanggal_arsip ? new Date(arsip.tanggal_arsip) : new Date(),
        keterangan: arsip.keterangan || '',
        files: [],
    });

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Use router.post with forceFormData for file uploads with method spoofing
        router.post(route('arsip.update', arsip.id_arsip), {
            _method: 'PUT',
            judul_arsip: data.judul_arsip,
            id_kategori: data.id_kategori,
            id_divisi: data.id_divisi,
            tanggal_arsip: format(new Date(data.tanggal_arsip), 'yyyy-MM-dd'),
            keterangan: data.keterangan || '',
            files: data.files,
        }, {
            forceFormData: true,
        });
    };

    // Handle delete existing file
    const handleDeleteFile = (fileId) => {
        if (confirm('Apakah Anda yakin ingin menghapus file ini?')) {
            router.delete(route('arsip.deleteFile', fileId));
        }
    };

    // Handle success kategori creation
    const handleKategoriSuccess = (newKategori) => {
        // Add new kategori to list
        setKategoriList([...kategoriList, newKategori]);
        // Auto-select the new kategori
        setData('id_kategori', newKategori.id_kategori.toString());
    };

    const kategoriOptions = kategoriList.map(k => ({
        value: k.id_kategori.toString(),
        label: k.nama_kategori
    }));

    const divisiOptions = divisi.map(d => ({
        value: d.id_divisi.toString(),
        label: d.nama_divisi
    }));

    return (
        <AppLayout
            auth={auth}
            title="Edit Arsip"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={route('arsip.index')}>
                        <CustomButton variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4" />
                        </CustomButton>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">Edit Arsip</h1>
                        <p className="text-neutral-600 mt-1">Perbarui informasi arsip</p>
                    </div>
                </div>

                {/* Existing Files */}
                {arsip.files && arsip.files.length > 0 && (
                    <CustomCard>
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-neutral-900">File Terlampir</h3>
                            {arsip.files.map((file) => (
                                <div
                                    key={file.id_file}
                                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-md border border-neutral-200"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-10 h-10 bg-[#4A7EBB]/10 rounded flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-semibold text-[#4A7EBB] uppercase">
                                                {file.tipe_file}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-neutral-900 truncate">
                                                {file.nama_file}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                {file.tipe_file.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`/storage/${file.path_file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 hover:bg-[#4A7EBB]/10 rounded-md transition-colors"
                                        >
                                            <Download className="w-4 h-4 text-[#4A7EBB]" />
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteFile(file.id_file)}
                                            className="p-2 hover:bg-red-100 rounded-md transition-colors"
                                        >
                                            <X className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CustomCard>
                )}

                {/* Form */}
                <CustomCard>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <CustomInput
                            label="Judul Arsip"
                            type="text"
                            placeholder="Masukkan judul arsip"
                            value={data.judul_arsip}
                            onChange={(e) => setData('judul_arsip', e.target.value)}
                            error={errors.judul_arsip}
                            required
                        />

                        {/* Kategori */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Kategori <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-start gap-2">
                                <div className="">
                                    <CustomSelect
                                        placeholder="Pilih kategori arsip"
                                        options={kategoriOptions}
                                        value={data.id_kategori}
                                        onValueChange={(value) => setData('id_kategori', value)}
                                        error={errors.id_kategori}
                                        required
                                    />
                                </div>
                                <KategoriModal onSuccess={handleKategoriSuccess} />
                            </div>
                        </div>

                        <CustomSelect
                            label="Divisi"
                            placeholder="Pilih divisi"
                            options={divisiOptions}
                            value={data.id_divisi}
                            onValueChange={(value) => setData('id_divisi', value)}
                            error={errors.id_divisi}
                            required
                        />

                        <CustomDatePicker
                            label="Tanggal Arsip"
                            placeholder="Pilih tanggal"
                            value={data.tanggal_arsip}
                            onChange={(date) => setData('tanggal_arsip', date)}
                            error={errors.tanggal_arsip}
                            required
                        />

                        <CustomTextarea
                            label="Keterangan"
                            placeholder="Masukkan keterangan arsip (opsional)"
                            value={data.keterangan}
                            onChange={(e) => setData('keterangan', e.target.value)}
                            error={errors.keterangan}
                            rows={4}
                        />

                        <CustomFileUpload
                            label="Upload File Dokumen Baru (Opsional)"
                            value={data.files}
                            onChange={(files) => setData('files', files)}
                            multiple
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                            error={errors.files}
                        />

                        <div className="flex items-center gap-3 pt-4">
                            <CustomButton
                                type="submit"
                                variant="primary"
                                size="md"
                                disabled={processing}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </CustomButton>
                            <Link href={route('arsip.index')}>
                                <CustomButton
                                    type="button"
                                    variant="ghost"
                                    size="md"
                                    disabled={processing}
                                >
                                    Batal
                                </CustomButton>
                            </Link>
                        </div>
                    </form>
                </CustomCard>
            </div>
        </AppLayout>
    );
}
