import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aviso } from '../models/avisos';

@Injectable({
  providedIn: 'root',
})
export class AvisosService {

    avisos: Aviso[] = [
    ];

    constructor(private http: HttpClient) {}


    obterAvisos() {
      return this.http.get<Aviso[]>('http://127.0.0.1:8000/api/avisos');
    }

    adicionarAviso(aviso: Aviso) {
      return this.http.post<Aviso>('http://127.0.0.1:8000/api/avisos', aviso);
    }

    proximoId() {
      return this.avisos.length + 1;
    }

}