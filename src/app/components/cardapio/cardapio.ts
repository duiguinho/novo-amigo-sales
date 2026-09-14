import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cardapio',
  imports: [ CommonModule],
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.css',
})
export class Cardapio {

  dias = [
    {id: 1, letra: 'S', nome: 'Segunda-feira', manha: 'arroz feijão e carne', tarde: 'arroz feijão e frango'},
    {id: 2, letra: 'T', nome: 'Terça-feira', manha: 'arroz feijão e bdwebubwubuwebu', tarde: 'arroz feijão e frango'},
    {id: 3, letra: 'Q', nome: 'Quarta-feira', manha: 'arroz feijão e carne', tarde: 'arroz feijão e frango'},
    {id: 4, letra: 'Q', nome: 'Quinta-feira', manha: 'arroz feijão e carne', tarde: 'arroz feijão e frango'},
    {id: 5, letra: 'S', nome: 'Sexta-feira', manha: 'arroz feijão e carne', tarde: 'arroz feijão e frango'},
  ]

  diaSelecionado = 1;

  selecionarDia(id: number){
    this.diaSelecionado = id;
  }

  get diaAtual() {
    return this.dias.find(dia => dia.id === this.diaSelecionado);
  }

}
