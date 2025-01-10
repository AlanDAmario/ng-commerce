import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/api/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: Product[] = []; // Array per memorizzare i prodotti
  constructor(private router: Router,
    private productService: ProductService) { }
  ngOnInit(): void {
    // Ottieni i prodotti tramite il servizio
    this.productService.getProducts().subscribe((data) => {
      this.products = data; // Salva i prodotti nel componente
    });
  }
  // Navigate to the products page
  navigateToShop(): void {
    this.router.navigate(['/products']);
  }
}
