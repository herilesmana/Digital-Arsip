<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model untuk tabel divisi
 */
class Divisi extends Model
{
    /**
     * Primary key untuk tabel divisi
     */
    protected $primaryKey = 'id_divisi';

    /**
     * Nama tabel
     */
    protected $table = 'divisi';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'nama_divisi',
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
}
