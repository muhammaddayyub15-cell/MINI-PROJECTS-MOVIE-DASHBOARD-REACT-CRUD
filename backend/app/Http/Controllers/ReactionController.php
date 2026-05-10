<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reaction;

class ReactionController extends Controller
{
    public function react(Request $request, $movieId)
    {
        $request->validate([
            'type' => 'required|in:love,neutral,hate'
        ]);

        $user = auth()->user();

        $reaction = Reaction::where('user_id', $user->id)
            ->where('movie_id', $movieId)
            ->first();

        if ($reaction) {
            $reaction->update([
                'type' => $request->type
            ]);
        } else {
            Reaction::create([
                'user_id' => $user->id,
                'movie_id' => $movieId,
                'type' => $request->type
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }

    public function summary($movieId)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'love' => Reaction::where('movie_id', $movieId)->where('type', 'love')->count(),
                'neutral' => Reaction::where('movie_id', $movieId)->where('type', 'neutral')->count(),
                'hate' => Reaction::where('movie_id', $movieId)->where('type', 'hate')->count(),
            ]
        ]);
    }

    public function myReactions()
    {
        $reactions = Reaction::with('movie')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reactions
        ]);
    }
}