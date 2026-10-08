<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aviso extends Model
{
    protected $fillable = [
        'titulo',
        'descricao',
        'data_expiracao',
    ];

    protected $casts = [
        'data_expiracao' => 'datetime',
    ];
}