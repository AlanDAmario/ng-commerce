import { Component } from '@angular/core';

// Definiamo l'interfaccia per la tipizzazione dei prodotti
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

//interfaccia carrello
interface CartProduct extends Product {
  quantity: number;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent {
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

  ////////////////////////////////////////////////////////////////////
  //Carrello
  cart: CartProduct[] = [];
  //aggiungiamo un item al carrello
  addToCart(product: Product): void {
    const existingProduct = this.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  //rimuovi item dal carrello
  removeFromCart(product: CartProduct): void {
    const existingProductCart = this.cart.find(
      (item) => item.id === product.id
    );
    if (existingProductCart) {
      //se la quantità è maggiore di uno
      if (existingProductCart.quantity > 1) {
        existingProductCart.quantity--;
      } else {
        //se l a quantità è 1
        const indexCart = this.cart.findIndex((item) => item.id === product.id);
        if (indexCart !== -1) {
          this.cart.splice(indexCart, 1);
        }
      }
    }
  }

  getTotal(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
