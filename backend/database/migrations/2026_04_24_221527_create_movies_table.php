<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();

            // Basic Info
            $table->string('title');
            $table->text('description');

            // Media
            $table->string('poster_url');
            $table->string('backdrop_url')->nullable();

            //  Rating (0 - 10)
            $table->decimal('rating', 3, 1)->default(0);

            // 🎭 Genre (JSON support for multiple categories)
            $table->json('categories');

            // 📅 Optional Release Date
            $table->year('release_year')->nullable();

            // 📊 Engagements (for trending system)
            $table->integer('views')->default(0);
            $table->boolean('is_trending')->default(false);

            $table->timestamps();

            // ⚡ INDEX (important for filtering)
            $table->index('rating');
            $table->index('is_trending');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};