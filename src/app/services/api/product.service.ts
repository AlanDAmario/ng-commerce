// Importiamo i decoratori necessari per Angular e i moduli per eseguire le richieste HTTP
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  // Indichiamo che questo servizio sarà disponibile globalmente in tutta l'app
  providedIn: 'root',
})
export class ProductService {
  // URL base dell'API per ottenere i dati
  private apiUrl = 'https://fakestoreapi.com/products';

  // Variabile per memorizzare i prodotti già caricati, per evitare chiamate multiple
  private productsCache: Product[] = []; // Inizializziamo la cache come array vuoto

  // Costruttore del servizio. Angular inietta automaticamente HttpClient per eseguire le richieste HTTP.
  constructor(private http: HttpClient) {}

  /**
   * Metodo per ottenere tutti i prodotti dall'API.
   * Se l'API restituisce un array di oggetti con un array 'products', possiamo combinare tutti i prodotti in un unico array usando `flatMap`.
   * @returns Observable<Product[]> - Lista completa di prodotti combinati.
   */
  getProducts(): Observable<Product[]> {
    // Verifica se i dati sono già stati caricati, altrimenti effettua la richiesta
    if (this.productsCache.length > 0) {
      return of(this.productsCache); // Restituisci i dati già memorizzati
    }

    // Carica i dati solo se non sono già nella cache
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((response) => {
        this.productsCache = response; // Memorizza i dati nella cache
        return response; // Restituisci la risposta
      })
    );
  }

  /**
   * Metodo per ottenere i prodotti per una pagina specifica con impaginazione.
   * La paginazione viene eseguita sul lato client, selezionando i prodotti dall'array combinato.
   * @param limit Numero di prodotti per pagina.
   * @param page Numero della pagina corrente.
   * @returns Observable<Product[]> - Lista di prodotti per la pagina specificata.
   */
  paginateProducts(limit: number, page: number): Observable<Product[]> {
    // Verifica che i parametri limit e page siano validi (numeri positivi).
    if (page < 1 || limit < 1) {
      throw new Error('Page and limit must be greater than 0');
    }

    // Otteniamo la lista completa di prodotti e applichiamo la logica di paginazione.
    return this.getProducts().pipe(
      map((allProducts) => {
        // Calcoliamo l'indice iniziale e finale per la pagina corrente.
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        // Selezioniamo i prodotti tra gli indici calcolati.
        return allProducts.slice(startIndex, endIndex);
      })
    );
  }
}
