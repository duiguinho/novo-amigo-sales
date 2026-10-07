<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Sala;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Busca no banco um usuário cujo nome_usuario bate com o que veio no request.
        // first() retorna o primeiro resultado encontrado, ou null se não achar nenhum.
        $usuario = Usuario::where('nome_usuario', $request->nome_usuario)->first();

        // Se não encontrou o usuário, ou a senha enviada não bate com o hash salvo no banco,
        // recusa o login. Hash::check() compara a senha em texto puro com o hash automaticamente.
        if (!$usuario || !Hash::check($request->senha, $usuario->senha)) {
            return response()->json(['erro' => 'Credenciais inválidas'], 401);
            // 401 = "Unauthorized", código HTTP padrão para credenciais inválidas
        }

        $token = $usuario->createToken('token')->plainTextToken;

        return response()->json([
            'usuario' => $usuario,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        // $request->user() retorna o usuário autenticado atual (identificado pelo token
        // enviado no header Authorization). currentAccessToken() pega o token específico
        // que foi usado nessa requisição, e delete() remove ele do banco —
        // ou seja, esse token para de funcionar a partir de agora.
        $request->user()->currentAccessToken()->delete();

        return response()->json(['mensagem' => 'Logout realizado com sucesso']);
    }

    public function cadastrar(Request $request)
{
    // Valida os campos básicos, comuns a qualquer nivel_acesso de cadastro
    $request->validate([
        'nome_completo' => 'required|string',
        // unique:usuarios,nome_usuario garante que não existam dois logins iguais
        'nome_usuario' => 'required|string|unique:usuarios,nome_usuario',
        'senha' => 'required|string|min:6',
        // 'in:aluno,autoridade' só aceita esses dois valores pro campo nivel_acesso
        'nivel_acesso' => 'required|in:aluno,administrador,bibliotecario',
        'codigo_acesso' => 'required|string',
    ]);

    $existeUsuario = Usuario::where('nome_usuario', $request->nome_usuario)->exists();
    if ($existeUsuario) {
        return response()->json(['erro' => 'Usuário já existente'], 422);
    }

    if ($request->nivel_acesso === 'aluno') {
        // Procura uma sala cujo codigo_acesso bata com o que foi enviado
        $sala = Sala::where('codigo_acesso', $request->codigo_acesso)->first();

        if (!$sala) {
            return response()->json(['erro' => 'Código de sala inválido'], 422);
        }

        $nivelAcesso = 'aluno';
        $salaId = $sala->id;

    } else {
        // env() lê o valor da variável definida no .env
        if ($request->codigo_acesso === env('CODIGO_ADMINISTRADOR')) {
            $nivelAcesso = 'administrador';
        } elseif ($request->codigo_acesso === env('CODIGO_BIBLIOTECARIO')) {
            $nivelAcesso = 'bibliotecario';
        } else {
            return response()->json(['erro' => 'Código de autoridade inválido'], 422);
        }

        $salaId = null; // bibliotecario/administrador não têm sala
    }

    $usuario = Usuario::create([
        'nome_completo' => $request->nome_completo,
        'nome_usuario' => $request->nome_usuario,
        'senha' => Hash::make($request->senha),
        'nivel_acesso' => $nivelAcesso,
        'sala_id' => $salaId,
    ]);

    // Gera o token já no cadastro, pra pessoa entrar logada automaticamente,
    // sem precisar fazer login separado logo depois de se cadastrar
    $token = $usuario->createToken('token')->plainTextToken;

    return response()->json([
        'usuario' => $usuario,
        'token' => $token,
    ], 201);
}
}