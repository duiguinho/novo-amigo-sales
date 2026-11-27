<?php
namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate;

class UsuarioController extends Controller
{
    

    public function index()
    {
        $usuarios = Usuario::all();

        return response()->json($usuarios);
    }


    

    public function store(Request $request)
    {
        if (Gate::denies('gerenciar-usuario')) {
            return response()->json([
                'erro' => 'Você não tem permissão para criar usuários.'
            ], 403);
        }

        $dados = $request->validate([
            'nome_completo' => 'required|string|max:255',
            'nome_usuario' => 'required|string|max:255|unique:usuarios,nome_usuario',
            'senha' => 'required|string|min:6',
            'nivel_acesso' => 'required|in:aluno,administrador,bibliotecario',
            'sala_id' => 'required_if:nivel_acesso,aluno|nullable|exists:salas,id',
        ]);

        $usuario = Usuario::create([
            'nome_completo' => $dados['nome_completo'],
            'nome_usuario' => $dados['nome_usuario'],
            'senha' => Hash::make($dados['senha']),
            'nivel_acesso' => $dados['nivel_acesso'],
            'sala_id' => $dados['nivel_acesso'] === 'aluno'
                ? ($dados['sala_id'] ?? null)
                : null,
        ]);

        return response()->json($usuario, 201);
    }


    /*
    |--------------------------------------------------------------------------
    | Criar funcionário
    |--------------------------------------------------------------------------
    | Apenas administrador pode cadastrar administrador ou bibliotecário.
    | Não utiliza código de acesso público.
    |--------------------------------------------------------------------------
    */

    
public function criarFuncionario(Request $request)
{
    if (
        !$request->user() ||
        $request->user()->nivel_acesso !== 'administrador'
    ) {
        return response()->json([
            'erro' => 'Apenas administradores podem cadastrar funcionários.'
        ], 403);
    }

    $dados = $request->validate([
        'nome_completo' => 'required|string|max:255',
        'nome_usuario' => 'required|string|max:255|unique:usuarios,nome_usuario',
        'senha' => 'required|string|min:6',
        'nivel_acesso' => 'required|in:administrador,bibliotecario',
    ]);

    $funcionario = Usuario::create([
        'nome_completo' => $dados['nome_completo'],
        'nome_usuario' => $dados['nome_usuario'],
        'senha' => Hash::make($dados['senha']),
        'nivel_acesso' => $dados['nivel_acesso'],
        'sala_id' => null,
    ]);

    return response()->json([
        'mensagem' => 'Funcionário cadastrado com sucesso.',
        'funcionario' => $funcionario
    ], 201);
}



/*
|--------------------------------------------------------------------------
| Listar funcionários
|--------------------------------------------------------------------------
*/

public function listarFuncionarios(Request $request)
{
    if (
        !$request->user() ||
        $request->user()->nivel_acesso !== 'administrador'
    ) {
        return response()->json([
            'erro' => 'Apenas administradores podem visualizar funcionários.'
        ], 403);
    }

    $funcionarios = Usuario::whereIn('nivel_acesso', [
        'administrador',
        'bibliotecario'
    ])->get();

    return response()->json($funcionarios);
}


/*
|--------------------------------------------------------------------------
| Redefinir senha de funcionário
|--------------------------------------------------------------------------
*/

public function redefinirSenhaFuncionario(Request $request, $id)
{
    if (
        !$request->user() ||
        $request->user()->nivel_acesso !== 'administrador'
    ) {
        return response()->json([
            'erro' => 'Apenas administradores podem alterar senhas.'
        ], 403);
    }

    $funcionario = Usuario::findOrFail($id);

    if (!in_array($funcionario->nivel_acesso, [
        'administrador',
        'bibliotecario'
    ])) {
        return response()->json([
            'erro' => 'Este usuário não é um funcionário.'
        ], 422);
    }

    $dados = $request->validate([
        'senha' => 'required|string|min:6',
    ]);

    $funcionario->senha = Hash::make($dados['senha']);
    $funcionario->save();

    return response()->json([
        'mensagem' => 'Senha do funcionário atualizada com sucesso.'
    ]);
}



    /*
    |--------------------------------------------------------------------------
    | Mostrar usuário
    |--------------------------------------------------------------------------
    */

    public function show($id)
    {
        $usuario = Usuario::findOrFail($id);

        return response()->json($usuario);
    }


    /*
    |--------------------------------------------------------------------------
    | Atualizar usuário
    |--------------------------------------------------------------------------
    */

    public function update(Request $request, $id)
    {
        $usuarioAlvo = Usuario::findOrFail($id);

        if (Gate::denies('editar-usuario', $usuarioAlvo)) {
            return response()->json([
                'erro' => 'Você não tem permissão para editar esse usuário.'
            ], 403);
        }

        $dados = $request->validate([
            'nome_completo' => 'sometimes|string|max:255',
            'nome_usuario' => 'sometimes|string|max:255|unique:usuarios,nome_usuario,' . $usuarioAlvo->id,
            'senha' => 'sometimes|string|min:6',
            'nivel_acesso' => 'sometimes|in:aluno,administrador,bibliotecario',
            'sala_id' => 'sometimes|nullable|exists:salas,id',
        ]);

        if (isset($dados['nome_completo'])) {
            $usuarioAlvo->nome_completo = $dados['nome_completo'];
        }

        if (isset($dados['nome_usuario'])) {
            $usuarioAlvo->nome_usuario = $dados['nome_usuario'];
        }

        // Somente administrador pode alterar o cargo.
        if (
            $request->user()->nivel_acesso === 'administrador' &&
            isset($dados['nivel_acesso'])
        ) {
            $usuarioAlvo->nivel_acesso = $dados['nivel_acesso'];
        }

        // Aluno pode atualizar sua própria sala, conforme a regra original.
        if (
            $request->user()->nivel_acesso === 'aluno' &&
            array_key_exists('sala_id', $dados)
        ) {
            $usuarioAlvo->sala_id = $dados['sala_id'];
        }

        if (isset($dados['senha'])) {
            $usuarioAlvo->senha = Hash::make($dados['senha']);
        }

        $usuarioAlvo->save();

        return response()->json($usuarioAlvo);
    }


    /*
    |--------------------------------------------------------------------------
    | Excluir usuário
    |--------------------------------------------------------------------------
    */

    public function destroy($id)
    {
        if (Gate::denies('deletar-usuario')) {
            return response()->json([
                'erro' => 'Você não tem permissão para deletar usuários.'
            ], 403);
        }

        $usuario = Usuario::findOrFail($id);

        $usuario->delete();

        return response()->json([
            'mensagem' => 'Removido com sucesso.'
        ], 200);
    }
}
