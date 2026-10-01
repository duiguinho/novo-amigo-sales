import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-biblioteca',
  imports: [MatPaginatorModule],
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.css',
})
export class Biblioteca {

  livros = [
    {
      titulo: 'Lino',
      autor: 'André Neves',
      imagem: 'images/lino.jpg',
      disponivel: true
    },
    {
      titulo: 'O triste fim de Policarpo Quaresma',
      autor: 'Lima Barreto',
      imagem: 'images/policarpo.jpg',
      disponivel: false
    },
    {
      titulo: 'Fundamentos de Física',
      autor: 'Jearl Walker',
      imagem: 'images/fisica.jpg',
      disponivel: true
    },
    {
      titulo: 'A cinco passos de você',
      autor: 'Rachael Lippincott',
      imagem: 'images/passos.jpg',
      disponivel: true
    },
    {
      titulo: 'Vidas Secas',
      autor: 'Graciliano Ramos',
      imagem: 'images/vidas-secas.jpg',
      disponivel: true
    },
    {
      titulo: 'Dom Casmurro',
      autor: 'Machado de Assis',
      imagem: 'images/dom-casmurro.jpg',
      disponivel: true
    },
    {
      titulo: 'Memórias Póstumas de Brás Cubas',
      autor: 'Machado de Assis',
      imagem: 'images/bras-cubas.jpg',
      disponivel: false
    },
    {
      titulo: 'O Cortiço',
      autor: 'Aluísio Azevedo',
      imagem: 'images/o-cortico.jpg',
      disponivel: true
    },
    {
      titulo: 'Capitães da Areia',
      autor: 'Jorge Amado',
      imagem: 'images/capitaes.jpg',
      disponivel: true
    },
    {
      titulo: 'Iracema',
      autor: 'José de Alencar',
      imagem: 'images/iracema.jpg',
      disponivel: true
    }
  ];

  livrosVisiveis = this.livros.slice(0, 5);

  mudarPagina(event: PageEvent) {

    const inicio = event.pageIndex * event.pageSize;
    const fim = inicio + event.pageSize;

    this.livrosVisiveis = this.livros.slice(inicio, fim);
  }
}


