<?php

namespace App\Http\Controllers;

use App\Models\Divisi;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Controller untuk mengelola data divisi
 */
class DivisiController extends Controller
{
    /**
     * Menampilkan halaman daftar divisi
     */
    public function index()
    {
        $divisi = Divisi::select('id_divisi', 'nama_divisi', 'keterangan', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Divisi/Index', [
            'divisi' => $divisi
        ]);
    }

    /**
     * Menampilkan halaman form tambah divisi
     */
    public function create()
    {
        return Inertia::render('Divisi/Create');
    }

    /**
     * Menyimpan data divisi baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_divisi' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
        ], [
            'nama_divisi.required' => 'Nama divisi wajib diisi',
            'nama_divisi.max' => 'Nama divisi maksimal 100 karakter',
        ]);

        Divisi::create($validated);

        return redirect()->route('divisi.index')->with('success', 'Divisi berhasil ditambahkan');
    }

    /**
     * Menampilkan halaman form edit divisi
     */
    public function edit($id)
    {
        $divisi = Divisi::findOrFail($id);

        return Inertia::render('Divisi/Edit', [
            'divisi' => $divisi
        ]);
    }

    /**
     * Mengupdate data divisi
     */
    public function update(Request $request, $id)
    {
        $divisi = Divisi::findOrFail($id);

        $validated = $request->validate([
            'nama_divisi' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
        ], [
            'nama_divisi.required' => 'Nama divisi wajib diisi',
            'nama_divisi.max' => 'Nama divisi maksimal 100 karakter',
        ]);

        $divisi->update($validated);

        return redirect()->route('divisi.index')->with('success', 'Divisi berhasil diperbarui');
    }

    /**
     * Menghapus data divisi
     */
    public function destroy($id)
    {
        $divisi = Divisi::findOrFail($id);
        $divisi->delete();

        return redirect()->route('divisi.index')->with('success', 'Divisi berhasil dihapus');
    }
}
