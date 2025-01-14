import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart/cart.service';
import { Product, CartProduct } from '../models/product';
import { Modal } from 'bootstrap';

// Dichiarazione generica per Bootstrap
declare var bootstrap: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  //memorizziamo l id del prodotto
  productId: number | null = null;
  //memorizzaare i dettagli del prodotto
  productDetails: any = null;
  //memorizziamo tutti i prodotti nel carosello
  allProducts: Product[] = [];
  //immagine selezionata per il modal
  selectedImage: string | null = null;
  private routeSub: Subscription | null = null; // Sottoscrizione per monitorare i cambiamenti nell'URL
  modalInstance: any = null; // Variabile per l'istanza del modal
  //innittiamo nelle Activatedroute come dipendeza, consentendo di accedere ai dati di routing
  constructor(
    private route: ActivatedRoute, // per gestire i parametri dell url
    private http: HttpClient, // per chiamare l api
    private cartService: CartService
  ) {}
  //al momento dell inizializzazione del componente recuperiamo l id dall url
  ngOnInit(): void {
    // Metodo eseguito durante l'inizializzazione del componente

    // Sottoscrizione per monitorare i cambiamenti del parametro 'id' nell'URL
    this.routeSub = this.route.paramMap.subscribe((params) => {
      // `params`: contiene tutti i parametri dell'URL
      const productId = params.get('id'); // Ottieni il valore del parametro 'id' (esempio: /product/123 → id=123)

      if (productId) {
        // Se l'ID del prodotto è valido (non null o undefined)
        this.productDetailsApi(productId); // Carica i dettagli del prodotto specifico
      }
    });

    // Carica l'elenco completo dei prodotti per il carosello
    this.loadAllProducts();
  }

  ngOnDestroy(): void {
    // Metodo chiamato automaticamente quando il componente viene distrutto

    // Annulla la sottoscrizione per evitare memory leak
    this.routeSub?.unsubscribe(); // Verifica che la sottoscrizione esista prima di annullarla
  }

  /**
   * Effettua una chiamata API per caricare i dettagli di un prodotto specifico
   * @param productId L'ID del prodotto da caricare
   */
  productDetailsApi(productId: string): void {
    const apiUrl = `https://dummyjson.com/products/${productId}`; // Costruisce l'URL per accedere ai dettagli del prodotto

    // Esegue una richiesta HTTP GET per ottenere i dettagli del prodotto
    this.http.get<Product>(apiUrl).subscribe({
      next: (data) => {
        // Quando la chiamata API ha successo
        this.productDetails = data; // Salva i dettagli del prodotto nella proprietà `productDetails`
      },
      error: (err) => {
        // Se la chiamata API fallisce, stampa un messaggio di errore
        console.error('Errore nel caricamento del prodotto:', err);
      },
    });
  }

  /**
   * Effettua una chiamata API per ottenere l'elenco completo dei prodotti
   */
  loadAllProducts(): void {
    const apiUrl = 'https://dummyjson.com/products'; // URL per ottenere l'elenco di tutti i prodotti

    // Esegue una richiesta HTTP GET per ottenere i dati
    this.http.get<{ products: Product[] }>(apiUrl).subscribe({
      next: (data) => {
        // Quando la chiamata API ha successo
        this.allProducts = data.products; // Salva l'elenco dei prodotti nella proprietà `allProducts`
      },
      error: (err) => {
        // Se la chiamata API fallisce, stampa un messaggio di errore
        console.error('Errore nel caricamento dei prodotti:', err);
      },
    });
  }

  /**
   * Aggiungere un prodotto al carrello.
   * @param product Prodotto da aggiungere.
   */
  addToCart(product: Product): void {
    const cartProduct: CartProduct = { ...product, quantity: 1 }; // Creiamo un oggetto per il carrello
    this.cartService.addToCart(cartProduct); // Aggiungiamo al carrello
  }
  /**
   * Mostra il modal per visualizzare un'immagine selezionata e gestisce i pulsanti Avanti/Indietro
   * @param image URL dell'immagine da mostrare nel modal
   */
  openImageModal(image: string): void {
    this.selectedImage = image; // Imposta l'immagine selezionata

    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      if (!this.modalInstance) {
        // Se la modale non è stata ancora creata
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
      if (!this.modalInstance._isShown) {
        // Mostra la modale solo se non è già visibile
        this.modalInstance.show();
      }
    }
  }

  /**
   * Cambia l'immagine mostrata nel modal, andando alla successiva o precedente
   * @param direction Indica la direzione ('next' o 'prev')
   */
  changeModalImage(direction: 'next' | 'prev'): void {
    if (this.productDetails?.images) {
      const currentIndex = this.productDetails.images.indexOf(
        this.selectedImage || ''
      ); // Trova l'indice dell'immagine corrente

      if (direction === 'next') {
        // Calcola l'indice successivo, tornando all'inizio se si supera la lunghezza
        const nextIndex =
          (currentIndex + 1) % this.productDetails.images.length;
        this.selectedImage = this.productDetails.images[nextIndex];
      } else if (direction === 'prev') {
        // Calcola l'indice precedente, tornando alla fine se si va sotto zero
        const prevIndex =
          (currentIndex - 1 + this.productDetails.images.length) %
          this.productDetails.images.length;
        this.selectedImage = this.productDetails.images[prevIndex];
      }
    }
  }

  closeImageModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = null;
    }
  }

  ////////////////////////////////////////////////////////////////////////
  //stars icon
  getStarIcon(star: number, rate: number): string {
    const floorRate = Math.floor(rate); // Parte intera del rating
    const decimal = rate - floorRate; // Parte decimale del rating

    if (star <= floorRate) {
      return 'fas fa-star text-warning'; // Stella piena
    } else if (star === floorRate + 1 && decimal >= 0.5) {
      return 'fas fa-star-half-alt text-warning'; // Mezza stella
    } else {
      return 'far fa-star text-muted'; // Stella vuota
    }
  }
}
