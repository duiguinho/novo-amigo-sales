<?php

namespace App\Http\Controllers;

use App\Models\Genero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class GeneroController extends Controller
{
    public function index()
    {
        return response()->json(Genero::all());
    }

    public function show($id)
    {
        return response()->json(Genero::findOrFail($id));
    }

    public function store(Request $request)
    {
        if (Gate::denies('gerenciar-genero')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $request->validate([
            'genero' => 'required|string|unique:generos,genero',
        ]);

        $genero = Genero::create(['genero' => $request->genero]);

        return response()->json($genero, 201);
    }

    public function update(Request $request, $id)
    {
        if (Gate::denies('gerenciar-genero')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $request->validate([
            'genero' => 'sometimes|required|string|unique:generos,genero,' . $id,
        ]);

        $genero = Genero::findOrFail($id);
        $genero->genero = $request->genero ?? $genero->genero;
        $genero->save();

        return response()->json($genero);
    }

    public function destroy($id)
    {
        if (Gate::denies('gerenciar-genero')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        Genero::findOrFail($id)->delete();

        return response()->json(['mensagem' => 'Removido com sucesso'], 200);
    }
}