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
        Schema::create('arsip_file', function (Blueprint $table) {
            $table->id('id_file');
            $table->foreignId('id_arsip')->constrained('arsip')->cascadeOnDelete();
            $table->string('nama_file', 255);
            $table->string('path_file', 255);
            $table->string('tipe_file', 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('arsip_file');
    }
};
