import { Component, OnInit } from '@angular/core';
import { Product, CartProduct } from '../models/product';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/api/product.service';
// Definiamo l'interfaccia per la tipizzazione dei prodotti

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  // array di oggetti vuota , che sarà la lista dei prodotti da visualizzare nel componente
  products: Product[] = [];
  // Lista dei prodotti filtrati (inizialmente uguale a tutti i prodotti)
  filteredProducts: Product[] = [...this.products];
  // Impostiamo i valori di default per i filtri
  minPrice: number = 0;
  maxPrice: number = 5000;
  // Valori di default per la impaginazione
  productsForPage: number = 12; // Numero di prodotti per pagina
  currentPage: number = 1; // Pagina attuale
  totalPages: number = 0; // Numero totale delle pagine, modificambile dinamicamente
  //variabile per memorizzare un nuovo contenuto ovvero il numero di prodotti all interno dell icona del carrello
  cartItemCounter: number = 0;
  ///////////////////////////////////METODI per filtrare//////////////////////////////////////////////////////////////////////
  // Funzione che applica il filtro per prezzo
  filterByPrice(min: number, max: number): Product[] {
    return this.products.filter(
      (product) => product.price >= min && product.price <= max
    );
  }
  // Funzione che applica il filtro
  applyFilter(): void {
    this.filteredProducts = this.filterByPrice(this.minPrice, this.maxPrice);
  }
  //istanze
  constructor(
    //aggiungendo le dipendenze attraverso la dependecy injections possiamo accedere a tutti i metodi definiti all interno di esse
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    ////////////////////////////////IMPAGINAZIONE E OTTENIMENTO PRODOTTI DALL API////////////////////////////////
    // Richiama il metodo loadProducts all'avvio del componente
    this.loadProducts(this.productsForPage, this.currentPage);
    ////////////////////////////////////////////
    //////// CARRELLO //////////
    ////////////////////////////////////////////

    //abbonamento al carrello quindi all observable per ottenere lo stato attuale
    //all interno di subscribe andremo a mettere come parametro cart, che non è altro che lo stato attuale del carrello
    this.cartService.getCart().subscribe((cart) => {
      //salviamo all interno di cartItemCounter il numero dei pezzi nel carrello
      this.cartItemCounter = this.cartService.getTotalProduct();
    });
  }
  //attraverso i metodi di cartService andiamo a richiamre il metodo addToCart
  //parametro cartProduct fa riferimento all interface con l aggiunta del quantity sennò darebbe errore
  addToCart(cartProduct: CartProduct): void {
    this.cartService.addToCart(cartProduct);
  }
  //attraverso i metodi di cartService andiamo a richiamre il metodo removeFromCart
  //utilizziamo CartProduct come modello per definire la struttura dei dati
  removeFromCart(cartProduct: CartProduct): void {
    this.cartService.removeFromCart(cartProduct);
  }
  ///////////////////////////////////////////
  //METODO PER RECUPERARE I PRODOTTI DALL API//
  ///////////////////////////////////////////

  loadProducts(limit: number, page: number): void {
    // Chiamiamo il metodo paginateProducts() del servizio ProductService
    // Passiamo i valori di "limit" e "page" come parametri per indicare
    // quanti prodotti recuperare e da quale pagina iniziare
    this.productService
      .paginateProducts(limit, page)
      // subscribe() serve per "abbonarsi" all'Observable restituito da paginateProducts()
      // In pratica, stiamo aspettando che l'API risponda con i dati
      .subscribe((productsApi) => {
        // Quando l'API risponde con i dati, li salviamo in "this.products"
        // In questo modo, i prodotti recuperati vengono salvati nell'array "products"
        this.products = productsApi;
        // Copiamo i dati anche nell'array "filteredProducts"
        // Questo array serve per applicare filtri sui prodotti
        this.filteredProducts = productsApi;

        // Calcoliamo il numero totale delle pagine disponibili.
        // Supponendo che "productsApi.length" rappresenti il numero totale di prodotti ricevuti,
        // dividiamo questo valore per il numero di prodotti per pagina ("limit") e arrotondiamo per eccesso.
        this.totalPages = Math.ceil(productsApi.length / this.productsForPage);
      });
  }
  //metodo per cambiare pagina
  changePage(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadProducts(this.productsForPage, this.currentPage);
    }
  }
  // Metodo per andare alla pagina successiva
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  // Metodo per tornare alla pagina precedente
  previousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }
}
