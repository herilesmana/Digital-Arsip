import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CustomButton, CustomInput, CustomTextarea } from "@/components/ui/custom";
import axios from "axios";

/**
 * Modal component untuk menambah kategori arsip baru
 */
export default function KategoriModal({ onSuccess }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nama_kategori: "",
        keterangan: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling to parent form
        setLoading(true);
        setErrors({});

        try {
            const response = await axios.post("/api/kategori-arsip", formData);

            if (response.data.success) {
                // Reset form
                setFormData({ nama_kategori: "", keterangan: "" });
                setOpen(false);

                // Call success callback with new kategori data
                if (onSuccess) {
                    onSuccess(response.data.data);
                }
            }
        } catch (error) {
            if (error.response?.status === 422) {
                // Validation errors
                setErrors(error.response.data.errors || {});
            } else {
                setErrors({ submit: "Terjadi kesalahan saat menyimpan kategori" });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-[#4A7EBB] rounded-lg hover:bg-[#3d6ba3] focus:outline-none focus:ring-2 focus:ring-[#4A7EBB] focus:ring-offset-2 transition-colors"
                    title="Tambah Kategori Baru"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900">
                        Tambah Kategori Baru
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Isi form di bawah untuk menambahkan kategori arsip baru
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <CustomInput
                        label="Nama Kategori"
                        name="nama_kategori"
                        value={formData.nama_kategori}
                        onChange={handleChange}
                        error={errors.nama_kategori}
                        required
                        placeholder="Masukkan nama kategori"
                    />

                    <CustomTextarea
                        label="Keterangan"
                        name="keterangan"
                        value={formData.keterangan}
                        onChange={handleChange}
                        error={errors.keterangan}
                        placeholder="Masukkan keterangan kategori (opsional)"
                        rows={3}
                    />

                    {errors.submit && (
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                            {errors.submit}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <CustomButton
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="flex-1"
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </CustomButton>
                        <CustomButton
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                            className="flex-1"
                        >
                            Batal
                        </CustomButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
