import { Component, OnInit } from '@angular/core';
import { Product, CartProduct } from '../models/product';
import { CartService } from '../cart/cart.service';

// Definiamo l'interfaccia per la tipizzazione dei prodotti

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  // 1. Dati fondamentali
  products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'Un laptop potente e leggero.',
      price: 1200,
    },
    {
      id: 2,
      name: 'Smartphone',
      description: 'Un telefono con fotocamera avanzata.',
      price: 800,
    },
    {
      id: 3,
      name: 'Cuffie',
      description: 'Cuffie con cancellazione del rumore.',
      price: 200,
    },
  ];

  // Impostiamo i valori di default per i filtri
  minPrice: number = 0;
  maxPrice: number = 1200; // Aggiunto anche il massimo (se vuoi gestirlo)
  // Lista dei prodotti filtrati (inizialmente uguale a tutti i prodotti)
  filteredProducts: Product[] = [...this.products];
  // 2. Metodi
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
  ////////////////////////////////// CARRELLO ////////////////////////////////////////////////////////////////
  //istanza di cartservice
  constructor(private cartService: CartService) {}

  //variabile per memorizzare un nuovo contenuto ovvero il numero di prodotti all interno dell icona del carrello
  cartItemCounter: number = 0;
  ngOnInit(): void {
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
  removeFromCart(cartProduct: CartProduct): void {
    this.cartService.removeFromCart(cartProduct);
  }
}
