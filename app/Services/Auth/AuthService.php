<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    /**
     * Attempt to authenticate user dengan username dan password
     * 
     * @param string $username
     * @param string $password
     * @param bool $remember
     * @return User
     * @throws ValidationException
     */
    public function login(string $username, string $password, bool $remember = false): User
    {
        // Cari user berdasarkan username
        $user = User::where('username', $username)->first();

        // Validasi user exists dan password benar
        if (!$user || !Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['Username atau password salah.'],
            ]);
        }

        // Login user
        Auth::login($user, $remember);

        // Regenerate session untuk security
        request()->session()->regenerate();

        return $user;
    }

    /**
     * Logout user
     * 
     * @return void
     */
    public function logout(): void
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }

    /**
     * Get authenticated user
     * 
     * @return User|null
     */
    public function user(): ?User
    {
        return Auth::user();
    }
}
