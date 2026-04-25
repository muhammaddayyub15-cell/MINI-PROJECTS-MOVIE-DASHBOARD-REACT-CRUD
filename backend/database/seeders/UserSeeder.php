<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    // RUN THE USER SEEDER
    public function run(): void
    {
        // ADMIN USER
        User::create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        // 👤 NORMAL USERS
        User::factory(10)->user()->create();

        // optional tambahan admin test (kalau perlu)
        // User::factory()->admin()->create([
        //     'email' => 'admin2@mail.com'
        // ]);
    }
}