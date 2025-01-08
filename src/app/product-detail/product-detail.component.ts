import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  //memorizziamo l id del prodotto
  productId: number | null = null;
  //innittiamo nelle Activatedroute come dipendeza, consentendo di accedere ai dati di routing
  constructor(
    private route: ActivatedRoute, // per gestire i parametri dell url
    private http: HttpClient // per chiamare l api
  ) {}
  //al momento dell inizializzazione del componente recuperiamo l id dall url
  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    // this.route.snapshot: ottiene lo stato attuale del routing
    // .paramMap: è una mappa che contiene tutti i parametri dell'URL
    // .get('id'): prende il valore del parametro 'id' (esempio: /product/123 → id=123)
    // Number(): converte il valore da stringa a numero (se id fosse "123", diventa 123)
  }
  //carichhiamo i dettagli del prodotto attraverso la chimata api
  productDetails(): void {
    // Definizione dell'URL base dell'API
    // Questo URL rappresenta il punto di accesso all'API per recuperare i dettagli dei prodotti.
    const apiUrl = 'https://dummyjson.com/products';

    // Verifica che l'ID del prodotto sia valido
    // Controlliamo che `this.productId` non sia `null`.
    // Se fosse null, significherebbe che qualcosa è andato storto (es. routing sbagliato).
    if (this.productId !== null) {
      // Effettuiamo una chiamata HTTP GET all'API
      // `this.http.get<any>()` invia una richiesta all'API per ottenere i dati del prodotto.
      // L'URL specifico viene creato aggiungendo l'ID del prodotto alla fine (`${apiUrl}/${this.productId}`).
      this.http.get<any>(`${apiUrl}/${this.productId}`).subscribe({
        // subscribe(): Serve per "ascoltare" la risposta API:
        // Se la chiamata ha successo, eseguiamo la funzione next.
        // Se c'è un errore, eseguiamo la funzione error.
        //////////////////////////////////////////////////////
        // Funzione che viene chiamata quando la chiamata API ha successo
        next: (data) => {
          console.log('Dettagli prodotto', data);
          // Salviamo i dettagli del prodotto nella variabile `this.productDetails`
          // Questo ci permette di usare i dati nel template per mostrarli all'utente.
          this.productDetails = data;
        },
        // Funzione che viene chiamata in caso di errore durante la chiamata API
        error: (err) => {
          console.error('Errore nel recupero prodotto', err);
          // Qui possiamo aggiungere ulteriori azioni per gestire l'errore,
          // ad esempio mostrare un messaggio di errore all'utente.
        },
      });
    } else {
      // Caso in cui l'ID del prodotto non è valido (es. è null)
      // Stampiamo un errore in console per aiutare con il debug.
      console.error('ID del prodotto non valido');
    }
  }
}
