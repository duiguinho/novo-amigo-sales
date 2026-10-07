<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    protected $fillable = [
        'serie',
        'curso_id',
        'codigo_acesso',
    ];

    // Uma sala pertence a um curso
    public function curso()
    {
        return $this->belongsTo(Curso::class);
    }

    // Uma sala tem vários alunos
    public function usuarios()
    {
        return $this->hasMany(Usuario::class);
    }

    public function horarios()
    {
        return $this->hasMany(HorarioAula::class);
    }

    public function atividades()
    {
        return $this->hasMany(Atividade::class);
    }
}