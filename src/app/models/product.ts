// Product: Rappresenta i prodotti disponibili nel negozio.
export interface Product {
  id: number; // Identificativo univoco del prodotto
  title: string; // Titolo o nome del prodotto
  description: string; // Descrizione dettagliata del prodotto
  price: number; // Prezzo del prodotto
  category: string; // Categoria del prodotto
  image: string; // URL dell'immagine del prodotto
  rating: {
    // Oggetto che rappresenta la valutazione
    rate: number; // Media delle valutazioni
    count: number; // Numero di recensioni
  };
}

// CartProduct: Estende Product aggiungendo la proprietà quantity per gestire la quantità di ciascun prodotto nel carrello.
export interface CartProduct extends Product {
  quantity: number; // Quantità del prodotto nel carrello
  maxQuantity?: number; // Quantità massima disponibile per l'acquisto (opzionale)
}
