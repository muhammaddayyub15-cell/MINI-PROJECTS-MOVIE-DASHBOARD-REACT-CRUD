<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trailers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('movie_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('url'); // YouTube embed URL
            $table->string('type')->default('trailer'); // trailer, teaser
            $table->timestamps();

            $table->index('movie_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trailers');
    }
};