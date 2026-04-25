<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reaction;
use App\Models\User;
use App\Models\Movie;

class ReactionSeeder extends Seeder
{
    // RUN THE REACTION SEEDER
    public function run(): void
    {
        $users = User::all();
        $movies = Movie::all();

        if ($users->isEmpty() || $movies->isEmpty()) {
            return;
        }

        foreach ($movies as $movie) {

            // Setiap Movie punya beberapa Reaction random
            $randomUsers = $users->random(rand(2, min(5, $users->count())));

            foreach ($randomUsers as $user) {

                Reaction::create([
                    'user_id' => $user->id,
                    'movie_id' => $movie->id,

                    // Jenis Reaction
                    'type' => fake()->randomElement([
                        'like',
                        'love',
                        'dislike'
                    ]),
                ]);
            }
        }
    }
}