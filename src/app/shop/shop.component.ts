import { Component } from '@angular/core';

// Definiamo l'interfaccia per la tipizzazione dei prodotti
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
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
}
