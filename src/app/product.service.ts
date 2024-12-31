//decoratore che permette ad angular di inniettare il servizio in altri componenti
import { Injectable } from '@angular/core';
//httpclient necessario per effettuare richieste http
import { HttpClient } from '@angular/common/http';
// observable per gestire in maniera asincrona la rsiposta dell api
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  //indichiamo che il
  //  servizio sarà disponibile globalmente nell'app, senza bisogno di dichiararlo esplicitamente in ogni modulo
  providedIn: 'root',
})
export class ProductService {
  //qui inseriremo l url che utilizzeremo per richiamare tutti i prodotti
  private apiUrl = 'https://fakestoreapi.com/products';

  //costruttore del servizio. HttpClient è iniettato automaticamente da Angular per eseguire le richieste HTTP
  constructor(private http: HttpClient) { }
  //metodo che restituisce una Observable<Product[]> che rappresenta una lista di tutti i prodotti
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }
}
