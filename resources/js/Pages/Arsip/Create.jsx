import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton, CustomInput, CustomTextarea, CustomSelect, CustomDatePicker, CustomFileUpload, KategoriModal } from '@/components/ui/custom';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useForm, router } from '@inertiajs/react';
import { format } from 'date-fns';

/**
 * Halaman Form Tambah Arsip
 * Form untuk menambahkan arsip baru tanpa modal
 */
export default function ArsipCreate({ auth, kategori, divisi }) {
    const [kategoriList, setKategoriList] = useState(kategori);

    const { data, setData, post, processing, errors } = useForm({
        judul_arsip: '',
        id_kategori: '',
        id_divisi: '',
        tanggal_arsip: new Date(),
        keterangan: '',
        files: [],
    });

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Use router.post with forceFormData for file uploads
        router.post(route('arsip.store'), {
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

    // Handle success kategori creation
    const handleKategoriSuccess = (newKategori) => {
        // Add new kategori to list
        setKategoriList([...kategoriList, newKategori]);
        // Auto-select the new kategori
        setData('id_kategori', newKategori.id_kategori.toString());
    };

    // Convert kategori & divisi untuk CustomSelect
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
            title="Tambah Arsip"
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
                        <h1 className="text-2xl font-bold text-neutral-900">Tambah Arsip</h1>
                        <p className="text-neutral-600 mt-1">Tambahkan arsip dokumen baru</p>
                    </div>
                </div>

                {/* Form */}
                <CustomCard>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Judul Arsip */}
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
                            <div className="flex gap-2 items-start">
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

                        {/* Divisi */}
                        <CustomSelect
                            label="Divisi"
                            placeholder="Pilih divisi"
                            options={divisiOptions}
                            value={data.id_divisi}
                            onValueChange={(value) => setData('id_divisi', value)}
                            error={errors.id_divisi}
                            required
                        />

                        {/* Tanggal Arsip */}
                        <CustomDatePicker
                            label="Tanggal Arsip"
                            placeholder="Pilih tanggal"
                            value={data.tanggal_arsip}
                            onChange={(date) => setData('tanggal_arsip', date)}
                            error={errors.tanggal_arsip}
                            required
                        />

                        {/* Keterangan */}
                        <CustomTextarea
                            label="Keterangan"
                            placeholder="Masukkan keterangan arsip (opsional)"
                            value={data.keterangan}
                            onChange={(e) => setData('keterangan', e.target.value)}
                            error={errors.keterangan}
                            rows={4}
                        />

                        {/* Upload File */}
                        <CustomFileUpload
                            label="Upload File Dokumen"
                            value={data.files}
                            onChange={(files) => setData('files', files)}
                            multiple
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                            error={errors.files}
                        />

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-4">
                            <CustomButton
                                type="submit"
                                variant="primary"
                                size="md"
                                disabled={processing}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {processing ? 'Menyimpan...' : 'Simpan Arsip'}
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
