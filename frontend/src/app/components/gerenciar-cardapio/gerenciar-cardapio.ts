
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cardapio } from '../../models/cardapio';
import { CardapioService } from '../../service/cardapio';

@Component({
  selector: 'app-gerenciar-cardapio',
  imports: [FormsModule],
  templateUrl: './gerenciar-cardapio.html',
  styleUrl: './gerenciar-cardapio.css',
})
export class GerenciarCardapio implements OnInit {

  constructor(private cardapioService: CardapioService) {}

  cardapios: Cardapio[] = [];

  novoDia = 'segunda';
  novaRefeicao = '';

  mensagem = '';
  erro = '';
  carregando = false;

  dias = [
    { dia_semana: 'segunda', nome: 'Segunda-feira' },
    { dia_semana: 'terca', nome: 'Terça-feira' },
    { dia_semana: 'quarta', nome: 'Quarta-feira' },
    { dia_semana: 'quinta', nome: 'Quinta-feira' },
    { dia_semana: 'sexta', nome: 'Sexta-feira' },
  ];

  ngOnInit() {
    this.carregarCardapios();
  }

  carregarCardapios() {
    this.cardapioService.obterCardapio().subscribe({
      next: (cardapios) => {
        this.cardapios = cardapios;
      },
      error: (erro) => {
        console.error('Erro ao carregar cardápios:', erro);
        this.erro = 'Não foi possível carregar os cardápios.';
      }
    });
  }

  adicionarCardapio() {
    const refeicao = this.novaRefeicao.trim();

    if (!refeicao) {
      this.erro = 'Digite a refeição antes de cadastrar.';
      this.mensagem = '';
      return;
    }

    this.erro = '';
    this.mensagem = '';
    this.carregando = true;

    this.cardapioService.adicionarCardapio({
      dia_semana: this.novoDia,
      refeicao: refeicao,
    }).subscribe({
      next: (cardapioCriado) => {
        this.cardapios = [...this.cardapios, cardapioCriado];
        this.novaRefeicao = '';
        this.mensagem = 'Refeição cadastrada com sucesso!';
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao cadastrar refeição:', erro);

        if (erro.status === 401) {
          this.erro = 'É necessário estar autenticado para cadastrar.';
        } else if (erro.status === 403) {
          this.erro = 'Você não tem permissão para cadastrar refeições.';
        } else if (erro.status === 422) {
          this.erro = 'Os dados enviados são inválidos. Confira o dia e a refeição.';
        } else {
          this.erro = 'Não foi possível cadastrar. Verifique se o servidor está funcionando.';
        }

        this.carregando = false;
      }
    });
  }

  nomeDia(diaSemana: string): string {
    return this.dias.find(
      dia => dia.dia_semana === diaSemana
    )?.nome ?? diaSemana;
  }
}