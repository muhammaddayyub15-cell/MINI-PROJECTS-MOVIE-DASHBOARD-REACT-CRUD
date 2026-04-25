<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Movie;
use App\Models\Watchlist;

class WatchlistSeeder extends Seeder
{
        // RUN THE WATCHLIST SEEDER
    public function run(): void
    {
        $users = User::all();
        $movies = Movie::all();

        if ($users->isEmpty() || $movies->isEmpty()) {
            return;
        }

        foreach ($users as $user) {

            // Tiap user punya 2 - 6 watchlist movie random
            $randomMovies = $movies->random(rand(2, min(6, $movies->count())));

            foreach ($randomMovies as $movie) {

                Watchlist::firstOrCreate([
                    'user_id' => $user->id,
                    'movie_id' => $movie->id,
                ]);
            }
        }
    }
}