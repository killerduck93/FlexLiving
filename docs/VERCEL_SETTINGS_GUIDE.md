# ⚙️ Vercel Settings Configuration Guide

## 🔗 Access Settings

**Settings URL:**  
https://vercel.com/killerduck93s-projects/flex-living-reviews/settings/general

---

## ✅ Required Settings Check

### 1. Framework Preset

**Location:** Settings → General → Framework Preset

**Required:** Set to **"Next.js"**

**How to check:**
1. Go to: https://vercel.com/killerduck93s-projects/flex-living-reviews/settings/general
2. Scroll to **"Framework Preset"** section
3. Verify it shows **"Next.js"**
4. If not, select **"Next.js"** from dropdown
5. Click **"Save"**

---

### 2. Build & Development Settings

**Location:** Settings → General → Build & Development Settings

**Verify these settings:**

- **Framework Preset:** Next.js
- **Build Command:** `next build` (or leave empty - auto-detected)
- **Output Directory:** `.next` (or leave empty - auto-detected)
- **Install Command:** `npm install` (or leave empty - auto-detected)
- **Development Command:** `next dev` (or leave empty - auto-detected)

**Note:** For Next.js, these are usually auto-detected. Only set manually if needed.

---

### 3. Root Directory

**Location:** Settings → General → Root Directory

**Required:** Should be **`./`** (project root)

**Check:**
- If your project is in a subdirectory, set it here
- For this project, it should be `./` (root)

---

## 🔧 If Framework is Not Detected

### Manual Configuration Steps:

1. **Go to Settings:**
   https://vercel.com/killerduck93s-projects/flex-living-reviews/settings/general

2. **Set Framework Preset:**
   - Find "Framework Preset" dropdown
   - Select **"Next.js"**
   - Click **"Save"**

3. **Verify Build Settings:**
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Redeploy:**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## 📋 Quick Checklist

- [ ] Framework Preset = Next.js
- [ ] Build Command = `next build` (or auto)
- [ ] Output Directory = `.next` (or auto)
- [ ] Root Directory = `./`
- [ ] All settings saved
- [ ] Redeployed after changes

---

## 🆘 If Still Getting 404

After configuring settings:

1. **Clear Build Cache:**
   - Settings → Build & Development Settings
   - Clear cache
   - Redeploy

2. **Check Build Logs:**
   - Deployments → Latest deployment
   - Check Build Logs for errors

3. **Verify Project Structure:**
   - Ensure `app/page.tsx` exists
   - Ensure `package.json` has Next.js dependency
   - Ensure all files are committed to Git

---

## 🔗 Useful Links

- **Project Settings:** https://vercel.com/killerduck93s-projects/flex-living-reviews/settings/general
- **Deployments:** https://vercel.com/killerduck93s-projects/flex-living-reviews/deployments
- **Build Logs:** Check in latest deployment

---

**Status:** ✅ Use the settings page to verify and configure framework detection

