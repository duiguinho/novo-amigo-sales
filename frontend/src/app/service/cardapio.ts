
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cardapio } from '../models/cardapio';

@Injectable({
providedIn: 'root',
})
export class CardapioService {

private apiUrl = 'http://127.0.0.1:8000/api/cardapios';

constructor(private http: HttpClient) {}

obterCardapio(): Observable<Cardapio[]> {
return this.http.get<Cardapio[]>(this.apiUrl);
}

adicionarCardapio(cardapio: Omit<Cardapio, 'id'>): Observable<Cardapio> {
return this.http.post<Cardapio>(this.apiUrl, cardapio);
}
}
