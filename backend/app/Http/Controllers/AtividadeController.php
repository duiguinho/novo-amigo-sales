<?php

namespace App\Http\Controllers;

use App\Models\Atividade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AtividadeController extends Controller
{
    public function index()
    {
        $atividades = Atividade::with(['sala', 'usuario'])->get();
        return response()->json($atividades);
    }

    public function show($id)
    {
        $atividade = Atividade::with(['sala', 'usuario'])->findOrFail($id);
        return response()->json($atividade);
    }

    // Rota extra: atividades de UMA sala específica (o que o aluno vai usar mais)
    public function porSala($salaId)
    {
        $atividades = Atividade::where('sala_id', $salaId)
            ->orderBy('data_entrega')
            ->get();

        return response()->json($atividades);
    }

    public function store(Request $request)
    {
        // só professor/coordenador podem criar atividade
        if (Gate::denies('gerenciar-atividade')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $request->validate([
            'titulo' => 'required|string',
            'descricao' => 'nullable|string',
            'disciplina' => 'required|string',
            'data_entrega' => 'required|date',
            'sala_id' => 'required|exists:salas,id',
        ]);

        $atividade = Atividade::create([
            'titulo' => $request->titulo,
            'descricao' => $request->descricao,
            'disciplina' => $request->disciplina,
            'data_entrega' => $request->data_entrega,
            'sala_id' => $request->sala_id,
        ]);

        return response()->json($atividade->load(['sala']), 201);
    }

    public function update(Request $request, $id)
    {
        if (Gate::denies('gerenciar-atividade')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $atividade = Atividade::findOrFail($id);

        $request->validate([
            'titulo' => 'sometimes|required|string',
            'descricao' => 'nullable|string',
            'disciplina' => 'sometimes|required|string',
            'data_entrega' => 'sometimes|required|date',
            'sala_id' => 'sometimes|required|exists:salas,id',
        ]);


        return response()->json($atividade->load(['sala']));
    }

    public function destroy($id)
    {
        if (Gate::denies('gerenciar-atividade')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $atividade = Atividade::findOrFail($id);
        $atividade->delete();

        return response()->json(['mensagem' => 'Removido com sucesso'], 200);
    }
}