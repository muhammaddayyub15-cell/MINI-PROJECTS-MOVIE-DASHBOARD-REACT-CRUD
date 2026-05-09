<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Movie;
use App\Models\Trailer;

class TrailerSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Trailer::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $trailers = [
            'Oppenheimer' => 'https://www.youtube.com/embed/uYPbbksJxIg',
            'Interstellar' => 'https://www.youtube.com/embed/zSWdZVtXT7E',
            'Avengers: Endgame' => 'https://www.youtube.com/embed/TcMBFSGVi1c',
            'The Batman' => 'https://www.youtube.com/embed/mqqft2x_Aa4',
            'Inception' => 'https://www.youtube.com/embed/YoHD9XEInc0',
            'Joker' => 'https://www.youtube.com/embed/zAGVQLHvwOY',
            'Titanic' => 'https://www.youtube.com/embed/I7c1etV7D7g',
            'The Matrix' => 'https://www.youtube.com/embed/vKQi3bBA1y8',
            'John Wick' => 'https://www.youtube.com/embed/C0BMx-qxsP4',
            'Gladiator' => 'https://www.youtube.com/embed/owK1qxDselE',
            'The Dark Knight' => 'https://www.youtube.com/embed/EXeTwQWrcwY',
            'Parasite' => 'https://www.youtube.com/embed/SEUXfv87Wpk',
            'Dune' => 'https://www.youtube.com/embed/8g18jFHCLXk',
            'Spider-Man: No Way Home' => 'https://www.youtube.com/embed/JfVOs4VSpmA',
            'Top Gun: Maverick' => 'https://www.youtube.com/embed/giXco2jaZ_4',
            'The Shawshank Redemption' => 'https://www.youtube.com/embed/6hB3S9bIaco',
            'The Godfather' => 'https://www.youtube.com/embed/sY1S34973zA',
            'Forrest Gump' => 'https://www.youtube.com/embed/bLvqoHBptjg',
            'Pulp Fiction' => 'https://www.youtube.com/embed/s7EdQ4FqbhY',
            'The Lion King' => 'https://www.youtube.com/embed/7TavVZMewpY',
            'Goodfellas' => 'https://www.youtube.com/embed/qo5jJpHtI1Y',
            'Schindler\'s List' => 'https://www.youtube.com/embed/gG22XNhtnoY',
            'The Lord of the Rings: The Return of the King' => 'https://www.youtube.com/embed/r5X-hFf6Bwo',
            'Fight Club' => 'https://www.youtube.com/embed/qtRKdVHc-cE',
            'Whiplash' => 'https://www.youtube.com/embed/7d_jQycdQGo',
            'La La Land' => 'https://www.youtube.com/embed/0pdqf4P9MB8',
            'Mad Max: Fury Road' => 'https://www.youtube.com/embed/hEJnMQG9ev8',
            'Get Out' => 'https://www.youtube.com/embed/DzfpyUB60YY',
            'Avengers: Infinity War' => 'https://www.youtube.com/embed/6ZfuNTqbHE8',
            'Blade Runner 2049' => 'https://www.youtube.com/embed/gCcx85zbxz4',
            'No Country for Old Men' => 'https://www.youtube.com/embed/38A__WT3-o0',
            'The Silence of the Lambs' => 'https://www.youtube.com/embed/W6Mm8Sbe__o',
            'Jurassic Park' => 'https://www.youtube.com/embed/lc0UehYemQA',
            'The Prestige' => 'https://www.youtube.com/embed/RLtaA9fFNXU',
            'Coco' => 'https://www.youtube.com/embed/Rvr68u6k5sI',
            'Soul' => 'https://www.youtube.com/embed/xOsLIiBStEs',
            'Everything Everywhere All at Once' => 'https://www.youtube.com/embed/wxN1T1uxQ2g',
            'Tár' => 'https://www.youtube.com/embed/Jv_J3GkP9B8',
            'Guardians of the Galaxy' => 'https://www.youtube.com/embed/d96cjJhvlMA',
            'Black Panther' => 'https://www.youtube.com/embed/xjDjIWPwcPU',
            'Mission: Impossible – Fallout' => 'https://www.youtube.com/embed/wb49-oV0F78',
            'Hereditary' => 'https://www.youtube.com/embed/V6wWKNij_1M',
            'Django Unchained' => 'https://www.youtube.com/embed/0fUCuvNlOxc',
            'The Grand Budapest Hotel' => 'https://www.youtube.com/embed/1Fg5iWmQjwk',
            'Knives Out' => 'https://www.youtube.com/embed/qGqiHJTsRkQ',
            '1917' => 'https://www.youtube.com/embed/gZjQROMAh_s',
            'The Revenant' => 'https://www.youtube.com/embed/QRfj1VCg16Y',
            'Arrival' => 'https://www.youtube.com/embed/tFMoCEmRoCG',
            'Dunkirk' => 'https://www.youtube.com/embed/F-eMt3SrfFU',
        ];

        $movies = Movie::all();

        foreach ($movies as $movie) {
            $url = $trailers[$movie->title] ?? 'https://www.youtube.com/embed/zSWdZVtXT7E'; 
            Trailer::create([
                'movie_id' => $movie->id,
                'title' => 'Official Trailer',
                'url' => $url,
                'type' => 'trailer'
            ]);
        }
    }
}
