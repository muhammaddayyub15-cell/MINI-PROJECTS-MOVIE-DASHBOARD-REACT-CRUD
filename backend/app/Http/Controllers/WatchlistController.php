<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Watchlist;
use App\Models\Movie;

class WatchlistController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Safety check (hindari error null user)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $watchlist = Watchlist::with('movie')
            ->where('user_id', $user->id)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $watchlist
        ]);
    }

    public function toggle($movieId)
    {
        $user = auth()->user();

        // Safety check
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $exist = Watchlist::where('user_id', $user->id)
            ->where('movie_id', $movieId)
            ->first();

        if ($exist) {
            $exist->delete();

            return response()->json([
                'success' => true,
                'message' => 'Removed from watchlist'
            ]);
        }

        Watchlist::create([
            'user_id' => $user->id,
            'movie_id' => $movieId
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Added to watchlist'
        ]);
    }
}