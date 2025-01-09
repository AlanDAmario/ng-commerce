import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartProduct } from '../../models/product'; 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartProduct[] = []; // Array per memorizzare i prodotti nel carrello
  totalItems: number = 0; // Numero totale di articoli
  totalPrice: number = 0; // Prezzo totale degli articoli

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Sottoscrizione al comportamento del carrello tramite il servizio
    this.cartService.getCart().subscribe((cart) => {
      this.cartItems = cart; // Aggiorna i prodotti nel carrello
      this.updateCartSummary(); // Aggiorna i totali
    });
  }

  /**
   * Incrementa la quantità di un prodotto nel carrello.
   * @param item Il prodotto da modificare.
   */
  increaseQuantity(item: CartProduct): void {
    this.cartService.addToCart(item); // Utilizza il metodo del servizio per aumentare la quantità
    this.updateCartSummary(); // Aggiorna i totali
  }

  /**
   * Decrementa la quantità di un prodotto nel carrello.
   * @param item Il prodotto da modificare.
   */
  decreaseQuantity(item: CartProduct): void {
    this.cartService.removeFromCart(item); // Utilizza il metodo del servizio per diminuire la quantità
    this.updateCartSummary(); // Aggiorna i totali
  }

  /**
   * Rimuove completamente un prodotto dal carrello.
   * @param item Il prodotto da rimuovere.
   */
  removeFromCart(item: CartProduct): void {
    this.cartService.removeFromCart(item); // Rimuove l'oggetto dal carrello
    this.updateCartSummary(); // Aggiorna i totali
  }
  removeAllFromCart(item: CartProduct): void {
    // Usa il metodo removeFromCart del servizio per rimuovere completamente il prodotto
    this.cartService.removeAllFromCart(item);
  }
  /**
   * Svuota completamente il carrello.
   */
  clearCart(): void {
    this.cartService.clearAll(); // Utilizza il servizio per svuotare il carrello
    this.updateCartSummary(); // Aggiorna i totali
  }

  /**
   * Calcola e aggiorna il numero totale di articoli e il prezzo totale.
   */
  private updateCartSummary(): void {
    this.totalItems = this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }
}
