// Product: Rappresenta i prodotti disponibili nel negozio.
export interface Product {
  id: number; // Identificativo univoco del prodotto
  title: string; // Titolo o nome del prodotto
  description: string; // Descrizione dettagliata del prodotto
  price: number; // Prezzo del prodotto
  category: string; // Categoria del prodotto (es. 'beauty', 'electronics')
  brand: string; // Marca del prodotto (es. 'Essence', 'Apple')
  thumbnail: string; // URL della miniatura (immagine di anteprima)
  images: string[]; // Array di URL con immagini aggiuntive del prodotto
  stock: number; // Quantità disponibile in magazzino
  discountPercentage: number; // Percentuale di sconto sul prodotto
  rating: number; // Valutazione media del prodotto (es. 4.94)

  // Proprietà opzionali per dati aggiuntivi
  weight?: number; // Peso del prodotto (opzionale)
  dimensions?: {
    width: number; // Larghezza del prodotto (opzionale)
    height: number; // Altezza del prodotto (opzionale)
    depth: number; // Profondità del prodotto (opzionale)
  };
  warrantyInformation?: string; // Informazioni sulla garanzia (opzionale)
  shippingInformation?: string; // Informazioni sulla spedizione (opzionale)
}

// CartProduct: Estende Product aggiungendo la proprietà quantity
// per gestire la quantità di ciascun prodotto nel carrello.
export interface CartProduct extends Product {
  quantity: number; // Quantità del prodotto nel carrello
  maxQuantity?: number; // Quantità massima acquistabile (opzionale, usata per gestire il magazzino)
}
