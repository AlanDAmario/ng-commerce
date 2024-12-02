import { Component } from '@angular/core';
import { max, min } from 'rxjs';

//Definiamo l interfaccia per la tipizzazione dei prodotti
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  // Lista di prodotti che rispetta l'interfaccia Product
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

  
  //filtrare i prodotti in base al prezzo
  filterByPrice(min: number, max: number): Product[] {
    return this.products.filter(
      (product) => product.price >= min && product.price <= max
    );
  }
}
