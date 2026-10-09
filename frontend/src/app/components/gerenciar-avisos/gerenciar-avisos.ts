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
  novaDataExpiracao = "";

  constructor(private avisoService: AvisosService) {}

  adicionarAviso() {

    const novoAviso: Aviso = {
      id: 0,
      titulo: this.novoTitulo,
      descricao: this.novoDescricao,
      data_expiracao: this.novaDataExpiracao
    };

    this.avisoService.adicionarAviso(novoAviso).subscribe({
      next: () => {
        alert('Aviso adicionado');

        this.novoTitulo = "";
        this.novoDescricao = "";
        this.novaDataExpiracao = "";
      },
      error: (erro) => {
        console.error(erro);
        alert('Não foi possível adicionar o aviso');
        
      }
    });

}

}
