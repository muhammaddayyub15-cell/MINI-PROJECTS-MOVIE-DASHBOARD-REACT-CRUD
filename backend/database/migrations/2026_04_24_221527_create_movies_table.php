<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * RUN MIGRATION
     */
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();

            // 🎬 BASIC MOVIE DATA
            $table->string('title');
            $table->text('description');
            $table->string('poster_url');

            // ⭐ RATING (0 - 10 / 0 - 5 terserah frontend)
            $table->float('rating')->default(0);

            // 🏷 CATEGORY / GENRE
            $table->string('category');

            $table->timestamps();
        });
    }

    /**
     * ROLLBACK MIGRATION
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};