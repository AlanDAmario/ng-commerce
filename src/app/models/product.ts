//Product: Rappresenta i prodotti disponibili nel negozio.
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}
//CartProduct: Estende Product aggiungendo la proprietà quantity per gestire la quantità di ciascun prodotto nel carrello.
export interface CartProduct extends Product {
  quantity: number;
}
