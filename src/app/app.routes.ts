import { Routes } from '@angular/router';
import { PaginaInicial } from './pages/pagina-inicial/pagina-inicial';
import { Jornal } from './pages/jornal/jornal';
import { Biblioteca } from './pages/biblioteca/biblioteca';
import { Sala } from './pages/sala/sala';
import { GerenciarCardapio } from './components/gerenciar-cardapio/gerenciar-cardapio';

export const routes: Routes = [
    { path: '', redirectTo: 'pg-inicial', pathMatch: 'full' },

    {path: "pg-inicial", component: PaginaInicial},
    {path: "pg-jornal", component: Jornal},
    {path: "pg-biblioteca", component: Biblioteca},
    {path: "pg-sala", component: Sala},
    {path: "gerenciar-cardapio", component: GerenciarCardapio}
];
