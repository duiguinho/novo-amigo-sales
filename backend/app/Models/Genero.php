<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genero extends Model
{
    
    protected $fillable = ['genero'];

    // belongsToMany() ao invés de hasMany() — indica relação N-N.
    // O Laravel já sabe procurar a tabela pivô pelo nome padrão (genero_livro),
    // mas você pode especificar explicitamente se quiser deixar mais claro.
    public function livros()
    {
        return $this->belongsToMany(Livro::class, 'genero_livro');
    }
}