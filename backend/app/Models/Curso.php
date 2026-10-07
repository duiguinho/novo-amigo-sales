<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $fillable = ['nome'];

    public function salas()
    {
        return $this->hasMany(Sala::class);
    }
}