# 🔧 Fix: Root Directory Configuration

## ⚠️ Errore Ricevuto

```
No Next.js version detected. Make sure your package.json has "next" in either "dependencies" or "devDependencies". Also check your Root Directory setting matches the directory of your package.json file.
```

## ✅ Soluzione

### Verifica Root Directory nelle Impostazioni Vercel

**Vai a:** https://vercel.com/killerduck93s-projects/flex-living-reviews/settings/general

**Cosa fare:**

1. **Cerca "Root Directory"** nella pagina Settings
2. **DEVE essere vuoto o `./`** (root del progetto)
3. Se è impostato su una sottocartella, **cambialo a `./`** o **lascialo vuoto**
4. **Clicca "Save"**

### Verifica che package.json sia nella Root

Il file `package.json` DEVE essere nella root del progetto (non in una sottocartella).

**Struttura corretta:**
```
FlexLiving/
├── package.json  ← DEVE essere qui
├── app/
├── components/
└── ...
```

### Dopo aver Corretto

1. Vai a Deployments
2. Clicca "..." sull'ultimo deployment
3. Clicca **"Redeploy"**

---

## 📋 Checklist

- [ ] Root Directory = `./` o vuoto (in Settings)
- [ ] package.json è nella root del progetto
- [ ] package.json contiene "next" in dependencies
- [ ] Framework Preset = Next.js
- [ ] Salvato le impostazioni
- [ ] Fatto redeploy

---

**Questo dovrebbe risolvere il problema!**

