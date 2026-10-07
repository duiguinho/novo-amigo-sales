<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Livro extends Model
{
    protected $fillable = [
        'titulo',
        'autores',
        'sinopse',
        'categoria',
        'ano_publicacao',
        'imagem',
        'isbn',
        'disponibilidade',
    ];
    // genero_id sai do fillable também, já que não existe mais essa coluna aqui
    protected $casts = [
        'autores' => 'array',
    ];

    public function generos()
    {
        return $this->belongsToMany(Genero::class, 'genero_livro');
    }
}