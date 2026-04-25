<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('reactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('movie_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->enum('type', ['love', 'neutral', 'hate']);

            // ❗ 1 user hanya boleh 1 reaction per movie
            $table->unique(['user_id', 'movie_id']);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reactions');
    }
};