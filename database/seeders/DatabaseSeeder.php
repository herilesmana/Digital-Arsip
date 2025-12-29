<?php

namespace Database\Seeders;

use App\Models\Divisi;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default admin user
        User::create([
            'nama' => 'Administrator',
            'username' => 'admin',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create default regular user
        User::create([
            'nama' => 'User Demo',
            'username' => 'user',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // Create default divisi
        Divisi::create([
            'nama_divisi' => 'IT & Sistem Informasi',
            'keterangan' => 'Divisi yang menangani teknologi informasi dan sistem',
        ]);

        Divisi::create([
            'nama_divisi' => 'Human Resource',
            'keterangan' => 'Divisi yang menangani sumber daya manusia',
        ]);

        Divisi::create([
            'nama_divisi' => 'Keuangan & Akuntansi',
            'keterangan' => 'Divisi yang menangani keuangan dan pembukuan',
        ]);

        Divisi::create([
            'nama_divisi' => 'Operasional',
            'keterangan' => 'Divisi yang menangani operasional perusahaan',
        ]);
    }
}
