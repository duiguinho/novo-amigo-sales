<?php

namespace App\Http\Controllers;

use App\Models\Aviso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AvisoController extends Controller
{
    public function index() {

        Aviso::where('data_expiracao', '<', now())->delete();

        $avisos = Aviso::all();
        return response()->json($avisos);
    
    }

    public function show($id) {

        Aviso::where('data_expiracao', '<', now())->delete();

        $aviso = Aviso::findOrFail($id);
        return response()->json($aviso);

    }

    public function store(Request $request) {

        if (Gate::denies('gerenciar-aviso')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $request->validate([
            'titulo' => 'required|string',
            'descricao' => 'required|string',
            'data_expiracao' => 'required|date',
]);

        $aviso = Aviso::create([
            'titulo' => $request->titulo,
            'descricao' => $request->descricao,
            'data_expiracao' => $request->data_expiracao,
]);

        return response()->json($aviso, 201);
    }

    public function destroy ($id) {

        if (Gate::denies('gerenciar-aviso')) {
            return response()->json(['erro' => 'Você não tem permissão para remover essa aviso'], 403);
        }

        $aviso = Aviso::findOrFail($id);


        $aviso->delete();
        return response()->json(['mensagem' => 'Removido com sucesso'], 200);
    }
}
