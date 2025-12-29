<?php

namespace App\Http\Controllers;

use App\Models\Arsip;
use App\Models\Divisi;
use App\Models\KategoriArsip;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Controller untuk mengelola laporan arsip
 */
class LaporanController extends Controller
{
    /**
     * Menampilkan halaman laporan dengan filter
     */
    public function index(Request $request)
    {
        // Get filter parameters
        $filters = [
            'id_kategori' => $request->id_kategori,
            'id_divisi' => $request->id_divisi,
            'tanggal_dari' => $request->tanggal_dari,
            'tanggal_sampai' => $request->tanggal_sampai,
        ];

        // Build query
        $query = Arsip::with(['kategori', 'divisi', 'user', 'files'])
            ->orderBy('created_at', 'desc');

        // Apply filters
        if ($request->filled('id_kategori')) {
            $query->where('id_kategori', $request->id_kategori);
        }

        if ($request->filled('id_divisi')) {
            $query->where('id_divisi', $request->id_divisi);
        }

        if ($request->filled('tanggal_dari')) {
            $query->whereDate('created_at', '>=', $request->tanggal_dari);
        }

        if ($request->filled('tanggal_sampai')) {
            $query->whereDate('created_at', '<=', $request->tanggal_sampai);
        }

        $arsip = $query->get();

        // Get data for filters
        $kategori = KategoriArsip::select('id_kategori', 'nama_kategori')
            ->orderBy('nama_kategori')
            ->get();

        $divisi = Divisi::select('id_divisi', 'nama_divisi')
            ->orderBy('nama_divisi')
            ->get();

        return Inertia::render('Laporan/Index', [
            'arsip' => $arsip,
            'kategori' => $kategori,
            'divisi' => $divisi,
            'filters' => $filters,
        ]);
    }

    /**
     * Export laporan ke Excel (future enhancement)
     */
    public function export(Request $request)
    {
        // TODO: Implement Excel export
        return redirect()->back()->with('error', 'Fitur export belum tersedia');
    }
}
