<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model untuk tabel kategori_arsip
 */
class KategoriArsip extends Model
{
    /**
     * Primary key untuk tabel kategori_arsip
     */
    protected $primaryKey = 'id_kategori';

    /**
     * Nama tabel
     */
    protected $table = 'kategori_arsip';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'nama_kategori',
        'keterangan',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * Relasi ke arsip
     */
    public function arsip()
    {
        return $this->hasMany(Arsip::class, 'id_kategori', 'id_kategori');
    }
}
