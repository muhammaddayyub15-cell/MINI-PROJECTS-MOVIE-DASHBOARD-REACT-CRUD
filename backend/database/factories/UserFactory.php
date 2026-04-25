<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

// USER FACTORY
class UserFactory extends Factory
{
    // Password Ceache
    protected static ?string $password = null;


    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),

            // Role System untuk Middleware (admin/user)
            'role' => fake()->randomElement(['user', 'admin']),
        ];
    }

    // Admin State
    public function admin(): static
    {
        return $this->state(fn () => [
            'role' => 'admin',
        ]);
    }

    // User State
    public function user(): static
    {
        return $this->state(fn () => [
            'role' => 'user',
        ]);
    }

    // Unverified State (optional, kalau mau testing email verification)
    public function unverified(): static
    {
        return $this->state(fn () => [
            'email_verified_at' => null,
        ]);
    }
}