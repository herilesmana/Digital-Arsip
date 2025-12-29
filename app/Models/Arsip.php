<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model untuk tabel arsip
 */
class Arsip extends Model
{
    /**
     * Primary key untuk tabel arsip
     */
    protected $primaryKey = 'id_arsip';

    /**
     * Nama tabel
     */
    protected $table = 'arsip';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'judul_arsip',
        'id_kategori',
        'id_divisi',
        'tanggal_arsip',
        'keterangan',
        'id_user',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tanggal_arsip' => 'date',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * Relasi ke kategori arsip
     */
    public function kategori()
    {
        return $this->belongsTo(KategoriArsip::class, 'id_kategori', 'id_kategori');
    }

    /**
     * Relasi ke divisi
     */
    public function divisi()
    {
        return $this->belongsTo(Divisi::class, 'id_divisi', 'id_divisi');
    }

    /**
     * Relasi ke user
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    /**
     * Relasi ke file arsip
     */
    public function files()
    {
        return $this->hasMany(ArsipFile::class, 'id_arsip', 'id_arsip');
    }
}
