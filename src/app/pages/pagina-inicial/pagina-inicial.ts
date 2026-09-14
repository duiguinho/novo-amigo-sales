import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Aviso } from '../../components/aviso/aviso';
import { MatDialog } from '@angular/material/dialog';
import { Cardapio } from '../../components/cardapio/cardapio';

@Component({
  selector: 'app-pagina-inicial',
  imports: [RouterLink, Aviso, Cardapio],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css',
})
export class PaginaInicial {

  constructor(private dialog: MatDialog){}

  abrirCardapio() {
  this.dialog.open(Cardapio, {
    panelClass: 'cardapio-dialog'
  });
}


noticias = [
  {id:1, titulo: 'Reunião de pais', descricao: 'A reunião acontecerá na próxima semana.'},
  {id:2, titulo: 'Semana Paulo Freire', descricao: 'Confira as atividades da semana.'},
  {id:3, titulo: 'Novo aviso', descricao: 'Confira as informações no mural.'},
  {id:4, titulo: 'Biblioteca', descricao: 'Novos livros estão disponíveis.'}
];

}



