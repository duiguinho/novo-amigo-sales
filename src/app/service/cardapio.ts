import { Injectable } from '@angular/core';
import {Cardapio } from '../models/cardapio';

@Injectable({
  providedIn: 'root',
})
export class CardapioService {

  cardapios: Cardapio[] = [];

  adicionarCardapio(cardapio: Cardapio) {
    this.cardapios.push(cardapio);
  }

  obterCardapio(): Cardapio[] {
    return this.cardapios; 
  }

}
