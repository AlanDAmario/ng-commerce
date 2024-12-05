import { Injectable } from '@angular/core';
//product importato da models
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

//interfaccia per il carrello
export interface CartProduct extends Product{
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
}
