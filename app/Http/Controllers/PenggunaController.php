<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/**
 * Controller untuk mengelola data pengguna
 */
class PenggunaController extends Controller
{
    /**
     * Menampilkan halaman daftar pengguna
     */
    public function index()
    {
        $users = User::select('id_user', 'nama', 'username', 'role', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Pengguna/Index', [
            'users' => $users
        ]);
    }

    /**
     * Menampilkan halaman form tambah pengguna
     */
    public function create()
    {
        return Inertia::render('Pengguna/Create');
    }

    /**
     * Menyimpan data pengguna baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'username' => 'required|string|max:50|unique:users,username',
            'password' => 'required|string|min:6',
            'role' => 'required|in:admin,user',
        ], [
            'nama.required' => 'Nama wajib diisi',
            'nama.max' => 'Nama maksimal 100 karakter',
            'username.required' => 'Username wajib diisi',
            'username.max' => 'Username maksimal 50 karakter',
            'username.unique' => 'Username sudah digunakan',
            'password.required' => 'Password wajib diisi',
            'password.min' => 'Password minimal 6 karakter',
            'role.required' => 'Role wajib dipilih',
            'role.in' => 'Role harus admin atau user',
        ]);

        User::create($validated);

        return redirect()->route('pengguna.index')->with('success', 'Pengguna berhasil ditambahkan');
    }

    /**
     * Menampilkan halaman form edit pengguna
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Pengguna/Edit', [
            'user' => $user
        ]);
    }

    /**
     * Mengupdate data pengguna
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'username' => 'required|string|max:50|unique:users,username,' . $id . ',id_user',
            'password' => 'nullable|string|min:6',
            'role' => 'required|in:admin,user',
        ], [
            'nama.required' => 'Nama wajib diisi',
            'nama.max' => 'Nama maksimal 100 karakter',
            'username.required' => 'Username wajib diisi',
            'username.max' => 'Username maksimal 50 karakter',
            'username.unique' => 'Username sudah digunakan',
            'password.min' => 'Password minimal 6 karakter',
            'role.required' => 'Role wajib dipilih',
            'role.in' => 'Role harus admin atau user',
        ]);

        // Update password only if provided
        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('pengguna.index')->with('success', 'Pengguna berhasil diperbarui');
    }

    /**
     * Menghapus data pengguna
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        // Prevent deleting the currently logged-in user
        if ($user->id_user === Auth::id()) {
            return back()->with('error', 'Tidak dapat menghapus akun sendiri');
        }

        $user->delete();

        return redirect()->route('pengguna.index')->with('success', 'Pengguna berhasil dihapus');
    }
}
