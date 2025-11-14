# 🧪 Guida Completa per Testare l'Applicazione

## Metodo 1: Test Locale (Raccomandato)

### Passo 1: Prepara il Tuo Computer

```bash
# Verifica di avere Node.js installato
node --version
# Deve mostrare v18.0.0 o superiore

# Se non hai Node.js, scaricalo da:
# https://nodejs.org/
```

### Passo 2: Clona e Installa

```bash
# Clona il repository
git clone https://github.com/killerduck93/FlexLiving.git
cd FlexLiving

# Installa le dipendenze
npm install
```

### Passo 3: Avvia il Server

```bash
# Nel terminale, dalla cartella del progetto
npm run dev
```

Vedrai qualcosa tipo:

```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### Passo 4: Apri il Browser

1. Apri il browser
2. Vai su: **http://localhost:3000**
3. Dovresti vedere l'applicazione!

---

## 🎯 Test Checklist - Cosa Verificare

### Test 1: Pagina Carica Correttamente ✅

- [ ] La pagina si carica senza errori
- [ ] Vedi l'header "Flex Living Reviews"
- [ ] Vedi 3 card con statistiche (Total Reviews, Avg Rating, Properties)
- [ ] Vedi i bottoni "Manager Dashboard" e "Public View"

### Test 2: Statistiche Corrette ✅

Verifica questi numeri (possono variare leggermente):

- [ ] Total Reviews: **10**
- [ ] Avg Rating: circa **8.5-8.8**
- [ ] Properties: **3-4** (Shoreditch Heights, Camden Lock, Notting Hill Gate, Spitalfields)

### Test 3: Manager Dashboard Funziona ✅

1. Clicca su "Manager Dashboard" (se non sei già lì)
2. Verifica che vedi:
   - [ ] Statistiche in alto
   - [ ] Barra filtri
   - [ ] Barra di ricerca
   - [ ] Lista di recensioni

### Test 4: Filtri Funzionano ✅

#### Test Property Filter

1. Clicca sul dropdown "Property" nei filtri
2. Seleziona una proprietà (es. "2B N1 A - 29 Shoreditch Heights")
3. Verifica: vedi solo le recensioni per quella proprietà
4. Rimetti su "All Properties"

#### Test Channel Filter

1. Clicca sul dropdown "Channel"
2. Seleziona "airbnb"
3. Verifica: vedi solo recensioni da Airbnb
4. Seleziona "booking.com"
5. Verifica: vedi solo recensioni da Booking.com

#### Test Rating Filter

1. Clicca sul dropdown "Rating"
2. Seleziona "5 Stars"
3. Verifica: vedi solo recensioni con rating 5
4. Prova con altri rating

#### Test Category Filter

1. Clicca sul dropdown "Category"
2. Seleziona una categoria (es. "cleanliness")
3. Verifica: vedi solo recensioni con quella categoria

### Test 5: Sort Funziona ✅

1. Clicca sui bottoni di sort (Date, Rating, Property)
2. Verifica che le recensioni si riordinano
3. Clicca di nuovo per invertire l'ordine

### Test 6: Search Funziona ✅

1. Nella barra di ricerca, digita un nome (es. "Sarah")
2. Verifica: vedi solo recensioni che contengono "Sarah"
3. Prova con altri termini (es. "Shoreditch", "amazing")

### Test 7: Toggle Display Funziona ✅

1. Trova una recensione con bottone "Display" (verde) o "Hide" (rosso)
2. Clicca sul bottone
3. Verifica: il bottone cambia colore e testo
4. Il bordo della card cambia (verde se displayed, grigio se hidden)

### Test 8: Public View ✅

1. Clicca sul bottone "Public View" in alto a destra
2. Verifica che vedi:
   - [ ] Banner con "Flex Living Properties"
   - [ ] Sezione "About"
   - [ ] Sezione "Amenities" con 6 icone
   - [ ] Sezione "Guest Reviews"
3. Conta le recensioni: devono essere solo quelle con "Display" attivo
4. Verifica che ogni recensione mostra:
   - [ ] Avatar con iniziale del nome
   - [ ] Nome ospite
   - [ ] Data
   - [ ] Stelle gialle
   - [ ] Testo recensione
   - [ ] Nome della proprietà in basso

### Test 9: Property Page ✅

1. Vai su: `http://localhost:3000/property/2B-N1-A-29-Shoreditch-Heights`
2. Verifica che vedi:
   - [ ] Header con nome proprietà
   - [ ] Immagine placeholder
   - [ ] Sezione "About this property"
   - [ ] Sezione "Amenities"
   - [ ] Sezione "Guest Reviews" con solo recensioni approvate

### Test 10: API Endpoints ✅

Apri queste URL nel browser:

1. **http://localhost:3000/api/reviews/hostaway**
   - Verifica: vedi JSON con `success: true` e array `data` con recensioni
   - Ogni recensione ha: id, rating, publicReview, guestName, ecc.

2. **http://localhost:3000/api/reviews/public**
   - Verifica: vedi solo le recensioni con `displayOnWebsite: true`

3. **http://localhost:3000/api/reviews/stats**
   - Verifica: vedi statistiche aggregate

