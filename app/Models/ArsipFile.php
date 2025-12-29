<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model untuk tabel arsip_file
 */
class ArsipFile extends Model
{
    /**
     * Primary key untuk tabel arsip_file
     */
    protected $primaryKey = 'id_file';

    /**
     * Nama tabel
     */
    protected $table = 'arsip_file';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'id_arsip',
        'nama_file',
        'path_file',
        'tipe_file',
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
        return $this->belongsTo(Arsip::class, 'id_arsip', 'id_arsip');
    }
}
