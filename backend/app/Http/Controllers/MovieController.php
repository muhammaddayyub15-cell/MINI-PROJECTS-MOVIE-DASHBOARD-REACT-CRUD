<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    // =========================
    // 🎬 LIST MOVIES (PAGINATION)
    // =========================
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Movie::paginate(10)
        ]);
    }

    // =========================
    // 🎬 CREATE MOVIE (ADMIN ONLY)
    // =========================
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'poster_url' => 'required|string',
            'rating' => 'required|numeric',
            'category' => 'required|string'
        ]);

        $movie = Movie::create([
            'title' => $request->title,
            'description' => $request->description,
            'poster_url' => $request->poster_url,
            'rating' => $request->rating,
            'category' => $request->category,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Movie created successfully',
            'data' => $movie
        ], 201);
    }

    // =========================
    // 🎬 SINGLE MOVIE DETAIL
    // =========================
    public function show($id)
    {
        $movie = Movie::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $movie
        ]);
    }

    // =========================
    // 🎬 UPDATE MOVIE
    // =========================
    public function update(Request $request, $id)
    {
        $movie = Movie::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string',
            'description' => 'sometimes|string',
            'poster_url' => 'sometimes|string',
            'rating' => 'sometimes|numeric',
            'category' => 'sometimes|string'
        ]);

        $movie->update([
            'title' => $request->title ?? $movie->title,
            'description' => $request->description ?? $movie->description,
            'poster_url' => $request->poster_url ?? $movie->poster_url,
            'rating' => $request->rating ?? $movie->rating,
            'category' => $request->category ?? $movie->category,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Movie updated successfully',
            'data' => $movie
        ]);
    }

    // =========================
    // 🎬 DELETE MOVIE
    // =========================
    public function destroy($id)
    {
        $movie = Movie::findOrFail($id);
        $movie->delete();

        return response()->json([
            'success' => true,
            'message' => 'Movie deleted successfully'
        ]);
    }
}