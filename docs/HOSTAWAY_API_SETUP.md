# 🔌 Hostaway API Setup Guide

## 📋 API Credentials

**Account ID:** `61148`  
**API Key:** `f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152`

---

## ✅ Verifica Formato Risposta API

L'applicazione gestisce correttamente il formato di risposta Hostaway:

```json
{
  "status": "success",
  "result": [
    {
      "id": 7453,
      "type": "host-to-guest",
      "status": "published",
      "rating": null,
      "publicReview": "Shane and family are wonderful! Would definitely host again :)",
      "reviewCategory": [
        {
          "category": "cleanliness",
          "rating": 10
        },
        {
          "category": "communication",
          "rating": 10
        },
        {
          "category": "respect_house_rules",
          "rating": 10
        }
      ],
      "submittedAt": "2020-08-21 22:45:14",
      "guestName": "Shane Finkelstein",
      "listingName": "2B N1 A - 29 Shoreditch Heights"
    }
  ]
}
```

### ✅ Gestione Dati

**Rating Null:**
- ✅ Gestito: Se `rating: null`, calcola automaticamente dalla media delle categorie
- ✅ Codice: `lib/reviewUtils.ts` - `normalizeReview()` (linee 22-28)

**Date Format:**
- ✅ Gestito: Parsing del formato `"2020-08-21 22:45:14"`
- ✅ Codice: `lib/reviewUtils.ts` - `normalizeReview()` (linee 34-47)

**Categorie:**
- ✅ Gestito: Normalizzazione nomi categorie (lowercase, trimmed)
- ✅ Codice: `lib/reviewUtils.ts` - `normalizeReview()` (linee 49-53)

**Channel Mancante:**
- ✅ Gestito: Default a `'hostaway'` se mancante
- ✅ Codice: `lib/reviewUtils.ts` - `normalizeReview()` (linea 32)

---

## 🔧 Configurazione Credenziali

### Opzione 1: Variabili d'Ambiente (Consigliato)

#### Local Development

Crea file `.env.local` nella root del progetto:

```bash
HOSTAWAY_API_KEY=f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152
HOSTAWAY_ACCOUNT_ID=61148
```

#### Vercel Deployment

1. Vai a Vercel Dashboard → Your Project → Settings → Environment Variables
2. Aggiungi:
   - **Key:** `HOSTAWAY_API_KEY`
   - **Value:** `f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152`
   - **Environment:** Production, Preview, Development
3. Aggiungi:
   - **Key:** `HOSTAWAY_ACCOUNT_ID`
   - **Value:** `61148`
   - **Environment:** Production, Preview, Development
4. Clicca "Save"
5. **Redeploy** il progetto

### Opzione 2: Hardcode (Solo per Testing)

⚠️ **Non raccomandato per produzione**

Modifica `app/api/reviews/hostaway/route.ts`:

```typescript
const response = await fetch(
  `https://api.hostaway.com/v1/reviews?accountId=61148`,
  {
    headers: {
      'Authorization': `Bearer f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152`,
    },
  }
);
```

---

## 🚀 Attivazione API Reale

### Step 1: Decommentare Codice

In `app/api/reviews/hostaway/route.ts`, decommenta il codice nella funzione `fetchHostawayReviews()`:

```typescript
async function fetchHostawayReviews(): Promise<HostawayReview[]> {
  const response = await fetch(
    `https://api.hostaway.com/v1/reviews?accountId=${process.env.HOSTAWAY_ACCOUNT_ID}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.HOSTAWAY_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  
  // Handle Hostaway API response format: {status: "success", result: [...]}
  if (data.status === 'success' && Array.isArray(data.result)) {
    return data.result;
  } else {
    console.error('Unexpected Hostaway API response format:', data);
    return [];
  }
}
```

### Step 2: Rimuovi Mock Data

Commenta o rimuovi:
```typescript
// return mockReviews as HostawayReview[];
```

### Step 3: Test

```bash
npm run dev
# Visita: http://localhost:3000/api/reviews/hostaway
```

---

## 📝 Formato Risposta Gestito

L'applicazione gestisce correttamente:

✅ **Status Check:**
- Verifica `data.status === 'success'`
- Estrae `data.result` array

✅ **Normalizzazione:**
- `rating: null` → Calcola da categorie
- Date string → Converte a Date object
- Channel mancante → Default 'hostaway'
- Categorie → Normalizza (lowercase, trimmed)

✅ **Error Handling:**
- Gestisce risposte inattese
- Logging per debugging
- Fallback sicuro

---

## 🧪 Test API

### Test Locale

```bash
# Con mock data (attuale)
npm run dev
# Visita: http://localhost:3000/api/reviews/hostaway

# Con API reale (dopo configurazione)
# Assicurati che .env.local contenga le credenziali
npm run dev
# Visita: http://localhost:3000/api/reviews/hostaway
```

### Test Vercel

1. Configura variabili d'ambiente su Vercel
2. Redeploy
3. Visita: `https://[your-url].vercel.app/api/reviews/hostaway`

---

## ⚠️ Note Importanti

1. **Sandbox Environment:**
   - Il sandbox Hostaway potrebbe non avere recensioni
   - L'app usa mock data per sviluppo/testing
   - Le credenziali sono pronte per quando l'API avrà dati reali

2. **Sicurezza:**
   - ⚠️ **Non committare** `.env.local` nel repository
   - ✅ Usa variabili d'ambiente su Vercel
   - ✅ Le credenziali sono già in `.gitignore`

3. **Formato Risposta:**
   - L'app gestisce correttamente `{status: "success", result: [...]}`
   - Il codice è già preparato per questo formato
   - Basta decommentare e configurare le credenziali

---

## ✅ Checklist

- [x] Codice gestisce formato `{status: "success", result: [...]}`
- [x] Gestione `rating: null` implementata
- [x] Parsing date formato `"2020-08-21 22:45:14"` implementato
- [x] Normalizzazione categorie implementata
- [x] Default channel implementato
- [ ] Credenziali configurate in `.env.local` (opzionale)
- [ ] Credenziali configurate su Vercel (opzionale)
- [ ] Codice API reale decommentato (quando necessario)

---

**Status:** ✅ Pronto per API reale - Basta configurare credenziali e decommentare codice

