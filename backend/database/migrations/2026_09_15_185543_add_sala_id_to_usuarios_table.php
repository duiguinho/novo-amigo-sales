<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            // nullable() porque professor/coordenador não têm sala vinculada
            // constrained('salas') diz que essa coluna referencia a tabela salas, campo id
            // onDelete('set null') = se a sala for deletada, o aluno não é deletado junto,
            // só fica com sala_id = null
            $table->foreignId('sala_id')->nullable()->constrained('salas')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            // dropConstrainedForeignId remove a coluna E a restrição de chave estrangeira junto
            $table->dropConstrainedForeignId('sala_id');
        });
    }
};