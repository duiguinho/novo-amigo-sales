<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    // Por convenção do Laravel, o nome da tabela pivô é os dois nomes
    // no singular, em ordem alfabética, separados por underscore:
    // "genero" vem antes de "livro" alfabeticamente, então "genero_livro"
    Schema::create('genero_livro', function (Blueprint $table) {
        $table->id();

        // Cada linha aqui representa "esse livro tem esse gênero"
        $table->foreignId('genero_id')->constrained('generos')->onDelete('cascade');
        $table->foreignId('livro_id')->constrained('livros')->onDelete('cascade');

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('genero_livro');
    }
};
