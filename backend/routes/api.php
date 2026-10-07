<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LivroController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\NoticiaController;
use App\Http\Controllers\AvisoController;
use App\Http\Controllers\CardapioController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\HorarioAulaController;
use App\Http\Controllers\AtividadeController;

Route::get('/user', function (Request $request) {
    return $request->user();
    })->middleware('auth:sanctum');
    
// Fazer login
Route::post('/login', [AuthController::class, 'login']);
Route::post('/cadastro', [AuthController::class, 'cadastrar']);


# Usuario
Route::middleware('auth:sanctum')->group(function () {

    // logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // CRUD de usuário 
    Route::get('/usuarios', [UsuarioController::class, 'index']);
    Route::post('/usuarios', [UsuarioController::class, 'store']);
    Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);
    Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);
    Route::delete('/usuarios/{id}', [UsuarioController::class, 'destroy']);
});

#Livro
Route::middleware('auth:sanctum')->group(function () {

    // Rota específica de busca por ISBN — precisa vir ANTES da rota /livros/{id},
    // senão o Laravel pode confundir "buscar-isbn" com um {id}
    Route::get('/livros/buscar-isbn/{isbn}', [LivroController::class, 'buscarPorIsbn']);

    Route::get('/livros', [LivroController::class, 'index']);
    Route::post('/livros', [LivroController::class, 'store']);
    Route::get('/livros/{id}', [LivroController::class, 'show']);
    Route::put('/livros/{id}', [LivroController::class, 'update']);
    Route::delete('/livros/{id}', [LivroController::class, 'destroy']);
});

#Genero
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/generos', [GeneroController::class, 'index']);
    Route::post('/generos', [GeneroController::class, 'store']);
    Route::get('/generos/{id}', [GeneroController::class, 'show']);
    Route::put('/generos/{id}', [GeneroController::class, 'update']);
    Route::delete('/generos/{id}', [GeneroController::class, 'destroy']);
});

#Noticia
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/noticias', [NoticiaController::class, 'index']);
    Route::post('/noticias', [NoticiaController::class, 'store']);
    Route::get('/noticias/{id}', [NoticiaController::class, 'show']);
    Route::put('/noticias/{id}', [NoticiaController::class, 'update']);
    Route::delete('/noticias/{id}', [NoticiaController::class, 'destroy']);

});

#Aviso
Route::get('/avisos', [AvisoController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/avisos', [AvisoController::class, 'store']);
    Route::get('/avisos/{id}', [AvisoController::class, 'show']);
    Route::delete('/avisos/{id}', [AvisoController::class, 'destroy']);
});

#Cardapio
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/cardapios', [CardapioController::class, 'index']);
    Route::post('/cardapios', [CardapioController::class, 'store']);
    Route::get('/cardapios/{id}', [CardapioController::class, 'show']);
    Route::put('/cardapios/{id}', [CardapioController::class, 'update']);
    Route::delete('/cardapios/{id}', [CardapioController::class, 'destroy']);

});


#Sala
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/salas', [SalaController::class, 'index']);
    Route::post('/salas', [SalaController::class, 'store']);
    Route::get('/salas/{id}', [SalaController::class, 'show']);
    Route::put('/salas/{id}', [SalaController::class, 'update']);
    Route::delete('/salas/{id}', [SalaController::class, 'destroy']);
});

#Curso
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/cursos', [CursoController::class, 'index']);
    Route::post('/cursos', [CursoController::class, 'store']);
    Route::get('/cursos/{id}', [CursoController::class, 'show']);
    Route::put('/cursos/{id}', [CursoController::class, 'update']);
    Route::delete('/cursos/{id}', [CursoController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/horarios/sala/{salaId}', [HorarioAulaController::class, 'porSala']);
    Route::get('/horarios', [HorarioAulaController::class, 'index']);
    Route::post('/horarios/lote', [HorarioAulaController::class, 'storeLote']); // criar em massa
    Route::post('/horarios', [HorarioAulaController::class, 'store']); // criar um só
    Route::get('/horarios/{id}', [HorarioAulaController::class, 'show']);
    Route::put('/horarios/{id}', [HorarioAulaController::class, 'update']);
    Route::delete('/horarios/{id}', [HorarioAulaController::class, 'destroy']);

    Route::get('/atividades/sala/{salaId}', [AtividadeController::class, 'porSala']);
    Route::get('/atividades', [AtividadeController::class, 'index']);
    Route::post('/atividades', [AtividadeController::class, 'store']);
    Route::get('/atividades/{id}', [AtividadeController::class, 'show']);
    Route::put('/atividades/{id}', [AtividadeController::class, 'update']);
    Route::delete('/atividades/{id}', [AtividadeController::class, 'destroy']);
});