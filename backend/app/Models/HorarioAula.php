<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HorarioAula extends Model
{
    protected $fillable = [
        'dia_semana',
        'num_aula',
        'disciplina',
        'sala_id',
    ];

    // Um horário de aula pertence a uma sala
    public function sala()
    {
        return $this->belongsTo(Sala::class);
    }
}