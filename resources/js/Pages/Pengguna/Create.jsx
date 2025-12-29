import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton, CustomInput, CustomSelect } from '@/components/ui/custom';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useForm } from '@inertiajs/react';

/**
 * Halaman Form Tambah Pengguna
 * Form untuk menambahkan pengguna baru tanpa modal
 */
export default function PenggunaCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        username: '',
        password: '',
        role: '',
    });

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pengguna.store'));
    };

    // Role options
    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
    ];

    return (
        <AppLayout
            auth={auth}
            title="Tambah Pengguna"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={route('pengguna.index')}>
                        <CustomButton variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4" />
                        </CustomButton>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">Tambah Pengguna</h1>
                        <p className="text-neutral-600 mt-1">Tambahkan pengguna baru ke sistem</p>
                    </div>
                </div>

                {/* Form */}
                <CustomCard>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama */}
                        <CustomInput
                            label="Nama Lengkap"
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                            error={errors.nama}
                            required
                        />

                        {/* Username */}
                        <CustomInput
                            label="Username"
                            type="text"
                            placeholder="Masukkan username"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            error={errors.username}
                            required
                        />

                        {/* Password */}
                        <CustomInput
                            label="Password"
                            type="password"
                            placeholder="Masukkan password (minimal 6 karakter)"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            required
                        />

                        {/* Role */}
                        <CustomSelect
                            label="Role"
                            placeholder="Pilih role pengguna"
                            options={roleOptions}
                            value={data.role}
                            onValueChange={(value) => setData('role', value)}
                            error={errors.role}
                            required
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
                                {processing ? 'Menyimpan...' : 'Simpan Pengguna'}
                            </CustomButton>
                            <Link href={route('pengguna.index')}>
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
