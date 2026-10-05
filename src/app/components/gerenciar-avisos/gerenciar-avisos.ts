import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Aviso } from '../../models/avisos';
import { AvisosService } from '../../service/avisos';

@Component({
  selector: 'app-gerenciar-avisos',
  imports: [FormsModule],
  templateUrl: './gerenciar-avisos.html',
  styleUrl: './gerenciar-avisos.css',
})
export class GerenciarAvisos {

  novoTitulo= "";
  novoDescricao= "";

  constructor(private avisoService: AvisosService) {}

  adicionarAviso(){

    const novoAviso: Aviso = {
      id: this.avisoService.obterAvisos().length+1,
      titulo: this.novoTitulo,
      descricao: this.novoDescricao
    };

    this.avisoService.adicionarAviso(novoAviso);

    alert('aviso adicionado')

    this.novoTitulo = "";
    this.novoDescricao = "";

  }

}
