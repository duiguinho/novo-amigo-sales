<?php

namespace App\Http\Controllers;

use App\Models\Cardapio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CardapioController extends Controller
{
    public function index() {

        $cardapios = Cardapio::all();
        return response()->json($cardapios);
    
    }

    public function show($id) {

        $cardapio = Cardapio::findOrFail($id);
        return response()->json($cardapio);

    }

    public function store(Request $request) {

        if (Gate::denies('gerenciar-cardapio')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $request->validate([
            'dia_semana' => 'required|in:segunda,terca,quarta,quinta,sexta',
            'refeicao' => 'required|string',
        ]);

        $cardapio = Cardapio::create([
            'dia_semana' => $request->dia_semana,
            'refeicao' => $request->refeicao,
        ]); 

        return response()->json($cardapio, 201);
    }

    public function update(Request $request, $id) {

        if (Gate::denies('gerenciar-cardapio')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $request->validate([
            'dia_semana' => 'sometimes|required|in:segunda,terca,quarta,quinta,sexta',
            'refeicao' => 'sometimes|required|string',
        ]);

        $cardapio = Cardapio::findOrFail($id);

        $cardapio->dia_semana = $request->dia_semana ?? $cardapio->dia_semana;
        $cardapio->refeicao = $request->refeicao ?? $cardapio->refeicao;

        $cardapio->save();

        return response()->json($cardapio, 200);
    }

    public function destroy ($id) {

        if (Gate::denies('gerenciar-cardapio')) {
            return response()->json(['erro' => 'Você não tem permissão para remover esse cardapio'], 403);
        }

        $cardapio = Cardapio::findOrFail($id);


        $cardapio->delete();
        return response()->json(['mensagem' => 'Removido com sucesso'], 200);
    }
}
