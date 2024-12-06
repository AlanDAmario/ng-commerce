import { Injectable } from '@angular/core';
//product importato da models
import { Product, CartProduct } from '../models/product';
//serve per tener traccia dello stato corrente del carrello
import { BehaviorSubject } from 'rxjs';

//questo dice ad Angular che il servizio CartService sarà disponibile globalmente nell'app, senza bisogno di dichiararlo esplicitamente in ogni modulo
@Injectable({
  providedIn: 'root',
})
export class CartService {
  //memorizziamo i prodotti nel carrelo partedno da un array vuoto
  private cart: CartProduct[] = [];
  //creiamo una nuova istanza di behaviorsubject, partenndo da un array vuoto inizializzato con this.cart
  private cartSubject = new BehaviorSubject<CartProduct[]>(this.cart);
  constructor() {}

  //metodo per ottenere lo stato del carrello come un Observable  getCart() {
  getCart() {
    return this.cartSubject.asObservable();
  }
  //aggiungiamo un item al carrello
}

