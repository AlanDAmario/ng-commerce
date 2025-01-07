import { Component, OnInit } from '@angular/core';
import { Product, CartProduct } from '../models/product';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/api/product.service';

// Il decoratore indica che questa è una classe di tipo componente
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  // Array per memorizzare i prodotti da visualizzare nel componente
  products: Product[] = [];
  // Array per memorizzare i prodotti filtrati (inizialmente uguale a products)
  filteredProducts: Product[] = [];
  // Filtri per la selezione di un range di prezzo
  minPrice: number = 0;
  maxPrice: number = 1200;
  // Parametri per l'impaginazione
  productsForPage: number = 6; // Numero di prodotti per pagina
  currentPage: number = 1; // Pagina attuale
  totalPages: number = 0; // Numero totale di pagine, sarà calcolato dinamicamente
  totalProducts: number = 0; // Numero totale di prodotti (ottenuto dall'API)
  pages: number[] = []; // Array per memorizzare i numeri di pagina
  // Contatore per il numero di articoli nel carrello
  cartItemCounter: number = 0;

  // Costruttore per l'iniezione delle dipendenze
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Carichiamo i prodotti al caricamento del componente
    this.loadProducts(this.productsForPage, this.currentPage);

    // Abbonamento al carrello per tenere traccia del numero di articoli nel carrello
    this.cartService.getCart().subscribe(() => {
      // Salviamo il numero totale di prodotti nel carrello
      this.cartItemCounter = this.cartService.getTotalProduct();
    });
  }

  ///////////////////////////////////////////
  // Metodo per caricare i prodotti con impaginazione //
  ///////////////////////////////////////////

  /**
   * Metodo per caricare i prodotti dalla DummyJSON API con paginazione lato server.
   * @param limit Numero di prodotti per pagina.
   * @param page Numero della pagina corrente.
   */
  loadProducts(limit: number, page: number): void {
    this.productService.paginateProducts(limit, page).subscribe((response) => {
      this.products = response; // Prodotti per la pagina corrente
      this.filteredProducts = response; // Inizialmente non applichiamo filtri

      // Otteniamo il numero totale di prodotti dall'API
      this.productService.getProducts().subscribe((allProducts) => {
        this.totalProducts = allProducts.length; // Numero totale di prodotti
        this.totalPages = Math.ceil(this.totalProducts / limit); // Calcola il numero di pagine
        this.updatePages(); // Aggiorniamo l'array delle pagine
      });
    });
  }

  /**
   * Metodo per aggiornare l'array delle pagine.
   */
  updatePages(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ///////////////////////////////////////////
  // Funzioni per navigare tra le pagine //
  ///////////////////////////////////////////

  /**
   * Metodo per cambiare pagina.
   * @param newPage Numero della nuova pagina.
   */
  changePage(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage; // Impostiamo la nuova pagina
      this.loadProducts(this.productsForPage, this.currentPage); // Ricarichiamo i prodotti
    }
  }

  /**
   * Metodo per navigare alla pagina successiva.
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  /**
   * Metodo per tornare alla pagina precedente.
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  ///////////////////////////////////////////
  // Metodo per filtrare i prodotti per prezzo //
  ///////////////////////////////////////////

  /**
   * Metodo per applicare un filtro per il range di prezzo.
   */
  applyFilter(): void {
    this.filteredProducts = this.products.filter(
      (product) =>
        product.price >= this.minPrice && product.price <= this.maxPrice
    );
  }

  ///////////////////////////////////////////
  // Metodi per gestire il carrello //
  ///////////////////////////////////////////

  /**
   * Aggiungere un prodotto al carrello.
   * @param product Prodotto da aggiungere.
   */
  addToCart(product: Product): void {
    const cartProduct: CartProduct = { ...product, quantity: 1 }; // Creiamo un oggetto per il carrello
    this.cartService.addToCart(cartProduct); // Aggiungiamo al carrello
  }

  ///////////////////////////////////////////
  // Metodo per generare le icone delle stelle //
  ///////////////////////////////////////////

  /**
   * Metodo per determinare l'icona della stella in base al rating.
   * @param star Numero della stella corrente (1-5).
   * @param rate Valutazione del prodotto.
   * @returns Classe CSS per l'icona della stella.
   */
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