### Test 11: Responsive Design ✅

1. Riduci la larghezza del browser (o usa DevTools mobile view)
2. Verifica che:
   - [ ] Le card si dispongono in colonna su mobile
   - [ ] I filtri si impilano verticalmente
   - [ ] Le recensioni rimangono leggibili
   - [ ] Nella Public View, le recensioni vanno in 1 colonna

---

## 🐛 Problemi Comuni e Soluzioni

### Errore: "Module not found: lucide-react"

```bash
npm install lucide-react
```

### Errore: "Cannot find module @/components/..."

- Verifica di aver installato tutte le dipendenze: `npm install`
- Verifica che la struttura delle cartelle sia corretta

### Errore: "Cannot find module @/lib/..."

- Verifica che la cartella `lib/` esista nella root
- Verifica che i file TypeScript siano corretti

### La pagina è bianca

1. Apri la Console del browser (F12)
2. Guarda se ci sono errori rossi
3. Verifica che tutti i file siano stati copiati correttamente
4. Controlla il terminale dove hai lanciato `npm run dev` per errori

### I filtri non funzionano

- Controlla che il file `FilterBar.tsx` sia stato copiato correttamente
- Riavvia il server: Ctrl+C nel terminale, poi `npm run dev`
- Verifica la console del browser per errori JavaScript

### Il toggle display non funziona

- Verifica che l'API endpoint `/api/reviews/[id]/display` funzioni
- Controlla la console del browser per errori di fetch
- Verifica la Network tab (F12 → Network) per vedere le chiamate API

---

## 📱 Test su Mobile (Opzionale)

### Con il telefono sulla stessa rete WiFi:

1. Nel terminale, trova l'IP del tuo computer:
   - Windows: `ipconfig` → cerca "IPv4 Address"
   - Mac/Linux: `ifconfig` o `ip addr`

2. Sul telefono, apri il browser

3. Vai su: `http://[TUO-IP]:3000`
   - Esempio: `http://192.168.1.10:3000`

4. Verifica che l'app funzioni correttamente su mobile

---

## ✅ Checklist Finale Prima della Submission

- [ ] L'app si avvia senza errori (`npm run dev`)
- [ ] Tutti i 11 test sopra funzionano
- [ ] Le statistiche sono corrette
- [ ] I filtri cambiano le recensioni visualizzate
- [ ] Il toggle display funziona
- [ ] La Public View mostra solo recensioni approvate
- [ ] Gli API endpoints restituiscono JSON valido
- [ ] Design responsive su mobile
- [ ] Nessun errore nella console del browser
- [ ] Nessun errore nel terminale

---

## 🚀 Pronto per il Deploy su Vercel

Una volta verificato che tutto funziona in locale, sei pronto per:

### 1. Push su GitHub (già fatto!)

Il codice è già su GitHub: https://github.com/killerduck93/FlexLiving

### 2. Deploy su Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Clicca "Sign Up" o "Log In" (puoi usare GitHub)
3. Clicca "New Project"
4. Importa il repository `killerduck93/FlexLiving`
5. Vercel rileverà automaticamente Next.js
6. Clicca "Deploy"
7. Attendi 2-3 minuti per il deploy

### 3. Testa l'URL di Vercel

1. Una volta completato, Vercel ti darà un URL tipo: `https://flex-living.vercel.app`
2. Ripeti tutti i test sopra sull'URL live
3. Verifica che funzioni da mobile
4. Condividi l'URL nella submission

### 4. Aggiungi Environment Variables (Opzionale)

Se vuoi usare le API reali in futuro:

1. Vai su Project Settings → Environment Variables
2. Aggiungi:
   - `HOSTAWAY_API_KEY` = (la tua chiave)
   - `HOSTAWAY_ACCOUNT_ID` = (il tuo account ID)

---

## 💡 Suggerimento Pro

Registra un video di 2-3 minuti mentre fai questi test! Mostra:

1. Dashboard con filtri
2. Toggle di una recensione
3. Public View
4. Responsive su mobile

Aggiungi il link al video nella tua submission - farà un'ottima impressione!

---

## 📞 Debug Veloce

Se qualcosa non funziona, controlla:

1. **Console del Browser** (F12 → Console)
   - Cerca errori rossi
   - Verifica che le chiamate API funzionino

2. **Terminale dove hai lanciato npm run dev**
   - Cerca errori di compilazione
   - Verifica che il server sia in esecuzione

3. **Network tab** (F12 → Network)
   - Verifica che le chiamate API funzionino
   - Controlla gli status code (dovrebbero essere 200)

4. **React DevTools** (estensione Chrome)
   - Controlla lo state dei componenti
   - Verifica che i dati siano caricati correttamente

---

## 🎉 Sei Pronto!

Se tutti i test passano, l'applicazione è pronta per la submission!

**Repository GitHub:** https://github.com/killerduck93/FlexLiving

**Prossimi passi:**
1. ✅ Codice completato e pushato
2. ⏳ Deploy su Vercel
3. ⏳ Test su URL live
4. ⏳ Submission finale

Buona fortuna con l'assessment! 🚀

