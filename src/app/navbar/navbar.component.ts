import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/api/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Correzione typo in "styleUrl"
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0; // Contatore degli articoli nel carrello
  searchTerm: string = ''; // Testo digitato dall'utente
  suggestedProducts: Product[] = []; // Prodotti suggeriti
  allProducts: Product[] = []; // Tutti i prodotti disponibili
  isHoveredHome = false; // Hover stato per Home
  isHoveredShop = false; // Hover stato per Shop
  isHoveredCart = false; // Hover stato per Cart
  isNavbarCollapsed: boolean = true; // Stato del menu (aperto/chiuso)

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router // Servizio per navigare tra le pagine
  ) {}

  ngOnInit(): void {
    // Sottoscrizione agli aggiornamenti del carrello
    this.cartService.getCart().subscribe((cart) => {
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    });

    // Caricamento di tutti i prodotti all'inizializzazione
    this.productService.getProducts().subscribe((products) => {
      this.allProducts = products;
    });
  }

  // Metodo per filtrare i suggerimenti nella barra di ricerca
  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.suggestedProducts = this.allProducts.filter((product) =>
      product.title.toLowerCase().includes(term)
    );
  }

  // Metodo per selezionare un prodotto dai suggerimenti
  onSelectProduct(product: Product): void {
    this.router.navigate(['/product', product.id]);
    this.searchTerm = ''; // Reset della barra di ricerca
    this.suggestedProducts = []; // Reset dei suggerimenti
    this.closeNavbar(); // Chiudi la navbar dopo la selezione
  }

  // Metodo per gestire lo stato della navbar (toggle)
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  // Metodo per chiudere la navbar
  closeNavbar(): void {
    this.isNavbarCollapsed = true;
    const navbarContent = document.getElementById('navbarContent');
    if (navbarContent) {
      navbarContent.classList.remove('show');
    }
  }

  // Hover stato per Home
  onHoverHome(): void {
    this.isHoveredHome = true;
  }
  onHoverOutHome(): void {
    this.isHoveredHome = false;
  }

  // Hover stato per Shop
  onHoverShop(): void {
    this.isHoveredShop = true;
  }
  onHoverOutShop(): void {
    this.isHoveredShop = false;
  }

  // Hover stato per Cart
  onHoverCart(): void {
    this.isHoveredCart = true;
  }
  onHoverOutCart(): void {
    this.isHoveredCart = false;
  }

  // Metodo per chiudere la navbar quando un link viene cliccato
  onNavLinkClick(): void {
    this.closeNavbar();
  }
}
