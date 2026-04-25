<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * RUN ALL SEEDERS
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            MovieSeeder::class,
        ]);
    }
}