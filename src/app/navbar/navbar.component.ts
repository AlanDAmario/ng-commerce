import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/api/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  cartCount: number = 0; // Contatore degli articoli nel carrello
  searchTerm: string = ''; // Testo digitato dall'utente
  suggestedProducts: Product[] = []; // Prodotti suggeriti
  allProducts: Product[] = []; // Tutti i prodotti disponibili
  /////////////////////////////////
  /////////////////////////////////
  // Variabili per l'hover degli elementi
  isHoveredHome = false;
  isHoveredShop = false;
  isHoveredCart = false;
  isHoveredProfile = false;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router // Servizio per navigare tra le pagine
  ) {}
  ngOnInit(): void {
    // Sottoscriviti agli aggiornamenti del carrello
    this.cartService.getCart().subscribe((cart) => {
      // Calcola il numero totale di articoli nel carrello
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
    // Carichiamo tutti i prodotti all'avvio
    this.productService.getProducts().subscribe((products) => {
      this.allProducts = products;
    });
  }
  /**
   * Metodo chiamato ad ogni input nella barra di ricerca.
   */
  onSearch(): void {
    const term = this.searchTerm.toLowerCase(); // Converti a lowercase per confronto case-insensitive

    // Filtra i prodotti che contengono il termine di ricerca nel titolo
    this.suggestedProducts = this.allProducts.filter((product) =>
      product.title.toLowerCase().includes(term)
    );
    /**
     * Metodo chiamato quando l'utente seleziona un prodotto dalla lista suggerimenti.
     * @param product Prodotto selezionato
     */
  }
  /**
   * Metodo chiamato quando l'utente seleziona un prodotto dalla lista suggerimenti.
   * @param product Prodotto selezionato
   */
  onSelectProduct(product: Product): void {
    // Reindirizza alla pagina del prodotto selezionato
    this.router.navigate(['/product', product.id]);
    // Reset della barra di ricerca
    this.searchTerm = '';
    this.suggestedProducts = [];
  }

  //Hover home
  onHoverHome() {
    this.isHoveredHome = true;
  }

  onHoverOutHome() {
    this.isHoveredHome = false;
  }
  //Hover shop
  onHoverShop() {
    this.isHoveredShop = true;
  }
  onHoverOutShop() {
    this.isHoveredShop = false;
  }
  //Hover Cart
  onHoverCart() {
    this.isHoveredCart = true;
  }

  onHoverOutCart() {
    this.isHoveredCart = false;
  }
  //Hover Profile
  onHoveredProfile() {
    this.isHoveredProfile = true;
  }
  onHoverOutProfile() {
    this.isHoveredProfile = false;
  }
}
