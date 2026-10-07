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
        Schema::create('livros', function (Blueprint $table) {
            $table->id();
            $table->string("titulo");
            $table->json('autores')->nullable();
            $table->text("sinopse")->nullable();
            $table->year("ano_publicacao");
            $table->string("imagem")->nullable();
            $table->string("isbn")->unique();
            $table->string("categoria")->nullable();
            $table->boolean("disponibilidade")->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livros');
    }
};
