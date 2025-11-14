# 🚀 Deploy su Vercel - Guida Rapida

## ✅ Pre-Deploy Check

- [x] Build locale funziona
- [x] Tutto committato su GitHub
- [x] Repository: https://github.com/killerduck93/FlexLiving

---

## 🚀 Deploy in 5 Minuti

### Step 1: Vai su Vercel

1. Apri: **https://vercel.com/killerduck93s-projects**
2. **Login** se necessario (con GitHub)

### Step 2: Crea Nuovo Progetto

1. Clicca **"Add New..."** (in alto a destra)
2. Clicca **"Project"**

### Step 3: Importa Repository

1. Nella lista dei repository, trova: **`killerduck93/FlexLiving`**
2. Clicca **"Import"** accanto al repository

### Step 4: Configurazione (NON CAMBIARE NULLA!)

Vercel rileverà automaticamente:
- ✅ **Framework Preset:** Next.js
- ✅ **Root Directory:** `./`
- ✅ **Build Command:** `next build`
- ✅ **Output Directory:** `.next`
- ✅ **Install Command:** `npm install`

⚠️ **IMPORTANTE:** Non cambiare nulla! Vercel ha già tutto configurato correttamente.

### Step 5: Deploy

1. Clicca il bottone **"Deploy"** (in basso)
2. Aspetta 2-3 minuti
3. Vercel mostrerà i log di build in tempo reale

### Step 6: Copia l'URL

Quando vedi **"Congratulations! Your project has been deployed"**:

1. Copia l'URL (esempio: `https://flex-living-xxxxx.vercel.app`)
2. **Salva questo URL!** Ti servirà per la submission

---

## ✅ Verifica Deployment

### Test 1: Homepage

Apri il tuo URL Vercel e verifica:
- [ ] Pagina carica correttamente
- [ ] Vedi "Flex Living Reviews"
- [ ] Bottoni "Manager Dashboard" e "Public View" visibili

### Test 2: Dashboard

1. Clicca "Manager Dashboard"
2. Verifica:
   - [ ] Statistiche mostrano numeri
   - [ ] Recensioni sono visibili
   - [ ] Filtri funzionano

### Test 3: API Routes

Apri nel browser:
- [ ] `https://[tuo-url].vercel.app/api/reviews/hostaway` → Restituisce JSON
- [ ] `https://[tuo-url].vercel.app/api/reviews/stats` → Restituisce statistiche
- [ ] `https://[tuo-url].vercel.app/api/reviews/public` → Restituisce recensioni pubbliche

### Test 4: Public View

1. Clicca "Public View"
2. Verifica che funzioni

---

## 🆘 Se Qualcosa Va Storto

### Build Fallisce

1. Vai a: Vercel Dashboard → Il tuo progetto → Deployments
2. Clicca sul deployment fallito
3. Controlla "Build Logs"
4. Cerca errori e dimmeli

### Pagina è Vuota

1. Apri console browser (F12)
2. Controlla errori JavaScript
3. Controlla Network tab per richieste fallite

### API Routes Non Funzionano

1. Vercel Dashboard → Il tuo progetto → Functions
2. Controlla i log delle funzioni
3. Verifica che le route siano in `app/api/`

---

## 📝 Informazioni per Submission

Dopo il deploy riuscito, avrai:

1. **GitHub Repository:**
   ```
   https://github.com/killerduck93/FlexLiving
   ```

2. **Live Application URL:**
   ```
   https://[tuo-url-vercel].vercel.app
   ```
   (Copia dall'URL che ti dà Vercel)

3. **AI Tool:**
   ```
   Claude by Anthropic (via Cursor IDE)
   ```

---

## 🎉 Pronto!

Una volta deployato e testato, sei pronto per la submission!

**Vai su:** https://vercel.com/killerduck93s-projects  
**Clicca:** "Add New..." → "Project"  
**Importa:** `killerduck93/FlexLiving`  
**Deploy!** 🚀

