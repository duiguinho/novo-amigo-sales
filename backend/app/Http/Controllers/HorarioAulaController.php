<?php

namespace App\Http\Controllers;

use App\Models\HorarioAula;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class HorarioAulaController extends Controller
{
    public function index()
    {
        // with('sala') traz a sala junto, evitando query extra por horário
        $horarios = HorarioAula::with('sala')->get();
        return response()->json($horarios);
    }

    public function show($id)
    {
        $horario = HorarioAula::with('sala')->findOrFail($id);
        return response()->json($horario);
    }

    // Rota extra útil: pegar o horário completo de UMA sala específica
    public function porSala($salaId)
    {
        $horarios = HorarioAula::where('sala_id', $salaId)
            ->orderBy('dia_semana')
            ->orderBy('num_aula')
            ->get();

        return response()->json($horarios);
    }

    public function store(Request $request)
    {
        if (Gate::denies('gerenciar-horario')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $request->validate([
            'dia_semana' => 'required|in:segunda,terca,quarta,quinta,sexta',
            'num_aula' => 'required|integer|min:1',
            'disciplina' => 'required|string',
            'sala_id' => 'required|exists:salas,id',
        ]);

        $horario = HorarioAula::create($request->all());

        return response()->json($horario->load('sala'), 201);
    }

    public function storeLote(Request $request)
{
    if (Gate::denies('gerenciar-horario')) {
        return response()->json(['erro' => 'Sem permissão'], 403);
    }

    $request->validate([
        'sala_id' => 'required|exists:salas,id',
        'aulas' => 'required|array',
        'aulas.*.dia_semana' => 'required|in:segunda,terca,quarta,quinta,sexta',
        'aulas.*.num_aula' => 'required|integer|min:1',
        'aulas.*.disciplina' => 'required|string',
    ]);

    $horariosCriados = [];

    // Percorre cada item do array 'aulas' e cria um registro pra cada um
    foreach ($request->aulas as $aula) {
        $horariosCriados[] = HorarioAula::create([
            'sala_id' => $request->sala_id,
            'dia_semana' => $aula['dia_semana'],
            'num_aula' => $aula['num_aula'],
            'disciplina' => $aula['disciplina'],
        ]);
    }

    return response()->json($horariosCriados, 201);
}

    public function update(Request $request, $id)
    {
        if (Gate::denies('gerenciar-horario')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $horario = HorarioAula::findOrFail($id);

        $request->validate([
            'dia_semana' => 'sometimes|required|in:segunda,terca,quarta,quinta,sexta',
            'num_aula' => 'sometimes|required|integer|min:1',
            'disciplina' => 'sometimes|required|string',
            'sala_id' => 'sometimes|required|exists:salas,id',
        ]);

        $horario->update($request->all());

        return response()->json($horario->load('sala'));
    }

    public function destroy($id)
    {
        if (Gate::denies('gerenciar-horario')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $horario = HorarioAula::findOrFail($id);
        $horario->delete();

        return response()->json(['mensagem' => 'Removido com sucesso'], 200);
    }
}