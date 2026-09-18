import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cardapio } from '../../models/cardapio';
import { CardapioService } from '../../service/cardapio';

@Component({
  selector: 'app-cardapio',
  imports: [ CommonModule],
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.css',
})
export class CardapioComponent implements OnInit {

  cardapios: Cardapio[] = [];
  
  diaSelecionado = 1;

  constructor(private cardapioService: CardapioService){}

  ngOnInit() {
    this.cardapios = this.cardapioService.obterCardapio();
  }

  dias: Cardapio[] = [
  {id: 1, letra: 'S', nome: 'Segunda-feira', manha: '', tarde: ''},
  {id: 2, letra: 'T', nome: 'Terça-feira', manha: '', tarde: ''},
  {id: 3, letra: 'Q', nome: 'Quarta-feira', manha: '', tarde: ''},
  {id: 4, letra: 'Q', nome: 'Quinta-feira', manha: '', tarde: ''},
  {id: 5, letra: 'S', nome: 'Sexta-feira', manha: '', tarde: ''},
];

  
  selecionarDia(id: number){
    this.diaSelecionado = id;
  }

  get diaAtual() {
    let dia = this.dias.find(dia => dia.id === this.diaSelecionado);

    return this.cardapios.find(cardapio => cardapio.nome === dia?.nome)
  }

}


