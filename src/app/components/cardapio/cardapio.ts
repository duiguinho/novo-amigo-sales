import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cardapio } from '../../models/cardapio';

@Component({
  selector: 'app-cardapio',
  imports: [ CommonModule],
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.css',
})
export class CardapioComponent {

  dias: Cardapio[] = [
    {id: 1, letra: 'S', nome: 'Segunda-feira', manha: 'arroz feijão e carne', tarde: 'arroz feijão e frango'},
    {id: 2, letra: 'T', nome: 'Terça-feira', manha: 'arroz e bdwebubwubuwebu', tarde: 'feijão e frango'},
    {id: 3, letra: 'Q', nome: 'Quarta-feira', manha: 'macarrão', tarde: 'banana'},
    {id: 4, letra: 'Q', nome: 'Quinta-feira', manha: 'palmito', tarde: 'alguma coisa'},
    {id: 5, letra: 'S', nome: 'Sexta-feira', manha: 'sushi e sashimi', tarde: 'rocambole'},
  ];

  diaSelecionado = 1;
  

  selecionarDia(id: number){
    this.diaSelecionado = id;
  }

  get diaAtual() {
    return this.dias.find(dia => dia.id === this.diaSelecionado);
  }

}
