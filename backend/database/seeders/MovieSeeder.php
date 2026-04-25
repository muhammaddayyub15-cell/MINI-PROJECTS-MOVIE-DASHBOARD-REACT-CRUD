<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Movie;

class MovieSeeder extends Seeder
{
    /**
     * RUN SEEDER
     */
    public function run(): void
    {
        Movie::create([
            'title' => 'Oppenheimer',
            'description' => 'Story about J. Robert Oppenheimer and atomic bomb development.',
            'poster_url' => 'https://image.tmdb.org/t/p/w500/sample1.jpg',
            'rating' => 8.9,
            'category' => 'Drama'
        ]);

        Movie::create([
            'title' => 'Interstellar',
            'description' => 'A journey through space and time to save humanity.',
            'poster_url' => 'https://image.tmdb.org/t/p/w500/sample2.jpg',
            'rating' => 9.1,
            'category' => 'Sci-Fi'
        ]);

        Movie::create([
            'title' => 'Avengers: End Game',
            'description' => 'Final battle against Thanos.',
            'poster_url' => 'https://image.tmdb.org/t/p/w500/sample3.jpg',
            'rating' => 8.7,
            'category' => 'Action'
        ]);

        Movie::create([
            'title' => 'The Batman',
            'description' => 'Dark detective story of Batman in Gotham City.',
            'poster_url' => 'https://image.tmdb.org/t/p/w500/sample4.jpg',
            'rating' => 8.3,
            'category' => 'Action'
        ]);
    }
}