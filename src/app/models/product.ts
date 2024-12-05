// src/app/models/product.ts

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface CartProduct extends Product {
  quantity: number;
}
