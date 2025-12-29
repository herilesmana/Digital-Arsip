<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Guest routes (only accessible when not authenticated)
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);
});

// Authenticated routes
Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    
    // Data Arsip
    Route::resource('arsip', \App\Http\Controllers\ArsipController::class);
    Route::delete('/arsip-file/{id}', [\App\Http\Controllers\ArsipController::class, 'deleteFile'])->name('arsip.deleteFile');
    
    // Laporan
    Route::get('/laporan', function () {
        return Inertia::render('Laporan/Index');
    })->name('laporan.index');
    
    // Master Pengguna (Admin Only)
    Route::middleware('admin')->group(function () {
        Route::resource('pengguna', \App\Http\Controllers\PenggunaController::class);
        Route::resource('divisi', \App\Http\Controllers\DivisiController::class);
    });
    
    // Logout
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');
});
