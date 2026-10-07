<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CursoController extends Controller
{
    public function index()
    {
        $cursos = Curso::all();
        return response()->json($cursos);
    }

    public function show($id)
    {
        $curso = Curso::findOrFail($id);
        return response()->json($curso);
    }

    public function store(Request $request)
    {
        if (Gate::denies('gerenciar-sala')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $request->validate([
            'nome' => 'required|string|unique:cursos,nome',
        ]);

        $curso = Curso::create(['nome' => $request->nome]);

        return response()->json($curso, 201);
    }

    public function update(Request $request, $id)
    {
        if (Gate::denies('gerenciar-sala')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $request->validate([
            'nome' => 'sometimes|required|string|unique:cursos,nome,' . $id,
        ]);

        $curso = Curso::findOrFail($id);
        $curso->nome = $request->nome ?? $curso->nome;
        $curso->save();

        return response()->json($curso);
    }

    public function destroy($id)
    {
        if (Gate::denies('gerenciar-sala')) {
            return response()->json(['erro' => 'Sem permissão'], 403);
        }

        $curso = Curso::findOrFail($id);
        $curso->delete();

        return response()->json(['mensagem' => 'Removido com sucesso'], 200);
    }
}