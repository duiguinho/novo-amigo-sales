<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aviso extends Model
{
    protected $fillable = [
        'mensagem',
        'data_expiracao',
    ];

    protected $casts = [
        'data_expiracao' => 'datetime',
    ];
}