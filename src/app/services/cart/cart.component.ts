import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartProduct } from '../../models/product';
import { Modal } from 'bootstrap';

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

  /**
   * Rimuove tutte le quantità di un prodotto dal carrello.
   * @param item Il prodotto da rimuovere completamente.
   */
  removeAllFromCart(item: CartProduct): void {
    this.cartService.removeAllFromCart(item); // Utilizza il metodo del servizio per rimuovere completamente il prodotto
    this.updateCartSummary(); // Aggiorna i totali
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

  /**
   * Simula il processo di pagamento.
   */
  confirmPayment(): void {
    // Recupera l'elemento della modale
    const modalElement = document.getElementById('paymentModal');
    if (modalElement) {
      // Usa il modulo Modal importato per gestire la modale
      const modalInstance =
        Modal.getInstance(modalElement) || new Modal(modalElement);
      modalInstance.hide(); // Chiude la modale programmaticamente
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove(); // Rimuove manualmente il backdrop residuo
      }
    }

    // Simula il processo di pagamento con un ritardo
    setTimeout(() => {
      // Aggiunge una notifica personalizzata alla pagina
      const alertContainer = document.getElementById('alert-container');
      if (alertContainer) {
        // Crea dinamicamente un elemento HTML per l'alert
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show'; // Classi Bootstrap per lo stile
        alert.role = 'alert'; // Ruolo ARIA per accessibilità
        alert.innerHTML = `
        <strong>Payment Successful!</strong> Thank you for your purchase.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;

        // Aggiunge l'alert al contenitore specificato
        alertContainer.appendChild(alert);

        // Rimuove automaticamente l'alert dopo 5 secondi
        setTimeout(() => {
          alert.remove();
        }, 5000);
      }

      // Svuota il carrello dopo il pagamento
      this.clearCart();
    }, 1000); // Ritardo simulato di 1 secondo
  }
}
