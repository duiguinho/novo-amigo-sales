<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Usuario;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Gate para CRIAR usuário: só administrador pode.
        // $usuarioLogado é injetado automaticamente pelo Laravel (quem está fazendo a ação).

        // Gate para EDITAR usuário: administrador pode editar qualquer um,
        // OU o próprio usuário pode editar a si mesmo.
        // $usuarioAlvo é o usuário que está sendo editado (o {id} da rota).
        Gate::define('editar-usuario', function (Usuario $usuarioLogado, Usuario $usuarioAlvo) {
            return $usuarioLogado->nivel_acesso === 'administrador'
                || $usuarioLogado->id === $usuarioAlvo->id;
        });

        Gate::define('gerenciar-noticia', function (Usuario $usuarioLogado) {
            return $usuarioLogado->nivel_acesso === 'administrador';
        });

        Gate::define('gerenciar-aviso', function (Usuario $usuarioLogado) {
            return $usuarioLogado->nivel_acesso === 'administrador';
        });

        Gate::define('gerenciar-cardapio', function (Usuario $usuarioLogado) {
            return $usuarioLogado->nivel_acesso === 'administrador';
        });

        // Gate para DELETAR usuário: só administrador pode.
        Gate::define('deletar-usuario', function (Usuario $usuarioLogado) {
            return $usuarioLogado->nivel_acesso === 'administrador';
        });

        Gate::define('gerenciar-biblioteca', function (Usuario $usuarioLogado) {
            return in_array($usuarioLogado->nivel_acesso, ['administrador', 'bibliotecario']);
        });

        Gate::define('gerenciar-sala', function (Usuario $usuarioLogado) {
            return $usuarioLogado->nivel_acesso === 'administrador';
        });

        Gate::define('gerenciar-usuario', function (Usuario $usuarioLogado) {
            return $usuarioLogado->nivel_acesso === 'administrador';
        });

        Gate::define('gerenciar-curso', function (Usuario $usuarioLogado) {
            return $usuarioLogado->nivel_acesso === 'administrador';
        });

        Gate::define('gerenciar-genero', function (Usuario $usuarioLogado) {
            return in_array($usuarioLogado->nivel_acesso, ['administrador', 'bibliotecario']);
        });

        Gate::define('gerenciar-horario', function (Usuario $usuarioLogado) {
            return in_array($usuarioLogado->nivel_acesso, ['administrador']);
        });

        Gate::define('gerenciar-atividade', function (Usuario $usuarioLogado) {
            return in_array($usuarioLogado->nivel_acesso, ['administrador']);
        });
    }
}