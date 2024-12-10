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
  //il parametro product è un oggetto che rappresenta il prodotto che l'utente vuole aggiungere, Product è il modello da seguire (id,price, ecc)
  addToCart(product: Product): void {
    // cerchiamo se il prodotto esiste già nel carrello
    const existingProduct = this.cart.find((item) => item.id === product.id);
    // se il prodotto selezionato è già presente allora aumentiamo il numero
    if (existingProduct) {
      existingProduct.quantity++;
      //se il prodotto non è presente viene aggiunto
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.cartSubject.next(this.cart)
  }
  //metodo per rimuovere un item dal carrello
  removeFromCart(product: Product): void {
    const removeExistingProduct = this.cart.find(
      (item) => item.id === product.id
    );
    if (removeExistingProduct) {
      //se la quantità è maggiore di 1
      if (removeExistingProduct.quantity > 1) {
        removeExistingProduct.quantity--;
        //se la quantity del prodotto è 1, rimuoviamo il prodotto dal carrello interamente
        //usiamo il metodo filter() per creare un nuovo array che contiene tutti gli articoli tranne quello che stiamo cercando di rimuovere.
      } else {
        this.cart = this.cart.filter((item) => item.id !== product.id);
      }
      this.cartSubject.next(this.cart)
    }
  }
}
