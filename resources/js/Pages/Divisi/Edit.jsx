import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton, CustomInput, CustomTextarea } from '@/components/ui/custom';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useForm } from '@inertiajs/react';

/**
 * Halaman Form Edit Divisi
 * Form untuk mengedit data divisi tanpa modal
 */
export default function DivisiEdit({ auth, divisi }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_divisi: divisi.nama_divisi || '',
        keterangan: divisi.keterangan || '',
    });

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('divisi.update', divisi.id_divisi));
    };

    return (
        <AppLayout
            auth={auth}
            title="Edit Divisi"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={route('divisi.index')}>
                        <CustomButton variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4" />
                        </CustomButton>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">Edit Divisi</h1>
                        <p className="text-neutral-600 mt-1">Perbarui informasi divisi</p>
                    </div>
                </div>

                {/* Form */}
                <CustomCard>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama Divisi */}
                        <CustomInput
                            label="Nama Divisi"
                            type="text"
                            placeholder="Masukkan nama divisi"
                            value={data.nama_divisi}
                            onChange={(e) => setData('nama_divisi', e.target.value)}
                            error={errors.nama_divisi}
                            required
                        />

                        {/* Keterangan */}
                        <CustomTextarea
                            label="Keterangan"
                            placeholder="Masukkan keterangan divisi (opsional)"
                            value={data.keterangan}
                            onChange={(e) => setData('keterangan', e.target.value)}
                            error={errors.keterangan}
                            rows={4}
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
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </CustomButton>
                            <Link href={route('divisi.index')}>
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
