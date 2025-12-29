<?php

namespace App\Http\Controllers;

use App\Models\Arsip;
use App\Models\ArsipFile;
use App\Models\Divisi;
use App\Models\KategoriArsip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

/**
 * Controller untuk mengelola data arsip
 */
class ArsipController extends Controller
{
    /**
     * Menampilkan halaman daftar arsip
     */
    public function index()
    {
        $arsip = Arsip::with(['kategori', 'divisi', 'user', 'files'])
            ->orderBy('tanggal_arsip', 'desc')
            ->get();

        return Inertia::render('Arsip/Index', [
            'arsip' => $arsip
        ]);
    }

    /**
     * Menampilkan halaman form tambah arsip
     */
    public function create()
    {
        $kategori = KategoriArsip::select('id_kategori', 'nama_kategori')
            ->orderBy('nama_kategori')
            ->get();

        $divisi = Divisi::select('id_divisi', 'nama_divisi')
            ->orderBy('nama_divisi')
            ->get();

        return Inertia::render('Arsip/Create', [
            'kategori' => $kategori,
            'divisi' => $divisi,
        ]);
    }

    /**
     * Menyimpan data arsip baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul_arsip' => 'required|string|max:150',
            'id_kategori' => 'required|exists:kategori_arsip,id_kategori',
            'id_divisi' => 'required|exists:divisi,id_divisi',
            'tanggal_arsip' => 'required|date',
            'keterangan' => 'nullable|string',
            'files.*' => 'nullable|file|max:10240', // Max 10MB per file
        ], [
            'judul_arsip.required' => 'Judul arsip wajib diisi',
            'judul_arsip.max' => 'Judul arsip maksimal 150 karakter',
            'id_kategori.required' => 'Kategori wajib dipilih',
            'id_kategori.exists' => 'Kategori tidak valid',
            'id_divisi.required' => 'Divisi wajib dipilih',
            'id_divisi.exists' => 'Divisi tidak valid',
            'tanggal_arsip.required' => 'Tanggal arsip wajib diisi',
            'tanggal_arsip.date' => 'Format tanggal tidak valid',
            'files.*.max' => 'Ukuran file maksimal 10MB',
        ]);

        // Tambahkan id_user dari user yang login
        $validated['id_user'] = Auth::id();

        // Simpan data arsip
        $arsip = Arsip::create($validated);

        // Upload dan simpan file jika ada
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('arsip', $fileName, 'public');

                ArsipFile::create([
                    'id_arsip' => $arsip->id_arsip,
                    'nama_file' => $file->getClientOriginalName(),
                    'path_file' => $filePath,
                    'tipe_file' => $file->getClientOriginalExtension(),
                ]);
            }
        }

        return redirect()->route('arsip.index')->with('success', 'Arsip berhasil ditambahkan');
    }

    /**
     * Menampilkan detail arsip
     */
    public function show($id)
    {
        $arsip = Arsip::with(['kategori', 'divisi', 'user', 'files'])
            ->findOrFail($id);

        return Inertia::render('Arsip/Show', [
            'arsip' => $arsip
        ]);
    }

    /**
     * Menampilkan halaman form edit arsip
     */
    public function edit($id)
    {
        $arsip = Arsip::with(['files'])->findOrFail($id);

        $kategori = KategoriArsip::select('id_kategori', 'nama_kategori')
            ->orderBy('nama_kategori')
            ->get();

        $divisi = Divisi::select('id_divisi', 'nama_divisi')
            ->orderBy('nama_divisi')
            ->get();

        return Inertia::render('Arsip/Edit', [
            'arsip' => $arsip,
            'kategori' => $kategori,
            'divisi' => $divisi,
        ]);
    }

    /**
     * Mengupdate data arsip
     */
    public function update(Request $request, $id)
    {
        $arsip = Arsip::findOrFail($id);

        $validated = $request->validate([
            'judul_arsip' => 'required|string|max:150',
            'id_kategori' => 'required|exists:kategori_arsip,id_kategori',
            'id_divisi' => 'required|exists:divisi,id_divisi',
            'tanggal_arsip' => 'required|date',
            'keterangan' => 'nullable|string',
            'files.*' => 'nullable|file|max:10240',
        ], [
            'judul_arsip.required' => 'Judul arsip wajib diisi',
            'judul_arsip.max' => 'Judul arsip maksimal 150 karakter',
            'id_kategori.required' => 'Kategori wajib dipilih',
            'id_divisi.required' => 'Divisi wajib dipilih',
            'tanggal_arsip.required' => 'Tanggal arsip wajib diisi',
            'files.*.max' => 'Ukuran file maksimal 10MB',
        ]);

        $arsip->update($validated);

        // Upload dan simpan file baru jika ada
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('arsip', $fileName, 'public');

                ArsipFile::create([
                    'id_arsip' => $arsip->id_arsip,
                    'nama_file' => $file->getClientOriginalName(),
                    'path_file' => $filePath,
                    'tipe_file' => $file->getClientOriginalExtension(),
                ]);
            }
        }

        return redirect()->route('arsip.index')->with('success', 'Arsip berhasil diperbarui');
    }

    /**
     * Menghapus data arsip
     */
    public function destroy($id)
    {
        $arsip = Arsip::findOrFail($id);

        // Hapus file fisik
        foreach ($arsip->files as $file) {
            Storage::disk('public')->delete($file->path_file);
        }

        // Hapus data arsip (cascade akan menghapus files dari database)
        $arsip->delete();

        return redirect()->route('arsip.index')->with('success', 'Arsip berhasil dihapus');
    }

    /**
     * Menghapus file arsip
     */
    public function deleteFile($id)
    {
        $file = ArsipFile::findOrFail($id);

        // Hapus file fisik
        Storage::disk('public')->delete($file->path_file);

        // Hapus data dari database
        $file->delete();

        return back()->with('success', 'File berhasil dihapus');
    }
}
