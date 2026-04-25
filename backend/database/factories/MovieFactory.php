<?php

namespace Database\Factories;

use App\Models\Movie;
use Illuminate\Database\Eloquent\Factories\Factory;

// MOVIE FACTORY
class MovieFactory extends Factory
{
    public function definition(): array
    {
        $genres = [
            'Action',
            'Drama',
            'Comedy',
            'Horror',
            'Sci-Fi',
            'Thriller',
            'Romance',
            'Adventure'
        ];

        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(3),

            // Visual Movie Data
            'poster_url' => fake()->imageUrl(400, 600, 'movies'),
            'backdrop_url' => fake()->imageUrl(800, 450, 'cinema'),

            // Rating Realistic (IMDb Style)
            'rating' => fake()->randomFloat(1, 1, 10),

            // Genre Array (JSON-friendly)
            'categories' => json_encode(
                fake()->randomElements($genres, rand(1, 3))
            ),

            // Optional Release Date
            'release_year' => fake()->year(),
        ];
    }
}