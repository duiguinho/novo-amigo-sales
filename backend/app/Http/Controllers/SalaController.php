<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str; // usado pra gerar o código de acesso aleatório

class SalaController extends Controller
{
    public function index()
    {
        // with('curso') já traz o curso junto, evitando N+1 queries
        $salas = Sala::with('curso')->get();
        return response()->json($salas);
    }


    public function show($id)
    {
        $sala = Sala::findOrFail($id);
        return response()->json($sala);
    }

    public function store(Request $request)
    {
        if (Gate::denies('gerenciar-sala')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $request->validate([
            'serie' => 'required|integer|min:1',
            'curso_id' => 'required|exists:cursos,id', // precisa ser um curso que já existe
        ]);

        $sala = Sala::create([
            'serie' => $request->serie,
            'curso_id' => $request->curso_id,
            'codigo_acesso' => Str::random(8),
        ]);

        return response()->json($sala->load('curso'), 201);
    }

    public function update(Request $request, $id)
{
    if (Gate::denies('gerenciar-sala')) {
        return response()->json(['erro' => 'Sem permissão'], 403);
    }

    $request->validate([
        'serie' => 'sometimes|required|integer|min:1',
        'curso_id' => 'sometimes|required|exists:cursos,id',
    ]);

    $sala = Sala::findOrFail($id);

    $sala->serie = $request->serie ?? $sala->serie;
    $sala->curso_id = $request->curso_id ?? $sala->curso_id;
    $sala->save();

    return response()->json($sala->load('curso'));
}

    public function destroy($id)
    {
        if (Gate::denies('gerenciar-sala')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $sala = Sala::findOrFail($id);
        $sala->delete();

        return response()->json(['mensagem' => 'Removido com sucesso'], 200);
    }
}