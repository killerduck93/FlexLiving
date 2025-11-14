# 🚀 Deployment Guide

Complete guide for deploying Flex Living Reviews Dashboard to Vercel.

## ⚡ Quick Deploy (5 minutes)

1. **Go to:** https://vercel.com
2. **Login** with GitHub
3. **Click:** "Add New..." → "Project"
4. **Select:** `killerduck93/FlexLiving`
5. **Click:** "Import" → "Deploy" (don't change anything)
6. **Wait:** 2-3 minutes
7. **Copy:** Your Vercel URL

**That's it!** 🎉

---

## 📋 Detailed Deployment Steps

### Step 1: Pre-Deployment Check

```bash
# Verify build works locally
npm run build
```

**Expected:** `✓ Build completed successfully`

### Step 2: Deploy to Vercel

#### Option A: Via Dashboard (Recommended)

1. Visit https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New..." → "Project"
4. Find `killerduck93/FlexLiving` → Click "Import"
5. **Don't change any settings** - Framework auto-detected as Next.js
6. Click "Deploy"
7. Wait 2-3 minutes for build
8. Copy your production URL

#### Option B: Via CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Step 3: Verify Deployment

**Check Vercel Dashboard:**
- Status: ✅ Green "Ready"
- Build logs: No errors
- Functions: All API routes listed

**Test Live URL:**
- [ ] Page loads correctly
- [ ] Dashboard shows reviews
- [ ] API endpoints return JSON
- [ ] Mobile responsive

---

## ✅ Post-Deployment Checklist

### Functional Tests

**Dashboard:**
- [ ] Statistics cards show numbers
- [ ] Reviews are displayed
- [ ] Filters work (Property, Channel, Rating, Category)
- [ ] Search works
- [ ] Sorting works
- [ ] Display toggle works

**Public View:**
- [ ] Only approved reviews show
- [ ] Layout looks professional

**API Endpoints:**
- [ ] `/api/reviews/hostaway` returns JSON
- [ ] `/api/reviews/public` returns JSON
- [ ] `/api/reviews/stats` returns JSON

**Mobile:**
- [ ] Responsive design works
- [ ] All features work on mobile

---

## 🆘 Troubleshooting

### Build Fails

**Check:**
- Vercel Dashboard → Deployments → Build Logs
- Fix errors shown in logs
- Run `npm run build` locally first

**Common Issues:**
- TypeScript errors → Fix before deploying
- Missing dependencies → Check `package.json`
- Module not found → Verify imports

### API Routes Not Working

**Check:**
- Browser console (F12) → Network tab
- Vercel Dashboard → Functions → Logs

**Common Issues:**
- 404 → Verify routes in `app/api/` folder
- 500 → Check function logs for errors

### Page is Blank

**Check:**
- Browser console for JavaScript errors
- Network tab for failed requests
- Vercel deployment logs

---

## 📝 Environment Variables (Optional)

If using real Hostaway API:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add:
   - `HOSTAWAY_API_KEY` = `f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152`
   - `HOSTAWAY_ACCOUNT_ID` = `61148`
3. Redeploy

**Note:** Currently using mock data, so this is optional.

---

## 🎯 Next Steps

After successful deployment:

1. **Test everything** on live URL
2. **Save your Vercel URL** for submission
3. **Submit assessment** (see [SUBMISSION_GUIDE.md](SUBMISSION_GUIDE.md))

---

**Quick Reference:**
- Vercel Dashboard: https://vercel.com/dashboard
- Repository: https://github.com/killerduck93/FlexLiving
