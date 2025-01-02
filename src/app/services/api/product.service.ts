//decoratore che permette ad angular di inniettare il servizio in altri componenti
import { Injectable } from '@angular/core';
//httpclient necessario per effettuare richieste http
import { HttpClient } from '@angular/common/http';
// observable per gestire in maniera asincrona la rsiposta dell api
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  //indichiamo che il
  //  servizio sarà disponibile globalmente nell'app, senza bisogno di dichiararlo esplicitamente in ogni modulo
  providedIn: 'root',
})
export class ProductService {
  //qui inseriremo l url che utilizzeremo per richiamare tutti i prodotti
  private apiUrl = 'https://fakestoreapi.com/products';

  //costruttore del servizio. HttpClient è iniettato automaticamente da Angular per eseguire le richieste HTTP
  constructor(private http: HttpClient) {}
  //metodo che restituisce una Observable<Product[]> che rappresenta una lista di tutti i prodotti
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  //impaginazione per i prodotti
  paginateProducts(limit: number, page: number): Observable<Product[]> {
    // aggiungiamo l offset (il numero di prodotti da saltare per mostrare i risultati della pagina corrente ) in base alla pagina corrente
    //per la prima pagina (page = 1), l'offset è 0, quindi mostrerà i primi limit prodotti.
    //per la seconda pagina (page = 2), l'offset è limit, quindi mostrerà i prodotti dal (limit + 1) al (limit * 2).
    //per la terza pagina, l'offset è (2 * limit), e così via.
    const offset = (page - 1) * limit;
    //costruiamo dinamicamente l URL con i parametri li it e offset
    //?limit=${limit}: Specifica il numero massimo di prodotti da restituire.
    //&offset=${offset}: Specifica da quale prodotto partire.
    const pageUrl = `${this.apiUrl}?limit=${limit}&offset=${offset}`;
    //attraverso il metodo get di httpclient facciamo una richiesta http get dell url paginato ovvero pageurl
    //specifichiamo <Product[]> per indicare l array di oggetti di tipo product
    //restituendo l observable che metterà i dati dei prodotti una volta che la richiesta sraà completata
    return this.http.get<Product[]>(pageUrl);
  }
}
