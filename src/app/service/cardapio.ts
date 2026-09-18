import { Injectable } from '@angular/core';
import {Cardapio } from '../models/cardapio';

@Injectable({
  providedIn: 'root',
})
export class CardapioService {

  cardapios: Cardapio[] = [];

  adicionarCardapio(cardapio: Cardapio) {

     let indice = this.cardapios.findIndex(
    c => c.id === cardapio.id
  );

  if (indice !== -1) {
    this.cardapios[indice] = cardapio;
  } else {
    this.cardapios.push(cardapio);
  }
  }

  obterCardapio(): Cardapio[] {
    return this.cardapios; 
  }

}
