import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  cartCount: number = 0; // Contatore degli articoli nel carrello

  // Variabili per l'hover degli elementi
  isHoveredHome = false;
  isHoveredShop = false;
  isHoveredCart = false;
  isHoveredProfile = false;
constructor(private cartService: CartService){}
  ngOnInit(): void {
    // Sottoscriviti agli aggiornamenti del carrello
    this.cartService.getCart().subscribe((cart) => {
      // Calcola il numero totale di articoli nel carrello
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
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
