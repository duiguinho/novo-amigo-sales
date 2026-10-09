import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cardapio } from '../../models/cardapio';
import { CardapioService } from '../../service/cardapio';

@Component({
selector: 'app-cardapio',
imports: [CommonModule],
templateUrl: './cardapio.html',
styleUrl: './cardapio.css',
})
export class CardapioComponent implements OnInit {

cardapios: Cardapio[] = [];

diaSelecionado = 'segunda';

constructor(private cardapioService: CardapioService) {}

ngOnInit() {
this.cardapioService.obterCardapio().subscribe({
next: (cardapios) => {
this.cardapios = cardapios;
},
error: (erro) => {
console.error('Erro ao carregar cardápio:', erro);
}
});
}

dias = [
{ dia_semana: 'segunda', letra: 'S', nome: 'Segunda-feira' },
{ dia_semana: 'terca', letra: 'T', nome: 'Terça-feira' },
{ dia_semana: 'quarta', letra: 'Q', nome: 'Quarta-feira' },
{ dia_semana: 'quinta', letra: 'Q', nome: 'Quinta-feira' },
{ dia_semana: 'sexta', letra: 'S', nome: 'Sexta-feira' },
];

selecionarDia(dia: string) {
this.diaSelecionado = dia;
}

get diaAtual() {
return this.dias.find(
dia => dia.dia_semana === this.diaSelecionado
);
}

get refeicoesDoDia() {
return this.cardapios.filter(
cardapio => cardapio.dia_semana === this.diaSelecionado
);
}
}


