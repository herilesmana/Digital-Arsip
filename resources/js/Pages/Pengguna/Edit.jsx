import AppLayout from '@/Layouts/AppLayout';
import { CustomCard, CustomButton, CustomInput, CustomSelect } from '@/components/ui/custom';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useForm } from '@inertiajs/react';

/**
 * Halaman Form Edit Pengguna
 * Form untuk mengedit data pengguna tanpa modal
 */
export default function PenggunaEdit({ auth, user }) {
    const { data, setData, put, processing, errors } = useForm({
        nama: user.nama || '',
        username: user.username || '',
        password: '',
        role: user.role || '',
    });

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('pengguna.update', user.id_user));
    };

    // Role options
    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
    ];

    return (
        <AppLayout
            auth={auth}
            title="Edit Pengguna"
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
                        <h1 className="text-2xl font-bold text-neutral-900">Edit Pengguna</h1>
                        <p className="text-neutral-600 mt-1">Perbarui informasi pengguna</p>
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
                            placeholder="Kosongkan jika tidak ingin mengubah password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                        />
                        <p className="text-sm text-neutral-500 -mt-4">
                            * Kosongkan jika tidak ingin mengubah password
                        </p>

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
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
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
