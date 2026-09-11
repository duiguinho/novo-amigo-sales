import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Aviso } from '../../components/aviso/aviso';

@Component({
  selector: 'app-pagina-inicial',
  imports: [RouterLink, Aviso],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css',
})
export class PaginaInicial {


noticias = [
  {id:1, titulo: 'Reunião de pais', descricao: 'A reunião acontecerá na próxima semana.'},
  {id:2, titulo: 'Semana Paulo Freire', descricao: 'Confira as atividades da semana.'},
  {id:3, titulo: 'Novo aviso', descricao: 'Confira as informações no mural.'},
  {id:4, titulo: 'Biblioteca', descricao: 'Novos livros estão disponíveis.'}
];

}



