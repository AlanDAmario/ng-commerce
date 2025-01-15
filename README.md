# E-Commerce Frontend

Benvenuto nel mio primo progetto **Angular**(18.2.12), un piccolo progetto nato per imparare come usare questo nuovo framework, in questo **E-Commerce** realizzato con **Angular** e **Bootstrap**, è pensato per offrire un’esperienza di acquisto semplice e accattivante. Potrai filtrare i prodotti, aggiungerli al carrello e visualizzare un alert di conferma, il tutto in un’interfaccia reattiva e moderna.

---

## Indice

1. [Descrizione](#descrizione)
2. [Prerequisiti](#prerequisiti)
3. [Installazione](#installazione)
4. [Avvio del Progetto](#avvio-del-progetto)
5. [Funzionalità Principali](#funzionalità-principali)
6. [Tecnologie Utilizzate](#tecnologie-utilizzate)
7. [Possibili Miglioramenti](#possibili-miglioramenti)
8. [Contatti](#contatti)

---

## Descrizione

Questo **E-Commerce Frontend** consente di:

- Visualizzare un **elenco di prodotti** con immagini, prezzi, sconti, rating e disponibilità in magazzino, presi da un **Api**.
- **Filtrare** i prodotti in base al prezzo grazie a uno **slider** e cercare i prodotti per nome grazie alla **barra di ricerca**.
- **Aggiungere** prodotti al carrello con pulsante _Add to Cart_ e alert di conferma.
- **Paginarne** la visualizzazione tramite pulsanti “Previous” e “Next”, che diventa reattiva in base al filtro del prezzo aumentando le pagine o diminuendo in base al prezzo scelto.
-

Il tutto in un layout **responsive** grazie a **Bootstrap**, con stili personalizzati scritti in **SCSS/CSS**.

---

## Prerequisiti

- **Node.js** (versione >= 14 raccomandata)
- **Angular CLI** (versione >= 13 raccomandata)
- **NPM** (o **Yarn**, se preferisci)

Verifica i prerequisiti con:

```bash
node -v
npm -v
ng version
```

---

## Installazione

Segui questi passaggi per installare il progetto localmente:

1. **Clona il repository:** Apri il terminale e digita:

```bash
git clone https://github.com/AlanDAmario/my-angular-app
cd my-angular-app
npm install
```

---

## Avvio del Progetto

Una volta completata l'installazione, segui questi passaggi per avviare il progetto:

1. **Avvia il server di sviluppo Angular:**  
Apri il terminale nella directory del progetto e digita:

```bash
ng serve
```

E cliccare (tenendo ctrl e tasto sinistro del mouse) sul proprio local host, che sarà simile a:
```bash
http://localhost:4200
```

---

## Funzionalità Principali

L'applicazione offre una serie di funzionalità chiave per garantire un'esperienza di acquisto completa ed intuitiva:

1. **Visualizzazione Prodotti**  
   - Elenco dei prodotti disponibili con immagini, titoli, descrizioni e prezzi.
   - Visualizzazione dei dettagli di ciascun prodotto, incluso rating, recensioni e disponibilità in magazzino.

2. **Carrello Interattivo**  
   - Aggiungi prodotti al carrello con un semplice click.
   - Modifica la quantità direttamente nel carrello, con controllo dello stock massimo disponibile.
   - Visualizzazione del totale degli articoli e del prezzo complessivo.

3. **Responsive Design**  
   - Interfaccia ottimizzata per dispositivi mobili, tablet e desktop grazie all'utilizzo di **Bootstrap**.
   - Funzionalità adattive come tabelle responsive e layout semplificati su schermi più piccoli.

4. **Filtri Prodotti**  
   - Slider per filtrare i prodotti in base al prezzo.
   - Ricerca in tempo reale con suggerimenti automatici.

5. **Checkout e Pagamento Simulato**  
   - Modale accattivante per il pagamento con messaggio di conferma personalizzato.
   - Funzione di svuotamento del carrello post-pagamento.

6. **Navigazione Intuitiva**  
   - Barra di navigazione con menu a tendina per dispositivi mobili.
   - Collegamenti diretti a sezioni principali come Home, Prodotti e Carrello.

7. **Carosello Prodotti**  
   - Visualizzazione dinamica dei prodotti in evidenza con immagini e descrizioni.
   - Controlli per navigare tra le slide.

8. **Gestione dello Stock**  
   - Indicazione dinamica dello stato del prodotto: In Stock, Low Stock o Out of Stock.
   

---


## Tecnologie Utilizzate

Questo progetto sfrutta un insieme di tecnologie moderne per garantire performance, manutenibilità e un'esperienza utente di alta qualità:

### Frontend
- **Angular**: Framework per la costruzione di Single Page Applications (SPA) con architettura modulare e reattiva.
- **Bootstrap**: Framework CSS per un design responsive e componenti predefiniti, utilizzato per creare layout e stili moderni.
- **SCSS/CSS**: Per personalizzazioni avanzate dello stile.

### Programmazione e Tools
- **TypeScript**: Linguaggio con tipizzazione statica che estende JavaScript, utilizzato per garantire un codice più robusto e leggibile.
- **JavaScript**: Linguaggio di scripting per funzionalità avanzate e interattività.
- **HTML5**: Per la struttura semantica del progetto.

### Backend simulato
- **DummyJSON API**: API gratuita utilizzata per ottenere dati relativi ai prodotti, categorie, recensioni e carrelli. Offre un backend simulato perfetto per lo sviluppo di progetti demo.

### Build e Gestione del Progetto
- **Node.js**: Ambiente runtime JavaScript per eseguire il codice lato server.
- **NPM**: Gestore di pacchetti utilizzato per installare e gestire le dipendenze del progetto.
- **Angular CLI**: Interfaccia a riga di comando per generare, sviluppare e gestire il progetto Angular.

### Debugging e Testing
- **Bootstrap Modals**: Per la gestione interattiva di finestre di dialogo come il pagamento e le immagini dei prodotti.
- **Browser DevTools**: Strumenti per il debugging, l'analisi delle prestazioni e il design responsivo.

### Controllo di Versione
- **Git**: Sistema di controllo di versione utilizzato per gestire lo sviluppo e le modifiche al codice.
- **GitHub**: Piattaforma per la condivisione e il versioning del progetto.

### Responsive Design
- **Media Queries**: Utilizzate per ottimizzare il layout per dispositivi mobili, tablet e desktop.
- **Flexbox**: Per una disposizione dinamica e flessibile degli elementi.

---



