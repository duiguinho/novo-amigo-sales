<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::table('avisos', function (Blueprint $table) {
            $table->string('titulo')->default('Aviso')->after('id');
            $table->text('descricao')->nullable()->after('titulo');
        });

        DB::table('avisos')->update([
            'descricao' => DB::raw('mensagem'),
        ]);

        Schema::table('avisos', function (Blueprint $table) {
            $table->dropColumn('mensagem');
        });
    }


    public function down(): void
    {
        Schema::table('avisos', function (Blueprint $table) {
            $table->text('mensagem')->nullable()->after('id');
        });

        DB::table('avisos')->update([
            'mensagem' => DB::raw('descricao'),
        ]);

        Schema::table('avisos', function (Blueprint $table) {
            $table->dropColumn(['titulo', 'descricao']);
        });
    }
};