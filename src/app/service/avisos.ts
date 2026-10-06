import { Injectable } from '@angular/core';
import { Aviso } from '../models/avisos';

@Injectable({
  providedIn: 'root',
})
export class AvisosService {

    avisos: Aviso[] = [
    ];
  
    adicionarAviso(aviso: Aviso){
      this.avisos.push(aviso);
    }

    obterAvisos(){
      return this.avisos;
    }

}
