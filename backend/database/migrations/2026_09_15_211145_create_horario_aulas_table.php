<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('horario_aulas', function (Blueprint $table) {
            $table->id();
            // enum garante que só esses 5 valores sejam aceitos (dias da semana não mudam)
            $table->enum('dia_semana', ['segunda', 'terca', 'quarta', 'quinta', 'sexta']);
            // número da aula no dia (1ª aula, 2ª aula...)
            $table->integer('num_aula');
            $table->string('disciplina'); // ex: "Matemática", "Programação Web"
            // qual sala tem essa aula nesse dia/horário
            $table->foreignId('sala_id')->constrained('salas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('horario_aulas');
    }
};