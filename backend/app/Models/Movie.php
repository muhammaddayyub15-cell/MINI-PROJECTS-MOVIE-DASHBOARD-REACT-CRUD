<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = [
        'title',
        'description',
        'poster_url',
        'backdrop_url',
        'rating',
        'category',
        'release_year',
        'views',
        'is_trending'
    ];

    // Watchlist Relation (Many-to-Many with User)
    public function watchlists()
    {
        return $this->belongsToMany(User::class, 'watchlists')
            ->withTimestamps();
    }

    // Reactions Relation (One-to-Many)
    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }

    // Popular Scope (rating >= 8)
    public function scopePopular($query)
    {
        return $query->where('rating', '>=', 8);
    }

    // Category Scope (JSON)
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Search Scope (by title)
    public function scopeSearch($query, $search)
    {
        return $query->where('title', 'like', '%' . $search . '%');
    }
}