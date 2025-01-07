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
  filteredProducts: Product[] = [...this.products];
  // Filtri per la selezione di un range di prezzo
  minPrice: number = 0;
  maxPrice: number = 1200;
  // Parametri per l'impaginazione
  productsForPage: number = 4; // Numero di prodotti per pagina
  currentPage: number = 1; // Pagina attuale
  totalPages: number = 0; // Numero totale di pagine, sarà calcolato dinamicamente
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
    this.cartService.getCart().subscribe((cart) => {
      // Salviamo il numero totale di prodotti nel carrello
      this.cartItemCounter = this.cartService.getTotalProduct();
    });
  }

  // Metodo per applicare il filtro per prezzo
  filterByPrice(min: number, max: number): Product[] {
    // Filtriamo i prodotti in base al prezzo minimo e massimo
    return this.products.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  // Funzione per applicare il filtro dei prodotti
  applyFilter(): void {
    // Applichiamo il filtro per il range di prezzo
    this.filteredProducts = this.filterByPrice(this.minPrice, this.maxPrice);
  }

  ///////////////////////////////////////////
  // Metodi per gestire il carrello (aggiunta e rimozione) //
  ///////////////////////////////////////////

  // Aggiungi un prodotto al carrello
  addToCart(product: Product): void {
    // Creiamo un oggetto CartProduct con una quantità di 1
    const cartProduct: CartProduct = { ...product, quantity: 1 };
    // Aggiungiamo il prodotto al carrello tramite il servizio
    this.cartService.addToCart(cartProduct);
  }

  // Rimuovi un prodotto dal carrello
  removeFromCart(cartProduct: CartProduct): void {
    // Rimuoviamo il prodotto dal carrello
    this.cartService.removeFromCart(cartProduct);
  }

  ///////////////////////////////////////////
  // Metodo per caricare i prodotti con impaginazione //
  ///////////////////////////////////////////

  loadProducts(limit: number, page: number): void {
    // Chiamiamo il metodo paginateProducts per ottenere i prodotti per la pagina corrente
    this.productService.paginateProducts(limit, page).subscribe((products) => {
      // Quando riceviamo i prodotti, li salviamo in this.products e this.filteredProducts
      this.products = products; // Prodotti per la pagina corrente
      this.filteredProducts = products; // Prodotti filtrati (in questo caso non ci sono filtri applicati inizialmente)

      // Calcoliamo il numero totale di prodotti (stiamo usando un valore statico, ma potrebbe essere dinamico se l'API lo supporta)
      const totalProducts: number = 20; // Questo valore dovrebbe venire dalla risposta dell'API se disponibile

      // Calcoliamo il numero totale di pagine in base al numero di prodotti per pagina
      this.totalPages = Math.ceil(totalProducts / limit);

      // Aggiorniamo l'array delle pagine
      this.updatePages();
    });
  }

  // Funzione per aggiornare l'array delle pagine (da 1 a totalPages)
  updatePages(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ///////////////////////////////////////////
  // Funzioni per navigare tra le pagine //
  ///////////////////////////////////////////

  // Cambia la pagina
  changePage(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage; // Impostiamo la nuova pagina
      this.loadProducts(this.productsForPage, this.currentPage); // Carichiamo i prodotti per la nuova pagina
    }
  }

  // Funzione per andare alla pagina successiva
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  // Funzione per tornare alla pagina precedente
  previousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }
}
