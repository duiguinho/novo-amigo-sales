import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AvisoComponent } from '../../components/aviso/aviso';
import { MatDialog } from '@angular/material/dialog';
import { CardapioComponent } from '../../components/cardapio/cardapio';
import { AvisosService } from '../../service/avisos';
import { Aviso } from '../../models/avisos';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-pagina-inicial',
  imports: [RouterLink, AvisoComponent, CardapioComponent, MatPaginatorModule],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css',
})
export class PaginaInicial {

  constructor(private dialog: MatDialog, private avisoService: AvisosService){}

  abrirCardapio() {
  this.dialog.open(CardapioComponent, {
    panelClass: 'cardapio-dialog'
  });
}

noticias: Aviso[] = [];
noticiasVisiveis: Aviso[] = [];

ngOnInit() {
  this.noticias = this.avisoService.obterAvisos();
  this.noticiasVisiveis = this.noticias.slice(0,4);
}

  mudarPagina(event: PageEvent) {

    const inicio = event.pageIndex * event.pageSize;
    const fim = inicio + event.pageSize;

    this.noticiasVisiveis = this.noticias.slice(inicio, fim);
  }

}



