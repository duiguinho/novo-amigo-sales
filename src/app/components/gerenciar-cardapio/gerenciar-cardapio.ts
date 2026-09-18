import { Component } from '@angular/core';
import { Cardapio } from '../../models/cardapio';
import { FormsModule } from '@angular/forms';
import { CardapioService } from '../../service/cardapio';

@Component({
  selector: 'app-gerenciar-cardapio',
  imports: [FormsModule],
  templateUrl: './gerenciar-cardapio.html',
  styleUrl: './gerenciar-cardapio.css',
})
export class GerenciarCardapio {

  constructor(private cardapioService: CardapioService){
    
  }

  cardapios: Cardapio[] = [];

  novoDia = 1;
  novoManha = '';
  novoTarde = '';

  cardapioEditado: number | null = null;

  dias = [
    {id: 1, letra: 'S', nome: 'Segunda-feira'},
    {id: 2, letra: 'T', nome: 'Terça-feira'},
    {id: 3, letra: 'Q', nome: 'Quarta-feira'},
    {id: 4, letra: 'Q', nome: 'Quinta-feira'},
    {id: 5, letra: 'S', nome: 'Sexta-feira'},
  ];

  adicionarCardapio(){

    let dia = this.dias.find(dia => dia.id === this.novoDia);

    let novoCardapio: Cardapio = {
      id: dia!.id,
      letra: dia!.letra,
      nome: dia!.nome,
      manha: this.novoManha,
      tarde: this.novoTarde,
    }

    this.cardapios.push(novoCardapio);

    this.cardapioService.adicionarCardapio(novoCardapio);

  }

  // editarCardapio(id:number){

  //   let cardapio = this.cardapios.find(cardapio => cardapio.id == id)

  //   if (!cardapio){
  //     return;
  //   }

  //   this.novoManha = cardapio.manha;
  //   this.novoTarde = cardapio.tarde;
  //   this.cardapioEditado = id;

  // }

}
