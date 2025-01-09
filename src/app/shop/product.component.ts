import { Component, OnInit } from '@angular/core';
import { Product, CartProduct } from '../models/product';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/api/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  // Tutti i prodotti caricati dall'API
  allProducts: Product[] = [];
  // Prodotti visibili nella pagina corrente (con filtri e paginazione)
  filteredProducts: Product[] = [];
  // Valori per il filtro di prezzo
  minPrice: number = 0;
  maxPrice: number = 0; // Impostato dinamicamente in base ai prezzi massimi dall'API
  // Paginazione
  productsForPage: number = 6; // Numero di prodotti per pagina
  currentPage: number = 1; // Pagina attuale
  totalPages: number = 0; // Numero totale di pagine
  pages: number[] = []; // Array per navigare tra le pagine
  // Contatore del numero di prodotti nel carrello
  cartItemCounter: number = 0;

  constructor(
    private cartService: CartService, // Servizio per gestire il carrello
    private productService: ProductService // Servizio per chiamare l'API dei prodotti
  ) {}

  ngOnInit(): void {
    // Caricamento iniziale di tutti i prodotti
    this.loadAllProducts();

    // Sottoscrizione per aggiornare il contatore dei prodotti nel carrello
    this.cartService.getCart().subscribe(() => {
      this.cartItemCounter = this.cartService.getTotalProduct();
    });
  }

  /**
   * Carica tutti i prodotti dall'API e configura i dati per il filtro e la paginazione.
   */
  loadAllProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.allProducts = products; // Salva tutti i prodotti
      this.maxPrice = Math.max(...products.map((p) => p.price)); // Determina il prezzo massimo
      this.applyFilter(); // Applica il filtro iniziale
      this.updatePagination(); // Calcola la paginazione
    });
  }

  /**
   * Aggiorna la lista dei prodotti filtrati in base al prezzo e aggiorna la paginazione.
   */
  applyFilter(): void {
    // Filtra i prodotti in base al range di prezzo
    const filtered = this.allProducts.filter(
      (product) =>
        product.price >= this.minPrice && product.price <= this.maxPrice
    );

    // Aggiorna la paginazione con i prodotti filtrati
    this.updatePagination(filtered);
  }

  /**
   * Calcola le pagine e aggiorna i prodotti visibili.
   * @param filteredProducts Prodotti filtrati per la paginazione.
   */
  updatePagination(filteredProducts: Product[] = this.allProducts): void {
    this.totalPages = Math.ceil(filteredProducts.length / this.productsForPage); // Numero totale di pagine
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Array delle pagine
    this.showPage(this.currentPage, filteredProducts); // Mostra i prodotti della pagina corrente
  }

  /**
   * Mostra i prodotti per una pagina specifica.
   * @param page Numero della pagina.
   * @param filteredProducts Prodotti filtrati per questa pagina.
   */
  showPage(page: number, filteredProducts: Product[]): void {
    const startIndex = (page - 1) * this.productsForPage; // Indice iniziale dei prodotti
    const endIndex = startIndex + this.productsForPage; // Indice finale
    this.filteredProducts = filteredProducts.slice(startIndex, endIndex); // Prodotti visibili
  }

  /**
   * Naviga a una pagina specifica.
   * @param newPage Numero della nuova pagina.
   */
  changePage(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage; // Aggiorna la pagina corrente
      this.showPage(this.currentPage, this.allProducts); // Mostra i prodotti della nuova pagina
    }
  }

  /**
   * Naviga alla pagina successiva.
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  /**
   * Torna alla pagina precedente.
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  /**
   * Aggiunge un prodotto al carrello.
   * @param product Prodotto da aggiungere.
   */
  addToCart(product: Product): void {
    const cartProduct: CartProduct = { ...product, quantity: 1 };
    this.cartService.addToCart(cartProduct); // Aggiungi al carrello
  }

  /**
   * Determina l'icona delle stelle in base alla valutazione.
   * @param star Numero della stella corrente (1-5).
   * @param rate Valutazione del prodotto.
   * @returns Classe CSS per l'icona.
   */
  getStarIcon(star: number, rate: number): string {
    const floorRate = Math.floor(rate);
    const decimal = rate - floorRate;

    if (star <= floorRate) {
      return 'fas fa-star text-warning'; // Stella piena
    } else if (star === floorRate + 1 && decimal >= 0.5) {
      return 'fas fa-star-half-alt text-warning'; // Mezza stella
    } else {
      return 'far fa-star text-muted'; // Stella vuota
    }
  }
}
