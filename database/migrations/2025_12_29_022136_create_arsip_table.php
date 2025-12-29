<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('arsip', function (Blueprint $table) {
            $table->id('id_arsip');
            $table->string('judul_arsip', 150);
            $table->foreignId('id_kategori')->constrained('kategori_arsip')->cascadeOnDelete();
            $table->foreignId('id_divisi')->constrained('divisi')->cascadeOnDelete();
            $table->date('tanggal_arsip');
            $table->text('keterangan')->nullable();
            $table->foreignId('id_user')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('arsip');
    }
};
