# 🚀 Guida al Deployment su Vercel

## Prerequisiti

- ✅ Codice pushato su GitHub: https://github.com/killerduck93/FlexLiving
- ✅ Account Vercel (puoi crearlo con GitHub)

## Metodo 1: Deploy via Dashboard Vercel (Raccomandato)

### Passo 1: Accedi a Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Clicca "Sign Up" o "Log In"
3. Scegli "Continue with GitHub" per collegare il tuo account

### Passo 2: Crea Nuovo Progetto

1. Dalla dashboard, clicca "Add New..." → "Project"
2. Cerca il repository `killerduck93/FlexLiving`
3. Clicca "Import"

### Passo 3: Configura il Progetto

Vercel rileverà automaticamente:
- **Framework Preset:** Next.js
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

**Non serve cambiare nulla!** Clicca "Deploy"

### Passo 4: Attendi il Deploy

- Il deploy richiede 2-3 minuti
- Vercel mostrerà i log in tempo reale
- Al termine, vedrai "Congratulations! Your project has been deployed"

### Passo 5: Ottieni l'URL

Vercel ti darà un URL tipo:
- `https://flex-living.vercel.app`
- Oppure un URL personalizzato se configurato

**Questo è il tuo URL live!** 🎉

---

## Metodo 2: Deploy via Vercel CLI

### Passo 1: Installa Vercel CLI

```bash
npm i -g vercel
```

### Passo 2: Login

```bash
vercel login
```

Ti chiederà di autenticarti via browser.

### Passo 3: Deploy

Dalla cartella del progetto:

```bash
cd FlexLiving
vercel
```

Rispondi alle domande:
- **Set up and deploy?** → Y
- **Which scope?** → (seleziona il tuo account)
- **Link to existing project?** → N
- **Project name?** → flex-living (o lascia default)
- **Directory?** → ./
- **Override settings?** → N

### Passo 4: Deploy Production

```bash
vercel --prod
```

---

## Environment Variables (Opzionale)

Se vuoi usare le API reali in futuro:

### Via Dashboard:

1. Vai su Project Settings → Environment Variables
2. Aggiungi:
   - **Key:** `HOSTAWAY_API_KEY`
   - **Value:** (la tua chiave API)
   - **Environment:** Production, Preview, Development
3. Clicca "Save"
4. Aggiungi anche:
   - **Key:** `HOSTAWAY_ACCOUNT_ID`
   - **Value:** (il tuo account ID)

### Via CLI:

```bash
vercel env add HOSTAWAY_API_KEY
vercel env add HOSTAWAY_ACCOUNT_ID
```

---

## Verifica del Deploy

### Test 1: Homepage

1. Vai sul tuo URL Vercel
2. Verifica che la pagina carichi
3. Verifica che vedi "Flex Living Reviews"

### Test 2: Dashboard

1. Clicca su "Manager Dashboard"
2. Verifica che le statistiche si carichino
3. Verifica che le recensioni siano visibili

### Test 3: API Endpoints

1. Vai su `https://[tuo-url].vercel.app/api/reviews/hostaway`
2. Verifica che restituisca JSON valido
3. Prova anche `/api/reviews/public` e `/api/reviews/stats`

### Test 4: Public View

1. Clicca su "Public View"
2. Verifica che le recensioni approvate siano visibili

### Test 5: Mobile

1. Apri l'URL su mobile
2. Verifica che il design sia responsive

---

## Custom Domain (Opzionale)

Se vuoi un dominio personalizzato:

1. Vai su Project Settings → Domains
2. Aggiungi il tuo dominio
3. Segui le istruzioni per configurare DNS

---

## Troubleshooting

### Build Fails

**Errore:** "Module not found"

**Soluzione:**
- Verifica che `package.json` contenga tutte le dipendenze
- Controlla i log di build per errori specifici

**Errore:** "TypeScript errors"

**Soluzione:**
- Verifica che non ci siano errori TypeScript in locale
- Esegui `npm run build` localmente per testare

### Runtime Errors

**Errore:** "API route not found"

**Soluzione:**
- Verifica che le route API siano nella cartella `app/api/`
- Controlla che i nomi dei file siano corretti

**Errore:** "Environment variable not found"

**Soluzione:**
- Verifica che le variabili d'ambiente siano configurate in Vercel
- Riavvia il deploy dopo aver aggiunto le variabili

### Performance Issues

**Lentezza nel caricamento:**

1. Verifica che le immagini siano ottimizzate
2. Controlla la dimensione del bundle
3. Usa Vercel Analytics per identificare problemi

---

## Continuous Deployment

Vercel deploya automaticamente ad ogni push su GitHub:

1. Push su `main` → Deploy Production
2. Push su altri branch → Deploy Preview
3. Pull Request → Deploy Preview con URL unico

**Non serve fare nulla!** Vercel gestisce tutto automaticamente.

---

## Monitoring

### Vercel Analytics

1. Vai su Project Settings → Analytics
2. Abilita Vercel Analytics (gratuito per hobby plan)
3. Monitora performance e errori

### Logs

1. Vai su Deployments
2. Clicca su un deployment
3. Vai su "Functions" per vedere i log delle API routes

---

## Rollback

Se qualcosa va storto:

1. Vai su Deployments
2. Trova il deployment precedente che funzionava
3. Clicca "..." → "Promote to Production"

---

## Best Practices

1. **Testa sempre in locale prima di fare push**
2. **Usa Preview Deployments per testare PR**
3. **Monitora i log dopo ogni deploy**
4. **Mantieni le variabili d'ambiente sicure**
5. **Usa Vercel Analytics per ottimizzare**

---

## Supporto

- **Documentazione Vercel:** https://vercel.com/docs
- **Community:** https://github.com/vercel/vercel/discussions
- **Status:** https://vercel-status.com

---

## Checklist Finale

- [ ] Codice pushato su GitHub
- [ ] Deploy completato su Vercel
- [ ] URL live funzionante
- [ ] Tutti i test passano su URL live
- [ ] Environment variables configurate (se necessario)
- [ ] Custom domain configurato (opzionale)
- [ ] Monitoring attivo (opzionale)

---

**🎉 Congratulazioni! La tua app è live!**

Condividi l'URL nella submission dell'assessment.

