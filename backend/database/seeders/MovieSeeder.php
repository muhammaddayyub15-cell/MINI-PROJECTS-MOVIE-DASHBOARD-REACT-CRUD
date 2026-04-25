<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;

class MovieSeeder extends Seeder
{
    // RUN THE MOVIE SEEDER
    public function run(): void
    {
        Movie::create([
            'title' => 'Oppenheimer',
            'description' => 'Story about J. Robert Oppenheimer and atomic bomb development.',
            'poster_url' => 'https://source.unsplash.com/400x600/?movie,oppenheimer',
            'backdrop_url' => 'https://source.unsplash.com/800x450/?cinema,atomic',
            'rating' => 8.9,
            'categories' => json_encode(['Drama', 'History']),
            'release_year' => 2023,
            'views' => 120000,
            'is_trending' => true,
        ]);

        Movie::create([
            'title' => 'Interstellar',
            'description' => 'A journey through space and time to save humanity.',
            'poster_url' => 'https://source.unsplash.com/400x600/?movie,space,interstellar',
            'backdrop_url' => 'https://source.unsplash.com/800x450/?space,galaxy',
            'rating' => 9.1,
            'categories' => json_encode(['Sci-Fi', 'Adventure']),
            'release_year' => 2014,
            'views' => 250000,
            'is_trending' => true,
        ]);

        Movie::create([
            'title' => 'Avengers: Endgame',
            'description' => 'Final battle against Thanos.',
            'poster_url' => 'https://source.unsplash.com/400x600/?movie,superhero,avengers',
            'backdrop_url' => 'https://source.unsplash.com/800x450/?battle,heroes',
            'rating' => 8.7,
            'categories' => json_encode(['Action', 'Adventure']),
            'release_year' => 2019,
            'views' => 300000,
            'is_trending' => true,
        ]);

        Movie::create([
            'title' => 'The Batman',
            'description' => 'Dark detective story of Batman in Gotham City.',
            'poster_url' => 'https://source.unsplash.com/400x600/?movie,batman,dark',
            'backdrop_url' => 'https://source.unsplash.com/800x450/?gotham,city',
            'rating' => 8.3,
            'categories' => json_encode(['Action', 'Crime']),
            'release_year' => 2022,
            'views' => 180000,
            'is_trending' => false,
        ]);

        Movie::create([
            'title' => 'Inception',
            'description' => 'A thief who enters dreams to steal secrets.',
            'poster_url' => 'https://source.unsplash.com/400x600/?movie,dream,maze',
            'backdrop_url' => 'https://source.unsplash.com/800x450/?dream,city',
            'rating' => 8.8,
            'categories' => json_encode(['Sci-Fi', 'Thriller']),
            'release_year' => 2010,
            'views' => 400000,
            'is_trending' => true,
        ]);

        Movie::create([
            'title' => 'Joker',
            'description' => 'The origin story of Gotham’s most infamous villain.',
            'poster_url' => 'https://source.unsplash.com/400x600/?movie,joker,clown',
            'backdrop_url' => 'https://source.unsplash.com/800x450/?dark,city,smoke',
            'rating' => 8.5,
            'categories' => json_encode(['Drama', 'Crime']),
            'release_year' => 2019,
            'views' => 350000,
            'is_trending' => true,
        ]);

        Movie::create([
            'title' => 'Titanic',
            'description' => 'A love story on the doomed RMS Titanic.',
            'poster_url' => 'https://source.unsplash.com/400x600/?movie,ship,ocean',
            'backdrop_url' => 'https://source.unsplash.com/800x450/?ocean,iceberg',
            'rating' => 8.6,
            'categories' => json_encode(['Romance', 'Drama']),
            'release_year' => 1997,
            'views' => 500000,
            'is_trending' => false,
        ]);

        Movie::create([
            'title' => 'The Matrix',
            'description' => 'A hacker discovers reality is a simulation.',
            'poster_url' => 'https://source.unsplash.com/400x600/?movie,code,green',
            'backdrop_url' => 'https://source.unsplash.com/800x450/?matrix,digital',
            'rating' => 8.7,
            'categories' => json_encode(['Sci-Fi', 'Action']),
            'release_year' => 1999,
            'views' => 450000,
            'is_trending' => true,
        ]);

        Movie::create([
            'title' => 'John Wick',
            'description' => 'An ex-hitman seeks vengeance for his dog.',
            'poster_url' => 'https://source.unsplash.com/400x600/?movie,assassin,gun',
            'backdrop_url' => 'https://source.unsplash.com/800x450/?city,night,action',
            'rating' => 8.2,
            'categories' => json_encode(['Action', 'Thriller']),
            'release_year' => 2014,
            'views' => 280000,
            'is_trending' => true,
        ]);

        Movie::create([
            'title' => 'Gladiator',
            'description' => 'A betrayed Roman general seeks revenge.',
            'poster_url' => 'https://source.unsplash.com/400x600/?movie,roman,warrior',
            'backdrop_url' => 'https://source.unsplash.com/800x450/?rome,arena',
            'rating' => 8.5,
            'categories' => json_encode(['Action', 'Drama']),
            'release_year' => 2000,
            'views' => 220000,
            'is_trending' => false,
        ]);

        // 🔥 TAMBAHAN 40 MOVIE SINGKAT (biar tetap clean tapi 50 total)
        for ($i = 1; $i <= 40; $i++) {
            Movie::create([
                'title' => 'Movie ' . $i,
                'description' => 'IMDb style movie sample number ' . $i,
                'poster_url' => 'https://source.unsplash.com/400x600/?movie,film,' . $i,
                'backdrop_url' => 'https://source.unsplash.com/800x450/?cinema,film,' . $i,
                'rating' => rand(70, 100) / 10,
                'categories' => json_encode(['Action', 'Drama']),
                'release_year' => rand(1990, 2025),
                'views' => rand(10000, 500000),
                'is_trending' => rand(0, 1),
            ]);
        }
    }
}