<?php

namespace App\Http\Controllers;

use App\Models\Noticia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class NoticiaController extends Controller
{
    public function index() {

        $noticias = Noticia::all();
        return response()->json($noticias);

    }

    public function show($id) {

        $noticia = Noticia::findOrFail($id);
        return response()->json($noticia);

    }

    public function store(Request $request) {

    if (Gate::denies('gerenciar-noticia')) {
            return response()->json(['erro' => 'Você não tem permissão para postar essa noticia'], 403);
        }

        $request->validate([
            'titulo' => 'required|string',
            'texto' => 'required|string',
        ]);

        $noticia = Noticia::create([
            'titulo' => $request->titulo,
            'texto' => $request->texto,
            'imagem' => $request->imagem
        ]);

        return response()->json($noticia, 201);

    } 

    public function update(Request $request, $id) {

        if (Gate::denies('gerenciar-noticia')) {
            return response()->json(['erro' => 'Você não tem permissão para editar essa noticia'], 403);
            }

            $request->validate([
    'titulo' => 'sometimes|required|string',
    'texto' => 'sometimes|required|string',
]);
        
        $noticia = Noticia::findOrFail($id);

        $noticia->titulo = $request->titulo ?? $noticia->titulo;
        $noticia->texto = $request->texto ?? $noticia->texto;
        $noticia->imagem = $request->imagem ?? $noticia->imagem;

        $noticia->save();

        return response()->json($noticia);

    }

    public function destroy($id) {

        if (Gate::denies('gerenciar-noticia')) {
            return response()->json(['erro' => 'Você não tem permissão para remover essa noticia'], 403);
        }

        $noticia = Noticia::findOrFail($id);


        $noticia->delete();
        return response()->json(['mensagem' => 'Removido com sucesso'], 200);
    }
}
