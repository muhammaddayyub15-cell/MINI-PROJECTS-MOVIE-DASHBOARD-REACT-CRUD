<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\MovieSeeder;

class DatabaseSeeder extends Seeder
{
    // RUN THE DATABASE SEEDER
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            MovieSeeder::class,
            TrailerSeeder::class,
        ]);
    }
}