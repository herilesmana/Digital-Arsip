<?php

namespace App\Http\Controllers;

use App\Models\KategoriArsip;
use Illuminate\Http\Request;

/**
 * Controller untuk mengelola kategori arsip
 */
class KategoriArsipController extends Controller
{
    /**
     * Menyimpan kategori arsip baru via API
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_kategori' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
        ], [
            'nama_kategori.required' => 'Nama kategori wajib diisi',
            'nama_kategori.max' => 'Nama kategori maksimal 100 karakter',
        ]);

        $kategori = KategoriArsip::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Kategori berhasil ditambahkan',
            'data' => $kategori
        ]);
    }
}
