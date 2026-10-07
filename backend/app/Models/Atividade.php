<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atividade extends Model
{
    protected $fillable = [
        'titulo',
        'descricao',
        'disciplina',
        'data_entrega',
        'sala_id',
    ];

    public function sala()
    {
        return $this->belongsTo(Sala::class);
    }

    // O professor que criou essa atividade
    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
}