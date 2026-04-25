<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    protected $fillable = [
        'user_id',
        'movie_id',
        'type'
    ];

    // User Relation
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Movie Relation
    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
}