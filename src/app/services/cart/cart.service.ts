import { Injectable } from '@angular/core';
//product importato da models
import { Product, CartProduct } from '../../models/product';
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
  //configurazione limiti delle quantità atytraverso un index signature
  private maxAddToCart: { [key: string]: number } = {
    laptop: 5,
    default: 10,
  };
  //metodo per ottenere il limite massimo per un prodotto
  private getMaxQuantity(productName: string): number {
    return (
      this.maxAddToCart[productName.toLowerCase()] ||
      this.maxAddToCart['default']
    );
  }
  //metodo per salvare il carrello nel localStorage
  private updateLocalStorage(): void {
    try {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } catch (error) {
      console.error(
        'Errore durante il salvataggio del carrello nel localStorage:',
        error
      );
    }
  }
  //local storage
  constructor() {
    //verifichiamo se il carrello esiste già
    try {
      const saveCart = localStorage.getItem('cart');

      if (saveCart) {
        //se il carrello esiste, lo decodifichiamo (usando JSON.parse()) per trasformarli da stringa JSON a un oggetto JavaScript.
        this.cart = JSON.parse(saveCart);
        //e lo ripristiniamo nel behaviorSubject
        this.cartSubject.next(this.cart);
      } else {
        //se il carrello non esiste, lo creiamo e lo ripristiniamo nel behaviorSubject
        this.cart = [];
        this.cartSubject.next(this.cart);
      }
    } catch (error) {
      //se ce un errore nel recupero dei dati gestiamo l errore
      console.error(
        'Errore durante il recupero del carrello dal localStorege',
        error
      );
      //anche con errore iniziallizza comunque un carrello vuoto
      this.cart = [];
      this.cartSubject.next(this.cart);
    }
  }

  //metodo per ottenere lo stato del carrello come un Observable
  getCart() {
    return this.cartSubject.asObservable();
  }
  //aggiungiamo un item al carrello
  //il parametro product è un oggetto che rappresenta il prodotto che l'utente vuole aggiungere, Product è il modello da seguire (id,price, ecc)
  addToCart(product: CartProduct): void {
    // cerchiamo se il prodotto esiste già nel carrello
    const existingProduct = this.cart.find((item) => item.id === product.id);

    // recuperiamo la quantità massima attraverso l indexsiganture creato sopra
    const maxQuantity = this.getMaxQuantity(product.title);

    if (existingProduct) {
      // se il prodotto esiste già nel carrello e la quantità è inferiore al maxQuantity, aumentiamo la quantità      existingProduct.quantity++;
      if (existingProduct.quantity < maxQuantity) {
        existingProduct.quantity++;
      } else {
        alert(
          `Hai raggiunto il limite massimo di ${maxQuantity} per questo articolo`
        );
      }
      //se il prodotto non esiste, viene aggiunto
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    //salviamo il carrello nel localStorage
    this.updateLocalStorage();
    // aggiorniamo l observable
    this.cartSubject.next(this.cart);
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
      this.updateLocalStorage();
      this.cartSubject.next(this.cart);
    }
  }

  //metodo per rimuovere tutti gli elementi presenti nel carrello
  clearAll(): void {
    this.cart = [];
    this.updateLocalStorage();
    this.cartSubject.next(this.cart);
  }

  //metodo per calcolare il numero totale di pezzi nel carrello
  getTotalProduct(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  //metodo per calcolare il prezzo totale nel carrello
  getTotalPrice(): number {
    return this.cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }
}
