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
  // URL base dell'API DummyJSON per ottenere i prodotti
  private apiUrl = 'https://dummyjson.com/products';

  // Variabile per memorizzare i prodotti già caricati per evitare chiamate multiple
  private productsCache: Product[] = []; // Inizializziamo la cache come array vuoto

  // Costruttore del servizio. Angular inietta automaticamente HttpClient per eseguire le richieste HTTP.
  constructor(private http: HttpClient) {}

  /**
   * Metodo per ottenere tutti i prodotti dall'API.
   * Se l'API DummyJSON restituisce un oggetto con una proprietà 'products', accediamo a essa.
   * @returns Observable<Product[]> - Lista completa di prodotti.
   */
  getProducts(): Observable<Product[]> {
    // Verifica se i dati sono già stati caricati, altrimenti effettua la richiesta
    if (this.productsCache.length > 0) {
      return of(this.productsCache); // Restituisci i dati già memorizzati
    }

    // Carica i dati solo se non sono già nella cache
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        // Accediamo alla proprietà 'products' nella risposta dell'API
        this.productsCache = response.products;
        return response.products; // Restituisci l'array di prodotti
      })
    );
  }

  /**
   * Metodo per ottenere i prodotti per una pagina specifica con impaginazione lato server.
   * @param limit Numero di prodotti per pagina.
   * @param page Numero della pagina corrente.
   * @returns Observable<Product[]> - Lista di prodotti per la pagina specificata.
   */
  paginateProducts(limit: number, page: number): Observable<Product[]> {
    // Calcoliamo lo skip per la paginazione (quanti prodotti saltare)
    const skip = (page - 1) * limit;

    // URL con parametri di paginazione (limit e skip)
    const paginatedUrl = `${this.apiUrl}?limit=${limit}&skip=${skip}`;

    // Effettua la richiesta con i parametri di paginazione
    return this.http.get<any>(paginatedUrl).pipe(
      map((response) => {
        return response.products; // Restituisce i prodotti per la pagina richiesta
      })
    );
  }
}
